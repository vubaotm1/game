var PerspectiveLayer = require('./engine/perspective-layer');
var CollisionLayer = require('./engine/collision-layer');
var Animation = require('./engine/animation');
var config = require('./config');
var Camera = require('./engine/camera');

var Entities = require('./entities/entities');

var p = require('./engine/physics');

var Input = require('./engine/input');
var Keys = require('./engine/keys');

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

    spawn: {
        x: 260,
        y: 30
    },

    morphing: false,
    morphSubject: null,

    init: function(data) {
        this.height = data.height;
        this.width = data.width;
        this.tilewidth = data.tilewidth;
        this.tileheight = data.tileheight;

        this.realheight = this.tileheight * this.height;
        this.realwidth = this.tilewidth * this.width;

        this.initLayers(data.layers);


        this.player = new Entities.Player(this.spawn.x, this.spawn.y);
        this.entities.push(this.player);

        this.camera = new Camera(config.display.width / 2, config.display.height / 2, 0.2);
        this.camera.trap.size.x = config.display.width / 10;
        this.camera.trap.size.y = config.display.height / 5;
        this.camera.min.x = -config.perspective.pWidth;
        this.camera.min.y = -config.perspective.pHeight;
        this.camera.max.x = this.realwidth;
        this.camera.max.y = this.realheight;
        this.camera.set(this.player);

    },

    morph: function(other) {
        this.morphing = true;
        this.player.initMorph();
        this.morphSubject = other;
        p.setPaused(other.pauseWhileMorph);
    },

    doMorph: function() {
        var other = this.morphSubject;
        if (this.morphing && !this.player.isMorphing()) {
            if (other.takeover) {
                this.player.removeBody();
                var i = this.entities.indexOf(this.player);
                this.player = new other(this.player.pos.x - this.player.offset.x, this.player.pos.y - this.player.offset.y);
                this.entities[i] = this.player;
            } else {
                var ent = new other(this.player.pos.x - this.player.offset.x, this.player.pos.y - this.player.offset.y);
                this.player.setPos(this.spawn.x, this.spawn.y);
                this.entities.push(ent);
            }
            this.morphing = false;
            p.setPaused(false);
        }
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
        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].update();
        }

        this.camera.follow(this.player);

        if (Input.isPressed(Keys.E)) {
            this.morph(Entities.Takeover.Test);
        }


        if (Input.isPressed(Keys.T)) {
            this.morph(Entities.Static.Test);
        }

        this.doMorph();
    },

    draw: function(ctx) {
        for (var i = 0; i < this.layers.length; i++) {
            if (!this.layers[i].foreground) this.layers[i].draw(ctx);
        }

        this.entities.sort(function(a, b) {
            if (a.pos.y < b.pos.y) return 1;
            if (a.pos.y > b.pos.y) return -1;
            return 0;
        });

        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].draw(ctx);
        }

        for (var i = 0; i < this.layers.length; i++) {
            if (this.layers[i].foreground) this.layers[i].draw(ctx);
        }
    }
});


module.exports = Level;
