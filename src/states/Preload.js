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
    this.load.image('doggy_background', 'assets/background/doggy_background_3x.png');

    // sprites
    this.load.spritesheet('corgi-swim', 'assets/sprite-models/corgi-swim/corgi-swim.png', 700, 700, 12);
    this.load.spritesheet('running-left-corgi', 'assets/sprite-models/running-left-corgi/running-left-corgi-spritesheet.png', 50, 40, 8);
    this.load.spritesheet('running-right-corgi', 'assets/sprite-models/running-right-corgi/running-right-corgi-spritesheet.png', 50, 40, 8);
  }

  create() {
    this.state.start('MainMenu');
  }
}
