var config = require('../config');
var Input = require('./input');
var p = require('./physics');
var media = require('../data/media');
var Assets = require('./assets');
var game = require('../game');

var Engine = Class.extend({
    game: null,

    canvas: null,
    context: null,
    ui: null,

    draws: 0,

    lastUpdate: 16,

    init: function(gameConst) {
        this.initCanvas();

        this.ui = document.getElementById('ui');
        this.ui.style.display = "block";

        this.scaleUI(config.display.scale);

        p.initDebug(this.context, config.display.scale);
        p.dragNDrop(this.canvas);

        this.tick();

        window.dom = {
            ui: this.ui,
            canvas: this.canvas
        };
    },

    initCanvas: function() {
        this.canvas = document.getElementById('canvas');

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

    scaleUI: function(s) {
        if (s == 1) ui.className = "small";
        if (s == 2) ui.className = "normal";
        if (s == 3) ui.className = "big";
    },

    resize: function() {
        var self = this;

        var w = window.innerWidth,
            s = 1;
        if (w > 840) s = 2;
        if (w > 1260) s = 3;

        this.scaleUI(s);

        this.canvas.width = config.display.width * s;
        this.canvas.height = config.display.height * s;
        config.display.realwidth = this.canvas.width;
        config.display.realheight = this.canvas.height;


        //if(w > 1700) s = 4; 

        if (!this.game) {
            config.display.scale = s;
            Assets.loadAll(media);
            Assets.onReady(function() {
                if (!this.game) {
                    this.game = new game(this.context);
                }
            }, this);
        }

        if (this.game && config.display.scale != s) {
            p.resizeDebug(s);
            config.display.scale = s;
            Assets.resizeAll();
        }
    },

    update: function() {
        p.step();
        this.game.update();
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
        debug.draws = 1;
        this.clear();

        if (!config.physics.debug) {
            this.game.draw();
        } else {
            p.draw();
        }
    },

    togglePause: function() {
        this.game.paused = !this.game.paused;

        if (!this.game.paused) {
            this.tick();
        }
    },

    tick: function() {
        if (!this.game) return requestAnimFrame(this.tick.bind(this));

        Stats.begin();
        if(!this.game.paused) {
            config.tick = (new Date()).getTime() - this.lastUpdate;
            this.lastUpdate = this.lastUpdate + config.tick;

            this.update();
        }

        Input.update();
        
        requestAnimFrame(this.tick.bind(this));
        this.draw();

        Stats.end();
    }
});


module.exports = Engine;
