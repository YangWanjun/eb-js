module.exports = Config = {
    layers: [
        {
            name: 'parking_lot',
            url: '/api/whiteboard/'
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
        api_size_grouped_positions: '/api/parking-position-size-grouped/',
        // ホワイトボードで車室を取得する
        api_whiteboard_positions: '/api/whiteboard-position/',
        // ユーザー問い合わせ履歴保存
        api_add_inquiry: '/api/inquiry/',
        // 空き待ち登録
        api_add_waiting: '/api/waiting/',
        // 郵便番号により住所取得
        api_get_address_by_post_code: '/api/postcode_list/',
        // フリガナ取得
        api_get_furigana: '/api/furigana/',
        // システム設定を取得する
        api_format_system_config: '/api/config/%s/',
        // 管理会社情報を取得する。
        api_format_management_company: '/api/management-company/%s/',
        // 車室詳細のＵＲＬフォーマット
        format_parking_position_url: '/whiteboard/whiteboard-position-%s.html'
    },
    message: {
        ADDED_INQUIRY: '問い合わせ履歴を保存しました。',
        ADDED_WAITING: '空き待ちを登録しました。',
    },
}
