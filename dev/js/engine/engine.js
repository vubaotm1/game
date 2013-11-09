var config = require('../config');

var world = require('../lib/physics').world;

var Engine = Class.extend({
    paused: false,

    canvas: null,
    context: null,

    draws: 0,
    layers: [],

    entities: [],

    self: null,

    init: function(self) {
        this.self = self;
        var self = self;

        this.initCanvas();
        world.startPhysics(self);
    },

    initCanvas: function() {
        var c = document.getElementById('canvas');
        if (!c) {
            c = document.createElement('canvas');
            c.id = 'canvas';
            c.width = config.display.width * config.display.scale;
            c.height = config.display.height * config.display.scale;
            var container = document.getElementById(config.display.container) || document.body;
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
    },

    update: function() {
        for(var i = 0; i < this.entities.length; i++) {
            this.entities[i].update();
        }
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


        for(var i = 0; i < this.entities.length; i++) {
            this.entities[i].draw(this.context);
        }
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

        this.update();

        requestAnimFrame(this.tick.bind(this.self));
        this.draw();

        Stats.end();
    }
});


module.exports = Engine;
