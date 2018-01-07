module.exports = Material = function() {
};

Material.prototype.reset_whiteboard_header = function(tHeader) {
    if ($('tr', tHeader).length > 1) {
        return;
    }
    var row2 = $('tr', tHeader).clone();
    var row3 = $('tr', tHeader).clone();
    row2.html("");
    row3.html("");
    $('th', tHeader).each(function() {
        th = $(this);
        if (th.attr('data-name') == 'bk_no') {
            th.attr('rowspan', 3);
        } else if (th.attr('data-name') == 'parking_lot') {
            th.attr('colspan', 5);
        } else if (th.attr('data-name') == 'address') {
            th.attr('colspan', 5);
            th.css('padding-left', '5px');
            th.appendTo(row2);
        } else if (th.attr('data-name') == 'tanto_name') {
            th.appendTo(row2);
        } else if (th.attr('data-name') == 'price_recruitment') {
            th.appendTo(row2);
        } else if (th.attr('data-name') == 'price_recruitment_no_tax') {
            th.appendTo(row2);
        } else if (th.attr('data-name') == 'price_homepage') {
            th.appendTo(row2);
        } else if (th.attr('data-name') == 'price_homepage_no_tax') {
            th.appendTo(row2);
        } else if (th.attr('data-name') == 'price_handbill') {
            th.appendTo(row2);
        } else if (th.attr('data-name') == 'price_handbill_no_tax') {
            th.appendTo(row2);
        } else if (th.attr('data-name') == 'length') {
            th.css('padding-left', '5px');
            th.appendTo(row3);
        } else if (th.attr('data-name') == 'width') {
            th.appendTo(row3);
        } else if (th.attr('data-name') == 'height') {
            th.appendTo(row3);
        } else if (th.attr('data-name') == 'weight') {
            th.appendTo(row3);
        } else if (th.attr('data-name') == 'tyre_width') {
            th.appendTo(row3);
        } else if (th.attr('data-name') == 'tyre_width_ap') {
            th.appendTo(row3);
        } else if (th.attr('data-name') == 'min_height') {
            th.appendTo(row3);
        } else if (th.attr('data-name') == 'min_height_ap') {
            th.appendTo(row3);
        } else if (th.attr('data-name') == 'f_value') {
            th.appendTo(row3);
        } else if (th.attr('data-name') == 'r_value') {
            th.appendTo(row3);
        } else if (th.attr('data-name') == 'position_comment') {
            th.attr('colspan', 2);
            th.appendTo(row3);
        }
    });
    tHeader.appendChild(row2[0]);
    tHeader.appendChild(row3[0]);
};

