/* globals __DEV__ */
import Phaser from 'phaser';
import RunningCorgi from '../sprites/RunningCorgi';
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

    this.runningDog = new RunningCorgi({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY,
      scaleX: 2,
      scaleY: 2,
      anchor: 0.5,
      inputEnabled: true,
    });
    this.runningDog.run();
    this.runningDog.addOnClickListener(() => this.state.start('Game'));
  }

  render() {
  }
}
