// BootScene.js — Precarga de assets antes de iniciar el juego

class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    // Mostrar texto de carga mientras se precargan los assets
    const { width, height } = this.scale;

    this.add
      .text(width / 2, height / 2, 'Loading...', {
        fontSize: '32px',
        fill: '#ffffff'
      })
      .setOrigin(0.5);
  }

  create() {
    // Transicionar a la escena principal una vez cargado todo
    this.scene.start('GameScene');
  }
}
