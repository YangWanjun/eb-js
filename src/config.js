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
    },
    setting: {
        circle_radius: 0,           // 地図上で円作成時のデフォルト半径
        toast_timeout: 10000,       // ダイアログのタイムアウト時間（10秒）
    },
}
