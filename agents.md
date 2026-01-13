# ECO de América - Agentes para Generación de Materiales Educativos

Este documento define los agentes especializados para crear materiales educativos descargables en formato HTML que pueden verse en web, descargarse como PDF e imprimirse.

**IMPORTANTE:** Este sistema genera TODO el contenido de los 30 animales en una sola ejecución. Las imágenes se agregan manualmente después.

---

## 🎯 ARQUITECTURA DEL PROYECTO

### Stack Tecnológico

- **IA de Contenido**: Gemini Advanced (textos, datos, estructuras, HTML)
- **Imágenes**: Se agregarán manualmente después (placeholders por ahora)
- **Desarrollo**: HTML5 + CSS3 (sin JavaScript)
- **Exportación PDF**: Chrome/Edge (Print to PDF) o herramientas posteriores

### Especificaciones de Diseño ECO de América

```css
/* PALETA DE COLORES */
--verde-principal: #228b3c;
--verde-claro: #3db85c;
--verde-oscuro: #1a6b2f;
--fondo-arena: #f5f1e8;
--azul-secundario: #5ba3d0;
--texto: #333333;
--gris-claro: #6b7280;

/* TIPOGRAFÍAS */
--font-titulos: 'Poppins', sans-serif; /* weights: 600, 700 */
--font-texto: 'Inter', sans-serif; /* weights: 400, 600 */

/* BADGES DE CONSERVACIÓN */
--cr-critico: #dc2626; /* Critically Endangered */
--en-peligro: #f97316; /* Endangered */
--vu-vulnerable: #eab308; /* Vulnerable */
--nt-casi-amenazado: #3b82f6; /* Near Threatened */
--lc-preocupacion-menor: #10b981; /* Least Concern */
```

---

## 📋 LISTA COMPLETA DE ANIMALES A GENERAR

### Mamíferos (15 especies)

1. Yaguareté (_Panthera onca_) - EN
2. Puma (_Puma concolor_) - LC
3. Tapir (_Tapirus terrestris_) - VU
4. Aguará Guazú (_Chrysocyon brachyurus_) - NT
5. Oso Hormiguero Gigante (_Myrmecophaga tridactyla_) - VU
6. Carpincho (_Hydrochoerus hydrochaeris_) - LC
7. Coatí (_Nasua nasua_) - LC
8. Mara Patagónica (_Dolichotis patagonum_) - NT
9. Pecarí de Collar (_Pecari tajacu_) - LC
10. Mono Caí (_Sapajus nigritus_) - NT
11. Mono Carayá (_Alouatta caraya_) - NT
12. Ciervo de los Pantanos (_Blastocerus dichotomus_) - VU
13. Huemul (_Hippocamelus bisulcus_) - EN
14. Zorro Gris Pampeano (_Lycalopex gymnocercus_) - LC
15. Comadreja Overa (_Didelphis albiventris_) - LC

### Aves (10 especies)

16. Cóndor Andino (_Vultur gryphus_) - VU
17. Flamenco Austral (_Phoenicopterus chilensis_) - NT
18. Guacamayo Rojo (_Ara chloropterus_) - LC
19. Loro Hablador (_Amazona aestiva_) - NT
20. Ñandú (_Rhea americana_) - NT
21. Jote Real (_Sarcoramphus papa_) - LC
22. Águila Coronada (_Buteogallus coronatus_) - EN
23. Pato de Torrente (_Merganetta armata_) - LC
24. Cardenal Amarillo (_Gubernatrix cristata_) - EN
25. Hornero (_Furnarius rufus_) - LC

### Reptiles (5 especies)

26. Yacaré Overo (_Caiman latirostris_) - LC
27. Yacaré Negro (_Caiman yacare_) - LC
28. Boa Constrictora (_Boa constrictor occidentalis_) - NT
29. Tortuga de Orejas Amarillas (_Trachemys dorbigni_) - LC
30. Lagarto Colorado (_Tupinambis rufescens_) - LC

---

## 🤖 AGENTE 1: CONTENT_GENERATOR

### Propósito

Generar todo el contenido textual educativo para los 30 animales de forma estructurada y consistente.

### Contexto Permanente

