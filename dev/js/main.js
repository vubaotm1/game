require('./lib/class.js');
require('./lib/requestAnimFrame');

window.Stats = require('./lib/stats');
window.Input = require('./engine/input');
window.Keys = require('./engine/keys');
Input.bind('a', [Keys.A]);
Input.bind('physDebugToggle', [Keys.P]);

window.Assets = require('./engine/assets');

var engine;
window.addEventListener('load', function() {
    engine = new (require('./engine/engine'))();
})

window.addEventListener('resize', function() {
    if(engine) engine.resize.call(engine);
})

document.addEventListener('keydown', Input.keydown.bind(Input));
document.addEventListener('keyup', Input.keyup.bind(Input));
