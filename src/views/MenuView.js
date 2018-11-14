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

    console.log(this.gameState.globalData);
    this.skill1Button = new ButtonPress({
      message: 'Upgrade Bark',
      gameState: this.gameState,
      inputEnabled: true,
      x: this.buttonX,
      y: this.y + 150,
      scaleX: 1.7,
      scaleY: 1,
      anchor: 0,
      dataName: 'borkButtonData',
    });
    this.skill1Button.addOnInputDownClickListener(() => {
      this.skill1Button.press();
    });
    this.skill1Button.addOnInputOutClickListener(() => {
      this.skill1Button.unpress();
      this.skill1Button.purchase();
    });

    this.skill2Button = new ButtonPress({
      message: 'Get Grandma',
      gameState: this.gameState,
      x: this.buttonX,
      y: this.y + 250,
      scaleX: 1.7,
      scaleY: 1,
      anchor: 0,
      inputEnabled: true,
      dataName: 'grandmaButtonData',
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
      message: 'Get Grandpa',
      gameState: this.gameState,
      x: this.buttonX,
      y: this.y + 350,
      scaleX: 1.7,
      scaleY: 1,
      anchor: 0,
      inputEnabled: true,
      dataName: 'grandpaButtonData',
    });
    this.skill3Button.addOnInputDownClickListener(() => {
      this.skill3Button.press();
    });
    this.skill3Button.addOnInputOutClickListener(() => {
      this.skill3Button.unpress();
      if (this.skill3Button.purchase()) {
        this.gameState.middlePanel.createGrandpa();
      }
    });

    this.skill4Button = new ButtonPress({
      message: 'Get Swole',
      gameState: this.gameState,
      x: this.buttonX,
      y: this.y + 450,
      scaleX: 1.7,
      scaleY: 1,
      anchor: 0,
      inputEnabled: true,
      dataName: 'swoleButtonData',
    });
    this.skill4Button.addOnInputDownClickListener(() => {
      this.skill4Button.press();
    });
    this.skill4Button.addOnInputOutClickListener(() => {
      this.skill4Button.unpress();
      if (this.skill4Button.purchase() && !this.gameState.leftPanel.isSwole) {
        this.gameState.leftPanel.createSwoleDog();
      }
    });

    this.skill5Button = new ButtonPress({
      message: 'Illuminati Status',
      gameState: this.gameState,
      x: this.buttonX,
      y: this.y + 550,
      scaleX: 1.7,
      scaleY: 1,
      anchor: 0,
      inputEnabled: true,
      dataName: 'illuminatiButtonData',
    });
    this.skill5Button.addOnInputDownClickListener(() => {
      this.skill5Button.press();
    });
    this.skill5Button.addOnInputOutClickListener(() => {
      this.skill5Button.unpress();
      if (this.skill5Button.purchase()) {
        this.gameState.leftPanel.createIlluminatiDog();
      }
    });
    this.skills = this.gameState.add.text(this.buttonX + 150, this.y + 110, 'Upgrades', {
      font: config.menuFont,
      fill: '#77BFA3',
      smoothed: false,
      wordWrap: true,
      wordWrapWidth: 20,
      align: 'center',
    });
    this.pointsPerClick = this.gameState.add.text(this.buttonX + 100, this.y + 60, this.getMultiplier(), {
      font: config.borkFont,
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
