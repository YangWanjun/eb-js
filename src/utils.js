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

Utils.prototype.autoFixColumns = function(tbl_id) {
    var self = this;
    var obj = $("#" + tbl_id);
    var col_count = self.getTableColCount(tbl_id);
    var tbl_width = obj.width();
    var col_width = Math.floor(tbl_width / col_count);
    obj.css('table-layout', 'fixed');
    obj.width(tbl_width);
    $('tr', obj).each(function(index, tr){
        $(tr).children().each(function(i, cell) {
            var colspan = parseInt($(cell).attr('colspan'));
            if (colspan && colspan > 0) {
                var width = colspan * col_width;
                $(cell).html("<div class='nowrap' style='width: " + width + "px'>" + $(cell).text() + "</div>");            
                $(cell).width(width);
            } else {
                $(cell).html("<div class='nowrap' style='width: " + col_width + "px'>" + $(cell).text() + "</div>");            
                $(cell).width(col_width);
            }
        });
    });
};

Utils.prototype.getTableColCount = function(tbl_id) {
    // テーブルの列数を取得する、colspanも数えて計算する。
    var obj = $("#" + tbl_id);
    var count = 0;
    if ($("thead tr", obj).length > 0) {
        $("th", $("thead tr", obj).eq(0)).each(function(index, element) {
            var colspan = parseInt($(element).attr('colspan'));
            if (colspan && colspan > 0) {
                count += colspan;
            } else {
                count += 1;
            }
        });
    } else {
        count = 0;
    }
    return count;
}

module.exports = new Utils();
