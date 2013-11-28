var Entity = require('../entity');
var config = require('../../config');

var Platform = Entity.extend({
    width: 33,
    height: 6,

    background: true,

    offset: {
        y: 3,
        x: 0
    },

    active: true,

    axis: 'x',
    loop: true,

    direction: 1,

    speed: 10,

    init: function(x, y, options) {
        y = y +  options.height - 10;

        var prop = options.properties || {};
        this.axis = options.width > options.height ? 'x' : 'y';

        var limit = (this.axis === "x" ? options.width : options.height);

        this.parent(x, y, 1, {
            density: 10,
            top: {
                friction: 10000
            },
            motor: {
                speed: this.direction * this.speed,
                maxForce: 100000
            },
            fixed: this.axis,
            limit: {
                upper: limit,
                lower: 0
            }
        });


        this.addAnimation('active', 'sprites.platform', 1, .1, [1]);
        this.addAnimation('inactive', 'sprites.platform', 1, .1, [0]);

    },

    triggered: function(by) {
        this.active = false;
    },

    untriggered: function(by) {
        this.active = true;
    },

    update: function(game) {
        this.parent(game);
        
        var vel = this.body.GetLinearVelocity()[this.axis],
            trans = this.joint.GetJointTranslation();

        if (trans - 1 <= this.joint.GetLowerLimit() || (this.direction === -1 && vel > -0.001)) {
            this.direction = 1;
        } else if (trans + 2 >= this.joint.GetUpperLimit() || (this.direction === 1 && vel < 0.001)) {
            this.direction = -1
        };
        this.joint.SetMotorSpeed(this.direction * this.speed);

        this.animation = this.animations[this.active ? 'active' : 'inactive'];

        this.animation.flip.x = config.perspective.flip;
        this.animation.offset.x = config.perspective.flip ? 0 : -5;
        this.angle = 0;

    }

});

module.exports = Platform;
