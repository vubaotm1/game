require('./lib/class.js');
require('./lib/requestAnimFrame');
window.Stats = require('./lib/stats');

var Input = require('./engine/input');
var config = require('./config');
window.debug = {
    draws: 0,
    bounciness: 0.5
}
var dat = require('./lib/dat.gui');
window.gui = new dat.GUI({autoPlace: true});
gui.add(debug, 'draws').listen();
gui.add(config.physics, 'debug');
gui.close();

var engine;
$(function(){
    engine = new (require('./engine/engine'))();
});

$(window).resize(function(){
    if(engine) engine.resize.call(engine);
});

$(document).keydown(Input._down.bind(Input));
$(document).keyup(Input._up.bind(Input));
$(document).mousedown(Input._down.bind(Input));
$(document).mouseup(Input._up.bind(Input));


$('#play').click(function() {
    $('#intro').hide();
    $('#levels').show();
});


$('#github').click(function() {
    window.location = "https://github.com/jeroenverfallie/game-off-2013";
})