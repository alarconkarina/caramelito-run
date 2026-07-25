// GameScene.js — Escena principal del juego

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
    this.background = null;
    this.player = null;
    this.obstacles = null;
    this.spawnEvent = null;
    this.speed = 100;
  }

  create() {
    const { width, height } = this.scale;

    // Fondo con scroll infinito
    this.background = new Background(this);

    // Grupo de obstáculos con física
    this.obstacles = this.physics.add.group();

    // Jugador en el suelo
    this.player = new Player(this, 100, height - 50);

    // Spawner de obstáculos — cada 1.5 segundos
    this.spawnEvent = this.time.addEvent({
      delay: 1500,
      callback: this.spawnObstacle,
      callbackScope: this,
      loop: true
    });

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

  spawnObstacle() {
    const { width, height } = this.scale;
    const types = ['obstacle_cat', 'obstacle_pot', 'obstacle_trash'];
    const type = Phaser.Math.RND.pick(types);

    const obstacle = new Obstacle(this, width + 50, height - 50, type);
    this.obstacles.add(obstacle);
  }

  update(time, delta) {
    if (this.background) {
      this.background.update(this.speed, delta);
    }
    if (this.player) {
      this.player.update();
    }
    if (this.obstacles) {
      this.obstacles.getChildren().forEach(obstacle => {
        obstacle.update();
      });
    }
  }
}
