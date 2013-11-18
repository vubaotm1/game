var config = require('./config');
var Level = require('./engine/level');

var Input = require('./engine/input');
var Keys = require('./engine/keys');

var Game = Class.extend({
    player: null,
    level: null,

    context: null,

    init: function(context) {
        Input.bind("right", [Keys.D]);
        Input.bind("left", [Keys.Q]);
        Input.bind("up", [Keys.Z]);
        Input.bind("down", [Keys.S]);

        this.context = context;
        this.level = new Level(Assets.Data.levels.first);
    },

    update: function() {
        if(Input.isPressed('a')) {
            config.perspective.flip = !config.perspective.flip;
        }
        if(Input.isPressed('physDebugToggle')) {
            config.physics.debug = !config.physics.debug;
        }

        this.level.update();
    },

    draw: function() {
        this.level.draw(this.context);
    }
});

module.exports = Game;