Material.prototype.reset_whiteboard_row = function(tr, idx) {
    tr = $(tr)
    var row1 = tr.clone();
    var row2 = tr.clone();
    var row3 = tr.clone();
    row1.html("");
    row2.html("");
    row3.html("");
    row1.css("border-bottom-style", "dotted");
    row2.css("border-bottom-style", "dotted");
    if (idx % 2 == 0) {
        row1.css("background-color", "#f2f2f2");
        row2.css("background-color", "#f2f2f2");
        row3.css("background-color", "#f2f2f2");
    }
    bk_no                           = tr.children().eq(0);
    parking_lot                     = tr.children().eq(1);
    parking_position                = tr.children().eq(2);
    contract_status                 = tr.children().eq(3);
    waiting_count                   = tr.children().eq(4);
    is_existed_contractor_allowed   = tr.children().eq(5);
    is_new_contractor_allowed       = tr.children().eq(6);
    free_end_date                   = tr.children().eq(7);
    time_limit_id                   = tr.children().eq(8);
    address                         = tr.children().eq(9);
    tanto_name                      = tr.children().eq(10);
    price_recruitment               = tr.children().eq(11);
    price_recruitment_no_tax        = tr.children().eq(12);
    price_homepage                  = tr.children().eq(13);
    price_homepage_no_tax           = tr.children().eq(14);
    price_handbill                  = tr.children().eq(15);
    price_handbill_no_tax           = tr.children().eq(16);
    length                          = tr.children().eq(17);
    width                           = tr.children().eq(18);
    height                          = tr.children().eq(19);
    weight                          = tr.children().eq(20);
    tyre_width                      = tr.children().eq(21);
    tyre_width_ap                   = tr.children().eq(22);
    min_height                      = tr.children().eq(23);
    min_height_ap                   = tr.children().eq(24);
    f_value                         = tr.children().eq(25);
    r_value                         = tr.children().eq(26);
    position_comment                = tr.children().eq(27);

    bk_no.attr("rowspan", 3);
    parking_lot.attr("colspan", 5);
    address.attr("colspan", 5);
    address.css("padding-left", "5px");
    length.css("padding-left", "5px");
    position_comment.attr("colspan", 2);
    
    row1.append(bk_no);
    row1.append(parking_lot);
    row1.append(parking_position);
    row1.append(contract_status);
    if (contract_status.text() === "空き") {
        contract_status.html('<span class="new badge left green" data-badge-caption="空き" style="margin-left: 0px;"></span>');
    } else if (contract_status.text() === "手続中") {
        contract_status.html('<span class="new badge left deep-orange" data-badge-caption="手続中" style="margin-left: 0px;"></span>');
    } else {
        contract_status.html('<span class="new badge left grey" data-badge-caption="なし" style="margin-left: 0px;"></span>');
    }
    row1.append(waiting_count);
    row1.append(is_existed_contractor_allowed);
    row1.append(is_new_contractor_allowed);
    row1.append(free_end_date);
    row1.append(time_limit_id);
    $('td', row1).each(function() {
        $(this).css('display', '');
    });

    row2.append(address);
    row2.append(tanto_name);
    row2.append(price_recruitment);
    row2.append(price_recruitment_no_tax);
    row2.append(price_homepage);
    row2.append(price_homepage_no_tax);
    row2.append(price_handbill);
    if (price_handbill_no_tax.html() == "") {
        price_handbill_no_tax.html("&nbsp");
    }
    row2.append(price_handbill_no_tax);
    $('td', row2).each(function() {
        $(this).css('display', '');
    });

    row3.append(length);
    row3.append(width);
    row3.append(height);
    row3.append(weight);
    row3.append(tyre_width);
    row3.append(tyre_width_ap);
    row3.append(min_height);
    row3.append(min_height_ap);
    row3.append(f_value);
    row3.append(r_value);
    // 車室の備考
    if (position_comment.html() == "") {
        position_comment.html("&nbsp;");
    } else {
        if (position_comment.text().length > 5) {
            text = position_comment.text();
            position_comment.addClass("tooltipped");
            position_comment.attr("data-position", "top");
            position_comment.attr("data-delay", "50");
            position_comment.attr("data-tooltip", text);
            position_comment.text(text.substring(0, 4) + "...");
        }
    }
    row3.append(position_comment);
    $('td', row3).each(function() {
        $(this).css('display', '');
        if (utils.isNumeric($(this).text())) {
            $(this).css('text-align', 'right');
            $(this).text(utils.toNumComma($(this).text()));
        }
    });

    return [row1, row2, row3];
};

Material.prototype.popup_anchor = function() {
    $('a.popup').on('click', function() {
        var href = $(this).attr('href');
        window.open(href, "", "width=750, height=500");
        return false;
    });
};

Material.prototype.required_field = function() {
    $("input[required]").each(function(i, obj) {
        $('label[for=' + obj.id + ']').append('<span class="red-text">*</span>');
    });
};

Material.prototype.reflection_form_errors = function(form_obj, error_list) {
    $(".invalid").removeClass('invalid');
    $(form_obj).find('div.errors').remove();
    $.each(Object.keys(error_list), function(index, key) {
        var obj = $("#id_" + key);
        if (obj.prop('tagName').toUpperCase() === 'SELECT') {
            obj.parent().find('input[type=text]').addClass('invalid');
        } else {
            obj.addClass('invalid');
        }
        var error_elem = $.parseHTML('<div class="errors"></div>');
        $.each(error_list[key], function(i, msg) {
            $(error_elem).append('<small class="error">' + msg + '</small>');
        });
        obj.after(error_elem);
    });
};

Material.prototype.send_subscription_mail = function(frmId, success_fn, failure_fn, always_fn) {
    var frmObj = $("#" + frmId);
    utils.ajax_form(
        frmObj,
        success_fn,
        failure_fn,
        always_fn,
    )
    // frmObj.submit();
};

