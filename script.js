/* =====================================================
   JOSHUA AZZE DISTEL · CARTÃO DE VISITA · IBTECH 2026.1
   ----------------------------------------------------
   interações:
   1. toggle de tema dia/noite (localStorage + prefers-color-scheme)
   2. copiar e-mail (Clipboard API + feedback visual)
   3. animação de entrada (IntersectionObserver)
   4. EXTRA — modal de projeto (Esc, click fora, foco preso)
   5. EXTRA — typewriter na frase de apresentação
   6. EXTRA — menu mobile (Esc, click fora)
   7. EXTRA — relógio do despertador em tempo real
   8. EXTRA — easter egg: konami code → modo arcade
   ===================================================== */
(() => {
  'use strict';

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* ===================================================
     1. TOGGLE DE TEMA DIA / NOITE
     - lê preferência salva, senão usa prefers-color-scheme
     - troca apenas o atributo data-theme; o CSS faz o resto via variáveis
     - persiste no localStorage
     =================================================== */
  const THEME_KEY = 'ibtech-projeto01-theme';
  const root = document.documentElement;
  const themeBtn = $('#themeToggle');
  const liveRegion = $('#liveRegion');

  const announce = (msg) => {
    if (!liveRegion) return;
    liveRegion.textContent = '';
    setTimeout(() => { liveRegion.textContent = msg; }, 30);
  };

  const applyTheme = (theme) => {
    root.setAttribute('data-theme', theme);
    if (themeBtn) themeBtn.setAttribute('aria-pressed', String(theme === 'night'));
  };

  const initTheme = () => {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'day' || saved === 'night') {
      applyTheme(saved);
      return;
    }
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'night' : 'day');
  };

  themeBtn?.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'night' ? 'day' : 'night';
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
    announce(`tema ${next === 'night' ? 'noturno' : 'diurno'} ativado`);
  });

  // se o usuário ainda não escolheu manualmente, segue o sistema operacional
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (localStorage.getItem(THEME_KEY)) return;
    applyTheme(e.matches ? 'night' : 'day');
  });

  initTheme();


  /* ===================================================
     2. COPIAR E-MAIL — Clipboard API + feedback ~2s
     - fallback pra navegadores antigos (textarea + execCommand)
     - feedback visual e anúncio pra leitor de tela
     =================================================== */
  const copyBtn = $('#copyEmailBtn');

  const fallbackCopy = (text) => {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'absolute';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch { /* sem-op */ }
    document.body.removeChild(ta);
  };

  copyBtn?.addEventListener('click', async () => {
    const text = copyBtn.dataset.copy ?? '';
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        fallbackCopy(text);
      }
      copyBtn.classList.add('is-copied');
      announce('e-mail copiado');
      setTimeout(() => copyBtn.classList.remove('is-copied'), 2000);
    } catch (err) {
      copyBtn.querySelector('.copy-btn__label').textContent = 'falhou';
      announce('não foi possível copiar');
    }
  });


  /* ===================================================
     3. ANIMAÇÃO DE ENTRADA — IntersectionObserver
     - dispara uma vez por elemento (.reveal → .is-visible)
     - se IntersectionObserver não existir, mostra tudo
     =================================================== */
  const reveals = $$('.reveal');

  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      }
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-visible'));
  }


  /* ===================================================
     4. MODAL DE PROJETO — abre no clique do livro
     - usa <dialog>; fallback gracioso via .open
     - Esc fecha (nativo do dialog), click no backdrop fecha
     - retorna foco pro botão que abriu
     =================================================== */
  const projects = {
    ibsala: {
      title: 'IbSala — Plataforma Interna',
      period: 'jan/2026 → presente · em produção',
      role: 'designer + dev solo. python/flask + gcp + pwa.',
      bullets: [
        '30+ usuários ativos diários, ~150 push automáticos por semana',
        'backend python/flask hospedado em google cloud (compute engine + nginx)',
        'integração com apis externas pra captura e normalização de dados',
        'database via google sheets api com pipeline de limpeza',
        'web push (vapid) com agendamento via scheduler',
        'pwa instalável em ios e android, https com let\'s encrypt',
        'painel admin em tempo real, rate limiting'
      ],
      stack: ['python', 'flask', 'gcp', 'nginx', 'sheets api', 'web push', 'vapid', 'pwa']
    },
    carreirai: {
      title: 'CarreirAI — Assistente de Carreira',
      period: 'jun/2025 → jan/2026 · acelerada no ibmec hubs bh',
      role: 'co-fundador. arquitetura técnica + direção de produto.',
      bullets: [
        'vencedora do hackathon nacional ibmec — categoria ia aplicada (regional bh)',
        'mapeia perfil do estudante e gera recomendações personalizadas',
        'streamline do processo de orientação acadêmica',
        'aceleração subsequente pelo programa ibmec hubs bh'
      ],
      stack: ['ia generativa', 'prompt engineering', 'arquitetura', 'product']
    },
    ibbot: {
      title: 'IbBot — Liga de Robótica',
      period: 'ago/2025 → presente',
      role: 'co-fundador & diretor.',
      bullets: [
        'liga acadêmica de robótica do ibmec bh',
        'foco em integração de hardware e sistemas embarcados',
        'workshops hands-on de montagem e programação de robôs',
        'time crescente de estudantes-engenheiros'
      ],
      stack: ['embedded', 'c', 'hardware', 'liderança técnica']
    },
    ibtech: {
      title: 'IbTech — Diretoria',
      period: 'jan/2026 → presente',
      role: 'diretor da liga acadêmica de desenvolvimento de software.',
      bullets: [
        'coordeno workshops técnicos, hackathons e projetos hands-on',
        'gerencio time de devs em ferramentas internas e projetos de extensão',
        'conecto estudantes a desafios reais de engenharia',
        'desenhei a trilha frontend 2026.1 (este projeto faz parte dela)'
      ],
      stack: ['gestão técnica', 'mentoria', 'arquitetura de currículo']
    },
    logo150: {
      title: 'Logo · 150 anos da Imigração Italiana',
      period: '2024 · vencedor nacional',
      role: 'designer.',
      bullets: [
        'concurso aberto pra logomarca dos 150 anos da imigração italiana no brasil',
        'inscrição vencedora — escolhida entre dezenas de propostas',
        'cruzamento entre identidade italiana, raízes brasileiras e símbolo do escotismo'
      ],
      stack: ['identidade visual', 'concurso', 'branding']
    }
  };

  const modal       = $('#projectModal');
  const modalTitle  = $('#modalTitle');
  const modalPeriod = $('#modalPeriod');
  const modalRole   = $('#modalRole');
  const modalBullets= $('#modalBullets');
  const modalStack  = $('#modalStack');
  const modalClose  = $('#modalClose');
  let lastTrigger = null;

  const openProject = (key, trigger) => {
    const p = projects[key];
    if (!p || !modal) return;
    lastTrigger = trigger ?? null;
    modalTitle.textContent  = p.title;
    modalPeriod.textContent = p.period;
    modalRole.textContent   = p.role;
    modalBullets.innerHTML  = p.bullets.map(b => `<li>${b}</li>`).join('');
    modalStack.innerHTML    = p.stack.map(s => `<li>${s}</li>`).join('');
    if (typeof modal.showModal === 'function') {
      modal.showModal();
    } else {
      modal.setAttribute('open', '');
    }
  };

  const closeProject = () => {
    if (!modal) return;
    if (typeof modal.close === 'function') {
      modal.close();
    } else {
      modal.removeAttribute('open');
    }
    lastTrigger?.focus();
  };

  $$('.book[data-project]').forEach(btn => {
    btn.addEventListener('click', () => openProject(btn.dataset.project, btn));
  });

  modalClose?.addEventListener('click', closeProject);

  // click no backdrop fecha (somente quando o click cai fora do .modal__inner)
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeProject();
  });


  /* ===================================================
     5. TYPEWRITER — frase rotativa na hero
     =================================================== */
  const phrases = [
    'computer engineering · ai · robotics',
    'backend · gcp · pwa · web push',
    'vibe coding desde 2024',
    'pt · it · en · es · de'
  ];
  const target = $('#typewriter');
  let pIdx = 0, cIdx = 0, deleting = false;

  const tick = () => {
    if (!target) return;
    const current = phrases[pIdx];
    if (!deleting) {
      cIdx++;
      target.textContent = current.slice(0, cIdx);
      if (cIdx === current.length) {
        deleting = true;
        setTimeout(tick, 1800);
        return;
      }
      setTimeout(tick, 60);
    } else {
      cIdx--;
      target.textContent = current.slice(0, cIdx);
      if (cIdx === 0) {
        deleting = false;
        pIdx = (pIdx + 1) % phrases.length;
        setTimeout(tick, 240);
        return;
      }
      setTimeout(tick, 28);
    }
  };
  tick();


  /* ===================================================
     6. MENU MOBILE — hambúrguer (Esc + click fora)
     =================================================== */
  const navToggle = $('.nav-toggle');
  const navList   = $('#nav-list');
  const closeMenu = () => {
    navToggle?.setAttribute('aria-expanded', 'false');
  };
  navToggle?.addEventListener('click', () => {
    const open = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!open));
  });
  navList?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('click', (e) => {
    if (!navToggle || !navList) return;
    if (navToggle.getAttribute('aria-expanded') !== 'true') return;
    if (e.target === navToggle || navToggle.contains(e.target)) return;
    if (navList.contains(e.target)) return;
    closeMenu();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });


  /* ===================================================
     7. RELÓGIO DO DESPERTADOR — atualiza a cada 30s
     =================================================== */
  const clockEl = $('#clockDigits');
  const updateClock = () => {
    if (!clockEl) return;
    const d = new Date();
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    clockEl.textContent = `${hh}:${mm}`;
  };
  updateClock();
  setInterval(updateClock, 30000);


  /* ===================================================
     8. KONAMI CODE — easter egg
     ↑ ↑ ↓ ↓ ← → ← → b a → modo arcade (scanlines + shake)
     =================================================== */
  const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown',
                  'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let buf = [];
  document.addEventListener('keydown', (e) => {
    buf.push(e.key);
    if (buf.length > KONAMI.length) buf.shift();
    const match = buf.length === KONAMI.length &&
                  buf.every((k, i) => k.toLowerCase() === KONAMI[i].toLowerCase());
    if (match) {
      document.body.classList.toggle('is-arcade');
      announce(document.body.classList.contains('is-arcade')
        ? 'modo arcade ativado' : 'modo arcade desativado');
      buf = [];
    }
  });

})();
