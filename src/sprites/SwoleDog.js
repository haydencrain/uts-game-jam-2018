import Phaser from 'phaser';

export default class extends Phaser.Sprite {
  constructor({ game, x, y, scaleX, scaleY, anchor, inputEnabled = false }) {
    super(game, x, y, 'swole-doggo');
    this.scale.setTo(scaleX, scaleY);
    this.anchor.setTo(anchor); // set middle
    game.add.existing(this);

    this.idle = this.idle.bind(this);
    this.bark = this.bark.bind(this);
    this.unbark = this.unbark.bind(this);
    this.addOnMouseDownListener = this.addOnMouseDownListener.bind(this);
    this.getRandomBarkSound = this.getRandomBarkSound.bind(this);

    this.inputEnabled = inputEnabled;
    if (this.inputEnabled) {
      this.events.onInputOver.add(() => {
        this.game.canvas.style.cursor = 'pointer';
      }, this);

      this.events.onInputOut.add(() => {
        this.game.canvas.style.cursor = 'default';
      }, this);
    }

    this.animations.add('swole-idle', [0, 2, 3], 4, true);
    this.animations.add('swole-bork', [1], 6, false);
    this.animations.add('swole-unbork', [3, 2], 8, false);


    this.isBarking = false;
    this.sounds = ['dog-arf', 'big-bark'];
    this.currentSound = '';
  }

  idle() {
    this.play('swole-idle');
  }

  bark() {
    if (!this.isBarking) {
      this.isBarking = true;
      this.currentSound = this.game.add.audio(this.getRandomBarkSound());
      this.currentSound.play();
      this.play('swole-bork');
      this.currentSound.onStop.add(() => {
        this.isBarking = false;
      }, this);
    } else {
      this.play('swole-bork');
    }
  }

  unbark() {
    this.play('swole-ubork');
  }

  addOnMouseDownListener(listener) {
    if (this.inputEnabled) this.events.onInputDown.add(listener, this);
    else throw Error('Image has not enabled input!');
  }

  addOnMouseUpListener(listener) {
    if (this.inputEnabled) this.events.onInputUp.add(listener, this);
    else throw Error('Image has not enabled input!');
  }

  getRandomBarkSound() {
    return this.sounds[Math.floor(Math.random() * this.sounds.length)];
  }
}
