# Requirements — Caramelito Run

## Overview

Caramelito Run es un juego de plataformas side-scrolling de un solo jugador inspirado en Chrome Dino y Super Mario Bros. El jugador controla a "Caramelito", un personaje que corre automáticamente por un escenario residencial y debe saltar obstáculos para sobrevivir el mayor tiempo posible.

## Requirements

### REQ-01 — Bucle principal de juego

**User story:** Como jugador, quiero que el juego arranque directamente al abrir `index.html` sin pasos adicionales.

**Acceptance criteria:**
- El juego carga y muestra la pantalla de inicio al abrir `index.html` en un navegador.
- El jugador comienza pulsando **Space**.
- El juego muestra el estado "Game Over" cuando el jugador choca con un obstáculo.
- Desde "Game Over" se puede reiniciar con **Space**.

### REQ-02 — Personaje jugador (Caramelito)

**User story:** Como jugador, quiero controlar a Caramelito para que pueda saltar obstáculos.

**Acceptance criteria:**
- Caramelito corre automáticamente de izquierda a derecha en bucle.
- El jugador pulsa **Space** para saltar.
- El salto tiene arco físico natural (gravedad de Arcade Physics).
- Caramelito no puede saltar en el aire (solo un salto por aterrizaje).
- El sprite tiene animación de carrera y animación de salto en pixel art.

### REQ-03 — Obstáculos

**User story:** Como jugador, quiero enfrentarme a obstáculos para que el juego sea desafiante.

**Acceptance criteria:**
- Los obstáculos aparecen desde el borde derecho y se desplazan hacia la izquierda.
- Los obstáculos son gato, maceta o tacho de basura (mínimo 2 tipos distintos).
- La distancia entre obstáculos disminuye gradualmente sin llegar a generar situaciones imposibles (dificultad progresiva).
- Los obstáculos que salen por el borde izquierdo se eliminan de memoria.

### REQ-04 — Escenario residencial

**User story:** Como jugador, quiero un escenario visualmente atractivo que refuerce el estilo pixel art residencial.

**Acceptance criteria:**
- Fondo residencial con scroll infinito usando una única imagen tileable.

### REQ-05 — Puntuación

**User story:** Como jugador, quiero ver mi puntuación en tiempo real para saber qué tan bien lo estoy haciendo.

**Acceptance criteria:**
- Si no existe una puntuación almacenada, iniciarla en 0.
- La puntuación se incrementa por cada segundo de supervivencia.
- La puntuación se muestra en pantalla durante la partida.
- Al llegar a "Game Over" se muestra la puntuación final y el récord (almacenado en `localStorage`).

### REQ-06 — Audio

**User story:** Como jugador, quiero efectos de sonido simples que den feedback a mis acciones.

**Acceptance criteria:**
- Sonido al saltar.
- Sonido al colisionar con un obstáculo (game over).
- Los sonidos son generados con archivos ligeros en `/assets/sounds`.
- El audio no es obligatorio para que el juego funcione (falla silenciosamente si no está disponible).

### REQ-07 — Compatibilidad y estructura

**User story:** Como desarrollador, quiero un proyecto limpio y fácil de mantener.

**Acceptance criteria:**
- El juego se juega desde `index.html`.
- Debe ejecutarse correctamente mediante un servidor local (por ejemplo Live Server).
- Phaser 3 se carga desde CDN (sin bundler).
- El código fuente está dividido por responsabilidad en `/src`.
- No hay dependencias de backend, base de datos ni frameworks adicionales.


### REQ-08 — Rendimiento

**User story:** Como desarrollador, quiero que el juego mantenga un rendimiento fluido para ofrecer una buena experiencia al jugador.

**Acceptance criteria:**
- El juego deberá ejecutarse de forma fluida en navegadores modernos.
- Los objetos que abandonan la pantalla deberán eliminarse de memoria.
- No deberán existir pérdidas de memoria durante partidas prolongadas.
- La tasa de fotogramas objetivo será de 60 FPS en condiciones normales.


### REQ-09 — Assets

**User story:** Como desarrollador, quiero que todos los recursos gráficos estén organizados para facilitar el mantenimiento y la ejecución del juego.

**Acceptance criteria:**
- Todos los assets deberán almacenarse dentro de la carpeta `/assets`.
- Los sprites deberán estar en formato PNG con fondo transparente.
- El fondo residencial deberá ser una imagen PNG tileable para permitir scroll infinito.
- Todos los assets deberán cargarse al iniciar el juego; no deberán descargarse recursos adicionales durante la ejecución.


### REQ-10 — Escalabilidad del código

**User story:** Como desarrollador, quiero que el código esté organizado por responsabilidades para facilitar futuras ampliaciones del juego.

**Acceptance criteria:**
- Cada clase deberá tener una única responsabilidad.
- El código fuente deberá organizarse en la carpeta `/src`.
- Los recursos gráficos deberán mantenerse separados de la lógica del juego.
- Las escenas del juego deberán estar desacopladas entre sí.
