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
            this.orrX = (a[1] == 'l') ? 0 : tw - this.pWidth+1;
            this.orrY = (a[0] == 't') ? 0 : th - this.pHeight+1;
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
        for (var x = this.width-1; x >= 0; x--) {
            for (var y = this.height-1; y >= 0; y--) {
                var xf = f ? (this.width-1) - x : x;

                var xx = (xf * this.tilewidth + (f ? -this.orrX*this.depth : this.offsetX)) * this.scale;
                var yy = (y * this.tileheight + this.offsetY) * this.scale;

                var tile = this.data[xf + y * this.width]-1;
                if(tile < 0) continue;

                tile += f ? 7 : 0;

                this.asset.drawTile(ctx, xx, yy, tile, this.scale);
            }
        } 
    }

});


module.exports = PerspectiveLayer;
