module.exports = Address = function() {
};

/**
 * 郵便番号によって場所を取得する。
 * @param {string} post_code 
 */
Address.prototype.get_addresses_by_postcode = function(post_code) {
    var addresses = [];
    if (post_code) {
        var postcode = post_code.replace( /[^0-9]+/g, '');
        if (/^[0-9]{7}$/.test(postcode)) {
            utils.ajax_get(
                config.setting.api_get_address_by_post_code, {'post_code': postcode}, false 
            ).done(function (result) {
                addresses = result.results;
            });
        }
    }
    return addresses;
};

/**
 * 郵便番号によって場所を取得する。
 * @param {String} post_code 
 */
Address.prototype.get_address_by_postcode = function(post_code) {
    var self = this;
    var addresses = self.get_addresses_by_postcode(post_code);
    var address = '';
    if (addresses.length > 0) {
        address = addresses[0].address;
    }
    return address;
};