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

/**
 * ajax呼出し後、エラー発生したら、エラーメッセージを表示する。
 * @param {element} form_obj 
 * @param {json} error_list 
 */
Material.prototype.reflection_form_errors = function(form_obj, error_list) {
    var self = this;
    if (error_list.detail) {
        self.toast_error(error_list.detail);
    } else {
        $(".invalid").removeClass('invalid');
        $(form_obj).find('div.errors').remove();
        $.each(Object.keys(error_list), function(index, key) {
            var obj = $("#id_" + key, form_obj);
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
    }
};

/**
 * タスクにメール送信のイベント
 * @param {String} frmId 
 */
Material.prototype.send_task_mail = function(frmId, success_fn, failure_fn, always_fn) {
    var self = this;
    var frmObj = $("#" + frmId);
    utils.ajax_form(
        frmObj,
        function (result) {
            self.mail_sent_success_fn(result, frmObj);
            if (success_fn) {
                success_fn(result);
            }
        },
        function (result) {
            self.mail_sent_failure_fn(result, frmObj);
            if (failure_fn) {
                failure_fn(result);
            }
        },
        function (result) {
            self.mail_sent_always_fn(result, frmObj);
            if (always_fn) {
                always_fn(result);
            }
        },
    );
};

/**
 * メール送信成功時
 * @param {*} result 
 * @param {*} frmObj 
 */
Material.prototype.mail_sent_success_fn = function(result, frmObj) {
    var self = this;
    if (result.error) {
        alert(result.message);
    } else {
        self.toast('メール送信しました!', config.setting.toast_timeout);
        var btnSendMail = $(frmObj).closest('div.collapsible-body').find('a.task-mail');
        // 進捗更新
        self.update_task_info(btnSendMail, result);
    }
};

Material.prototype.mail_sent_failure_fn = function(result, frmObj) {

};

Material.prototype.mail_sent_always_fn = function(result, frmObj) {

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
        utils.loading();
        utils.ajax_put(url, {}).done(function(result) {
            if (result.status === '99') {
                self.toast('「' + task_name + '」のタスクは完了しました。', config.setting.toast_timeout);
                $(obj).addClass('disabled');
                $(obj).prev().addClass('disabled');
                self.update_task_info(obj, result);
            }
        }).fail(function(result) {
            alert(result.responseJSON.detail);
        }).always(function(result) {
            utils.loaded();
        });
    }
};

Material.prototype.task_skip = function(obj, url, task_name) {
    var self = this;
    // タスクを完了とします。
    if (confirm('「' + task_name + '」のタスクをスキップします、よろしいですか？') == true) {
        utils.loading();
        utils.ajax_put(url, {}).done(function(result) {
            if (result.status === '10') {
                self.toast('「' + task_name + '」のタスクはスキップしました。', config.setting.toast_timeout);
                $(obj).addClass('disabled');
                $(obj).next().addClass('disabled');
                self.update_task_info(obj, result);
            }
        }).fail(function(result) {
            alert(result.responseJSON.detail);
        }).always(function(result) {
            utils.loaded();
        });
    }
};

/**
 * タスクを未実施の状態に戻ります。
 * @param {element} obj 
 * @param {string} url 
 * @param {string} task_name 
 */
Material.prototype.task_undo = function(obj, url, task_name) {
    var self = this;
    // タスクを完了とします。
    if (confirm('「' + task_name + '」のタスクを未実施の状態に戻ります、よろしいですか？') == true) {
        utils.loading();
        utils.ajax_put(url, {}).done(function(result) {
            if (result.status === '01') {
                self.toast('「' + task_name + '」のタスクは未実施の状態に戻りました。', config.setting.toast_timeout);
                $(obj).addClass('disabled');
                $(obj).next().removeClass('disabled');
                self.update_task_info(obj, result);
            }
        }).fail(function(result) {
            alert(result.responseJSON.detail);
        }).always(function(result) {
            utils.loaded();
        });
    }
};

Material.prototype.contract_cancel = function(obj, url) {
    var self = this;
    // タスクを完了とします。
    if (confirm('このタスクをキャンセルすると、契約は破棄することになるので、よろしいですか？') == true) {
        utils.loading();
        utils.ajax_put(url, {}).done(function(result) {
            if (result.status === '91') {
                self.toast('契約はキャンセルしました。', config.setting.toast_timeout);
                $(obj).addClass('disabled');
                $(obj).next().addClass('disabled');
                self.update_task_info(obj, result);
            }
        }).fail(function(result) {
            alert(result.responseJSON.detail);
        }).always(function(result) {
            utils.loaded();
        });
    }
};

Material.prototype.update_task_info = function(obj, result) {
    var self = this;
    self.set_task_status($(obj).closest('li'), result.status);
    // 進捗を更新する。
    var total = $(obj).closest('ul.collapsible').find('li').length;
    var count = $(obj).closest('ul.collapsible').find('.badge.grey').length;
    $(obj).closest('div.card-content').find('span.percentage').text(Math.round((count/total) * 1000) / 10);
    $(obj).closest('div.card-content').find('.determinate').css('width', Math.round((count/total) * 1000) / 10 + '%');
    // 取り消しのボタンを活性化する
    if (result.status === '01') {
        $(obj).closest('div').find('a.task').removeClass('disabled');
        $(obj).closest('div').find('a.task-undo').addClass('disabled');
    } else {
        $(obj).closest('div').find('a.task').addClass('disabled');
        $(obj).closest('div').find('a.task-undo').removeClass('disabled');
    }
    // 前回送信時間と送信者
    var objLi = $(obj).closest('li');
    if (objLi.find('span.updated_user').length > 0) {
        objLi.find('span.updated_date').text(utils.formatDate(result.updated_date, 'YYYY年MM月DD日 hh:mm'));
        objLi.find('span.updated_user').text(result.updated_user_name);
    } else {
        objLi.find('div.updated_datetime div:first-child').html('<span style="font-weight: bold;">前回実施日時：</span><span class="updated_date">' + utils.formatDate(result.updated_date, 'YYYY年MM月DD日 hh:mm') + '</span>');
        objLi.find('div.updated_datetime div:last-child').html('<span style="font-weight: bold;">実施者：</span><span class="updated_user">' + result.updated_user_name + '</span>');
    }
};

Material.prototype.set_task_status = function(liObj, status) {
    var name, color;
    if (status === '99') {
        name = '完了';
        color = 'grey';
    } else if (status === '01') {
        name = '未実施';
        color = 'red';
    } else if (status === '10') {
        name = 'スキップ';
        color = 'grey';
    } else if (status === '02') {
        name = '実施中';
        color = 'purple';
    }
    $(liObj).find('.badge').removeClass('grey');
    $(liObj).find('.badge').removeClass('red');
    $(liObj).find('.badge').removeClass('purple');
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
    // self.collapse_all_parking_lot();
    var tr = $(obj).closest('tr');
    var td = $(obj).closest('td');
    var col_count = tr.children().length;
    utils.ajax_get(
        config.setting.api_whiteboard_positions, 
        {whiteboard__code: code}
    ).done(function(result) {
        td.html('<a href="javascript:void(0)"><i class="small material-icons" style="font-size: 22px;">expand_less</i></a>');
        $('a', td).click(function() { 
            // self.collapse_all_parking_lot();
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
    var headHtml = '<table class="table bordered highlight"><thead><tr>' + 
    '<th style="padding-right: 0px;">車室</th>' +
    '<th style="padding-right: 0px;">分類</th>' +
    '<th style="padding-right: 0px;">全長</th>' + 
    '<th style="padding-right: 0px;">全幅</th>' +
    '<th style="padding-right: 0px;">全高</th>' +
    '<th style="padding-right: 0px;">重量</th>' +
    //'<th>募集(込)</th>' +
    //'<th>募集(抜)</th>' +
    '<th style="padding-right: 0px;">ＨＰ(込)</th>' +
    '<th style="padding-right: 0px;">ＨＰ(抜)</th>' +
    '<th style="padding-right: 0px;">ﾁﾗｼ(込)</th>' +
    '<th style="padding-right: 0px;">ﾁﾗｼ(抜)</th>' +
    '<th style="padding-right: 0px;">空き</th>' +
    '</tr></thead><tbody></tbody></table>';
    var tbl = $.parseHTML(headHtml);
    $.each(result, function(i, position) {
        $('tbody', tbl).append('<tr>' +
        '<td style="padding-left: 0;">' + self.combine_parking_position(position) + '</td>' +
        '<td>' + position.category.name + '</td>' +
        '<td>' + utils.toNumComma(position.length) + '</td>' +
        '<td>' + utils.toNumComma(position.width) + '</td>' +
        '<td>' + utils.toNumComma(position.height) + '</td>' +
        '<td>' + utils.toNumComma(position.weight) + '</td>' +
        //'<td>' + utils.toNumComma(position.price_recruitment) + '</td>' +
        //'<td>' + utils.toNumComma(position.price_recruitment_no_tax) + '</td>' +
        '<td>' + utils.toNumComma(position.price_homepage) + '</td>' +
        '<td>' + utils.toNumComma(position.price_homepage_no_tax) + '</td>' +
        '<td>' + utils.toNumComma(position.price_handbill) + '</td>' +
        '<td>' + utils.toNumComma(position.price_handbill_no_tax) + '</td>' +
        '<td>' + self.get_contract_status_html(position.position_status) + '</td>' +
        '</tr>');
    });
    $("tr:last", tbl).css('border-bottom', '0');

    return tbl;
}

/**
 * 車室のリストをHTMLのAnchorで結合する。
 * @param {Array} positions 
 */
Material.prototype.combine_parking_position = function(position) {
    var html = '';
    if (position) {
        var url = utils.format(config.setting.format_parking_position_url, position.parking_position);
        var class_name = '';
        if (position.position_status == '01') {
            // 空き
            class_name = 'green-text';
        } else if (position.position_status == '02') {
            // 手続中
            class_name = 'deep-orange-text';
        } else if (position.position_status == '03') {
            // 空無
            class_name = 'grey-text';
        } else if (position.position_status == '04') {
            // 仮押さえ
            class_name = 'blue-text';
        } else if (position.position_status == '05') {
            // 貸止め
            class_name = 'red-text';
        }
        html += '<a class="' + class_name + '" data-turbolinks="false" style="margin:0px 3px;" href="' + url + '">' + position.name + '</a>';
    }
    return html;
};

Material.prototype.collapse_all_parking_lot = function() {
    var self = this;
    $('tr.appended-positions').each(function(i, tr) {
        var code = $(tr).prev().children().last().attr("code");
        self.collapse_parking_lot($(tr).prev().children().last(), code);
        $(tr).remove();
    });
};

Material.prototype.collapse_parking_lot = function(cell, code) {
    var self = this;
    $(cell).html('<a href="javascript:void(0)"><i class="small material-icons" style="font-size: 22px;">expand_more</i></a>');
    $(cell).find('a').click(function() {
        self.expand_parking_lot(cell, code);
    });
    var tr = $(cell).closest('tr').next();
    if (tr.hasClass('appended-positions')) {
        tr.remove();
    }
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
        var target_id = $("#" + ele_id).attr('data-eb-autocomplete-target-id');
        if (target_id) {
            if ($(obj).val() == "") {
                // 主項目が空白の場合、HiddenField項目も空白にする。
                $("#" + target_id).val("");
            }
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
            var target_id = $(obj).attr('data-eb-autocomplete-target-id');
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
                self.toast(config.message.ADDED_INQUIRY, config.setting.toast_timeout);
            }).fail(function(result) {
                console.log(result.responseJSON);
            });
        }
    }
};

/**
 * 聞き取り情報を空き待ちに登録する。
 * @param {element} obj 
 */
Material.prototype.waiting_from_inquiry = function(obj) {
    var self = this;
    if ($(obj).hasClass('eb-disabled')) {
        return false;
    } else {
        $(obj).addClass('eb-disabled');
        var user_info = self.get_user_info();
        if (user_info) {
            // 希望駐車場／エリアが選択されたかをチェック
            if (!user_info.target_parking_lot_name && !user_info.target_city_name && !user_info.target_aza_name) {
                $(obj).removeClass('eb-disabled');
                self.toast_error('希望駐車場または希望エリアはまだ選択されていません。');
                return false;
            }
            utils.ajax_post(
                config.setting.api_add_waiting,
                user_info
            ).done(function (result) {
                self.toast(config.message.ADDED_WAITING, config.setting.toast_timeout);
            }).fail(function (result) {
                console.log(result.responseJSON);
                $(obj).removeClass('eb-disabled');
            });
        }
        return true;
    }
};

/**
 * ユーザー情報によって、駐車場を自動マッチする。
 */
Material.prototype.match_parking_lot = function(datatable) {
    var self = this;
    var user_info = self.get_user_info();
    if (user_info) {
        if (user_info.target_parking_lot_name) {
            datatable.search( user_info.target_parking_lot_name ).draw();
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
    } else if (status === '05') {
        html = '<span class="new badge left red" data-badge-caption="貸止" style="margin-left: 0px;"></span>';
    } else {
        html = status;
    }
    return html;
};

/**
 * 申込から成約になる
 * @param {element} obj 
 */
Material.prototype.subscription_finish = function(obj) {
    var self = this;
    if (confirm('仮契約を本契約に登録します、よろしいですか？') == true) {
        utils.loading();
        utils.ajax_post(
            obj.href, {}
        ).done(function(result){
            self.toast('本契約に登録しました', config.setting.toast_timeout);
            window.location = result.url;
        }).fail(function(result) {
            self.toast_error(result.responseJSON.detail, config.setting.toast_timeout);
        }).always(function(result) {
            utils.loaded();
        });
    }
};

/**
 * 契約手続きを破棄する、データを削除することになる。
 * @param {element} obj 
 */
Material.prototype.subscription_destroy = function(obj) {
    var self = this;
    if (confirm('契約手続きを破棄します、よろしいですか？\n破棄されましたら、復元することはできません。')) {
        utils.loading();
        utils.ajax_delete(
            obj.href, {}
        ).done(function(result){
            self.toast('契約手続きを破棄しました。', config.setting.toast_timeout);
            window.location = $(obj).attr('data-target-href');
        }).fail(function(result) {
            self.toast_error(result.responseJSON.detail, config.setting.toast_timeout);
        }).always(function(result) {
            utils.loaded();
        });
    }
};

/**
 * メッセージを表示する
 * @param {string} message 
 */
Material.prototype.toast = function(message) {
    Materialize.toast(message, config.setting.toast_timeout);
};

/**
 * エラーメッセージを表示する
 * @param {string} message 
 */
Material.prototype.toast_error = function(message) {
    Materialize.toast(message, config.setting.toast_timeout, "deep-orange");
};
/**
 * すべて選択／すべて外す
 * @param {element} obj 
 */
Material.prototype.check_all = function(obj, name) {
    $(obj).click(function() {
        if ($(this).is(':checked')) {
            $("input[type=checkbox][name=" + name + "]").prop('checked', true);
            $("input[type=checkbox][name=" + name + "]").closest('tr').addClass("green-text");
        } else {
            $("input[type=checkbox][name=" + name + "]").prop('checked', false);
            $("input[type=checkbox][name=" + name + "]").closest('tr').removeClass("green-text");
        }
    });
};

/**
 * 一行のレコードを選択時のイベント
 * @param {string} name 
 */
Material.prototype.check_single = function(name) {
    $("input[type=checkbox][name=" + name + "]").click(function(){
        if ($(this).is(':checked')) {
            $(this).closest('tr').addClass("green-text");
        } else {
            $(this).closest('tr').removeClass("green-text");
        }
    });
};

/**
 * DataTableに変更時、ページング用のプルダウンをテーブルの右上に移動する。
 * @param {string} tblId 
 * @param {string} moveToId 
 */
Material.prototype.remove_paging_dropdown = function(tblId, moveToId) {
    // PageSizeのドロップダウンをタイトル欄に移動する。
    $("#" + tblId + "_length").appendTo("#" + moveToId);
    $("#" + tblId + "_length").addClass("right");
    $("#" + tblId + "_length select").addClass("browser-default");
    $("#" + tblId + "_length select").css("width", "60px");
    $("#" + tblId + "_length select").css("height", "25px");
    $("#" + tblId + "_length select").css("display", "inherit");
};

/**
 * 必須項目の入力チェック
 */
Material.prototype.check_required = function() {
    var self = this;
    // 必須項目を洗い出す
    $("input[required]").each(function(i, obj) {
        var input_type = $(obj).attr('type');
        if (input_type === 'text') {
            if ($(obj).val() == "") {
                self.show_required_balloon(obj);
                return false;
            }
        }
    });
};

/**
 * 必須項目の吹き出しを表示する。
 * @param {element} obj 
 */
Material.prototype.show_required_balloon = function(obj) {
//'<div class="balloon_wrapper">' + 
//    '<div class="balloon_box">' +
//        'このフィールドを入力してください。' +
//    '</div>' +
//'</div>'
};

/**
 * フリガナを取得する。
 * @param {String} sentence
 */
Material.prototype.get_furigana = function(sentence) {
    var furigana = '';
    if (sentence) {
        utils.ajax_get(
            config.setting.api_get_furigana, 
            {search: sentence},
            false
        ).done(function(result) {
            furigana = result.katakana;
        }).fail(function(result) {
            console.log(result);
            furigana = '';
        }).always(function(result){
            // debugger;
        });
    }
    return furigana;
};

/**
 * フリガナを設定する。
 * @param {element} obj
 * @param {String} target_id 
 */
Material.prototype.set_furigana = function(obj, target_id) {
    var self = this;
    var furigana = self.get_furigana($(obj).val());
    $("#" + target_id).val(furigana);
};

/**
 * datepickerに今日の日付を設定する。
 * @param {element} obj 
 */
Material.prototype.set_datepicker_today = function(obj) {
    var today = utils.formatDate(new Date(), 'YYYY-MM-DD');
    if ($(obj).parent().prev().attr('class') == "vDateField") {
        $(obj).parent().prev().val(today);
        $(obj).parent().next().addClass('active');
    }
};

/**
 * システム設定を取得する。
 * @param {String} name 
 */
Material.prototype.get_config = function(name) {
    var value = '';
    if (name) {
        utils.ajax_get(
            utils.format(config.setting.api_format_system_config, name), 
            {},
            false
        ).done(function(result) {
            value = result.value;
        }).fail(function(result) {
            console.log(result);
            value = '';
        }).always(function(result){
            // debugger;
        });
    }
    return value;
};

/**
 * 消費税の税率を取得する。
 */
Material.prototype.get_consumption_tax_rate = function() {
    var value = this.get_config('consumption_tax_rate');
    if (value) {
        return parseFloat(value);
    } else {
        return 0.08;
    }
};

/**
 * 小数点の処理区分を取得する。
 * 
 * 0: 切り捨て
 * 1: 四捨五入
 * 2: 切り上げ
 */
Material.prototype.get_decimal_type = function() {
    var value = this.get_config('decimal_type');
    if (value) {
        return value;
    } else {
        // デフォルトは切り捨て
        return "0";
    }
};

Material.prototype.set_tax_included = function(obj, target_id) {
    var amount = parseInt($(obj).val());
    var self = this;
    var tax_rate = self.get_consumption_tax_rate();
    var decimal_type = self.get_decimal_type();
    if (amount) {
        var tax = amount * tax_rate;
        if (decimal_type === "0") {
            // 切り捨て
            tax = Math.floor(tax);
        } else if (decimal_type == "1") {
            // 四捨五入
            tax = Math.round(tax);
        } else if (decimal_type == "2") {
            // 切り上げ
            tax = Math.ceil(tax);
        }
        $("#" + target_id).val(amount + tax);
    } else {
        $("#" + target_id).val(0);
    }
};

/**
 * 指定管理会社ＩＤによって、管理会社の情報を取得する。
 * @param {Integer} company_id 
 */
Material.prototype.get_management_company = function(company_id) {
    var value = {};
    if (company_id) {
        utils.ajax_get(
            utils.format(config.setting.api_format_management_company, company_id), 
            {},
            false
        ).done(function(result) {
            value = result;
        }).fail(function(result) {
            console.log(result);
        }).always(function(result){
            // debugger;
        });
    }
    return value;
};

/**
 * 管理会社を選択時、管理会社担当者リストを自動反映する。
 * @param {element} obj
 * @param {String} target_id 
 */
Material.prototype.set_related_management_company_staff = function(obj, target_id) {
    var self = this;
    var data = self.get_management_company($(obj).val());
    if ('staff_set' in data) {
        var staff_list = data.staff_set;
        var targetObj = $("#" + target_id);
        var selectedItems = [];
        var is_inital = false;
        if ($(obj).attr('data-initial') === "true") {
            selectedItems = targetObj.val();
            $(obj).removeAttr('data-initial');
            is_inital = true;
        }
        // ドロップダウンリストに項目を全部消す。
        $("option", targetObj).each(function(i, optionObj) {
            if ($(optionObj).val() != "") {
                $(optionObj).remove();
            }
        });
        // ドロップダウンリストに新しい項目を追加する。
        if (staff_list.length > 0) {
            $.each(staff_list, function(i, item) {
                targetObj.append('<option value="' + item.id + '">' + item.name + '</option>');
            });
        }
        if (is_inital) {
            targetObj.val(selectedItems);
        }

        window.$("#" + target_id).material_select('update');
    }
};
