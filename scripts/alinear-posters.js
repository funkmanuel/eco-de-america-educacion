const fs = require('fs');
const path = require('path');

const postersDir = path.join(__dirname, 'posters');

function alinearPosters() {
    const files = fs.readdirSync(postersDir);
    files.forEach(file => {
        if (!file.endsWith('.html')) return;
        const filePath = path.join(postersDir, file);
        let content = fs.readFileSync(filePath, 'utf8');

        // Modificamos el CSS inyectado previamente.
        // Buscamos la regla .image-container y la ajustamos.
        
        // 1. Quitar 'width: 100%' y poner márgenes laterales
        // El padding del footer es 15mm. Haremos que la imagen tenga margin: 0 15mm.
        
        content = content.replace(
            /.image-container \{[^}]+\}/, 
            `.image-container {
            flex: 1 1 auto;
            height: 0;
            /* Margen lateral 15mm para alinear con footer, y margin-bottom 15px */
            margin: 0 15mm 15px 15mm; 
            position: relative;
            overflow: hidden;
            border-radius: 15px; /* Redondeado igual al resto */
            box-shadow: 0 4px 10px rgba(0,0,0,0.1); /* Sombra suave opcional */
        }`
        );

        // 2. Ajustar la imagen interna para que siga cubriendo
        content = content.replace(
            /.image-container img \{[^}]+\}/,
            `.image-container img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center 25%;
            border-radius: 15px; /* Aseguramos que la img también recorte si hace falta */
        }`
        );

        fs.writeFileSync(filePath, content);
    });
    console.log('Posters alineados (Márgenes 15mm y Border Radius).');
}

alinearPosters();
