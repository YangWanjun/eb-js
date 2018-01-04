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
        // 地図上で円作成時のデフォルト半径
        circle_radius: 0,                   
        // ダイアログのタイムアウト時間（10秒）
        toast_timeout: 10000,               
        // ホワイトボードで駐車場を展開時、車室を取得するＡＰＩのＵＲＬ
        api_size_grouped_positions: 'http://ap.mopa.jp/api/parking-position-size-grouped/',
    },
}
