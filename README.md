# ibtech-projeto01-joshua

> **Joshua Azze Distel** — IbTech · Trilha Frontend · Projeto 01 · 2026.1

Cartão de visita pessoal feito em **HTML, CSS e JavaScript puros**. Sem framework, sem template, sem build. Vanilla.

A página é **um quarto de chalé pixelado em primeira pessoa**. Você está dentro, olhando para a parede. Cada seção é uma parte do quarto:

| # | Parte do quarto      | O que tem ali                                           |
|---|----------------------|---------------------------------------------------------|
| 00| Janela               | Vista das montanhas. Apresentação, frase rotativa.      |
| 01| Mesa de estudos      | Monitor com terminal mostrando `whoami`. Sobre, skills. |
| 02| Mural                | Quadro de cortiça com 3 polaroides + TV CRT com vídeo.  |
| 03| Prateleira           | Cada livro é um projeto (clica pra abrir). Troféu.      |
| 04| Mesa de cabeceira    | Luminária, despertador real, contato + copiar e-mail.   |

A estética é inspirada em jogos pixelados como **Tuber Simulator (PewDiePie)** — cores chunky, sombras sólidas, fonte `Press Start 2P` no display e `VT323` no terminal/relógio. O ponto de vista é de quem está **dentro** do quarto.

---

## Stack

- **HTML5** — semântico (`header`, `main`, `nav`, `section`, `article`, `footer`), Open Graph configurado, `<dialog>` nativo para o modal.
- **CSS3** — variáveis CSS para paleta/tipografia/espaçamento, Flexbox + Grid no layout, `image-rendering: pixelated`, dois temas (dia/noite) operando só por troca de variáveis.
- **JavaScript vanilla (ES2022)** — Clipboard API, `IntersectionObserver`, `<dialog>.showModal()`, `localStorage`, `matchMedia('prefers-color-scheme')`.
- **Google Fonts** — `Press Start 2P`, `VT323`, `Inter`.

Sem Bootstrap, Tailwind, jQuery, React, Vue, Svelte, Astro ou qualquer outra coisa. Zero dependências.

---

## Interações JavaScript

**Obrigatórias:**
1. **Toggle de tema dia/noite** — botão no canto superior direito. Troca apenas variáveis CSS na raiz, persiste em `localStorage`, respeita `prefers-color-scheme` na primeira visita.
2. **Copiar e-mail** — Clipboard API (com fallback `execCommand`) e feedback visual `copiado!` por 2 segundos.
3. **Animação de entrada** — `IntersectionObserver` aplica `.is-visible` em cada seção uma única vez quando ela entra no viewport (não escuta `scroll`).

**Extras:**
4. **Modal de projeto** — `<dialog>` nativo, abre ao clicar nos livros da prateleira; fecha com `Esc`, com `×`, ou com clique no backdrop. Foco volta pro botão original.
5. **Typewriter** — frase rotativa na hero, escrevendo e apagando 4 frases.
6. **Menu mobile (hambúrguer)** — fecha com `Esc`, clique fora ou ao escolher um link.
7. **Despertador** — relógio digital de verdade no criado-mudo, atualiza a cada 30s.
8. **Easter egg** — Konami code (`↑ ↑ ↓ ↓ ← → ← → b a`) ativa modo arcade com scanlines + shake.

---

## Como rodar

Abra `index.html` no navegador. Funciona offline. Não precisa servidor.

Se quiser servir localmente (recomendado pro modal `<dialog>` em alguns navegadores antigos):

```bash
# qualquer um destes serve:
python3 -m http.server 8000
# ou
npx serve .
```

E acesse `http://localhost:8000`.

---

## Estrutura

```
ibtech-projeto01-joshua/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── favicon.svg
    ├── avatar.svg
    ├── og-image.svg
    ├── polaroid-1.svg   (escoteiro da pátria)
    ├── polaroid-2.svg   (vibe coding)
    └── polaroid-3.svg   (fundação torino)
```

---

## Acessibilidade

- `lang="pt-BR"`, hierarquia de títulos respeitada (1 `h1` na hero, `h2` em cada seção).
- Todas as imagens com `alt` descritivo (não "imagem" — descreve o conteúdo).
- Foco visível em todos os elementos interativos (`:focus-visible` com outline mel sobre o pixel art).
- `aria-live` em região para anúncios de cópia e troca de tema.
- `prefers-reduced-motion` respeitado (anula animações).
- Skip-link no topo.
- Links externos com `rel="noopener noreferrer"` e `target="_blank"`.

---

## Responsividade

Funciona de **360px a 1920px+**. Breakpoints em `900px` (tablet) e `600px` (mobile). Em telas largas (`>=1400px` e `>=1920px`) o conteúdo respira sem virar uma faixa esquecida.

---

## Decisões

- **Pixel art em SVG inline + CSS**, não imagens raster. Ganho: escala perfeita em qualquer DPI, peso baixíssimo, e theming com variáveis.
- **`<dialog>` nativo** em vez de modal montado na unha — Esc, foco e backdrop saem de graça.
- **Dois temas via variáveis CSS** — o JS só troca `data-theme` no `<html>`, o resto se ajusta (chalé com sol vs. chalé com luminária acesa, lua e estrelas).
- **A janela mostra montanhas que viram noite** quando você troca o tema.

---

## Contato

- **E-mail:** jazzedistel@gmail.com
- **LinkedIn:** [linkedin.com/in/joshazze](https://www.linkedin.com/in/joshazze)
- **GitHub:** [github.com/joshazze](https://github.com/joshazze)

---

## Licença

[MIT](https://opensource.org/license/mit). © 2026 Joshua Azze Distel.
