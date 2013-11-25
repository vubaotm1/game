var Entity = require('./entity');
var config = require('../config');

var Ent = Entity.extend({
    emitter: null,

    init: function(x, y, options) {
        //this.emitter = new Emitter(x, y, options);
    },

    update: function(game) {
        //this.emitter.step(config.tick);
    },

    draw: function(ctx) {
        //this.emitter.draw(ctx);
    }
});


module.exports = Ent;