/* globals __DEV__ */
import Phaser from 'phaser';
import CorgiSwim from '../sprites/CorgiSwim';
import lang from '../lang';

export default class extends Phaser.State {
  init() { }

  preload() { }

  create() {
    const bannerText = lang.text('welcome');
    const banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText, {
      font: '40px Bangers',
      fill: '#77BFA3',
      smoothed: false,
    });

    banner.padding.set(10, 16);
    banner.anchor.setTo(0.5);

    this.corgiSwim = new CorgiSwim({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY,
      scaleX: 0.5,
      scaleY: 0.5,
      anchor: 0.5,
      asset: 'corgi-swim',
    });

    this.corgiSwim.swim();
  }

  render() {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.corgiSwim, 32, 32);
    }
  }
}
