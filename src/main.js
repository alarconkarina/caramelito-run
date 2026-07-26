// main.js — Configuración principal de Phaser y registro de escenas

const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,

  // Pixel art configuration - CRÍTICO para estética retro
  pixelArt: true,

  render: {
    // Mantener pixeles nítidos al escalar
    roundPixels: true,
    // Sin antialiasing para pixel art
    antialias: false,
    // Fondo azul estilo GBA/Super Mario
    backgroundColor: '#5c94fc'
  },

  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 1200 },  // Gravedad como en el diseño
      debug: false
    }
  },

  scene: [BootScene, GameScene, GameOverScene]
};

const game = new Phaser.Game(config);
