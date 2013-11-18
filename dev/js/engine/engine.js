var config = require('../config');
var Input = require('./input');
var p = require('./physics');


var Engine = Class.extend({
    paused: false,

    canvas: null,
    context: null,

    draws: 0,
    maps: [],

    entities: [],

    self: null,

    physicsDebug: false,

    init: function(self) {
        this.self = self;
        var self = self;

        this.initCanvas();

        this.tick();

        p.initDebug(this.context, config.display.scale);
        p.dragNDrop(this.canvas);
    },

    initCanvas: function() {
        var c = document.getElementById('canvas');
        if (!c) {
            c = document.createElement('canvas');
            c.id = 'canvas';
            var container = document.getElementById(config.display.container) || document.body;
            container.appendChild(c);
        }
        c.width = (config.display.fullscreen) ? window.innerWidth : config.display.width * config.display.scale;
        c.height = (config.display.fullscreen) ? window.innerHeight : config.display.height * config.display.scale;
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
    },

    update: function() {
    },

    clear: function() {
        if (!config.display.clearColor) {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        } else {
            this.context.fillStyle = config.display.clearColor;
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
    },

    draw: function() {
        this.draws = 0;
        this.clear();
    },

    addEntity: function(entity) {
        this.entities.push(entity);
    },

    togglePause: function() {
        this.paused = !this.paused;

        if (!this.paused) {
            this.tick();
        }
    },

    tick: function() {
        if (this.paused) return

        Stats.begin();

        p.step();
        this.self.update.call(this.self);

        requestAnimFrame(this.tick.bind(this.self));

        this.self.draw.call(this.self);
        if(config.physics.debug) p.draw();

        Stats.end();
        
        Input.update();
    }
});


module.exports = Engine;
