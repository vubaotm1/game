var Input = {
    pressed: {},
    down: {},
    named: {},
};

Input.reset = function() {
    Input.pressed = {};
    Input.down = {};
};

Input.update = function() {
    Input.pressed = {};
};

Input.keydown = function(e) {
    var kc = e.keyCode;

    if (!Input.down[kc]) {
        Input.down[kc] = true;
        Input.pressed[kc] = true;
    }

    e.stopPropagation();
    e.preventDefault();
};

Input.keyup = function(e) {
    var kc = e.keyCode;
    if (Input.down[kc]) {
        Input.down[kc] = false;
    }
};

Input.pressed = function(k) {
    if (isNaN(k)) {
        var keys = Input.named[k];
        for (var i = keys.length; i; i--) {
            if (Input.pressed[keys[i]]) return true;
        }
        return false;
    }
    return Input.pressed[k];
};

Input.down = function(k) {
    if (isNaN(k)) {
        var keys = Input.named[k];
        for (var i = keys.length; i; i--) {
            if (Input.down[keys[i]]) return true;
        }
        return false;
    }
    return Input.down[k];
};

Input.name = function(name, keys) {
    Input.named[name] = keys;
};

document.addEventListener('keydown', Input.keydown);
document.addEventListener('keyup', Input.keyup);





module.exports = Input;
