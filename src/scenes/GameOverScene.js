// GameOverScene.js — Pantalla de Game Over (stub)

class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene' });
  }

  create() {
    const { width, height } = this.scale;

    this.add
      .text(width / 2, height / 2, 'GameOverScene - Coming Soon', {
        fontSize: '40px',
        fill: '#ffffff'
      })
      .setOrigin(0.5);
  }
}
