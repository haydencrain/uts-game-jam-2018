import Grandma from '../sprites/Grandma';

export default class GrandmaView {
  constructor({ gameState, height, width, x, y }) {
    this.gameState = gameState;
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;

    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.getCenterX = this.getCenterX.bind(this);
    this.getCenterY = this.getCenterY.bind(this);
  }

  create() {
    // add background
    this.background = this.gameState.add.tileSprite(this.x, this.y, this.width, this.height, 'street_background');

    this.grandma = new Grandma({
      game: this.gameState.game,
      x: this.getCenterX(),
      y: this.getCenterY() + 10,
      scaleX: 2,
      scaleY: 2,
      anchor: 0.5,
    });
  }

  update() {

  }

  getCenterX() {
    return (this.width / 2) + this.x;
  }

  getCenterY() {
    return (this.height / 2) + this.y;
  }
}
