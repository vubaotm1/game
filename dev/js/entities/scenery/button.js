var Entity = require('../entity');

var Btn = Entity.extend({

    triggered: false,
    width: 22,
    height: 21,

    offset: {
        x: 0, 
        y: 0
    },

    init: function(x, y, options) {
        this.offset.y = this.height - options.height

        this.parent(x, y, 1, {
            width: options.width,
            height: options.height,
            isSensor: true,
            bodytype: 'b2_staticBody'
        });

        this.addAnimation('pressed', 'sprites.button', 1, .1, [1]);
        this.addAnimation('unpressed', 'sprites.button', 1, .1, [0]);
    },

    update: function(game) {
        if(this.animation) this.animation.update();

        var t;
        if (this.body.m_userData.playerCollision) {
            t = [{ent: game.level.player}];
        } else {
            if (this.body.m_userData.collisions && this.body.m_userData.collisions.length > 0) {
                t = this.body.m_userData.collisions;
            }
        }

        if (!this.triggered && t) {
            this.trigger(t, game);
            game.playSound('on');
            this.animation = this.animations['pressed'];
        }

        if (this.triggered && !t) {
            this.untrigger(game);
            game.playSound('off');
            this.animation = this.animations['unpressed'];
        }

        this.triggered = !!t;
    },



});

module.exports = Btn;
