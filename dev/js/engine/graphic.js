var config = require('../config');

var Graphic = Class.extend({

    loaded: false,
    path: '',

    width: 0,
    height: 0,

    image: null,

    scaled: {},
    scale: [],

    _onloadCallback: null,


    init: function(path, options, callback) {
        this.path = path;
        this.scale = (options && options.scale) ? options.scale : [1];
        this.scaled = {};

        this._onloadCallback = callback;
        this._load();
    },

    applyScale: function(p) {
        return Math.round(p * config.display.scale);
    },

    draw: function(ctx, x, y, scale) {
        if (!this.loaded) return;

        var data = this.scaled[scale] || this.image;

        ctx.drawImage(
            data,
            0, 0, data.width, data.height,
            this.applyScale(x), this.applyScale(y), data.width, data.height
        );
    },

    _load: function() {
        if (this.loaded) return;

        this.image = new Image();
        this.image.onload = this._onload.bind(this);
        this.image.onerror = this._onerror.bind(this);
        this.image.src = this.path;
    },

    _onload: function(event) {
        this.loaded = true;

        this.width = this.image.width;
        this.height = this.image.height;

        this.resizeAll();

        this._onloadCallback(this.path);
    },

    resizeAll: function() {
        for (var i = 0; i < this.scale.length; i++) {
            this.scaled[this.scale[i]] = this.resize(this.image, this.scale[i]);
        }
    },

    _onerror: function(event) {
        throw ('An error happened while loading ' + this.path);
    },

    resize: function(img, scale) {
        if(this.scale === 1 && config.display.scale === 1 ) {
            return img;
        }

        scale = this.applyScale(scale);

        var sCanvas = document.createElement('canvas');
        sCanvas.width = img.width;
        sCanvas.height = img.height;

        var sCtx = sCanvas.getContext('2d');
        sCtx.drawImage(img, 0, 0);
        var sData = sCtx.getImageData(0, 0, img.width, img.height).data;

        var dw = img.width * scale;
        var dh = img.height * scale;

        var dCanvas = document.createElement('canvas');
        dCanvas.width = dw;
        dCanvas.height = dh;

        var dCtx = dCanvas.getContext('2d');

        var dImgData = dCtx.getImageData(0, 0, dw, dh);
        var dData = dImgData.data;

        var src_p = 0;
        var dst_p = 0;
        for (var y = 0; y < this.height; ++y) {
            for (var i = 0; i < scale; ++i) {
                for (var x = 0; x < this.width; ++x) {
                    src_p = 4 * (y * this.width + x);
                    for (var j = 0; j < scale; ++j) {
                        var tmp = src_p;
                        dData[dst_p++] = sData[tmp++];
                        dData[dst_p++] = sData[tmp++];
                        dData[dst_p++] = sData[tmp++];
                        dData[dst_p++] = sData[tmp++];
                    }
                }
            }
        }

        dCtx.putImageData(dImgData, 0, 0);

        return dCanvas;
    }

});


module.exports = Graphic;
