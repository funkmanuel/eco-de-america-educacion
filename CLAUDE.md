# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ECO de América - Educational materials generator for Argentine native fauna. This project generates HTML-based educational content (animal fact sheets, posters, coloring pages, and activities) that can be viewed in browsers, downloaded as PDFs, and printed.

## Key Commands

### PDF Generation
```bash
node build-pdfs.js
```
Generates consolidated PDFs from HTML files:
- `posters.pdf` - A3 posters from `posters/*.html`
- `actividades.pdf` - Activities from markdown files in `kit_docente/` plus interactive games

### Game Generation
```bash
node generate-complete-activities.js
```
Creates `juegos_completos.html` with crossword puzzles, true/false questions, and word searches for 30 animals.

### Utility Scripts
- `node alinear-posters.js` - Adjusts poster CSS margins (15mm) and border radius
- `node fix-posters-flex.js` - Fixes flexbox layout issues in posters
- `node fix-posters-print.js` - Fixes print-specific CSS in posters
- `node sync-badges.js` - Synchronizes conservation status badges across materials

## Architecture

### Content Generation Pipeline

1. **Content Creation** (Manual/AI-generated)
   - 30 animal species documented in markdown format
   - Follows structure defined in `agents.md`
   - AI prompts and instructions in `prompts-realistas.md`

2. **HTML Generation**
   - **Fichas** (`fichas/`) - 2-page A4 fact sheets per animal (30 files)
   - **Posters** (`posters/`) - A3 posters per animal (30 files)
   - **Colorear** (`colorear/`) - A4 coloring pages with SVG outlines (30 files)
   - **Activities** (`kit_docente/`) - Markdown-based educational activities
   - **Games** (`juegos_completos.html`) - Generated interactive games

3. **PDF Consolidation** (via `build-pdfs.js`)
   - Uses Puppeteer to render HTML to PDF
   - Uses pdf-lib to merge multiple PDFs
   - Adds cover pages from `portadas/`

### Key Directories

- **`fichas/`** - 30 HTML fact sheets (ficha-{animal}.html)
- **`posters/`** - 30 HTML posters (poster-{animal}.html)
- **`colorear/`** - 30 coloring page HTMLs + PNG outline images
- **`kit_docente/`** - 5 markdown activity files (one per educational level)
- **`portadas/`** - HTML cover pages for PDFs
- **`img/`** - Images directory (placeholder for realistic photos)
- **`crossword-maker/`** - Crossword puzzle generator tools
- **`wordsearch/`** - Word search puzzle resources

### HTML Structure

All HTML files are self-contained with:
- Inline CSS in `<style>` tags
- Google Fonts CDN (Poppins, Inter)
- Print-optimized CSS with `@media print` rules
- Semantic HTML5 structure
- Image placeholders with descriptive text (to be replaced later)

### Design System

Defined in `agents.md`:
```css
/* Colors */
--verde-principal: #228b3c;
--verde-claro: #3db85c;
--verde-oscuro: #1a6b2f;
--fondo-arena: #f5f1e8;
--azul-secundario: #5ba3d0;
--texto: #333333;

/* Conservation Status Badge Colors */
--cr-critico: #dc2626;       /* Critically Endangered */
--en-peligro: #f97316;       /* Endangered */
--vu-vulnerable: #eab308;    /* Vulnerable */
--nt-casi-amenazado: #3b82f6; /* Near Threatened */
--lc-preocupacion-menor: #10b981; /* Least Concern */

/* Typography */
--font-titulo: 'Poppins', sans-serif;
--font-texto: 'Inter', sans-serif;
```

### PDF Generation Details

The `build-pdfs.js` script:
1. Launches headless Chromium via Puppeteer
2. Loads each HTML file via `file://` protocol
3. Renders to PDF with appropriate page size (A4 or custom A3)
4. Merges all PDFs using pdf-lib
5. Outputs consolidated PDFs: `posters.pdf`, `actividades.pdf`

