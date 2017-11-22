require('ol/ol.css');
var ol = require('ol').default;
ol.Map = require('ol/map').default;
ol.View = require('ol/view').default;
ol.layer = require('ol/layer/layer').default;
ol.layer.Vector = require('ol/layer/vector').default;
ol.source = require('ol/source/source').default;
ol.source.Vector = require('ol/source/vector').default;
ol.format = {};
ol.format.GeoJSON = require('ol/format/GeoJSON').default;
ol.proj = require('ol/proj').default;
ol.style = require('ol/style').default;
ol.style.Style = require('ol/style/style').default;
ol.style.Stroke = require('ol/style/stroke').default;
ol.style.Circle = require('ol/style/circle').default;
ol.style.Fill = require('ol/style/fill').default;
KML = require('ol/format/kml').default;
const loadGoogleMapsAPI = require('load-google-maps-api')

module.exports = olMap = function() {
    this.options = null;
    this.gmap = null;
    this.olMap = null;
};

olMap.prototype.init = function (gmap_id, olmap_id, options) {
    if (document.getElementById(gmap_id) == null || document.getElementById(olmap_id) == null) {
        return;
    }

    var self = this;
    if (window.google) {
        try {
            self.InitMap(google.maps, gmap_id, olmap_id);
        } catch (ex) {
            console.error(ex);
        }
    } else {
        loadGoogleMapsAPI({ key: 'AIzaSyBjzwjBMykNJikl12HQOuWsYxMmozvkhVU' }).then(function (googleMaps) {
            self.InitMap(googleMaps, gmap_id, olmap_id);
        }).catch((err) => {
            console.error(err)
        });
    }
};

olMap.prototype.InitMap = function (googleMap, gmap_id, olmap_id) {
    // Base Map [ Google Maps ]
    var gmap = new googleMap.Map( document.getElementById( gmap_id ), {
        mapTypeId: googleMap.MapTypeId.ROADMAP,
        zoomControl: true,
        scaleControl: true,
        streetViewControl: false,
        fullscreenControl: true,
        fullscreenControlOptions: {
            position: googleMap.ControlPosition.TOP_RIGHT,
        }
    });

    if (document.getElementById(olmap_id) == null) {
        return;
    }

    // OL3 view [ Sphere Mercator projection : EPSG:900913 ]
    var view = new ol.View( {
        projection: "EPSG:900913", // Sphere Mercator 
        maxZoom: 21,
        minZoom: 4
    } );

    // OL3 event handler [ map center ]
    view.on( 'change:center', function() {
        var smCenter = view.getCenter();    
        var latLng   = ol.proj.transform( smCenter, 'EPSG:900913', 'EPSG:4326' );

        // synchronize with Google Maps
        gmap.setCenter( new googleMap.LatLng( latLng[1], latLng[0] ) );  
    });

    // OL3 event handler [ map zoom ]
    view.on( 'change:resolution', function() {
        var zoom = view.getZoom();
        gmap.setZoom( zoom );   
    });

    // OL3 KML vector object 
    var vector = new ol.layer.Vector();

    // DOM element for OL3 Vector Layer object
    var olMapDiv = document.getElementById( olmap_id );

    var olMap = new ol.Map({
        layers: [vector],
        target: olMapDiv,
        controls: [
            //new ol.control.FullScreen()
        ],
        view: view
    });

    // 139.692101, 35.689634 （東京都庁）
    var smCenter = ol.proj.transform( [139.6895863, 35.6254368], "EPSG:4326", "EPSG:900913" );

    view.setCenter( smCenter );
    view.setZoom( 12 );

    //
    olMapDiv.parentNode.removeChild( olMapDiv );
    gmap.controls[ googleMap.ControlPosition.TOP_RIGHT].push( olMapDiv );

    this.gmap = gmap;
    this.olMap = olMap;

    this.CreateLayers();
};

olMap.prototype.CreateLayers = function (){
    var self = this;
    $.each(config.layers, function(index, layer) {
        $.getJSON(layer.url, function(data) {
            if(data.results.features.length > 0)
            {
                var vectorSource = new ol.source.Vector({
                    features: (new ol.format.GeoJSON()).readFeatures(data.results, {
                        dataProjection: 'EPSG:4326',
                        featureProjection: "EPSG:900913"
                    })
                });
                var layerSource = new ol.layer.Vector({
                    source: vectorSource,
                    style: self.styleFunction
                });
                self.olMap.addLayer(layerSource);
            }
        });
    });
};

olMap.prototype.styleFunction = function (feature) {
    var image = new ol.style.Circle({
        radius: 5,
        fill: null,
        stroke: new ol.style.Stroke({ color: 'red', width: 1 })
    });
    var styles = {
        'Point': new ol.style.Style({
            image: image
        }),
        'LineString': new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'green',
                width: 1
            })
        }),
        'MultiLineString': new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'green',
                width: 1
            })
        }),
        'MultiPoint': new ol.style.Style({
            image: image
        }),
        'MultiPolygon': new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'yellow',
                width: 1
            }),
            fill: new ol.style.Fill({
                color: 'rgba(255, 255, 0, 0.1)'
            })
        }),
        'Polygon': new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'blue',
                lineDash: [4],
                width: 3
            }),
            fill: new ol.style.Fill({
                color: 'rgba(0, 0, 255, 0.1)'
            })
        }),
        'GeometryCollection': new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'magenta',
                width: 2
            }),
            fill: new ol.style.Fill({
                color: 'magenta'
            }),
            image: new ol.style.Circle({
                radius: 10,
                fill: null,
                stroke: new ol.style.Stroke({
                    color: 'magenta'
                })
            })
        }),
        'Circle': new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'red',
                width: 2
            }),
            fill: new ol.style.Fill({
                color: 'rgba(255,0,0,0.2)'
            })
        })
    };
    
    return styles[feature.getGeometry().getType()];
};