Material.prototype.send_user_subscription = function() {
    var self = this;
    var forms = self.get_sub_forms();
    var error = false;
    $.each(forms, function(i, frm) {
        utils.ajax_request(
            $(frm).attr('action'),
            $(frm).attr('method'),
            $(frm).serialize()
        ).done(function(result) {
            error = result.error;
            if (result.error) {
                if (result.message) {
                    console.log(result.message)
                } else {
                    $.each(Object.keys(result), function(index, key) {
                        console.log(result[key])
                    });
                }
                return false;
            } else {
                // debugger;
            }
        }).fail(function(result) {
            return false;
        }).always(function(result) {
            // debugger;
        });
    });
    if (error) {
    }
};

Material.prototype.get_sub_forms = function() {
    var forms = Array();
    $("iframe").each(function(i, iframeObj) {
        $(iframeObj).contents().find("form").each(function(i, frm){
            // forms.push({url: iframeObj.src, form: frm});
            $(frm).attr('action', iframeObj.src);
            forms.push(frm);
        });
    });
    return forms;
};

Material.prototype.task_finish = function(obj, url, task_name) {
    var self = this;
    // タスクを完了とします。
    if (confirm('「' + task_name + '」のタスクを完了とします、よろしいですか？') == true) {
        utils.ajax_put(url, {}).done(function(result) {
            if (result.status === '99') {
                Materialize.toast('「' + task_name + '」のタスクは完了しました。', config.setting.toast_timeout);
                $(obj).addClass('disabled');
                $(obj).prev().addClass('disabled');
                self.update_task_info(obj, result.status);
            }
        }).fail(function(result) {
            alert(result.responseJSON.detail);
        });
    }
};

Material.prototype.task_skip = function(obj, url, task_name) {
    var self = this;
    // タスクを完了とします。
    if (confirm('「' + task_name + '」のタスクをスキップします、よろしいですか？') == true) {
        utils.ajax_put(url, {}).done(function(result) {
            if (result.status === '10') {
                Materialize.toast('「' + task_name + '」のタスクはスキップしました。', config.setting.toast_timeout);
                $(obj).addClass('disabled');
                $(obj).next().addClass('disabled');
                self.update_task_info(obj, result.status);
            }
        }).fail(function(result) {
            alert(result.responseJSON.detail);
        });
    }
};

Material.prototype.contract_cancel = function(obj, url) {
    var self = this;
    // タスクを完了とします。
    if (confirm('このタスクをキャンセルすると、契約は破棄することになるので、よろしいですか？') == true) {
        utils.ajax_put(url, {}).done(function(result) {
            if (result.status === '91') {
                Materialize.toast('契約はキャンセルしました。', config.setting.toast_timeout);
                $(obj).addClass('disabled');
                $(obj).next().addClass('disabled');
                self.update_task_info(obj, result.status);
            }
        }).fail(function(result) {
            alert(result.responseJSON.detail);
        });
    }
};

Material.prototype.update_task_info = function(obj, status) {
    var self = this;
    self.set_task_status($(obj).closest('li'), status);
    // 進捗を更新する。
    var total = $(obj).closest('ul.collapsible').find('li').length;
    var count = $(obj).closest('ul.collapsible').find('.badge.grey').length;
    $(obj).closest('div.card-content').find('span.percentage').text(Math.round((count/total) * 1000) / 10);
    $(obj).closest('div.card-content').find('.determinate').css('width', Math.round((count/total) * 1000) / 10 + '%');
};

Material.prototype.set_task_status = function(liObj, status) {
    var name, color;
    if (status === '99') {
        name = '完了';
        color = 'grey';
    } else if (status === '10') {
        name = 'スキップ';
        color = 'grey';
    } else if (status === '02') {
        name = '実施中';
        color = 'purple';
    }
    $(liObj).find('.badge').addClass(color);
    $(liObj).find('.badge').attr('data-badge-caption', name);
};

Material.prototype.reset_mce_data_href = function() {
    if ($('div.mce-container iframe').length > 0) {
        $('div.mce-container iframe').contents().find('a').each(function(index, ancher) {
            var href = $(ancher).attr('href');
            $(ancher).attr('data-mce-href', href);
        });
    }
};

