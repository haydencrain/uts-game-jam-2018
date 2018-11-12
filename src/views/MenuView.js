import config from '../config';
import ButtonPress from '../sprites/ButtonPress';

export default class MenuView {
  constructor({ gameState, height, width, x, y }) {
    this.gameState = gameState;
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this.steps = 0;
    this.getMultiplier = this.getMultiplier.bind(this);

    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
  }

  create() {
    this.skill1Button = new ButtonPress({
      gameState: this.gameState,
      x: this.width - 30,
      y: this.height + 140,
      scaleX: 1.7,
      scaleY: 1,
      anchor: 0,
      asset: 'button-press',
      inputEnabled: true,
      price: 25,
      increment: 1,
      message: 'Level 1: Upgrade Bark (25 BP)',
    });
    this.skill1Button.addOnInputDownClickListener(() => {
      this.skill1Button.press();
      this.skill1Button.purchase();
    });
    this.skill1Button.addOnInputOutClickListener(() => this.skill1Button.unpress());

    this.skill2Button = new ButtonPress({
      gameState: this.gameState,
      x: this.width - 30,
      y: this.height + 240,
      scaleX: 1.7,
      scaleY: 1,
      anchor: 0,
      asset: 'button-press',
      inputEnabled: true,
      price: 100,
      increment: 3,
      message: 'Level 2: Learn Insults (100 BP)',
    });
    this.skill2Button.addOnInputDownClickListener(() => {
      this.skill2Button.press();
      this.skill2Button.purchase();
    });
    this.skill2Button.addOnInputOutClickListener(() => this.skill2Button.unpress());

    this.skill3Button = new ButtonPress({
      gameState: this.gameState,
      x: this.width - 30,
      y: this.height + 340,
      scaleX: 1.7,
      scaleY: 1,
      anchor: 0,
      asset: 'button-press',
      inputEnabled: true,
      price: 200,
      increment: 5,
      message: 'Level 3: Get Swole (200 BP)',
    });
    this.skill3Button.addOnInputDownClickListener(() => {
      this.skill3Button.press();
      this.skill3Button.purchase();
    });
    this.skill3Button.addOnInputOutClickListener(() => this.skill3Button.unpress());

    this.skill4Button = new ButtonPress({
      gameState: this.gameState,
      x: this.width - 30,
      y: this.height + 440,
      scaleX: 1.7,
      scaleY: 1,
      anchor: 0,
      asset: 'button-press',
      inputEnabled: true,
      price: 500,
      increment: 20,
      message: 'Level 4: Learn Kungfu (500 BP)',
    });
    this.skill4Button.addOnInputDownClickListener(() => {
      this.skill4Button.press();
      this.skill4Button.purchase();
    });
    this.skill4Button.addOnInputOutClickListener(() => this.skill4Button.unpress());

    this.skill5Button = new ButtonPress({
      gameState: this.gameState,
      x: this.width - 30,
      y: this.height + 540,
      scaleX: 1.7,
      scaleY: 1,
      anchor: 0,
      asset: 'button-press',
      inputEnabled: true,
      price: 1000,
      increment: 50,
      message: 'Level 5: Break Knees (1000 BP)',
    });
    this.skill5Button.addOnInputDownClickListener(() => {
      this.skill5Button.press();
      this.skill5Button.purchase();
    });
    this.skill5Button.addOnInputOutClickListener(() => this.skill5Button.unpress());

    this.skills = this.gameState.add.text(this.width + 10, this.height + 100, 'Skills', {
      font: config.menuFont,
      fill: '#77BFA3',
      smoothed: false,
      wordWrap: true,
      wordWrapWidth: 20,
      align: 'center',
    });
    this.hires = this.gameState.add.text(this.width + 150, this.height + 100, 'Hires', {
      font: config.menuFont,
      fill: '#77BFA3',
      smoothed: false,
      wordWrap: true,
      wordWrapWidth: 20,
      align: 'center',
    });
    this.special = this.gameState.add.text(this.width + 270, this.height + 100, 'Special', {
      font: config.menuFont,
      fill: '#77BFA3',
      smoothed: false,
      wordWrap: true,
      wordWrapWidth: 20,
      align: 'center',
    });
    this.pointsPerClick = this.gameState.add.text(this.width + 30, this.height + 40, this.getMultiplier(), {
      font: config.menuFont,
      fill: '#77BFA3',
      smoothed: false,
      align: 'center',
    });
  }

  getMultiplier() {
    return `Points Per Click: ${this.gameState.globalData.multiplier} BP`;
  }

  update() {
  }
}
