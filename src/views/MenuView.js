import config from '../config';
import ButtonPress from '../sprites/ButtonPress';

export default class MenuView {
  constructor({ gameState, height, width, x, y }) {
    this.gameState = gameState;
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;

    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
  }

  create() {
    this.button = new ButtonPress({
      game: this.gameState.game,
      x: this.width - 30,
      y: this.height + 140,
      scaleX: 1.5,
      scaleY: 1,
      anchor: 0,
      asset: 'button-press',
      inputEnabled: true,
    });
    this.button.addOnInputDownClickListener(() => this.button.press());
    this.button.addOnInputOutClickListener(() => this.button.unpress());

    this.skills = this.gameState.add.text(this.width + 10, this.height + 100, 'Skills', {
      font: config.menuFont,
      fill: '#77BFA3',
      smoothed: false,
      wordWrap: true,
      wordWrapWidth: 20,
      align: 'center',
    });
    this.hires = this.gameState.add.text(this.width + 150, this.height + 100, 'Hires', {
      font: config.menuFont,
      fill: '#77BFA3',
      smoothed: false,
      wordWrap: true,
      wordWrapWidth: 20,
      align: 'center',
    });
    this.special = this.gameState.add.text(this.width + 270, this.height + 100, 'Special', {
      font: config.menuFont,
      fill: '#77BFA3',
      smoothed: false,
      wordWrap: true,
      wordWrapWidth: 20,
      align: 'center',
    });
    this.skill1 = this.gameState.add.text(this.width + 20, this.height + 170, 'Level 1: Upgrade Bark', {
      font: config.submenuFont,
      fill: '#77BFA3',
      smoothed: false,
      align: 'center',
    });
    this.skill2 = this.gameState.add.text(this.width + 20, this.height + 270, 'Level 2: Learn Insults', {
      font: config.submenuFont,
      fill: '#77BFA3',
      smoothed: false,
      align: 'center',
    });
    this.skill3 = this.gameState.add.text(this.width + 20, this.height + 370, 'Level 3: Get Swole', {
      font: config.submenuFont,
      fill: '#77BFA3',
      smoothed: false,
      align: 'center',
    });
    this.skill3 = this.gameState.add.text(this.width + 20, this.height + 470, 'Level 4: Learn Kungfu', {
      font: config.submenuFont,
      fill: '#77BFA3',
      smoothed: false,
      align: 'center',
    });
    this.skill4 = this.gameState.add.text(this.width + 20, this.height + 570, 'Level 5: Break Elderly Knees', {
      font: config.submenuFont,
      fill: '#77BFA3',
      smoothed: false,
      align: 'center',
    });
  }

  update() {

  }
}
