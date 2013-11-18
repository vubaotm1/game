var Entity = require('./entity');

var Assets = require('../engine/assets');
var Animation = require('../engine/animation');

var Input = require('../engine/input');
var config = require('../config');

var Player = Entity.extend({

    canJump: false,
    wentUp: false,

    init: function(x, y) {
        this.parent(x, y, 1);
    },

    update: function() {
        this.parent();

        //if(this.body.GetLinearVelocity().x !== 0) config.perspective.flip = !(this.body.GetLinearVelocity().x < 0)p;

/*
        var vx = 0, vy = this.body.state.vel.get(1);
        if (Input.isDown("left"))
            vx -= 0.1;

        if (Input.isDown("right"))
            vx += 0.1;



        this.body.state.vel.set(vx, vy);

        var ay = 0;
        if (Input.isDown("up") && this.body.onFloor) {
            this.body.applyForce(Physics.vector(0, -0.05));
        }


        this.endPhysics();*/
    },

    draw: function(ctx) {
        this.parent(ctx);
    }

});


module.exports = Player;
