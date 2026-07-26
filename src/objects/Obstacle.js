// Obstacle.js — Clase de obstáculo genérico

class Obstacle extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, type) {
    super(scene, x, y, type);
    
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Velocidad negativa hacia la izquierda
    this.setVelocityX(-300);
    this.setImmovable(true);
    this.body.allowGravity = false;
  }

  update() {
    // Destruir cuando salga por el borde izquierdo
    if (this.x < -this.width) {
      this.destroy();
    }
  }
}
