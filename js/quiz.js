/* ============================================
   QUIZ.JS - Interactive quiz system
   Human-Centered Engineering: clear feedback,
   error handling, accessibility
   ============================================ */

const QuizSystem = {
  currentQuiz: null,
  currentQuestion: 0,
  score: 0,
  answered: false,

  questions: {
    matematicas: [
      {
        question: 'Cuanto es 25 x 4?',
        options: ['75', '90', '100', '120'],
        correct: 2,
        explanation: '25 x 4 = 100. Multiplicamos 25 cuatro veces.'
      },
      {
        question: 'Cual es el resultado de 144 / 12?',
        options: ['10', '11', '12', '14'],
        correct: 2,
        explanation: '144 / 12 = 12 porque 12 x 12 = 144.'
      },
      {
        question: 'Que es una fraccion equivalente a 1/2?',
        options: ['2/4', '3/4', '1/4', '2/3'],
        correct: 0,
        explanation: '2/4 es equivalente a 1/2 porque si simplificas 2/4 obtienes 1/2.'
      },
      {
        question: 'Cuanto es 15% de 200?',
        options: ['20', '25', '30', '35'],
        correct: 2,
        explanation: '15% de 200 = (15/100) x 200 = 0.15 x 200 = 30.'
      },
      {
        question: 'Cual es el area de un rectangulo de base 8cm y altura 5cm?',
        options: ['30 cm2', '35 cm2', '40 cm2', '45 cm2'],
        correct: 2,
        explanation: 'Area = base x altura = 8 x 5 = 40 cm2.'
      }
    ],
    ciencias: [
      {
        question: 'Cual es el planeta mas cercano al Sol?',
        options: ['Venus', 'Mercurio', 'Tierra', 'Marte'],
        correct: 1,
        explanation: 'Mercurio es el planeta mas cercano al Sol y el mas pequeno del sistema solar.'
      },
      {
        question: 'Que organo es responsable de bombear sangre en el cuerpo?',
        options: ['Pulmones', 'Higado', 'Corazon', 'Cerebro'],
        correct: 2,
        explanation: 'El corazon es el organo muscular que bombea sangre a todo el cuerpo.'
      },
      {
        question: 'Cual es el estado del agua a 100 grados Celsius?',
        options: ['Solido', 'Liquido', 'Gaseoso', 'Plasma'],
        correct: 2,
        explanation: 'A 100 C el agua hierve y se convierte en vapor (estado gaseoso).'
      },
      {
        question: 'Que celula es la unidad basica del sistema nervioso?',
        options: ['Neurona', 'Globulo rojo', 'Celula muscular', 'Celula osea'],
        correct: 0,
        explanation: 'La neurona es la celula fundamental del sistema nervioso que transmite impulsos.'
      },
      {
        question: 'Cual es el proceso por el cual las plantas producen su alimento?',
        options: ['Respiracion', 'Fotosintesis', 'Digestion', 'Fermentacion'],
        correct: 1,
        explanation: 'La fotosintesis es el proceso donde las plantas convierten luz en energia.'
      }
    ],
    ingles: [
      {
        question: 'How do you say "Hola" in English?',
        options: ['Goodbye', 'Hello', 'Thanks', 'Please'],
        correct: 1,
        explanation: '"Hello" is the most common greeting in English.'
      },
      {
        question: 'What is the plural of "child"?',
        options: ['Childs', 'Childes', 'Children', 'Childrens'],
        correct: 2,
        explanation: 'The plural of "child" is "children" (irregular plural).'
      },
      {
        question: 'Complete: She ___ to school every day.',
        options: ['go', 'goes', 'going', 'gone'],
        correct: 1,
        explanation: 'With third person singular (she/he/it), we add -s to the verb: she goes.'
      },
      {
        question: 'What does "beautiful" mean?',
        options: ['Feo', 'Grande', 'Hermoso', 'Pequeno'],
        correct: 2,
        explanation: '"Beautiful" means "hermoso" or "bello" in Spanish.'
      },
      {
        question: 'Which is a correct sentence?',
        options: ['I am have a book', 'I has a book', 'I have a book', 'I having a book'],
        correct: 2,
        explanation: '"I have a book" is the correct present simple form.'
      }
    ],
    historia: [
      {
        question: 'En que ano descubrio Cristobal Colon America?',
        options: ['1490', '1492', '1498', '1500'],
        correct: 1,
        explanation: 'Cristobal Colon llego a America el 12 de octubre de 1492.'
      },
      {
        question: 'Cual fue la civilizacion que construyo Machu Picchu?',
        options: ['Azteca', 'Maya', 'Inca', 'Olmeca'],
        correct: 2,
        explanation: 'Los Incas construyeron Machu Picchu en lo alto de los Andes peruanos.'
      },
      {
        question: 'Quien fue el primer presidente de Estados Unidos?',
        options: ['Thomas Jefferson', 'George Washington', 'Abraham Lincoln', 'John Adams'],
        correct: 1,
        explanation: 'George Washington fue el primer presidente de EE.UU. (1789-1797).'
      },
      {
        question: 'Que evento marco el inicio de la Edad Media?',
        options: ['Caida de Roma', 'Descubrimiento de America', 'Revolucion Francesa', 'Primera Guerra Mundial'],
        correct: 0,
        explanation: 'La caida del Imperio Romano de Occidente (476 d.C.) marco el inicio de la Edad Media.'
      },
      {
        question: 'Quien pinto la Mona Lisa?',
        options: ['Miguel Angel', 'Leonardo da Vinci', 'Rafael', 'Donatello'],
        correct: 1,
        explanation: 'Leonardo da Vinci pinto la Mona Lisa entre 1503 y 1519.'
      }
    ],
    Español: [
     {
  question: '¿Qué es un sustantivo?',
  options: [
    'Una palabra que nombra personas, animales o cosas',
    'Una palabra que indica acción',
    'Una palabra que describe un verbo',
    'Una palabra que reemplaza números'
  ],
  correct: 0,
  explanation: 'El sustantivo es la palabra que nombra personas, animales, lugares o cosas.'
},
{
  question: '¿Cuál de estas palabras es un verbo?',
  options: ['Mesa', 'Correr', 'Rojo', 'Casa'],
  correct: 1,
  explanation: '“Correr” es un verbo porque expresa una acción.'
},
{
  question: '¿Qué signo se usa para hacer una pregunta?',
  options: ['.', '¡!', '¿?', ','],
  correct: 2,
  explanation: 'Los signos ¿ ? se usan para indicar preguntas en español.'
},
{
  question: '¿Cuál es el plural de “libro”?',
  options: ['Libroes', 'Libros', 'Libras', 'Libre'],
  correct: 1,
  explanation: 'El plural de “libro” es “libros”.'
},
{
  question: '¿Cuál de estas palabras está escrita correctamente?',
  options: ['Arvol', 'Escuela', 'Vakas', 'Jirrafa'],
  correct: 1,
  explanation: '“Escuela” está escrita correctamente.'
}
    ],
    
    Ética: [
    {
  question: '¿Qué valor nos enseña a decir la verdad?',
  options: [
    'Respeto',
    'Honestidad',
    'Responsabilidad',
    'Solidaridad'
  ],
  correct: 1,
  explanation: 'La honestidad consiste en decir la verdad y actuar correctamente.'
},
{
  question: '¿Qué debemos hacer para respetar a los demás?',
  options: [
    'Gritarles',
    'Ignorarlos',
    'Escuchar y tratar bien a las personas',
    'Pelear con ellos'
  ],
  correct: 2,
  explanation: 'El respeto significa tratar bien y escuchar a las demás personas.'
},
{
  question: '¿Qué significa ser responsable?',
  options: [
    'Cumplir con tareas y deberes',
    'Romper las reglas',
    'Mentir siempre',
    'No ayudar a nadie'
  ],
  correct: 0,
  explanation: 'La responsabilidad es cumplir correctamente con nuestros deberes.'
},
{
  question: '¿Qué valor se demuestra ayudando a otros?',
  options: [
    'Solidaridad',
    'Enojo',
    'Desorden',
    'Egoísmo'
  ],
  correct: 0,
  explanation: 'La solidaridad consiste en ayudar y apoyar a otras personas.'
},
{
  question: '¿Qué debemos hacer cuando cometemos un error?',
  options: [
    'Escapar',
    'Culpar a otros',
    'Reconocerlo y pedir disculpas',
    'Ignorarlo'
  ],
  correct: 2,
  explanation: 'Reconocer los errores y pedir disculpas demuestra respeto y honestidad.'
}
    ]
  },

  init: function (subject) {
    const container = document.getElementById('quiz-container');
    if (!container) return;

    this.currentQuiz = this.questions[subject] || this.questions.matematicas;
    this.currentQuestion = 0;
    this.score = 0;
    this.answered = false;
    this.render();
  },

  render: function () {
    const container = document.getElementById('quiz-container');
    if (!container) return;

    const quiz = this.currentQuiz;
    const total = quiz.length;
    const q = quiz[this.currentQuestion];

    if (this.currentQuestion >= total) {
      this.showResult(container);
      return;
    }

    const letters = ['A', 'B', 'C', 'D'];
    const progress = ((this.currentQuestion + 1) / total) * 100;
    const subjectKey = Object.keys(this.questions).find(k => this.questions[k] === this.currentQuiz);

    container.innerHTML = `
      <div class="quiz-header">
        <div class="quiz-progress-text">Pregunta ${this.currentQuestion + 1} de ${total}</div>
        <div class="quiz-score">Puntaje: ${this.score}</div>
      </div>
      <div class="progress-bar" style="margin-bottom: var(--space-lg);" role="progressbar" aria-valuenow="${this.currentQuestion + 1}" aria-valuemin="1" aria-valuemax="${total}">
        <div class="progress-fill" style="width: ${progress}%"></div>
      </div>
      <div class="quiz-question fade-in" role="region" aria-label="Pregunta ${this.currentQuestion + 1}">
        <h3>${q.question}</h3>
        <div class="quiz-options" role="radiogroup" aria-label="Opciones de respuesta">
          ${q.options.map((opt, i) => `
            <button class="quiz-option" data-index="${i}" role="radio" aria-checked="false" ${this.answered ? 'disabled' : ''}>
              <span class="quiz-option-letter">${letters[i]}</span>
              <span>${opt}</span>
            </button>
          `).join('')}
        </div>
      </div>
      <div id="quiz-feedback" class="fade-in" role="alert" aria-live="polite"></div>
      <div class="quiz-navigation">
        <button class="btn btn-secondary" id="quiz-prev" ${this.currentQuestion === 0 ? 'disabled style="opacity:0.4"' : ''}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
          Anterior
        </button>
        <button class="btn btn-primary" id="quiz-next" ${!this.answered ? 'disabled style="opacity:0.4"' : ''}>
          ${this.currentQuestion === total - 1 ? 'Ver Resultado' : 'Siguiente'}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
        </button>
      </div>
    `;

    this.bindEvents();
  },

  bindEvents: function () {
    const container = document.getElementById('quiz-container');
    if (!container) return;

    container.querySelectorAll('.quiz-option').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (this.answered) return;
        this.selectOption(parseInt(btn.dataset.index));
      });
    });

    const nextBtn = document.getElementById('quiz-next');
    if (nextBtn) nextBtn.addEventListener('click', () => this.nextQuestion());

    const prevBtn = document.getElementById('quiz-prev');
    if (prevBtn) prevBtn.addEventListener('click', () => this.prevQuestion());
  },

  selectOption: function (index) {
    if (typeof index !== 'number' || index < 0) return;
    this.answered = true;
    const quiz = this.currentQuiz;
    const q = quiz[this.currentQuestion];

    if (!q || !q.options || index >= q.options.length) return;

    const options = document.querySelectorAll('.quiz-option');
    const feedback = document.getElementById('quiz-feedback');

    options.forEach((opt, i) => {
      opt.disabled = true;
      opt.setAttribute('aria-checked', i === index ? 'true' : 'false');
      if (i === q.correct) {
        opt.classList.add('correct');
      } else if (i === index && i !== q.correct) {
        opt.classList.add('incorrect');
      }
    });

    if (index === q.correct) {
      this.score++;
      this.showToast('Correcto!', 'success');
    } else {
      this.showToast('Incorrecto', 'error');
    }

    if (feedback) {
      feedback.innerHTML = `
        <div style="padding: 16px; background: var(--bg-secondary); border-radius: 12px; margin-top: 16px; border-left: 4px solid ${index === q.correct ? 'var(--subject-science)' : 'var(--subject-history)'};">
          <strong>Explicacion:</strong> ${q.explanation}
        </div>
      `;
    }

    const nextBtn = document.getElementById('quiz-next');
    if (nextBtn) {
      nextBtn.disabled = false;
      nextBtn.style.opacity = '1';
    }
  },

  nextQuestion: function () {
    this.currentQuestion++;
    this.answered = false;
    this.render();
  },

  prevQuestion: function () {
    if (this.currentQuestion > 0) {
      this.currentQuestion--;
      this.answered = false;
      this.render();
    }
  },

  showResult: function (container) {
    const quiz = this.currentQuiz;
    if (!quiz) return;
    const total = quiz.length;
    const percent = total > 0 ? Math.round((this.score / total) * 100) : 0;
    let grade = '';

    if (percent >= 90) grade = 'Excelente!';
    else if (percent >= 70) grade = 'Muy bien!';
    else if (percent >= 50) grade = 'Bien, sigue practicando';
    else grade = 'Sigue intentando, tu puedes!';

    const subjectKey = Object.keys(this.questions).find(k => this.questions[k] === this.currentQuiz);

    container.innerHTML = `
      <div class="quiz-result" role="region" aria-label="Resultado del quiz">
        <h3>Quiz Completado</h3>
        <div class="score" aria-live="polite">${this.score}/${total}</div>
        <p style="font-size: 1.25rem; font-weight: 600; color: var(--text-primary);">${grade}</p>
        <p>Respondiste correctamente ${this.score} de ${total} preguntas (${percent}%)</p>
        <div class="progress-bar" style="max-width: 300px; margin: 16px auto;" role="progressbar" aria-valuenow="${percent}" aria-valuemin="0" aria-valuemax="100">
          <div class="progress-fill" style="width: ${percent}%"></div>
        </div>
        <button class="btn btn-primary" id="quiz-retry">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 4v6h6"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
          Intentar de nuevo
        </button>
      </div>
    `;

    const retryBtn = document.getElementById('quiz-retry');
    if (retryBtn && subjectKey) {
      retryBtn.addEventListener('click', () => this.init(subjectKey));
    }

    this.updateProgress(subjectKey, percent);
  },

  showToast: function (message, type) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');

    const iconSvg = type === 'success'
      ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>'
      : '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>';

    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconSvg}</svg>
      ${message}
    `;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  },

  updateProgress: function (subject, percent) {
    if (!subject) return;
    try {
      const saved = JSON.parse(localStorage.getItem('studyProgress') || '{}');
      saved[subject] = Math.max(saved[subject] || 0, percent);
      localStorage.setItem('studyProgress', JSON.stringify(saved));
      const event = new CustomEvent('progressUpdated', { detail: saved });
      document.dispatchEvent(event);
    } catch (e) {
      /* localStorage unavailable or full */
      console.warn('No se pudo guardar el progreso:', e.message);
    }
  }
};
