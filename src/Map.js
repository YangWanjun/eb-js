require('ol/ol.css');
var ol = require('ol').default;
ol.Map = require('ol/map').default;
ol.View = require('ol/view').default;
ol.layer = require('ol/layer/layer').default;
ol.layer.Vector = require('ol/layer/vector').default;
ol.source = require('ol/source/source').default;
ol.proj = require('ol/proj').default;
KML = require('ol/format/kml').default;
const loadGoogleMapsAPI = require('load-google-maps-api')

module.exports = Map = function() {
    this.options = null;
    this.gmap = null;
    this.olMap = null;
};

Map.prototype.init = function (gmap_id, olmap_id, options) {
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
            console.log(googleMaps) //=> Object { Animation: Object, ... 
            self.InitMap(googleMaps, gmap_id, olmap_id);
        }).catch((err) => {
            console.error(err)
        });
    }
};

Map.prototype.InitMap = function (googleMap, gmap_id, olmap_id) {
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

    // OL3 view [ Sphere Mercator projection : EPSG:3857 ]
    var view = new ol.View( {
        projection: "EPSG:3857", // Sphere Mercator 
        maxZoom: 21,
        minZoom: 4
    } );

    // OL3 event handler [ map center ]
    view.on( 'change:center', function() {
        var smCenter = view.getCenter();    
        var latLng   = ol.proj.transform( smCenter, 'EPSG:3857', 'EPSG:4326' );

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

    var smCenter = ol.proj.transform( [139.692101, 35.689634], "EPSG:4326", "EPSG:3857" );

    view.setCenter( smCenter );
    view.setZoom( 12 );

    //
    olMapDiv.parentNode.removeChild( olMapDiv );
    gmap.controls[ googleMap.ControlPosition.TOP_RIGHT].push( olMapDiv );

    this.gmap = gmap;
    this.olMap = olMap;
};
