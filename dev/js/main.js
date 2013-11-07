require('./core/class.js');
require('./core/requestAnimFrame');

var media = require('./data/media');
var Assets = require('./engine/assets');

var game = require('./game.js');

window.addEventListener('load', function(event) {
    Assets.loadAll(media);
    window.b = Assets;
    new game();
})