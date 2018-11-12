
export default class GrandmaView {
  constructor({ gameState, height, width, x, y }) {
    this.state = gameState;
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;

    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
  }

  create() {

  }

  update() {

  }
}
