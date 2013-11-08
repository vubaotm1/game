var Config = {

    assetsPath: 'media/',
    defaultExt: {
        img: "png"
    },

    test: 2,

    display: {
        clearColor: "#111",
        width: 480,
        height: 320,
        scale: 2,
        get realWidth() {
            return this.width * this.scale;
        },
        get realHeight() {
            return this.height * this.scale;
        }
    }

};

module.exports = Config;
