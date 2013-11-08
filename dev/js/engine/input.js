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
