// Player.js — Jugador Caramelito con animaciones y salto

class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'caramelito');
    scene.add.existing(this);
    scene.physics.add.existing(this);


  this.setOrigin(0.5, 1);

  this.body.setSize(this.width, this.height);
  this.body.setOffset(0, 0);

    // Configuración física
    this.setCollideWorldBounds(true);

    // Crear animaciones
    this.createAnimations(scene);
  }

  createAnimations(scene) {
    // Animación "run" — 4 frames en loop
    scene.anims.create({
      key: 'run',
      frames: scene.anims.generateFrameNumbers('caramelito', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    // Animación "jump" — 1 frame (one-shot, no loop)
    scene.anims.create({
      key: 'jump',
      frames: [{ key: 'caramelito', frame: 4 }],
      frameRate: 1,
      repeat: 0
    });
  }

  jump() {
    // Solo saltar si está en el suelo
    if (this.body.blocked.down) {
      this.setVelocityY(-500);
      this.play('jump');
    }
  }

  update() {
    // Reproducir animación "run" si está en el suelo
    if (this.body.blocked.down) {
      if (this.anims.currentAnim?.key !== 'run') {
        this.play('run', true);
      }
    }
  }
}