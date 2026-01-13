// ============================================
// ECO de América - Complete Activities Generator
// Generates 7 separate HTML pages for PDF merging
// ============================================

const fs = require('fs');
const path = require('path');

// ============================================
// CONFIGURATION
// ============================================
const CROSSWORD_HTML = path.join(__dirname, 'crossword-maker/crucigrama.html');
const WORDSEARCH_HTML = path.join(__dirname, 'wordsearch/wordsearch.html');
const OUTPUT_DIR = path.join(__dirname, 'juegos');

// ============================================
// DATA: True/False Questions
// ============================================
const trueFalseQuestions = [
    { q: "El Yaguareté es el felino más grande de África.", a: false, why: "Es el felino más grande de América." },
    { q: "El Cóndor Andino puede volar a más de 6.000 metros de altura.", a: true, why: "Verdadero." },
    { q: "El Oso Hormiguero tiene dientes muy afilados para comer.", a: false, why: "No tiene dientes, usa su lengua pegajosa." },
    { q: "El Carpincho es el roedor más grande del mundo.", a: true, why: "Verdadero." },
    { q: "Los Flamencos obtienen su color rosado de los alimentos que consumen.", a: true, why: "Verdadero." },
    { q: "El Tapir tiene una trompa corta y rígida que no puede mover.", a: false, why: "Su trompa es carnosa y muy flexible." },
    { q: "La Boa Constrictora es una serpiente venenosa.", a: false, why: "Mata por constricción, no tiene veneno." },
    { q: "El Hornero construye su nido usando barro y paja.", a: true, why: "Verdadero." },
    { q: "El Yacaré Overo tiene el hocico más ancho que el Yacaré Negro.", a: true, why: "Verdadero." },
    { q: "El Mono Carayá es conocido por ser muy silencioso.", a: false, why: "Es uno de los animales más ruidosos." }
];

// ============================================
// DATA: Wordsearch solution positions (corrected from manual review)
// ============================================
const wordsearchSolutions = [
    // Horizontales
    { word: 'HUEMUL', positions: [[4,13],[4,14],[4,15],[4,16],[4,17],[4,18]] },
    { word: 'MONOCAÍ', positions: [[7,7],[7,8],[7,9],[7,10],[7,11],[7,12],[7,13]] },
    { word: 'PATODETORRENTE', positions: [[18,4],[18,5],[18,6],[18,7],[18,8],[18,9],[18,10],[18,11],[18,12],[18,13],[18,14],[18,15],[18,16],[18,17]] },
    { word: 'GUACAMAYOROJO', positions: [[19,6],[19,7],[19,8],[19,9],[19,10],[19,11],[19,12],[19,13],[19,14],[19,15],[19,16],[19,17],[19,18]] },
    // Horizontales invertidas (derecha a izquierda)
    { word: 'LAGARTOCOLORADO', positions: [[16,17],[16,16],[16,15],[16,14],[16,13],[16,12],[16,11],[16,10],[16,9],[16,8],[16,7],[16,6],[16,5],[16,4],[16,3]] },
    { word: 'PECARÍDECOLLAR', positions: [[17,17],[17,16],[17,15],[17,14],[17,13],[17,12],[17,11],[17,10],[17,9],[17,8],[17,7],[17,6],[17,5],[17,4]] },
    // Verticales (arriba a abajo)
    { word: 'BOACONSTRICTORA', positions: [[2,1],[3,1],[4,1],[5,1],[6,1],[7,1],[8,1],[9,1],[10,1],[11,1],[12,1],[13,1],[14,1],[15,1],[16,1]] },
    { word: 'CARDENAL', positions: [[9,2],[10,2],[11,2],[12,2],[13,2],[14,2],[15,2],[16,2]] },
    { word: 'LOROHABLADOR', positions: [[0,5],[1,5],[2,5],[3,5],[4,5],[5,5],[6,5],[7,5],[8,5],[9,5],[10,5],[11,5]] },
    { word: 'ÁGUILACORONADA', positions: [[0,8],[1,8],[2,8],[3,8],[4,8],[5,8],[6,8],[7,8],[8,8],[9,8],[10,8],[11,8],[12,8],[13,8]] },
    // Verticales invertidas (abajo a arriba)
    { word: 'YACARÉNEGRO', positions: [[19,0],[18,0],[17,0],[16,0],[15,0],[14,0],[13,0],[12,0],[11,0],[10,0],[9,0]] },
    { word: 'ZORROGRIS', positions: [[13,4],[12,4],[11,4],[10,4],[9,4],[8,4],[7,4],[6,4],[5,4]] },
    { word: 'COMADREJAOVERA', positions: [[15,3],[14,3],[13,3],[12,3],[11,3],[10,3],[9,3],[8,3],[7,3],[6,3],[5,3],[4,3],[3,3],[2,3]] },
    // Diagonales
    { word: 'JOTEREAL', positions: [[13,9],[12,10],[11,11],[10,12],[9,13],[8,14],[7,15],[6,16]] },
    { word: 'TORTUGA', positions: [[7,12],[8,13],[9,14],[10,15],[11,16],[12,17],[13,18]] }
];

