var p = require('./physics');

var CollisionLayer = Class.extend({

    name: null,
    bodies: [],

    init: function(data) {
        this.name = data.name;

        data = data.data;
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];

            if (obj.polygon) {
                this.bodies.push(p.createCollisionPolygon(obj.polygon, obj.x, obj.y, obj.properties));
            } else if (obj.polyline) {
                this.bodies.push(p.createCollisionPolyline(obj.polyline, obj.x, obj.y, obj.properties));
            } else if (obj.ellipse) {

            } else {
                this.bodies.push(p.createCollisionBox(obj.x, obj.y, obj.width, obj.height, obj.properties));
            }
        }
    },

    update: function() {},

    draw: function() {}

})

module.exports = CollisionLayer;
