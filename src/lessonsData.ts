export interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  content: string;
  symbol?: string;
  symbolDescription?: string;
  interactiveType?: 'altar' | 'stone' | 'hammer' | 'binary' | 'letters' | 'chakras' | 'triad' | 'columns';
  imageUrl?: string;
}

export const lessonCategories = [
  {
    title: "Fundamentos",
    lessons: ["intro", "historia", "doctrina", "gadu"]
  },
  {
    title: "El Proceso",
    lessons: ["cuarto", "viajes", "caliz", "piedra", "vestimenta", "marcha"]
  },
  {
    title: "Herramientas",
    lessons: ["mazo", "escuadra", "columnas", "mosaico", "toques"]
  },
  {
    title: "Filosofía",
    lessons: ["numeros", "verbo", "tabernac", "chakras"]
  },
  {
    title: "La Logia",
    lessons: ["templo", "pillares", "delta", "ara", "cosmologia"]
  },
  {
    title: "Ética",
    lessons: ["secreto", "tolerancia", "ley", "salario"]
  }
];

export const lessons: Record<string, Lesson> = {
  intro: {
    id: "intro",
    title: "La iniciación masónica",
    subtitle: "El umbral interior y el despertar del neófito",
    category: "Fundamentos",
    imageUrl: "/iniciacion.webp",
    content: `
      <p>La <strong>Iniciación Masónica</strong> no es la simple admisión formal a un club social, sino un proceso de alquimia interior que marca la muerte simbólica del hombre profano y el renacimiento espiritual del iniciado. El candidato, despojado de sus metales (prejuicios, riquezas mundanas y dogmas), ingresa ciego y en estado de indefensión al Templo.</p>

      <h3 class="text-lg font-serif font-semibold text-stone-950 mt-6 mb-3">La Iniciación Interna</h3>
      <p class="mb-4">Este viaje ceremonial representa la geografía mística de las escuelas antiguas (Egipto, Grecia, Caldea, India). La verdadera iniciación ocurre en el fuero interno; consiste en el despertar de la conciencia, el paso consciente de las tinieblas del ego profano a la luz de la comprensión espiritual y el amor fraternal universal.</p>

      <div class="my-6 p-5 bg-[#faf8f5] border-l-4 border-amber-600 rounded-r shadow-xs">
        <strong class="text-stone-900 block mb-1">Misión Principal:</strong> El objeto de este grado es la purificación moral del hombre, enseñándole a desbastar las asperezas de su propio carácter para encajar perfectamente como un bloque pulido en el gran Templo de la Humanidad.
      </div>
    `
  },
  historia: {
    id: "historia",
    title: "Orígenes y Tradición",
    subtitle: "De los constructores de catedrales a la masonería especulativa",
    category: "Fundamentos",
    imageUrl: "/origenes.webp",
    content: `
      <p>La Masonería moderna posee una doble raíz: histórica (el gremio operativo medieval) y filosófica (los misterios esotéricos antiguos).</p>

      <h3 class="text-lg font-serif font-semibold text-stone-950 mt-6 mb-3">La Transición Histórica</h3>
      <p class="mb-4">En la <strong>Antigüedad, los Masones Operativos</strong> eran los constructores que dominaban el arte sagrado de la cantería y la geometría aplicada a la erección de catedrales, abadías y castillos. Poseían gremios jerárquicos cerrados protegidos por señas secretas de reconocimiento.</p>

      <p class="mb-4">Hacia el siglo XVII y XVIII, con el declive de la construcción física de catedrales, las logias comenzaron a "aceptar" a miembros honorarios que ya no labraban la piedra material, sino la piedra del intelecto y el alma. Así nació la <strong>Masonería Especulativa o Filosófica</strong>, unificada con la fundación de la Gran Logia de Londres en la festividad de San Juan Bautista de 1717.</p>

      <div class="my-5 p-5 bg-amber-50/50 border border-amber-200 rounded">
        <h4 class="text-sm font-semibold text-amber-800 uppercase tracking-wider mb-2 font-mono">El Gran Legado</h4>
        <p class="text-stone-700 text-sm leading-relaxed text-justify">La escuadra que antes medía los sillares físicos de piedra ahora mide la rectitud de los actos del Masón; el compás que trazaba los planos de los templos de Dios hoy define el límite armonioso que previene el desborde de nuestras pasiones.</p>
      </div>
    `
  },
  doctrina: {
    id: "doctrina",
    title: "La doctrina iniciática",
    subtitle: "El esoterismo puro frente a los dogmas exotéricos",
    category: "Fundamentos",
    imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=600&h=338&q=60",
    content: `
      <p>A diferencia de las religiones tradicionales de carácter exotérico (público, dogmático y moralizador), la Masonería propone una <strong>Doctrina Iniciática de orden Esotérico</strong> (interno, gradual y vivencial).</p>

      <h3 class="text-lg font-serif font-semibold text-stone-950 mt-6 mb-3">La Doctrina del Pensamiento Libre</h3>
      <p class="mb-4">La Masonería no impone una teología particular. No exige fe dogmática en libros revelados, sino que invita al iniciado a liberar su mente de prejuicios burgueses, presiones sociales y fanatismos sectarios. El sendero masónico insta al racionalismo crítico y místico al mismo tiempo: buscar la Verdad por uno mismo.</p>

      <ul class="list-disc pl-6 mb-5 text-stone-750 leading-relaxed text-sm space-y-2">
        <li><strong>Ciencia Moral Antirreligiosa:</strong> La Orden enseña una moral universal, autónoma e independiente de cualquier bando eclesiástico, promoviendo la fraternidad entre católicos, protestantes, deístas y agnósticos.</li>
        <li><strong>La Búsqueda Libre:</strong> Enseña que el verdadero templo de adoración espiritual es la conciencia recta del librepensador, combatiendo la opresión ignorante de los prejuicios sectarios.</li>
      </ul>
    `
  },
  gadu: {
    id: "gadu",
    title: "El principio del G∴A∴D∴U∴",
    subtitle: "La inteligencia cósmica detrás del velo de la creación",
    category: "Fundamentos",
    imageUrl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=600&h=338&q=60",
    content: `
      <p>El <strong>Gran Arquitecto del Universo (G∴A∴D∴U∴)</strong> es el principio divino inteligente que constituye el eje espiritual de la Masonería universal.</p>

      <h3 class="text-lg font-serif font-semibold text-stone-950 mt-6 mb-3">Una Fuerza en Lugar de un Dogma</h3>
      <p class="mb-4">Para el iniciado, el G∴A∴D∴U∴ no encarna a un dios antropomórfico celoso o punitivo que exige sumisión ciega. Es la Inteligencia Suprema, la Ley de Armonía Geométrica y Física, la Causa Primera que organiza el tejido del Cosmos.</p>

      <p class="mb-4">Bajo el amparo de este principio no-dogmático, masones de credos muy diferentes (cristianos, judíos, musulmanes, budistas o filósofos deístas) pueden unirse en fraternidad absoluta en Logia. Cada uno asocia la forma geométrica al Ser Supremo de sus íntimas convicciones racionales, reconociendo el foco común de la Creación.</p>
    `
  },
  cuarto: {
    id: "cuarto",
    title: "La Cámara de Reflexiones",
    subtitle: "La prueba de la tierra y el descenso a los infiernos del ego",
    category: "El Proceso",
    imageUrl: "/camara.webp",
    content: `
      <p>Antes de ver la luz, el candidato es recluido en un calabozo sombrío: la <strong>Cámara de Reflexiones</strong>, un espacio que representa el descenso a las entrañas del planeta y la muerte biológica del estado profano.</p>

      <h3 class="text-lg font-serif font-semibold text-stone-950 mt-6 mb-3">El Misterio de V.I.T.R.I.O.L.</h3>
      <p class="mb-4">En las oscuras paredes decoradas con calaveras, huesos, relojes de arena, sal, azufre y porciones de pan, resplandece la gran máxima hermética del latín:</p>
      <div class="text-center p-3 my-4 bg-stone-900 text-[#d4af37] font-mono rounded text-sm tracking-widest uppercase">
        V.I.T.R.I.O.L.
      </div>
      <p class="italic text-stone-600 block text-center mb-4">
        "Visita Interiora Terrae Rectificando Invenies Occultum Lapidem"
      </p>
      <p class="mb-4">Esto se traduce como: <em>Visita el interior de la tierra, rectificando encontrarás la piedra oculta</em>. Significa que el iniciado debe realizar una rigurosa autoevaluación socrática y purificarse de sus bajezas antes de poder descubrir la gema divina de la verdad eterna.</p>

      <h3 class="text-lg font-serif font-semibold text-stone-950 mt-6 mb-3">El Testamento Masónico</h3>
      <p class="mb-4">En esta cámara, el candidato debe redactar su <strong>Testamento</strong>, consagrando sus últimos pensamientos profanos al escribir sus deberes respecto a:</p>
      
      <ul class="list-disc pl-6 mb-4 text-stone-750 leading-relaxed text-sm space-y-1">
        <li><strong>Deberes para con la Divinidad o Inteligencia Cósmica:</strong> Seguir los dictados morales del bien y de la justicia.</li>
        <li><strong>Deberes para consigo mismo:</strong> Estudiar, dominar sus pasiones animales y cultivar las virtudes.</li>
        <li><strong>Deberes para con sus Semejantes (Familia y Patria):</strong> Actuar con estricta filantropía, caridad y rectitud.</li>
      </ul>
    `
  },
  viajes: {
    id: "viajes",
    title: "Los Tres Viajes",
    subtitle: "La purificación mística a través del aire, el agua y el fuego",
    category: "El Proceso",
    imageUrl: "/viajes.webp",
    content: `
      <p>Al salir de la Cámara de Reflexiones, el neófito realiza tres circunvalaciones sagradas, conocidas como los <strong>Tres Viajes del Aprendiz</strong>, que rememoran los antiguos ritos egipcios.</p>

      <h3 class="text-lg font-serif font-semibold text-stone-950 mt-6 mb-3">Primer Viaje — La Prueba del Aire</h3>
      <p class="mb-4">Realizado entre ruidos ensordecedores, metales chocando y asaltos simulados. Simboliza el caos tempestuoso de la vida profana antes de someterse a la regla de la virtud. Al término de esta prueba, el candidato es purificado por el <strong>Aire</strong>, barriendo con su soplo las tentaciones banales de la sociedad profana.</p>

      <h3 class="text-lg font-serif font-semibold text-stone-950 mt-6 mb-3">Segundo Viaje — La Prueba del Agua</h3>
      <p class="mb-4">Acontece en un entorno con menor ruido metálico. El candidato se sumerge simbólicamente por sus manos en el lavabo expiatorio. Representa la purificación del alma a través del <strong>Agua</strong>, limpiándola de los celos mundanos, las rabias viscerales y los resentimientos corrosivos.</p>

      <h3 class="text-lg font-serif font-semibold text-stone-950 mt-6 mb-3">Tercer Viaje — La Prueba del Fuego</h3>
      <p class="mb-4">Se efectúa en un silencio absoluto, cálido e imponente. El candidato pasa indemne cerca de las antorchas simbólicas. Representa la total transmutación moral por el <strong>Fuego</strong> sagrado del amor fraternal impersonal y el discernimiento absoluto de la mente abierta.</p>
    `
  },
  caliz: {
    id: "caliz",
    title: "El cáliz de amargura",
    subtitle: "La transmutación del sufrimiento consciente y el juramento sagrado",
    category: "El Proceso",
    imageUrl: "/caliz.webp",
    content: `
      <p>Tras las pruebas elementales, el neófito asume un doble compromiso con sabor agridulce: el <strong>Cáliz de Amargura</strong>, el <strong>Juramento Solemne</strong> y el <strong>Signo Penal</strong>.</p>

      <h3 class="text-lg font-serif font-semibold text-stone-950 mt-6 mb-3">La Amargura de la Sabiduría</h3>
      <p class="mb-4">En el ritual se le invita a beber de la copa de libación. Al inicio sabe dulce pero de golpe se torna sumamente amargo e hirviente. Simboliza el despertar de la conciencia: cuestionar las mentiras consoladoras profanas, corregir el autoengaño egoísta y enfrentar verdades crudas produce una amargura de dolor existencial indispensable (la <em>Nigredo</em> alquímica).</p>

      <h3 class="text-lg font-serif font-semibold text-stone-950 mt-6 mb-3">El Pacto de Sangre y el Signo Penal</h3>
      <p class="mb-4">El candidato, puesto de rodillas, realiza su juramento solemne de mantener en total secreto el lenguaje mudo de la Orden y socorrer al hermano caído. Sella este pacto con el <strong>Signo Penal</strong>: la mano derecha alzada al cuello con la palma boca abajo, prometiendo que preferiría tener la garganta cortada y la lengua arrancada de raíz antes que traicionar la confianza de su juramento.</p>
    `
  },
  piedra: {
    id: "piedra",
    title: "La piedra bruta y cúbica",
    subtitle: "El paradigma de la Gran Obra individual",
    category: "El Proceso",
    interactiveType: "stone",
    imageUrl: "/piedra.webp",
    content: `
      <p>El símbolo central del trabajo del Aprendiz es la transformación incesante de la <strong>Piedra Bruta</strong> en una <strong>Piedra Cúbica o Labrada</strong>.</p>
      
      <h3 class="text-lg font-serif font-semibold text-stone-950 mt-6 mb-3">La Piedra Bruta — Lo Inconsciente</h3>
      <p class="mb-4">La Piedra Bruta simboliza la mente original de cada aspirante antes de iniciar el trabajo iniciático. Se muestra tosca, informe, plagada de aristas agudas, vicios heredados de la naturaleza, egoísmo ciego e instintos primarios descontrolados. Es densa y opaca, un reflejo de la ignorancia del alma bajo el influjo profano.</p>
      
      <h3 class="text-lg font-serif font-semibold text-stone-950 mt-6 mb-3">La Piedra Cúbica — La Perfección Integrada</h3>
      <p class="mb-4">La Piedra Cúbica representa el producto final de años de disciplina rigurosa, estudio reflexivo y meditación honda. Cada arista desbastada personifica un vicio erradicado de la conducta; cada plano pulido visualiza el florecimiento de una virtud socrática. Es la piedra cuya simetría encaja de manera perfecta en los cimientos del Templo Cósmico de la Humanidad.</p>
      
      <div class="my-6 p-5 bg-amber-50/50 border border-amber-200 rounded">
        <h4 class="text-sm font-semibold text-amber-800 uppercase tracking-wider mb-2 font-mono">El Esfuerzo Personalizado</h4>
        <p class="text-stone-700 text-sm leading-relaxed">Nadie en este planeta puede tallar la piedra por otro ser humano. Los Maestros solo indican dónde y con qué ángulo asestar el golpe, pero la fuerza cinética que impulsa el cincel brota exclusivamente de la Voluntad individual del Aprendiz. Nadie se salva en masa; la iluminación es una labor artesanal.</p>
      </div>
    `
  },
  vestimenta: {
    id: "vestimenta",
    title: "El Mandil Masónico",
    subtitle: "La armadura del cantero y el deber del trabajo continuo",
    category: "El Proceso",
    symbol: "/mandil_symbol.webp",
    symbolDescription: "El mandil de cuero blanco, emblema ineludible del trabajo puro e incorruptible del masón.",
    imageUrl: "/mandil.webp",
    content: `
      <p>Al iniciarse en los Misterios del Primer Grado de la Masonería, el hermano recibe su insignia fundamental de trabajo moral: el <strong>Mandil Masónico o Delantal</strong>.</p>

      <h3 class="text-lg font-serif font-semibold text-stone-950 mt-6 mb-3">La Geometría Esotérica del Mandil</h3>
      <p class="mb-4">El mandil del Aprendiz se compone de un rectángulo de cuero blanco coronado por una solapa triangular (la <em>Baveta</em>). Esta estructura encarna geométricamente el descenso del Espíritu en el seno de la Materia:</p>
      
      <ul class="list-disc pl-6 mb-5 text-stone-750 leading-relaxed text-sm space-y-2">
        <li><strong>La Solapa Triangular (El Tres):</strong> Representa el ámbito eterno del Espíritu celestial, la trinidad de la ley divina. En el grado de Aprendiz, la solapa debe llevarse <strong>alzada</strong>, simbolizando que las luces espirituales apenas comienzan a incidir sobre los planos terrenales.</li>
        <li><strong>El Rectángulo Cuadrangular (El Cuatro):</strong> Representa los cuatro elementos de la materia ordinaria y la base biológica del cuerpo.</li>
      </ul>

      <p class="mb-4">Llevar el mandil en Logia es obligatorio. Le recuerda permanentemente al masón que el trabajo puro e incorruptible (el color blanco inmaculado) constituye su escudo heráldico y que la inacción moral está severamente proscrita en Logia.</p>
    `
  },
  marcha: {
    id: "marcha",
    title: "La marcha del Aprendiz",
    subtitle: "Los tres pasos rectilíneos sobre el templo",
    category: "El Proceso",
    imageUrl: "/marcha.webp",
    content: `
      <p>Bajo las normas de la Masonería especulativa, el movement en el Templo no se realiza al azar. Exige que el hermano ingrese al pórtico sagrado ejecutando la <strong>Marcha del Aprendiz</strong>.</p>

      <h3 class="text-lg font-serif font-semibold text-stone-950 mt-6 mb-3">La Marcha en Escuadra</h3>
      <p class="mb-4">La marcha se compone de <strong>Tres Pasos Rectilíneos</strong> que se inician con el pie izquierdo y se cierran juntando el pie derecho en ángulo recto de 90 grados (en escuadra).</p>

      <p class="mb-4 font-serif italic text-stone-600">Representa la marcha firme e inquebrantable del razonamiento lógico que avanza de Occidente (tinieblas, ignorancia profana) hacia Oriente (el sol naciente del discernimiento consciente y la sabiduría moral).</p>

      <h3 class="text-lg font-serif font-semibold text-stone-950 mt-6 mb-3">Caminar con Rectitud</h3>
      <p class="mb-4">Marcar cada paso en escuadra recuerda al Aprendiz que todas sus aspiraciones en el mundo real deben estar encuadradas bajo las fronteras éticas de la moral humana pura. No debe zigzaguear ante oportunismos del interés corporativo ni ladearse por influencias sentimentales ajenas a la justicia.</p>
    `
  },
  mazo: {
    id: "mazo",
    title: "El mazo y el cincel",
    subtitle: "La voluntad firme guiada por la inteligencia pura",
    category: "Herramientas",
    interactiveType: "hammer",
    imageUrl: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=600&h=338&q=60",
    content: `
      <p>Para desbastar la Piedra Bruta, el Aprendiz recibe dos herramientas de valor inestimable que resultan completamente inútiles si se emplean de forma aislada: el <strong>Mazo</strong> y el <strong>Cincel</strong>.</p>
      
      <h3 class="text-lg font-serif font-semibold text-stone-950 mt-6 mb-3">El Mazo — La Fuerza de Voluntad</h3>
      <p class="mb-4">El Mazo personifica la fuerza de voluntad indomable, la disciplina tenaz, la energía vital y el poder dinámico necesario para emprender la acción transformadora. Representa la fuerza motora. Sin voluntad, toda la especulación intelectual queda reducida a un vano juego de palabras estériles.</p>
      
      <h3 class="text-lg font-serif font-semibold text-stone-950 mt-6 mb-3">El Cincel — El Discernimiento</h3>
      <p class="mb-4">Por su parte, el Cincel simboliza la inteligencia pura, el discernimiento sutil y la planeación metódica de las ideas. Representa la dirección del impulso. Si el mazo golpea de forma directa sobre la piedra sin el cincel intermedia, no talla; destruye y fragmenta el mineral.</p>
      
      <div class="my-6 p-5 bg-[#faf8f5] border-l-4 border-amber-600 rounded-r shadow-xs">
        <strong class="text-stone-900 block mb-1">La Gran Máxima Hermética:</strong> Una fuerte voluntad sin ciencia de dirección no es más que temeridad destructiva. Por otra parte, la ciencia de la Verdad sin el poder práctico de la voluntad es estéril erudición cobarde. El masón equilibra ambas para esculpir su carácter.
      </div>
    `
  },
  escuadra: {
    id: "escuadra",
    title: "Escuadra, compás y plomada",
    subtitle: "El equilibrio geométrico de la conducta",
    category: "Herramientas",
    imageUrl: "/escuadra.webp",
    content: `
      <p>La conducta ética y moral del masón no constituye una estimación subjetiva de conveniencia. Se somete al escrutinio estricto de tres joyas geométricas: la <strong>Escuadra</strong>, el <strong>Compás</strong> y la <strong>Plomada</strong>.</p>
      
      <h3 class="text-lg font-serif font-semibold text-stone-950 mt-6 mb-3 font-semibold">La Escuadra — La Rectitud Moral</h3>
      <p class="mb-4">La Escuadra mide la perpendicularidad de las superficies y traza el ángulo de 90 grados. Encarna el principio espiritual de la <strong>Rectitud Moral</strong> y la conducta intachable en relación al prójimo. Actuar "bajo la escuadra" implica que nuestras acciones deben ajustarse a la regla de oro: no hagas a otros lo que no desees que hagan contigo, obrando con equidad implacable.</p>
      
      <h3 class="text-lg font-serif font-semibold text-stone-950 mt-6 mb-3">El Compás — Los Límites de la Sabiduría</h3>
      <p class="mb-4">El Compás delimita la circunferencia y define la relación de correspondencia matemática con el centro. Símbolo inequívoco del <strong>Espíritu</strong> divino y la expansión de la Consciencia. El grado de apertura del compás grafica la amplitud intelectual y moral del iniciado: un compás obtuso domina la ignorancia, pero un compás equilibrado mantiene nuestra vida social dentro de fronteras pacíficas y bondadosas.</p>
      
      <h3 class="text-lg font-serif font-semibold text-stone-950 mt-6 mb-3 font-semibold">La Plomada — El Ascenso Perpendicular</h3>
      <p class="mb-4">La Plomada, regida por la fuerza de gravedad celeste, señala la vertical absoluta. Exige del masón la <strong>Búsqueda Vertical de la Virtud</strong> y la elevación mental. Previene que el hermano se incline hacia los extremismos doctrinarios, los sectarismos ideológicos o caiga de rodillas ante la adulación del mundo profano.</p>
    `
  },
  columnas: {
    id: "columnas",
    title: "Las columnas Jakin y Boaz",
    subtitle: "El umbral de la Dualidad primordial",
    category: "Herramientas",
    interactiveType: "columns",
    imageUrl: "/columnas.webp",
    content: `
      <p>A las puertas del Templo del Rey Salomón, y flanqueando el umbral de entrada de toda Logia regular, se erigen majestuosas dos columnas imperiales de bronce: <strong>Jakin (J)</strong> y <strong>Boaz (B)</strong>.</p>
      
      <h3 class="text-lg font-serif font-semibold text-stone-950 mt-6 mb-3">Jakin — El Principio Activo</h3>
      <p class="mb-4">Ubicada a la derecha de la entrada, Jakin (del hebreo <em>"Él establecerá"</em>) representa el principio masculino, solar, constructivo, la fuerza expansiva, la iniciativa ardiente, el azufre misterioso de los alquimistas medievales. Es el polo positivo del electromagnetismo existencial.</p>
      
      <h3 class="text-lg font-serif font-semibold text-stone-950 mt-6 mb-3">Boaz — El Principio Pasivo</h3>
      <p class="mb-4">Situada a la izquierda, Boaz (del hebreo <em>"En Él reside la fuerza"</em>) representa el principio femenino, lunar, receptivo, la densidad concentrada, la matriz gestadora, la sal del laboratorio alquímico. Es el polo magnético negativo de la creación universal.</p>
      
      <div class="my-6 p-5 bg-[#faf8f5] border-l-4 border-amber-600 rounded-r shadow-xs">
        <strong class="text-stone-900 block mb-1">El Camino del Medio:</strong> El templo masónico no se edifica sobre una de las dos columnas de forma exclusiva. La Logia sagrada se sostiene en la tensión dinámica y el equilibrio justo que reina <em>entre ambas columnas</em>. Cruzar el pórtico exige transitar con paso firme por el centro magnético.
      </div>
    `
  },
  mosaico: {
    id: "mosaico",
    title: "El pavimento de mosaico",
    subtitle: "La gran ley cósmica de los contrastes",
    category: "Herramientas",
    interactiveType: "binary",
    imageUrl: "/mosaico.webp",
    content: `
      <p>El suelo central que sirve de tapiz y escenario en la Logia está constituido por un tablero ajedrezado con cuadrados alternados de color blanco y de color negro. Este es el venerable <strong>Pavimento de Mosaico</strong>.</p>
      
      <h3 class="text-lg font-serif font-semibold text-stone-950 mt-6 mb-3">La Tensión Dinámica en la Materia</h3>
      <p class="mb-4">Este suelo es la representación visual abstracta de la <strong>Ley de los Contrastes Universales</strong>. Simboliza de forma geométrica el campo de juego de la vida terrestre: el día y la noche, la luz y las tinieblas de la mente, la alegría risueña y el sufrimiento desgarrador, la salud radiante y la enfermedad, el bien y el mal relativos.</p>
      
      <p class="mb-4">No existe posibilidad de experimentar la existencia material sin encontrarse bajo el imperio de la dualidad. El color blanco no existiría sin la oposición visible de la negrura que le rodea.</p>
      
      <div class="my-6 p-5 bg-amber-50/50 border border-amber-200 rounded">
        <h4 class="text-sm font-semibold text-amber-800 uppercase tracking-wider mb-2 font-mono">La Virtud de la Ecuanimidad</h4>
        <p class="text-stone-700 text-sm leading-relaxed">La enseñanza mística del Pavimento de Mosaico no impele a desterrar las baldosas negras —labor materialmente imposible en este plano denso—. La verdadera maestría consiste en <strong>aprender a caminar sobre ambas con ecuanimidad y pie templado</strong>. Un iniciado no se embriaga de vanidad sobre el cuadrado blanco, ni se sumerge en la desesperación cuando pisa la loseta negra.</p>
      </div>
    `
  },
  toques: {
    id: "toques",
    title: "Señas, toques y saludos",
    subtitle: "Las tres llaves mudas para franquear la puerta del Templo",
    category: "Herramientas",
    symbol: "🤝",
    symbolDescription: "El toque de unión en la falange de la mano, sutil seña del lazo misterioso entre hermanos.",
    imageUrl: "/toques.webp",
    content: `
      <p>La Masonería, heredera legítima de los gremios antiguos de constructores, utiliza un refinado lenguaje mudo para proteger el recinto secreto y constatar el rango moral del hermano: los <strong>Saludos, Señas, Toques y Baterías</strong>.</p>

      <h3 class="text-lg font-serif font-semibold text-stone-950 mt-6 mb-3">Los Tres Golpes</h3>
      <p class="mb-4">Para ingresar al Templo, el masón llama a la puerta ejecutando el <strong>Toque de Llamado</strong> consistente en tres golpes pausados y fuertes (∴), que corresponden al eco de la promesa evangélica: <em>“Pedid y se os dará, buscad y hallaréis, llamad y se os abrirá”</em>.</p>

      <h3 class="text-lg font-serif font-semibold text-stone-950 mt-6 mb-3">El Toque de Reconocimiento</h3>
      <p class="mb-4">El saludo físico se produce mediante una suave presión efectuada con la yema del pulgar del interlocutor directamente sobre la primera falange del dedo índice de la mano derecha del hermano. Este toque discreto permite detectar la condición masónica al instante en medio de sociedades profanas ostentosas.</p>

      <h3 class="text-lg font-serif font-semibold text-stone-950 mt-6 mb-3 font-semibold">La Batería de Grado</h3>
      <p class="mb-4">Para sellar y celebrar con júbilo los trabajos colectivos, se ejecuta la <strong>Batería de Aprendiz</strong>, que consiste en tres aplausos rítmicos marcados con las palmas de las manos (uno, dos y tres) coincidiendo con la asimilación del ternario cósmico.</p>
    `
  },
  numeros: {
    id: "numeros",
    title: "La filosofía de los números sagrados",
    subtitle: "El Uno (Unidad), el Dos (Dualidad) y el Tres (Síntesis)",
    category: "Filosofía",
    interactiveType: "triad",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600&h=338&q=60",
    content: `
      <p>La aritmética filosófica de la masonería hunde sus venerables raíces en la teología de Pitágoras de Samos. Para el Aprendiz, la evolución cosmológica de las leyes universales se descifra a través de la emanación de los tres primeros principios matemáticos.</p>
      
      <h3 class="text-lg font-serif font-semibold text-stone-950 mt-6 mb-3">La Mónada — El Uno</h3>
      <p class="mb-4">Representa el Absoluto incontaminado, la Causa Primera no manifestada, la Fuente Primordial de donde emana toda la realidad matemática visible. Es el G∴A∴D∴U∴ en su dimensión inefable, el plano cuántico original.</p>
      
      <h3 class="text-lg font-serif font-semibold text-stone-950 mt-6 mb-3">La Dualidad — El Dos</h3>
      <p class="mb-4">Para poder contemplar sus propias perfecciones, la Unidad Infinita se desdobla. Nace la dualidad: el observador y lo observado, el polo positivo y el polo negativo, la luz que es proyectada y la superficie oscura que la absorbe. El Dos encarna la materia, pero también la tensión dialéctica y el germen del conflicto terrestre.</p>
      
      <h3 class="text-lg font-serif font-semibold text-stone-950 mt-6 mb-3">El Ternario — El Tres y la Abreviatura Tripuntuada</h3>
      <p class="mb-4">El Tres es la <strong>Fuerza Integradora</strong> que resuelve el antagonismo destructivo planteado por la dualidad. Tesis y Antítesis se fusionan para dar a luz a la Síntesis trascendente. Simbolizado por los tres puntos masónicos (∴) que escoltan cada firma, el Delta Luminoso y los tres pilares del templo, enseña que toda oposición aparente halla reconciliación en un plano superior.</p>
    `
  },
  verbo: {
    id: "verbo",
    title: "La magia del verbo sagrado",
    subtitle: "La Cabalá cuántica de las letras primordiales",
    category: "Filosofía",
    interactiveType: "letters",
    imageUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=600&h=338&q=60",
    content: `
      <p>Para la doctrina hermética, el lenguaje no representa un convenio utilitario inventado por el hombre para comerciar bienes. El lenguaje es una fuerza cósmica creadora: es el despliegue del <strong>Verbo Divino</strong> creador.</p>
      
      <h3 class="text-lg font-serif font-semibold text-stone-950 mt-6 mb-3">La Vibración que Teje el Cosmos</h3>
      <p class="mb-4">Esta enseñanza conecta directamente con el antiguo misticismo del <em>Séfer Yetzirá</em> (Libro de la Creación). Según sus axiomas esotéricos, las partículas de la materia y el tejido mismo del espacio-tiempo son de naturaleza vibratoria, tejidas por las letras primordiales.</p>
      
      <div class="my-6 p-5 bg-[#faf8f5] border-l-4 border-amber-600 rounded-r shadow-xs">
        <strong class="text-stone-900 block mb-1">Las Letras del Aprendiz:</strong> El Aprendiz de la Logia debe estudiar y meditar individualmente en el valor numérico, sónico y energético de las cinco letras primordiales (A, B, G, D, Hé) que estructuran geométricamente el camino sagrado.
      </div>
    `
  },
  tabernac: {
    id: "tabernac",
    title: "El tabernáculo interno",
    subtitle: "La geografía sagrada y anatómica del ser vivo",
    category: "Filosofía",
    interactiveType: "altar",
    imageUrl: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=600&h=338&q=60",
    content: `
      <p>En las escuelas antiguas se instruía al iniciado en una verdad radiante: el Templo de Dios es sagrado, y ese templo indomable sois vosotros. La arquitectura de piedra que nos cobija es el plano a escala de la anatomía sutil humana.</p>
      
      <h3 class="text-lg font-serif font-semibold text-stone-950 mt-6 mb-3 font-semibold">La Geografía de los Cuatro Altares</h3>
      <p class="mb-4">En el Tabernáculo hebreo del desierto y en el Templo interior del Adepto, los órganos biológicos corresponden de forma exacta a los altares ceremoniales de la mística:</p>
      
      <ul class="list-disc pl-6 mb-5 text-stone-750 leading-relaxed text-sm space-y-2">
        <li><strong>El Vientre (Altar de Bronce):</strong> El fuego de los intestinos donde se incineran las pasiones animales pesadas, el egoísmo biológico y las bajas apetencias materiales.</li>
        <li><strong>El Hígado y la Sangre (El Lavabo de Purificación):</strong> El filtro químico donde se filtran las aguas psíquicas emotivas, las rabias viscerales y los resentimientos profanos.</li>
        <li><strong>El Corazón (Altar de los Perfumes):</strong> La cavidad cardíaca donde arde de forma perpetua el incienso aromático de la compasión, el amor fraternal absoluto y la devoción impersonal.</li>
        <li><strong>La Cabeza (El Sanctasanctórum):</strong> El recinto neuronal donde reside el Shejiná: el Espíritu consciente resplandeciendo en equilibrio socrático.</li>
      </ul>
      
      <div class="my-5 p-5 bg-[#faf8f5] border-l-4 border-amber-600 rounded-r shadow-xs">
        <strong class="text-stone-900 block mb-1">El Trabajo Operativo:</strong> El deber diario del verdadero masón es transmutar las emanaciones densas de los altares inferiores en efluvios sutiles para que alimenten la llama sagrada del intelecto en el Sanctasanctórum.
      </div>
    `
  },
  chakras: {
    id: "chakras",
    title: "El ascenso del fuego interior",
    subtitle: "La ascensión esotérica por los siete centros de poder",
    category: "Filosofía",
    interactiveType: "chakras",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600&h=338&q=60",
    content: `
      <p>La energía biológica que sustenta la existencia del hermano no debe ser derrochada de forma irracional en la bajeza de los vicios mundanos. Debe ser refinada y guiada a lo largo de un canal perpendicular que se extiende de forma vertical a lo largo de la médula espinal.</p>
      
      <h3 class="text-lg font-serif font-semibold text-stone-950 mt-6 mb-3 font-semibold">La Columna Vertebral y los Siete Grados</h3>
      <p class="mb-4">A lo largo del canal vertebral (el Caduceo del dios Hermes), la tradición hermética sitúa siete centros de polarización sutil o turbinas energéticas —conocidos en el oriente brahmánico como <em>Chakras</em> y en la Cábala siria como los centros de los Sefirot—.</p>
      
      <p class="mb-4">A medida que el iniciado trabaja con el mazo de su voluntad y el cincel de su intelecto sobre su Piedra Bruta, el canal de la columna se desbloquea, propiciando el despertar concatenado de estos siete grados internos de percepción espiritual.</p>
    `
  },
  templo: {
    id: "templo",
    title: "La logia como cosmos",
    subtitle: "La correspondencia geométrica del plano celeste",
    category: "La Logia",
    imageUrl: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&q=80&w=600&h=338&q=60",
    content: `
      <p>La Logia Masónica o Templo Secreto no es un simple salón de conferencias decorado con símbolos de la herállica medieval. Es un cosmograma tridimensional calculado con asombrosa precisión matemática para reflejar el orden absoluto del Universo entero.</p>
      
      <h3 class="text-lg font-serif font-semibold text-stone-950 mt-6 mb-3 font-semibold">Las Dimensiones Sagradas</h3>
      <p class="mb-4">En su escala conceptual, el Templo es un cuadrilongo perfecto cuyas dimensiones abarcan los confines del cosmos:</p>
      
      <ul class="list-disc pl-6 mb-4 text-stone-750 leading-relaxed text-sm space-y-1">
        <li><strong>Su extensión:</strong> De Norte a Sur, y de Oriente a Occidente, abarcando la hermandad de todos los confines de la geografía terrestre.</li>
        <li><strong>Su altura:</strong> Alcanza perpendicularmente el Cénit o la bóveda del firmamento nocturno tachonado de estrellas.</li>
        <li><strong>Su profundidad:</strong> Desciende sin desvíos hasta el Nadir, el núcleo geológico del planeta.</li>
      </ul>
      
      <h3 class="text-lg font-serif font-semibold text-stone-950 mt-6 mb-3">La Luz que emana desde el Adentro</h3>
      <p class="mb-4">Una característica única del Templo es su <strong>hermeticidad absoluta</strong>: carece por completo de ventanas que conecten con el exterior profano. Este plano sutil enseña que el iniciado no debe mendigar luces morales falsas en el exterior de la sociedad. La verdad absoluta reside durmiente en las cámaras de la autoreflexión mental.</p>
    `
  },
  pillares: {
    id: "pillares",
    title: "Los tres pilares de la logia",
    subtitle: "Sabiduría, Fuerza y Belleza — El soporte cósmico",
    category: "La Logia",
    interactiveType: "triad",
    imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=600&h=338&q=60",
    content: `
      <p>El soporte invisible del Universo físico y el sostén ético de toda Logia regular descansa esotéricamente en la presencia mística de tres grandes columnas o <strong>Pilares de Soporte</strong>: la Sabiduría, la Fuerza y la Belleza.</p>
      
      <h3 class="text-lg font-serif font-semibold text-stone-950 mt-6 mb-3">El Pilar de la Sabiduría (Venerable Maestro)</h3>
      <p class="mb-4">Ubicada en Oriente, este pilar personifica el intelecto divino, el discernimiento filosófico y el planeamiento armónico de todas las empresas. Sin la sabiduría moral inicial, cualquier proyecto humano nace ciego y desprovisto de un propósito verdadero, encallando rápidamente en el fracaso.</p>
      
      <h3 class="text-lg font-serif font-semibold text-stone-950 mt-6 mb-3">El Pilar de la Fuerza (Primer Vigilante)</h3>
      <p class="mb-4">Situada en Occidente, representa el vigor implacable, la determinación inquebrantable de la voluntad, el coraje moral y la fuerza del carácter indispensable para sostener la construcción filosófica a través de la tormenta. Sin la fuerza, los más grandes anhelos de la mente mueren cobardes ante la adversidad profana.</p>
      
      <h3 class="text-lg font-serif font-semibold text-stone-950 mt-6 mb-3">El Pilar de la Belleza (Segundo Vigilante)</h3>
      <p class="mb-4">Situada en la columna del Sur, simboliza el principio de proporción ideal, simetría armoniosa y elegancia que debe ornar cada rincón de nuestra existencia mental. La belleza equilibra y une la sabiduría intelectual y el ímpetu de la fuerza bajo un tapiz pacífico que adorna el alma humana.</p>
    `
  },
  delta: {
    id: "delta",
    title: "El delta luminoso",
    subtitle: "El Ojo de la Consciencia Suprema",
    category: "La Logia",
    symbol: "⊙",
    symbolDescription: "El triángulo radiante en Oriente que evoca la presencia divina del Ojo del Espíritu que no parpadea jamás.",
    imageUrl: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=600&h=338&q=60",
    content: `
      <p>En el plano central de Oriente, presidiendo majestuoso desde las alturas del dosel del Venerable Maestro, brilla el <strong>Delta Luminoso</strong>: un triángulo equilátero que irradia rayos dorados, portando en su centro el Ojo de la Omnisapiencia divina.</p>
      
      <h3 class="text-lg font-serif font-semibold text-stone-950 mt-6 mb-3 font-semibold">La Geometría del Ternario Celestial</h3>
      <p class="mb-4">El triángulo equilátero constituye la figura perfecta de la síntesis universal. Sus tres lados simétricos representan las fuerzas coordinadas de la Sabiduría creadora, la Fuerza estructurante y la Belleza que adorna el cosmos.</p>
      
      <h3 class="text-lg font-serif font-semibold text-stone-950 mt-6 mb-3">El Ojo Central Despierto</h3>
      <p class="mb-4">El ojo divino insomne del Delta representa la verdad del Gran Arquitecto del Universo percibiendo no la mentira de nuestras palabras calculadas, sino la motivación profunda que guía los pensamientos en los recintos más íntimos de nuestro corazón.</p>
    `
  },
  ara: {
    id: "ara",
    title: "El Altar de Juramentos",
    subtitle: "El Ara divina y el maravilloso Salmo 133",
    category: "La Logia",
    symbol: "📖",
    symbolDescription: "La Biblia abierta junto a la Escuadra y el Compás, las tres Grandes Luces que guían los deidades de la logia.",
    imageUrl: "https://images.unsplash.com/photo-1456953180671-730de08edaa7?auto=format&fit=crop&q=80&w=600&h=338&q=60",
    content: `
      <p>En el centro geométrico e imán magnético de la Logia, reposa el <strong>Altar de los Juramentos o Ara</strong>. Ante él, los candidatos arrodillados sellan sus compromisos con la Orden.</p>

      <h3 class="text-lg font-serif font-semibold text-stone-950 mt-6 mb-3">Las Tres Grandes Luces</h3>
      <p class="mb-4">Sobre la superficie del Ara descansan superpuestos las <strong>Tres Grandes Luces de la Masonería</strong>:</p>
      
      <ul class="list-disc pl-6 mb-5 text-stone-750 leading-relaxed text-sm space-y-2">
        <li><strong>El Volumen de la Ley Sagrada (La Biblia):</strong> Representa la ley moral y de sabiduría eterna que orienta la vida consciente. Tradicionalmente en Logias del rito escocés se mantiene abierta en el <strong>Salmo 133</strong>.</li>
        <li><strong>La Escuadra:</strong> Símbolo directo de las reglas de rectitud ética impuestas por la Razón y el deber hacia la humanidad civil.</li>
        <li><strong>El Compás:</strong> Símbolo de los límites armoniosos y espirituales autodefinidos dentro de los cuales deben moderarse nuestras conductas particulares.</li>
      </ul>

      <h3 class="text-lg font-serif font-semibold text-stone-950 mt-6 mb-3">El Hermoso Salmo 133</h3>
      <p class="mb-4 font-serif italic text-stone-600 block text-center border-y border-[#d4af37]/20 py-3 my-4">
        "¡Mirad cuán bueno y cuán delicioso es habitar los hermanos juntos en armonía! Es como el buen óleo sobre la cabeza, el cual desciende sobre la barba de Aarón..."
      </p>
      <p class="mb-4">Este texto consagra de forma esotérica el nacimiento de la <strong>Cadena de Unión</strong> de la Logia: cuando los hermanos se toman de la mano formando un circuito eléctrico viviente, consagrando que la fuerza del amor fraternal fluye unificada sin divisiones políticas ni vanidades mundanas.</p>
    `
  },
  cosmologia: {
    id: "cosmologia",
    title: "Cosmología y Oficialidad",
    subtitle: "Las doce columnas del Zodíaco y el influjo de las dignidades",
    category: "La Logia",
    imageUrl: "https://images.unsplash.com/photo-1516339901601-2e1d62dc0c45?auto=format&fit=crop&q=80&w=600&h=338&q=60",
    content: `
      <p>La geografía oculta del Templo Masónico está íntimamente enraizada con las leyes cósmicas invisibles. El firmamento de la Logia se apoya lateralmente sobre <strong>Doce Columnas o Pilastras</strong> ornamentadas que corresponden a los <strong>Doce Signos del Zodíaco</strong>.</p>

      <h3 class="text-lg font-serif font-semibold text-stone-950 mt-6 mb-3">Las Dignidades y Oficiales Celestes</h3>
      <p class="mb-4">Por su parte, los oficiales que administran la Logia corresponden de forma directa a la influencia energética de los astros que guían nuestra naturaleza material:</p>
      
      <ul class="list-disc pl-6 mb-5 text-stone-750 leading-relaxed text-sm space-y-2">
        <li><strong>El Venerable Maestro (Oriente):</strong> Representa al <strong>Sol</strong>, el foco del discernimiento, que abre los trabajos del día derramando la luz del conocimiento.</li>
        <li><strong>El Primer Vigilante (Occidente):</strong> Representa a <strong>Saturno</strong> o la fuerza de gravedad y el rigor que resguarda la conducta ética y asiste en cerrar diligentemente los trabajos.</li>
        <li><strong>El Segundo Vigilante (Mediodía/Sur):</strong> Corresponde a <strong>Venus</strong> o la Belleza, gobernando el descanso, el almuerzo y la asimilación armoniosa del salario moral.</li>
      </ul>

      <p class="mb-4">Esta confluencia de fuerzas estelares garantiza que la ejecución de los rituales masónicos constituya un reflejo coordinado a escala exacta de los movimientos eternos de las esferas del Cosmos.</p>
    `
  },
  secreto: {
    id: "secreto",
    title: "El secreto y el silencio",
    subtitle: "La sabiduría oculta en los portales herméticos",
    category: "Ética",
    imageUrl: "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&q=80&w=600&h=338&q=60",
    content: `
      <p>Uno de los juramentos solemnes e inquebrantables del Aprendiz es la conservación absoluta del secreto masónico y la práctica sistemática y rigurosa del silencio.</p>
      
      <h3 class="text-lg font-serif font-semibold text-stone-950 mt-6 mb-3 font-semibold">La Disciplina del Silencio</h3>
      <p class="mb-4">Durante los trabajos regulares en Logia, el Aprendiz tiene prohibido tomar la palabra de forma deliberada. Debe escuchar de manera devota las conferencias de sus superiores guardando un riguroso mutismo reflexivo. Esta regla no busca oprimirle; personifica una refinada táctica pedagógica: la mente que refrena el deseo impulsivo de charlar, acumula e interioriza la energía del saber primordial.</p>
      
      <p class="mb-4">Aquel profano que habla incesantemente derrocha su luz mental en ruidos vanos; el iniciado que calla atesora el verbo para proferir palabras sabias en el instante justo.</p>
      
      <div class="my-6 p-5 bg-[#faf8f5] border-l-4 border-amber-600 rounded-r shadow-xs">
        <strong class="text-stone-900 block mb-1">La Inviolabilidad del Secreto:</strong> Aunque en internet se puedan adquirir los manuales de los rituales masónicos completos, el verdadero Secreto de la Orden reside a salvo de la profanación mundana. El misterio masónico es de carácter místico y vivencial: es imposible de plasmar en papel impreso, ya que corresponde al estado de iluminación íntimo de cada alma despierta.
      </div>
    `
  },
  tolerancia: {
    id: "tolerancia",
    title: "Tolerancia y fraternidad universal",
    subtitle: "El respeto incondicional al sendero ajeno",
    category: "Ética",
    imageUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=600&h=338&q=60",
    content: `
      <p>La masonería proclama como principio rector irrevocable el imperio de la <strong>Tolerancia Activa</strong> y la <strong>Fraternidad Universal</strong> entre todos los seres de la tierra.</p>
      
      <h3 class="text-lg font-serif font-semibold text-stone-950 mt-6 mb-3">La Verdad es una Gema Infinita</h3>
      <p class="mb-4">La sabiduría cósmica es como un diamante de caras infinitas: cada corriente noble y sincera vislumbra únicamente un destello particular de su espectro inmortal. El librepensamiento masónico reconoce que la Verdad no constituye el coto de caza vallado de ninguna religión exclusivista o camarilla ideológica.</p>
      
      <p class="mb-4">Por consiguiente, el masón respeta fraternalmente el altar adonde ora su prójimo, pues comprende que todos los hombres de bien —sea cual fuere su credo o raza— caminan por calzadas paralelas convergiendo hacia el mismo Foco Espiritual Único.</p>
      
      <div class="my-6 p-5 bg-amber-50/50 border border-amber-200 rounded">
        <h4 class="text-sm font-semibold text-amber-800 uppercase tracking-wider mb-2 font-mono">Tolerancia no equivale a Debilidad</h4>
        <p class="text-stone-700 text-sm leading-relaxed">Sostener la tolerancia no significa claudicar cobardemente ante la injusticia, el totalitarismo civil o los prejuicios oscurantistas. El masón abriga el perdón y abraza la discrepancia racional, pero combate implacablemente el fanatismo intolerante y la tiranía que pretende sojuzgar el libre albedrío humano.</p>
      </div>
    `
  },
  ley: {
    id: "ley",
    title: "El respeto a la ley civil",
    subtitle: "El camino gradual y constructivo del cambio social",
    category: "Ética",
    imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600&h=338&q=60",
    content: `
      <p>La Orden Masónica exige a toda su membresía un respeto irrestricto hacia el marco constitucional, la legalidad legítima y la paz social del territorio nacional que le brinda asilo y protección.</p>
      
      <h3 class="text-lg font-serif font-semibold text-stone-950 mt-6 mb-3">La Revolución Silenciosa del Individuo</h3>
      <p class="mb-4">La masonería genuina y regular rechaza tajantemente la praxis del odio civil para implantar reformas políticas. Sostiene con paciencia milenaria que no es factible fundar repúblicas justas y transparentes estructuradas con ciudadanos ignorantes y carcomidos por el vicio moral de la codicia.</p>
      
      <div class="my-6 p-5 bg-[#faf8f5] border-l-4 border-amber-600 rounded-r shadow-xs">
        <strong class="text-stone-900 block mb-1">El Método de Siembra:</strong> El verdadero método de transformación masónica actúa desde las raíces del ser interior. Al forjar el carácter ético y pulir el alma de un solo Aprendiz en Logia, la sociedad entera recibe de vuelta a un ciudadano libre, un padre virtuoso, un profesional incorruptible y un faro intelectual que irradiará de forma silenciosa la libertad civil.
      </div>
    `
  },
  salario: {
    id: "salario",
    title: "El salario del aprendiz",
    subtitle: "La recompensa trascendente en la Columna Boaz",
    category: "Ética",
    imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=600&h=338&q=60",
    content: `
      <p>Tras culminar su jornada de trabajo desbastando con mazo y cincel la Piedra Bruta de su carácter, el Aprendiz es conducido ceremonialmente hacia la <strong>Columna Boaz</strong> para percibir de forma simbólica su justa retribución: su <strong>Salario</strong>.</p>
      
      <h3 class="text-lg font-serif font-semibold text-[#d4af37] mt-6 mb-3 font-serif">¿En qué consiste el Salario del Masón?</h3>
      <p class="mb-4">Como escuela esotérica de luz, el salario del iniciado no está compuesto por lingotes de metal fiduciario profano, reconocimientos de vanidad social o medallas honorísticas de latón. El salario de un verdadero masón radica exclusivamente en su <strong>Crecimiento Interior</strong> y se divide en tres joyas indelebles:</p>
      
      <ul class="list-style-none pl-0 space-y-4 text-sm text-stone-750">
        <li>
          <strong class="text-stone-950 font-serif block text-base mb-1">Fe Inquebrantable en el Sostén Cósmico</strong>
          El discípulo abandona la parálisis del azar angustioso profano y descubre con deleite el orden sutil, inteligente e invisible que sostiene la manifestación física del Universo. Adquiere una certeza interna blindada contra cualquier vaivén caótico.
        </li>
        <li>
          <strong class="text-stone-950 font-serif block text-base mb-1">Dominio y Soberanía Sobre Sí Mismo</strong>
          Aprende a someter bajo la escuadra del carácter a sus apetitos biológicos desorbitados, impulsos animales descontrolados y temores psicológicos infundados. Se yergue en el único monarca legítimo de su propio reino mental.
        </li>
        <li>
          <strong class="text-stone-950 font-serif block text-base mb-1">La Paz Misteriosa que Sobrepasa el Entendimiento</strong>
          La convicción íntima y serena de estar cumpliendo honradamente con los fines cósmicos dictados por el Gran Arquitecto del Universo para su autodescubrimiento terrenal, obrando con compasión incondicional y rectitud implacable en beneficio del género humano.
        </li>
      </ul>
    `
  }
};
