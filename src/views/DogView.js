import config from '../config';
// import RunningCorgi from '../sprites/RunningCorgi';
import MainDog from '../sprites/MainDog';
import SwoleDog from '../sprites/SwoleDog';
import BorkText from '../components/BorkText';

export default class DogView {
  constructor({ gameState, height, width, x, y }) {
    this.gameState = gameState;
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;

    this.isBarking = false;

    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
    this.getScoreString = this.getScoreString.bind(this);
    this.getCenterX = this.getCenterX.bind(this);
    this.getCenterY = this.getCenterY.bind(this);
    this.createMainDog = this.createMainDog.bind(this);
    this.createSwoleDog = this.createSwoleDog.bind(this);
  }

  create() {
    // add background
    this.background = this.gameState.add.tileSprite(this.x, this.y, this.width, this.height, 'doggy_background');

    this.score = this.gameState.add.text(this.getCenterX() - 10, this.height - 160, this.getScoreString(), {
      font: config.smallerFont,
      fill: '#77BFA3',
      smoothed: false,
      wordWrap: true,
      wordWrapWidth: 20,
      align: 'center',
    });
    this.score.anchor.setTo(0.5);

    this.createMainDog();
    // this.createSwoleDog();
  }

  update() {
    if (!this.isBarking) this.dog.idle();
  }

  render() {
    this.score.setText(this.getScoreString());
  }

  createMainDog() {
    this.dog = new MainDog({
      game: this.gameState.game,
      x: this.getCenterX(),
      y: this.getCenterY() + 10,
      scaleX: 2,
      scaleY: 2,
      anchor: 0.5,
      inputEnabled: true,
    });

    this.dog.addOnMouseDownListener(() => {
      this.isBarking = true;
      this.dog.bark();
      this.borkText = new BorkText({
        gameState: this.gameState,
        x: this.getCenterX() + 60,
        y: this.getCenterY() - 55,
        width: 100,
        height: 100,
      });
    });

    this.dog.addOnMouseUpListener(() => {
      this.borkText.finish();
      this.dog.unbark();
      this.incrementBorkpower();
      this.isBarking = false;
    });

    // initial animation is idle
    this.dog.idle();
  }

  createSwoleDog() {
    this.dog = new SwoleDog({
      game: this.gameState.game,
      x: this.getCenterX(),
      y: this.getCenterY() - 83,
      scaleX: 3,
      scaleY: 3,
      anchor: 0.5,
      inputEnabled: true,
    });

    this.dog.addOnMouseDownListener(() => {
      this.isBarking = true;
      this.dog.bark();
      this.borkText = new BorkText({
        gameState: this.gameState,
        x: this.getCenterX() + 60,
        y: this.getCenterY() - 150,
        width: 100,
        height: 100,
      });
    });

    this.dog.addOnMouseUpListener(() => {
      this.borkText.finish();
      this.dog.unbark();
      this.incrementBorkpower();
      this.isBarking = false;
    });

    // initial animation is idle
    this.dog.idle();
  }

  incrementBorkpower() {
    this.gameState.globalData.score += this.gameState.globalData.multiplier;
  }

  getScoreString() {
    return `${this.gameState.globalData.score} borkpower`;
  }

  getCenterX() {
    return (this.width / 2) + this.x;
  }

  getCenterY() {
    return (this.height / 2) + this.y;
  }
}
