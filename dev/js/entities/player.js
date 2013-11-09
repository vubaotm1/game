var Entity = require('./entity');

var Assets = require('../engine/assets');
var Animation = require('../engine/animation');

var Input = require('../engine/input');

var Player = Entity.extend({

    canJump: false,
    wentUp: false,

    init: function(x, y) {
        this.parent(x, y);

        window.b = this.body;
    },

    update: function() {
        this.parent();


        var vx = 0, vy = this.body.state.vel.get(1);
        if (Input.down("left"))
            vx -= 0.1;

        if (Input.down("right"))
            vx += 0.1;



        this.body.state.vel.set(vx, vy);

        var ay = 0;
        if (Input.down("up") && this.body.onFloor) {
            this.body.applyForce(Physics.vector(0, -0.05));
        }


        this.endPhysics();
    },

    draw: function(ctx) {
        this.parent(ctx);
    }

});


module.exports = Player;
