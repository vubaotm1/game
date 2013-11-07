var Engine = require('./engine/engine');
var Assets = require('./engine/assets');

var Game = Engine.extend({
    init: function() {
        this.parent();

        this.tick();
    },

    update: function() {
        this.parent();
    }
});

module.exports = Game;
