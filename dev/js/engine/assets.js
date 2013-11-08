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