// BootScene.js — Precarga de assets antes de iniciar el juego

class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    const { width, height } = this.scale;

    this.add
      .text(width / 2, height / 2, 'Loading...', {
        fontSize: '32px',
        fill: '#ffffff'
      })
      .setOrigin(0.5);

    // Suprimir errores de carga para que los sonidos opcionales fallen silenciosamente
    this.load.on('loaderror', (file) => {
      console.warn(`Asset opcional no encontrado: ${file.key}`);
    });

    // Sprites
    this.load.spritesheet('caramelito', 'assets/sprites/caramelito_run.png', {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.image('obstacle_cat', 'assets/sprites/obstacle_cat.png');
    this.load.image('obstacle_pot', 'assets/sprites/obstacle_pot.png');
    this.load.image('obstacle_trash', 'assets/sprites/obstacle_trash.png');
    this.load.image('bg_residential', 'assets/sprites/bg_residential.png');

    // Sonidos (opcionales — fallan silenciosamente si no están disponibles)
    this.load.audio('jump', 'assets/sounds/jump.wav');
    this.load.audio('gameover', 'assets/sounds/gameover.wav');
  }

  create() {
    this.scene.start('GameScene');
  }
}
