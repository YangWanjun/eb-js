$(document).ready(function () {
    if ($ != null) {
        $(".eb-autocomplete").each(function(index) {
            var self = this;
            if ($(self).attr('eb-autocomplete-url')) {
                var ajax_url = $(self).attr('eb-autocomplete-url') + "?";
                var param_name = $(self).attr('eb-autocomplete-parent-name');
                var field_id = $(self).attr('eb-autocomplete-parent-field-id');
                if (param_name && field_id && $("#" + field_id).val() != "") {
                    ajax_url = ajax_url + param_name + '=' + $("#" + field_id).val() + "&";
                }
                var target_id = $(self).attr('eb-autocomplete-target-id');
                var related_fields = $(self).attr('eb-autocomplete-related-fields');

                $(self).autocomplete({
                    source: function( req, res ) {
                        $.ajax({
                            url: ajax_url + "search=" + encodeURIComponent(req.term),
                            dataType: "json",
                            success: function( data ) {
                                res(data.results);
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
                            if (related_fields) {
                                fields = JSON.parse(related_fields);
                                keys = Object.keys(fields);
                                for (var i=0; i< keys.length; i++) {
                                    key = keys[i];
                                    $("#" + key).val(ui.item[fields[key]]);
                                    $("#" + key).next().addClass("active");
                                }
                            }
                        }
                    }
                });
            }
        });
    }
});
