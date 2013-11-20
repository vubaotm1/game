var PerspectiveLayer = require('./perspective-layer');
var CollisionLayer = require('./collision-layer');
var Animation = require('./animation');
var config = require('../config');
var Player = require('../entities/player');
var Camera = require('./camera');

var p = require('./physics');

var Level = Class.extend({
    width: 1,
    height: 1,
    tilewidth: 16,
    tileheight: 16,

    layers: [],

    entities: [],

    realwidth: 16,
    realheight: 16,

    player: null,
    camera: null,

    init: function(data) {
        this.height = data.height;
        this.width = data.width;
        this.tilewidth = data.tilewidth;
        this.tileheight = data.tileheight;

        this.realheight = this.tileheight * this.height;
        this.realwidth = this.tilewidth * this.width;

        this.initLayers(data.layers);


        this.player = new Player(260, 30);
        this.player.addAnimation('normal', new Animation(Assets.Graphics.player, 1, .1, [1]));
        this.player.animation = this.player.animations['normal'];

        this.camera = new Camera(config.display.width/2+this.tilewidth*3, config.display.height/2, 5);
        this.camera.trap.size.x = config.display.width/5;
        this.camera.trap.size.y = config.display.height/3;
        this.camera.lookAhead.y = 10;
        this.camera.min.x = -config.perspective.pWidth;
        this.camera.min.y = -config.perspective.pHeight;
        this.camera.max.x = this.realwidth;
        this.camera.max.y = this.realheight;
        this.camera.set(this.player);
    
        this.entities.push(this.player);
    },

    applyScale: function(p) {
        return Math.round(p * config.display.scale);
    },

    initLayer: function(layer) {
        if (layer.type == "tilelayer") {
            if (layer.properties.type == "perspective") {
                this.layers.push(new PerspectiveLayer(layer, this.width, this.height, this.tilewidth, this.tileheight));
            }
        } else if (layer.type == "objectgroup") {
            if (layer.properties.type == "collision") {
                this.layers.push(new CollisionLayer(layer));
            }
        }
    },

    initLayers: function(layers) {
        for (var layer in layers)
            this.initLayer(layers[layer]);
    },

    update: function() {
        for(var i = 0; i < this.entities.length; i++) {
            this.entities[i].update();
        }

        this.camera.follow(this.player);
    },

    draw: function(ctx) {
        for(var i = 0; i < this.layers.length; i++) {
            if(!this.layers[i].foreground) this.layers[i].draw(ctx);
        }

        for(var i = 0; i < this.entities.length; i++) {
            this.entities[i].draw(ctx);
        }

        for(var i = 0; i < this.layers.length; i++) {
            if(this.layers[i].foreground) this.layers[i].draw(ctx);
        }

        //this.camera.draw(ctx);
    }
});


module.exports = Level;
