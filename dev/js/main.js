// Core Extentions
require('./core/class');
require('./core/requestAnimFrame');

var config = require('./config');
var game = require('./game');

new game(config);