// ============================================
// CSS BASE - Shared across all pages
// ============================================
const baseCSS = `
<style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Inter:wght@400;500;600&display=swap');

    :root {
        --verde-principal: #228b3c;
        --verde-oscuro: #1a6b2f;
        --verde-claro: #3db85c;
        --fondo-arena: #f5f1e8;
        --texto: #333333;
        --gris: #666666;
    }

    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
        font-family: 'Inter', sans-serif;
        background: white;
        color: var(--texto);
        width: 210mm;
        min-height: 297mm;
        margin: 0;
        padding: 10mm 12mm;
    }

    h1 {
        font-family: 'Poppins', sans-serif;
        font-weight: 800;
        font-size: 26pt;
        color: var(--verde-oscuro);
        text-align: center;
        text-transform: uppercase;
        margin-bottom: 4mm;
    }

    .subtitle {
        text-align: center;
        font-size: 11pt;
        color: var(--gris);
        margin-bottom: 5mm;
    }

    .footer {
        position: fixed;
        bottom: 8mm;
        left: 12mm;
        right: 12mm;
        text-align: center;
        font-size: 8pt;
        color: var(--verde-principal);
        font-weight: 600;
        padding-top: 2mm;
        border-top: 1px solid #ddd;
    }

    @media print {
        body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }

    @page { size: A4; margin: 0; }
</style>
`;

