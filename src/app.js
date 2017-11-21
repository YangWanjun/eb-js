var Signature = require('./Signature');
var Material = require('./Material');
require('jquery-ui/ui/widgets/autocomplete');
var Map = require('./Map');

var EBJS = function () {};

EBJS.prototype.utils = utils;
EBJS.prototype.signature = new Signature();
EBJS.prototype.$ = $;
EBJS.prototype.jQuery = $;
EBJS.prototype.material = new Material();
EBJS.prototype.map = new Map();
EBJS.prototype.config = config;

window.ebjs = new EBJS();