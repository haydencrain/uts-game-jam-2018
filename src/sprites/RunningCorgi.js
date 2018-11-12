import Phaser from 'phaser';

export default class extends Phaser.Sprite {
  constructor({ game, x, y, scaleX, scaleY, anchor, asset, inputEnabled = false }) {
    super(game, x, y, asset);
    this.scale.setTo(scaleX, scaleY);
    this.anchor.setTo(anchor); // set middle
    game.add.existing(this);

    this.run = this.run.bind(this);

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

  run() {
    this.animations.add('run', [0, 1, 2, 3, 4, 5, 6, 7], 16, true);
    this.play('run');
  }

  addOnClickListener(listener) {
    if (this.inputEnabled) this.events.onInputDown.add(listener, this);
    else throw Error('Image has not enabled input!');
  }
}
