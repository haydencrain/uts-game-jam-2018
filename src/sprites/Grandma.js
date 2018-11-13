import Phaser from 'phaser';

export default class extends Phaser.Sprite {
  constructor({ game, x, y, scaleX, scaleY, anchor }) {
    super(game, x, y, 'idle-grandma');
    this.scale.setTo(scaleX, scaleY);
    this.anchor.setTo(anchor); // set middle
    game.add.existing(this);


    this.animations.add('idle', [0, 1], 4, true);

    this.play('idle');
  }


  addOnClickListener(listener) {
    if (this.inputEnabled) this.events.onInputDown.add(listener, this);
    else throw Error('Image has not enabled input!');
  }
}
