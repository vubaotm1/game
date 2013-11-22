var media = {
    img: {
        sprites: {
            player: {
                file: 'player',
                tilesize: 20
            }
        },
        debug: {
            placeholder: {
                file: 'tileset_16_16.jpg',
                tilesize: 16
            }
        },
        tilesets: {
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
            first: {
                type: 'level',
                file: 'first'
            }
        }
    }
}

module.exports = media;
