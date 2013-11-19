var Layer = require('./layer');
var config = require('../config');

var PerspectiveLayer = Layer.extend({
    asset: null,

    pWidth: 1,
    pHeight: 1,

    offsetX: 0,
    offsetY: 0,

    orrX: 0,
    orrY: 0,

    depth: 0,

    init: function(data, w, h, tw, th) {
        this.parent(data, w, h, tw, th);

        Object.$merge(data.properties, config.perspective);

        this.asset = Object.$get(Assets.Graphics, data.properties.asset);
        this.definition = data.properties.definition;

        this.pWidth = parseInt(data.properties.pWidth);
        this.pHeight = parseInt(data.properties.pHeight);

        this.depth = parseInt(data.properties.depth);

        var a = data.properties.align;
        if (a) {
            a = a.split('-');
            this.orrX = (a[1] == 'l') ? 0 : tw - this.pWidth + 1;
            this.orrY = (a[0] == 't') ? 0 : th - this.pHeight + 1;
        }

        this.offsetX = this.orrX + this.orrX * this.depth;
        this.offsetY = this.orrY + this.orrY * this.depth;

        var pre = data.properties.prerendered;
        if (pre == undefined || pre) {
            this.preRender();
        }
    },

    draw: function(ctx) {
        var f = config.perspective.flip;

        var rtw = this.tilewidth * this.scale;
        var rth = this.tileheight * this.scale;

        var sx = ((config.display.offset.x / (rtw * config.display.scale)) << 0),
            sy = ((config.display.offset.y / (rth * config.display.scale)) << 0),
            ew = (((config.display.width + this.orrX * 2) / rtw) << 0) - sx,
            eh = (((config.display.height + this.orrY * 2) / rth) << 0) - sy;


        sx = Math.max(0, -sx);
        sy = Math.max(0, -sy);
        ew = Math.min(this.width - 1, ew);
        eh = Math.min(this.height - 1, eh);

        var xf, xx, yy, tile;
        for (var x = ew; x >= sx; x--) {
            for (var y = eh; y >= sy; y--) {
                xf = f ? ew - (x - sx) : x;

                xx = (xf * this.tilewidth + (f ? -this.orrX * this.depth : this.offsetX)) * this.scale;
                yy = (y * this.tileheight + this.offsetY) * this.scale;

                tile = this.data[xf + y * this.width] - 1;
                if (tile < 0) continue;

                tile += f ? 7 : 0;

                this.asset.drawTile(ctx, xx, yy, tile, this.scale);
            }
        }
    }

});


module.exports = PerspectiveLayer;
