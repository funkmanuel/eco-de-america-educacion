const fs = require('fs');
const path = require('path');

const fichasDir = path.join(__dirname, 'fichas');
const postersDir = path.join(__dirname, 'posters');

function syncBadges() {
    const files = fs.readdirSync(fichasDir);
    files.forEach(file => {
        if (!file.endsWith('.html')) return;
        const animalName = file.replace('ficha-', '').replace('.html', '');
        
        const fichaPath = path.join(fichasDir, file);
        const posterPath = path.join(postersDir, `poster-${animalName}.html`);

        if (!fs.existsSync(posterPath)) return;

        const fichaContent = fs.readFileSync(fichaPath, 'utf8');
        const posterContent = fs.readFileSync(posterPath, 'utf8');

        // Extraer el badge de la ficha
        // <div class="badge">CASI AMENAZADO (NT)</div>
        const badgeMatch = fichaContent.match(/<div class="badge">([\s\S]*?)<\/div>/);
        
        if (badgeMatch) {
            const correctText = badgeMatch[1];
            
            // Reemplazar en el poster
            // Buscamos <div class="conservation-badge">...</div>
            const newPosterContent = posterContent.replace(
                /<div class="conservation-badge"[^>]*>([\s\S]*?)<\/div>/,
                `<div class="conservation-badge">${correctText}</div>`
            );
            
            // También aseguramos el estilo visual del badge en el poster para que sea idéntico (o adaptado)
            // Ya tiene estilos, solo actualizamos el texto para que coincida la categoría oficial.
            
            fs.writeFileSync(posterPath, newPosterContent);
            console.log(`Badge sincronizado para ${animalName}: ${correctText}`);
        }
    });
}

syncBadges();
