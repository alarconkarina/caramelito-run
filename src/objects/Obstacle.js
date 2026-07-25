// Obstacle.js — Clase de obstáculo genérico

class Obstacle extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, type) {
    super(scene, x, y, type);
    
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Velocidad negativa para движ izquierda
    this.setVelocityX(-300);
    this.setImmovable(true);
    this.body.allowGravity = false;

    console.log(
  "allowGravity:",
  this.body.allowGravity,
  "gravityY:",
  this.body.gravity.y
);
  }

  update() {

    // Destruir cuando salga por el borde izquierdo
    if (this.x < -this.width) {
      this.destroy();
    }
  }
}
