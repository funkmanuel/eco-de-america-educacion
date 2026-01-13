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

    // 2. Markdown Activities (flujo continuo)
    const styles = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Poppins:wght@600;700&display=swap');
            body { font-family: 'Inter', sans-serif; color: #333; margin: 0; background: white; padding: 12mm 15mm; }
            h1 { font-family: 'Poppins', sans-serif; color: #1a6b2f; font-size: 20pt; border-bottom: 3px solid #228b3c; padding-bottom: 8px; margin-top: 0; margin-bottom: 15px; text-transform: uppercase; page-break-before: always; }
            h1:first-of-type { page-break-before: avoid; }
            h2 { font-family: 'Poppins', sans-serif; color: #228b3c; font-size: 14pt; margin-top: 20px; margin-bottom: 10px; }
            h3 { font-family: 'Poppins', sans-serif; color: #fff; background: #228b3c; padding: 5px 12px; border-radius: 5px; font-size: 11pt; margin-top: 15px; margin-bottom: 8px; display: inline-block; }
            p { font-size: 10pt; line-height: 1.4; margin: 8px 0; }
            table { width: 100%; border-collapse: collapse; background: #fff; border-radius: 6px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.08); margin: 10px 0; font-size: 9pt; }
            th { background: #1a6b2f; color: white; padding: 8px 10px; text-align: left; font-size: 9pt; }
            td { border-bottom: 1px solid #eee; padding: 6px 10px; }
            ul, ol { margin: 8px 0; padding-left: 20px; font-size: 10pt; }
            li { margin-bottom: 3px; line-height: 1.3; }
            li::marker { color: #228b3c; font-weight: bold; }
            hr { border: none; border-top: 1px dashed #ccc; margin: 15px 0; }
        </style>
    `;

    const files = fs.readdirSync('kit_docente').filter(f => f.endsWith('.md')).sort();
    let combinedHtml = "";
    for (const file of files) {
        const rawMd = fs.readFileSync(path.join('kit_docente', file), 'utf8');
        combinedHtml += md.render(rawMd);
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