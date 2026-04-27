# ibtech-projeto01-joshua

> **Joshua Azze Distel** · IbTech · Trilha Frontend · Projeto 01 · 2026.1
>
> 🌐 Ao vivo: https://joshazze.github.io/ibtech-projeto01-joshua/

Cartão de visita pessoal feito em **HTML, CSS e JavaScript puros**. Sem framework, sem template, sem build. Vanilla.

A página é **um quarto pixelado em primeira pessoa**. Você está dentro, olhando para a parede. Cada seção é uma parte do quarto.

| #  | Parte do quarto    | O que tem ali                                                |
|----|--------------------|--------------------------------------------------------------|
| 00 | Janela             | Vista das montanhas. Apresentação e frase rotativa.          |
| 01 | Mesa de estudos    | Monitor com terminal mostrando `whoami`. Sobre e skills.     |
| 02 | Mural              | Cortiça com 3 polaroides, 3 frases emolduradas e TV CRT.     |
| 03 | Prateleira         | 13 livros (cada marco), troféu Top of Class.                 |
| 04 | Mesa de cabeceira  | Luminária, despertador real, contato com copiar e-mail.      |

A estética é inspirada em jogos pixelados como **Tuber Simulator (PewDiePie)**: cores chunky, sombras sólidas, tipografia única em **Press Start 2P** do Google Fonts. O ponto de vista é de quem está **dentro** do quarto.

---

## Stack

- **HTML5** semântico (`header`, `main`, `nav`, `section`, `article`, `footer`), com Open Graph configurado e `<dialog>` nativo para o modal.
- **CSS3** com variáveis para paleta, tipografia e espaçamento. Layout em Flexbox e Grid. `image-rendering: pixelated`. Dois temas (dia e noite) controlados apenas por troca de variáveis CSS.
- **JavaScript vanilla (ES2022)**. Clipboard API, `IntersectionObserver`, `<dialog>.showModal()`, `localStorage`, `matchMedia('prefers-color-scheme')`.
- **Google Fonts**: apenas **Press Start 2P** (uma única fonte em toda a página).

Sem Bootstrap, Tailwind, jQuery, React, Vue, Svelte ou qualquer outra dependência. Zero dependências.

---

## Interações JavaScript

**Obrigatórias:**
1. **Toggle de tema dia/noite**. Botão no canto superior direito. Troca apenas as variáveis CSS na raiz, persiste em `localStorage` e respeita `prefers-color-scheme` na primeira visita.
2. **Copiar e-mail** via Clipboard API (com fallback `execCommand`) e feedback visual `copiado!` por 2 segundos.
3. **Animação de entrada** com `IntersectionObserver`. Aplica `.is-visible` em cada seção uma única vez quando entra no viewport (não escuta `scroll`).

**Extras:**
4. **Modal de projeto** com `<dialog>` nativo. Abre ao clicar nos livros da prateleira. Fecha com `Esc`, com `×`, ou com clique no backdrop. Foco volta para o botão original.
5. **Typewriter rotativo** na hero, escrevendo e apagando 8 frases.
6. **Menu mobile (hambúrguer)**. Fecha com `Esc`, clique fora ou ao escolher um link.
7. **Despertador real** no criado-mudo. Atualiza a cada 30 segundos.
8. **Easter egg**: Konami code (`↑ ↑ ↓ ↓ ← → ← → b a`) ativa modo arcade com scanlines e shake.

---

## Como rodar

Abra `index.html` no navegador. Funciona offline e não precisa de servidor.

Caso queira servir localmente:

```bash
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

- `lang="pt-BR"` e hierarquia de títulos respeitada (1 `h1` na hero, `h2` em cada seção).
- Todas as imagens com `alt` descritivo (descreve o conteúdo, não o tipo de mídia).
- Foco visível em todos os elementos interativos.
- `aria-live` em região para anúncios de cópia e troca de tema.
- `prefers-reduced-motion` respeitado.
- Skip-link no topo.
- Links externos com `rel="noopener noreferrer"` e `target="_blank"`.

---

## Responsividade

Funciona de **360px a 1920px+**. Breakpoints em `900px` (tablet) e `600px` (mobile). Em telas largas (`>=1400px` e `>=1920px`) o conteúdo respira sem virar uma faixa esquecida.

---

## Decisões de projeto

- **Pixel art em SVG inline e CSS**, não imagens raster. Ganho: escala perfeita em qualquer DPI, peso baixo e theming via variáveis.
- **`<dialog>` nativo** em vez de modal montado na unha. Esc, foco e backdrop saem de graça.
- **Dois temas via variáveis CSS**. O JS só troca `data-theme` no `<html>`; o resto se ajusta sozinho (sol vira lua, montanhas escurecem, luminária acende com glow real).
- **Tipografia única**. Apenas Press Start 2P em toda a página, com tamanhos calibrados para legibilidade.

---

## Contato

- **E-mail:** jazzedistel@gmail.com
- **LinkedIn:** [linkedin.com/in/joshazze](https://www.linkedin.com/in/joshazze)
- **GitHub:** [github.com/joshazze](https://github.com/joshazze)

---

## Licença

[MIT](https://opensource.org/license/mit). © 2026 Joshua Azze Distel.