**Important**: The script uses `{ waitUntil: 'networkidle0' }` to ensure all fonts and styles load before rendering.

### Game Generation

`generate-complete-activities.js` creates a 4-page HTML document:
1. **Crossword puzzle** - 15 animals with clues
2. **True/False quiz** - 10 questions about animal facts
3. **Word search** - 15 animals hidden in grid
4. **Solutions page** - Answers for all activities

Algorithm features:
- Crossword uses word intersection algorithm (checkFit/placeWord)
- Word search places words in 4 directions (horizontal, vertical, diagonal, reverse-diagonal)
- All grids generated programmatically with fallback random letter filling

### Image Management

Current state: **Placeholder mode**
- HTML files contain `<div class="image-placeholder">` with descriptions
- Images to be manually added to `img/realistas/` directory
- Naming convention: `{animal}-principal.png`, `{animal}-detalle.png`, `{animal}-poster.png`
- Update instructions in `INSTRUCCIONES_ACTUALIZACION.md`

To replace placeholders with real images:
1. Add images to `img/realistas/`
2. Replace `<div class="image-placeholder">` with `<img src="../img/realistas/{animal}-principal.png">`
3. Run `node build-pdfs.js` to regenerate PDFs

### Educational Content Structure

Activities in `kit_docente/` follow Argentine curriculum (NAP - Núcleos de Aprendizaje Prioritarios):
- **Nivel Inicial** (3-5 años)
- **Primaria 1er Ciclo** (6-8 años)
- **Primaria 2do Ciclo** (9-11 años)
- **Secundaria Ciclo Básico** (12-14 años)
- **Secundaria Ciclo Orientado** (15-17 años)

Each activity includes:
- Learning objectives (conceptual, procedural, attitudinal)
- Materials list with cost estimates (ARS)
- Step-by-step instructions with timing
- Evaluation rubrics
- Adaptations for special education needs
- Interdisciplinary connections

## Dependencies

- **puppeteer** - Headless browser for PDF generation
- **pdf-lib** - PDF manipulation and merging
- **markdown-it** - Markdown to HTML conversion (for activities)
- **openai** - Not actively used in current scripts (legacy dependency)

## Common Workflows

### Adding a New Animal
1. Create markdown content following structure in `agents.md`
2. Generate HTML files: `ficha-{animal}.html`, `poster-{animal}.html`, `colorear-{animal}.html`
3. Add animal data to game generators (crosswordWords, wordsearchWords, trueFalseQuestions in `generate-complete-activities.js`)
4. Run `node generate-complete-activities.js`
5. Run `node build-pdfs.js`

### Updating Poster Styles
1. Edit CSS in `posters/*.html` files OR
2. Create/modify utility script (like `alinear-posters.js`) to batch-update all posters
3. Run `node build-pdfs.js` to regenerate PDF

### Debugging PDF Issues
- Check browser console output from Puppeteer (printed to terminal)
- Verify all Google Fonts load before PDF render
- Ensure `waitUntil: 'networkidle0'` is set
- Test individual HTML files in browser before PDF generation
- Verify page sizes match requirements (A4: 210x297mm, A3: 297x420mm)

## Important Notes

- All HTML files must be self-contained (no external CSS files)
- Print CSS must use `-webkit-print-color-adjust: exact` to preserve colors
- Image placeholders use dashed green border (#228b3c) for visibility
- Conservation status badges must match IUCN categories exactly
- Spanish (Argentina) is the content language - use "vos" conjugation where appropriate
- All educational content follows Argentine curriculum standards (NAP)

## Agent Instructions Reference

See `agents.md` for comprehensive instructions on:
- Content generation guidelines (CONTENT_GENERATOR agent)
- HTML structure and styling (HTML_BUILDER agent)
- Educational activity design (KIT_DOCENTE_GENERATOR agent)
- Complete list of 30 animals with conservation status
