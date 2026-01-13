const fs = require('fs');
const path = require('path');

const postersDir = path.join(__dirname, 'posters');

function fixPostersFlex() {
    const files = fs.readdirSync(postersDir);
    files.forEach(file => {
        if (!file.endsWith('.html')) return;
        const filePath = path.join(postersDir, file);
        let content = fs.readFileSync(filePath, 'utf8');

        // 1. Limpieza total de estilos inline viejos
        content = content.replace(/style="[^"]*"/g, ''); 

        // 2. Inyectar CSS nuevo en el HEAD (más limpio y potente)
        const newCss = `
    <style>
        :root { --verde: #228b3c; --fondo: #f5f1e8; --nt: #3b82f6; --font-t: 'Poppins', sans-serif; --font-b: 'Inter', sans-serif; }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body, html { height: 100%; width: 100%; background: white; }
        
        /* Contenedor Principal A3 Flex */
        .poster-container {
            width: 297mm; 
            height: 419mm; /* Un pelín menos de 420 para margen de seguridad */
            display: flex;
            flex-direction: column;
            overflow: hidden;
            position: relative;
            background: white;
        }

        /* Header (Fijo arriba) */
        .header {
            flex: 0 0 auto; /* No crece, no encoge */
            background: var(--verde);
            padding: 15mm 15mm 5mm 15mm;
            color: white;
            clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
            z-index: 20;
        }
        h1 { font-family: var(--font-t); font-size: 55pt; line-height: 0.9; text-transform: uppercase; }
        .sci-name { font-size: 20pt; font-style: italic; opacity: 0.9; font-family: var(--font-b); }

        /* Contenido (Cuerpo central) */
        .content {
            flex: 1 1 auto; /* Ocupa todo el espacio restante */
            display: flex;
            flex-direction: column;
            padding: 0; /* Sin padding lateral para que la imagen toque bordes si quiere */
            position: relative;
            overflow: hidden; /* Clave */
        }

        /* Imagen (El rey del poster) */
        .image-container {
            flex: 1 1 auto; /* Crece para llenar el hueco */
            height: 0; /* Truco Flex: Permite que crezca desde 0 hasta llenar el espacio */
            width: 100%;
            position: relative;
            overflow: hidden;
            /* Margen solo abajo para separar de la info */
            margin-bottom: 10px; 
        }
        
        .image-container img {
            width: 100%;
            height: 100%;
            object-fit: cover; /* Llenar todo */
            object-position: center 20%; /* Enfocar un poco más arriba del centro (cabezas) */
        }

        .conservation-badge {
            position: absolute;
            top: 20px;
            right: 20px;
            background: var(--nt);
            color: white;
            padding: 10px 25px;
            border-radius: 30px;
            font-family: var(--font-t);
            font-size: 16pt;
            font-weight: bold;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            z-index: 10;
        }

        /* Footer Info (Fijo abajo) */
        .footer-info {
            flex: 0 0 auto; /* Altura automática según contenido */
            padding: 0 15mm 15mm 15mm;
            background: white;
            z-index: 20;
        }

        .info-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 15px;
            margin-bottom: 15px;
        }
        .info-card {
            background: var(--fondo);
            padding: 15px;
            border-radius: 10px;
            text-align: center;
            border-bottom: 4px solid var(--verde);
        }
        .info-card strong { display: block; color: var(--verde); font-family: var(--font-t); font-size: 12pt; }
        .info-card span { font-size: 16pt; font-weight: 600; color: #333; font-family: var(--font-b); }

        .did-you-know {
            background: #222;
            color: white;
            padding: 20px 30px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            gap: 20px;
        }
        .did-you-know h3 { font-family: var(--font-t); font-size: 20pt; color: #facc15; white-space: nowrap; }
        .did-you-know p { font-size: 12pt; line-height: 1.3; font-family: var(--font-b); }

    </style>
`;
        
        // Reemplazar todo el HEAD anterior
        content = content.replace(/<style>[\s\S]*?<\/style>/, newCss);

        // 3. Reestructurar el Body para que coincida con el CSS
        // Necesitamos envolver la parte inferior en un div .footer-info
        
        // Regex para capturar bloques
        const headerBlock = content.match(/<header[\s\S]*?<\/header>/)[0];
        
        // Extraer imagen src y alt
        const imgMatch = content.match(/<img src="([^"]+)"[^>]*alt="([^"]+)"/);
        const imgSrc = imgMatch ? imgMatch[1] : '';
        const imgAlt = imgMatch ? imgMatch[2] : '';
        
        // Extraer badge
        const badgeMatch = content.match(/<div class="conservation-badge"[^>]*>([\s\S]*?)<\/div>/); // Cierra div interno
        // Badge text a veces tiene saltos de linea sucios
        let badgeText = badgeMatch ? badgeMatch[1].trim().replace(/<\/div>$/, '') : 'PROTEGIDO';

        // Extraer Info Grid y Sabías Qué
        const gridMatch = content.match(/<div class="info-grid">[\s\S]*?<\/div>\s*<\/div>/); // Captura grid cerrado
        // A veces el regex falla si hay divs anidados. Mejor buscar por strings conocidos.
        const startGrid = content.indexOf('<div class="info-grid">');
        const startDid = content.indexOf('<div class="did-you-know">');
        const endContainer = content.lastIndexOf('</div>'); // Cierre de content
        
        // Extracción manual segura
        let infoPart = "";
        if (startGrid !== -1) {
            infoPart = content.substring(startGrid, content.lastIndexOf('</body>')); // Tomamos todo hasta el final
            // Limpiamos los cierres de div extra del final
            infoPart = infoPart.replace(/<\/div>\s*<\/div>\s*<\/body>/, '');
        }

        const newBody = `
<body>
    <div class="poster-container">
        ${headerBlock}
        
        <div class="content">
            <div class="image-container">
                <div class="conservation-badge">${badgeText}</div>
                <img src="${imgSrc}" alt="${imgAlt}">
            </div>
            
            <div class="footer-info">
                ${infoPart}
            </div>
        </div>
    </div>
</body>
</html>`;

        // Reemplazar body
        content = content.replace(/<body>[\s\S]*?<\/html>/, newBody);

        fs.writeFileSync(filePath, content);
    });
    console.log('Posters reconstruidos con Flexbox (Layout infalible).');
}

fixPostersFlex();