// ============================================
// PAGE 1: CROSSWORD
// ============================================
function generateCrosswordPage() {
    const html = fs.readFileSync(CROSSWORD_HTML, 'utf8');
    const gridMatch = html.match(/<div class="grid-container">([\s\S]*?)<\/div>\s*<div class="clues">/);
    const cluesMatch = html.match(/<div class="clues">([\s\S]*?)<\/div>\s*<div class="solution">/);

    if (!gridMatch || !cluesMatch) {
        console.error('❌ Error extrayendo crucigrama');
        process.exit(1);
    }

    return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Crucigrama de Fauna</title>
    ${baseCSS}
    <style>
        .grid-container { display: flex; justify-content: center; margin: 3mm 0; }
        table { border-collapse: collapse; }
        td { width: 24px; height: 24px; border: 1.5px solid #aaa; text-align: center; font-weight: bold; font-family: monospace; font-size: 11pt; }
        .filled { background-color: white; color: var(--texto); }
        .empty { background-color: var(--verde-oscuro); border-color: var(--verde-oscuro); }
        .clues { margin-top: 5mm; display: grid; grid-template-columns: 1fr 1fr; gap: 5mm; font-size: 9pt; line-height: 1.4; }
        .clues h3 { color: var(--verde-principal); font-family: 'Poppins', sans-serif; margin-bottom: 2mm; font-size: 11pt; }
        .clues ul { list-style: none; padding: 0; }
        .clues li { margin-bottom: 2mm; padding-left: 14px; position: relative; }
        .clues li::before { content: '•'; position: absolute; left: 0; color: var(--verde-principal); font-weight: bold; }
    </style>
</head>
<body>
    <h1>Crucigrama de Fauna</h1>
    <p class="subtitle">Completá el crucigrama con los animales correspondientes a las pistas.</p>
    <div class="grid-container">${gridMatch[1]}</div>
    <div class="clues">${cluesMatch[1]}</div>
    <div class="footer">ECO de América | Material Educativo</div>
</body>
</html>`;
}

// ============================================
// PAGE 2: TRUE/FALSE
// ============================================
function generateTrueFalsePage() {
    let questionsHTML = '';
    trueFalseQuestions.forEach((item, index) => {
        questionsHTML += `
        <div class="tf-item">
            <div class="tf-number">${index + 1}</div>
            <div class="tf-question">${item.q}</div>
            <div class="tf-options">
                <div class="tf-option">V</div>
                <div class="tf-option">F</div>
            </div>
        </div>`;
    });

    return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Verdadero o Falso</title>
    ${baseCSS}
    <style>
        .intro { text-align: center; margin-bottom: 6mm; padding: 4mm; background: var(--fondo-arena); border-radius: 8px; font-size: 11pt; }
        .tf-container { display: flex; flex-direction: column; gap: 4mm; }
        .tf-item { background: var(--fondo-arena); padding: 4mm 5mm; border-radius: 8px; display: flex; align-items: center; gap: 4mm; border-left: 4px solid var(--verde-principal); }
        .tf-number { font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 14pt; color: var(--verde-principal); min-width: 24px; }
        .tf-question { flex: 1; font-size: 11pt; color: var(--texto); }
        .tf-options { display: flex; gap: 3mm; }
        .tf-option { width: 34px; height: 34px; border: 2px solid var(--verde-principal); border-radius: 6px; display: flex; align-items: center; justify-content: center; font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 14pt; color: var(--verde-principal); background: white; }
    </style>
</head>
<body>
    <h1>¿Verdadero o Falso?</h1>
    <div class="intro">Lee atentamente cada afirmación y marcá con una X la opción correcta.</div>
    <div class="tf-container">${questionsHTML}</div>
    <div class="footer">ECO de América | Material Educativo</div>
</body>
</html>`;
}

// ============================================
// PAGE 3: WORDSEARCH
// ============================================
function parseWordsearchHTML(html) {
    const wordMatches = html.match(/<span style="text-transform:uppercase">([^<]+)<\/span>/g);
    const words = wordMatches ? wordMatches.map(m => m.match(/>([^<]+)</)[1]) : [];

    const gridRows = [];
    const rowMatches = html.match(/<tr style="height:18pt[^"]*">([\s\S]*?)<\/tr>/g);

    if (rowMatches) {
        rowMatches.forEach(row => {
            const cells = [];
            const cellMatches = row.match(/<span>([^<]*)<\/span>/g);
            if (cellMatches) {
                cellMatches.forEach(cell => {
                    const letter = cell.match(/>([^<]*)</)[1];
                    cells.push(letter);
                });
            }
            if (cells.length > 0) gridRows.push(cells);
        });
    }

    return { words, grid: gridRows };
}

function generateWordsearchPage() {
    const html = fs.readFileSync(WORDSEARCH_HTML, 'utf8');
    const { words, grid } = parseWordsearchHTML(html);

    if (words.length === 0 || grid.length === 0) {
        console.error('❌ Error extrayendo sopa de letras');
        process.exit(1);
    }

    let wordListHTML = '<ul>';
    words.forEach(word => { wordListHTML += `<li><strong>${word}</strong></li>`; });
    wordListHTML += '</ul>';

    let gridHTML = '<table>';
    grid.forEach(row => {
        gridHTML += '<tr>';
        row.forEach(cell => { gridHTML += `<td>${cell}</td>`; });
        gridHTML += '</tr>';
    });
    gridHTML += '</table>';

    return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Sopa de Letras</title>
    ${baseCSS}
    <style>
        .content { display: flex; gap: 8mm; align-items: flex-start; }
        .word-list { flex: 0 0 45mm; font-size: 9pt; line-height: 1.5; background: var(--fondo-arena); padding: 4mm; border-radius: 8px; }
        .word-list h3 { font-family: 'Poppins', sans-serif; font-size: 11pt; color: var(--verde-principal); margin-bottom: 3mm; }
        .word-list ul { list-style: none; padding: 0; margin: 0; }
        .word-list li { margin-bottom: 2mm; padding: 1.5mm 0; border-bottom: 1px dashed #ccc; }
        .word-list li:last-child { border-bottom: none; }
        .grid-container { flex: 1; display: flex; justify-content: center; }
        table { border-collapse: collapse; border: 2px solid var(--verde-principal); }
        td { width: 8.2mm; height: 8.2mm; border: 1px solid #ddd; background: #f0f9f0; text-align: center; font-weight: 600; font-family: 'Courier New', monospace; font-size: 10pt; color: var(--texto); }
    </style>
</head>
<body>
    <h1>Sopa de Letras</h1>
    <p class="subtitle">Encontrá los 15 animales escondidos en la grilla.</p>
    <div class="content">
        <div class="word-list"><h3>Animales a encontrar:</h3>${wordListHTML}</div>
        <div class="grid-container">${gridHTML}</div>
    </div>
    <div class="footer">ECO de América | Material Educativo</div>
</body>
</html>`;
}

// ============================================
// PAGE 4: SOLUTION - CROSSWORD
// ============================================
function generateCrosswordSolutionPage() {
    const html = fs.readFileSync(CROSSWORD_HTML, 'utf8');
    const solMatch = html.match(/<div class="solution">[\s\S]*?<div class="grid-container">\s*(<table>[\s\S]*?<\/table>)/);

    if (!solMatch) {
        console.error('❌ Error extrayendo solución de crucigrama');
        process.exit(1);
    }

    return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Solución - Crucigrama</title>
    ${baseCSS}
    <style>
        .solution-header {
            background: var(--verde-principal);
            color: white;
            padding: 3mm 5mm;
            border-radius: 8px;
            margin-bottom: 5mm;
            display: flex;
            align-items: center;
            gap: 3mm;
        }
        .solution-header h2 {
            font-family: 'Poppins', sans-serif;
            font-size: 14pt;
            margin: 0;
        }
        .solution-badge {
            background: white;
            color: var(--verde-principal);
            padding: 2mm 4mm;
            border-radius: 4px;
            font-family: 'Poppins', sans-serif;
            font-weight: 700;
            font-size: 10pt;
        }
        .grid-container { display: flex; justify-content: center; margin-top: 8mm; }
        table { border-collapse: collapse; }
        td { width: 26px; height: 26px; border: 1.5px solid #aaa; text-align: center; font-weight: bold; font-family: monospace; font-size: 12pt; }
        .filled { background-color: #e8f5e9; color: var(--verde-oscuro); }
        .empty { background-color: var(--verde-oscuro); border-color: var(--verde-oscuro); }
    </style>
</head>
<body>
    <h1>Soluciones</h1>
    <div class="solution-header">
        <div class="solution-badge">1</div>
        <h2>Crucigrama de Fauna</h2>
    </div>
    <div class="grid-container">${solMatch[1]}</div>
    <div class="footer">ECO de América | Material Educativo</div>
</body>
</html>`;
}

// ============================================
// PAGE 5: SOLUTION - TRUE/FALSE
// ============================================
function generateTrueFalseSolutionPage() {
    let solutionsHTML = '';
    trueFalseQuestions.forEach((item, index) => {
        const answer = item.a ? 'VERDADERO' : 'FALSO';
        const answerClass = item.a ? 'correct' : 'incorrect';
        solutionsHTML += `
        <div class="sol-item">
            <div class="sol-number">${index + 1}</div>
            <div class="sol-content">
                <div class="sol-question">${item.q}</div>
                <div class="sol-answer ${answerClass}">${answer}</div>
                <div class="sol-explanation">${item.why}</div>
            </div>
        </div>`;
    });

    return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Solución - Verdadero o Falso</title>
    ${baseCSS}
    <style>
        .solution-header {
            background: var(--verde-principal);
            color: white;
            padding: 3mm 5mm;
            border-radius: 8px;
            margin-bottom: 5mm;
            display: flex;
            align-items: center;
            gap: 3mm;
        }
        .solution-header h2 { font-family: 'Poppins', sans-serif; font-size: 14pt; margin: 0; }
        .solution-badge { background: white; color: var(--verde-principal); padding: 2mm 4mm; border-radius: 4px; font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 10pt; }
        .solutions-container { display: flex; flex-direction: column; gap: 3mm; }
        .sol-item { background: var(--fondo-arena); padding: 4mm; border-radius: 8px; display: flex; gap: 4mm; align-items: flex-start; }
        .sol-number { font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 16pt; color: var(--verde-principal); min-width: 28px; }
        .sol-content { flex: 1; }
        .sol-question { font-size: 10pt; color: var(--texto); margin-bottom: 2mm; }
        .sol-answer { font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 12pt; display: inline-block; padding: 1mm 3mm; border-radius: 4px; }
        .sol-answer.correct { background: #c8e6c9; color: #2e7d32; }
        .sol-answer.incorrect { background: #ffcdd2; color: #c62828; }
        .sol-explanation { font-size: 9pt; color: var(--gris); margin-top: 2mm; font-style: italic; }
    </style>
</head>
<body>
    <h1>Soluciones</h1>
    <div class="solution-header">
        <div class="solution-badge">2</div>
        <h2>Verdadero o Falso</h2>
    </div>
    <div class="solutions-container">${solutionsHTML}</div>
    <div class="footer">ECO de América | Material Educativo</div>
</body>
</html>`;
}

// ============================================
// PAGE 6: SOLUTION - WORDSEARCH
// ============================================
function generateWordsearchSolutionPage() {
    const html = fs.readFileSync(WORDSEARCH_HTML, 'utf8');
    const { words, grid } = parseWordsearchHTML(html);

    // Create highlighted positions set
    const highlightedPositions = new Set();
    wordsearchSolutions.forEach(solution => {
        solution.positions.forEach(([r, c]) => {
            highlightedPositions.add(`${r},${c}`);
        });
    });

    // Generate grid with highlights
    let gridHTML = '<table>';
    grid.forEach((row, rowIdx) => {
        gridHTML += '<tr>';
        row.forEach((cell, colIdx) => {
            const isHighlighted = highlightedPositions.has(`${rowIdx},${colIdx}`);
            const className = isHighlighted ? 'highlight' : '';
            gridHTML += `<td class="${className}">${cell}</td>`;
        });
        gridHTML += '</tr>';
    });
    gridHTML += '</table>';

    // Generate word list
    let wordListHTML = '';
    words.forEach(word => {
        wordListHTML += `<span class="word-found">${word}</span>`;
    });

    return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Solución - Sopa de Letras</title>
    ${baseCSS}
    <style>
        .solution-header {
            background: var(--verde-principal);
            color: white;
            padding: 3mm 5mm;
            border-radius: 8px;
            margin-bottom: 5mm;
            display: flex;
            align-items: center;
            gap: 3mm;
        }
        .solution-header h2 { font-family: 'Poppins', sans-serif; font-size: 14pt; margin: 0; }
        .solution-badge { background: white; color: var(--verde-principal); padding: 2mm 4mm; border-radius: 4px; font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 10pt; }
        .grid-container { display: flex; justify-content: center; margin: 5mm 0; }
        table { border-collapse: collapse; border: 2px solid var(--verde-principal); }
        td { width: 8.5mm; height: 8.5mm; border: 1px solid #ddd; background: #fafafa; text-align: center; font-weight: 600; font-family: 'Courier New', monospace; font-size: 10pt; color: #999; }
        td.highlight { background: #81c784 !important; color: var(--verde-oscuro) !important; font-weight: 700; }
        .words-found { display: flex; flex-wrap: wrap; gap: 2mm; justify-content: center; margin-top: 5mm; padding: 4mm; background: var(--fondo-arena); border-radius: 8px; }
        .word-found { background: var(--verde-principal); color: white; padding: 2mm 4mm; border-radius: 4px; font-family: 'Poppins', sans-serif; font-size: 8pt; font-weight: 600; }
    </style>
</head>
<body>
    <h1>Soluciones</h1>
    <div class="solution-header">
        <div class="solution-badge">3</div>
        <h2>Sopa de Letras</h2>
    </div>
    <div class="grid-container">${gridHTML}</div>
    <div class="words-found">${wordListHTML}</div>
    <div class="footer">ECO de América | Material Educativo</div>
</body>
</html>`;
}

// ============================================
// MAIN EXECUTION
// ============================================
function main() {
    console.log('🎨 Generando páginas de actividades...\n');

    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    const pages = [
        { name: '1-crucigrama.html', generator: generateCrosswordPage },
        { name: '2-verdadero-falso.html', generator: generateTrueFalsePage },
        { name: '3-sopa-letras.html', generator: generateWordsearchPage },
        { name: '4-solucion-crucigrama.html', generator: generateCrosswordSolutionPage },
        { name: '5-solucion-vf.html', generator: generateTrueFalseSolutionPage },
        { name: '6-solucion-sopa.html', generator: generateWordsearchSolutionPage }
    ];

    pages.forEach(page => {
        const html = page.generator();
        fs.writeFileSync(path.join(OUTPUT_DIR, page.name), html, 'utf8');
        console.log(`   ✅ ${page.name}`);
    });

    console.log('\n🎉 ¡Generación completada!');
    console.log(`📁 Archivos en: ${OUTPUT_DIR}/`);
}

try {
    main();
} catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
}
