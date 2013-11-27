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
            },
            door: {
                file: 'door',
                tilewidth: 22,
                tileheight: 42
            },
            button: {
                file: 'button',
                tilewidth: 22,
                tileheight: 21
            },
            laser: {
                file: 'laser',
                tilewidth: 17,
                tileheight: 16
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
                title: "Knowing your keys",
                morphs: {'Spawn.Immovable': 1},
                file: '0',
                next: '1'
            },
            1: {
                title: "Building up",
                morphs: {'Spawn.Immovable': 2},
                file: '1',
                next: '2'
            },
            2: {
                title: "Know your jump",
                morphs: {'Spawn.Immovable': 1},
                file: '2',
                next: '3'
            },
            3: {
                title: "Efficient building",
                morphs: {'Spawn.Immovable': 3},
                file: '3',
                next: '4'
            },
            4: {
                title: "Introducing death",
                morphs: {'Spawn.Immovable': 2},
                file: '4',
                next: '5'
            },
            5: {
                title: "",
                morphs: {'Spawn.Immovable': 2},
                file: '5',
                next: '6'
            }
        }
    }
}

module.exports = media;
