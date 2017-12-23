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

Utils.prototype.ajax_get = function(url, params) {
    return this.ajax_request(url, "GET", params);
};

Utils.prototype.ajax_post = function(url, params) {
    return this.ajax_request(url, "POST", params);
};

Utils.prototype.ajax_put = function(url, params) {
    return this.ajax_request(url, "PUT", params);
};

Utils.prototype.ajax_request = function(url, method, params) {
    var self = this;
    var csrftoken = self.getCookie('csrftoken');

    jQuery.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!self.csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });

    return jQuery.ajax({
        type: method,
        url: url,
        data: params,
        dataType: "json",
        async: false
    });
};

Utils.prototype.ajax_form = function(frmObj, success_fn, failure_fn, always_fn) {
    self = this;
    frmObj.submit(function(){
        self.ajax_request(
            $(this).attr('action'),
            $(this).attr('method'),
            $(this).serialize()
        ).done(function(result) {
            if (success_fn) {
                success_fn(result);
            }
        }).fail(function(result) {
            if (failure_fn) {
                failure_fn(result);
            }
        }).always(function(result){
            if (always_fn) {
                always_fn(result);
            }
        });
        return false;
    });
};

Utils.prototype.isNumeric = function(num) {
    return !isNaN(num);
};

Utils.prototype.toNumComma = function(num) {
    int_comma = (num + "").replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    return int_comma;
};

Utils.prototype.loading = function() {
    $('<div class="loading"><div class="preloader-wrapper big active"><div class="spinner-layer spinner-blue-only"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div></div>').appendTo('body');
};

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
    var col_width = Math.floor(tbl_width / col_count) - 10; // padding: 5px;
    // obj.css('table-layout', 'fixed');
    // obj.width(tbl_width);
    $('tr', obj).each(function(index, tr){
        var col_count = $(tr).children().length;
        $(tr).children().each(function (i, cell) {
            var colspan = parseInt($(cell).attr('colspan'));
            var text = $(cell).text();
            var innerHTML = $(cell).html() || '&nbsp';
            if (colspan && colspan > 0) {
                var width = colspan * col_width;
                $(cell).html("<div class='nowrap' title='" + text + "' style='width: " + width + "px'>" + innerHTML + "</div>");
                $(cell).width(width);
            } else {
                $(cell).html("<div class='nowrap' title='" + text + "' style='width: " + col_width + "px'>" + innerHTML + "</div>");
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
};

/**
 * ファイルのフルパスからファイル名を取得する
 * @param {*} path 
 */
Utils.prototype.getFileName = function(path) {
    if (path) {
        return path.split(/([/\\])/).pop();
    } else {
        return '';
    }
};

/**
 * ファイルのフルパスからファイル名を取得する
 * @param {*} name 
 */
Utils.prototype.getFileNameWithoutExt = function(path) {
    var name = this.getFileName(path);
    if (name) {
        return name.split(/(\.)/)[0];
    } else {
        return '';
    }
};

module.exports = new Utils();
