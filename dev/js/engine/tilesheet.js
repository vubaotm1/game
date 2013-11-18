var Graphic = require('./graphic');
var config = require('../config');

var Tilesheet = Graphic.extend({

    tileheight: 0,
    tilewidth: 0,

    init: function(path, options, callback) {
        this.parent(path, options, callback);

        this.tileheight = options.tileheight || options.tilesize;
        this.tilewidth = options.tilewidth || options.tilesize;
    },

    drawTile: function(ctx, x, y, tile, scale, flip, angle) {
        if (!this.loaded) return;

        var rect = this.getRect(tile || 0, scale);
        var data = this.scaled[scale] || this.image;

        flip = flip || {};

        var sx = flip.x ? -1 : 1;
        var sy = flip.y ? -1 : 1;
        x = this.applyScale(x) * sx - ((flip.x) ? rect.width : 0);
        y = this.applyScale(y) * sy - ((flip.y) ? rect.height : 0);


        ctx.save();

        if (flip) ctx.scale(sx, sy);
        if (angle) {
            ctx.translate(x, y);
            ctx.rotate(angle);
            x = 0; y = 0; //pivot
        }

        ctx.drawImage(
            data,
            rect.x, rect.y, rect.width, rect.height,
            x, y, rect.width, rect.height
        );

        ctx.restore();
    },

    getRect: function(tile, scale) {
        scale = scale || 1;


        var w = (tile >= 0) ? this.tilewidth : this.width;
        var h = (tile >= 0) ? this.tileheight : this.height;

        if (tile <= 0) tile = 0;

        var x = ~~ (tile * this.tilewidth) % this.width;
        var y = ~~ (tile * this.tilewidth / this.width) * this.tileheight;


        return {
            x: this.applyScale(x * scale),
            y: this.applyScale(y * scale),
            width: this.applyScale(w * scale),
            height: this.applyScale(h * scale)
        };
    }
});


module.exports = Tilesheet;
