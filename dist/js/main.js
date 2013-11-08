;(function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
require('./lib/class.js');
require('./lib/requestAnimFrame');

window.Stats = require('./lib/stats.js');

var media = require('./data/media');
window.Assets = require('./engine/assets');

var game = require('./game.js');

window.Input = require('./engine/input');
window.Keys = require('./engine/keys');

Input.bind('a', [Keys.A]);

window.addEventListener('load', function(event) {
    Assets.loadAll(media);
    new game();
})
},{"./lib/class.js":2,"./lib/stats.js":3,"./game.js":4,"./lib/requestAnimFrame":5,"./data/media":6,"./engine/assets":7,"./engine/input":8,"./engine/keys":9}],2:[function(require,module,exports){
(function() {
    var initializing = false,
        fnTest = /xyz/.test(function() {
            xyz
        }) ? /\bparent\b/ : /.*/;
    this.Class = function() {};
    Class.extend = function(e) {
        function i() {
            if (!initializing && this.init) this.init.apply(this, arguments)
        }
        var t = this.prototype;
        initializing = true;
        var n = new this;
        initializing = false;
        for (var r in e) {
            n[r] = typeof e[r] == "function" && typeof t[r] == "function" && fnTest.test(e[r]) ? function(e, n) {
                return function() {
                    var r = this.parent;
                    this.parent = t[e];
                    var i = n.apply(this, arguments);
                    this.parent = r;
                    return i
                }
            }(r, e[r]) : e[r]
        }
        i.prototype = n;
        i.prototype.constructor = i;
        i.extend = arguments.callee;
        return i
    }
})();

},{}],3:[function(require,module,exports){
var Stats = function() {
    var l = Date.now(),
        m = l,
        g = 0,
        n = Infinity,
        o = 0,
        h = 0,
        p = Infinity,
        q = 0,
        r = 0,
        s = 0,
        f = document.createElement("div");
    f.id = "stats";
    f.addEventListener("mousedown", function(b) {
        b.preventDefault();
        t(++s % 2)
    }, !1);
    f.style.cssText = "width:80px;opacity:0.9;cursor:pointer";
    var a = document.createElement("div");
    a.id = "fps";
    a.style.cssText = "padding:0 0 3px 3px;text-align:left;background-color:#002";
    f.appendChild(a);
    var i = document.createElement("div");
    i.id = "fpsText";
    i.style.cssText = "color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px";
    i.innerHTML = "FPS";
    a.appendChild(i);
    var c = document.createElement("div");
    c.id = "fpsGraph";
    c.style.cssText = "position:relative;width:74px;height:30px;background-color:#0ff";
    for (a.appendChild(c); 74 > c.children.length;) {
        var j = document.createElement("span");
        j.style.cssText = "width:1px;height:30px;float:left;background-color:#113";
        c.appendChild(j)
    }
    var d = document.createElement("div");
    d.id = "ms";
    d.style.cssText = "padding:0 0 3px 3px;text-align:left;background-color:#020;display:none";
    f.appendChild(d);
    var k = document.createElement("div");
    k.id = "msText";
    k.style.cssText = "color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px";
    k.innerHTML = "MS";
    d.appendChild(k);
    var e = document.createElement("div");
    e.id = "msGraph";
    e.style.cssText = "position:relative;width:74px;height:30px;background-color:#0f0";
    for (d.appendChild(e); 74 > e.children.length;) j = document.createElement("span"), j.style.cssText = "width:1px;height:30px;float:left;background-color:#131", e.appendChild(j);
    var t = function(b) {
        s = b;
        switch (s) {
            case 0:
                a.style.display =
                    "block";
                d.style.display = "none";
                break;
            case 1:
                a.style.display = "none", d.style.display = "block"
        }
    };
    return {
        REVISION: 11,
        domElement: f,
        setMode: t,
        begin: function() {
            l = Date.now()
        },
        end: function() {
            var b = Date.now();
            g = b - l;
            n = Math.min(n, g);
            o = Math.max(o, g);
            k.textContent = g + " MS (" + n + "-" + o + ")";
            var a = Math.min(30, 30 - 30 * (g / 200));
            e.appendChild(e.firstChild).style.height = a + "px";
            r++;
            b > m + 1E3 && (h = Math.round(1E3 * r / (b - m)), p = Math.min(p, h), q = Math.max(q, h), i.textContent = h + " FPS (" + p + "-" + q + ")", a = Math.min(30, 30 - 30 * (h / 100)), c.appendChild(c.firstChild).style.height =
                a + "px", m = b, r = 0);
            return b
        },
        update: function() {
            l = this.end()
        }
    }
};

var stats = new Stats();

stats.domElement.style.position = 'absolute';
stats.domElement.style.bottom = '0px';
stats.domElement.style.left = '0px';

document.body.appendChild( stats.domElement );

module.exports = stats;
},{}],5:[function(require,module,exports){
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();
},{}],6:[function(require,module,exports){
var media = {
    img: {
        sprites: {},
        tilesets: {},
        fonts: {},
        other: {}
    },
    sfx: {
        sounds: {},
        music: {}
    },
    data: {}
}

module.exports = media;

},{}],8:[function(require,module,exports){
var Input = Input || {

    reset: function() {
        this.pressed = {};
        this.down = {};
    },

    update: function() {
        this.pressed = {};
    },

    keydown: function(e) {
        var kc = e.keyCode;

        if (!this.down[kc]) {
            this.down[kc] = true;
            this.pressed[kc] = true;
        }

        e.stopPropagation();
        e.preventDefault();
    },

    keyup: function(e) {
        var kc = e.keyCode;
        if (this.down[kc]) {
            this.down[kc] = false;
        }
    },

    pressed: function(k) {
        if (isNaN(k)) {
            var keys = this.bind[k];
            for (var i = keys.length; i--;) {
                if (this.pressed[keys[i]]) return true;
            }
            return false;
        }
        return this.pressed[k];
    },

    down: function(k) {
        if (isNaN(k)) {
            var keys = this.bind[k];
            for (var i = keys.length; i--;) {
                if (this.down[keys[i]]) return true;
            }
            return false;
        }
        return this.down[k];
    },

    bind: function(name, keys) {
        this.bind[name] = keys;
    }

};

document.addEventListener('keydown', Input.keydown.bind(Input));
document.addEventListener('keyup', Input.keyup.bind(Input));

module.exports = Input;

},{}],9:[function(require,module,exports){
 var Key = {
    'BACKSPACE': 8,
    'TAB': 9,
    'ENTER': 13,
    'SHIFT': 16,
    'CTRL': 17,
    'ALT': 18,
    'PAUSE': 19,
    'CAPS': 20,
    'ESC': 27,
    'SPACE': 32,
    'PAGE_UP': 33,
    'PAGE_DOWN': 34,
    'END': 35,
    'HOME': 36,
    'LEFT_ARROW': 37,
    'UP_ARROW': 38,
    'RIGHT_ARROW': 39,
    'DOWN_ARROW': 40,
    'INSERT': 45,
    'DELETE': 46,
    '_0': 48,
    '_1': 49,
    '_2': 50,
    '_3': 51,
    '_4': 52,
    '_5': 53,
    '_6': 54,
    '_7': 55,
    '_8': 56,
    '_9': 57,
    'A': 65,
    'B': 66,
    'C': 67,
    'D': 68,
    'E': 69,
    'F': 70,
    'G': 71,
    'H': 72,
    'I': 73,
    'J': 74,
    'K': 75,
    'L': 76,
    'M': 77,
    'N': 78,
    'O': 79,
    'P': 80,
    'Q': 81,
    'R': 82,
    'S': 83,
    'T': 84,
    'U': 85,
    'V': 86,
    'W': 87,
    'X': 88,
    'Y': 89,
    'Z': 90,
    'NUMPAD_0': 96,
    'NUMPAD_1': 97,
    'NUMPAD_2': 98,
    'NUMPAD_3': 99,
    'NUMPAD_4': 100,
    'NUMPAD_5': 101,
    'NUMPAD_6': 102,
    'NUMPAD_7': 103,
    'NUMPAD_8': 104,
    'NUMPAD_9': 105,
    'MULTIPLY': 106,
    'F1': 112,
    'F2': 113,
    'F3': 114,
    'F4': 115,
    'F5': 116,
    'F6': 117,
    'F7': 118,
    'F8': 119,
    'F9': 120,
    'F10': 121,
    'F11': 122,
    'F12': 123
}

module.exports = Key;
},{}],4:[function(require,module,exports){
var Engine = require('./engine/engine');
var config = require('./config');

var Game = Engine.extend({
    init: function() {
        this.parent(this);

        this.tick();
    },

    update: function() {
        this.parent();

    },

    draw: function() {
        this.parent();

    }
});

module.exports = Game;

},{"./engine/engine":10,"./config":11}],7:[function(require,module,exports){
var config = require('../config');
var Graphic = require('./graphic');
var Tilesheet = require('./tilesheet');

Object.$get = function(o, path) {
    if (!path) return o;

    var a = path.split('.');
    while (a.length) {
        var n = a.shift();
        if (n in o) {
            o = o[n];
        } else {
            return;
        }
    }
    return o;
};

Object.$set = function(o, path, val) {
    if (!path) return;

    var a = path.split('.');
    while (a.length) {
        var n = a.shift();
        if (a.length > 0) {
            o[n] = {};
            o = o[n];
        } else {
            o[n] = val;
        }
    }
};


var Assets = {
    Graphics: {},
    Sounds: {},
    Data: {},

    _stack: {
        unloaded: 0,
        items: {},
        total: 0
    },

    get ready() {
        return this._stack.unloaded <= 0;
    },

    get completion() {
        return 100-(~~((this._stack.unloaded / this._stack.total)*100));
    },

    _doneLoading: function(path) {
        this._stack.unloaded--;

        if(this._stack.unloaded <= 0) {
            this._stack.unloaded = 0;
            this._stack.items = {};
            this._stack.total = 0;
        }
        console.info(path+' loaded '+(new Date()).getTime()+' - Completion: %c'+this.completion+' %', 'color: green; font-size: 14px;');
        
    },

    _loadImage: function(path, resource) {
        if (resource.file.indexOf('.') == -1) {
            resource.file += "." + config.defaultExt.img;
        }

        var p = path.replace('img.', '');
        path = path.split('.');
        path.pop();
        path = path.join('/');
        path = config.assetsPath + path + '/' + resource.file;

        var obj;
        if(resource.tilesize || (resource.tileheight && resource.tilewidth)) {
            obj = new Tilesheet(path, resource, this._doneLoading.bind(this));
        } else {
            obj = new Graphic(path, resource, this._doneLoading.bind(this));
        }

        Object.$set(Assets.Graphics, p, obj);
    },

    _loadSound: function(path, resource) {

    },

    _loadData: function(path, resource) {

    },

    _load: function(obj, path) {
        if (!path || !obj) return;

        var self = Assets;
        var resource = Object.$get(obj, path);

        var type = path.split('.')[0];
        switch (type) {
            case 'sfx':
                self._loadSound(path, resource);
                break;
            case 'img':
                self._loadImage(path, resource);
                break;
            case 'data':
                self._loadData(path, resource);
                break;
        }
    },

    loadAll: function(data, path) {
        var self = Assets;

        var obj = Object.$get(data, path);
        for (var o in obj) {
            var p = (path) ? path + '.' + o : o;

            if (obj[o].file) {
                this._stack.items[p] = obj[o];
                this._stack.unloaded++;
                this._stack.total++;
            } else if (typeof obj[o] == 'object') {
                self.loadAll(data, p);
            }
        }

        if(!path) {
            for(var a in this._stack.items) {
                this._load(data, a);
            }
        }
    }
};

module.exports = Assets;
},{"../config":11,"./graphic":12,"./tilesheet":13}],11:[function(require,module,exports){
var Config = {

    assetsPath: 'media/',
    defaultExt: {
        img: "png"
    },

    test: 2,

    display: {
        clearColor: "#111",
        width: 480,
        height: 320,
        scale: 2,
        get realWidth() {
            return this.width * this.scale;
        },
        get realHeight() {
            return this.height * this.scale;
        }
    }

};

module.exports = Config;

},{}],10:[function(require,module,exports){
var config = require('../config');

var Engine = Class.extend({
    paused: false,

    canvas: null,
    context: null,

    draws: 0,
    layers: [],

    self: null,

    init: function(self) {
        this.self = self;

        this.initCanvas();
    },

    initCanvas: function() {
        var c = document.getElementById('canvas');
        if (!c) {
            c = document.createElement('canvas');
            c.id = 'canvas';
            c.width = config.display.width * config.display.scale;
            c.height = config.display.height * config.display.scale;
            var container = document.getElementById(config.display.container) || document.body;
            container.appendChild(c);
        }
        c.style.imageRendering = '-moz-crisp-edges';
        c.style.imageRendering = '-o-crisp-edges';
        c.style.imageRendering = '-webkit-optimize-contrast';
        c.style.imageRendering = 'crisp-edges';
        c.style.msInterpolationMode = 'nearest-neighbor';

        this.canvas = c;

        this.context = c.getContext('2d');
        this.context.imageSmoothingEnabled = false;
        this.context.webkitImageSmoothingEnabled = false;
        this.context.mozImageSmoothingEnabled = false;
    },

    update: function() {

    },

    clear: function() {
        if (!config.display.clearColor) {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        } else {
            this.context.fillStyle = config.display.clearColor;
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
    },

    draw: function() {
        this.draws = 0;
        this.clear();
    },

    togglePause: function() {
        this.paused = !this.paused;

        if (!this.paused) {
            this.tick();
        }
    },

    tick: function() {
        if (this.paused) return

        Stats.begin();

        this.update();

        requestAnimFrame(this.tick.bind(this.self));
        this.draw();

        Stats.end();

    }
});


module.exports = Engine;

},{"../config":11}],12:[function(require,module,exports){
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

        for (var i = 0; i < this.scale.length; i++) {
            this.scaled[this.scale[i]] = this.resize(this.image, this.scale[i]);
        }

        this._onloadCallback(this.path);
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

},{"../config":11}],13:[function(require,module,exports){
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

    drawTile: function(ctx, x, y, tile, scale, flip) {
        if (!this.loaded) return;

        var rect = this.getRect(tile || 0, scale);
        var data = this.scaled[scale] || this.image;


        var sx = flip.x ? -1 : 1;
        var sy = flip.y ? -1 : 1;
        x = this.applyScale(x) * sx - ((flip.x) ? rect.width : 0);
        y = this.applyScale(y) * sy - ((flip.y) ? rect.height : 0);

        if (flip) {
            ctx.save();
            ctx.scale(sx, sy);
        }

        ctx.drawImage(
            data,
            rect.x, rect.y, rect.width, rect.height,
            x, y, rect.width, rect.height
        );

        if (flip) ctx.restore();
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

},{"./graphic":12,"../config":11}]},{},[1])
;