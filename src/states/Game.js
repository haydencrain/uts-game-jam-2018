import Phaser from 'phaser';
import DogView from '../views/DogView';
import GrandmaView from '../views/GrandmaView';
import MenuView from '../views/MenuView';

export default class extends Phaser.State {
  init() {
    this.globalData = {
      score: 0,
    };

    this.leftPanel = new DogView({
      gameState: this,

    });

    this.middlePanel = new GrandmaView({
      gameState: this,

    });

    this.rightPanel = new MenuView({
      gameState: this,

    });
  }

  create() {
    this.leftPanel.create();
    this.middlePanel.create();
    this.rightPanel.create();
  }

  update() {
    this.leftPanel.update();
    this.middlePanel.update();
    this.rightPanel.update();
  }
}
