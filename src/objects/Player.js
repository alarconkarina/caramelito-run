// Player.js — Jugador Caramelito con animaciones y salto

class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'caramelito');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Origin centrado horizontal, abajo para mejor alineación con el suelo
    this.setOrigin(0.5, 1);

    // Hitbox ajustada para pixel art (cuerpo del personaje, no整个帧)
    this.body.setSize(40, 56);
    this.body.setOffset(12, 8);

    // Configuración física
    this.setCollideWorldBounds(true);

    // Crear animaciones
    this.createAnimations(scene);
  }

  createAnimations(scene) {
    // Animación "run" — 4 frames en loop (spritesheet tiene 4 frames de carrera)
    scene.anims.create({
      key: 'run',
      frames: scene.anims.generateFrameNumbers('caramelito', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    // Animación "jump" — frame 4 (uno-shot)
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
      
      // Reproducir sonido de salto
        this.scene.sound.play('jump');
      
    }
  }

  update() {
    // Reproducir animación según estado
    if (this.body.blocked.down) {
      // En el suelo: animación de carrera
      if (!this.anims.isPlaying || this.anims.currentAnim?.key !== 'run') {
        this.play('run', true);
      }
    } else {
      // En el aire: mantener animación de salto
      if (!this.anims.isPlaying || this.anims.currentAnim?.key !== 'jump') {
        this.play('jump', true);
      }
    }
  }
}