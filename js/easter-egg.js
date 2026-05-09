// =====================================================================
// EASTER EGG — Clique no "G" de AGR → Confetes + Funcionário do Mês
// =====================================================================

(function () {
  'use strict';

  // ── Configuração da imagem do funcionário do mês ──────────────────
  const EMPLOYEE_IMG   = 'img/funcionario_mes.png';
  const EMPLOYEE_NAME  = 'Carlos Henrique';
  const EMPLOYEE_ROLE  = 'Operador de Estúdio';

  // ── Paleta de confetes ────────────────────────────────────────────
  const CONFETTI_COLORS = [
    '#f9a825','#e53935','#1e88e5','#43a047',
    '#8e24aa','#00acc1','#fb8c00','#d81b60',
    '#ffffff','#c6ff00'
  ];

  const TOTAL_CONFETTI = 180;
  let confettiActive   = false;
  let confettiPieces   = [];
  let animFrameId      = null;

  // ─────────────────────────────────────────────────────────────────
  // 1. Injeta o HTML do modal ao carregar a página
  // ─────────────────────────────────────────────────────────────────
  function injectModal () {
    const html = `
      <!-- Easter Egg Modal: Funcionário do Mês -->
      <div id="ee-overlay" aria-hidden="true"
           style="
             display:none; position:fixed; inset:0; z-index:9999;
             background:rgba(0,0,0,0.82); backdrop-filter:blur(6px);
             align-items:center; justify-content:center;
           ">

        <!-- Canvas dos confetes -->
        <canvas id="ee-canvas"
                style="position:fixed;inset:0;width:100%;height:100%;
                       pointer-events:none;z-index:10000;">
        </canvas>

        <!-- Card -->
        <div id="ee-card"
             style="
               position:relative; z-index:10001;
               background:linear-gradient(145deg,#1a1a1a,#111);
               border:2px solid #f9a825;
               border-radius:24px; padding:48px 44px 40px;
               text-align:center; max-width:600px; width:92%;
               opacity:0; transform:scale(0.7) translateY(40px);
               transition:opacity .55s cubic-bezier(.22,1,.36,1),
                          transform .55s cubic-bezier(.22,1,.36,1);
               box-shadow:0 0 80px rgba(249,168,37,.3);
             ">

          <!-- Badge topo -->
          <div style="
               position:absolute; top:-22px; left:50%; transform:translateX(-50%);
               background:linear-gradient(90deg,#f9a825,#fb8c00);
               color:#000; font-weight:900; font-size:11px; letter-spacing:3px;
               text-transform:uppercase; padding:6px 22px; border-radius:30px;
               box-shadow:0 4px 20px rgba(249,168,37,.5);
               white-space:nowrap;
          ">⭐ AGR Podcast Estúdios ⭐</div>

          <!-- Foto quadrada grande -->
          <div style="
               width:320px; height:320px;
               border-radius:16px; overflow:hidden;
               margin:16px auto 28px;
               border:4px solid #f9a825;
               box-shadow:0 0 50px rgba(249,168,37,.4);
               max-width:100%;
          ">
            <img src="${EMPLOYEE_IMG}" alt="Funcionário do Mês"
                 style="width:100%;height:100%;object-fit:cover;object-position:center top;">
          </div>

          <!-- Título grande -->
          <p style="
             font-size:13px; font-weight:700; letter-spacing:4px; text-transform:uppercase;
             color:#f9a825; margin:0 0 10px;
          ">Funcionário do Mês</p>

          <h2 style="
              font-size:clamp(30px,5vw,44px); font-weight:900;
              color:#fff; margin:0 0 8px; line-height:1.1;
              text-shadow:0 0 30px rgba(249,168,37,.6);
          ">${EMPLOYEE_NAME}</h2>

          <p style="
             font-size:16px; color:#aaa; margin:0 0 24px; font-weight:400;
          ">${EMPLOYEE_ROLE}</p>

          <!-- Estrelas decorativas -->
          <div style="font-size:28px; letter-spacing:8px; color:#f9a825; margin-bottom:0;">
            ★★★★★
          </div>

        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);

    document.getElementById('ee-overlay').addEventListener('click', function (e) {
      if (e.target === this) closeEasterEgg();
    });
    // Qualquer tecla do teclado fecha o modal
    document.addEventListener('keydown', function (e) {
      const overlay = document.getElementById('ee-overlay');
      if (overlay && overlay.style.display !== 'none') {
        closeEasterEgg();
      }
    });
  }

  // ─────────────────────────────────────────────────────────────────
  // ─────────────────────────────────────────────────────────────────
  // 2. Abrir o easter egg  (trigger via onclick no HTML)
  // ─────────────────────────────────────────────────────────────────
  function openEasterEgg () {
    const overlay = document.getElementById('ee-overlay');
    const card    = document.getElementById('ee-card');
    if (!overlay || !card) return;

    overlay.style.display = 'flex';
    // Força reflow antes de ativar transição
    void card.offsetWidth;
    card.style.opacity   = '1';
    card.style.transform = 'scale(1) translateY(0)';

    startConfetti();
  }
  // Expõe para o onclick direto no HTML
  window.openEasterEgg = openEasterEgg;


  // ─────────────────────────────────────────────────────────────────
  // 4. Fechar o easter egg
  // ─────────────────────────────────────────────────────────────────
  function closeEasterEgg () {
    const overlay = document.getElementById('ee-overlay');
    const card    = document.getElementById('ee-card');
    if (!overlay || !card) return;

    card.style.opacity   = '0';
    card.style.transform = 'scale(0.7) translateY(40px)';
    setTimeout(function () {
      overlay.style.display = 'none';
    }, 400);

    stopConfetti();
  }

  // ─────────────────────────────────────────────────────────────────
  // 5. Sistema de confetes
  // ─────────────────────────────────────────────────────────────────
  function startConfetti () {
    if (confettiActive) return;
    confettiActive = true;

    const canvas = document.getElementById('ee-canvas');
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    confettiPieces = [];
    for (let i = 0; i < TOTAL_CONFETTI; i++) {
      confettiPieces.push(createPiece(canvas.width, canvas.height, true));
    }

    animFrameId = requestAnimationFrame(function loop () {
      if (!confettiActive) return;
      tickConfetti();
      animFrameId = requestAnimationFrame(loop);
    });

    window.addEventListener('resize', onResize);
  }

  function stopConfetti () {
    confettiActive = false;
    if (animFrameId) {
      cancelAnimationFrame(animFrameId);
      animFrameId = null;
    }
    window.removeEventListener('resize', onResize);

    const canvas = document.getElementById('ee-canvas');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    confettiPieces = [];
  }

  function onResize () {
    const canvas = document.getElementById('ee-canvas');
    if (!canvas) return;
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createPiece (W, H, initial) {
    const size  = 8 + Math.random() * 10;
    return {
      x:       Math.random() * W,
      y:       initial ? (Math.random() * -H * 0.5) : (-size - Math.random() * 80),
      w:       size,
      h:       size * (0.3 + Math.random() * 0.5),
      color:   CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      speed:   2.5 + Math.random() * 3.5,
      angle:   Math.random() * Math.PI * 2,
      spin:    (Math.random() - 0.5) * 0.18,
      drift:   (Math.random() - 0.5) * 1.2,
      opacity: 0.75 + Math.random() * 0.25,
    };
  }

  function tickConfetti () {
    const canvas = document.getElementById('ee-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W   = canvas.width;
    const H   = canvas.height;

    ctx.clearRect(0, 0, W, H);

    confettiPieces.forEach(function (p, idx) {
      p.y     += p.speed;
      p.x     += p.drift;
      p.angle += p.spin;

      // Recicla quando sai da tela
      if (p.y > H + 20) {
        confettiPieces[idx] = createPiece(W, H, false);
        return;
      }

      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
      ctx.rotate(p.angle);

      // Alterna entre retângulo e elipse para variedade
      if (idx % 3 === 0) {
        ctx.beginPath();
        ctx.ellipse(0, 0, p.w / 2, p.h / 2, 0, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      } else {
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      }

      ctx.restore();
    });
  }

  // ─────────────────────────────────────────────────────────────────
  // 5. Init
  // ─────────────────────────────────────────────────────────────────
  function init () {
    injectModal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());
