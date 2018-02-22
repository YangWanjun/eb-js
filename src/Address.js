module.exports = Address = function() {
};

/**
 * 郵便番号によって場所を取得する。
 * @param {string} post_code 
 */
Address.prototype.get_address_by_postcode = function(post_code) {
    var address = [];
    if (post_code) {
        var postcode = post_code.replace( /[^0-9]+/g, '');
        utils.ajax_get(
            config.setting.api_get_address_by_post_code, {'post_code': postcode}
        ).done(function (result) {
            address = result.results;
        });
    }
    return address;
};
