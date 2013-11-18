var config = require('../config');
var Input = require('./input');
var p = require('./physics');
var media = require('../data/media');
var Assets = require('./assets');
var game = require('../game');

var Engine = Class.extend({
    paused: false,
    game: null,

    canvas: null,
    context: null,

    draws: 0,
    maps: [],

    entities: [],

    physicsDebug: false,

    init: function(gameConst) {
        this.initCanvas();

        p.initDebug(this.context, config.display.scale);
        p.dragNDrop(this.canvas);

        this.tick();
    },

    initCanvas: function() {
        var c = document.getElementById('canvas');
        if (!c) {
            c = document.createElement('canvas');
            c.id = 'canvas';
            var container = document.getElementById(config.display.container) || document.body;
            container.appendChild(c);
        }

        this.canvas = c;

        this.canvas.style.imageRendering = '-moz-crisp-edges';
        this.canvas.style.imageRendering = '-o-crisp-edges';
        this.canvas.style.imageRendering = '-webkit-optimize-contrast';
        this.canvas.style.imageRendering = 'crisp-edges';
        this.canvas.style.msInterpolationMode = 'nearest-neighbor';

        this.context = this.canvas.getContext('2d');
        this.context.imageSmoothingEnabled = false;
        this.context.webkitImageSmoothingEnabled = false;
        this.context.mozImageSmoothingEnabled = false;

        this.resize();
    },

    resize: function() {
        var self = this;

        this.canvas.width = (config.display.fullscreen) ? window.innerWidth : config.display.width * config.display.scale;
        this.canvas.height = (config.display.fullscreen) ? window.innerHeight : config.display.height * config.display.scale;

        if (config.display.fullscreen) {
            var w = window.innerWidth, s = 1;
            if(w > 600) s = 2;
            if(w > 1080) s = 3;
            if(w > 1700) s = 4; 

            if (!this.game) {
                config.display.scale = s;

                Assets.loadAll(media);
                Assets.onReady(function() {
                    if (!this.game) {
                        this.game = new game(this.context);
                    }
                }, this);
            }

            if(this.game && config.display.scale != s) {
                p.resizeDebug(s);
                config.display.scale = s;
                Assets.resizeAll();
            }
        }
    },

    update: function() {
        p.step();
        this.game.update();

        Input.update();
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

        this.game.draw();
        if (config.physics.debug) p.draw();
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
        if (this.paused || !this.game) return requestAnimFrame(this.tick.bind(this));

        Stats.begin();

        this.update();
        requestAnimFrame(this.tick.bind(this));
        this.draw();

        Stats.end();
    }
});


module.exports = Engine;
