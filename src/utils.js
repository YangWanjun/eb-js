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

Utils.prototype.ajax_delete = function(url, params) {
    return this.ajax_request(url, "DELETE", params);
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
        async: true
    });
};

Utils.prototype.ajax_form = function(frmObj, success_fn, failure_fn, always_fn) {
    self = this;
    frmObj.submit(function(){
        self.loading();
        self.ajax_request(
            $(this).attr('action'),
            $(this).attr('method'),
            $(this).serialize()
        ).done(function (result) {
            try {
                if (success_fn) {
                    success_fn(result);
                }
            } catch (e) {
                console.log(e);
            }
        }).fail(function (result) {
            try {
                if (failure_fn) {
                    failure_fn(result);
                }
            } catch (e) {
                console.log(e);
            }
        }).always(function (result) {
            try {
                self.loaded();
                if (always_fn) {
                    always_fn(result);
                }
            } catch (e) {
                console.log(e);
            }
        });
        return false;
    });
};

Utils.prototype.isNumeric = function(num) {
    return !isNaN(num);
};

Utils.prototype.toNumComma = function(num) {
    if (num) {
        int_comma = (num + "").replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        return int_comma;
    } else {
        return '';
    }
};

/**
 * URLからパラメーターを取得する
 */
Utils.prototype.getQueryParams = function() {
    var result = {};
    if( 1 < window.location.search.length ) {
        // 最初の1文字 (?記号) を除いた文字列を取得する
        var query = window.location.search.substring( 1 );

        // クエリの区切り記号 (&) で文字列を配列に分割する
        var parameters = query.split( '&' );

        for( var i = 0; i < parameters.length; i++ )
        {
            // パラメータ名とパラメータ値に分割する
            var element = parameters[ i ].split( '=' );

            var paramName = decodeURIComponent( element[ 0 ] );
            var paramValue = decodeURIComponent( element[ 1 ] );

            // パラメータ名をキーとして連想配列に追加する
            result[ paramName ] = paramValue;
        }
    }
    return result;
};

/**
 * URLから指定名前のパラメーターを取得する。
 * @param {string} name 
 */
Utils.prototype.getQueryString = function(name) {
    var params = GetQueryString();
    return params[name];
};

/**
 * ローディング画面を表示する。
 */
Utils.prototype.loading = function() {
    $('body').append(
        '<div class="loading">' + 
            '<div class="preloader-wrapper big active">' + 
                '<div class="spinner-layer spinner-blue-only">' + 
                    '<div class="circle-clipper left"> ' + 
                        '<div class="circle"></div>' + 
                    '</div>' + 
                    '<div class="gap-patch">' + 
                        '<div class="circle"></div>' + 
                    '</div>' + 
                    '<div class="circle-clipper right">' + 
                        '<div class="circle"></div>' + 
                    '</div>' + 
                '</div>' + 
            '</div>' +
        '</div>'
    );
    $("html").css("overflow", "hidden");
    $("html").css("padding-right", "17px");
};

/**
 * ローディング画面を消す。
 */
Utils.prototype.loaded = function() {
    var loadings = $("body div.loading");
    if (loadings.length == 1) {
        loadings.remove();
        $("html").css("overflow", "");
        $("html").css("padding-right", "");
    } else if (loadings.length > 1) {
        // 複数のloading画面が存在する場合、１つだけ削除します。
        loadings.eq(0).remove();
    }
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

Utils.prototype.autoFixColumns = function(obj) {
    var self = this;
    var col_count = self.getTableColCount(obj);
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

Utils.prototype.getTableColCount = function(obj) {
    // テーブルの列数を取得する、colspanも数えて計算する。
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

/**
 * 文字列をフォーマットする
 * @param {string} format 
 */
Utils.prototype.format = function(format){
    var i = 0,
        j = 0,
        r = "",
        next = function(args){
            j += 1; i += 1;
            return args[j] !== void 0 ? args[j] : "";
        };

    for(i=0; i<format.length; i++){
        if(format.charCodeAt(i) === 37){
            switch(format.charCodeAt(i+1)){
                case 115: r += next(arguments); break;
                case 100: r += Number(next(arguments)); break;
                default: r += format[i]; break;
            }
        } else {
            r += format[i];
        }
    }
    return r;
};

/**
 * 日付をフォーマットする
 * @param {Date} date 
 * @param {String} format 
 */
Utils.prototype.formatDate = function (date, format) {
    if (!format) {
        format = 'YYYY-MM-DD hh:mm:ss.SSS';
    }
    if (typeof date === "string") {
        date = new Date(date);
    }
    format = format.replace(/YYYY/g, date.getFullYear());
    format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
    format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2));
    format = format.replace(/hh/g, ('0' + date.getHours()).slice(-2));
    format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
    format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
    if (format.match(/S/g)) {
        var milliSeconds = ('00' + date.getMilliseconds()).slice(-3);
        var length = format.match(/S/g).length;
        for (var i = 0; i < length; i++) format = format.replace(/S/, milliSeconds.substring(i, i + 1));
    }
    return format;
};

Utils.prototype.initForm = function(frmObj, data) {
    $.each(Object.keys(data), function(i, key) {
        $("[name=" + key + "]", frmObj).val(data[key]);
    });
};

module.exports = new Utils();
