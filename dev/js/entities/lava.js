var Entity = require('./entity');

var Lava = Entity.extend({

    foreground: true,

    offset: {
        x: 0,
        y: -1
    },

    init: function(x, y, options) {
        this.parent(x, y, 1, {
            y: y+options.height-2,
            width: options.width,
            height: 2,
            isSensor: true,
            bodytype: 'b2_staticBody'
        });

        this.addAnimation('static', 'tilesets.scenery', this.scale, .1, [0], false);

        var sheet = this.animation.tilesheet;
        this.width = ~~ (options.width / sheet.tilewidth);
        this.height = ~~ (options.height / sheet.tileheight);
        this.tilewidth = sheet.tilewidth;
        this.tileheight = sheet.tilewidth;

        if (this.width > 0 && this.height == 0) this.height = 1;
        if (this.width == 0 && this.height > 0) this.width = 1;
    },

    update: function(game) {
        if(this.body.m_userData.playerCollision) {
            game.level.respawnPlayer(true);
        }
    },

    draw: function(ctx) {
        if (this.animation) {
            for (var x = 0; x < this.width; x++) {
                for (var y = 0; y < this.height; y++) {
                    var xx = x * this.tilewidth + this.pos.x + this.offset.x;
                    var yy = y * this.tileheight + this.pos.y + this.offset.y;
                    if(x == 0) xx = xx+1;
                    this.animation.draw(ctx, xx, yy, 0);
                }
            }
        }
    }


});

module.exports = Lava;
