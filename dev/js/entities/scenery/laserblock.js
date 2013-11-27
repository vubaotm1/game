var Entity = require('../entity');

var LB = Entity.extend({

    active: true,
    triggerCount: 0,

    width: 22,
    height: 21,

    offset: {
        x: 0, 
        y: 0
    },

    init: function(x, y, options) {
        this.parent(x, y, 1);

        this.addAnimation('inactive', 'sprites.laser', 1, .1, [1]);
        this.addAnimation('active', 'sprites.laser', 1, .1, [0]);

        this.neededTriggers = (options.properties && options.properties.neededTriggers) ? parseInt(options.properties.neededTriggers) : 1;
    },

    initBody: function() {},

    triggered: function(by) {
        if (++this.triggerCount === this.neededTriggers) {
            this.trigger();
            this.active = false;
            this.animation = this.animations['inactive'];
        }
    },

    untriggered: function(by) {
        if (--this.triggerCount < this.neededTriggers) {
            this.untrigger();
            this.active = true;
            this.animation = this.animations['active'];
        }
    },

    update: function(game) {
        if(this.animation) this.animation.update();
    }


});

module.exports = LB;
