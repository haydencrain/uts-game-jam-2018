import Phaser from 'phaser';

export default class extends Phaser.Sprite {
  constructor({ game, x, y, scaleX, scaleY, anchor, asset }) {
    super(game, x, y, asset);
    this.scale.setTo(scaleX, scaleY);
    this.anchor.setTo(anchor); // set middle
    game.add.existing(this);

    this.swim = this.swim.bind(this);
  }

  swim() {
    this.animations.add('play', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 12, true);
    this.play('play');
  }

  update() {
    this.angle += 0;
  }
}
