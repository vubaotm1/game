var Assets = require('../engine/assets');
var Animation = require('../engine/animation');

var Input = require('../engine/input');
var p = require('../engine/physics');

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

    angle: 0,

    init: function(x, y, scale) {
        this.pos = {
            x: x,
            y: y
        };

        this.scale = scale;

        this.animations = {};
        this.body = p.addBoxEntity(this.pos.x, this.pos.y, this.width*this.scale, this.height*this.scale);
    },

    addAnimation: function(name, animation) {
        this.animations[name] = animation;
    },

    update: function() {
        if(this.animation) {
            this.animation.update();
        }
        
        var pos = this.body.GetPosition();
        this.pos.x = pos.x;
        this.pos.y = pos.y;

        this.angle = this.body.GetAngle();
    },

    draw: function(ctx) {
        if(this.animation) {
            this.animation.draw(ctx, this.pos.x, this.pos.y, this.angle);
        }
    }


});


module.exports = Entity;
