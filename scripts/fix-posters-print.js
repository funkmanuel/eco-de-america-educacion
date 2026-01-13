const fs = require('fs');
const path = require('path');

const postersDir = path.join(__dirname, 'posters');

function arreglarPostersParaImpresion() {
    const files = fs.readdirSync(postersDir);
    files.forEach(file => {
        if (!file.endsWith('.html')) return;
        const filePath = path.join(postersDir, file);
        let content = fs.readFileSync(filePath, 'utf8');

        // 1. Asegurar que el contenedor principal tenga altura fija y no desborde
        content = content.replace('.poster-container {', '.poster-container { height: 420mm; max-height: 420mm; overflow: hidden; justify-content: space-between; ');

        // 2. CAMBIO CRÍTICO: La altura de la imagen
        // Buscamos el style del image-container
        // Reemplazamos cualquier height/max-height anterior por calc(100% - 140mm)
        // Usamos flex: 1 para que ocupe el espacio, pero con un max-height de seguridad.
        
        const imgStyleRegex = /(<div class="image-container"[^>]*style=")([^"]*)(")/;
        
        // Limpiamos estilos viejos conflictivos (max-height, flex, margin)
        content = content.replace(imgStyleRegex, (match, p1, p2, p3) => {
            // Quitamos max-heights viejos
            let cleanStyle = p2.replace(/max-height:\s*[^;]+;/g, '')
                               .replace(/height:\s*[^;]+;/g, '')
                               .replace(/margin:\s*[^;]+;/g, '')
                               .replace(/flex:\s*[^;]+;/g, '');
            
            // Inyectamos el estilo matemáticamente correcto para A3
            // margin: 0 auto para centrar.
            // flex: 1 para llenar hueco.
            // overflow: hidden clave.
            return `${p1}height: calc(100% - 150mm); margin: 0; width: 100%; position: relative; display: flex; align-items: center; justify-content: center; overflow: hidden; border-radius: 15px; margin-bottom: 10px; ${cleanStyle}${p3}`;
        });

        // 3. Ajustar imagen interna a COVER
        content = content.replace('object-fit: contain;', 'object-fit: cover;');

        fs.writeFileSync(filePath, content);
    });
    console.log('Posters arreglados con cálculo matemático exacto (100% - 150mm).');
}

arreglarPostersParaImpresion();
