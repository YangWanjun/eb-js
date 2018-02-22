module.exports = Autocomplete = function() {
    $.ui.autocomplete.prototype._renderItem = function(ul, item) {
        var html = item.label;
        if (item.content_type_name) {
            html = item.label + "<span class='right'>" + item.content_type_name + "</span>"
        }
        return $("<li></li>")
            .data("item.autocomplete", item)
            .append($("<div></div>").html(html))
            .appendTo(ul);
    };
};

Autocomplete.prototype.init = function() {
    if ($ != null) {
        $(".eb-autocomplete").each(function(index) {
            var self = this;
            if ($(self).attr('data-eb-autocomplete-url')) {
                var ajax_url = $(self).attr('data-eb-autocomplete-url') + "?";
                var param_name = $(self).attr('data-eb-autocomplete-parent-name');
                var field_id = $(self).attr('data-eb-autocomplete-parent-field-id');
                var trigger_change = $(self).attr('data-trigger-change');
                if (param_name && field_id && $("#" + field_id).val() != "") {
                    ajax_url = ajax_url + param_name + '=' + $("#" + field_id).val() + "&";
                }
                // 名前を選択され、ＩＤをHiddenFieldに格納する場合はそのHiddenFieldのＩＤを指定する。
                var target_id = $(self).attr('data-eb-autocomplete-target-id');
                // 選択されたオブジェクトのContent Typeを設定する。
                var target_contenttype_id = $(self).attr('data-eb-autocomplete-target-contenttype-id');
                var related_fields = $(self).attr('data-eb-autocomplete-related-fields');

                $(self).autocomplete({
                    source: function( req, res ) {
                        $.ajax({
                            url: ajax_url + "search=" + encodeURIComponent(req.term),
                            dataType: "json",
                            success: function( data ) {
                                res(data);
                            }
                        });
                    },
                    autoFocus: true,
                    delay: 500,
                    minLength: 1,
                    select: function(event, ui) {
                        if(ui.item){
                            if (target_id) {
                                $("#" + target_id).val(ui.item.id);
                            }
                            if (target_contenttype_id) {
                                $("#" + target_contenttype_id).val(ui.item.content_type_id);
                            }
                            if (related_fields) {
                                fields = JSON.parse(related_fields);
                                keys = Object.keys(fields);
                                for (var i=0; i< keys.length; i++) {
                                    key = keys[i];
                                    $("#" + key).val(ui.item[fields[key]]);
                                    $("#" + key).next().addClass("active");
                                }
                            }
                            if (ui.item.label_value) {
                                $(this).val(ui.item.label_value);
                            }
                            if (trigger_change === "true") {
                                $(this).trigger('change');
                                if (target_id) {
                                    $("#" + target_id).trigger('change');
                                }
                                if (target_contenttype_id) {
                                    $("#" + target_contenttype_id).trigger('change');
                                }
                            }
                            if (ui.item.url) {
                                // 画面を遷移します。
                                window.location = ui.item.url;
                            }
                        }
                    },
                    position: {
                        my : "right top",
                        at: "right bottom"
                    }
                });
            }
        });
    }
};
