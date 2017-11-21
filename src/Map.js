module.exports = Map = function() {
    this.options = null;
    this.gmap = null;
    this.olMap = null;
};

Map.prototype.init = function(gmap_id, olmap_id, options) {
    if (this.gmap != null && this.olMap != null) {
        return;
    }

    // Base Map [ Google Maps ]
    var gmap = new google.maps.Map( document.getElementById( 'gmap' ), {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoomControl: true,
        scaleControl: true,
        streetViewControl: false,
        fullscreenControl: true,
        fullscreenControlOptions: {
            position: google.maps.ControlPosition.TOP_RIGHT,
        }
    });

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
        gmap.setCenter( new google.maps.LatLng( latLng[1], latLng[0] ) );  
    });

    // OL3 event handler [ map zoom ]
    view.on( 'change:resolution', function() {
        var zoom = view.getZoom();
        gmap.setZoom( zoom );   
    });

    // OL3 KML vector object 
    var vector = new ol.layer.Vector({
        source: new ol.source.Vector({
            format: new ol.format.KML()
        })
    });

    // DOM element for OL3 Vector Layer object
    var olMapDiv = document.getElementById( 'olmap' );

    var olMap = new ol.Map({
        layers: [vector],
        interactions: ol.interaction.defaults({
            altShiftDragRotate: false,
            dragPan: false,
            rotate: false
        }).extend([new ol.interaction.DragPan({kinetic: null})]),
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
    gmap.controls[ google.maps.ControlPosition.TOP_RIGHT].push( olMapDiv );

    this.gmap = gmap;
    this.olMap = olMap;
};
