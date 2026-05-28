# 📚 AULA DIGITAL — Documentación Completa

## Hola, soy el creador de AULA DIGITAL

Quiero contarte todo sobre este proyecto en el que he estado trabajando con mucho cariño. AULA DIGITAL nació de una idea sencilla: ¿por qué aprender en línea tiene que ser aburrido? La mayoría de las plataformas educativas son grises, llenas de texto sin fin y cero personalidad. Yo quería hacer algo diferente, algo que realmente motivara a los estudiantes a abrir la página y quedarse.

---

## ¿Qué es AULA DIGITAL?

AULA DIGITAL es una plataforma educativa interactiva diseñada para estudiantes de nivel básico y medio. Cubre **7 materias fundamentales**: Matemáticas, Ciencias Naturales, Inglés, Historia, Ética, Español y Juegos educativos. Pero no es solo contenido estático — cada materia tiene:

- **Páginas de información dinámicas** con explicaciones claras, datos curiosos y contenido visual
- **Quizzes interactivos con temporizador** que ponen a prueba lo aprendido
- **Herramientas interactivas** como tablas de multiplicar, flashcards, líneas del tiempo y más
- **Una mascota educativa (un osito)** que te da ánimos, reacciona a tus aciertos y te recuerda que sigas adelante

Todo está envuelto en un diseño moderno con glassmorphism, animaciones suaves y modo oscuro.

---

## ¿Qué tecnologías usé?

Quise mantenerlo simple pero poderoso. **Zero dependencias externas** (bueno, solo la fuente Inter de Google Fonts). Aquí está todo lo que usé:

### Frontend
| Tecnología | Para qué |
|------------|----------|
| **HTML5** | Estructura de todas las páginas |
| **CSS3** | Diseño visual, animaciones, responsive |
| **JavaScript (Vanilla)** | Toda la lógica: quizzes, herramientas, animaciones, mascota |
| **Google Fonts (Inter)** | Tipografía moderna y legible |
| **SVG inline** | Iconos, ilustraciones, la mascota, elementos decorativos |

### Almacenamiento
| Tecnología | Para qué |
|------------|----------|
| **localStorage** | Guarda el progreso del estudiante por materia, persiste entre sesiones |

### Estructura de archivos
```
AULA_DIGITAL/
├── index.html                    # Página principal con hero, materias, stats
├── pages/
│   ├── matematicas.html          # Página de Matemáticas
│   ├── ciencias.html             # Página de Ciencias Naturales
│   ├── ingles.html               # Página de Inglés
│   ├── historia.html             # Página de Historia
│   ├── etica.html                # Página de Ética
│   ├── español.html              # Página de Español
│   ├── juegos.html               # Juegos educativos
│   ├── practicas.html            # Prácticas generales
│   └── informacion.html          # Página dinámica de contenido por materia
├── css/
│   ├── style.css                 # Estilos principales (variables, glassmorphism, layout)
│   ├── animations.css            # Animaciones (mascota, stagger, scroll, shimmer)
│   ├── responsive.css            # Diseño responsive (mobile-first)
│   └── loader.css                # Estilos del loader inicial
├── js/
│   ├── main.js                   # App principal: navbar, footer, mascota, progreso, toasts
│   ├── quiz.js                   # Sistema de quizzes con temporizador y feedback
│   ├── animations.js             # Partículas, scroll reveal, background chars, ripple
│   ├── tools.js                  # Herramientas interactivas por materia
│   ├── games.js                  # Lógica de juegos educativos
│   └── loader.js                 # Loader de pantalla completa
├── components/
│   ├── navbar.html               # Barra de navegación (cargada dinámicamente)
│   └── footer.html               # Pie de página (cargado dinámicamente)
└── assets/
    └── images/                   # Imágenes estáticas
```

---

## ¿Cómo funciona?

Te voy a explicar el flujo de la aplicación para que entiendas cómo todo conecta:

