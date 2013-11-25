var media = {
    img: {
        sprites: {
            player: {
                file: 'player',
                tilesize: 20
            },
            spawn: {
                file: 'spawn',
                tilesize: 20
            }
        },
        debug: {
            placeholder: {
                file: 'tileset_16_16.jpg',
                tilesize: 16
            }
        },
        info: {
            file: 'info',
            tilesize: 30
        },
        tilesets: {
            scenery: {
                file: 'scenery',
                tilewidth: 16,
                tileheight: 10
            },
            main: {
                file: 'main_tileset',
                tileheight: 21,
                tilewidth: 22,
                definition: {}
            }
        }
    },
    sfx: {},
    data: {
        levels: {
            intro: {
                file: 'first'
            },
            0: {
                title: "Introduction",
                morphs: {'Spawn.Movable': 1},
                file: '0',
                next: '1'
            },
            1: {
                title: "Intro!!",
                morphs: {'Spawn.Movable': 2},
                file: '0',
                next: '0'
            }
        }
    }
}

module.exports = media;
