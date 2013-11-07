var assets = require('../data/assets');

Object.$get = function(o, path) {
    if (!path) return o;

    var o = o;
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
}

Object.$set = function(o, path, val) {
    if (!path) return;

    var o = o;
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
}

Game.Graphics = {};
Game.Sounds = {};
Game.Data = {};

Game.Assets = {
    _stack: [],

    _loadImage: function(path, resource) {
        Object.$set(Game.Graphics, path, resource);
    },

    _loadSound: function(path, resource) {

    },

    _loadData: function(path, resource) {

    },

    _load: function(obj, path) {
        if (!path || !obj) return;

        var self = Game.Assets;
        var resource = Object.$get(obj, path);

        path = path.split('.');
        var type = path.shift();
        path = path.join('.');

        switch (type) {
            case "sfx":
                self._loadSound(path, resource);
                break;
            case "img":
                self._loadImage(path, resource);
                break;
            case "data":
                self._loadData(path, resource);
                break;
        }
    },

    loadAll: function(data, path) {
        var self = Game.Assets;

        var obj = Object.$get(data, path);
        for (var o in obj) {
            var p = (path) ? path + '.' + o : o;

            if (obj[o]['file']) {
                self._load(data, p);
            } else if (typeof obj[o] == "object") {
                self.loadAll(data, p);
            }

        }
    }
}

window.addEventListener('load', function() {
    Game.Assets.loadAll(assets);
});