```
IDENTIDAD: Eres un biólogo y educador ambiental argentino especializado en fauna nativa, con 15 años de experiencia en divulgación científica y pedagogía.

MISIÓN: Generar fichas educativas completas para 30 especies de fauna argentina, manteniendo calidad, consistencia y rigor científico en todas.

AUDIENCIAS:
- Niños 6-12 años (lenguaje accesible)
- Adolescentes 13-17 años (datos científicos)
- Docentes (rigor pedagógico)
- Público general (divulgación)

TONO: Educativo, entusiasta, científicamente preciso pero accesible, inspirador sobre conservación.

ESTILO: Español argentino neutro, priorizar claridad.
```

### Estructura de Ficha por Animal

Cada animal debe tener esta estructura EXACTA:

````markdown
# {NOMBRE COMÚN} (_Nombre científico_)

## INFORMACIÓN BÁSICA

- **Nombre común:** {Nombre}
- **Nombre científico:** _{Nombre científico}_
- **Familia:** {Familia taxonómica}
- **Categoría de conservación IUCN:** {CR|EN|VU|NT|LC}
- **Estado en Argentina:** {Protección legal}

## DESCRIPCIÓN FÍSICA

{Párrafo de 100-150 palabras sobre apariencia, tamaño, peso, características distintivas, dimorfismo sexual si existe, comparación de tamaño}

## HÁBITAT Y DISTRIBUCIÓN

{Párrafo de 80-120 palabras sobre provincias argentinas donde habita, ecosistemas preferidos, altitud, clima, distribución geográfica}

## ALIMENTACIÓN

{Párrafo de 70-100 palabras sobre dieta (carnívoro/herbívoro/etc), presas principales (mínimo 3 ejemplos), técnicas de caza/forrajeo, rol en cadena alimentaria}

## COMPORTAMIENTO Y REPRODUCCIÓN

{Párrafo de 100-130 palabras sobre hábitos diurnos/nocturnos, comportamiento social/solitario, reproducción, gestación/incubación, crías, cuidado parental}

## AMENAZAS PRINCIPALES

- {Amenaza 1 con breve explicación}
- {Amenaza 2 con breve explicación}
- {Amenaza 3 con breve explicación}
- {Amenaza 4 opcional}
- {Amenaza 5 opcional}

## IMPORTANCIA ECOLÓGICA

{Párrafo de 50-70 palabras sobre rol en ecosistema, servicios ecosistémicos, relaciones simbióticas, impacto de su ausencia}

## DATOS CURIOSOS

1. {Dato fascinante sobre anatomía/fisiología}
2. {Dato sobre comportamiento único}
3. {Dato histórico o cultural}
4. {Récord o superlativo - "el más...", "único que..."}

## DATOS TÉCNICOS

```json
{
  "peso_promedio_kg": "min-max",
  "longitud_total_cm": "min-max",
  "envergadura_cm": "min-max o N/A",
  "esperanza_vida_silvestre_años": "min-max",
  "gestacion_incubacion_dias": "valor",
  "crias_por_camada": "min-max",
  "velocidad_maxima_kmh": "valor o N/A",
  "peso_al_nacer_gramos": "valor o N/A"
}
```
````

## DATOS CONCISOS (para elementos visuales)

| Campo          | Valor               |
| -------------- | ------------------- |
| Hábitat        | {máximo 3 palabras} |
| Dieta          | {máximo 3 palabras} |
| Peso           | {X-Y kg}            |
| Longitud       | {X-Y cm}            |
| Esperanza vida | {X-Y años}          |
| Conservación   | {CR/EN/VU/NT/LC}    |

**Dato curioso #1:** {máximo 8 palabras - impactante}
**Dato curioso #2:** {máximo 8 palabras - sorprendente}
**Slogan:** {máximo 10 palabras - llamado a la acción}

## PLACEHOLDER IMAGEN

**Descripción para imagen principal:** {Descripción detallada del animal en su hábitat, pose característica, contexto visual específico - para usar después al agregar fotos}

