const loadGoogleMapsAPI = require('load-google-maps-api');

module.exports = gMap = function() {
    this.options = null;
    this.map = null;
    this.circles = [];
};

gMap.prototype.init = function (map_id, options) {
    var self = this;
    self.options = options || {};
    loadGoogleMapsAPI({ key: 'AIzaSyBjzwjBMykNJikl12HQOuWsYxMmozvkhVU', libraries: ['places'] }).then(function (googleMaps) {
        gmap = new googleMaps.Map(document.getElementById(map_id), {
            center: new googleMaps.LatLng(config.map.center.lat, config.map.center.lng),
            scaleControl: true,
            minZoom: config.map.minZoom,
            zoom: config.map.zoom
        });

        // 住所検索
        var input = document.getElementById('pac-input');
        var searchBox = new googleMaps.places.SearchBox(input);
        gmap.controls[googleMaps.ControlPosition.TOP_LEFT].push(input);
        gmap.addListener('bounds_changed', function () {
            searchBox.setBounds(gmap.getBounds());
        });
        var markers = [];
        searchBox.addListener('places_changed', function () {
            var places = searchBox.getPlaces();

            if (places.length == 0) {
                return;
            }

            // Clear out the old markers.
            markers.forEach(function (marker) {
                marker.setMap(null);
            });
            markers = [];

            // For each place, get the icon, name and location.
            var bounds = new googleMaps.LatLngBounds();
            places.forEach(function (place) {
                if (!place.geometry) {
                    console.log("Returned place contains no geometry");
                    return;
                }
                var icon = {
                    url: place.icon,
                    size: new googleMaps.Size(71, 71),
                    origin: new googleMaps.Point(0, 0),
                    anchor: new googleMaps.Point(17, 34),
                    scaledSize: new googleMaps.Size(25, 25)
                };

                // Create a marker for each place.
                markers.push(new googleMaps.Marker({
                    map: gmap,
                    icon: icon,
                    title: place.name,
                    position: place.geometry.location
                }));

                if (place.geometry.viewport) {
                    // Only geocodes have viewport.
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            });
            gmap.fitBounds(bounds);
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
        var id_create_circle = "btnCircle" + event.feature.getProperty('parking_lot');
        var id_radius = "txtRadius" + event.feature.getProperty('parking_lot');
        var id_clear_circles = "btnClear" + event.feature.getProperty('parking_lot');
        // InfoWindow内のの内容
        var content = '<b>' + event.feature.getProperty('name') + '</b><br/>' + 
            '所在地：' + event.feature.getProperty('address') + '<br/>' + 
            '担当者：' + event.feature.getProperty('staff_name') + '<br/>' + 
            '車室数：' + event.feature.getProperty('position_count') + '<br/>' + 
            '空き数：' + event.feature.getProperty('contract_count') + '<br/>' +
            '既契約者：' + event.feature.getProperty('is_existed_contractor_allowed') + '<br/>' + 
            '新テナント：' + event.feature.getProperty('is_new_contractor_allowed') + '<br/>' + 
            'フリーレント終了日：' + (event.feature.getProperty('free_end_date') || '') + '<br/>';
        content += '半径：<input type="text" id="' + id_radius + '" class="browser-default-radius" />m&nbsp;';
        content += '<button id="' + id_create_circle + '">作成</button>'
        content += '<a id="' + id_clear_circles + '">クリア</a>'
        infoWindow.setContent(content);
		// IndowWindowを表示
        infoWindow.open(self.map);
        $("#" + id_radius).val(config.setting.circle_radius);
        // 円を作成するイベント
        $("#" + id_create_circle).click(function(){
            self.CreateCircle(event.feature.getProperty('lng'), event.feature.getProperty('lat'), $("#" + id_radius).val());
        });
        // 円をクリアイベント
        $("#" + id_clear_circles).click(function(){
            self.ClearCircles();
        });
    });
};

gMap.prototype.ClearCircles = function() {
    var self = this;
    $.each(self.circles, function(i, circle) {
        circle.setMap(null);
    });
    self.circles = [];
};

gMap.prototype.CreateCircle = function(lng, lat, radius) {
    var self = this;
    self.ClearCircles();
    var radius = parseInt(radius) || 2000;
    var c = new google.maps.Circle({
        map: self.map,
        center: new google.maps.LatLng( lat, lng ),
        radius: radius,
    });
    self.circles.push(c);
};
