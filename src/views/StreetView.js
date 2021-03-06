import Grandma from '../sprites/Grandma';
import Grandpa from '../sprites/Grandpa';
import { getRandomX } from '../utils';


export default class StreetView {
  constructor({ gameState, height, width, x, y }) {
    this.gameState = gameState;
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this.grandmas = [];

    this.floorY = height - 30;

    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.getCenterX = this.getCenterX.bind(this);
    this.getCenterY = this.getCenterY.bind(this);
    this.createGrandma = this.createGrandma.bind(this);
    this.createGrandpa = this.createGrandpa.bind(this);
  }

  create() {
    // add background
    this.background = this.gameState.add.tileSprite(this.x, this.y, this.width, this.height, 'street_background');

    for (let i = 0; i < this.gameState.globalData.grandpaButtonData.level; i++) {
      this.grandmas.push(this.createGrandpa());
    }

    for (let i = 0; i < this.gameState.globalData.grandmaButtonData.level; i++) {
      this.grandmas.push(this.createGrandma());
    }
  }

  update() {

  }

  getCenterX() {
    return (this.width / 2) + this.x;
  }

  getCenterY() {
    return (this.height / 2) + this.y;
  }

  createGrandma() {
    return new Grandma({
      gameState: this.gameState,
      x: getRandomX(this.x + 150, 300),
      y: this.floorY,
      scaleX: 2,
      scaleY: 2,
      anchor: 1,
    });
  }

  createGrandpa() {
    return new Grandpa({
      gameState: this.gameState,
      x: getRandomX(this.x + 150, 300),
      y: this.floorY + 10,
      scaleX: 1.8,
      scaleY: 1.8,
      anchor: 1,
    });
  }
}
