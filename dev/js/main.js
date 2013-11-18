require('./lib/class.js');
require('./lib/requestAnimFrame');

window.Stats = require('./lib/stats');
window.Input = require('./engine/input');
window.Keys = require('./engine/keys');
Input.bind('a', [Keys.A]);
Input.bind('physDebugToggle', [Keys.P]);


window.Assets = require('./engine/assets');


var dat = require('./lib/dat.gui');
var gui = new dat.GUI();
window.t = {}
//gui.add(t, 'speed', 0, 500);


var engine;
window.addEventListener('load', function() {
    engine = new (require('./engine/engine'))();
})

window.addEventListener('resize', function() {
    if(engine) engine.resize.call(engine);
})

document.addEventListener('keydown', Input._down.bind(Input));
document.addEventListener('keyup', Input._up.bind(Input));
document.addEventListener('mousedown', Input._down.bind(Input));
document.addEventListener('mouseup', Input._up.bind(Input));
