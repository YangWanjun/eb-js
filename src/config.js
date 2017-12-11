module.exports = Config = {
    layers: [
        {
            name: 'parking_lot',
            url: 'http://ap.mopa.jp/api/whiteboard/'
        },
    ],
    map: {
        center: {lng: 139.692101, lat: 35.689634},  // （東京都庁）
        minZoom: 4,
        zoom: 12,
    }
}
