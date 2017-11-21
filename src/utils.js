Utils = function() {
};

Utils.prototype.getCookie = function(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};

Utils.prototype.csrfSafeMethod = function(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
};

Utils.prototype.ajax_get = function(url, params, success, failure, always) {
    this.ajax_request(url, "GET", params, success, failure, always);
};

Utils.prototype.ajax_post = function(url, params, success, failure, always) {
    this.ajax_request(url, "POST", params, success, failure, always);
};

Utils.prototype.ajax_request = function(url, method, params, success, failure, always) {
    var self = this;
    var csrftoken = self.getCookie('csrftoken');

    jQuery.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!self.csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });

    jQuery.ajax({
        type: method,
        url: url,
        data: params,
        dataType: "json"
    }).done(function(result) {
        success(result);
    }).fail(function(result) {
        failure(result);
    }).always(function(result) {
        always(result);
    });
};

Utils.prototype.isNumeric = function(num) {
    return !isNaN(num);
};

Utils.prototype.toNumComma = function(num) {
    int_comma = (num + "").replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    return int_comma;
}

Utils.prototype.resizeCanvas = function (canvas) {
    // When zoomed out to less than 100%, for some very strange reason,
    // some browsers report devicePixelRatio as less than 1
    // and only part of the canvas is cleared then.
    var ratio =  Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext("2d").scale(ratio, ratio);
};

module.exports = new Utils();
