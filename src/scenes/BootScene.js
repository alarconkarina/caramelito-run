// BootScene.js — Precarga de assets antes de iniciar el juego

class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    const { width, height } = this.scale;

    // Texto de carga estilo pixel art con borde
    const loadingText = this.add
      .text(width / 2, height / 2, 'Loading...', {
        fontSize: '32px',
        fill: '#ffffff',
        fontFamily: '"Courier New", Courier, monospace',
        stroke: '#000000',
        strokeThickness: 4
      })
      .setOrigin(0.5);

    // Animación de carga estilo arcade
    this.tweens.add({
      targets: loadingText,
      alpha: 0.5,
      duration: 400,
      yoyo: true,
      repeat: -1
    });

    // Suprimir errores de carga para que los sonidos opcionales fallen silenciosamente
    this.load.on('loaderror', (file) => {
      console.warn(`Asset opcional no encontrado: ${file.key}`);
    });

    // Sprite del jugador - spritesheet con 5 frames (4 run + 1 jump)
    this.load.spritesheet('caramelito', 'assets/sprites/caramelito_run.png', {
      frameWidth: 64,
      frameHeight: 64
    });

    // Obstáculos - cada uno con su tamaño según diseño
    this.load.image('obstacle_cat', 'assets/sprites/obstacle_cat.png');
    this.load.image('obstacle_pot', 'assets/sprites/obstacle_pot.png');
    this.load.image('obstacle_trash', 'assets/sprites/obstacle_trash.png');

    // Fondo residencial tileable para scroll infinito
    this.load.image('bg_residential', 'assets/sprites/bg_residential.png');

    // Sonidos (opcionales — fallan silenciosamente si no están disponibles)
    this.load.audio('jump', 'assets/sounds/jump.wav');
    this.load.audio('gameover', 'assets/sounds/gameover.wav');
  }

  create() {
    // Inicializar high score en 0 si no existe
    if (!localStorage.getItem('caramelito_highscore')) {
      localStorage.setItem('caramelito_highscore', '0');
    }
    
    this.scene.start('GameScene');
  }
}
