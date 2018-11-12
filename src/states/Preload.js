import Phaser from 'phaser';
// import { centerGameObjects } from '../utils';

export default class extends Phaser.State {
  init() { }

  preload() {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
    // centerGameObjects([this.loaderBg, this.loaderBar]);

    this.load.setPreloadSprite(this.loaderBar);

    // Load assets here
    this.load.spritesheet('corgi-swim', 'assets/images/corgi-swim.png', 700, 700, 12);
  }

  create() {
    this.state.start('Game');
  }
}