### 1. El estudiante llega a la página principal (`index.html`)
Ve un hero con el nombre, estadísticas (7 materias, quizzes, herramientas) y botones para explorar. Cada materia está representada por una tarjeta con su color distintivo:

| Materia | Color |
|---------|-------|
| Matemáticas | Azul (#6366f1) |
| Ciencias | Verde (#10b981) |
| Inglés | Ámbar (#f59e0b) |
| Historia | Rojo (#ef4444) |
| Español | Rosa (#ec4899) |
| Ética | Dorado (#fbbf24) |

### 2. Navegación
La barra de navegación se carga **dinámicamente** con `fetch()` desde `components/navbar.html`. Si falla (por ejemplo, en redes lentas), `main.js` tiene un fallback que renderiza el navbar directamente. Lo mismo pasa con el footer.

El logo de "AULA DIGITAL" tiene un gradiente animado que cambia de color suavemente.

### 3. Página de materia
Cada materia tiene:
- **Header** con icono representativo y descripción
- **Temas** (ahora 5 por materia) con enlaces a la página de información
- **Herramienta interactiva** (nueva funcionalidad, te la explico más abajo)
- **Pasos o metodología** (explicación paso a paso de cómo abordar la materia)
- **Quiz** de 10 preguntas con temporizador de 25 segundos por pregunta

### 4. Página de información dinámica (`informacion.html`)
Esta es una de mis partes favoritas. Es una **sola página** que carga contenido diferente según los parámetros de la URL. Por ejemplo:
```
informacion.html?subject=matematicas&topic=algebra
informacion.html?subject=historia&topic=siglo20
```

Tiene 5 temas por materia × 7 materias = **35 pantallas de contenido** diferentes, cada una con:
- Ilustración SVG representativa
- Explicación del tema
- Datos curiosos (info-highlight)
- Listas de conceptos clave

### 5. El sistema de quizzes
Cuando el estudiante llega a la sección de quiz, `QuizSystem.init('materia')` se llama y:

1. **Carga 10 preguntas** específicas de la materia
2. **Inicia un temporizador de 25 segundos** por pregunta (se pone rojo a los 5 segundos)
3. El estudiante selecciona una respuesta
4. **Feedback inmediato**: muestra si fue correcto o incorrecto, la explicación, y un "Sabías que..." con datos históricos
5. Al final: **puntaje total, tiempo transcurrido, bonificación por tiempo récord y trofeo por perfecto**
6. El progreso se guarda en `localStorage`

### 6. La mascota (el osito)
Hay un osito interactivo en la esquina inferior derecha que:
- **Camina, salta, se sorprende, se pone feliz y tiene una animación de espera**
- **Aparecen burbujas de diálogo** con frases motivacionales o tips según la materia
- **Reacciona** cuando haces clic en él (se pone feliz)
- Se agranda/reduce según el tamaño de pantalla
- Se desactiva si el usuario prefiere "reduced motion"

### 7. Herramientas interactivas
Esto es nuevo y le da un nivel extra a cada materia:

| Materia | Herramienta | Qué hace |
|---------|-------------|----------|
| **Matemáticas** | Tabla de Multiplicar | Selecciona un número (1-12) y ve su tabla. También división (÷3, ÷4, ÷6, ÷7) |
| **Ciencias** | Explorador de Elementos | 8 elementos químicos con número atómico, masa, categoría y descripción |
| **Inglés** | Flashcards | Tarjetas de vocabulario inglés-español. Toca para voltear, navega entre palabras |
| **Historia** | Línea del Tiempo | 9 eventos históricos desde 3500 a.C. hasta 1989. Selecciona la fecha para ver detalles |
| **Ética** | Rueda de Valores | 6 valores (Honestidad, Respeto, Responsabilidad, Solidaridad, Justicia, Empatía) con descripciones |
| **Español** | Conjugador de Verbos | 6 verbos en presente: 3 regulares y 3 irregulares, con todas las personas |

### 8. Modo oscuro
Un botón en la navbar permite cambiar entre modo claro y oscuro. Usa `data-theme` en el HTML y variables CSS. El cambio es suave y se guarda en localStorage.

---

## ¿Por qué es importante?

Te voy a ser sincero: la educación en línea tiene un problema enorme de **engagement** (compromiso). Los estudiantes abren una página, ven un muro de texto y cierran. AULA DIGITAL ataca ese problema desde varios frentes:

1. **Diseño atractivo**: El glassmorphism, las animaciones sutiles, los colores vibrantes — todo está pensado para que el estudiante *quiera* estar ahí.

2. **Interactividad constante**: No hay páginas pasivas. Siempre hay algo que hacer: responder un quiz, explorar una herramienta, hacer clic en la mascota.

3. **Retroalimentación inmediata**: Cuando respondes bien, lo sabes al instante. Cuando te equivocas, aprendes por qué. No hay esperar a que alguien revise.

4. **Progreso visible**: La barra de progreso en la página principal te muestra cuánto has avanzado en cada materia. Eso motiva a completar.

5. **Contenido contextualizado**: Cada "Sabías que..." conecta el tema con algo de la vida real o la historia. No es solo teoría abstracta.

6. **Accesibilidad**: Skip link, roles ARIA, prefers-reduced-motion, responsive design, contraste suficiente. Quiero que todos puedan usar la plataforma.

7. **Sin dependencias externas**: No necesitas internet para los estilos ni frameworks pesados. Todo funciona con HTML, CSS y JS vanilla. La página carga rápido incluso en conexiones lentas.

---

## ¿En qué ayuda?

AULA DIGITAL ayuda a:

- **Estudiantes autodidactas**: Pueden aprender a su propio ritmo, repasar temas y evaluarse con los quizzes
- **Maestros**: Como material de apoyo en clases, para asignar lecturas y quizzes como tarea
- **Padres**: Para ayudar a sus hijos con las tareas escolares de una forma más interactiva que un libro de texto
- **Cualquier persona curiosa**: Que quiera repasar conceptos básicos de estas materias

---

## ¿Qué sigue?

El proyecto está vivo y hay muchas ideas para el futuro:

1. **PWA (Progressive Web App)**: Service worker para funcionar offline, manifest para instalación en el celular
2. **Efectos de sonido**: Usando Web Audio API para feedback auditivo en quizzes (correcto, incorrecto, tiempo)
3. **Gamificación**: Racha de días (streaks), medallas, desafíos diarios
4. **Perfiles de estudiante**: Login simple para guardar progreso por nombre en localStorage
5. **Más herramientas**: Calculadora gráfica, explorador de sistemas del cuerpo, generador de ejercicios
6. **Traducción al inglés**: Para que estudiantes de otros idiomas también puedan usarlo

---

## Datos técnicos curiosos

- **La mascota usa SVG inline**, no imágenes externas. Eso significa cero solicitudes HTTP adicionales y se ve nítido en cualquier resolución.
- **Las animaciones usan solo transform y opacity** (GPU-accelerated) para no quemar la batería del celular.
- **El gradiente del navbar** cambia con `background-position` animado — es puro CSS, sin JavaScript.
- **Los quizzes tienen 60 preguntas en total** (10 por materia), cada una con su propia explicación y dato curioso.
- **La página de información es una sola URL** que muestra 35 pantallas diferentes según los parámetros. Mucho más mantenible que tener 35 páginas HTML separadas.
- **El modo oscuro cambia mediante una variable CSS** en el elemento `<html>` — todo el tema se actualiza al instante.

---

## Conclusión

AULA DIGITAL es mi proyecto más personal. No es solo código: es la idea de que aprender puede ser bonito, divertido y motivador. Cada detalle, desde el rebote del osito hasta el gradiente del logo, está hecho con la intención de hacer sonreír al estudiante mientras aprende.

Si llegaste hasta aquí, gracias por interesarte. Y recuerda: **nunca dejes de aprender**.

— El creador de AULA DIGITAL
