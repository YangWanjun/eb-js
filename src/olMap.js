require('ol/ol.css');
var ol = require('ol').default;
ol.Map = require('ol/map').default;
ol.View = require('ol/view').default;
ol.layer = require('ol/layer/layer').default;
ol.layer.Tile = require('ol/layer/tile').default;
ol.layer.Vector = require('ol/layer/vector').default;
ol.source = require('ol/source/source').default;
ol.source.Vector = require('ol/source/vector').default;
ol.source.OSM = require('ol/source/osm').default;
ol.format = {};
ol.format.GeoJSON = require('ol/format/GeoJSON').default;
ol.proj = require('ol/proj').default;
ol.style = require('ol/style').default;
ol.style.Style = require('ol/style/style').default;
ol.style.Stroke = require('ol/style/stroke').default;
ol.style.Circle = require('ol/style/circle').default;
ol.style.Fill = require('ol/style/fill').default;
ol.control = require('ol/control').default;
ol.control.FullScreen = require('ol/control/fullscreen').default;

module.exports = olMap = function() {
    this.options = null;
    this.map = null;
};

olMap.prototype.init = function (map_id, options) {
    var self = this;
    self.options = options || {};
    self.InitMap(map_id);
};

olMap.prototype.InitMap = function (map_id) {
    var center = this.options.center || [config.map.center.lng, config.map.center.lat];
    this.map = new ol.Map({
        target: map_id,
        controls: ol.control.defaults().extend([
            new ol.control.FullScreen()
        ]),
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        view: new ol.View({
            projection: "EPSG:3857",
            center: ol.proj.transform( center, "EPSG:4326", "EPSG:3857" ),
            maxZoom: 21,
            minZoom: config.map.minZoom,
            zoom: config.map.zoom
        })
    });

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
                        featureProjection: "EPSG:3857"
                    })
                });
                var layerSource = new ol.layer.Vector({
                    source: vectorSource,
                    style: self.styleFunction
                });
                self.map.addLayer(layerSource);
            }
        });
    });
};

olMap.prototype.styleFunction = function (feature) {
    var image = new ol.style.Circle({
        radius: 5,
        fill: new ol.style.Fill({
            color: 'blue'
        }),
        stroke: new ol.style.Stroke({ color: 'bule', width: 1 })
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
