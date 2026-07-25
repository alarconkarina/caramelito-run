// Player.js — Clase del jugador (Caramelito)
// Implementación completa en la tarea 5

class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'caramelito');
    scene.add.existing(this);
    scene.physics.add.existing(this);
  }
}
