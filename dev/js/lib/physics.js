window.Physics = require('./physicsjs-full');

Physics.body('box', 'convex-polygon', function(parent) {
    return {
        init: function(options) {
            options.vertices = [{
                x: 0,
                y: options.height
            }, {
                x: options.width,
                y: options.height
            }, {
                x: options.width,
                y: 0
            }, {
                x: 0,
                y: 0
            }]

            parent.init.call(this, options);
        }
    }
});


Physics.behavior('body-collision-details', function(parent) {
    var PUBSUB_COLLISION = 'collisions:detected';
    return {
        connect: function(world) {

            world.subscribe(PUBSUB_COLLISION, this.respond, this);
        },

        disconnect: function(world) {

            world.unsubscribe(PUBSUB_COLLISION, this.respond);
        },

        respond: function(data) {
            var col, collisions = Physics.util.shuffle(data.collisions);

            for (var i = 0, l = collisions.length; i < l; ++i) {
                col = collisions[i];

                if (col.norm.y === 1) {
                    if (col.bodyA.state.vel.get(1) >= 0) {
                        col.bodyA.onFloor = true;
                    }
                    if (col.bodyB.state.vel.get(1) >= 0) {
                        col.bodyB.onFloor = true;
                    }
                }
                if (col.norm.y === -1) {
                    if (col.bodyB.state.vel.get(1) >= 0) {
                        col.bodyB.onFloor = true;
                    }
                }

                if (col.norm.x != 0) {
                    col.bodyA.touchingWall = true;
                    col.bodyA.touchingWall = true;
                }
            }
        }
    };
});


var World = Physics(function(world) {

    world.startPhysics = function(self) {
        Physics.util.ticker.subscribe(function(time, dt) {
            world.step(time);
        });

        // start the ticker
        Physics.util.ticker.start();


        var bounds = Physics.aabb(0, 0, 480, 320);

        world.add(Physics.behavior('body-collision-detection'));
        world.add(Physics.behavior('sweep-prune'));

        world.add(Physics.behavior('body-impulse-response'));
        world.add(Physics.behavior('body-collision-details'));



        world.add(Physics.behavior('edge-collision-detection', {
            aabb: bounds,
            restitution: 0.2,
            cof: 0.8
        }));

        world.add(Physics.behavior('constant-acceleration'));

        world.subscribe('step', function() {

            Stats.begin();
            self.update();
            self.draw();
            Stats.end();

        });
    }


    world.addBox = function(x, y, w, h) {

        var box = Physics.body('box', {
            x: x,
            y: y,
            width: w,
            height: h,
            cof: 0.99,
            restitution: 0.99,
            fixedAngle: true

        });

        world.add(box);

        return box;
    }

    return world;
});

exports.world = World;
exports.physics = Physics;
