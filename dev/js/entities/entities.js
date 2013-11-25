module.exports = {
    Intro: require('./intro'),
    ChangeSpawn: require('./changespawn'),
    EndLevel: require('./endlevel'),
    Lava: require('./lava'),
    Player: require('./player'),
    Emitter: require('./particleemitter'),
    Control: { 
        Test: require('./control/test') 
    },
    Spawn: {
        Test: require('./spawn/test'),
        Movable: require('./spawn/movable'),
        Immovable: require('./spawn/immovable'),
        //Float: require('./spawn/float'),
        //Spring: require('./spawn/spring')
    }
};
