var config = require('../config');

var Engine = Class.extend({
    init: function() {
        this.paused = false;

        this.screens = [];
        this.draws = 0;

        this.canvas = null;
        this.context = null;

        this.initCanvas();
    }
});

Engine.prototype.initCanvas = function() {
    var c = document.getElementById('canvas');
    if (!c) {
        c.width = config.base.width;
        c.height = config.base.height;
        var container = document.getElementById(config.base.container) || document.body;
        container.appendChild(c);
    }
    c.style.imageRendering = '-moz-crisp-edges';
    c.style.imageRendering = '-o-crisp-edges';
    c.style.imageRendering = '-webkit-optimize-contrast';
    c.style.imageRendering = 'crisp-edges';
    c.style.msInterpolationMode = 'nearest-neighbor';

    this.canvas = c;

    this.context = c.getContext('2d');
    this.context.imageSmoothingEnabled = false;
    this.context.webkitImageSmoothingEnabled = false;
    this.context.mozImageSmoothingEnabled = false;
};

Engine.prototype.update = function() {};

Engine.prototype.draw = function() {
    this.draws = 0;
    for (var i = this.screens.length; i; i--) {
        this.screens[i].clear(config.base.clearColor);
    }
};

Engine.prototype.togglePause = function() {
    this.paused = !this.paused;

    if (!this.paused) {
        this.tick();
    }
};

Engine.prototype.tick = function() {
    if (this.paused) return

    this.update();

    requestAnimFrame(this.tick.bind(this));
    this.draw();

};





module.exports = Engine;
