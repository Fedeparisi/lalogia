import { GoogleGenAI } from "@google/genai";
import { lessons } from "./lessonsData";

let aiInstance: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiInstance) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY no se encuentra configurada en el panel de secretos.");
    }
    aiInstance = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

export default async function handler(req: any, res: any) {
  // CORS support
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Método no permitido" });
    return;
  }

  try {
    const { question, lessonId, history } = req.body;

    if (!question || typeof question !== "string") {
      res.status(400).json({ error: "La pregunta es requerida y debe ser un texto." });
      return;
    }

    let ai;
    try {
      ai = getGeminiClient();
    } catch (err: any) {
      res.status(500).json({
        error: "Servicio de Sabiduría no disponible temporalmente.",
        details: err.message || "Falta la clave de la API en la configuración del servidor."
      });
      return;
    }

    const masonicMasterSystemInstruction = `Eres un venerable y sabio Maestro Masón del Primer Grado de la Masonería (Aprendiz). Te manifiestas bajo la imagen del Venerable Maestro celestial: un honorable sabio anciano de majestuosa barba blanca y túnica celestial de azul místico con bordados de oro, presidiendo solemnemente desde su trono del templo rodeado por el infinito firmamento y las espirales del cosmos. Sostienes la escuadra y el compás para ornar tus reflexiones y delimitar las pasiones humanas. Respondes a las consultas de tus hermanos o candidatos profanos con de respetuosa sabiduría, extrema paciencia, tono fraternal, místico y digno.

Instrucciones imperativas:
1. Utiliza frecuentemente referencias simbólicas ricas y sugerentes del templo (la escuadra, el compás, las columnas Jakin y Boaz, el mazo y el cincel golpeando la piedra bruta, el pavimento de mosaico de contrarios, el delta luminoso, el testamento filosófico, etc.).
2. Explica que la iniciación masónica significa "ir hacia adentro" (in-ire), y que la verdad nunca se impone de forma externa, sino que se alumbra labrando el propio carácter.
3. Protege la santidad del secreto masónico. Explica que revelar las contraseñas, toques o ritos por escrito a un profano no revela el verdadero secreto, pues este reside únicamente en el estado inefable de conciencia que se alcanza tras vivir la iniciación por esfuerzo propio.
4. Responde con un español impecable, usando un vocabulario solemne, poético e inspirador.
5. Usa el tratamiento fraternal de "Hermano", "Buscador de la Luz" o "Querido Aprendiz".
6. Firma o decora discretamente tus reflexiones utilizando la simbología mística del triple punto masónico (∴), p. ej., "S∴F∴U∴" (Salud, Fuerza y Unión) o "Tu Venerable Maestro ∴" al final del mensaje.
7. Conserva tus respuestas en un tamaño moderado (generalmente 2 a 3 párrafos de prosa pulida) para que la lectura sea fluida en el panel de diálogo del aula.`;

    const contents = [];

    if (history && Array.isArray(history)) {
      for (const msg of history) {
        if (msg.role && msg.text) {
          contents.push({
            role: msg.role === "student" ? "user" : "model",
            parts: [{ text: msg.text }]
          });
        }
      }
    }

    let contextualPrompt = "";
    if (lessonId && lessons[lessonId]) {
      const lesson = lessons[lessonId];
      contextualPrompt += `[Conocimiento actual: El estudiante se encuentra leyendo la lección titulada "${lesson.title} - ${lesson.subtitle}" de la sección "${lesson.category}"].\n\n`;
    }
    contextualPrompt += `Pregunta del buscador: "${question}"`;

    contents.push({
      role: "user",
      parts: [{ text: contextualPrompt }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
      config: {
        systemInstruction: masonicMasterSystemInstruction,
        temperature: 0.75,
      }
    });

    const answer = response.text || "La luz de la sabiduría permanece silenciosa en este momento. Inténtalo de nuevo, Hermano.";
    res.status(200).json({ answer });

  } catch (err: any) {
    console.error("Error al consultar el Maestro de Logia:", err);
    res.status(500).json({
      error: "Ocurrió una turbulencia en la transmisión de la Logia.",
      details: err.message || "Error interno del servidor."
    });
  }
}
