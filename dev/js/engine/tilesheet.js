var Graphic = require('./graphic');

var Tilesheet = Graphic.extend({
    
    tileheight: 0,
    tilewidth: 0,

    init: function(path, options, callback) {
        this.parent(path, options, callback);

        this.tileheight = options.tileheight || options.tilesize;
        this.tilewidth = options.tilewidth || options.tilesize;
    },

    drawTile: function(ctx, x, y, scale, tile, flip) {
        if (!this.loaded) return;

        var rect = this.getRect(tile || 0);
        var data = this.scaled[scale] || this.image;

        if (flip) {
            var sx = flip.x ? -1 : 1;
            var sy = flip.y ? -1 : 1;
            ctx.save();
            ctx.scale(sx, sy);
        }

        ctx.drawImage(
            data,
            rect.x, rect.y, rect.width, rect.height,
            x, y, rect.width, rect.height
        )

        if (flip) ctx.restore();
    },

    createRects: function() {
        var tiles = (this.width / this.tilewidth) * (this.height / this.tileheight);
        for (var s = scales.length; s--;) {
            for (var t = tiles; t--) {
                if (this.scaled[s]) {
                    this.scaled[s].rects[i] = this.createRect(i, s);
                } else {
                    this.image.rects[i] = this.createRect(i, s);
                }
            }
        }
    },

    createRect: function(tile, scale) {
        var x = ~~ (tile * this.tilewidth) % this.width;
        var y = ~~ (tile * this.tilewidth / this.width) * this.tileheight;

        return {
            x: x,
            y: y,
            width: this.tilewidth * scale,
            height: this.tileheight * scale
        };
    },

    getRect: function(tile, scale) {
        if (tile == 0) {
            return {
                x: 0,
                y: 0,
                width: this.width * scale,
                height: this.height * scale
            };
        }
        if (this.scaled[scale]) {
            return this.scaled[scale].rects[tile];
        } else {
            return this.image.rects[tile];
        }
    }
});


module.exports = Tilesheet;