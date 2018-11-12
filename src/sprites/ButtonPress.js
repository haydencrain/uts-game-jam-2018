import Phaser from 'phaser';

export default class extends Phaser.Sprite {
  constructor({ game, x, y, scaleX, scaleY, anchor, asset, inputEnabled = false }) {
    super(game, x, y, asset);
    this.scale.setTo(scaleX, scaleY);
    this.anchor.setTo(anchor); // set middle
    game.add.existing(this);

    this.press = this.press.bind(this);

    this.inputEnabled = inputEnabled;
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

  unpress() {
    this.play('active');
  }

  press() {
    this.play('pressed');
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
  }
}
