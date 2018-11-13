import Phaser from 'phaser';
import { centerGameObjects } from '../utils';

export default class extends Phaser.State {
  init() { }

  preload() {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
    centerGameObjects([this.loaderBg, this.loaderBar]);
    this.load.setPreloadSprite(this.loaderBar);

    // Load assets here

    // backgrounds
    this.load.image('doggy_background', 'assets/background/doggo_background_banner_3x.png');
    this.load.image('street_background', 'assets/background/street_background_3x.png');
    this.load.image('menu_background', 'assets/background/menu_background_3x.png');

    // audio
    this.load.audio('dog-arf', ['assets/audio/barks/dog-arf/dog-arf.mp3', 'assets/audio/barks/dog-arf/dog-arf.ogg']);
    this.load.audio('big-bark', ['assets/audio/barks/big-bark/big-bark.mp3', 'assets/audio/barks/big-bark/big-bark.ogg']);
    this.load.audio('theme-song', ['assets/audio/theme/theme-song.mp3', 'assets/audio/theme/theme-song.ogg']);

    // sprites
    this.load.spritesheet('running-left-corgi', 'assets/sprite-models/running-left-corgi/running-left-corgi-spritesheet.png', 50, 40, 8);
    this.load.spritesheet('running-right-corgi', 'assets/sprite-models/running-right-corgi/running-right-corgi-spritesheet.png', 50, 40, 8);
    this.load.spritesheet('button-press', 'assets/sprite-models/button-press/button-press.png', 240, 96, 3);
    this.load.spritesheet('main-doggo-right', 'assets/sprite-models/main-doggo-right/main-doggo-right.png', 60, 50, 4);
    this.load.spritesheet('swole-doggo', 'assets/sprite-models/swole-doggo/swole-doggo.png', 50, 100, 8);
    this.load.spritesheet('idle-grandma', 'assets/sprite-models/idle-grandma/idle-grandma.png', 40, 80, 2);
    this.load.spritesheet('idle-grandpa', 'assets/sprite-models/idle-grandpa/idle-grandpa.png', 50, 125, 2);
  }

  create() {
    this.state.start('MainMenu');
  }
}