Material.prototype.expand_parking_lot = function(obj, code) {
    var self = this;
    self.collapse_all_parking_lot();
    var tr = $(obj).closest('tr');
    var td = $(obj).closest('td');
    var col_count = tr.children().length;
    utils.ajax_get(
        config.setting.api_size_grouped_positions, 
        {code: code}
    ).done(function(result) {
        td.html('<a href="javascript:void(0)"><i class="small material-icons">expand_less</i></a>');
        $('a', td).click(function() { 
            self.collapse_all_parking_lot();
            self.collapse_parking_lot(td, code); 
        });
        var tbl = self.get_expanded_positions_html(result);
        var newRow = $.parseHTML('<tr class="appended-positions"><td colspan="' + col_count + '"></td></tr>');
        $(newRow).find('td').append(tbl);
        tr.after(newRow);
    }).fail(function(result) {
        debugger;
    }).always(function(result){
        // debugger;
    });
};

/**
 * 駐車場コードによって取得した車室をHTMLのTableに返す
 * @param {Array} result 
 */
Material.prototype.get_expanded_positions_html = function(result) {
    var self = this;
    var headHtml = '<table><thead><tr>' + 
    '<th>車室</th>' +
    '<th>数量</th>' +
    '<th>全長</th><th>全幅</th><th>全高</th><th>重量</th>' +
    '<th>募集(込)</th>' +
    '<th>募集(抜)</th>' +
    '<th>ＨＰ(込)</th>' +
    '<th>ＨＰ(抜)</th>' +
    '<th>ﾁﾗｼ(込)</th>' +
    '<th>ﾁﾗｼ(抜)</th>' +
    '<th>空き</th>' +
    '</tr></thead><tbody></tbody></table>';
    var tbl = $.parseHTML(headHtml);
    $.each(result, function(i, position) {
        $('tbody', tbl).append('<tr>' + 
        '<td>' + self.combine_parking_position(position.sub_positions) + '</td>' +
        '<td>' + utils.toNumComma(position.count) + '</td>' +
        '<td>' + utils.toNumComma(position.length) + '</td>' +
        '<td>' + utils.toNumComma(position.width) + '</td>' +
        '<td>' + utils.toNumComma(position.height) + '</td>' +
        '<td>' + utils.toNumComma(position.weight) + '</td>' +
        '<td>' + utils.toNumComma(position.price_recruitment) + '</td>' +
        '<td>' + utils.toNumComma(position.price_recruitment_no_tax) + '</td>' +
        '<td>' + utils.toNumComma(position.price_homepage) + '</td>' +
        '<td>' + utils.toNumComma(position.price_homepage_no_tax) + '</td>' +
        '<td>' + utils.toNumComma(position.price_handbill) + '</td>' +
        '<td>' + utils.toNumComma(position.price_handbill_no_tax) + '</td>' +
        '<td>' + self.get_contract_status_html(position.status) + '</td>' +
        '</tr>');
    });

    return tbl;
}

/**
 * 車室のリストをHTMLのAnchorで結合する。
 * @param {Array} positions 
 */
Material.prototype.combine_parking_position = function(positions) {
    var html = '';
    if (positions && positions.length > 0) {
        $.each(positions, function(i, obj) {
            var url = utils.format(config.setting.format_parking_position_url, obj.id);
            var class_name = '';
            if (obj.status == '01') {
                // 空き
                class_name = 'green-text';
            } else if (obj.status == '02') {
                // 手続中
                class_name = 'deep-orange-text';
            } else if (obj.status == '03') {
                // 空無
                class_name = 'grey-text';
            } else if (obj.status == '04') {
                // 仮押さえ
                class_name = 'blue-text';
            }
            html += '<a class="' + class_name + '" data-turbolinks="false" style="margin:0px 3px;" href="' + url + '">' + obj.name + '</a>';
        });
    }
    return html;
};

Material.prototype.collapse_all_parking_lot = function() {
    var self = this;
    $('tr.appended-positions').each(function(i, tr) {
        var code = $(tr).prev().children().first().text();
        self.collapse_parking_lot($(tr).prev().children().last(), code);
        $(tr).remove();
    });
};

Material.prototype.collapse_parking_lot = function(cell, code) {
    var self = this;
    $(cell).html('<a href="javascript:void(0)"><i class="small material-icons">expand_more</i></a>');
    $(cell).find('a').click(function() {
        self.expand_parking_lot(cell, code);
    });
};

