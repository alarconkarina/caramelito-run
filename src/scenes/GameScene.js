// GameScene.js — Escena principal del juego

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
    this.background = null;
    this.player = null;
    this.ground = null;
    this.obstacles = null;
    this.spawnEvent = null;
    this.speed = 100;
    // Progressive difficulty
    this.spawnDelay = 2000;      // Initial delay in ms
    this.minSpawnDelay = 700;    // Minimum delay to keep game playable
    this.delayReduction = 100;   // How much to reduce per spawn
    // Start screen state
    this.gameStarted = false;
    this.startText = null;
  }

  create() {
    const { width, height } = this.scale;

    // Suelo (visible para depuración)
this.ground = this.add.rectangle(
  width / 2,
  height - 145,
  width,
  40,
  0xffffff
);

// Agregar física estática
this.physics.add.existing(this.ground, true);


   // Fondo con scroll infinito
    this.background = new Background(this);
     
    // Jugador apoyado sobre el suelo
  this.player = new Player(this, 150, height - 165);

   // Grupo de obstáculos con física
    this.obstacles = this.physics.add.group();

      

  // Colisión jugador/obstaculos - suelo
  this.physics.add.collider(this.player, this.ground);
  this.physics.add.collider(this.obstacles, this.ground);

    // Texto de inicio - mostrar antes de que arranque el juego
    this.startText = this.add
      .text(width / 2, height / 2, 'Presiona SPACE para empezar', {
        fontSize: '32px',
        fill: '#ffffff'
      })
      .setOrigin(0.5);

    // Escuchar Space para iniciar el juego
    this.input.keyboard.on('keydown-SPACE', () => {
      if (!this.gameStarted) {
        this.gameStarted = true;
        this.startText.setVisible(false);
        // Iniciar spawner de obstáculos
        this.startSpawner(this.spawnDelay);
      } else {
        // Si el juego ya empezó, el jugador salta
        this.player.jump();
      }
    });
  }

  spawnObstacle() {
    const { width, height } = this.scale;
    const types = ['obstacle_cat', 'obstacle_pot', 'obstacle_trash'];
    const type = Phaser.Math.RND.pick(types);

    console.log("Spawn obstáculo:", type);

    const obstacle = new Obstacle (this, width - 150, height -190, type);
    console.log("Después del constructor:", obstacle.body.velocity.x);

    this.obstacles.add(obstacle);

// El grupo resetea el body, así que restauramos la configuración
obstacle.body.setAllowGravity(false);
obstacle.setVelocityX(-300);

console.log("Después de agregar al grupo:", obstacle.body.velocity.x);


    console.log(this.obstacles);

    // Reducir delay para el próximo spawn (dificultad progresiva)
    this.spawnDelay = Math.max(
      this.minSpawnDelay,
      this.spawnDelay - this.delayReduction
    );
  }

  startSpawner(delay) {
    // Crear un timer que se ejecuta una vez y se recrea con nuevo delay
    this.spawnEvent = this.time.addEvent({
      delay: delay,
      callback: this.onSpawnComplete,
      callbackScope: this,
      loop: false
    });
  }

  onSpawnComplete() {
    // Ejecutar spawn
    this.spawnObstacle();
    // Programar siguiente spawn con delay reducido
    this.startSpawner(this.spawnDelay);
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
