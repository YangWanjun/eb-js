var Utils = require('./Utils');

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

Material.prototype.send_subscription_mail = function(frmId) {
    var frmObj = $("#" + frmId);
    utils.ajax_form(
        frmObj,
        function success_fn(result) {
            if (result.error) {
                alert(result.message);
            } else {
                window.location.reload();
            }
        },
        function failure_fn(result) {
            // debugger;
        },
        function always_fn(result) {
            // debugger;
        },
    )
    // frmObj.submit();
};

Material.prototype.send_user_subscription = function() {
    var self = this;
    var forms = self.get_sub_forms();
    $.each(forms, function(i, frm){
        utils.ajax_request(
            $(frm).attr('action'),
            $(frm).attr('method'),
            $(frm).serialize()
        ).done(function(result) {
            if (result.error) {
                alert(result.message);
                return false;
            } else {

            }
        }).fail(function(result) {
            return false;
        }).always(function(result){
            // debugger;
        });
    });
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
