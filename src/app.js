var Signature = require('./Signature');
var Material = require('./Material');
require('jquery-ui/ui/widgets/autocomplete');
var olMap = require('./olMap');
var gMap = require('./gMap');

var EBJS = function () {};

EBJS.prototype.utils = utils;
EBJS.prototype.signature = new Signature();
EBJS.prototype.$ = $;
EBJS.prototype.jQuery = $;
EBJS.prototype.material = new Material();
EBJS.prototype.olmap = new olMap();
EBJS.prototype.gmap = new gMap();
EBJS.prototype.config = config;

window.ebjs = new EBJS();