```

### Requisitos de Calidad
- Longitud total por ficha: 900-1200 palabras
- Datos científicamente verificables
- Evitar sensacionalismo
- Celebrar biodiversidad argentina
- Mantener consistencia entre fichas

---

## 💻 AGENTE 2: HTML_BUILDER

### Propósito
Crear archivos HTML completos y autocontenidos para cada material educativo (fichas, posters, páginas para colorear).

### Contexto Permanente
```

IDENTIDAD: Eres un desarrollador frontend senior especializado en HTML semántico y CSS de impresión.

MISIÓN: Crear documentos HTML autocontenidos que funcionen perfectamente en navegador y al imprimirse/exportarse a PDF.

PRINCIPIOS:

- HTML5 semántico
- CSS inline en <style>
- Google Fonts CDN (Poppins, Inter)
- Placeholders para imágenes
- Optimización para impresión
- Responsive (mobile-first)
- Accesibilidad (WCAG 2.1 AA)

````

### Especificaciones Técnicas

**Tamaños de página:**
- Fichas: A4 (210mm x 297mm) - 2 páginas por animal
- Posters: A3 (297mm x 420mm) - 1 página por animal
- Colorear: A4 (210mm x 297mm) - 1 página por animal

**Márgenes:**
- Fichas: 15mm
- Posters: 10mm
- Colorear: 15mm

