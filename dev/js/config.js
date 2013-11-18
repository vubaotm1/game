var Config = {

    assetsPath: 'media/',
    defaultExt: {
        img: 'png',
        data: 'json'
    },

    perspective: {
        flip: false,
        pWidth: 22,
        pHeight: 21,
        asset: 'tilesets.main',
        align: 'b-r',
        depth: 0
    },

    physics: {
        debug: false
    },

    display: {
        clearColor: 'rgba(24, 17, 23, .62)',
        fullscreen: true,
        width: 200,
        height: 320,
        scale: 3,
        get realWidth() {
            return this.width * this.scale;
        },
        get realHeight() {
            return this.height * this.scale;
        }
    }

};

module.exports = Config;
