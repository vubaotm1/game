var PerspectiveLayer = require('./perspective-layer');
var CollisionLayer = require('./collision-layer');
var Animation = require('./animation');


var Player = require('../entities/player');

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

    init: function(data) {
        this.height = data.height;
        this.width = data.width;
        this.tilewidth = data.tilewidth;
        this.tileheight = data.tileheight;

        this.realheight = this.tileheight * this.height;
        this.realwidth = this.tilewidth * this.width;

        this.initLayers(data.layers);


        var player = new Player(30, 30);
        player.addAnimation('normal', new Animation(Assets.Graphics.player, 1, .1, [1]));
        player.animation = player.animations['normal'];


        this.entities.push(player);
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
    }
});


module.exports = Level;
