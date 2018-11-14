import Phaser from 'phaser';
import DogView from '../views/DogView';
import StreetView from '../views/StreetView';
import MenuView from '../views/MenuView';

export default class extends Phaser.State {
  init() {
    this.globalData = {
      score: 0,
      multiplier: 1,
      isSpooked: false,
      isSwole: false,
      isIlluminati: false,
      borkButtonData: {
        level: 1,
        price: 25,
        increment: 1,
        value: 0,
      },
      grandmaButtonData: {
        level: 0,
        price: 50,
        increment: 2,
        value: 1,
      },
      grandpaButtonData: {
        level: 0,
        price: 500,
        increment: 5,
        value: 2,
      },
      swoleButtonData: {
        level: 0,
        price: 2000,
        increment: 20,
        value: 3,
      },
      illuminatiButtonData: {
        level: 0,
        price: 10000,
        increment: 50,
        value: 4,
      },
    };

    const savedData = JSON.parse(localStorage.getItem('globalData'));
    if (savedData) this.globalData = Object.assign(this.globalData, savedData);

    this.leftPanel = new DogView({
      gameState: this,
      height: this.world.height,
      width: 450,
      x: 0,
      y: 0,
    });

    this.middlePanel = new StreetView({
      gameState: this,
      height: this.world.height,
      width: 450,
      x: 450,
      y: 0,
    });

    this.rightPanel = new MenuView({
      gameState: this,
      height: this.world.height,
      width: 380,
      x: 900,
      y: 0,
    });

    this.theme = new Phaser.Sound(this.game, 'theme-song', 1, true);
    this.theme.volume = 0.8;

    this.onBeforeUnload = this.onBeforeUnload.bind(this);
    this.game.stage.disableVisibilityChange = true;
  }

  create() {
    window.onbeforeunload = this.onBeforeUnload;
    window.addEventListener('beforeunload', this.onBeforeUnload);

    this.theme.play();
    this.leftPanel.create();
    this.middlePanel.create();
    this.rightPanel.create();
  }

  update() {
    this.leftPanel.update();
    this.middlePanel.update();
    this.rightPanel.update();
  }

  render() {
    this.leftPanel.render();
  }

  onBeforeUnload() {
    localStorage.setItem('globalData', JSON.stringify(this.globalData));
  }
}
