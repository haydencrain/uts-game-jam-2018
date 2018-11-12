/* globals __DEV__ */
import Phaser from 'phaser';
import CorgiSwim from '../sprites/CorgiSwim';
import lang from '../lang';
import config from '../config';


export default class extends Phaser.State {
  init() { }

  preload() { }

  create() {
    const bannerText = lang.text('welcome');
    const banner = this.add.text(this.world.centerX, 80, bannerText, {
      font: config.defaultFont,
      fill: '#77BFA3',
      smoothed: false,
    });
    banner.anchor.setTo(0.5);

    this.corgiSwim = new CorgiSwim({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY,
      scaleX: 0.5,
      scaleY: 0.5,
      anchor: 0.5,
      asset: 'corgi-swim',
      inputEnabled: true,
    });
    this.corgiSwim.swim();
    this.corgiSwim.addOnClickListener(() => this.state.start('Game'));
  }

  render() {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.corgiSwim, 32, 32);
    }
  }
}
