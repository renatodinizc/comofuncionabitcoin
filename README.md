# comofuncionabitcoin

Bitcoin do zero, sem hype. Bilingual PT/EN site that explains Bitcoin from the ground up. Two parallel tracks for non-technical and technical readers, joined by a common economics trunk.

## Local preview

```bash
cd ~/comofuncionabitcoin
python3 -m http.server 8000
open http://localhost:8000
```

Paths are relative, so the site works locally, on a GitHub project Pages URL, and on a custom domain.

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
├── assets/
│   ├── css/           reset + base layout + theme
│   └── js/            mode toggle, language switch, subway-map interactions
├── robots.txt         Crawler permissions (AI crawlers explicitly allowed)
├── sitemap.xml        All pages with hreflang alternates
├── llms.txt           LLM-readable site map (Markdown)
├── LICENSE            MIT for source code
└── LICENSE-CONTENT.md CC BY 4.0 for written content
```

## Visual identity

Subway-map theme with Bitcoin orange as the spine.

- Trunk (economics foundation): Bitcoin orange (`#F7931A`)
- Non-technical line: navy
- Technical line: red

Light and dark palettes. Mode toggle persists in `localStorage` and respects `prefers-color-scheme` on first visit.

## SEO and AI discoverability

Every HTML page declares:

- `<link rel="canonical">` and `<link rel="alternate" hreflang>` for the PT/EN mirror.
- OpenGraph and Twitter Card meta tags for rich social previews.
- JSON-LD (`schema.org`) structured data: `WebSite` for landings, `Article` for content, `AboutPage` for the about pages, `WebPage` for the maps. Every record carries author (`Renato Diniz`) and the CC BY 4.0 license URL.

In the repo root:

- `robots.txt` explicitly allows the major AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot, and others) alongside the default `User-agent: *`.
- `sitemap.xml` lists all pages with their hreflang alternates.
- `llms.txt` is a Markdown-formatted site map specifically for LLMs, following the emerging Jeremy Howard standard. Lists pages with short descriptions and the license so generated answers can cite the source.

Canonical domain: `https://comofuncionabitcoin.com`. When deploying under a different host (e.g., GitHub project Pages), the canonical URLs still point to the eventual domain, which is the correct behavior for SEO consolidation.

## License

Dual-licensed:

- **Source code** (HTML, CSS, JavaScript, SVG, configuration) is licensed under the **MIT License**. See [`LICENSE`](LICENSE).
- **Written content** (articles, prose, copy, page text) is licensed under **Creative Commons Attribution 4.0 International (CC BY 4.0)**. See [`LICENSE-CONTENT.md`](LICENSE-CONTENT.md).

Quoting, summarizing, and translating — including by AI systems and LLMs — are explicitly permitted under CC BY 4.0, provided attribution is preserved.

## Deploy

GitHub Pages: push to `main`, enable Pages on the repo. Once `comofuncionabitcoin.com` is registered on Cloudflare, add a `CNAME` file with the domain and configure DNS to point at GitHub Pages.
