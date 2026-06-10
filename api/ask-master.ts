import { GoogleGenAI } from "@google/genai";
import { lessons } from "./lessonsData.js";

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  // CORS support
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
        "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
      }
    });
  }

  if (req.method !== "POST") {
    return Response.json({ error: "Método no permitido" }, { status: 405 });
  }

  try {
    const { question, lessonId, history } = await req.json();

    if (!question || typeof question !== "string") {
      return Response.json({ error: "La pregunta es requerida y debe ser un texto." }, { status: 400 });
    }

    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      return Response.json({
        error: "Servicio de Sabiduría no disponible temporalmente.",
        details: "Falta la clave de la API en la configuración del servidor."
      }, { status: 500 });
    }

    const ai = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

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

    const responseStream = await ai.models.generateContentStream({
      model: "gemini-2.5-flash",
      contents: contents,
      config: {
        systemInstruction: masonicMasterSystemInstruction,
        temperature: 0.75,
      }
    });

    // Create a ReadableStream from the generator
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of responseStream) {
            if (chunk.text) {
              controller.enqueue(encoder.encode(chunk.text));
            }
          }
          controller.close();
        } catch (e) {
          controller.error(e);
        }
      }
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
        "Access-Control-Allow-Origin": "*"
      }
    });

  } catch (err: any) {
    console.error("Error al consultar el Maestro de Logia:", err);
    return Response.json({
      error: "Ocurrió una turbulencia en la transmisión de la Logia.",
      details: err.message || "Error interno del servidor."
    }, { status: 500, headers: { "Access-Control-Allow-Origin": "*" } });
  }
}
