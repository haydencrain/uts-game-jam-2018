import Grandma from '../sprites/Grandma';
import { getRandomX } from '../utils';
import RunningCorgi from '../sprites/RunningCorgi';


export default class StreetView {
  constructor({ gameState, height, width, x, y }) {
    this.gameState = gameState;
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this.grandmas = [];

    this.floorY = height - 30;

    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.getCenterX = this.getCenterX.bind(this);
    this.getCenterY = this.getCenterY.bind(this);
    this.createGrandma = this.createGrandma.bind(this);
  }

  create() {
    // add background
    this.background = this.gameState.add.tileSprite(this.x, this.y, this.width, this.height, 'street_background');

    this.grandma = this.createGrandma();
  }

  update() {

  }

  getCenterX() {
    return (this.width / 2) + this.x;
  }

  getCenterY() {
    return (this.height / 2) + this.y;
  }

  createGrandma() {
    return new Grandma({
      game: this.gameState.game,
      x: getRandomX(this.x + 150, 300),
      y: this.floorY,
      scaleX: 2,
      scaleY: 2,
      anchor: 1,
    });
  }
}
