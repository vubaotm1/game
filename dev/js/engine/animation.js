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
        this.scale = scale;
        this.tilesheet = tilesheet;
        this.frameTime = frametime;
        this.sequence = sequence;

        this.loop = loop || true;

        this._initTime = (new Date()).getTime();

        this.tile = this.sequence[0];
    },

    update: function() {
        var time = (new Date()).getTime();
        var currentFrame = ~~ ((thisTime - this._initTime) / this.frametime);
        if (!this.loop && this.currentFrame > this.sequence.length - 1) {
            this.frame = this.sequence.length - 1;
        } else {
            this.frame = this.currentFrame % this.sequence.length;
        }
        this.tile = this.sequence[this.frame];
    },

    forceNextFrame: function() {
        this.frame = (this.frame + 1) % sequence.length;
        this.tile = this.sequence[this.frame];
    },

    draw: function(ctx, x, y) {
        this.tilesheet.drawTile(ctx, x, y, this.scale, this.tile, this.flip);
    }

});


module.exports = Animation;
