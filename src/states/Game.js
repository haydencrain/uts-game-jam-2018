import Phaser from 'phaser';
import DogView from '../views/DogView';
import StreetView from '../views/StreetView';
import MenuView from '../views/MenuView';

export default class extends Phaser.State {
  init() {
    this.globalData = {
      score: 1000000000,
      multiplier: 1,
      isSpooked: false,
    };

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
  }

  create() {
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
}
