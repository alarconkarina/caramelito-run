// Background.js — Fondo residencial con scroll infinito

class Background extends Phaser.GameObjects.TileSprite {
  constructor(scene) {
    super(scene, 0, 0, scene.scale.width, scene.scale.height, 'bg_residential');
    
    this.scene.add.existing(this);
    this.setOrigin(0, 0);
  }

  update(speed, delta) {
  this.tilePositionX += speed * (delta / 1000);
}
}
