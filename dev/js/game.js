var config = require('./config');
var Level = require('./level');

var Input = require('./engine/input');
var Keys = require('./engine/keys');

var p = require('./engine/physics');

var Game = Class.extend({
    player: null,
    level: null,

    context: null,

    paused: false,

    init: function(context) {
        Input.bind("right", [Keys.D]);
        Input.bind("left", [Keys.Q]);
        Input.bind("up", [Keys.Z]);
        Input.bind("down", [Keys.S]);

        this.context = context;

        this.loadLevel(Assets.Data.levels.first);


        var self = this;
        $('.level').click(function() {
            self.showGame();
            $('.pause').toggleClass('paused', false);
        });

        $('.mute').click(function() {
            $('.mute').toggleClass('muted');
        });

        $('.pause').click(function() {
            var a = $('.pause');
            if (a.hasClass('paused')) {
                a.removeClass('paused');
                self.showGame();
            } else {
                a.addClass('paused');
                $('#canvas').fadeTo(300, .05);
                p.setPaused(true);
                self.paused = true;
            }
        });

        $('.play').click(function() {
            self.showGame();
        })

        $('.restart').click(function() {
            $('#canvas').fadeTo(300, .05, self.showGame);
            self.restartLevel();
        });


        $('#icons-top .menu').click(function() {
            $('#canvas').fadeTo(300, .05);
            $('#levels').show();
            $('#icons-top').hide();
            $('#icons-menu').show();
            self.paused = true;
            p.setPaused(true);
        });

    },

    showGame: function() {
        $('#levels').hide();
        $('#icons-top').show();
        $('#icons-menu').hide();
        $('#canvas').fadeTo(300, 1);
        this.paused = false;
        p.setPaused(false);
    },

    restartLevel: function() {

    },

    loadLevel: function(level) {
        this.level = new Level(Assets.Data.levels.first);
    },

    update: function() {
        if (Input.isPressed('a')) {
            config.perspective.flip = !config.perspective.flip;
        }
        if (Input.isPressed('physDebugToggle')) {
            config.physics.debug = !config.physics.debug;
        }

        this.level.update();
    },

    draw: function() {
        this.level.draw(this.context);
    }
});

module.exports = Game;