/**
 * 電話で問い合わせたユーザー情報をlocalStorageに保存
 */
Material.prototype.save_user_info = function() {
    var self = this;
    $('div.local-storage input,div.local-storage textarea,div.local-storage select').each(function(i, obj) {
        $(obj).change(function() {
            self.save_value(obj);
        });
    });
};

/**
 * INPUT項目のユーザー情報を保存する
 * @param {element} obj 
 */
Material.prototype.save_value = function(obj) {
    var self = this;
    var user_info = self.get_user_info();
    var ele_id = $(obj).attr('id');
    if ($(obj).attr('type') == 'checkbox') {
        user_info[ele_id] = $(obj).is(':checked');
    } else {
        user_info[ele_id] = $(obj).val();
        // HiddenFieldの項目がある場合、その値も設定する。
        var target_id = $("#" + ele_id).attr('eb-autocomplete-target-id');
        if (target_id) {
            user_info[target_id] = $("#" + target_id).val();
        }
    }
    localStorage.setItem('user_info', JSON.stringify(user_info));
};

/**
 * localStorageから保存されたユーザー情報を取得する。
 */
Material.prototype.get_user_info = function() {
    return JSON.parse(localStorage.getItem('user_info')) || {};
};

/**
 * 電話で問い合わせたユーザー情報を反映する。
 */
Material.prototype.load_user_info = function() {
    var self = this;
    var user_info = self.get_user_info();
    if (user_info) {
        $.each(Object.keys(user_info), function(i, key) {
            var value = user_info[key];
            if (value === true) {
                $("#" + key).prop('checked', true);
            } else if (value === false) {
                $("#" + key).prop('checked', false);
            } else {
                $("#" + key).next().addClass('active');
                $("#" + key).val(value);
            }
        });
    }
};

/**
 * ユーザー情報をlocalStorageから削除する。
 */
Material.prototype.clear_user_info = function() {
    var self = this;
    $('div.local-storage input,div.local-storage textarea').each(function(i, obj) {
        if ($(obj).attr('type') == 'checkbox') {
            $(obj).prop('checked', false);
        } else {
            $(obj).val('');
            $(obj).next().removeClass('active');
            // HiddenFieldの項目がある場合、その値も設定する。
            var target_id = $(obj).attr('eb-autocomplete-target-id');
            if (target_id) {
                $("#" + target_id).val('');
            }
        }    
    });
    localStorage.removeItem('user_info');
};

/**
 * 問い合わせ情報を履歴に保存する
 */
Material.prototype.save_inquiry = function(obj) {
    var self = this;
    if ($(obj).hasClass('eb-disabled')) {
        return false;
    } else {
        var user_info = self.get_user_info();
        if (user_info) {
            console.log(user_info);
            utils.ajax_post(
                config.setting.api_add_inquiry,
                user_info
            ).done(function(result){
                Materialize.toast('問い合わせ履歴を保存しました。', config.setting.toast_timeout);
            }).fail(function(result) {
                console.log(result.responseJSON);
            });
        }
    }
};

/**
 * ユーザー情報によって、駐車場を自動マッチする。
 */
Material.prototype.match_parking_lot = function(datatable) {
    var self = this;
    var user_info = self.get_user_info();
    if (user_info) {
        if (user_info.parking_lot_name) {
            datatable.search( user_info.parking_lot_name ).draw();
        }
    }
}

/**
 * 契約状態のbadgeを取得する
 * @param {string} status 
 */
Material.prototype.get_contract_status_html = function(status) {
    if (status === '01') {
        html = '<span class="new badge left green" data-badge-caption="空き" style="margin-left: 0px;"></span>';
    } else if (status === '02') {
        html = '<span class="new badge left deep-orange" data-badge-caption="手続中" style="margin-left: 0px;"></span>';
    } else if (status === '03') {
        html = '<span class="new badge left grey" data-badge-caption="空無" style="margin-left: 0px;"></span>';
    } else if (status === '04') {
        html = '<span class="new badge left blue" data-badge-caption="仮押" style="margin-left: 0px;"></span>';
    } else {
        html = status;
    }
    return html;
};
