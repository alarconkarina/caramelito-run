# Design — Caramelito Run

## Architecture Overview

El juego usa **Phaser 3** cargado desde CDN con **Arcade Physics**. No hay bundler ni servidor; todo se sirve como archivos estáticos desde `index.html`. El código está dividido en escenas y módulos bajo `/src`.

```
caramelito-run/
├── index.html          # Entry point, carga Phaser y el juego
├── assets/
│   ├── sprites/        # Spritesheets pixel art (PNG)
│   └── sounds/         # Efectos de sonido opcionales (WAV/OGG)
└── src/
    ├── main.js         # Configuración de Phaser y registro de escenas
    ├── scenes/
    │   ├── BootScene.js        # Precarga de assets
    │   ├── GameScene.js        # Lógica principal del juego
    │   └── GameOverScene.js    # Pantalla de Game Over
    └── objects/
        ├── Player.js           # Clase del jugador (Caramelito)
        ├── Obstacle.js         # Clase de obstáculo genérico
        └── Background.js       # Paralaje de fondo
```

## Scenes

### BootScene
- Muestra un splash mínimo mientras carga todos los assets.
- Transiciona a `GameScene` al terminar.

### GameScene
- Escena principal con la lógica de juego activa.
- Crea el fondo en paralaje, el jugador y el grupo de obstáculos.
- Gestiona el score con un `Text` de Phaser.
- Detecta colisiones con `physics.add.overlap`.
- Escucha input de teclado (`Space`, `ArrowUp`) y puntero (tap).
- Llama a `GameOverScene` al detectar colisión.

### GameOverScene
- Muestra puntuación final y récord.
- Espera input para reiniciar → lanza `GameScene` de nuevo.

## Game Objects

### Player (src/objects/Player.js)
- Extiende `Phaser.Physics.Arcade.Sprite`.
- Animaciones: `run` (loop) y `jump` (one-shot).
- Método `jump()`: aplica velocidad Y negativa si `body.blocked.down`.
- Posición X fija; el mundo se mueve alrededor del jugador.
- El jugador puede se mantiene en alguno de estos tres estados: Running, Jumping o Dead

### Obstacle (src/objects/Obstacle.js)
- Extiende `Phaser.Physics.Arcade.Sprite`.
- Se crea fuera del canvas (borde derecho) con velocidad X negativa.
- Se destruye al salir por el borde izquierdo.
- Tipos:
  - Pot
  - Cat
  - Trash

### Background (src/objects/Background.js)
- El fondo utiliza una unica imagen tilable.

## Physics & Difficulty

- **Gravity:** `arcade.gravity.y = 1200`
- **Velocidad inicial de obstáculos:** `-300 px/s`
- **Escalado de dificultad:** cada 10 segundos se incrementa la velocidad en `-20 px/s` hasta un máximo de `-600 px/s`.
- **Spawn timer:** `Phaser.Time.TimerEvent` con `delay` inicial de 2000 ms, reducido en 100 ms cada incremento (mínimo 700 ms).

## Score & Persistence

- Score = segundos supervivencia × 10 puntos.
- High score guardado en `localStorage` con la clave `caramelito_highscore`.

## Input

| Acción | Teclado |
|--------|---------|
| Saltar | Space   |
| Iniciar | Space |
| Reiniciar | Space   |

## Audio

- Archivos esperados (opcionales): `assets/sounds/jump.wav`, `assets/sounds/gameover.wav`.

## Sprites (Pixel Art)

Todos los sprites se recogen de la carpeta assets/sprites

| Asset | Tamaño frame | Frames |
|-------|-------------|--------|
| `caramelito_run.png` | 64×64 | 4 run + 1 jump|
| `obstacle_cat.png` | 64×64 | 1 |
| `obstacle_pot.png` | 48×48 | 1 |
| `obstacle_trash.png` | 64×64 | 1 |
| `bg_residential.png` | 1774×887 | tile |

## Phaser Config

```js
{
  type: Phaser.AUTO,
  width: 1280,
  height: 720,

  pixelArt: true,

  render: {
    roundPixels: true
  },

  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 1200 },
      debug: false
    }
  },

  scene: [BootScene, GameScene, GameOverScene]
}
```
