import Phaser from 'phaser';
import config from '../config';


export default class extends Phaser.Sprite {
  constructor({ gameState, x, y, scaleX, scaleY, anchor, inputEnabled = false, message, dataName }) {
    super(gameState.game, x, y, 'button-press');
    this.scale.setTo(scaleX, scaleY);
    this.anchor.setTo(anchor); // set middle
    this.game.add.existing(this);
    this.gameState = gameState;
    this.x = x;
    this.y = y;
    this.isActive = false;
    this.isHeld = false;
    this.message = message;
    this.dataName = dataName;

    this.priceMultiplier = [25, 50, 500, 2000, 10000];

    this.press = this.press.bind(this);
    this.purchase = this.purchase.bind(this);
    this.getTextMessage = this.getTextMessage.bind(this);
    this.inputEnabled = inputEnabled;

    this.text = this.gameState.add.text(this.x + 50, this.y + 30, this.getTextMessage(), {
      font: config.submenuFont,
      fill: '#77BFA3',
      smoothed: false,
      align: 'center',
    });

    if (this.inputEnabled) {
      this.events.onInputOver.add(() => {
        this.game.canvas.style.cursor = 'pointer';
      }, this);

      this.events.onInputOut.add(() => {
        this.game.canvas.style.cursor = 'default';
      }, this);
    }
    this.animations.add('active', [0], false);
    this.animations.add('pressed', [1], false);
    this.animations.add('inactive', [2], false);
  }

  create() {

  }

  unpress() {
    if (this.isActive) {
      this.text.x -= 2;
      this.text.y -= 2;
    }
    this.isHeld = false;
    this.isActive = true;
  }

  press() {
    if (this.isActive) {
      this.isHeld = true;
      this.text.x += 2;
      this.text.y += 2;
    }
  }

  inactive() {
    this.isActive = false;
    this.isHeld = false;
  }


  addOnInputDownClickListener(listener) {
    if (this.inputEnabled) this.events.onInputDown.add(listener, this);
    else throw Error('Image has not enabled input!');
  }

  addOnInputOutClickListener(listener) {
    if (this.inputEnabled) this.events.onInputUp.add(listener, this);
    else throw Error('Image has not enabled input!');
  }

  update() {
    this.gameState.globalData.score < this.gameState.globalData[this.dataName].price ? this.isActive = false : this.isActive = true;


    if (this.isActive && !this.isHeld) {
      this.play('active');
    } else if (this.isHeld) {
      this.play('pressed');
    } else {
      this.play('inactive');
    }
    this.text.setText(this.getTextMessage());
  }

  purchase() {
    if (this.gameState.globalData.score >= this.gameState.globalData[this.dataName].price) {
      this.gameState.globalData.multiplier += this.gameState.globalData[this.dataName].increment;
      this.gameState.globalData.score -= this.gameState.globalData[this.dataName].price;
      this.gameState.globalData[this.dataName].price += this.priceMultiplier[this.gameState.globalData[this.dataName].value];
      this.gameState.globalData[this.dataName].level += 1;
      return true;
    }
    return false;
  }

  getTextMessage() {
    return `LVL${this.gameState.globalData[this.dataName].level} ${this.message} (${this.gameState.globalData[this.dataName].price} BP)`;
  }
}
