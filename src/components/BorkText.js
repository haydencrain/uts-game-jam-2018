import Phaser from 'phaser';
import { getRandomNumber } from '../utils';


export default class BorkText {
  constructor({ gameState, height, width, x, y }) {
    this.gameState = gameState;
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;

    this.text = 'bo';

    this.getRandomX = this.getRandomX.bind(this);
    this.getRandomY = this.getRandomY.bind(this);
  }


  getRandomX() {
    return getRandomNumber(this.x, (this.x + this.width));
  }

  getRandomY() {
    return getRandomNumber(this.y, (this.y + this.height));
  }
}
