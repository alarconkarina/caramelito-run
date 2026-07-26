# Tasks — Caramelito Run

## Task List

- [x] 1. Scaffold del proyecto y configuración base
  - Crear `index.html` con carga de Phaser 3 desde CDN.
  - Crear `src/main.js` con la config de Phaser y registro de las tres escenas.
  - Crear la estructura de carpetas `/assets/sprites`, `/assets/sounds`, `/src/scenes`, `/src/objects`.
  - El juego debe ejecutarse mediante un servidor local (ej. Live Server), no por protocolo `file://`.
  - Verificar que el canvas aparece en el navegador sin errores de consola.
  - _Requirement: REQ-07, REQ-10_

- [x] 2. BootScene — precarga de assets
  - Crear `src/scenes/BootScene.js`.
  - Cargar todos los assets de sprites y sonidos en esta escena; no cargar recursos adicionales durante la ejecución.
  - Mostrar texto "Loading..." durante la carga.
  - Transicionar a `GameScene` al completar.
  - _Requirement: REQ-01, REQ-07, REQ-09_

- [x] 3. Assets gráficos
  - Colocar en `/assets/sprites` los PNG con fondo transparente para: `caramelito_run.png` (spritesheet de carrera y salto), `obstacle_cat.png`, `obstacle_pot.png`, `obstacle_trash.png` y `bg_residential.png` (imagen tileable para el fondo).
  - Los tamaños de los sprites son: Caramelito: 64×64, Cat: 64×64, Trash: 64×64, Pot: 48×48
  - _Requirement: REQ-04, REQ-09_

- [x] 4. Background residencial con scroll infinito (Background.js)
  - Crear `src/objects/Background.js` usando un único `TileSprite` con `bg_residential.png`.
  - Implementar método `update(speed)` que desplaza el tile horizontalmente de forma continua.
  - Instanciar y actualizar desde `GameScene`.
  - _Requirement: REQ-04, REQ-09_

- [x] 5. Jugador Caramelito (Player.js)
  - Crear `src/objects/Player.js` extendiendo `Phaser.Physics.Arcade.Sprite`.
  - Registrar animaciones `run` (loop) y `jump` (one-shot).
  - Implementar método `jump()` con validación de `body.blocked.down` para evitar doble salto.
  - Posicionar en X fija, sobre el suelo.
  - _Requirement: REQ-02, REQ-10_

- [x] 6. Input de salto — solo teclado
  - En `GameScene`, escuchar únicamente `Space` via `Phaser.Input.Keyboard`.
  - Llamar a `player.jump()` en cada evento.
  - _Requirement: REQ-02_

- [x] 7. Obstáculos (Obstacle.js y spawn)
  - Crear `src/objects/Obstacle.js` extendiendo `Phaser.Physics.Arcade.Sprite`.
  - Soportar tres tipos: gato (`obstacle_cat`), maceta (`obstacle_pot`) y tacho de basura (`obstacle_trash`).
  - Los obstáculos deberán pertenecer a un grupo de física dinámico (`Physics Group`).
  - Los obstáculos que abandonen el borde izquierdo de la pantalla deberán destruirse automáticamente para liberar memoria.
  - En `GameScene`, crear un grupo de obstáculos y un `TimerEvent` para generar obstáculos de forma periódica con selección aleatoria de tipo.
  - _Requirement: REQ-03, REQ-08, REQ-10_

- [x] 8. Dificultad progresiva por distancia
  - Implementar lógica en `GameScene` que reduzca gradualmente el intervalo entre spawns de obstáculos a medida que avanza el tiempo.
  - Garantizar un intervalo mínimo que evite situaciones imposibles (gap jugable siempre presente).
  - _Requirement: REQ-03_

  - [x] 9. Pantalla de inicio
  - Mostrar un texto "Presiona SPACE para empezar" en `GameScene` antes de que el juego arranque y al presionarlo el texto desaparece.
  - El juego no inicia hasta que el jugador pulsa `Space`.
  - _Requirement: REQ-01_

- [x] 10. Colisiones y Game Over
  - Registrar `physics.add.overlap(player, obstaclesGroup, onHit)`.
  - En `onHit`: reproducir sonido de game over, detener el juego y lanzar `GameOverScene` pasando la puntuación final.
  - _Requirement: REQ-01, REQ-03_

- [x] 11. Sistema de puntuación
  - Inicializar el high score en 0 si no existe entrada en `localStorage`.
  - Mostrar score en tiempo real con un `Text` de Phaser durante la partida, que se muestre en la parte superior de la pantalla.
  - Calcular score = segundos de supervivencia × 10.
  - Leer y guardar high score en `localStorage` con la clave `caramelito_highscore`.
  - _Requirement: REQ-05_

- [ ] 12. GameOverScene
  - Crear `src/scenes/GameOverScene.js`.
  - Mostrar "GAME OVER", puntuación final y récord.
  - Escuchar `Space` para reiniciar → lanzar `GameScene`.
  - Las escenas deben estar desacopladas; pasar la puntuación via `scene.start(data)`.
  - _Requirement: REQ-01, REQ-05, REQ-10_


- [ ] 13. Audio
  - Colocar `assets/sounds/jump.wav` y `assets/sounds/gameover.wav`.
  - Cargar ambos archivos en `BootScene`.
  - Reproducir sonido de salto en `Player.jump()` y sonido de game over en `onHit`.
  - Fallar silenciosamente si los archivos no están disponibles.
  - _Requirement: REQ-06_

- [ ] 14. Gestión de memoria y rendimiento
  - Verificar que los obstáculos y cualquier objeto fuera de pantalla se destruyen correctamente en cada frame.
  - Confirmar que no quedan listeners o timers huérfanos al reiniciar la partida (limpiar en `shutdown` o `destroy` de cada escena).
  - Ejecutar una partida prolongada y comprobar que el uso de memoria se mantiene estable.
  - _Requirement: REQ-08_

- [ ] 15. Pulido visual y pixel art final
  - Verificar escalado, animaciones y alineación de los sprites definitivos.
  - Ajustar paleta de colores, tamaños de frame y animaciones.
  - Verificar que la estética es coherente con Super Mario / GBA / Chrome Dino.
  - _Requirement: REQ-04, REQ-09_

- [ ] 16. Animaciones
 - Crear animaciones de Caramelito.
 - Registrar animación Run.
 - Registrar animación Jump.
 - Cambiar automáticamente según el estado del jugador.
 - _Requirement: REQ-02, REQ-03_


