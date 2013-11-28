var Config = {

    debug: {
        level: '9'
    },

    tick: 0,

    assetsPath: 'media/',
    defaultExt: {
        img: 'png',
        data: 'json'
    },

    message: {
        top: 0,
    },

    perspective: {
        flip: false,
        pWidth: 22,
        pHeight: 21,
        asset: 'tilesets.main',
        align: 'b-r',
        depth: 0,
        tilesPerRow: 7,
        // base: {
        //     x: 5,
        //     y: 5,
        //     w: 17,
        //     h: 16
        // }
    },

    image: {
        asset: 'info',
        firstgid: 36
    },

    physics: {
        debug: false
    },

    fog: {
        enabled: true,
        pos: {
            x: 0,
            y: 0
        },
        area: {
            x: 30,
            y: 0
        }
    },

    display: {
        clearColor: '#261C25',

        offset: {
            x: 0,
            y: 0
        },

        shake: {
            x: 0,
            y: 0
        }, 

        fullscreen: false,

        realwidth: 1,
        realheight: 1,
        scale: 1,

        width: 420,
        height: 200
    }

};

module.exports = Config;
