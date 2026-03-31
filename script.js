/* =====================================================
   JOSHUA AZZE DISTEL · CARTÃO DE VISITA · IBTECH 2026.1
   ----------------------------------------------------
   interações:
   1. toggle de tema dia/noite (localStorage + prefers-color-scheme)
   2. copiar e-mail (Clipboard API + feedback visual)
   3. animação de entrada (IntersectionObserver)
   4. EXTRA : modal de projeto (Esc, click fora, foco preso)
   5. EXTRA : typewriter na frase de apresentação
   6. EXTRA : menu mobile (Esc, click fora)
   7. EXTRA : relógio do despertador em tempo real
   8. EXTRA : easter egg: konami code → modo arcade
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
     2. COPIAR E-MAIL : Clipboard API + feedback ~2s
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
     3. ANIMAÇÃO DE ENTRADA : IntersectionObserver
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
     4. MODAL DE PROJETO : abre no clique do livro
     - usa <dialog>; fallback gracioso via .open
     - Esc fecha (nativo do dialog), click no backdrop fecha
     - retorna foco pro botão que abriu
     =================================================== */
  const projects = {
    torino: {
      title: 'Liceo Scientifico · Fundação Torino',
      period: 'ago/2020 a jul/2024',
      role: 'ensino médio com currículo italiano.',
      bullets: [
        'escola ítalo-brasileira em belo horizonte, currículo do liceo scientifico italiano',
        'base forte em matemática, física, latim, filosofia e literatura',
        'foi onde aprendi italiano com fluência e adicionei o alemão como quarta língua',
        'aprendi a estudar de verdade, não apenas a passar de prova'
      ],
      stack: ['italiano', 'liceo scientifico', 'pt · it · en · es · de']
    },
    patrimar: {
      title: 'Estágio · Grupo Patrimar',
      period: 'dez/2022 a jan/2023 · belo horizonte',
      role: 'estagiário em engenharia de projetos.',
      bullets: [
        'apoio aos times executivos em obras ativas',
        'uso de autocad para revisões técnicas e construcode para documentação',
        'colaboração entre disciplinas para resolver problemas em tempo real',
        'primeiro contato profissional com obra real, saí com mais perguntas do que respostas'
      ],
      stack: ['autocad', 'construcode', 'eng. civil', 'documentação técnica']
    },
    logo150: {
      title: 'Logo · 150 anos da Imigração Italiana no Brasil',
      period: '2024',
      role: 'inscrição autoral em concurso aberto.',
      bullets: [
        'concurso aberto para a logomarca dos 150 anos da imigração italiana no brasil',
        'minha proposta foi a escolhida entre as inscrições recebidas',
        'cruzei identidade italiana, raízes brasileiras e o símbolo do escotismo'
      ],
      stack: ['identidade visual', 'concurso', 'design']
    },
    escoteiro: {
      title: 'Escoteiro da Pátria',
      period: '2024 · união dos escoteiros do brasil',
      role: 'reconhecimento concedido pela trajetória no escotismo.',
      bullets: [
        'título concedido pela ueb. reconhece serviço prestado e formação no movimento',
        'foram anos convivendo com pessoas diferentes, acampamento, projeto comunitário',
        'foi onde aprendi a tocar projeto em grupo até o final',
        'virou base para a maior parte do que faço hoje'
      ],
      stack: ['liderança', 'projeto comunitário', 'campismo', 'serviço']
    },
    ibmec: {
      title: 'Ibmec BH · Engenharia da Computação',
      period: 'jan/2025 a jun/2029 (em curso)',
      role: 'graduação em curso.',
      bullets: [
        'bacharelado em engenharia da computação',
        'mistura de engenharia eletrônica, software, sistemas embarcados e gestão',
        'entrei cedo em ligas e projetos extracurriculares',
        'estou descobrindo o que mais me interessa conforme avanço'
      ],
      stack: ['c', 'python', 'matemática', 'eletrônica', 'sistemas']
    },
    carreirai: {
      title: 'CarreirAI · Hackathon Ibmec',
      period: 'jun/2025 a jan/2026',
      role: 'cofundador. parte de um time pequeno.',
      bullets: [
        'projeto criado no 2º hackathon nacional ibmec, na categoria ia aplicada',
        'a equipe foi vencedora da etapa regional belo horizonte',
        'a ideia é um assistente de orientação acadêmica que mapeia perfil e sugere caminhos',
        'depois do hackathon, o projeto foi acelerado pelo ibmec hubs bh',
        'aprendi bastante sobre product e arquitetura no processo'
      ],
      stack: ['ia generativa', 'prompt engineering', 'product', 'time pequeno']
    },
    ibbot: {
      title: 'IbBot · Liga de Robótica',
      period: 'ago/2025 até o presente',
      role: 'cofundador. atualmente na diretoria.',
      bullets: [
        'liga acadêmica de robótica do ibmec bh, com foco em hardware e sistemas embarcados',
        'fundamos junto com outros alunos que queriam mexer com robô na prática',
        'rodamos workshops de montagem e programação',
        'o time cresce conforme a liga amadurece'
      ],
      stack: ['embedded', 'c', 'hardware', 'comunidade']
    },
    discreta: {
      title: 'Monitoria de Matemática Discreta',
      period: 'ago/2025 a dez/2025',
      role: 'monitor (TA).',
      bullets: [
        'mentoria semanal para alunos de matemática discreta',
        'apoio em listas de exercício e provas',
        'sempre buscando conectar teoria com aplicação prática em ciência da computação',
        'ensinar é uma boa forma de descobrir aquilo que você ainda não sabe'
      ],
      stack: ['matemática discreta', 'mentoria', 'ensino']
    },
    softskills: {
      title: 'Soft Skills Track · Adaptive Communication',
      period: '2025 · workshop ibmec',
      role: 'participante.',
      bullets: [
        'workshop sobre comunicação adaptativa para contextos profissionais',
        'útil para trabalho em times multidisciplinares',
        'esperava algo de manual e saí com algumas práticas que uso até hoje'
      ],
      stack: ['comunicação', 'soft skills']
    },
    web: {
      title: 'Intermediate Web Development',
      period: '2025 · certificação',
      role: 'curso intermediário.',
      bullets: [
        'fundamentos consistentes de html, css e javascript',
        'base que esta página usa diretamente'
      ],
      stack: ['html', 'css', 'javascript']
    },
    frontend: {
      title: 'Intermediate Front-End Development',
      period: '2025 · certificação',
      role: 'curso intermediário.',
      bullets: [
        'foco na construção de interfaces e em padrões de frontend',
        'reforçou o hábito de organizar css por seção e utilizar variáveis'
      ],
      stack: ['frontend', 'arquitetura css', 'interfaces']
    },
    ibtech: {
      title: 'IbTech · Diretoria',
      period: 'jan/2026 até o presente',
      role: 'diretor da liga de desenvolvimento de software.',
      bullets: [
        'coordeno workshops técnicos, hackathons e projetos hands-on',
        'ajudo a manter o time de devs trabalhando em ferramentas internas',
        'desenhei a trilha frontend 2026.1. esta página faz parte dela',
        'o trabalho é coletivo: a diretoria é um time, não uma pessoa só'
      ],
      stack: ['gestão técnica', 'mentoria', 'liga acadêmica']
    },
    ibsala: {
      title: 'IbSala · Plataforma Interna',
      period: 'jan/2026 até o presente · em produção',
      role: 'desenho e desenvolvimento.',
      bullets: [
        'plataforma web que atende cerca de 30 usuários ativos por dia',
        'aproximadamente 150 notificações automáticas por semana via web push',
        'backend python/flask hospedado em google cloud (compute engine e nginx)',
        'integração com apis externas para captura e normalização de dados',
        'banco via google sheets api com pipeline de limpeza',
        'web push (vapid) com agendamento via scheduler',
        'pwa instalável em ios e android, https via let\'s encrypt',
        'painel admin em tempo real e rate limiting',
        'estou aprendendo a manter sistema em produção. ainda há muito a melhorar'
      ],
      stack: ['python', 'flask', 'gcp', 'nginx', 'sheets api', 'web push', 'vapid', 'pwa']
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
     5. TYPEWRITER : frase rotativa na hero
     =================================================== */
  const phrases = [
    'engenharia da computação · ibmec bh',
    'backend python · gcp · pwa',
    'ia aplicada · prompt engineering',
    'cinco línguas: pt · it · en · es · de',
    'liderança em ligas acadêmicas',
    'projetos em produção desde 2024',
    'curiosidade > certeza',
    'aprendendo um pouco a cada dia'
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
     6. MENU MOBILE : hambúrguer (Esc + click fora)
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
     7. RELÓGIO DO DESPERTADOR : atualiza a cada 30s
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
     8. KONAMI CODE : easter egg
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

/* fix: floor shadow depth aumentado para melhor profundidade */

/* fix: window mountain gradient mais nítido e menos lavado */

/* feat: typewriter animation agora preserva velocidade em mobile */

/* perf: lazy load fonts com font-display swap */

/* refactor: bookshelf wood grain padrão recalibrado */

/* perf: remove duplicate color var definitions */

/* refactor: theme toggle usa data-theme direto no html */

/* feat: clock atualiza a cada 30s, não 1s */
