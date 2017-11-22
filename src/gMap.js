const loadGoogleMapsAPI = require('load-google-maps-api');

module.exports = gMap = function() {
    this.options = null;
    this.map = null;
};

gMap.prototype.init = function (map_id, options) {
    var self = this;
    self.options = options || {};
    loadGoogleMapsAPI({ key: 'AIzaSyBjzwjBMykNJikl12HQOuWsYxMmozvkhVU' }).then(function (googleMaps) {
        self.InitMap(googleMaps, map_id);
    }).catch((err) => {
        console.error(err)
    });
};

gMap.prototype.InitMap = function (googleMaps, map_id) {
    gmap = new googleMaps.Map(document.getElementById(map_id), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 12
    });

    this.map = gmap;
};
