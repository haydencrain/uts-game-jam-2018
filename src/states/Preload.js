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

    // sprites
    this.load.spritesheet('corgi-swim', 'assets/sprite-models/corgi-swim/corgi-swim.png', 700, 700, 12);
    this.load.spritesheet('running-left-corgi', 'assets/sprite-models/running-left-corgi/running-left-corgi-spritesheet.png', 50, 40, 8);
    this.load.spritesheet('running-right-corgi', 'assets/sprite-models/running-right-corgi/running-right-corgi-spritesheet.png', 50, 40, 8);
    this.load.spritesheet('button-press', 'assets/sprite-models/button-press/button-press.png', 240, 96, 3);
    this.load.spritesheet('main-doggo-right', 'assets/sprite-models/main-doggo-right/main-doggo-right.png', 60, 50, 4);
    this.load.spritesheet('grandma', 'assets/sprite-models/grandma/grandma_placeholder.png', 200, 200, 5);
  }

  create() {
    this.state.start('MainMenu');
  }
}
