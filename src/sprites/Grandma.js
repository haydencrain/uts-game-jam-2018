import Phaser from 'phaser';

export default class extends Phaser.Sprite {
  constructor({ gameState, x, y, scaleX, scaleY, anchor }) {
    super(gameState.game, x, y, 'idle-grandma');
    this.scale.setTo(scaleX, scaleY);
    this.anchor.setTo(anchor); // set middle
    gameState.game.add.existing(this);
    this.gameState = gameState;


    this.animations.add('idle', [0, 1], 4, true);
    this.animations.add('spooked', [2, 3], 4, true);

    this.play('idle');
  }

  update() {
    if (this.gameState.globalData.isSpooked) {
      this.play('spooked');
    } else {
      this.play('idle');
    }
  }


  addOnClickListener(listener) {
    if (this.inputEnabled) this.events.onInputDown.add(listener, this);
    else throw Error('Image has not enabled input!');
  }
}
