import Phaser from 'phaser';

export default class extends Phaser.Sprite {
  constructor({ game, x, y, scaleX, scaleY, anchor, inputEnabled = false }) {
    super(game, x, y, 'sitting-doggo-right');
    this.scale.setTo(scaleX, scaleY);
    this.anchor.setTo(anchor); // set middle
    game.add.existing(this);

    this.idle = this.idle.bind(this);
    this.bark = this.bark.bind(this);
    this.addOnMouseDownListener = this.addOnMouseDownListener.bind(this);

    this.inputEnabled = inputEnabled;
    if (this.inputEnabled) {
      this.events.onInputOver.add(() => {
        this.game.canvas.style.cursor = 'pointer';
      }, this);

      this.events.onInputOut.add(() => {
        this.game.canvas.style.cursor = 'default';
      }, this);
    }
  }

  idle() {
    this.animations.add('idle', [0, 1], 2, true);
    this.play('idle');
  }

  bark() {

  }

  addOnMouseDownListener(listener) {
    if (this.inputEnabled) this.events.onInputDown.add(listener, this);
    else throw Error('Image has not enabled input!');
  }
}
