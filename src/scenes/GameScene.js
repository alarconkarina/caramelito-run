// GameScene.js — Escena principal del juego (stub)

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  create() {
    const { width, height } = this.scale;

    this.add
      .text(width / 2, height / 2, 'GameScene - Coming Soon', {
        fontSize: '40px',
        fill: '#ffffff'
      })
      .setOrigin(0.5);
  }
}
