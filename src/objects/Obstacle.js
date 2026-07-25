// Obstacle.js — Clase de obstáculo genérico
// Implementación completa en la tarea 7

class Obstacle extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, type) {
    super(scene, x, y, type);
    scene.add.existing(this);
    scene.physics.add.existing(this);
  }
}
