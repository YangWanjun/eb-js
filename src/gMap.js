const loadGoogleMapsAPI = require('load-google-maps-api');

module.exports = gMap = function() {
    this.options = null;
    this.map = null;
    this.circles = [];
};

gMap.prototype.init = function (map_id, options) {
    var self = this;
    self.options = options || {};
    loadGoogleMapsAPI({ key: 'AIzaSyBjzwjBMykNJikl12HQOuWsYxMmozvkhVU' }).then(function (googleMaps) {
        gmap = new googleMaps.Map(document.getElementById(map_id), {
            center: new googleMaps.LatLng(config.map.center.lat, config.map.center.lng),
            scaleControl: true,
            minZoom: config.map.minZoom,
            zoom: config.map.zoom
        });

        self.map = gmap;
        self.CreateLayers();
    }).catch((err) => {
        console.error(err)
    });
};

gMap.prototype.CreateLayers = function (){
    var self = this;
    $.each(config.layers, function(index, layer) {
        $.getJSON(layer.url, function(data) {
            if(data.features.length > 0) {
                // GeoJson をロード
	            self.map.data.addGeoJson(data);
            }
        });
    });
    // スタイルの設定
    self.map.data.setStyle(function(feature) {
        var position_count = feature.getProperty('position_count');     // 車室数
        var contract_count = feature.getProperty('contract_count');     // 契約数
        var icon_url = position_count === contract_count ? 'https://maps.multisoup.co.jp/exsample/common/img/ms/pin_04.png' : 'https://maps.multisoup.co.jp/exsample/common/img/ms/pin_01.png';
        return ({
            icon: {
                url:  icon_url,
                scaledSize: new google.maps.Size(32, 32)
            }
        }); 
    });
    // InfoWindowを生成
    var offset = new google.maps.Size(0, -20);
    var infoWindow = new google.maps.InfoWindow({pixelOffset: offset});
    // クリックイベントの定義
    self.map.data.addListener('click', function(event) {
        // 表示位置
        infoWindow.setPosition(event.latLng);
        // InfoWindow内のの内容
        var content = '<b>' + event.feature.getProperty('parking_lot_name') + '</b><br/>' + 
            '所在地：' + event.feature.getProperty('address') + '<br/>' + 
            '担当者：' + event.feature.getProperty('staff_name') + '<br/>' + 
            '車室数：' + event.feature.getProperty('position_count') + '<br/>' + 
            '空き数：' + event.feature.getProperty('contract_count') + '<br/>' +
            '既契約者：' + event.feature.getProperty('is_existed_contractor_allowed') + '<br/>' + 
            '新テナント：' + event.feature.getProperty('is_new_contractor_allowed') + '<br/>' + 
            'フリーレント終了日：' + (event.feature.getProperty('free_end_date') || '') + '<br/>';
        content += '半径：<input type="text" class="browser-default-radius" />m&nbsp;';
        content += '<button onclick="ebjs.gmap.CreateCircle(' + event.feature.getProperty('lng') + ", " + event.feature.getProperty('lat') + ', this)">作成</button>';
        infoWindow.setContent(content);
		// IndowWindowを表示
		infoWindow.open(self.map);
    });
};

gMap.prototype.CreateCircle = function(lng, lat, obj) {
    var self = this;
    $.each(self.circles, function(i, circle) {
        circle.setMap(null);
    });
    var radius = parseInt($(obj).prev().val()) || 2000;
    var c = new google.maps.Circle({
        map: self.map,
        center: new google.maps.LatLng( lat, lng ),
        radius: radius,
    });
    self.circles.push(c);
};
