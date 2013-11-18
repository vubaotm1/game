var Animation = Class.extend({
    tilesheet: null,
    scale: null,
    frametime: null,
    sequence: null,
    loop: null,

    frame: 0,
    tile: 0,

    flip: {
        x: false,
        y: false
    },

    init: function(tilesheet, scale, frametime, sequence, loop) {
        if(!tilesheet) throw("Tilesheet not found!");

        this.scale = scale;
        this.tilesheet = tilesheet;
        this.frameTime = frametime;
        this.sequence = sequence;

        this.flip = {};

        this.loop = loop || true;

        this._initTime = (new Date()).getTime();

        this.tile = this.sequence[0];
    },

    update: function() {
        var time = (new Date()).getTime();
        var currentFrame = ~~(((time - this._initTime) / 1000) / this.frameTime);
        if (!this.loop && this.currentFrame > this.sequence.length - 1) {
            this.frame = this.sequence.length - 1;
        } else {
            this.frame = currentFrame % this.sequence.length;
        }

        this.tile = this.sequence[this.frame];
    },

    forceNextFrame: function() {
        this.frame = (this.frame + 1) % sequence.length;
        this.tile = this.sequence[this.frame];
    },

    draw: function(ctx, x, y, angle) {
        this.tilesheet.drawTile(ctx, x, y, this.tile, this.scale, this.flip, angle);
    }

});


module.exports = Animation;
