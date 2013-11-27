var Entity = require('../entity');
var config = require('../../config');

var Door = Entity.extend({

    width: 17,
    height: 34,

    background: true,

    offset: {
        y: 5,
        x: 0
    },

    open: false,
    triggerCount: 0,

    speed: 10,

    bottom: {
        x: 0,
        y: 0
    },

    init: function(x, y, options) {
        this.parent(x, y, 1, {
            fixed: 'y',
            motor: {
                speed: -this.speed,
                maxForce: 100000
            }
        });

        this.neededTriggers = (options.properties && options.properties.neededTriggers) ? parseInt(options.properties.neededTriggers) : 1;

        window.joint = this.joint;

        this.addAnimation('open', 'sprites.door', 1, .1, [1]);
        this.addAnimation('closed', 'sprites.door', 1, .1, [0]);
    },

    update: function(game) {
        this.parent(game);


        this.animation = this.animations[this.open ? 'open' : 'closed'];

        this.animation.flip.x = !config.perspective.flip;
        this.animation.offset.x = !config.perspective.flip ? -5 : 0;
        this.angle = 0;

    },

    triggered: function(by, game) {
        if (++this.triggerCount === this.neededTriggers) {
            this.open = true;
            game.playSound('correct');
            this.joint.SetMotorSpeed(this.speed);
        }
    },

    untriggered: function(by, game) {
        if (--this.triggerCount < this.neededTriggers) {
            this.open = false;
            game.playSound('wrong');
            this.joint.SetMotorSpeed(-this.speed);
        }
    }


});

module.exports = Door;
