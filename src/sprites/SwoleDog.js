import Phaser from 'phaser';

export default class extends Phaser.Sprite {
  constructor({ game, x, y, scaleX, scaleY, anchor, inputEnabled = false }) {
    super(game, x, y, 'swole-doggo');
    this.scale.setTo(scaleX, scaleY);
    this.anchor.setTo(anchor); // set middle
    game.add.existing(this);

    this.isIlluminati = false;

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

    this.animations.add('illuminati-idle', [4, 6, 7], 4, true);
    this.animations.add('illuminati-bork', [5], 6, false);
    this.animations.add('illuminati-unbork', [7, 6], 8, false);


    this.isBarking = false;
    this.sounds = ['hayden-bark', 'sheng-bark', 'andre-bark'];
    this.currentSound = '';
  }

  idle() {
    if (!this.isIlluminati) {
      this.play('swole-idle');
    } else {
      this.play('illuminati-idle');
    }
  }

  bark() {
    if (!this.isBarking) {
      this.isBarking = true;
      this.currentSound = this.game.add.audio(this.getRandomBarkSound());
      this.currentSound.play();
      if (!this.isIlluminati) {
        this.play('swole-bork');
      } else {
        this.play('illuminati-bork');
      }
      this.currentSound.onStop.add(() => {
        this.isBarking = false;
      }, this);
    } else if (!this.isIlluminati) {
      this.play('swole-bork');
    } else {
      this.play('illuminati-bork');
    }
  }

  unbark() {
    if (!this.isIlluminati) {
      this.play('swole-unbork');
    } else {
      this.play('illuminati-unbork');
    }
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
