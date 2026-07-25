// main.js — Configuración principal de Phaser y registro de escenas

const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,

  pixelArt: true,

  render: {
    roundPixels: true
  },

  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 1200 },
      debug: false
    }
  },

  scene: [BootScene, GameScene, GameOverScene]
};

const game = new Phaser.Game(config);
