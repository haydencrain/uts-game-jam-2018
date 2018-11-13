import config from '../config';
import ButtonPress from '../sprites/ButtonPress';

export default class MenuView {
  constructor({ gameState, height, width, x, y }) {
    this.gameState = gameState;
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this.buttonX = this.x - 32;
    this.steps = 0;
    this.getMultiplier = this.getMultiplier.bind(this);

    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
  }

  create() {
    // add background
    this.background = this.gameState.add.tileSprite(this.x, this.y, this.width, this.height, 'menu_background');

    if (this.steps === 0) {
      this.skill1Button = new ButtonPress({
        gameState: this.gameState,
        x: this.buttonX,
        y: this.y + 40,
        scaleX: 1.7,
        scaleY: 1,
        anchor: 0,
        asset: 'button-press',
        inputEnabled: true,
        price: 25,
        increment: 1,
        message: 'Upgrade Bark (25 BP)',
      });
      this.skill1Button.addOnInputDownClickListener(() => {
        this.skill1Button.press();
      });
      this.skill1Button.addOnInputOutClickListener(() => {
        this.skill1Button.unpress();
        this.skill1Button.purchase();
      });

      this.skill2Button = new ButtonPress({
        gameState: this.gameState,
        x: this.buttonX,
        y: this.y + 80,
        scaleX: 1.7,
        scaleY: 1,
        anchor: 0,
        asset: 'button-press',
        inputEnabled: true,
        price: 100,
        increment: 3,
        message: 'Get Grandma (100 BP)',
      });
      this.skill2Button.addOnInputDownClickListener(() => {
        this.skill2Button.press();
      });
      this.skill2Button.addOnInputOutClickListener(() => {
        this.skill2Button.unpress();
        if (this.skill2Button.purchase()) {
          this.gameState.middlePanel.createGrandma();
        }
      });

      this.skill3Button = new ButtonPress({
        gameState: this.gameState,
        x: this.buttonX,
        y: this.y + 120,
        scaleX: 1.7,
        scaleY: 1,
        anchor: 0,
        asset: 'button-press',
        inputEnabled: true,
        price: 200,
        increment: 5,
        message: 'Get Grandpa (200 BP)',
      });
      this.skill3Button.addOnInputDownClickListener(() => {
        this.skill3Button.press();
      });
      this.skill3Button.addOnInputOutClickListener(() => {
        this.skill3Button.unpress();
        this.skill3Button.purchase();
      });

      this.skill4Button = new ButtonPress({
        gameState: this.gameState,
        x: this.buttonX,
        y: this.y + 160,
        scaleX: 1.7,
        scaleY: 1,
        anchor: 0,
        asset: 'button-press',
        inputEnabled: true,
        price: 500,
        increment: 20,
        message: 'Get Swole (500 BP)',
      });
      this.skill4Button.addOnInputDownClickListener(() => {
        this.skill4Button.press();
      });
      this.skill4Button.addOnInputOutClickListener(() => {
        this.skill4Button.unpress();
        this.skill1Button.purchase();
      });

      this.skill5Button = new ButtonPress({
        gameState: this.gameState,
        x: this.buttonX,
        y: this.y + 200,
        scaleX: 1.7,
        scaleY: 1,
        anchor: 0,
        asset: 'button-press',
        inputEnabled: true,
        price: 1000,
        increment: 50,
        message: 'Illuminati Status (1000 BP)',
      });
      this.skill5Button.addOnInputDownClickListener(() => {
        this.skill5Button.press();
      });
      this.skill5Button.addOnInputOutClickListener(() => {
        this.skill5Button.unpress();
        this.skill1Button.purchase();
      });
    }
    this.skills = this.gameState.add.text(this.buttonX, this.y + 300, 'Skills', {
      font: config.menuFont,
      fill: '#77BFA3',
      smoothed: false,
      wordWrap: true,
      wordWrapWidth: 20,
      align: 'center',
    });
    this.hires = this.gameState.add.text(this.buttonX, this.y + 340, 'Hires', {
      font: config.menuFont,
      fill: '#77BFA3',
      smoothed: false,
      wordWrap: true,
      wordWrapWidth: 20,
      align: 'center',
    });
    this.special = this.gameState.add.text(this.buttonX, this.y + 380, 'Special', {
      font: config.menuFont,
      fill: '#77BFA3',
      smoothed: false,
      wordWrap: true,
      wordWrapWidth: 20,
      align: 'center',
    });
    this.pointsPerClick = this.gameState.add.text(this.buttonX, this.y + 420, this.getMultiplier(), {
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
    this.pointsPerClick.setText(this.getMultiplier());
  }
}
