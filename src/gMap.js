const loadGoogleMapsAPI = require('load-google-maps-api');

module.exports = gMap = function() {
    this.options = null;
    this.map = null;
    this.circles = [];
};

gMap.prototype.init = function (map_id, options) {
    var self = this;
    self.options = options || {};
    loadGoogleMapsAPI({ key: 'AIzaSyBjzwjBMykNJikl12HQOuWsYxMmozvkhVU', libraries: ['places', 'drawing'] }).then(function (googleMaps) {
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
        // ポリゴン描画
        var drawingManager = new googleMaps.drawing.DrawingManager({
            // drawingMode: googleMaps.drawing.OverlayType.MARKER,
            drawingControl: true,
            drawingControlOptions: {
                position: googleMaps.ControlPosition.BOTTOM_LEFT,
                drawingModes: ['marker', 'circle', 'polyline']
            },
            // markerOptions: {icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'},
            circleOptions: {
                // fillColor: '#ffff00',
                // fillOpacity: 1,
                // strokeWeight: 5,
                clickable: false,
                editable: true,
                zIndex: 1
            }
        });
        drawingManager.setMap(gmap);
        googleMaps.event.addListener(drawingManager, 'overlaycomplete', function(event) {
            if (event.type == 'circle') {
                var radius = event.overlay.getRadius();
            } else if (event.type == 'polyline') {
                var lines = event.overlay.getPath();
                var distance = 0;
                for (var i=1; i<lines.length; i++) {
                    distance += googleMaps.geometry.spherical.computeDistanceBetween(lines.getAt(i - 1), lines.getAt(i));
                }
                distance = Math.round(distance);
                console.log(distance);
                var label = new Label({
                    map: gmap,
                    text: distance
                });
                label.bindTo('position', event.overlay, 'position');
            }
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
        var empty_count = feature.getProperty('empty_count');     // 空きの車室数
        var icon_url = empty_count > 0 ? 'https://maps.multisoup.co.jp/exsample/common/img/ms/pin_01.png' : 'https://maps.multisoup.co.jp/exsample/common/img/ms/pin_04.png';
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
        var code = event.feature.getId();
        var id_create_circle = "btnCircle" + event.feature.getProperty('parking_lot');
        var id_radius = "txtRadius" + event.feature.getProperty('parking_lot');
        var id_clear_circles = "btnClear" + event.feature.getProperty('parking_lot');
        var staff = event.feature.getProperty('staff');
        var staff_name = '';
        if (staff) {
            staff_name = staff.full_name;
        }
        // InfoWindow内のの内容
        var content = '<a class="modal-trigger" code="' + code + '" href="#parking_details"><b>' + event.feature.getProperty('name') + '</b></a><br/>';
        content += '所在地：' + event.feature.getProperty('address') + '<br/>';
        content += '担当者：' + staff_name + '<br/>';
        content += '車室数：' + event.feature.getProperty('position_count') + '<br/>';
        content += '空き数：' + event.feature.getProperty('empty_count') + '<br/>';
        content += '既契約者：' + event.feature.getProperty('is_existed_contractor_allowed') + '<br/>';
        content += '新テナント：' + event.feature.getProperty('is_new_contractor_allowed') + '<br/>';
        content += 'フリーレント終了日：' + (event.feature.getProperty('free_end_date') || '') + '<br/>';
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

// // Define the overlay, derived from google.maps.OverlayView
// gMap.prototype.Label = function(opt_options) {
//     // Initialization
//     this.setValues(opt_options);

//     // Label specific
//     var span = this.span_ = document.createElement('span');
//     span.style.cssText = 'position: relative; left: -50%; top: -8px; ' +
//       'white-space: nowrap; border: 1px solid blue; ' +
//       'padding: 2px; background-color: white';

//     var div = this.div_ = document.createElement('div');
//     div.appendChild(span);
//     div.style.cssText = 'position: absolute; display: none';
// };

// gMap.prototype.Label.prototype = new google.maps.OverlayView;
  
// // Implement onAdd
// gMap.prototype.Label.prototype.onAdd = function() {
//     var pane = this.getPanes().overlayLayer;
//     pane.appendChild(this.div_);
  
//     // Ensures the label is redrawn if the text or position is changed.
//     var me = this;
//     this.listeners_ = [
//       google.maps.event.addListener(this, 'position_changed',
//         function() {
//           me.draw();
//         }),
//       google.maps.event.addListener(this, 'text_changed',
//         function() {
//           me.draw();
//         })
//     ];
// };
  
// // Implement onRemove
// gMap.prototype.Label.prototype.onRemove = function() {
//     this.div_.parentNode.removeChild(this.div_);
  
//     // Label is removed from the map, stop updating its position/text.
//     for (var i = 0, I = this.listeners_.length; i < I; ++i) {
//       google.maps.event.removeListener(this.listeners_[i]);
//     }
// };
  
// // Implement draw
// gMap.prototype.Label.prototype.draw = function() {
//     var projection = this.getProjection();
//     var position = projection.fromLatLngToDivPixel(this.get('position'));
  
//     var div = this.div_;
//     div.style.left = position.x + 'px';
//     div.style.top = position.y + 'px';
//     div.style.display = 'block';
  
//     this.span_.innerHTML = this.get('text').toString();
// };
