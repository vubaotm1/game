module.exports = {


    Intro: require('./actions/intro'),
    ChangeSpawn: require('./actions/changespawn'),
    EndLevel: require('./actions/endlevel'),


    Lava: require('./scenery/lava'),
    Laser: require('./scenery/laser'),


    Player: require('./player'),


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
