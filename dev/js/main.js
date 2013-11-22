require('./lib/class.js');
require('./lib/requestAnimFrame');

window.Stats = require('./lib/stats');
window.Input = require('./engine/input');
window.Keys = require('./engine/keys');
Input.bind('a', [Keys.A]);
Input.bind('physDebugToggle', [Keys.P]);

window.Assets = require('./engine/assets');

var config = require('./config');
window.debug = {
    draws: 0
}
var dat = require('./lib/dat.gui');
window.gui = new dat.GUI();
gui.add(debug, 'draws').listen();

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


$('#icons-menu .menu').click(function(){
    $('#levels').hide();
    $('#icons-menu').hide();
    $('#intro').show();
})