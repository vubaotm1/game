require('./lib/class.js');
require('./lib/requestAnimFrame');

window.Stats = require('./lib/stats.js');
window.Input = require('./engine/input');
window.Keys = require('./engine/keys');
Input.bind('a', [Keys.A]);


var game = require('./game.js');


window.addEventListener('load', function(event) {
    var media = require('./data/media');
    var Assets = require('./engine/assets');

    Assets.loadAll(media);
    new game();
})