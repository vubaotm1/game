;(function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
require('./core/class.js');
require('./core/requestAnimFrame');

var media = require('./data/media');
var Assets = require('./engine/assets');

var game = require('./game.js');

window.addEventListener('load', function(event) {
    Assets.loadAll(media);
    window.b = Assets;
    new game();
})
},{"./core/class.js":2,"./game.js":3,"./core/requestAnimFrame":4,"./engine/assets":5,"./data/media":6}],2:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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
        abc: {
            file: 'test'
        },
        def: {
            file: 'test2',
            scale: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        },
        test: {
            file: 'test'
        },
        items: {},
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

},{}],3:[function(require,module,exports){
var Engine = require('./engine/engine');
var Assets = require('./engine/assets');

var Game = Engine.extend({
    init: function() {
        this.parent();

        this.tick();
    },

    update: function() {
        this.parent();
    }
});

module.exports = Game;

},{"./engine/engine":7,"./engine/assets":5}],5:[function(require,module,exports){
var config = require('../config');
var Graphic = require('./graphic');

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


Assets = {
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
        console.log(path+' loaded '+(new Date()).getTime()+' - Completion: %c'+this.completion+' %', 'color: green; font-size: 14px;');
        
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

        var obj = new Graphic(path, resource, this._doneLoading.bind(this));

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
},{"../config":8,"./graphic":9}],9:[function(require,module,exports){
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
        this.scale = options ? options.scale : null;
        this._onloadCallback = callback;
        this._load();
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

        if (this.scale) {
            if (this.scale.length == 1) {
                if(this.scale[0] != 1)
                    this.image = this.resize(this.image, this.scale[0]);
            } else {
                for (var i = 0; i < this.scale.length; i++) {
                    var scale = this.scale[i];
                    this.scaled[scale] = this.resize(this.image, scale);
                }
                this.image = this.scaled[this.scale[0]];
            }
        }

        this._onloadCallback(this.path);
    },

    _onerror: function(event) {
        throw('An error happened while loading ' + this.path);
    },

    resize: function(img, scale) {
        var sCanvas = document.createElement('canvas');
        sCanvas.width = img.width;
        sCanvas.height = img.height;
    
        var sCtx = sCanvas.getContext('2d');
        sCtx.drawImage(img, 0, 0);
        var src_data = sCtx.getImageData(0, 0, img.width, img.height).data;
    
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
                        dData[dst_p++] = src_data[tmp++];
                        dData[dst_p++] = src_data[tmp++];
                        dData[dst_p++] = src_data[tmp++];
                        dData[dst_p++] = src_data[tmp++];
                    }
                }
            }
        }
    
        dCtx.putImageData(dImgData, 0, 0);

        return dCanvas;
    }

});


module.exports = Graphic;
},{}],8:[function(require,module,exports){
var Config = {

    assetsPath: 'media/',
    defaultExt: {
        img: "png"
    },

    base: {
        width: 480,
        height: 320,
        scale: 20,
        clearColor: '#000000'
    },
    height: {
        abc: 123
    }

};

module.exports = Config;
},{}],7:[function(require,module,exports){
var config = require('../config');

var Engine = Class.extend({
    init: function() {
        this.paused = false;

        this.screens = [];
        this.draws = 0;

        this.canvas = null;
        this.context = null;

        this.initCanvas();
    }
});

Engine.prototype.initCanvas = function() {
    var c = document.getElementById('canvas');
    if (!c) {
        c.width = config.base.width;
        c.height = config.base.height;
        var container = document.getElementById(config.base.container) || document.body;
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
};

Engine.prototype.update = function() {};

Engine.prototype.draw = function() {
    this.draws = 0;
    for (var i = this.screens.length; i; i--) {
        this.screens[i].clear(config.base.clearColor);
    }
};

Engine.prototype.togglePause = function() {
    this.paused = !this.paused;

    if (!this.paused) {
        this.tick();
    }
};

Engine.prototype.tick = function() {
    if (this.paused) return

    this.update();

    requestAnimFrame(this.tick.bind(this));
    this.draw();

};





module.exports = Engine;

},{"../config":8}]},{},[1])
;