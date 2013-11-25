var Entity = require('./entity');

var EndLevel = Entity.extend({
    done: false,

    init: function(x, y, options) {
        this.parent(x, y, 1, {
            width: options.width,
            height: options.height,
            isSensor: true,
            bodytype: 'b2_staticBody'
        });
    },

    update: function(game) {
        if (!this.done && this.body.m_userData.playerCollision) {
            game.endLevel();
            this.done = true;
        }
    },

    draw: function(ctx) {
        this.parent(ctx);

    }
});

module.exports = EndLevel;
