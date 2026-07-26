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
    // Game state
    this.score = 0;
    this.scoreText = null;
    this.gameOver = false;
    this.startTime = 0;
    this.gameDuration = 0;
  }

  create() {
    const { width, height } = this.scale;

    // Reiniciar estado de la partida
this.gameStarted = false;
this.gameOver = false;

this.score = 0;
this.startTime = 0;
this.gameDuration = 0;

this.speed = 100;

this.spawnDelay = 2000;
this.spawnEvent = null;

    // Suelo - estilo pixel art GBA (verde pasto con borde superior)
    // Superficie en Y = height - 145 (145px desde el fondo)
    const groundY = height - 155;

    //Suelo invisible
this.ground = this.add.rectangle(
  width / 2,
  groundY + 20,
  width,
  40,
  0xffffff
).setVisible(false);


// Agregar física estática
this.physics.add.existing(this.ground, true);

   // Fondo con scroll infinito
    this.background = new Background(this);
     
    // Jugador posicionado sobre el suelo
    this.player = new Player(this, 150, groundY);
    this.player.setDepth(10);

    // Grupo de obstáculos con física
    this.obstacles = this.physics.add.group();
    this.obstacles.setDepth(10);

      

  // Colisión jugador/obstaculos - suelo
  this.physics.add.collider(this.player, this.ground);
  this.physics.add.collider(this.obstacles, this.ground);

    // Texto de inicio - estilo pixel art arcade
    this.startText = this.add
      .text(width / 2, height / 2, 'Presiona SPACE para empezar', {
        fontSize: '28px',
        fill: '#ffffff',
        fontFamily: '"Courier New", Courier, monospace',
        stroke: '#000000',
        strokeThickness: 6
      })
      .setOrigin(0.5)
      .setDepth(100);

    // Efecto de parpadeo en texto de inicio
    this.tweens.add({
      targets: this.startText,
      alpha: 0.3,
      duration: 600,
      yoyo: true,
      repeat: -1
    });

    // Escuchar Space para iniciar el juego
    this.input.keyboard.on('keydown-SPACE', () => {
      
      if (!this.gameStarted) {
        this.gameStarted = true;
        this.startText.setVisible(false);
        // Iniciar spawner de obstáculos
        this.startSpawner(this.spawnDelay);
        // Registrar tiempo de inicio para score
        this.startTime = this.time.now;
        // Mostrar texto de score
        this.createScoreText();
      } else if (!this.gameOver) {
        // Si el juego ya empezó y no está game over, el jugador salta
        this.player.jump();
      }
    });

    // Registrar colisión entre jugador y obstáculos
    this.physics.add.overlap(this.player, this.obstacles, this.onHit, null, this);
  }

  createScoreText() {
    const { width } = this.scale;
    this.scoreText = this.add.text(width - 20, 20, `Score: ${this.score}`, {
      fontSize: '20px',
      fill: '#ffffff',
      fontFamily: '"Courier New", Courier, monospace',
      stroke: '#000000',
      strokeThickness: 3
    })
    .setOrigin(1, 0)
    .setDepth(100);
  }

  onHit(player, obstacle) {
    if (this.gameOver) return; // Evitar múltiples game overs
    
    this.gameOver = true;
    
    // Reproducir sonido de game over
      this.sound.play('gameover');
    
    
    // Calcular score final (segundos de supervivencia × 10)
    this.gameDuration = (this.time.now - this.startTime) / 1000;
    this.score = Math.floor(this.gameDuration * 10);
    
    // Detener spawn de obstáculos
    if (this.spawnEvent) {
      this.spawnEvent.remove();
    }
    
    // Detener movimiento de obstáculos
    this.obstacles.getChildren().forEach(obstacle => {
      if (obstacle.active) {
        obstacle.setVelocityX(0);
      }
    });
    
    // Detener fondo
    if (this.background) {
      this.speed = 0; // Esto hará que el fondo deje de moverse en el update
    }
    
    // Mostrar mensaje de game over
    const { width, height } = this.scale;
    this.add.text(width / 2, height / 2, 'GAME OVER', {
      fontSize: '40px',
      fill: '#ff3333',
      fontFamily: '"Courier New", Courier, monospace',
      stroke: '#000000',
      strokeThickness: 4
    })
    .setOrigin(0.5)
    .setDepth(100);
    
    // Guardar high score en localStorage
    const storedHighScore = localStorage.getItem('caramelito_highscore');
    const currentHighScore = storedHighScore ? parseInt(storedHighScore, 10) : 0;
    const newHighScore = Math.max(this.score, currentHighScore);
    localStorage.setItem('caramelito_highscore', newHighScore.toString());
    
    // Esperar 2 segundos antes de cambiar escena
    this.time.delayedCall(2000, () => {
      this.scene.start('GameOverScene', { score: this.score, highScore: newHighScore });
    });
  }

  spawnObstacle() {
    const { width, height } = this.scale;
    const types = ['obstacle_cat', 'obstacle_pot', 'obstacle_trash'];
    const type = Phaser.Math.RND.pick(types);

    // Posición Y alineada con el suelo (altura del suelo desde arriba = 145)
    // Ajustamos según el tipo de obstáculo para que todos descansen sobre el suelo
    const groundY = height - 155;
    
    // Diferentes alturas según el tipo de obstáculo
    let spawnY;
    switch (type) {
      case 'obstacle_pot':
        // Maceta más pequeña (48x48)
        spawnY = groundY - 24;
        break;
      case 'obstacle_cat':
      case 'obstacle_trash':
      default:
        // Gato y tacho (64x64)
        spawnY = groundY - 32;
        break;
    }

    const obstacle = new Obstacle(this, width - 50, spawnY, type);

    this.obstacles.add(obstacle);

    // El grupo resetea el body, así que restauramos la configuración
obstacle.body.setAllowGravity(false);
obstacle.setVelocityX(-300);

    // Reducir delay para el próximo spawn (dificultad progresiva)
    this.spawnDelay = Math.max(
      this.minSpawnDelay,
      this.spawnDelay - this.delayReduction
    );
  }

  startSpawner(delay) {
    console.log("Creando Timer");
    // Crear un timer que se ejecuta una vez y se recrea con nuevo delay
    this.spawnEvent = this.time.addEvent({
      delay: delay,
      callback: this.onSpawnComplete,
      callbackScope: this,
      loop: false
    });
  }

  onSpawnComplete() {
    console.log("Timer ejecutado");
    // Ejecutar spawn
    this.spawnObstacle();
    // Programar siguiente spawn con delay reducido
    this.startSpawner(this.spawnDelay);
  }

  update(time, delta) {
    // Actualizar background
    if (this.background) {
      this.background.update(this.speed, delta);
    }
    
    // Actualizar jugador
    if (this.player) {
      this.player.update();
    }
    
    // Actualizar obstáculos
    if (this.obstacles) {
      this.obstacles.getChildren().forEach(obstacle => {
        obstacle.update();
      });
    }
    
    // Actualizar score en tiempo real
    if (this.gameStarted && !this.gameOver && this.startTime > 0 && this.scoreText) {
      const currentDuration = (this.time.now - this.startTime) / 1000;
      const newScore = Math.floor(currentDuration * 10);
      if (newScore !== this.score) {
        this.score = newScore;
        this.scoreText.setText(`Score: ${this.score}`);
      }
    }
  }

  shutdown() {
    // Limpiar listener de teclado para evitar duplicados
    this.input.keyboard.off('keydown-SPACE');

    // Limpiar timer de spawn si existe
    if (this.spawnEvent) {
      this.spawnEvent.remove();
      this.spawnEvent = null;
    }

    // Limpiar grupo de obstáculos
    if (this.obstacles) {
      this.obstacles.clear(true);
    }

    // Destruir background
    if (this.background) {
      this.background.destroy();
      this.background = null;
    }

    // Destruir jugador
    if (this.player) {
      this.player.destroy();
      this.player = null;
    }

    // Destruir texto de score
    if (this.scoreText) {
      this.scoreText.destroy();
      this.scoreText = null;
    }

    // Destruir texto de inicio
    if (this.startText) {
      this.startText.destroy();
      this.startText = null;
    }

    // Destruir suelo
    if (this.ground) {
      this.ground.destroy();
      this.ground = null;
    }

    // Destruir borde del suelo
    if (this.groundTop) {
      this.groundTop.destroy();
      this.groundTop = null;
    }
  }
}
