import Phaser from 'phaser';
import { getRandomX, getRandomY } from '../utils';
import config from '../config';

export default class BorkText extends Phaser.Text {
  constructor({ gameState, height, width, x, y }) {
    super(gameState.game, getRandomX(x, width), getRandomY(y, height), '', {
      font: config.borkFont,
      fill: '#FFFFFF',
      smoothed: false,
      wordWrap: true,
      wordWrapWidth: 20,
      align: 'center',
    });
    this.message = 'bo';
    this.setText(this.message);

    this.finish = this.finish.bind(this);

    this.game.add.existing(this);

    this.counter = 0;
    this.isFinished = false;
  }

  update() {
    if (!this.isFinished) {
      if (this.counter >= 20) {
        this.message += 'o';
        this.counter = 0;
        this.setText(this.message);
      } else {
        this.counter += 1;
      }
    }
  }

  render() {
  }

  finish() {
    this.isFinished = true;
    this.message += 'rk';
    this.setText(this.message);
    this.game.time.events.add(1000, () => {
      this.game.world.remove(this);
    });
  }
}
