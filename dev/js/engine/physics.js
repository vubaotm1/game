window.Box2D = require('../lib/box2dweb');
var b2Vec2 = Box2D.Common.Math.b2Vec2,
    b2BodyDef = Box2D.Dynamics.b2BodyDef,
    b2Body = Box2D.Dynamics.b2Body,
    b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
    b2Fixture = Box2D.Dynamics.b2Fixture,
    b2World = Box2D.Dynamics.b2World,
    b2MassData = Box2D.Collision.Shapes.b2MassData,
    b2EdgeShape = Box2D.Collision.Shapes.b2EdgeShape,
    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
    b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
    b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
    b2Listener = Box2D.Dynamics.b2ContactListener;

var b2Sep = require('../lib/box_2d_separator');



var Physics = {
    world: new b2World(new b2Vec2(0, 9.8), true),

    dtRemaining: 0,
    stepAmount: 1 / 60,

    debugDraw: null,

    lastDt: new Date().getTime(),

    step: function() {
        var ct = new Date().getTime();
        var dt = (ct - this.lastDt) / 1000;
        if (dt > 1 / 15) dt = 1 / 15;

        this.dtRemaining += dt;
        while (this.dtRemaining > this.stepAmount) {
            this.dtRemaining -= this.stepAmount;
            this.world.Step(this.stepAmount, 8, 3);
        }

        this.lastDt = dt;
    },

    addBoxEntity: function(x, y, w, h, options) {
        var bd = new b2BodyDef();
        bd.position.Set(x, y);
        bd.type = b2Body.b2_dynamicBody;
        var body = this.world.CreateBody(bd);
        body.SetFixedRotation(true);

        var shape = new b2PolygonShape();
        shape.SetAsOrientedBox(w / 2, h / 2, new b2Vec2(w / 2, h / 2), 0);


        var fd = new b2FixtureDef();
        fd.shape = shape;
        fd.density = 4;
        fd.friction = 0.5;
        fd.restitution = 0.1;
        body.CreateFixture(fd);

        fd.friction = 0;
        shape.SetAsOrientedBox(0.3, h/2, new b2Vec2(0, h/2), 0);
        body.CreateFixture(fd);
        shape.SetAsOrientedBox(0.3, h/2, new b2Vec2(w, h/2), 0);
        body.CreateFixture(fd);

        shape.SetAsOrientedBox(0.3, 0.3, new b2Vec2(w/2, h), 0);
        fd.isSensor = true;

        var footSensor = body.CreateFixture(fd);
        footSensor.SetUserData({id: 'foot'});
        body.SetUserData({footContacts: 0});

        window.world = this.world;

        return body;
    },

    createCollisionBody: function(x, y) {
        var bd = new b2BodyDef();
        bd.type = b2Body.b2_staticBody;
        bd.position.Set(x, y);
        bd.density = 1;
        var body = this.world.CreateBody(bd);

        return body;
    },

    createCollisionFixture: function() {
        var fd = new b2FixtureDef();
        fd.restitution = 0.2;
        fd.friction = 0.5;
        fd.density = 4;

        return fd;
    },

    accelerate: function(body, speed) {
        var vel = body.GetLinearVelocity();

        var changeX = speed - vel.x,
            impulseX = body.GetMass()*changeX;

        body.ApplyLinearImpulse(new b2Vec2(impulse, 0), body.GetWorldCenter());
    },

    createCollisionBox: function(x, y, w, h) {
        var body = this.createCollisionBody(x, y);
        var fd = this.createCollisionFixture();

        var shape = new b2PolygonShape();
        shape.SetAsOrientedBox(w / 2, h / 2, new b2Vec2(w / 2, h / 2), 0);

        fd.shape = shape;
        body.CreateFixture(fd);

        return body;
    },

    createCollisionPolyline: function(vecArray, x, y) {
        var body = this.createCollisionBody(x, y);
        var fd = this.createCollisionFixture();

        for (var i = 0; i < vecArray.length - 1; i++) {
            var v1 = new b2Vec2(vecArray[i].x, vecArray[i].y),
                v2 = new b2Vec2(vecArray[i + 1].x, vecArray[i + 1].y);

            var shape = new b2PolygonShape();
            shape.SetAsEdge(v1, v2);

            fd.shape = shape;
            body.CreateFixture(fd);
        }

        return body;
    },

    createCollisionPolygon: function(vecArray, x, y) {
        var val = b2Sep.validate(vecArray);
        if (val !== 0) {
            throw ('Couldnt separate polygon, validation code ' + val);
        }

        var body = this.createCollisionBody(x, y);
        var fd = this.createCollisionFixture();

        b2Sep.separate(body, fd, vecArray);

        return body;
    },

    getBodyPos: function(body) {
        return {
            x: 0,
            y: 0
        }
    },

    draw: function() {
        if (this.debugDraw) {
            this.world.DrawDebugData();
        }
    },

    initDebug: function(context, scale) {
        this.scale = scale;
        this.debugDraw = new b2DebugDraw();
        this.debugDraw.SetSprite(context);
        this.debugDraw.SetDrawScale(scale);
        this.debugDraw.SetFillAlpha(0.3);
        this.debugDraw.SetLineThickness(1.0);
        this.debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
        this.world.SetDebugDraw(this.debugDraw);
    },

    resizeDebug: function(scale) {
        this.scale = scale;
        this.debugDraw.SetDrawScale(scale);
    },

    dragNDrop: function(element) {
        var self = this;
        var obj = null;
        var joint = null;

        function calculateWorldPosition(e) {
            return point = {
                x: (e.offsetX || e.layerX) / self.scale,
                y: (e.offsetY || e.layerY) / self.scale
            };
        }

        element.addEventListener("mousedown", function(e) {
            e.preventDefault();
            var point = calculateWorldPosition(e);
            self.world.QueryPoint(function(fixture) {
                obj = fixture.GetBody();
            }, point);
        });

        element.addEventListener("mousemove", function(e) {
            if (!obj) {
                return;
            }
            var point = calculateWorldPosition(e);

            if (!joint) {
                var jointDefinition = new Box2D.Dynamics.Joints.b2MouseJointDef();

                jointDefinition.bodyA = self.world.GetGroundBody();
                jointDefinition.bodyB = obj;
                jointDefinition.target.Set(point.x, point.y);
                jointDefinition.maxForce = 100000;
                jointDefinition.timeStep = self.stepAmount;
                joint = self.world.CreateJoint(jointDefinition);
            }

            joint.SetTarget(new b2Vec2(point.x, point.y));
        });

        element.addEventListener("mouseup", function(e) {
            obj = null;
            if (joint) {
                self.world.DestroyJoint(joint);
                joint = null;
            }
        });
    }
};

var listener = new b2Listener;

listener.BeginContact = function(contact) {
    var fixtureData = contact.GetFixtureA().GetUserData();
    if (fixtureData && fixtureData.id == 'foot') {
        contact.GetFixtureA().m_body.m_userData.footContacts++;
    }
    
    fixtureData = contact.GetFixtureB().GetUserData();
    if (fixtureData && fixtureData.id == 'foot') {
        contact.GetFixtureB().m_body.m_userData.footContacts++;
    }
}

listener.EndContact = function(contact) {
    var fixtureData = contact.GetFixtureA().GetUserData();
    if (fixtureData && fixtureData.id == 'foot') {
        contact.GetFixtureA().m_body.m_userData.footContacts--;
    }
    
    fixtureData = contact.GetFixtureB().GetUserData();
    if (fixtureData && fixtureData.id == 'foot') {
        contact.GetFixtureB().m_body.m_userData.footContacts--;
    }
}

Physics.world.SetContactListener(listener);


module.exports = Physics;
