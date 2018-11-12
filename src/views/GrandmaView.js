
export default class GrandmaView {
  constructor({ gameState, height, width, x, y }) {
    this.gameState = gameState;
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;

    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
  }

  create() {
    // add background
    this.background = this.gameState.add.tileSprite(this.x, this.y, this.width, this.height, 'street_background');
  }

  update() {

  }
}
