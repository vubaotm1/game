require('./lib/class.js');
require('./lib/requestAnimFrame');

window.Stats = require('./lib/stats.js');

var media = require('./data/media');
window.Assets = require('./engine/assets');

var game = require('./game.js');

window.Input = require('./engine/input');
window.Keys = require('./engine/keys');

Input.bind('a', [Keys.A]);

window.addEventListener('load', function(event) {
    Assets.loadAll(media);
    new game();
})