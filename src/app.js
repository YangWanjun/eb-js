var Signature = require('./Signature');
var Material = require('./Material');
require('jquery-ui/ui/widgets/autocomplete');
require('jquery-table-fixed-header');
var gMap = require('./gMap');
var Autocomplete = require('./Autocomplete');

var EBJS = function () {};

EBJS.prototype.utils = utils;
EBJS.prototype.signature = new Signature();
EBJS.prototype.$ = $;
EBJS.prototype.jQuery = $;
EBJS.prototype.material = new Material();
EBJS.prototype.gmap = new gMap();
EBJS.prototype.config = config;
EBJS.prototype.autocomplete = new Autocomplete();

window.ebjs = new EBJS();

$(window.document).ready(function() {
    $(".change_comment").closest('td').find('input[type=file]').change(function(){
        var objComment = $(this).closest('tr[data-formset-form]').find('td.field-comment input[type=text]');
        var name = utils.getFileNameWithoutExt(this.value);
        objComment.val(name);
        objComment.addClass('active');
    });
});
