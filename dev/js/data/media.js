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
                tilewidth: 17,
                tileheight: 16
            },
            laser: {
                file: 'laser',
                tilewidth: 17,
                tileheight: 16
            },
            platform: {
                file: 'platform',
                tilewidth: 38,
                tileheight: 14
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
    sfx: {
    //     success0: {
    //         file: 'success.wav'
    //     },
    //     success1: {
    //         file: 'tada.wav'
    //     },
        pabam: {
            file: 'success.mp3'
        },
        click: {
            file: 'ui_click.mP3'
        },
        correct: {
            file: 'correct.mp3',
            volume: 10
        },
        wrong: {
            file: 'wrong.mp3',
            volume: 10
        },
        on: {
            file: 'on.wav'
        },
        off: {
            file: 'off.wav'
        },
        transform: {
            file: 'transform.wav'
        },
        fall: {
            file: 'fall.wav',
            volume: 10
        },
        jump: {
            file: 'jump.wav',
            volume: 10
        },
        sparkle: {
            file: 'sparkle.mp3'
        },
        fail: {
            file: 'fail.wav'
        }
    },
    data: {
        levels: {
            intro: {
                file: 'first'
            },
            0: {
                title: "Know your keys",
                morphs: {
                    'Spawn.Immovable': 1
                },
                file: '0',
                next: '1'
            },
            1: {
                title: "Building up",
                morphs: {
                    'Spawn.Immovable': 2
                },
                file: '1',
                next: '2'
            },
            2: {
                title: "Know your jump",
                morphs: {
                    'Spawn.Immovable': 1
                },
                file: '2',
                next: '3'
            },
            3: {
                title: "Efficient building",
                morphs: {
                    'Spawn.Immovable': 3
                },
                file: '3',
                next: '4'
            },
            4: {
                title: "Introducing death",
                morphs: {
                    'Spawn.Immovable': 2
                },
                file: '4',
                next: '5'
            },
            5: {
                title: "New transform",
                morphs: {
                    'Spawn.Movable': 1,
                    'Spawn.Immovable': 2
                },
                file: '5',
                next: '6'
            },
            6: {
                title: "Buttons.. and doors",
                morphs: {
                    'Spawn.Movable': 2
                },
                file: '6',
                next: '7'
            },
            7: {
                title: "The way around",
                morphs: {
                    'Spawn.Movable': 1,
                    'Spawn.Immovable': 2
                },
                file: '7',
                next: '8'
            },
            9: {
                title: "",
                morphs: {
                    'Spawn.Movable': 1,
                    'Spawn.Immovable': 2
                },
                file: '9',
                next: '8'
            },
            t_0: {
                title: "Lasers are dangerous",
                morphs: {
                    'Spawn.Movable': 2,
                    'Spawn.Floater': 1
                },
                file: 't_0',
                next: '8'
            }
        }
    }
}

module.exports = media;
