# ECO de América - Material Educativo

Generador de materiales educativos sobre fauna argentina nativa. Este proyecto produce contenido HTML para fichas técnicas, posters, páginas para colorear y actividades interactivas que pueden verse en navegadores, descargarse como PDFs e imprimirse.

## Estructura del Proyecto

```
guias/
├── fichas/              # 30 fichas técnicas HTML (A4, 2 páginas c/u)
├── posters/             # 30 posters HTML (A3)
├── colorear/            # 30 páginas para colorear + imágenes PNG
├── portadas/            # Portadas HTML para cada PDF
├── juegos/              # 6 páginas de juegos generadas automáticamente
├── crossword-maker/     # Crucigrama fuente (crucigrama.html)
├── wordsearch/          # Sopa de letras fuente (wordsearch.html)
├── kit_docente/         # Actividades pedagógicas en Markdown
├── img/                 # Imágenes (realistas/, etc.)
├── scripts/             # Scripts utilitarios
├── build-pdfs.js        # Script principal para generar PDFs
├── generate-complete-activities.js  # Generador de juegos
└── agents.md            # Especificaciones de contenido
```

## Instalación

```bash
npm install
```

Dependencias:
- **puppeteer** - Navegador headless para renderizar HTML a PDF
- **pdf-lib** - Manipulación y merge de PDFs
- **markdown-it** - Conversión de Markdown a HTML

## Generar PDFs

```bash
# Generar los 4 PDFs consolidados
node build-pdfs.js
```

Esto produce:
- `posters.pdf` - 30 posters A3
- `guia.pdf` - 30 fichas técnicas A4
- `colorear.pdf` - 30 páginas para colorear
- `actividades.pdf` - Actividades pedagógicas + juegos

## Generar Juegos

```bash
# Regenerar páginas de juegos (crucigrama, V/F, sopa de letras + soluciones)
node generate-complete-activities.js
```

Genera 6 archivos HTML en `juegos/`:
1. `1-crucigrama.html` - Crucigrama de fauna
2. `2-verdadero-falso.html` - 10 preguntas V/F
3. `3-sopa-letras.html` - Sopa de letras 20x20
4. `4-solucion-crucigrama.html` - Solución del crucigrama
5. `5-solucion-vf.html` - Soluciones V/F
6. `6-solucion-sopa.html` - Solución de la sopa de letras

## Modificar Contenido

### Agregar/Editar un Animal

1. **Ficha técnica**: Editar/crear `fichas/ficha-{animal}.html`
2. **Poster**: Editar/crear `posters/poster-{animal}.html`
3. **Colorear**: Editar/crear `colorear/colorear-{animal}.html` + imagen PNG
4. Regenerar PDFs: `node build-pdfs.js`

### Modificar Crucigrama

1. Editar `crossword-maker/crucigrama.html`
2. Regenerar juegos: `node generate-complete-activities.js`
3. Regenerar PDFs: `node build-pdfs.js`

### Modificar Sopa de Letras

1. Editar `wordsearch/wordsearch.html` (formato Teachize/Aspose)
2. Actualizar posiciones de solución en `generate-complete-activities.js` (array `wordsearchSolutions`)
3. Regenerar juegos: `node generate-complete-activities.js`
4. Regenerar PDFs: `node build-pdfs.js`

### Modificar Preguntas V/F

Editar el array `trueFalseQuestions` en `generate-complete-activities.js`:

```javascript
const trueFalseQuestions = [
    { q: "Pregunta aquí", a: true/false, why: "Explicación" },
    // ...
];
```

## Sistema de Diseño

### Colores

```css
--verde-principal: #228b3c;
--verde-oscuro: #1a6b2f;
--verde-claro: #3db85c;
--fondo-arena: #f5f1e8;
--texto: #333333;
```

### Badges de Conservación (UICN)

```css
--cr-critico: #dc2626;       /* En Peligro Crítico */
--en-peligro: #f97316;       /* En Peligro */
--vu-vulnerable: #eab308;    /* Vulnerable */
--nt-casi-amenazado: #3b82f6; /* Casi Amenazado */
--lc-preocupacion-menor: #10b981; /* Preocupación Menor */
```

### Tipografía

- **Títulos**: `'Poppins', sans-serif` (600, 700, 800)
- **Cuerpo**: `'Inter', sans-serif` (400, 500, 600)

## Tamaños de Página

- **Fichas**: A4 (210mm × 297mm)
- **Posters**: A3 (297mm × 420mm)
- **Colorear**: A4 (210mm × 297mm)
- **Juegos**: A4 (210mm × 297mm)

## Scripts Utilitarios

En la carpeta `scripts/`:

- `alinear-posters.js` - Ajusta márgenes CSS de posters
- `fix-posters-flex.js` - Corrige layouts flexbox en posters
- `fix-posters-print.js` - Corrige CSS de impresión
- `sync-badges.js` - Sincroniza badges de conservación entre archivos

## Lista de Animales (30 especies)

| Animal | Nombre Científico | Estado |
|--------|-------------------|--------|
| Yaguareté | Panthera onca | CR |
| Aguará Guazú | Chrysocyon brachyurus | NT |
| Cóndor Andino | Vultur gryphus | NT |
| Oso Hormiguero | Myrmecophaga tridactyla | VU |
| Carpincho | Hydrochoerus hydrochaeris | LC |
| Lagarto Colorado | Salvator rufescens | LC |
| ... | ... | ... |

Ver lista completa en `agents.md`.

## Notas Importantes

- Todos los HTML son autocontenidos (CSS inline, Google Fonts CDN)
- CSS de impresión usa `-webkit-print-color-adjust: exact`
- Los PDFs se generan con `waitUntil: 'networkidle0'` para cargar fuentes
- Contenido en español de Argentina (usar conjugación "vos")
- Sigue estándares curriculares argentinos (NAP)

## Licencia

Material educativo gratuito - ECO de América
