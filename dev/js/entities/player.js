var Entity = require('./entity');

var Input = require('../engine/input');
var config = require('../config');

var b2Vec2 = Box2D.Common.Math.b2Vec2;

var SPEED = 18;
var JUMP = 110;

var Player = Entity.extend({
    canJump: false,
    wentUp: false,

    width: 16,
    height: 18,

    morphing: false,

    offset: {
        x: 2,
        y: 1
    },

    bodyType: 'Player',

    init: function(x, y, sheet) {
        this.parent(x, y, 1);

        this.initAnim(sheet || 'sprites.player');
    },
    initAnim: function(sheet) {
        this.addAnimation('stand', sheet, this.scale, .1, [0]);
        this.addAnimation('walk', sheet, this.scale, .1, [1, 2, 3]);
        this.addAnimation('jump', sheet, this.scale, .15, [4, 5]);
        this.addAnimation('morph', sheet, this.scale, .09, [9, 10, 11, 12, 13, 14, 15, 14, 13], false);
        this.addAnimation('endlevel', sheet, this.scale, .15, [16, 17, 18]);
        this.animation = this.animations['stand'];
        this.animations['walk'].flip.x = true;
    },

    endLevel: function(level) {
        this.animation = this.animations['endlevel'];
        this.animation.flip.x = true;


        var pos = this.body.GetPosition();
        pos.y -= this.height/2;

        this.body.SetPosition(pos);

        this.body.SetType(1);
        this.body.SetLinearVelocity(new b2Vec2(30, 0));
    },

    update: function() {
        this.parent();

        if (this.morphing) {
            if (this.animation != this.animations['morph']) {
                this.animation = this.animations['morph'];
                this.animation.reset();
            } else {
                if (this.animation.looped) {
                    this.morphing = false;
                }
            }
        }

        if(this.animation == this.animations['endlevel']) {
            this.animation.alpha -= 0.005;
        }

        if (!this.morphing && this.animation != this.animations['endlevel']) {
            if (!Input.isDown(0)) this.handleMovement();
        }
    },

    initMorph: function() {
        this.morphing = true;
    },

    isMorphing: function() {
        return this.morphing;
    },

    canJump: function() {
        return this.body.m_userData.footContacts > 0;
    },

    handleMovement: function() {
        var vel = this.body.GetLinearVelocity(),
            l = Input.isDown('left'),
            r = Input.isDown('right'),
            u = Input.isDown('up');

        this.animation = this.animations['stand'];

        var speed = 0,
            impulse = 0,
            change;
        if (l ^ r || vel.x != 0) {
            this.animation = this.animations['walk'];
            if (l) {
                speed = speed - SPEED;
                config.perspective.flip = true;
                this.animation.flip.x = false;
            }
            if (r) {
                speed = speed + SPEED;
                config.perspective.flip = false;
                this.animation.flip.x = true;
            }

            change = speed - vel.x;
            impulse = this.body.GetMass() * change;
            this.body.ApplyImpulse(new b2Vec2(impulse, 0), this.body.GetWorldCenter());
        }

        if (!this.canJump()) {
            this.animation = this.animations['jump'];
        }

        if (u && this.canJump()) {
            impulse = this.body.GetMass() * JUMP;
            this.body.ApplyImpulse(new b2Vec2(0, impulse), this.body.GetWorldCenter());
        }


        this.animation.flip = this.animations['walk'].flip;

    }

});

module.exports = Player;
