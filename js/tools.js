/* ============================================
   TOOLS.JS - Interactive subject tools
   Multiplication tables, flashcards, etc.
   ============================================ */

const SubjectTools = {
  mathTable: function (containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    let selected = 5;
    const render = () => {
      const rows = [];
      for (let i = 1; i <= 12; i++) {
        const op = selected < 0 ? '÷' : '×';
        const a = Math.abs(selected);
        const result = selected < 0 ? a * i : selected * i;
        const display = selected < 0 ? `${a * i} ÷ ${a} = ${i}` : `${selected} × ${i} = ${result}`;
        rows.push(`<div class="tool-row">${display}</div>`);
      }
      el.innerHTML = `
        <div class="tool-math" style="text-align:center;">
          <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-bottom:16px;">
            ${[1,2,3,4,5,6,7,8,9,10,11,12].map(n =>
              `<button class="tool-btn ${selected === n ? 'tool-btn-active' : ''}" data-n="${n}">${n}</button>`
            ).join('')}
            <button class="tool-btn tool-btn-div ${selected === -3 ? 'tool-btn-active' : ''}" data-n="-3">÷3</button>
            <button class="tool-btn tool-btn-div ${selected === -4 ? 'tool-btn-active' : ''}" data-n="-4">÷4</button>
            <button class="tool-btn tool-btn-div ${selected === -6 ? 'tool-btn-active' : ''}" data-n="-6">÷6</button>
            <button class="tool-btn tool-btn-div ${selected === -7 ? 'tool-btn-active' : ''}" data-n="-7">÷7</button>
          </div>
          <div class="tool-table" style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;max-width:500px;margin:0 auto;">
            ${rows.join('')}
          </div>
        </div>
      `;
      el.querySelectorAll('.tool-btn').forEach(btn => {
        btn.addEventListener('click', () => { selected = parseInt(btn.dataset.n); render(); });
      });
    };
    render();
  },

  elementExplorer: function (containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const elements = [
      { symbol:'H', name:'Hidrógeno', num:1, mass:'1.008', cat:'No metal', desc:'Elemento más abundante del universo. Las estrellas lo convierten en helio mediante fusión nuclear.' },
      { symbol:'O', name:'Oxígeno', num:8, mass:'16.00', cat:'No metal', desc:'Esencial para la respiración. Constituye el 21% de la atmósfera y el 65% del cuerpo humano.' },
      { symbol:'C', name:'Carbono', num:6, mass:'12.01', cat:'No metal', desc:'Base de la vida. Todas las moléculas orgánicas contienen carbono. Forma diamantes y grafito.' },
      { symbol:'N', name:'Nitrógeno', num:7, mass:'14.01', cat:'No metal', desc:'Gas más abundante de la atmósfera (78%). Esencial para las proteínas y el ADN.' },
      { symbol:'Fe', name:'Hierro', num:26, mass:'55.85', cat:'Metal', desc:'Metal esencial para la sangre. El núcleo de la Tierra está hecho principalmente de hierro.' },
      { symbol:'Au', name:'Oro', num:79, mass:'197.0', cat:'Metal', desc:'Metal precioso usado desde la antigüedad. No se oxida y es muy maleable.' },
      { symbol:'Na', name:'Sodio', num:11, mass:'22.99', cat:'Metal alcalino', desc:'Reacciona violentamente con el agua. Esencial para el sistema nervioso. Está en la sal de mesa (NaCl).' },
      { symbol:'Ca', name:'Calcio', num:20, mass:'40.08', cat:'Metal alcalino', desc:'Fundamental para huesos y dientes. Regula la contracción muscular y la coagulación sanguínea.' },
    ];
    let selected = elements[0];
    const render = () => {
      el.innerHTML = `
        <div style="text-align:center;">
          <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-bottom:16px;">
            ${elements.map(e =>
              `<button class="tool-btn ${selected.symbol === e.symbol ? 'tool-btn-active' : ''}" data-sym="${e.symbol}">
                <strong>${e.symbol}</strong>
              </button>`
            ).join('')}
          </div>
          <div class="glass" style="padding:24px;border-radius:16px;max-width:400px;margin:0 auto;">
            <div style="font-size:3rem;font-weight:800;color:var(--subject-science);">${selected.symbol}</div>
            <div style="font-size:1.5rem;font-weight:700;margin:8px 0;">${selected.name}</div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;text-align:center;margin:16px 0;">
              <div class="glass" style="padding:12px;border-radius:12px;">
                <div style="font-size:var(--text-xs);color:var(--text-tertiary);">Número atómico</div>
                <div style="font-size:1.25rem;font-weight:700;">${selected.num}</div>
              </div>
              <div class="glass" style="padding:12px;border-radius:12px;">
                <div style="font-size:var(--text-xs);color:var(--text-tertiary);">Masa atómica</div>
                <div style="font-size:1.25rem;font-weight:700;">${selected.mass}</div>
              </div>
            </div>
            <div style="font-size:var(--text-sm);color:var(--text-secondary);margin-bottom:8px;">
              <strong>Categoría:</strong> ${selected.cat}
            </div>
            <p style="font-size:var(--text-sm);color:var(--text-tertiary);line-height:1.6;margin:0;">
              ${selected.desc}
            </p>
          </div>
        </div>
      `;
      el.querySelectorAll('[data-sym]').forEach(btn => {
        btn.addEventListener('click', () => {
          selected = elements.find(e => e.symbol === btn.dataset.sym) || elements[0];
          render();
        });
      });
    };
    render();
  },

  vocabCards: function (containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const words = [
      { word:'Beautiful', meaning:'Hermoso', example:'The sunset is beautiful.' },
      { word:'Fast', meaning:'Rápido', example:'The car is very fast.' },
      { word:'Important', meaning:'Importante', example:'Education is important.' },
      { word:'Delicious', meaning:'Delicioso', example:'This pizza is delicious.' },
      { word:'Difficult', meaning:'Difícil', example:'The exam was difficult.' },
      { word:'Interesting', meaning:'Interesante', example:'This book is interesting.' },
      { word:'Easy', meaning:'Fácil', example:'The exercise is easy.' },
      { word:'Strong', meaning:'Fuerte', example:'He is very strong.' },
    ];
    let idx = 0;
    let flipped = false;
    const render = () => {
      const w = words[idx];
      el.innerHTML = `
        <div style="text-align:center;">
          <div class="glass" style="padding:32px;border-radius:20px;max-width:400px;margin:0 auto;cursor:pointer;min-height:200px;display:flex;flex-direction:column;justify-content:center;" id="vocab-card">
            <div style="font-size:2rem;font-weight:800;color:${flipped ? 'var(--subject-english)' : 'var(--accent-primary)'};margin-bottom:12px;">
              ${flipped ? w.meaning : w.word}
            </div>
            ${flipped ? `<p style="color:var(--text-tertiary);font-style:italic;margin:0;">"${w.example}"</p>` : '<p style="color:var(--text-tertiary);font-size:var(--text-sm);margin:0;">Toca para ver significado</p>'}
          </div>
          <div style="display:flex;gap:12px;justify-content:center;margin-top:16px;">
            <button class="tool-btn" id="vocab-prev">← Anterior</button>
            <button class="tool-btn" id="vocab-flip">🔄 Girar</button>
            <button class="tool-btn" id="vocab-next">Siguiente →</button>
          </div>
          <div style="margin-top:8px;font-size:var(--text-sm);color:var(--text-tertiary);">${idx+1} de ${words.length}</div>
        </div>
      `;
      document.getElementById('vocab-card').addEventListener('click', () => { flipped = !flipped; render(); });
      document.getElementById('vocab-prev').addEventListener('click', () => { idx = (idx - 1 + words.length) % words.length; flipped = false; render(); });
      document.getElementById('vocab-next').addEventListener('click', () => { idx = (idx + 1) % words.length; flipped = false; render(); });
      document.getElementById('vocab-flip').addEventListener('click', () => { flipped = !flipped; render(); });
    };
    render();
  },

  historyTimeline: function (containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const events = [
      { year:'3500 a.C.', title:'Invención de la escritura', desc:'Los sumerios desarrollan la escritura cuneiforme, marcando el fin de la prehistoria.' },
      { year:'776 a.C.', title:'Primeros Juegos Olímpicos', desc:'Se celebran en Olimpia, Grecia, en honor al dios Zeus.' },
      { year:'27 a.C.', title:'Imperio Romano', desc:'Augusto se convierte en el primer emperador romano. Inicia la Pax Romana.' },
      { year:'476 d.C.', title:'Caída del Imperio Romano', desc:'El rey germánico Odoacro depone al último emperador romano. Inicia la Edad Media.' },
      { year:'1492', title:'Descubrimiento de América', desc:'Cristóbal Colón llega a América, conectando dos mundos.' },
      { year:'1776', title:'Independencia de EE.UU.', desc:'Las 13 colonias declaran su independencia de Inglaterra.' },
      { year:'1914', title:'Primera Guerra Mundial', desc:'Comienza la Gran Guerra que cambió el mapa de Europa.' },
      { year:'1969', title:'Llegada a la Luna', desc:'Neil Armstrong camina sobre la Luna. "Un pequeño paso para el hombre..."' },
      { year:'1989', title:'Caída del Muro de Berlín', desc:'Cae el Muro de Berlín, simbolizando el fin de la Guerra Fría.' },
    ];
    let idx = 0;
    const render = () => {
      const e = events[idx];
      el.innerHTML = `
        <div style="text-align:center;">
          <div style="position:relative;height:6px;background:var(--border-color);border-radius:3px;margin:40px 20px;">
            <div style="position:absolute;left:${(idx/(events.length-1))*100}%;top:50%;transform:translate(-50%,-50%);width:20px;height:20px;border-radius:50%;background:var(--subject-history);border:3px solid var(--bg-primary);transition:left 0.4s cubic-bezier(0.25,0.46,0.45,0.94);"></div>
          </div>
          <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-bottom:24px;">
            ${events.map((ev,i) =>
              `<button class="tool-btn ${i===idx?'tool-btn-active':''}" data-idx="${i}">${ev.year}</button>`
            ).join('')}
          </div>
          <div class="glass" style="padding:24px;border-radius:16px;max-width:500px;margin:0 auto;">
            <div style="font-size:2rem;font-weight:800;color:var(--subject-history);margin-bottom:4px;">${e.year}</div>
            <h4 style="margin:8px 0;font-size:1.25rem;">${e.title}</h4>
            <p style="color:var(--text-tertiary);line-height:1.6;margin:0;">${e.desc}</p>
          </div>
        </div>
      `;
      el.querySelectorAll('[data-idx]').forEach(btn => {
        btn.addEventListener('click', () => { idx = parseInt(btn.dataset.idx); render(); });
      });
    };
    render();
  },

  valuesWheel: function (containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const values = [
      { name:'Honestidad', icon:'🤝', desc:'Ser sincero con los demás y contigo mismo. Decir la verdad aunque sea difícil. La honestidad construye confianza.' },
      { name:'Respeto', icon:'🙏', desc:'Tratar a los demás como quieres que te traten. Valorar las opiniones, creencias y sentimientos de otros aunque sean diferentes.' },
      { name:'Responsabilidad', icon:'💪', desc:'Cumplir con tus deberes y obligaciones. Asumir las consecuencias de tus actos, tanto buenas como malas.' },
      { name:'Solidaridad', icon:'🤲', desc:'Ayudar a quienes lo necesitan sin esperar nada a cambio. Trabajar juntos por el bien común.' },
      { name:'Justicia', icon:'⚖️', desc:'Dar a cada quien lo que le corresponde. Defender la igualdad de derechos y oportunidades para todos.' },
      { name:'Empatía', icon:'❤️', desc:'Ponerse en el lugar del otro. Comprender sus sentimientos y necesidades. Escuchar con el corazón.' },
    ];
    let idx = 0;
    const render = () => {
      const v = values[idx];
      el.innerHTML = `
        <div style="text-align:center;">
          <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-bottom:20px;">
            ${values.map((val,i) =>
              `<button class="tool-btn ${i===idx?'tool-btn-active':''}" data-idx="${i}">${val.icon} ${val.name}</button>`
            ).join('')}
          </div>
          <div class="glass" style="padding:28px;border-radius:20px;max-width:450px;margin:0 auto;">
            <div style="font-size:3rem;margin-bottom:8px;">${v.icon}</div>
            <h4 style="font-size:1.5rem;margin:8px 0;color:var(--subject-ethics);">${v.name}</h4>
            <p style="color:var(--text-secondary);line-height:1.7;margin:12px 0 0;">${v.desc}</p>
          </div>
        </div>
      `;
      el.querySelectorAll('[data-idx]').forEach(btn => {
        btn.addEventListener('click', () => { idx = parseInt(btn.dataset.idx); render(); });
      });
    };
    render();
  },

  verbTrainer: function (containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const verbs = [
      { inf:'Hablar', yo:'hablo', tu:'hablas', el:'habla', nosotros:'hablamos', ellos:'hablan' },
      { inf:'Comer', yo:'como', tu:'comes', el:'come', nosotros:'comemos', ellos:'comen' },
      { inf:'Vivir', yo:'vivo', tu:'vives', el:'vive', nosotros:'vivimos', ellos:'viven' },
      { inf:'Ser', yo:'soy', tu:'eres', el:'es', nosotros:'somos', ellos:'son' },
      { inf:'Estar', yo:'estoy', tu:'estás', el:'está', nosotros:'estamos', ellos:'están' },
      { inf:'Tener', yo:'tengo', tu:'tienes', el:'tiene', nosotros:'tenemos', ellos:'tienen' },
    ];
    let idx = 0;
    const render = () => {
      const v = verbs[idx];
      el.innerHTML = `
        <div style="text-align:center;">
          <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-bottom:16px;">
            ${verbs.map((verb,i) =>
              `<button class="tool-btn ${i===idx?'tool-btn-active':''}" data-idx="${i}">${verb.inf}</button>`
            ).join('')}
          </div>
          <div class="glass" style="padding:24px;border-radius:16px;max-width:450px;margin:0 auto;">
            <div style="font-size:1.5rem;font-weight:800;color:var(--subject-espanol);margin-bottom:16px;">Presente de <em>${v.inf}</em></div>
            <div style="display:grid;gap:8px;text-align:left;">
              <div style="display:flex;justify-content:space-between;padding:8px 12px;background:var(--bg-secondary);border-radius:8px;"><strong>Yo</strong> <span>${v.yo}</span></div>
              <div style="display:flex;justify-content:space-between;padding:8px 12px;background:var(--bg-secondary);border-radius:8px;"><strong>Tú</strong> <span>${v.tu}</span></div>
              <div style="display:flex;justify-content:space-between;padding:8px 12px;background:var(--bg-secondary);border-radius:8px;"><strong>Él/Ella</strong> <span>${v.el}</span></div>
              <div style="display:flex;justify-content:space-between;padding:8px 12px;background:var(--bg-secondary);border-radius:8px;"><strong>Nosotros</strong> <span>${v.nosotros}</span></div>
              <div style="display:flex;justify-content:space-between;padding:8px 12px;background:var(--bg-secondary);border-radius:8px;"><strong>Ellos</strong> <span>${v.ellos}</span></div>
            </div>
            <p style="font-size:var(--text-xs);color:var(--text-tertiary);margin-top:12px;">Verbo ${idx < 3 ? 'regular' : 'irregular'} terminación ${v.inf.slice(-2)}</p>
          </div>
        </div>
      `;
      el.querySelectorAll('[data-idx]').forEach(btn => {
        btn.addEventListener('click', () => { idx = parseInt(btn.dataset.idx); render(); });
      });
    };
    render();
  }
};
