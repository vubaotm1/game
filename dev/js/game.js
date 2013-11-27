var config = require('./config');
var Level = require('./level');

var Input = require('./engine/input');
var Keys = require('./engine/keys');

var p = require('./engine/physics');

var Assets = require('./engine/assets');
var Message = require('./engine/message');

var Game = Class.extend({
    player: null,
    level: null,

    context: null,
    paused: true,

    currentLevelData: null,

    stats: {
        restarts: 0,
        deaths: 0,
        starttime: 0,
        transforms: 0
    },

    shakeDuration: -1,
    shakeForce: 0,

    soundMuted: false,

    init: function(context) {
        Input.bind("right", [Keys.D, Keys.RIGHT_ARROW]);
        Input.bind("left", [Keys.Q, Keys.A, Keys.LEFT_ARROW]);
        Input.bind("up", [Keys.Z, Keys.SPACE, Keys.UP_ARROW, Keys.W]);
        Input.bind("down", [Keys.S, Keys.DOWN_ARROW]);
        Input.bind("morph", [Keys.E]);
        Input.bind("restart", [Keys.T]);


        $('#ui').fadeIn(1000);
        $('#icons-top .right').fadeIn(1000);


        this.context = context;
        this.loadLevel(Assets.Data.levels['intro']);

        var self = this;
        $('#levels').on('click', '.level', function() {
            self.playSound('click');
            var lvl = $(this).data('level');
            self.resetStats();
            self.loadLevel(Assets.Data.levels[lvl]);
            showLevels(false);
            showGame();
        });

        $('.mute').click(function() {
            var a = $('.mute')
            a.toggleClass('muted');
            self.soundMuted = a.hasClass('muted');
        });


        $('#menu .menu').click(function() {
            self.playSound('click');
            $('#leveltitle').hide();
            showLevels(false);
            showIntro(true);
            showGame(false);
            self.loadLevel(Assets.Data.levels['intro']);
        });

        var b;
        $('.pause').click(function() {
            self.playSound('click');
            var a = $('.pause');
            if (a.hasClass('paused')) {
                self.pauseGame(false);
                showGame();
                b.fadeOut(300, function() {
                    $(this).remove();
                });
            } else {
                showGame(false, true);
                self.pauseGame(true);
                b = Message.spawn('Paused!', '#AAE0F4');
            }
        });

        $('.play').click(function() {
            self.playSound('click');
            showLevels(false);
            showGame();
            self.pauseGame(false);
        });

        $('#play').click(function() {
            self.playSound('click');
            showIntro(false);
            showLevels(true);
            self.pauseGame(true);
        });

        $('.restart').click(function() {
            self.playSound('click');
            showLevels(false);
            $('#morphs').fadeOut(500);
            $('#canvas').fadeTo(300, .05, function() {
                self.restartLevel();
                showGame();
            });
        });

        $('.retry').click(function() {
            self.playSound('click');
            showEnd(false);
            showGame();
            self.retryLevel();
        });

        $('#icons-top .menu').click(function() {
            self.playSound('click');
            showGame(false);
            showLevels();
            self.pauseGame(true);
        });

        $('#morphs > div').on('click', 'div', function(e) {
            self.playSound('click');
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



        $('#btns .menu').click(function() {
            self.playSound('click');
            showEnd(false);
            showLevels(true);
        });

        $('#btns .next').click(function() {
            self.playSound('click');
            showGame(false);
            showEnd(false);
            self.nextLevel();
            showGame();
        });

        this.initLevels();

        if (config.debug) {
            self.resetStats();
            this.loadLevel(Assets.Data.levels[config.debug.level]);
            showIntro(false);
            showGame();
        }


        function showGame(show, paused) {
            if (show == undefined || show) {
                $('#leveltitle').fadeIn();
                $('#icons-top .left').fadeIn();
                $('#canvas').fadeTo(300, 1);
                if (self.currentLevelData != Assets.Data.levels['0']) $('#morphs').delay(400).fadeIn();
            } else {
                if (!paused) $('#icons-top .left').hide();
                $('#canvas').fadeTo(300, 0.05);
                $('#morphs').hide();
            }
        }

        function showEnd(show) {
            if (show == undefined || show) {
                $('#end').fadeIn();
            } else {
                $('#end').hide();
                $('#ui .message').remove();
            }
        }

        function showIntro(show) {
            if (show == undefined || show) {
                $('#intro').fadeIn();
            } else {
                $('#intro').hide();
            }
        }

        function showLevels(show) {
            if (show == undefined || show) {
                $('#levelselect').fadeIn();
            } else {
                $('#levelselect').hide();
            }
        }
    },

    initLevels: function() {
        var n = 0;
        for (var i in Assets.Data.levels) {
            if (isNaN(i)) continue;
            var lvlbtn = $('<div class="level"></div>');
            lvlbtn.data('level', i);
            lvlbtn.text("" + ++n);
            $('#levels').append(lvlbtn);
        }
    },

    playSound: function(sound, onlyOneInstance) {
        if (this.soundMuted) return;
        if (typeof(sound) === "string") {
            sound = Object.$get(Assets.Sounds, sound);
        }

        if(!onlyOneInstance || (onlyOneInstance && sound.playState === 0)) sound.play();
    },

    showMessage: function(message, color, duration, options, nofade, callback) {
        return Message.spawn(message, color, duration, options, nofade, callback);
    },

    pauseGame: function(paused) {
        if (paused == undefined) paused = true;
        this.paused = paused;
        p.setPaused(paused);

        var a = $('.pause');
        if (!paused && a.hasClass('paused')) {
            a.removeClass('paused');
        } else {
            if (paused && !a.hasClass('paused')) a.addClass('paused');
        }
    },

    endLevel: function(flip) {
        this.level.camera.max.x = Infinity;
        this.level.camera.min.y = -Infinity;
        this.level.camera.max.y = Infinity;
        this.level.camera.min.x = -Infinity;
        this.level.player.endLevel(this.level, flip);


        $('#stats #time').text(~~(((new Date()).getTime() - this.stats.starttime) / 1000) + '');
        $('#stats #restarts').text(this.stats.restarts + '');
        $('#stats #deaths').text(this.stats.deaths + '');
        $('#stats #transforms').text(this.stats.transforms + '');

        $('#morphs').fadeOut();
        $('#icons-top .left').fadeOut();
        var a, b = $('#end').height();
        a = this.showMessage('Level Complete!', '#99FC87', 1500, {
            top: config.message.top - b,
            color: jQuery.Color('#FBCF95'),
            el: "#ui"
        }, true, function() {
            var h = a.height();

            $('#end').css('top', config.message.top - b / 2 + h).fadeIn(400);
        });
    },

    retryLevel: function() {
        this.resetStats();
        this.loadLevel(this.currentLevelData);
    },

    resetStats: function() {
        this.stats.restarts = 0;
        this.stats.starttime = (new Date()).getTime();
        this.stats.deaths = 0;
        this.stats.transforms = 0;
    },

    nextLevel: function() {
        this.resetStats();
        this.loadLevel(Assets.Data.levels[this.currentLevelData.next]);
    },

    showGame: function() {
        $('#levels').hide();
        $('#icons-top').show();
        $('#icons-menu').hide();
        $('#intro').hide();
        $('#canvas').fadeTo(300, 1);
    },

    restartLevel: function() {
        this.stats.restarts++;
        this.loadLevel(this.currentLevelData);
    },

    loadLevel: function(level) {
        if (!level) return;
        this.level = new Level(level, this.stats);
        this.currentLevelData = level;

        $('#leveltitle').text(level.title);

        if (level == Assets.Data.levels['0']) this.level.setActiveMorph(2);
        this.pauseGame(false);
    },

    shake: function(duration, force) {
        this.shakeForce = force;
        this.shakeDuration = duration;
    },

    update: function() {
        if (Input.isPressed('restart')) {
            var self = this;
            $('#morphs').fadeOut(500);
            $('#canvas').fadeTo(300, .05, function() {
                self.restartLevel();
                $('#icons-top .left').fadeIn();
                $('#canvas').fadeTo(300, 1);
                if (self.currentLevelData != Assets.Data.levels['0']) $('#morphs').delay(400).fadeIn();
            });
        }

        if (Input.isPressed(Keys.P)) {
            config.physics.debug = !config.physics.debug;
        }


        this.level.update(this);

        if (this.shakeDuration > 0) {
            this.shakeDuration = this.shakeDuration - config.tick;
            var forceX = Math.random() * this.shakeForce / 2 - this.shakeForce;
            var forceY = Math.random() * this.shakeForce / 2 - this.shakeForce;
            config.display.shake = {
                x: forceX,
                y: forceY
            };

        } else {
            config.display.shake = {
                x: 0,
                y: 0
            };
        }
    },

    draw: function() {
        this.level.draw(this.context);
    }
});

module.exports = Game;
