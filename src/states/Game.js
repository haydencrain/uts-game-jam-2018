import Phaser from 'phaser';
import DogView from '../views/DogView';
import StreetView from '../views/StreetView';
import MenuView from '../views/MenuView';

export default class extends Phaser.State {
  init() {
    this.globalData = {
      score: 0,
      multiplier: 1,
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
      height: 0,
      width: 900,


    });

    this.theme = new Phaser.Sound(this.game, 'theme-song', 1, true);
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
