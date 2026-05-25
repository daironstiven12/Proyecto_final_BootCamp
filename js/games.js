/* ============================================
   GAMES.JS - Educational mini games
   Memory game, matching game, quick quiz
   ============================================ */

const Games = {
  /* ---- Memory Game ---- */
  memory: {
    cards: [],
    flippedCards: [],
    matchedPairs: 0,
    moves: 0,
    isLocked: false,

    symbols: [
      { icon: '+', name: 'suma' },
      { icon: '-', name: 'resta' },
      { icon: 'x', name: 'multiplicacion' },
      { icon: '/', name: 'division' },
      { icon: '=', name: 'igualdad' },
      { icon: '%', name: 'porcentaje' },
      { icon: 'pi', name: 'pi' },
      { icon: 'sqrt', name: 'raiz' }
    ],

    init: function (containerId) {
      const container = document.getElementById(containerId);
      if (!container) return;

      this.cards = [];
      this.flippedCards = [];
      this.matchedPairs = 0;
      this.moves = 0;
      this.isLocked = false;

      const doubled = [...this.symbols, ...this.symbols];
      this.shuffleArray(doubled);

      this.cards = doubled.map((s, i) => ({
        id: i,
        icon: s.icon,
        name: s.name,
        isFlipped: false,
        isMatched: false
      }));

      this.render(container);
    },

    shuffleArray: function (arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    },

    render: function (container) {
      container.innerHTML = `
        <div class="game-card-header">
          <h3>Juego de Memoria</h3>
          <div style="display:flex;gap:16px;font-size:0.875rem;">
            <span>Movimientos: <strong id="memory-moves">0</strong></span>
            <span>Pares: <strong id="memory-pairs">0/8</strong></span>
          </div>
        </div>
        <p style="font-size:0.875rem;color:var(--text-secondary);margin-bottom:16px;">
          Encuentra los pares de simbolos matematicos. Toca dos cartas para descubrirlas.
        </p>
        <div class="memory-grid" id="memory-grid">
          ${this.cards.map(card => `
            <div class="memory-card ${card.isMatched ? 'matched' : ''} ${card.isFlipped ? 'flipped' : ''}"
                 data-id="${card.id}">
              <div class="memory-card-inner">
                <div class="memory-card-face memory-card-front">?</div>
                <div class="memory-card-face memory-card-back">${card.icon}</div>
              </div>
            </div>
          `).join('')}
        </div>
        <div style="text-align:center;margin-top:16px;">
          <button class="btn btn-secondary" onclick="Games.memory.init('memory-game')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px;"><path d="M1 4v6h6"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
            Reiniciar juego
          </button>
        </div>
      `;

      this.bindEvents(container);
    },

    bindEvents: function (container) {
      container.querySelectorAll('.memory-card').forEach((el) => {
        el.addEventListener('click', () => {
          if (this.isLocked) return;
          const id = parseInt(el.dataset.id);
          this.flipCard(id, el);
        });
      });
    },

    flipCard: function (id, element) {
      const card = this.cards.find(c => c.id === id);
      if (!card || card.isFlipped || card.isMatched) return;

      card.isFlipped = true;
      element.classList.add('flipped');
      this.flippedCards.push({ card, element });

      if (this.flippedCards.length === 2) {
        this.moves++;
        document.getElementById('memory-moves').textContent = this.moves;
        this.checkMatch();
      }
    },

    checkMatch: function () {
      this.isLocked = true;
      const [first, second] = this.flippedCards;

      if (first.card.name === second.card.name) {
        first.card.isMatched = true;
        second.card.isMatched = true;
        first.element.classList.add('matched');
        second.element.classList.add('matched');
        this.matchedPairs++;
        document.getElementById('memory-pairs').textContent = `${this.matchedPairs}/8`;
        this.flippedCards = [];
        this.isLocked = false;

        if (this.matchedPairs === 8) {
          setTimeout(() => this.showMemoryWin(), 500);
        }
      } else {
        setTimeout(() => {
          first.card.isFlipped = false;
          second.card.isFlipped = false;
          first.element.classList.remove('flipped');
          second.element.classList.remove('flipped');
          this.flippedCards = [];
          this.isLocked = false;
        }, 800);
      }
    },

    showMemoryWin: function () {
      const container = document.getElementById('memory-game');
      const winMsg = document.createElement('div');
      winMsg.style.cssText = `
        text-align: center; padding: 20px;
        background: rgba(16, 185, 129, 0.08);
        border: 1px solid var(--subject-science);
        border-radius: 12px; margin-top: 16px;
        font-weight: 600; color: var(--subject-science);
      `;
      winMsg.textContent = `Felicidades! Completaste el juego en ${this.moves} movimientos!`;
      container.appendChild(winMsg);
    }
  },

  /* ---- Matching Game (Concepts) ---- */
  matching: {
    pairs: [],
    selectedItem: null,
    matchedCount: 0,
    column1: [],
    column2: [],

    datasets: {
      matematicas: {
        title: 'Conceptos Matematicos',
        pairs: [
          { left: 'Suma', right: '+' },
          { left: 'Resta', right: '-' },
          { left: 'Multiplicacion', right: 'x' },
          { left: 'Division', right: '/' },
          { left: 'Porcentaje', right: '%' },
          { left: 'Raiz cuadrada', right: 'sqrt' }
        ]
      },
      ciencias: {
        title: 'Ciencia y Naturaleza',
        pairs: [
          { left: 'Agua', right: 'H2O' },
          { left: 'Dioxido de carbono', right: 'CO2' },
          { left: 'Oxigeno', right: 'O2' },
          { left: 'Gravedad', right: '9.8 m/s2' },
          { left: 'Velocidad de la luz', right: '300,000 km/s' },
          { left: 'Numero de Avogadro', right: '6.022 x 10^23' }
        ]
      },
      ingles: {
        title: 'Ingles - Espanol',
        pairs: [
          { left: 'Hello', right: 'Hola' },
          { left: 'Goodbye', right: 'Adios' },
          { left: 'Thank you', right: 'Gracias' },
          { left: 'Please', right: 'Por favor' },
          { left: 'Friend', right: 'Amigo' },
          { left: 'School', right: 'Escuela' }
        ]
      }
    },

    init: function (containerId, subject) {
      const container = document.getElementById(containerId);
      if (!container) return;

      const data = this.datasets[subject] || this.datasets.matematicas;
      this.pairs = [...data.pairs];
      this.matchedCount = 0;
      this.selectedItem = null;

      this.column1 = this.shuffle([...this.pairs]);
      this.column2 = this.shuffle([...this.pairs]);

      this.render(container, data.title);
    },

    shuffle: function (arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    },

    render: function (container, title) {
      container.innerHTML = `
        <div class="game-card-header">
          <h3>Relacionar Conceptos</h3>
          <div style="font-size:0.875rem;">
            Completados: <strong id="matching-count">0/${this.pairs.length}</strong>
          </div>
        </div>
        <p style="font-size:0.875rem;color:var(--text-secondary);margin-bottom:16px;">
          ${title}: Selecciona un elemento de la izquierda y luego su par en la derecha.
        </p>
        <div class="matching-game">
          <div class="matching-column">
            <h4>Conceptos</h4>
            ${this.column1.map((p, i) => `
              <div class="matching-item ${p.matched ? 'matched' : ''}"
                   data-side="left" data-id="${i}" ${p.matched ? 'style="opacity:0.4"' : ''}>
                ${p.left}
              </div>
            `).join('')}
          </div>
          <div class="matching-column">
            <h4>Definiciones</h4>
            ${this.column2.map((p, i) => `
              <div class="matching-item ${p.matched ? 'matched' : ''}"
                   data-side="right" data-id="${i}" ${p.matched ? 'style="opacity:0.4"' : ''}>
                ${p.right}
              </div>
            `).join('')}
          </div>
        </div>
        <div style="text-align:center;">
          <button class="btn btn-secondary" onclick="Games.matching.init('matching-game', '${Object.keys(this.datasets).find(k => this.datasets[k].pairs.length === this.pairs.length) || 'matematicas'}')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px;"><path d="M1 4v6h6"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
            Reiniciar
          </button>
        </div>
      `;

      this.bindEvents(container);
    },

    bindEvents: function (container) {
      container.querySelectorAll('.matching-item:not(.matched)').forEach((el) => {
        el.addEventListener('click', () => this.handleClick(el, container));
      });
    },

    handleClick: function (el, container) {
      if (el.classList.contains('matched')) return;

      if (!this.selectedItem) {
        this.selectedItem = el;
        el.classList.add('selected');
        return;
      }

      const second = el;
      const first = this.selectedItem;

      if (first === second || first.dataset.side === second.dataset.side) {
        first.classList.remove('selected');
        this.selectedItem = null;
        return;
      }

      const leftEl = first.dataset.side === 'left' ? first : second;
      const rightEl = first.dataset.side === 'right' ? first : second;

      const leftText = leftEl.textContent.trim();
      const rightText = rightEl.textContent.trim();

      const isMatch = this.pairs.some(p =>
        p.left === leftText && p.right === rightText
      );

      if (isMatch) {
        this.pairs.forEach(p => {
          if (p.left === leftText && p.right === rightText) {
            p.matched = true;
          }
        });
        leftEl.classList.add('matched');
        rightEl.classList.add('matched');
        leftEl.classList.remove('selected');
        rightEl.classList.remove('selected');
        leftEl.style.opacity = '0.4';
        rightEl.style.opacity = '0.4';
        this.matchedCount++;
        document.getElementById('matching-count').textContent = `${this.matchedCount}/${this.pairs.length}`;

        if (this.matchedCount === this.pairs.length) {
          setTimeout(() => this.showMatchingWin(container), 500);
        }
      } else {
        first.classList.remove('selected');
        first.style.borderColor = 'var(--subject-history)';
        second.style.borderColor = 'var(--subject-history)';
        setTimeout(() => {
          first.style.borderColor = '';
          second.style.borderColor = '';
        }, 600);
      }

      this.selectedItem = null;
    },

    showMatchingWin: function (container) {
      const msg = document.createElement('div');
      msg.style.cssText = `
        text-align: center; padding: 16px; margin-top: 16px;
        background: rgba(16, 185, 129, 0.08);
        border: 1px solid var(--subject-science);
        border-radius: 12px; font-weight: 600;
        color: var(--subject-science);
      `;
      msg.textContent = 'Excelente! Completaste todas las relaciones!';
      container.appendChild(msg);
    }
  },

  /* ---- Quick Quiz Game ---- */
  quickQuiz: {
    questions: [
      { q: '2 + 2 = ?', options: ['3', '4', '5', '6'], answer: 1 },
      { q: 'Cual es el color del cielo?', options: ['Rojo', 'Verde', 'Azul', 'Amarillo'], answer: 2 },
      { q: 'Cuantos dias tiene una semana?', options: ['5', '6', '7', '8'], answer: 2 },
      { q: 'Cual es el resultado de 10 x 10?', options: ['50', '100', '150', '200'], answer: 1 },
      { q: 'Que estacion sigue al invierno?', options: ['Otono', 'Verano', 'Primavera', 'Invierno'], answer: 2 }
    ],
    currentQ: 0,
    score: 0,
    timeLeft: 15,
    timer: null,

    init: function (containerId) {
      const container = document.getElementById(containerId);
      if (!container) return;

      this.currentQ = 0;
      this.score = 0;
      this.timeLeft = 15;
      this.render(container);
      this.startTimer(container);
    },

    startTimer: function (container) {
      if (this.timer) clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.timeLeft--;
        const timerEl = document.getElementById('quick-timer');
        if (timerEl) timerEl.textContent = this.timeLeft;

        if (this.timeLeft <= 0) {
          clearInterval(this.timer);
          this.nextQuestion(container);
        }
      }, 1000);
    },

    render: function (container) {
      if (this.currentQ >= this.questions.length) {
        this.showQuickResult(container);
        return;
      }

      const q = this.questions[this.currentQ];

      container.innerHTML = `
        <div class="game-card-header">
          <h3>Preguntas Rapidas</h3>
          <div style="display:flex;gap:16px;font-size:0.875rem;">
            <span>Tiempo: <strong id="quick-timer">${this.timeLeft}</strong>s</span>
            <span>Puntaje: <strong>${this.score}</strong></span>
          </div>
        </div>
        <p style="font-size:0.875rem;color:var(--text-secondary);margin-bottom:16px;">
          Responde lo mas rapido posible. Tienes 15 segundos por pregunta.
        </p>
        <div class="quiz-question" style="border: 1px solid var(--border-color); border-radius: 12px; padding: 24px;">
          <h3 style="margin-bottom: 16px;">${q.q}</h3>
          <div class="quiz-options">
            ${q.options.map((opt, i) => `
              <button class="quiz-option" data-answer="${i}">
                <span class="quiz-option-letter">${String.fromCharCode(65 + i)}</span>
                <span>${opt}</span>
              </button>
            `).join('')}
          </div>
        </div>
        <div style="text-align:center;margin-top:16px;">
          <span style="font-size:0.875rem;color:var(--text-tertiary);">
            Pregunta ${this.currentQ + 1} de ${this.questions.length}
          </span>
        </div>
      `;

      container.querySelectorAll('.quiz-option').forEach((btn) => {
        btn.addEventListener('click', () => {
          const answer = parseInt(btn.dataset.answer);
          if (answer === q.answer) {
            this.score++;
            btn.classList.add('correct');
          } else {
            btn.classList.add('incorrect');
            container.querySelector(`.quiz-option[data-answer="${q.answer}"]`).classList.add('correct');
          }
          container.querySelectorAll('.quiz-option').forEach(b => b.disabled = true);
          clearInterval(this.timer);
          setTimeout(() => this.nextQuestion(container), 1000);
        });
      });
    },

    nextQuestion: function (container) {
      this.currentQ++;
      this.timeLeft = 15;
      if (this.currentQ < this.questions.length) {
        this.render(container);
        this.startTimer(container);
      } else {
        this.render(container);
      }
    },

    showQuickResult: function (container) {
      clearInterval(this.timer);
      const total = this.questions.length;
      container.innerHTML = `
        <div class="game-card-header">
          <h3>Preguntas Rapidas</h3>
          <span style="font-size:0.875rem;color:var(--accent-primary);font-weight:600;">
            Puntaje final: ${this.score}
          </span>
        </div>
        <div style="text-align:center;padding:32px;">
          <h3 style="font-size:1.5rem;margin-bottom:16px;">Juego terminado!</h3>
          <div style="font-size:3rem;font-weight:800;color:var(--accent-primary);margin-bottom:16px;">
            ${this.score}/${total}
          </div>
          <p style="color:var(--text-secondary);margin-bottom:24px;">
            Respondiste correctamente ${this.score} de ${total} preguntas.
          </p>
          <button class="btn btn-primary" onclick="Games.quickQuiz.init('quick-quiz-game')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px;"><path d="M1 4v6h6"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
            Jugar de nuevo
          </button>
        </div>
      `;
    }
  }
};