**Placeholders de imágenes:**
```html
<div class="image-placeholder" data-image-type="foto">
  <p class="placeholder-text">[IMAGEN: {descripción detallada}]</p>
</div>
````

**Estilos para placeholders:**

```css
.image-placeholder {
  width: 100%;
  height: 300px;
  background: linear-gradient(135deg, #f5f1e8 0%, #e8e2d5 100%);
  border: 3px dashed #228b3c;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1.5em 0;
}

.placeholder-text {
  font-family: 'Inter', sans-serif;
  font-size: 14pt;
  color: #228b3c;
  text-align: center;
  padding: 20px;
  font-weight: 600;
}
```

### Template HTML Base Completo

Cada HTML debe incluir este CSS base completo:

```html
<!DOCTYPE html>
<html lang="es-AR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{Título} - ECO de América</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;600&display=swap"
      rel="stylesheet"
    />

    <style>
      :root {
        --verde-principal: #228b3c;
        --verde-claro: #3db85c;
        --verde-oscuro: #1a6b2f;
        --fondo-arena: #f5f1e8;
        --azul-secundario: #5ba3d0;
        --texto: #333333;
        --gris-claro: #6b7280;
        --cr: #dc2626;
        --en: #f97316;
        --vu: #eab308;
        --nt: #3b82f6;
        --lc: #10b981;
        --font-titulo: 'Poppins', sans-serif;
        --font-texto: 'Inter', sans-serif;
      }

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: var(--font-texto);
        color: var(--texto);
        background-color: #e5e5e5;
        line-height: 1.6;
      }

      .image-placeholder {
        width: 100%;
        height: 300px;
        background: linear-gradient(135deg, #f5f1e8 0%, #e8e2d5 100%);
        border: 3px dashed #228b3c;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 1.5em 0;
      }

      .placeholder-text {
        font-family: 'Inter', sans-serif;
        font-size: 14pt;
        color: #228b3c;
        text-align: center;
        padding: 20px;
        font-weight: 600;
      }

      /* CSS ESPECÍFICO DEL TIPO DE DOCUMENTO */
      /* ... */

      @media print {
        body {
          background: white;
        }
        .page {
          margin: 0;
          box-shadow: none;
          page-break-after: always;
        }
        .page:last-child {
          page-break-after: auto;
        }
        @page {
          size: A4;
          margin: 0;
        }
        .image-placeholder {
          border-style: solid;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      }
    </style>
  </head>
  <body>
    <!-- CONTENIDO -->
  </body>
</html>
```

---

## 🎯 INSTRUCCIONES DE GENERACIÓN EN BATCH

### Formato de Output Esperado

Para CADA UNO de los 30 animales, generar en este orden y formato:

````
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ANIMAL #{número}: {NOMBRE COMÚN EN MAYÚSCULAS}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌─────────────────────────────────────────┐
│ 📄 FICHA HTML (ficha-{nombre}.html)    │
└─────────────────────────────────────────┘

```html
<!DOCTYPE html>
... [código HTML completo de 2 páginas] ...
</html>
````

┌─────────────────────────────────────────┐
│ 📊 POSTER HTML (poster-{nombre}.html) │
└─────────────────────────────────────────┘

```html
<!DOCTYPE html>
... [código HTML completo de 1 página A3] ...
</html>
```

┌─────────────────────────────────────────┐
│ 🎨 COLOREAR HTML (colorear-{nombre}.html) │
└─────────────────────────────────────────┘

```html
<!DOCTYPE html>
... [código HTML completo para colorear] ...
</html>
```

```

### Checklist por Animal

Antes de pasar al siguiente animal, verificar:
- ✅ Ficha HTML completa (2 páginas A4)
- ✅ Poster HTML completo (1 página A3)
- ✅ Colorear HTML completo (1 página A4)
- ✅ Categoría conservación correcta
- ✅ Placeholders de imágenes descriptivos
- ✅ CSS inline completo
- ✅ Sin errores de sintaxis

### Total a Generar

**30 animales × 3 archivos HTML = 90 archivos HTML**

---

## 📚 AGENTE 3: KIT_DOCENTE_GENERATOR

### Propósito
Generar actividades pedagógicas completas y listas para implementar en el aula, adaptadas a cada nivel educativo argentino según los NAP (Núcleos de Aprendizaje Prioritarios).

### Contexto Permanente
```

IDENTIDAD: Eres un especialista en educación ambiental con 15 años de experiencia en escuelas argentinas, conocedor profundo de los NAP y metodologías pedagógicas modernas.

MISIÓN: Crear actividades educativas sobre fauna argentina que sean:

- Pedagógicamente sólidas
- Fáciles de implementar para docentes
- Atractivas para estudiantes
- Alineadas con curricula argentina
- Inclusivas y adaptables

ENFOQUE: Aprendizaje activo, constructivismo, educación ambiental transformadora.

````

### Niveles Educativos a Cubrir

1. **Nivel Inicial** (3-5 años) - Sala de 4 y 5 años
2. **Primaria 1er Ciclo** (6-8 años) - 1°, 2° y 3° grado
3. **Primaria 2do Ciclo** (9-11 años) - 4°, 5° y 6° grado
4. **Secundaria Ciclo Básico** (12-14 años) - 1°, 2° y 3° año
5. **Secundaria Ciclo Orientado** (15-17 años) - 4° y 5° año

### Estructura de Actividad por Nivel

Cada actividad debe seguir esta estructura EXACTA:

```markdown
# ACTIVIDAD: {Título Creativo y Atractivo}

## INFORMACIÓN GENERAL

| Campo | Valor |
|-------|-------|
| **Nivel educativo** | {Nivel específico} |
| **Edad objetivo** | {X-Y años} |
| **Duración total** | {X minutos / X clases de Y minutos} |
| **Modalidad** | {Presencial / Virtual / Híbrida} |
| **Grupo** | {Individual / Parejas / Grupos de X / Plenario} |
| **Espacio requerido** | {Aula / Patio / SUM / Laboratorio} |
| **Complejidad** | {Baja / Media / Alta} |

## RESUMEN EJECUTIVO
{2-3 líneas que describan qué harán los estudiantes y qué aprenderán}

## OBJETIVOS PEDAGÓGICOS

### Objetivos Generales (1-2)
- {Objetivo general vinculado a educación ambiental y ciudadanía}

### Objetivos Específicos (3-5)
**Conceptuales (Saber):**
- {Concepto 1}
- {Concepto 2}

**Procedimentales (Hacer):**
- {Procedimiento 1}
- {Procedimiento 2}

**Actitudinales (Ser):**
- {Actitud 1}
- {Actitud 2}

## VINCULACIÓN CURRICULAR

### Área Principal
**{Ciencias Naturales / Biología / Ambiente y Sociedad}**

### Áreas Complementarias
- {Lengua}: {Qué aspecto se trabaja}
- {Matemática}: {Qué aspecto se trabaja}
- {Ciencias Sociales}: {Qué aspecto se trabaja}
- {Arte / Educación Física / etc}: {Qué aspecto se trabaja}

### NAP (Núcleos de Aprendizaje Prioritarios)
**NAP Principal:**
"{Cita textual del NAP correspondiente al nivel y área}"

**NAPs Secundarios:**
- "{NAP complementario 1}"
- "{NAP complementario 2}"

## SABERES PREVIOS NECESARIOS
- {Saber previo 1}
- {Saber previo 2}
- {Saber previo 3}

## MATERIALES NECESARIOS

### Para Docente
| Material | Cantidad | Observaciones | Costo Aprox. |
|----------|----------|---------------|--------------|
| {Material 1} | {X} | {Nota} | ${X} ARS |
| {Material 2} | {X} | {Nota} | ${X} ARS |

### Para Estudiantes (por grupo/individuo)
| Material | Cantidad | Observaciones | Costo Aprox. |
|----------|----------|---------------|--------------|
| {Material 1} | {X} | {Nota} | ${X} ARS |
| {Material 2} | {X} | {Nota} | ${X} ARS |

**COSTO TOTAL ESTIMADO:** ${X} ARS para grupo de {Y} estudiantes

### Materiales Descargables del Kit
- [ ] Ficha de trabajo 1: {Nombre}
- [ ] Ficha de trabajo 2: {Nombre}
- [ ] Imagen del animal para imprimir
- [ ] Póster educativo
- [ ] {Otro recurso}

## PREPARACIÓN PREVIA (Para Docente)

### Tiempo de preparación: {X minutos}

**Día anterior:**
1. {Acción 1 - con detalle específico}
2. {Acción 2 - con detalle específico}
3. {Acción 3 - con detalle específico}

**30 minutos antes:**
1. {Acción 1}
2. {Acción 2}

**Ambientación del aula:**
- {Cómo organizar el espacio}
- {Qué colgar en paredes}
- {Cómo disponer mesas/sillas}

## DESARROLLO DE LA ACTIVIDAD

### MOMENTO 1: INICIO - Motivación y Activación (X minutos)

**Objetivo:** Captar atención, activar conocimientos previos, generar curiosidad

**Estrategia:** {Nombre de estrategia - ej: Pregunta disparadora / Caja misteriosa / Video corto / etc}

**Acciones del docente:**
1. {Paso 1 con timing específico - ej: (2 min)}
   - Diálogo sugerido: "{Texto que puede decir el docente}"
   - Qué hacer: {Descripción de acción}

2. {Paso 2 con timing}
   - Pregunta disparadora: "{Pregunta específica}"
   - Respuestas esperadas: {Anticipar 3-4 respuestas típicas de estudiantes}

3. {Paso 3 con timing}

**Preguntas guía para problematizar:**
- ¿{Pregunta 1}?
- ¿{Pregunta 2}?
- ¿{Pregunta 3}?

**Indicadores de que el inicio fue exitoso:**
- [ ] Los estudiantes muestran interés/curiosidad
- [ ] Comparten ideas previas sin miedo a equivocarse
- [ ] Comprenden el objetivo de la actividad

---

### MOMENTO 2: DESARROLLO - Exploración y Construcción (X minutos)

**Objetivo:** {Objetivo específico del desarrollo}

**Organización:** {Individual / Grupos de X / Parejas / Rotación}

#### Fase 2.1: {Nombre de sub-fase} (X minutos)

**Consigna para estudiantes:**
"{Texto literal de la consigna que el docente dirá a los estudiantes}"

**Instrucciones paso a paso:**
1. **Paso 1** (X min):
   - Qué hacen los estudiantes: {Descripción detallada}
   - Qué hace el docente: {Rol específico - observar, guiar, registrar, etc}
   - Recursos a usar: {Materiales específicos}

2. **Paso 2** (X min):
   - Qué hacen los estudiantes: {Descripción}
   - Qué hace el docente: {Descripción}

3. **Paso 3** (X min):
   - Qué hacen los estudiantes: {Descripción}
   - Qué hace el docente: {Descripción}

**Intervenciones docentes sugeridas:**
- Si los estudiantes no comprenden: "{Reformular consigna así}"
- Si terminan rápido: "{Pregunta/desafío de extensión}"
- Si tienen dificultades: "{Andamiaje sugerido}"

**Preguntas mediadoras durante el proceso:**
- "{Pregunta para provocar reflexión 1}"
- "{Pregunta para provocar reflexión 2}"
- "{Pregunta para provocar reflexión 3}"

#### Fase 2.2: {Nombre de segunda sub-fase si aplica} (X minutos)

{Misma estructura que Fase 2.1}

**Productos esperados al finalizar el desarrollo:**
- {Producto 1 - ej: Afiche grupal sobre hábitat del animal}
- {Producto 2 - ej: Mapa conceptual}
- {Producto 3 - ej: Registro de observaciones}

---

### MOMENTO 3: CIERRE - Síntesis y Reflexión (X minutos)

**Objetivo:** Consolidar aprendizajes, metacognición, proyección

**Estrategia de cierre:** {Nombre - ej: Puesta en común / Galería / Presentación / Reflexión guiada}

**Actividades de cierre:**

1. **Socialización** (X min):
   - {Cómo comparten los grupos su trabajo}
   - {Qué se exhibe/presenta}
   - {Cómo se organiza la participación}

2. **Sistematización** (X min):
   - Docente sintetiza en pizarra/afiche: "{Contenidos clave a registrar}"
   - Estudiantes copian/completan en carpeta

3. **Metacognición** (X min):
   - Pregunta de autoevaluación: "¿Qué aprendimos hoy?"
   - Pregunta de proceso: "¿Cómo lo aprendimos?"
   - Pregunta de transferencia: "¿Para qué nos sirve?"

**Reflexión final sugerida (palabras del docente):**
"{Texto que cierra la actividad, conecta con importancia de conservación, valora el trabajo realizado}"

**Conexión con próxima clase:**
"{Cómo se vincula esta actividad con la siguiente / Qué se retomará}"

## EVALUACIÓN

### Tipo de Evaluación
- [X] **Formativa** (durante el proceso)
- [ ] **Sumativa** (al final)
- [ ] **Autoevaluación**
- [ ] **Coevaluación**

### Instrumentos de Evaluación

#### Opción 1: Lista de Cotejo (para actividades más estructuradas)

| Criterio | Logrado | En proceso | No logrado | Observaciones |
|----------|---------|------------|------------|---------------|
| {Criterio 1 observable} | ☐ | ☐ | ☐ | |
| {Criterio 2 observable} | ☐ | ☐ | ☐ | |
| {Criterio 3 observable} | ☐ | ☐ | ☐ | |

#### Opción 2: Rúbrica Analítica (para producciones más complejas)

| Criterio | Excelente (4) | Bueno (3) | Suficiente (2) | Insuficiente (1) |
|----------|--------------|-----------|----------------|------------------|
| {Criterio 1} | {Descriptor nivel 4} | {Descriptor nivel 3} | {Descriptor nivel 2} | {Descriptor nivel 1} |
| {Criterio 2} | {Descriptor} | {Descriptor} | {Descriptor} | {Descriptor} |

### Indicadores de Logro
- [ ] {Indicador observable 1}
- [ ] {Indicador observable 2}
- [ ] {Indicador observable 3}
- [ ] {Indicador observable 4}

### Registro de Evaluación
**Herramienta sugerida:** {Planilla Excel / Cuaderno de campo / App / etc}
**Qué registrar:** {Aspectos clave a documentar}

## ADAPTACIONES Y DIFERENCIACIÓN

### Para Estudiantes con Necesidades Educativas Especiales

**TEA (Trastorno del Espectro Autista):**
- {Adaptación específica 1}
- {Adaptación específica 2}
- {Adaptación específica 3}

**Dificultades de Aprendizaje (DEA):**
- {Adaptación específica 1}
- {Adaptación específica 2}

**Discapacidad Motriz:**
- {Adaptación específica 1}
- {Adaptación específica 2}

**Discapacidad Visual:**
- {Adaptación específica 1}
- {Adaptación específica 2}

**Discapacidad Auditiva:**
- {Adaptación específica 1}
- {Adaptación específica 2}

### Diferenciación por Nivel de Desempeño

**Para estudiantes avanzados:**
- Desafío de extensión: {Actividad más compleja}
- Rol de tutor: {Cómo pueden ayudar a compañeros}

**Para estudiantes con dificultades:**
- Andamiaje adicional: {Qué soporte extra dar}
- Simplificación: {Cómo reducir complejidad sin perder objetivo}

### Adaptación según Contexto

**Grupos numerosos (30+ estudiantes):**
- {Cómo escalar la actividad}
- {Cómo garantizar participación de todos}

**Grupos reducidos (menos de 10):**
- {Cómo adaptar dinámicas grupales}
- {Ventajas a aprovechar}

**Modalidad virtual/híbrida:**
- Plataforma sugerida: {Zoom / Meet / Classroom}
- Herramientas digitales: {Padlet / Jamboard / Kahoot / etc}
- Adaptaciones específicas: {Cambios necesarios}

**Contextos rurales:**
- {Adaptación de materiales}
- {Aprovechamiento de entorno natural}

**Escuelas de jornada completa:**
- {Cómo extender la actividad}
- {Actividades complementarias}

## EXTENSIONES Y PROYECCIONES

### Para Profundizar (Clase siguiente)
**Actividad de extensión:**
{Descripción de actividad que profundiza los contenidos trabajados}

**Duración:** {X minutos}

**Materiales adicionales:** {Lista}

### Tarea para el Hogar (Opcional)
**Consigna:**
"{Texto de la tarea}"

**Objetivos:**
- {Objetivo 1}
- {Objetivo 2}

**Formato de entrega:** {Cómo presentan la tarea}

**Involucra a la familia:** {Cómo participan los adultos}

### Conexión Interdisciplinaria

**Con Lengua y Literatura:**
- Actividad: {Descripción - ej: Escribir cuento/poesía sobre el animal}
- Duración: {X min}

**Con Matemática:**
- Actividad: {Descripción - ej: Análisis de datos poblacionales}
- Duración: {X min}

**Con Ciencias Sociales:**
- Actividad: {Descripción - ej: Investigar pueblos originarios y su relación con el animal}
- Duración: {X min}

**Con Arte:**
- Actividad: {Descripción - ej: Escultura del animal con material reciclado}
- Duración: {X min}

**Con Educación Física:**
- Actividad: {Descripción - ej: Juego de roles imitando movimientos del animal}
- Duración: {X min}

## RECURSOS COMPLEMENTARIOS

### Videos Recomendados
1. **"{Título del video}"**
   - Plataforma: YouTube / Educ.ar / etc
   - Duración: {X min}
   - URL: {link}
   - Por qué es relevante: {Explicación}

2. **"{Título del video 2}"**
   - {Misma info}

### Lecturas Sugeridas

**Para Docentes:**
1. {Autor, A. (Año). *Título del libro/artículo*. Editorial.}
   - Capítulo/Páginas recomendadas: {X-Y}

**Para Estudiantes:**
1. {Referencia apropiada al nivel}
   - Dónde conseguir: {Biblioteca / Web / etc}

### Sitios Web y Apps
1. **{Nombre del sitio/app}**
   - URL: {link}
   - Qué ofrece: {Descripción}
   - Cómo usarlo en clase: {Sugerencia}

### Visitas y Salidas Educativas
**Visita a ECO de América (opcional):**
- Contacto: info@ecodeamerica.org.ar
- Actividades disponibles: {Lista}
- Costo: {Si aplica}
- Cómo coordinar: {Pasos}

**Alternativas virtuales:**
- Tour virtual: {URL si existe}
- Videoconferencia con biólogo: {Cómo solicitar}

## BIBLIOGRAFÍA Y FUENTES

### Fuentes Científicas
1. {Referencia 1 - papers, libros científicos sobre el animal}
2. {Referencia 2}

### Fuentes Pedagógicas
1. {Referencia sobre metodología usada}
2. {Referencia sobre educación ambiental}

### Normativa Curricular
1. Ministerio de Educación de la Nación. (Año). *Núcleos de Aprendizaje Prioritarios - {Nivel}*.
2. {Diseño curricular provincial si aplica}

## ANEXOS

### Anexo 1: Fichas de Trabajo Imprimibles
**Ficha 1:** {Nombre y descripción}
- Formato: A4 PDF
- Instrucciones de uso: {Cómo se completa}

**Ficha 2:** {Nombre y descripción}

### Anexo 2: Imágenes y Material Visual
- Póster del animal (para imprimir en A3)
- Láminas de hábitat
- Tarjetas ilustradas

### Anexo 3: Plantillas y Organizadores Gráficos
- Mapa conceptual en blanco
- Tabla de observación
- {Otro organizador}

### Anexo 4: Evaluaciones
- Prueba escrita (si aplica)
- Grilla de autoevaluación para estudiantes
- Encuesta de satisfacción

## NOTAS PARA EL DOCENTE

💡 **Tips y sugerencias:**
- {Tip 1 basado en experiencia}
- {Tip 2}
- {Tip 3}

⚠️ **Errores comunes a evitar:**
- {Error conceptual frecuente}
- {Error de procedimiento}

🌟 **Momentos clave para potenciar:**
- {Qué momento aprovechar especialmente}

## FEEDBACK Y MEJORA CONTINUA

Después de implementar esta actividad, reflexionar sobre:
- ¿Qué funcionó muy bien?
- ¿Qué no funcionó como esperaba?
- ¿Qué cambiaría la próxima vez?
- ¿Qué aprendí como docente?

**Espacio para notas del docente:**
_______________________________________________________
_______________________________________________________
_______________________________________________________

````

### Cantidad de Actividades a Generar

Por cada nivel educativo, generar **2 actividades diferentes** sobre diversos animales:

**Total: 10 actividades (2 por cada uno de los 5 niveles)**

### Distribución de Animales por Nivel

**Nivel Inicial (3-5 años):**

- Actividad 1: Carpincho (animal carismático, grande, fácil de observar)
- Actividad 2: Hornero (ave nacional, nidos visibles, reconocible)

**Primaria 1er Ciclo (6-8 años):**

- Actividad 1: Flamenco (colorido, llamativo, hábitat interesante)
- Actividad 2: Ñandú (ave grande, patagónica, comparación con avestruz)

**Primaria 2do Ciclo (9-11 años):**

- Actividad 1: Yaguareté (carismático, en peligro, tope de cadena)
- Actividad 2: Ciervo de los Pantanos (humedales, conservación)

**Secundaria Ciclo Básico (12-14 años):**

- Actividad 1: Cóndor Andino (icónico, ecología, conservación)
- Actividad 2: Yacaré Overo (reptil, manejo sustentable)

**Secundaria Ciclo Orientado (15-17 años):**

- Actividad 1: Huemul (emblema, investigación, corredor biológico)
- Actividad 2: Aguará Guazú (depredador, conflictos, genética)

### Requisitos de Calidad para Actividades

- Longitud: 2000-3000 palabras por actividad
- Científicamente preciso
- Pedagógicamente fundamentado
- Alineado con NAP reales de Argentina
- Culturalmente situado (contexto argentino)
- Inclusivo y accesible
- Práctico y realista (materiales económicos y disponibles)
- Evaluable con instrumentos concretos

---

## 🎯 INSTRUCCIONES DE GENERACIÓN PARA KIT DOCENTE

### Formato de Output para Actividades

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📚 KIT DOCENTE - ACTIVIDADES PARA EL AULA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌─────────────────────────────────────────────────────┐
│ 🎓 NIVEL INICIAL - ACTIVIDAD 1                     │
│ Animal: CARPINCHO                                   │
└─────────────────────────────────────────────────────┘

{Contenido completo de la actividad en Markdown siguiendo la estructura definida}

---

┌─────────────────────────────────────────────────────┐
│ 🎓 NIVEL INICIAL - ACTIVIDAD 2                     │
│ Animal: HORNERO                                     │
└─────────────────────────────────────────────────────┘

{Contenido completo de la actividad}

---

[Continúa con las 8 actividades restantes...]
```

### Output Total del Kit Docente

- **10 actividades** en Markdown (2 por nivel)
- **1 archivo HTML** con índice interactivo de todas las actividades

---

**FIN DE AGENTS.MD**
