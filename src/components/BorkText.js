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

    this.gameState = gameState;

    this.finish = this.finish.bind(this);

    this.game.add.existing(this);

    this.counter = 0;
    this.isFinished = false;

    this.aboutToSpook = false;
  }

  update() {
    if (!this.isFinished) {
      if (this.counter >= 20) {
        this.aboutToSpook = true;
        this.message += 'o';
        this.counter = 0;
        this.setText(this.message);
      } else {
        this.counter += 1;
      }
    }
  }

  finish() {
    if (this.aboutToSpook) {
      this.gameState.globalData.isSpooked = true;
    }
    this.isFinished = true;
    this.message += 'rk';
    this.setText(this.message);
    this.game.time.events.add(1000, () => {
      this.gameState.globalData.isSpooked = false;
      this.aboutToSpook = false;
      this.game.world.remove(this);
    });
  }
}
