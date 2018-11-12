import config from '../config';

export default class DogView {
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
    const scoreText = this.gameState.globalData.score.toString();
    this.score = this.state.add.text(this.gameState.world.centerX, 80, scoreText, {
      font: config.defaultFont,
      fill: '#77BFA3',
      smoothed: false,
    });
    this.score.anchor.setTo(0.5);
  }

  update() {
    this.gameState.globalData.score += 1;
    this.score.setText(this.gameState.globalData.score);
  }
}
