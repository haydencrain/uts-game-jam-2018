import config from '../config';
import RunningCorgi from '../sprites/RunningCorgi';


export default class DogView {
  constructor({ gameState, height, width, x, y }) {
    this.gameState = gameState;
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;

    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.getScoreString = this.getScoreString.bind(this);
    this.getCenterX = this.getCenterX.bind(this);
    this.getCenterY = this.getCenterY.bind(this);
  }

  create() {
    // add background
    this.background = this.gameState.add.tileSprite(this.y, this.x, this.width, this.height, 'doggy_background');

    this.score = this.gameState.add.text(this.getCenterX(), this.y + 60, this.getScoreString(), {
      font: config.smallerFont,
      fill: '#77BFA3',
      smoothed: false,
    });
    this.score.anchor.setTo(0.5);


    this.dog = new RunningCorgi({
      game: this.gameState.game,
      x: this.getCenterX(),
      y: this.getCenterY() + 35,
      scaleX: 2,
      scaleY: 2,
      anchor: 0.5,
      asset: 'running-right-corgi',
      inputEnabled: true,
    });
    this.dog.addOnClickListener(() => this.incrementBorkpower());
    this.dog.run();
  }

  update() {
    this.score.setText(this.getScoreString());
  }

  incrementBorkpower() {
    this.gameState.globalData.score += this.gameState.globalData.multiplier;
  }

  getScoreString() {
    return `${this.gameState.globalData.score} borkpower`;
  }

  getCenterX() {
    return (this.width - this.x) / 2;
  }

  getCenterY() {
    return (this.height - this.y) / 2;
  }
}
