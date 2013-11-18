var Entity = require('./entity');

var Assets = require('../engine/assets');
var Animation = require('../engine/animation');

var Input = require('../engine/input');
var config = require('../config');

var b2Vec2 = Box2D.Common.Math.b2Vec2;



var SPEED = 35;
var JUMP = 130;

var Player = Entity.extend({
    canJump: false,
    wentUp: false,

    init: function(x, y) {
        this.parent(x, y, 1);
    },

    update: function() {
        this.parent();


        if (!Input.isDown(0)) this.handleMovement();

    },

    canJump: function() {
        return this.body.m_userData.footContacts > 0;
    },

    handleMovement: function() {
        var vel = this.body.GetLinearVelocity(),
            l = Input.isDown('left'),
            r = Input.isDown('right'),
            u = Input.isDown('up');


        var speed = 0,
            impulse = 0, change;
        if (l ^ r || vel.x != 0) {
            if (l) speed = speed - SPEED;
            if (r) speed = speed + SPEED;
            if(speed == 0) speed = vel.x*0.9;

            change = speed - vel.x;
            impulse = this.body.GetMass() * change;
            this.body.ApplyImpulse(new b2Vec2(impulse, 0), this.body.GetWorldCenter());
        }

        if (u && this.canJump()) {
            impulse = this.body.GetMass() * JUMP;
            this.body.ApplyImpulse(new b2Vec2(0, impulse), this.body.GetWorldCenter());
        } else {
        }

    },

    draw: function(ctx) {
        this.parent(ctx);
    }

});




module.exports = Player;
