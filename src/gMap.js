const loadGoogleMapsAPI = require('load-google-maps-api');

module.exports = gMap = function() {
    this.options = null;
    this.map = null;
};

gMap.prototype.init = function (map_id, options) {
    var self = this;
    self.options = options || {};
    loadGoogleMapsAPI({ key: 'AIzaSyBjzwjBMykNJikl12HQOuWsYxMmozvkhVU' }).then(function (googleMaps) {
        gmap = new googleMaps.Map(document.getElementById(map_id), {
            center: new googleMaps.LatLng(config.map.center.lat, config.map.center.lng),
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
            if(data.results.features.length > 0) {
                // GeoJson をロード
	            self.map.data.addGeoJson(data.results);
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
    var infoWindow = new google.maps.InfoWindow();
    // クリックイベントの定義
    self.map.data.addListener('mouseover', function(event) {
        // 表示位置
        infoWindow.setPosition(event.latLng);
        // InfoWindow内のの内容
        infoWindow.setContent('<b>' + event.feature.getProperty('name') + '</b><br/>' + 
                              '車室数:' + event.feature.getProperty('position_count') + '<br/>' + 
                              '空き数:' + event.feature.getProperty('contract_count') + '<br/>' +
                              'フリーレント終了日:' + event.feature.getProperty('free_end_date') || '');
		// IndowWindowを表示
		infoWindow.open(self.map);
    });
};
