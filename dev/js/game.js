var Engine = require('./engine/engine');
var config = require('./config');

var Level = require('./engine/level');

var Entity = require('./entities/entity');

var Input = require('./engine/input');
var Keys = require('./engine/keys');


var Game = Engine.extend({
    player: null,

    level: null,


    init: function() {
        Input.bind("right", [Keys.D]);
        Input.bind("left", [Keys.Q]);
        Input.bind("up", [Keys.Z]);
        Input.bind("down", [Keys.S]);

        this.level = new Level(Assets.Data.levels.first);

        this.parent(this);
    },

    update: function() {
        this.parent();

        if(Input.isPressed('a')) {
            config.perspective.flip = !config.perspective.flip;
        }
        if(Input.isPressed('physDebugToggle')) {
            config.physics.debug = !config.physics.debug;
        }

        this.level.update();
    },

    draw: function() {
        this.parent();

        this.level.draw(this.context);
    }
});

module.exports = Game;
