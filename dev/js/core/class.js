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
