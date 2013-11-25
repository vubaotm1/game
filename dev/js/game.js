var config = require('./config');
var Level = require('./level');

var Input = require('./engine/input');
var Keys = require('./engine/keys');

var p = require('./engine/physics');

var Assets = require('./engine/assets');

var Game = Class.extend({
    player: null,
    level: null,

    context: null,
    paused: true,

    currentLevelData: null,

    init: function(context) {
        Input.bind("right", [Keys.D, Keys.RIGHT_ARROW]);
        Input.bind("left", [Keys.Q, Keys.A, Keys.LEFT_ARROW]);
        Input.bind("up", [Keys.Z, Keys.SPACE, Keys.UP_ARROW, Keys.W]);
        Input.bind("down", [Keys.S, Keys.DOWN_ARROW]);
        Input.bind("morph", [Keys.E]);


        this.context = context;
        this.loadLevel(Assets.Data.levels['intro']);

        var self = this;
        $('#levels').on('click', '.level', function() {
            var lvl = $(this).data('level');
            $('#canvas').fadeTo(100, 0).delay(100).fadeTo(500, 1, function() {
                if(lvl != '0') {
                    $('#morphs').fadeIn(500);
                }
            });
            $('#levels').hide();
            $('#icons-top').show();
            $('#icons-menu').hide();
            self.loadLevel(Assets.Data.levels[lvl]);
            self.paused = false;
            p.setPaused(false);
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

        $('#icons-menu .menu').click(function() {
            $('#levels').hide();
            $('#icons-menu').hide();
            $('#intro').show();
            self.loadLevel(Assets.Data.levels['intro']);
            self.paused = false;
            p.setPaused(false);
        })

        $('.play').click(function() {
            self.showGame();
            $('#morphs').delay(400).fadeIn(500);
        })

        $('.restart').click(function() {
            $('#morphs').fadeOut(500);
            $('#canvas').fadeTo(300, .05, function() {
                self.restartLevel();
                self.showGame();
                if(self.currentLevelData != Assets.Data.levels['0']) $('#morphs').delay(500).fadeIn(500);
            });
        });


        $('#icons-top .menu').click(function() {
            $('#morphs').fadeOut(500);
            $('#canvas').fadeTo(300, .05);
            $('#levels').show();
            $('#icons-top').hide();
            $('#icons-menu').show();
            self.paused = true;
            p.setPaused(true);
        });


        $('#morphs > div').on('click', 'div', function(e) {
            self.level.setActiveMorph($(this).attr('id') - 1);
        });

        $('#morphs > div').on('mouseover', 'div', function(e) {
            var info = $(this).data('info');
            if (!info) info = "Empty";

            $('#morphs > span').text(info);
        });

        $('#morphs > div').on('mouseout', 'div', function(e) {
            var info = self.level.morphs[self.level.activemorph];
            info = (info && info.count > 0) ? info.info : 'Empty';
            $('#morphs > span').text(info);
        });

        var n = 0;
        for (var i in Assets.Data.levels) {
            if (isNaN(i)) continue;
            var lvlbtn = $('<div class="level"></div>');
            lvlbtn.data('level', i);
            lvlbtn.text("" + ++n);
            $('#levels').append(lvlbtn);
        }

        if (config.debug) {
            this.loadLevel(Assets.Data.levels['0']);
            this.showGame();
        }

    },

    showGame: function() {
        $('#levels').hide();
        $('#icons-top').show();
        $('#icons-menu').hide();
        $('#intro').hide();
        $('#canvas').fadeTo(300, 1);
        this.paused = false;
        p.setPaused(false);
    },

    restartLevel: function() {
        this.loadLevel(this.currentLevelData);
    },

    loadLevel: function(level) {
        if (!level) return;
        this.level = new Level(level);
        this.currentLevelData = level;

        if(level == Assets.Data.levels['0']) this.level.setActiveMorph(2);
    },

    update: function() {
        this.level.update(this);
    },

    draw: function() {
        this.level.draw(this.context);
    }
});

module.exports = Game;
