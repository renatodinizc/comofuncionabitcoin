# comofuncionabitcoin

Bitcoin do zero, sem hype. Bilingual PT/EN site that explains Bitcoin from the ground up. Two parallel tracks for non-technical and technical readers, joined by a common economics trunk.

## Local preview

```bash
cd ~/comofuncionabitcoin
python3 -m http.server 8000
open http://localhost:8000
```

Absolute paths (`/assets/...`) are used so the layout works on a custom domain. They require a local server; `file://` won't resolve them.

## Structure

```
/                      Portuguese (default)
├── index.html         Landing
├── mapa.html          Subway-map roadmap
├── artigo.html        Sample article ("Origens do dinheiro")
├── sobre.html         About
├── en/                English mirror
│   ├── index.html
│   ├── map.html
│   ├── article.html
│   └── about.html
└── assets/
    ├── css/           reset + base layout + theme
    └── js/            mode toggle, language switch, subway-map interactions
```

## Visual identity

Subway-map theme with Bitcoin orange as the spine.

- Trunk (economics foundation): Bitcoin orange (`#F7931A`)
- Non-technical line: navy
- Technical line: red

Light and dark palettes; mode toggle persists in `localStorage` and respects `prefers-color-scheme` on first visit.

## Deploy

GitHub Pages: push to `main`, enable Pages on the repo. Custom domain via Cloudflare DNS later.
