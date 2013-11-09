var Assets = require('../engine/assets');
var Animation = require('../engine/animation');


var Input = require('../engine/input');
var world = require('../lib/physics').world;



var Entity = Class.extend({
    width: 16,
    height: 16,

    pos: {
        x: 100,
        y: 100
    },

    body: null,

    scale: 1,

    animations: {},
    animation: null,

    init: function(x, y, scale) {
        this.pos = {
            x: x,
            y: y
        };

        this.scale = scale;

        this.animations = {};
        this.body = world.addBox(this.pos.x, this.pos.y, this.width*this.scale, this.height*this.scale);
    },

    addAnimation: function(name, animation) {
        this.animations[name] = animation;
    },

    update: function() {
        if(this.animation) {
            this.animation.update();
        }
        
        this.pos.x = Math.floor(this.body.aabb().pos.x - 16);
        this.pos.y = Math.floor(this.body.aabb().pos.y - 16);
    },

    endPhysics: function() {
        this.body.onFloor = false;
        this.body.touchingWall = false;
    },

    draw: function(ctx) {
        if(this.animation) {
            this.animation.draw(ctx);
        }
    }


});


module.exports = Entity;
