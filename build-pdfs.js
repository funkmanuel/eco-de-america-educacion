const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt({ html: true });

async function generateAndMerge(folder, outputName, paperFormat = 'A4', isA3 = false, coverPath = null) {
    console.log(`Iniciando generación de ${outputName}...`);
    const browser = await puppeteer.launch({ headless: "new" });
    const mergedPdf = await PDFDocument.create();

    if (coverPath && fs.existsSync(coverPath)) {
        const page = await browser.newPage();
        await page.goto(`file://${path.resolve(coverPath)}`, { waitUntil: 'networkidle0' });
        const coverBuffer = await page.pdf({ format: 'A4', printBackground: true });
        const coverDoc = await PDFDocument.load(coverBuffer);
        (await mergedPdf.copyPages(coverDoc, [0])).forEach(p => mergedPdf.addPage(p));
        await page.close();
    }

    const files = fs.readdirSync(folder).filter(f => f.endsWith('.html'));
    for (const file of files) {
        const page = await browser.newPage();
        await page.goto(`file://${path.join(__dirname, folder, file)}`, { waitUntil: 'networkidle0' });
        
        const pdfOptions = { printBackground: true };
        if (isA3) {
            pdfOptions.width = '297mm';
            pdfOptions.height = '420mm';
        } else {
            pdfOptions.format = paperFormat;
        }

        const buffer = await page.pdf(pdfOptions);
        const doc = await PDFDocument.load(buffer);
        (await mergedPdf.copyPages(doc, doc.getPageIndices())).forEach(p => mergedPdf.addPage(p));
        await page.close();
    }

    fs.writeFileSync(outputName, await mergedPdf.save());
    await browser.close();
    console.log(`✅ ${outputName} listo.`);
}

async function createActividadesPdf(coverPath) {
    console.log(`Generando actividades.pdf...`);
    const browser = await puppeteer.launch({ headless: "new" });
    const mergedPdf = await PDFDocument.create();

    // 1. Cover
    if (coverPath && fs.existsSync(coverPath)) {
        const page = await browser.newPage();
        await page.goto(`file://${path.resolve(coverPath)}`, { waitUntil: 'networkidle0' });
        const buffer = await page.pdf({ format: 'A4', printBackground: true });
        const doc = await PDFDocument.load(buffer);
        (await mergedPdf.copyPages(doc, [0])).forEach(p => mergedPdf.addPage(p));
        await page.close();
    }

    // 2. Markdown Activities (Restored)
    const styles = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Poppins:wght@600;700&display=swap');
            body { font-family: 'Inter', sans-serif; color: #333; margin: 0; background: #f4f4f9; }
            .content-wrapper { padding: 15mm; max-width: 210mm; margin: 0 auto; background: white; min-height: 297mm; box-sizing: border-box; }
            h1 { font-family: 'Poppins', sans-serif; color: #1a6b2f; font-size: 24pt; border-bottom: 3px solid #228b3c; padding-bottom: 10px; margin-top: 0; text-transform: uppercase; }
            h2 { font-family: 'Poppins', sans-serif; color: #228b3c; font-size: 18pt; margin-top: 30px; }
            h3 { font-family: 'Poppins', sans-serif; color: #fff; background: #228b3c; padding: 8px 15px; border-radius: 6px; font-size: 14pt; margin-top: 25px; display: inline-block; }
            table { width: 100%; border-collapse: collapse; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 5px rgba(0,0,0,0.05); margin-bottom: 15px; }
            th { background: #1a6b2f; color: white; padding: 12px; text-align: left; }
            td { border-bottom: 1px solid #eee; padding: 10px; }
            li { margin-bottom: 5px; }
            li::marker { color: #228b3c; font-weight: bold; }
            hr { page-break-after: always; visibility: hidden; }
        </style>
    `;

    const files = fs.readdirSync('kit_docente').filter(f => f.endsWith('.md')).sort();
    let combinedHtml = "";
    for (const file of files) {
        const rawMd = fs.readFileSync(path.join('kit_docente', file), 'utf8');
        combinedHtml += `<div class="content-wrapper">${md.render(rawMd)}</div><div style="page-break-after: always;"></div>`;
    }

    if (combinedHtml) {
        console.log(`- Procesando actividades markdown...`);
        const pageContent = await browser.newPage();
        await pageContent.setContent(styles + combinedHtml, { waitUntil: 'networkidle0' });
        const buffer = await pageContent.pdf({ format: 'A4', printBackground: true });
        const doc = await PDFDocument.load(buffer);
        (await mergedPdf.copyPages(doc, doc.getPageIndices())).forEach(p => mergedPdf.addPage(p));
        await pageContent.close();
    }

    // 3. Juegos (6 páginas: 3 actividades + 3 soluciones)
    const juegosDir = 'juegos';
    if (fs.existsSync(juegosDir)) {
        const gameFiles = fs.readdirSync(juegosDir).filter(f => f.endsWith('.html')).sort();
        console.log(`- Agregando Juegos (${gameFiles.length} páginas)...`);
        for (const file of gameFiles) {
            const pageGame = await browser.newPage();
            await pageGame.goto(`file://${path.resolve(juegosDir, file)}`, { waitUntil: 'networkidle0' });
            const bufGame = await pageGame.pdf({ format: 'A4', printBackground: true });
            const docGame = await PDFDocument.load(bufGame);
            (await mergedPdf.copyPages(docGame, docGame.getPageIndices())).forEach(p => mergedPdf.addPage(p));
            await pageGame.close();
        }
    }

    fs.writeFileSync('actividades.pdf', await mergedPdf.save());
    await browser.close();
    console.log(`✅ actividades.pdf listo.`);
}

async function main() {
    // 1. Posters (A3)
    await generateAndMerge('posters', 'posters.pdf', null, true, 'portadas/posters.html');

    // 2. Actividades (Kit Docente + Juegos)
    await createActividadesPdf('portadas/actividades.html');

    // 3. Guía de Fichas (A4)
    await generateAndMerge('fichas', 'guia.pdf', 'A4', false, 'portadas/guia.html');

    // 4. Libro para Colorear (A4)
    await generateAndMerge('colorear', 'colorear.pdf', 'A4', false, 'portadas/colorear.html');

    console.log("🚀 Generación de 4 PDFs Completa.");
    console.log("   ✅ posters.pdf");
    console.log("   ✅ actividades.pdf");
    console.log("   ✅ guia.pdf");
    console.log("   ✅ colorear.pdf");
}

main();