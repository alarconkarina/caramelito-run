// GameScene.js — Escena principal del juego

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
    this.background = null;
    this.player = null;
    this.speed = 100;
  }

  create() {
    const { width, height } = this.scale;

    // Fondo con scroll infinito
    this.background = new Background(this);

    // Jugador en el suelo
    this.player = new Player(this, 100, height - 50);

    // Escuchar Space para saltar
    this.input.keyboard.on('keydown-SPACE', () => {
      this.player.jump();
    });

    // Texto de prueba para visualización
    this.add
      .text(width / 2, height / 2, 'GameScene - Presiona SPACE para empezar', {
        fontSize: '32px',
        fill: '#ffffff'
      })
      .setOrigin(0.5);
  }

  update(time, delta) {
    if (this.background) {
      this.background.update(this.speed, delta);
    }
    if (this.player) {
      this.player.update();
    }
  }
}
