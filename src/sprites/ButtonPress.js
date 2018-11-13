import Phaser from 'phaser';
import config from '../config';


export default class extends Phaser.Sprite {
  constructor({ gameState, x, y, scaleX, scaleY, anchor, asset, inputEnabled = false, price, increment, message }) {
    super(gameState.game, x, y, asset);
    this.scale.setTo(scaleX, scaleY);
    this.anchor.setTo(anchor); // set middle
    this.game.add.existing(this);
    this.gameState = gameState;
    this.x = x;
    this.y = y;
    this.isActive = false;
    this.isHeld = false;
    this.increment = increment;
    this.message = message;

    this.currLvl = 1;

    this.press = this.press.bind(this);
    this.purchase = this.purchase.bind(this);
    this.getTextMessage = this.getTextMessage.bind(this);
    this.price = price;
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
    this.gameState.globalData.score < this.price ? this.isActive = false : this.isActive = true;


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
    if (this.gameState.globalData.score >= this.price) {
      this.gameState.globalData.multiplier += this.increment;
      this.gameState.globalData.score -= this.price;
      this.currLvl += 1;
      return true;
    }
    return false;
  }

  getTextMessage() {
    return `LVL${this.currLvl} ${this.message}`;
  }
}
