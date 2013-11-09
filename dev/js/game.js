var Engine = require('./engine/engine');
var config = require('./config');

var Entity = require('./entities/entity');
var Player = require('./entities/player');

var Input = require('./engine/input');
var Keys = require('./engine/keys');


var Game = Engine.extend({
    player: null,


    init: function() {
        this.parent(this);

        Input.bind("right", [Keys.D]);
        Input.bind("left", [Keys.Q]);
        Input.bind("up", [Keys.Z]);
        Input.bind("down", [Keys.S]);
    },

    update: function() {
        this.parent();
    },

    draw: function() {
        this.parent();
    }
});

module.exports = Game;
