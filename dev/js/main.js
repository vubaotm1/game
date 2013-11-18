require('./lib/class.js');
require('./lib/requestAnimFrame');

window.Stats = require('./lib/stats.js');
window.Input = require('./engine/input');
window.Keys = require('./engine/keys');
Input.bind('a', [Keys.A]);
Input.bind('physDebugToggle', [Keys.P]);


window.Assets = require('./engine/assets');


var game = require('./game.js');


window.addEventListener('load', function(event) {
    var media = require('./data/media');
    var Assets = require('./engine/assets');

    Assets.loadAll(media);
    Assets.onReady(function() {
        new game();
    });




document.addEventListener('keydown', Input.keydown.bind(Input));
document.addEventListener('keyup', Input.keyup.bind(Input));
})