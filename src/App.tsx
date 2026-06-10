import React, { useState, useEffect, useRef } from "react";
import { lessons, lessonCategories, Lesson } from "./lessonsData";
import { 
  BookOpen, 
  Compass, 
  MessageSquare, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  Volume2, 
  Flame, 
  Trash2, 
  User, 
  Play, 
  CheckCircle,
  HelpCircle,
  Sliders,
  Award,
  BookMarked
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  // Navigation & lesson state
  const [activeLessonId, setActiveLessonId] = useState<string>("intro");
  const [viewedLessons, setViewedLessons] = useState<string[]>(() => {
    const saved = localStorage.getItem("masonic_viewed_lessons");
    return saved ? JSON.parse(saved) : ["intro"];
  });
  
  // Chat state
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<{ role: "student" | "master" | "system"; text: string }>>([
    { role: "system", text: "Bienvenido, Querido Buscador de la Luz. Haz tu consulta al Venerable Maestro sobre los sagrados misterios del Primer Grado de Aprendiz ∴" }
  ]);
  const [chatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Specialized interactive states
  const [stoneRoughness, setStoneRoughness] = useState(100);
  const [stoneClicks, setStoneClicks] = useState(0);
  const masonicVirtues = ["Ignorancia", "Orgullo", "Ira", "Cobardía", "Egoísmo", "Vicio", "Dogma"];
  const masonicReplacements = ["Sabiduría", "Humildad", "Ecuanimidad", "Coraje", "Fraternidad", "Virtud", "Libre Pensamiento"];

  // Hammer state
  const [willpower, setWillpower] = useState(50);
  const [intelligence, setIntelligence] = useState(50);
  const [carvingMessage, setCarvingMessage] = useState("Equilibra el Mazo (Voluntad) y el Cincel (Inteligencia) para tallar la piedra.");

  // Binary states (Contrast cards)
  const [flippedBinary, setFlippedBinary] = useState<Record<string, boolean>>({});
  
  // Column balance state
  const [solarForce, setSolarForce] = useState(30);
  const [lunarForce, setLunarForce] = useState(70);

  // Letters state
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const [breathingActive, setBreathingActive] = useState(false);
  const [breatheSeconds, setBreatheSeconds] = useState(4);
  const [breatheState, setBreatheState] = useState<"Inhalar" | "Retener" | "Exhalar">("Inhalar");

  // Altar state
  const [selectedAltar, setSelectedAltar] = useState<string | null>(null);

  // Triad state
  const [triadActive, setTriadActive] = useState<Record<string, boolean>>({
    thesis: false,
    antithesis: false,
    synthesis: false
  });

  // Chakras state
  const [openChakra, setOpenChakra] = useState<number | null>(null);

  const activeLesson: Lesson = lessons[activeLessonId] || lessons.intro;

  // Lesson image tracking with dynamic fallback cascading
  const [currentImageUrl, setCurrentImageUrl] = useState<string>("");

  useEffect(() => {
    if (activeLesson) {
      setCurrentImageUrl(activeLesson.imageUrl || "");
    }
  }, [activeLesson?.id, activeLesson?.imageUrl]);

  const handleImageError = () => {
    if (activeLesson && activeLesson.id === "intro") {
      if (currentImageUrl === "/iniciacion.jpg") {
        setCurrentImageUrl("/iniciacion.webp");
      } else if (currentImageUrl === "/iniciacion.webp") {
        setCurrentImageUrl("/iniciacion.jpeg");
      } else if (currentImageUrl === "/iniciacion.jpeg") {
        setCurrentImageUrl("/iniciacion.webp");
      } else if (currentImageUrl === "/iniciacion.webp") {
        // High quality Unsplash door photo as safe visual fallback
        setCurrentImageUrl("https://images.unsplash.com/photo-1508138221679-760a23a2285b?auto=format&fit=crop&q=80&w=800&h=450");
      }
    }
  };

  // Persist viewed lessons
  useEffect(() => {
    localStorage.setItem("masonic_viewed_lessons", JSON.stringify(viewedLessons));
  }, [viewedLessons]);

  const markAsRead = (id: string) => {
    if (!viewedLessons.includes(id)) {
      setViewedLessons([...viewedLessons, id]);
    }
  };

  // Scroll chat to bottom
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, chatLoading]);

  // Breathing timer for vocalization letter practice
  useEffect(() => {
    let timer: any;
    if (breathingActive) {
      timer = setInterval(() => {
        setBreatheSeconds((prev) => {
          if (prev <= 1) {
            setBreatheState((curr) => {
              if (curr === "Inhalar") return "Retener";
              if (curr === "Retener") return "Exhalar";
              return "Inhalar";
            });
            return 4;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setBreatheSeconds(4);
      setBreatheState("Inhalar");
    }
    return () => clearInterval(timer);
  }, [breathingActive]);

  // Handle Ask Master action
  const handleAskMaster = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!question.trim()) return;

    const userMsg = question.trim();
    const newHistory = [...chatHistory, { role: "student" as const, text: userMsg }];
    setChatHistory(newHistory);
    setQuestion("");
    setChatLoading(true);
    setChatError(null);

    try {
      const response = await fetch("/api/ask-master", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: userMsg,
          lessonId: activeLessonId,
          history: newHistory.filter(h => h.role !== "system").map(h => ({
            role: h.role,
            text: h.text
          }))
        })
      });

      if (!response.ok) {
        let data;
        try {
          data = await response.json();
        } catch (e) {
          data = null;
        }
        throw new Error(data?.error || data?.details || "La logia celestial no pudo responder en este momento.");
      }

      setChatHistory(prev => [...prev, { role: "master" as const, text: "" }]);

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) throw new Error("No se pudo iniciar el canal de transmisión.");

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunkText = decoder.decode(value, { stream: true });
        setChatHistory(prev => {
          const newArr = [...prev];
          const lastIndex = newArr.length - 1;
          newArr[lastIndex] = { 
            ...newArr[lastIndex], 
            text: newArr[lastIndex].text + chunkText 
          };
          return newArr;
        });
      }
    } catch (err: any) {
      console.error(err);
      setChatError(err.message || "Ocurrió un error al contactar al Venerable Maestro.");
      setChatHistory(prev => [...prev, { role: "system" as const, text: "⚠️ Error: La conexión astral se ha interrumpido de forma temporal." }]);
    } finally {
      setChatLoading(false);
    }
  };

  // Quick preset questions
  const presetQuestions: Record<string, string[]> = {
    intro: [
      "¿Cuál es el secreto de la iniciación masónica?",
      "¿Qué papel cumple el Venerable Maestro?",
    ],
    gadu: [
      "¿Es el G∴A∴D∴U∴ un dios personal?",
      "¿Por qué se representa con un ojo?",
    ],
    piedra: [
      "¿Cómo tallar mi propia Piedra Bruta en el mundo moderno?",
      "¿Qué representa la Piedra Cúbica perfecta?",
    ],
    verbo: [
      "¿Cómo influyen las letras en la Cábala del Séfer Yetzirá?",
      "¿Por qué el sonido sutil activa la consciencia?"
    ]
  };

  const getPresets = () => {
    return presetQuestions[activeLessonId] || [
      "¿Qué significa el triple punto masónico ∴ ?",
      "¿Cómo conciliar los contrarios del Pavimento de Mosaico?"
    ];
  };

  // Next lesson controller
  const navigateToNextLesson = () => {
    markAsRead(activeLessonId);
    
    // Find flattened list of lessons to locate next
    const allIds = lessonCategories.flatMap(cat => cat.lessons);
    const currentIndex = allIds.indexOf(activeLessonId);
    if (currentIndex !== -1 && currentIndex < allIds.length - 1) {
      const nextId = allIds[currentIndex + 1];
      setActiveLessonId(nextId);
      markAsRead(nextId);
    }
  };

  // Previous lesson controller
  const navigateToPrevLesson = () => {
    const allIds = lessonCategories.flatMap(cat => cat.lessons);
    const currentIndex = allIds.indexOf(activeLessonId);
    if (currentIndex > 0) {
      const prevId = allIds[currentIndex - 1];
      setActiveLessonId(prevId);
    }
  };

  // General calculated viewed percentage
  const totalLessons = Object.keys(lessons).length;
  const progressPercent = Math.round((viewedLessons.length / totalLessons) * 100);

  // Hammer carve action
  const handleCarvingAction = () => {
    if (willpower > 80 && intelligence < 30) {
      setCarvingMessage("❌ ¡Fuerza ciega! Estás golpeando la piedra con demasiada dureza sin dirección. El cincel se resbala y puedes trizar la obra.");
    } else if (intelligence > 80 && willpower < 30) {
      setCarvingMessage("⚠️ Esclavo de la teoría. Tienes dirección pero falta de acción. Tu mazo no tiene suficiente vigor para extraer virutas a la materia.");
    } else if (Math.abs(willpower - intelligence) < 15) {
      setCarvingMessage("✨ En perfecta rectitud: Voluntad firme guiada por la razón equilibrada. ¡Estás tallando con maestría socrática! Continúa golpeando.");
    } else {
      setCarvingMessage("🛠️ Buen avance, pero ajusta las fuerzas para sintonizar el balance ideal (50/50) entre mazo y cincel.");
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#f5f2ed] font-sans text-stone-900 overflow-hidden leading-relaxed sm:flex-row flex-col">
      
      {/* Sidebar - Traditional Masonic Lodge Theme with Warm Gold border and Dark background */}
      <aside className="w-100 sm:w-72 bg-gradient-to-b from-[#1c1a17] to-[#0d0c0a] text-stone-300 flex flex-col shrink-0 border-r border-[#d4af37]/30 sm:h-full max-h-56 sm:max-h-none overflow-hidden">
        
        {/* Sidebar Header */}
        <div className="p-5 border-b border-[#d4af37]/20 flex items-center justify-between">
          <div className="text-center w-full">
            <h2 className="font-serif text-xl font-bold text-[#d4af37] tracking-widest leading-none">∴ LA LOGIA ∴</h2>
            <p className="text-[9px] uppercase tracking-[0.25em] text-[#d4af37]/70 mt-1 font-mono font-semibold">Aula del Primer Grado</p>
          </div>
        </div>

        {/* Sidebar Navigation - Grouped by Traditional categories */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-4 scrollbar-hide">
          {lessonCategories.map((category) => (
            <div key={category.title} className="space-y-1">
              <p className="text-[10px] uppercase tracking-widest text-[#d4af37]/50 font-bold px-2 mb-1.5 font-mono">
                {category.title}
              </p>
              <ul className="space-y-1 text-xs">
                {category.lessons.map((lessonId) => {
                  const lesson = lessons[lessonId];
                  if (!lesson) return null;
                  const isActive = activeLessonId === lessonId;
                  const isRead = viewedLessons.includes(lessonId);
                  
                  return (
                    <li 
                      key={lessonId}
                      onClick={() => {
                        setActiveLessonId(lessonId);
                        markAsRead(lessonId);
                      }}
                      className={`group p-2.5 rounded-lg transition-all cursor-pointer flex items-center justify-between ${
                        isActive 
                          ? "bg-[#d4af37]/15 text-[#d4af37] border-l-2 border-[#d4af37] font-medium" 
                          : "hover:bg-white/5 text-stone-300 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <BookOpen className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-[#d4af37]" : "text-stone-500 group-hover:text-stone-300"}`} />
                        <span className="truncate">{lesson.title}</span>
                      </div>
                      {isRead && (
                        <span className="text-[9px] bg-emerald-950 text-emerald-400 px-1 py-0.5 rounded border border-emerald-800/40 font-mono scale-90">
                          Leído
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Sidebar Footer - User status inside the lodge */}
        <div className="p-4 border-t border-[#d4af37]/10 bg-black/20 flex items-center justify-between text-xs shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/40 flex items-center justify-center text-xs text-[#d4af37] font-serif font-bold">
              AM
            </div>
            <div>
              <p className="font-medium text-stone-200">Buscador de Luz</p>
              <p className="text-[10px] text-stone-500 font-mono">Hermano Aprendiz</p>
            </div>
          </div>
          <div>
            <span className="text-[10px] text-stone-400 bg-stone-800/80 px-2 py-1 rounded font-mono border border-[#d4af37]/10">
              {progressPercent}%
            </span>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Main Header with progress bar */}
        <header className="h-20 shrink-0 bg-white border-b border-stone-200 px-6 sm:px-8 flex items-center justify-between shadow-xs">
          <div className="min-w-0 pr-4">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#d4af37] font-mono block">
              {activeLesson.category}
            </span>
            <h1 className="font-serif text-xl sm:text-2xl text-stone-900 truncate font-semibold">
              {activeLesson.title}
            </h1>
            <p className="text-xs text-stone-500 truncate hidden sm:block">
              {activeLesson.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={navigateToPrevLesson}
              className="p-2 border border-stone-200 hover:border-stone-300 rounded-lg hover:bg-stone-50 text-stone-600 transition-all cursor-pointer"
              title="Lección anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="hidden md:flex flex-col items-end">
              <span className="text-[10px] font-mono text-stone-400 uppercase font-semibold">Camino Iniciático</span>
              <div className="w-32 bg-stone-100 h-1.5 rounded-full overflow-hidden mt-0.5 border border-stone-200">
                <div 
                  className="bg-[#d4af37] h-full transition-all duration-500" 
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>

            <button 
              onClick={navigateToNextLesson}
              className="px-4 py-2 bg-gradient-to-r from-[#1c1a17] to-[#2e2a24] text-white hover:text-[#d4af37] border border-stone-700 hover:border-[#d4af37] rounded-lg text-xs font-serif font-bold tracking-widest uppercase shadow-sm transition-all flex items-center gap-1 cursor-pointer"
            >
              <span>Siguiente</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>

        {/* Content Layout - Split viewport with lesson on left, chat on right */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* Scrollable Lesson Panel */}
          <section className="col-span-1 lg:col-span-7 overflow-y-auto p-4 sm:p-8 space-y-6">
            <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-[0_4px_24px_rgba(40,30,10,0.04)] border border-stone-200/60 leading-relaxed text-stone-850">
              
              {/* Lección Hero Banner Image */}
              {currentImageUrl && (
                <div className="w-full h-48 sm:h-64 bg-stone-200 rounded-xl overflow-hidden mb-8 shadow-md border border-stone-200 relative group shrink-0">
                  <img 
                    key={currentImageUrl}
                    src={currentImageUrl} 
                    alt={activeLesson.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    onError={handleImageError}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/35 via-transparent to-transparent pointer-events-none"></div>
                </div>
              )}

              {/* Introduction quote to reinforce Warm Cultural aura */}
              <div className="text-center max-w-lg mx-auto mb-8 pb-6 border-b border-stone-100">
                <span className="text-3xl text-[#d4af37]/35 font-serif block select-none h-4">“</span>
                <p className="font-serif italic text-base sm:text-lg text-stone-600 leading-normal">
                  {activeLesson.subtitle}
                </p>
                <span className="text-stone-400 font-mono text-[9px] uppercase tracking-widest mt-2 block">
                  Cámara del Corazón ∴
                </span>
              </div>

              {/* Dynamic HTML Content Injection from the structured database */}
              <div 
                className="prose prose-stone max-w-none text-stone-700 text-sm leading-relaxed sm:text-[14.5px] font-sans"
                dangerouslySetInnerHTML={{ __html: activeLesson.content }}
              />

              {/* Símbolo de la lección - Static symbol cards */}
              {activeLesson.symbol && (
                <div className="mt-8 p-6 bg-gradient-to-b from-[#fdfcf9] to-[#faf8f4] border border-[#d4af37]/30 rounded-xl relative overflow-hidden flex flex-col items-center text-center">
                  <div className="absolute right-2 top-2 text-[#d4af37]/10 text-7xl font-serif select-none pointer-events-none">
                    ∴
                  </div>
                  <div className="w-16 h-16 rounded-full bg-[#f5f2ed] border-2 border-[#d4af37] flex items-center justify-center text-stone-800 text-4xl mb-3 shadow-inner overflow-hidden">
                    {activeLesson.symbol.startsWith("/") || activeLesson.symbol.includes(".") ? (
                      <img src={activeLesson.symbol} alt="símbolo" className="w-full h-full object-cover p-1" />
                    ) : (
                      activeLesson.symbol
                    )}
                  </div>
                  <p className="font-mono text-[10px] font-bold text-[#d4af37] uppercase tracking-widest mb-1">
                    Símbolo de la Enseñanza
                  </p>
                  <p className="font-serif text-lg text-stone-900 font-semibold mb-2">
                    {activeLesson.title}
                  </p>
                  <p className="text-xs text-stone-500 italic max-w-md">
                    {activeLesson.symbolDescription}
                  </p>
                </div>
              )}

              {/* --- SPECIALIZED DYNAMIC INTERACTIVE MODULES --- */}
              {activeLesson.interactiveType && (
                <div className="mt-10 pt-8 border-t border-stone-100">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-4 h-4 text-[#d4af37]" />
                    <h4 className="font-serif text-xs uppercase tracking-[0.2em] text-stone-900 font-bold">
                      Portal Interactivo del Aprendiz
                    </h4>
                  </div>

                  {/* 1. STONE MODULE: Chisel rough stone to fine block */}
                  {activeLesson.interactiveType === "stone" && (
                    <div className="bg-stone-50 border border-stone-200 rounded-xl p-6 text-center shadow-xs">
                      <p className="text-xs text-stone-500 mb-4">
                        Toca repetidamente la Piedra Bruta para desbastar sus imperfecciones psicológicas y convertirla en la Piedra Cúbica Perfecta del Templo.
                      </p>
                      
                      <div className="flex flex-col items-center justify-center relative py-6">
                        {/* Stone Display */}
                        <div className="relative w-40 h-40 flex items-center justify-center">
                          {stoneRoughness > 0 ? (
                            <motion.div
                              animate={{ 
                                scale: [1, 1.05, 1],
                                rotate: [0, stoneClicks % 2 === 0 ? 1 : -1, 0] 
                              }}
                              transition={{ duration: 0.15 }}
                              className="w-32 h-32 bg-stone-400 border-4 border-stone-500 shadow-md flex items-center justify-center font-bold text-stone-700 active:scale-95 cursor-pointer relative"
                              style={{ 
                                borderRadius: `${5 + (100 - stoneRoughness) / 2}px`,
                                borderStyle: 'solid',
                                clipPath: `polygon(${0 + (100 - stoneRoughness)/12}% ${5 + (100 - stoneRoughness)/12}%, ${100 - (100 - stoneRoughness)/12}% ${0 + (100 - stoneRoughness)/12}%, ${95 - (100 - stoneRoughness)/15}% ${95 - (100 - stoneRoughness)/12}%, ${5 + (100 - stoneRoughness)/12}% ${100 - (100 - stoneRoughness)/12}%)`
                              }}
                              onClick={() => {
                                if (stoneRoughness > 0) {
                                  const newVal = Math.max(0, stoneRoughness - 15);
                                  setStoneRoughness(newVal);
                                  setStoneClicks(c => c + 1);
                                }
                              }}
                            >
                              <span className="text-xs font-mono select-none px-2 text-center text-stone-800">
                                Piedra Bruta
                              </span>
                            </motion.div>
                          ) : (
                            <motion.div 
                              initial={{ scale: 0.8, rotate: -45 }}
                              animate={{ scale: 1, rotate: 0, scaleY: [1, 1.1, 1] }}
                              className="w-28 h-28 bg-[#d4af37] border-4 border-[#fff1bd] shadow-[0_0_15px_rgba(212,175,55,0.4)] rounded-lg flex flex-col items-center justify-center text-stone-950 font-serif font-bold text-center"
                            >
                              <span className="text-2xl">∴</span>
                              <span className="text-[10px] uppercase tracking-wider">Cúbica</span>
                              <span className="text-[8px] font-mono">LABRADA</span>
                            </motion.div>
                          )}
                        </div>

                        {/* Progress Bar of perfection */}
                        <div className="w-full max-w-xs bg-stone-200 h-2 rounded-full overflow-hidden mt-6 relative border border-stone-300">
                          <div 
                            className="bg-amber-600 h-full transition-all duration-300" 
                            style={{ width: `${100 - stoneRoughness}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between w-full max-w-xs text-[10px] font-mono text-stone-500 mt-1.5">
                          <span>Materias Viciosas</span>
                          <span>{100 - stoneRoughness}% Labrada</span>
                        </div>

                        {/* Interactive text changing of virtues */}
                        {stoneClicks > 0 && stoneRoughness > 0 && (
                          <p className="text-xs italic text-stone-600 mt-4 animate-bounce">
                            🔨 El golpe transmuta: <strong className="text-amber-800 uppercase tracking-wider font-mono">{masonicVirtues[stoneClicks % masonicVirtues.length]}</strong> en <strong className="text-emerald-700 uppercase tracking-wider font-mono">{masonicReplacements[stoneClicks % masonicReplacements.length]}</strong>
                          </p>
                        )}

                        {stoneRoughness === 0 && (
                          <div className="mt-4">
                            <p className="text-xs text-emerald-600 font-bold tracking-wider font-serif">
                              ✨ ¡Felicidades, Hermano! Has completado la primera Gran Obra de tu piedra interior.
                            </p>
                            <button 
                              onClick={() => {
                                setStoneRoughness(100);
                                setStoneClicks(0);
                              }}
                              className="mt-3 text-[10px] font-mono uppercase bg-stone-800 text-[#d4af37] px-3 py-1 rounded hover:bg-stone-950 transition-all cursor-pointer"
                            >
                              Volver a tallar
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* 2. CHAKRAS COLUMN MODULE */}
                  {activeLesson.interactiveType === "chakras" && (
                    <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 sm:p-6 shadow-xs">
                      <p className="text-xs text-stone-500 text-center mb-4">
                        Los siete grados o chakras de la columna mística. Presiona cada centro para ver la virtud interior despertada por el Fuego Alquímico sutil.
                      </p>

                      <div className="max-w-md mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                        {/* Vertical line map */}
                        <div className="md:col-span-4 flex md:flex-col justify-between items-center gap-2 h-72 py-2 bg-stone-900 rounded-xl p-3 border border-[#d4af37]/20">
                          {[7, 6, 5, 4, 3, 2, 1].map((lvl, idx) => {
                            const colors = ["bg-purple-600", "bg-indigo-600", "bg-sky-500", "bg-emerald-500", "bg-yellow-500", "bg-orange-500", "bg-red-600"];
                            const names = ["Coronario", "Frontal", "Laringeo", "Cardíaco", "Umbilical", "Esplénico", "Básico"];
                            const color = colors[idx] || "bg-yellow-500";
                            const name = names[idx];
                            return (
                              <button
                                key={lvl}
                                onClick={() => setOpenChakra(lvl)}
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white transition-all transform hover:scale-115 relative cursor-pointer ${color} ${openChakra === lvl ? "ring-2 ring-white ring-offset-2 ring-offset-stone-900 scale-110" : "opacity-80"}`}
                                title={name}
                              >
                                {lvl}
                              </button>
                            );
                          })}
                        </div>

                        {/* Viewport for description */}
                        <div className="md:col-span-8 bg-white border border-stone-200 rounded-xl p-4 h-72 overflow-y-auto flex flex-col justify-center text-center">
                          {openChakra === null ? (
                            <div className="text-stone-400 italic text-xs space-y-1">
                              <Flame className="w-8 h-8 text-amber-500 mx-auto opacity-40 animate-pulse mb-2" />
                              <p>Haz clic en los números de la columna de fuego para desvelar los misterios aéreos.</p>
                            </div>
                          ) : (
                            <div>
                              {openChakra === 1 && (
                                <div className="space-y-2 animate-fadeIn">
                                  <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded font-mono font-bold">1. Centro Muladhara (Básico)</span>
                                  <h5 className="font-serif font-bold text-stone-900">Piedad Activa y Enraizamiento</h5>
                                  <p className="text-xs text-stone-600 leading-relaxed">Sostén biológico básico. Despierta en el iniciado la compasión pragmática y la convicción inquebrantable de luchar contra los vicios vulgares desde los cimientos físicos ordinarios de la sociedad.</p>
                                </div>
                              )}
                              {openChakra === 2 && (
                                <div className="space-y-2 animate-fadeIn">
                                  <span className="text-xs bg-orange-100 text-orange-850 px-2 py-0.5 rounded font-mono font-bold font-semibold">2. Centro Svadhisthana (Esplénico)</span>
                                  <h5 className="font-serif font-bold text-stone-900">Justicia Impersonal</h5>
                                  <p className="text-xs text-stone-600 leading-relaxed">Nivel de las aguas creativas y vitalidad emocional. Purifica los impulsos eróticos o sentimentales, transformándolos en una sobria búsqueda de la equidad moral en todas tus relaciones fraternales.</p>
                                </div>
                              )}
                              {openChakra === 3 && (
                                <div className="space-y-2 animate-fadeIn">
                                  <span className="text-xs bg-yellow-100 text-yellow-850 px-2 py-0.5 rounded font-mono font-bold">3. Centro Manipura (Umbilical)</span>
                                  <h5 className="font-serif font-bold text-stone-900">Sabiduría Práctica</h5>
                                  <p className="text-xs text-stone-600 leading-relaxed">Región del mazo y la fuerza ejecutiva del Sol interior. Otorga al aprendiz el dominio consciente de las rabias viscerales y el uso constructivo del fuego dinámico de la voluntad indomable.</p>
                                </div>
                              )}
                              {openChakra === 4 && (
                                <div className="space-y-2 animate-fadeIn">
                                  <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono font-bold">4. Centro Anahata (Cardíaco)</span>
                                  <h5 className="font-serif font-bold text-stone-900">Intuición Espiritual</h5>
                                  <p className="text-xs text-stone-600 leading-relaxed">Abrasador Altar de los Perfumes. Corresponde al amor fraternal ilimitado, a la hermandad del género humano y a la voz sutil de la intuición mística que descifra el símbolo sin palabras intelectuales.</p>
                                </div>
                              )}
                              {openChakra === 5 && (
                                <div className="space-y-2 animate-fadeIn">
                                  <span className="text-xs bg-sky-100 text-sky-800 px-2 py-0.5 rounded font-mono font-bold font-semibold">5. Centro Vishuddha (Laríngeo)</span>
                                  <h5 className="font-serif font-bold text-stone-900">Imaginación Creadora</h5>
                                  <p className="text-xs text-stone-600 leading-relaxed">El órgano del Verbo Sagrado en acción creadora. Purificación del sonido corporal. El aprendiz comprende que su palabra proferida debe ser útil, hermosa y recta, evitando rumores profanos.</p>
                                </div>
                              )}
                              {openChakra === 6 && (
                                <div className="space-y-2 animate-fadeIn">
                                  <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded font-mono font-bold">6. Centro Ajna (Frontal)</span>
                                  <h5 className="font-serif font-bold text-stone-900">Clarividencia Intelectual</h5>
                                  <p className="text-xs text-stone-600 leading-relaxed">Glándula pineal, correspondiente al Delta Luminoso interior. Es el ojo moral del espíritu que penetra el caparazón denso de los símbolos y desvela la Geometría Divina detrás del caos manifiesto.</p>
                                </div>
                              )}
                              {openChakra === 7 && (
                                <div className="space-y-2 animate-fadeIn">
                                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded font-mono font-bold">7. Centro Sahasrara (Coronario)</span>
                                  <h5 className="font-serif font-bold text-stone-900">Iluminación Suprema</h5>
                                  <p className="text-xs text-stone-600 leading-relaxed">El remate místico del arco en escuadra. Es el éxtasis sagrado del autodescubrimiento absoluto, la unidad indivisible con el Gran Arquitecto del Universo — la consagración de la Gran Obra.</p>
                                </div>
                              )}
                              <button 
                                onClick={() => setOpenChakra(null)}
                                className="mt-4 text-[9px] uppercase font-mono tracking-wider text-stone-400 bg-stone-100 px-2 py-1 rounded hover:bg-stone-200 transition-all cursor-pointer"
                              >
                                Limpiar descripción
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 3. COLUMNS BALANCING MODULE */}
                  {activeLesson.interactiveType === "columns" && (
                    <div className="bg-stone-50 border border-stone-200 rounded-xl p-6 shadow-xs">
                      <p className="text-xs text-stone-500 text-center mb-4">
                        La Logia reposa en la tensión sagrada de Jakin (Polo Activo/Solar) y Boaz (Polo Receptivo/Lunar). Equilibra ambos controles deslizantes al centro exacto (50%) para abrir el Sendero del Medio.
                      </p>

                      <div className="space-y-6">
                        {/* Columns visualization */}
                        <div className="flex justify-around items-end h-40 bg-stone-900 rounded-xl p-4 gap-6 relative border border-[#d4af37]/20 overflow-hidden">
                          {/* Central Column Light beam if balanced */}
                          {Math.abs(solarForce - lunarForce) < 10 && (
                            <motion.div 
                              initial={{ opacity: 0 }}
                              animate={{ 
                                opacity: Math.abs(solarForce - 50) < 10 && Math.abs(lunarForce - 50) < 10 ? [0.6, 1.0, 0.6] : [0.3, 0.7, 0.3],
                                scale: Math.abs(solarForce - 50) < 10 && Math.abs(lunarForce - 50) < 10 ? [1, 1.15, 1] : [1, 1, 1]
                              }}
                              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                              className="absolute inset-y-0 w-20 bg-gradient-to-r from-amber-300/40 via-yellow-100/90 to-amber-300/40 blur-md left-1/2 -translate-x-1/2 flex items-center justify-center shadow-[0_0_35px_rgba(254,240,138,0.9)]"
                            >
                              <div className="text-white drop-shadow-[0_0_8px_rgba(212,175,55,1)] text-xs font-serif tracking-[0.2em] font-bold whitespace-nowrap rotate-90 scale-90">
                                CAMINO DEL MEDIO ∴
                              </div>
                            </motion.div>
                          )}

                          {/* Full divine light overlay when exactly 50/50 */}
                          {solarForce === 50 && lunarForce === 50 && (
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.6, ease: "easeOut" }}
                              className="absolute inset-0 bg-[radial-gradient(circle,_rgba(254,240,138,0.7)_0%,_rgba(245,158,11,0.35)_45%,_rgba(12,10,9,0.98)_100%)] flex items-center justify-center z-10 pointer-events-none"
                            >
                              <div className="text-center">
                                <motion.div 
                                  animate={{ scale: [0.95, 1.05, 0.95] }}
                                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                                  className="text-white text-[15px] font-serif tracking-[0.3em] font-extrabold uppercase drop-shadow-[0_0_12px_rgba(251,191,36,0.95)]"
                                >
                                  ¡HÁGASE LA LUZ! ∴
                                </motion.div>
                                <p className="text-[9px] font-mono text-amber-200 tracking-[0.18em] mt-1 font-bold uppercase">La Sabiduría y la Fuerza equilibradas</p>
                              </div>
                            </motion.div>
                          )}

                          {/* Column Boaz */}
                          <div className="flex flex-col items-center flex-1">
                            <div 
                              className="w-10 bg-gradient-to-t from-stone-600 to-stone-400 shadow-lg border-x-2 border-stone-500 rounded-t"
                              style={{ height: `${lunarForce}%`, minHeight: '20%' }}
                            ></div>
                            <span className="text-[10px] font-mono font-bold text-stone-400 mt-2">B (Boaz - {lunarForce}%)</span>
                          </div>

                          {/* Column Jakin */}
                          <div className="flex flex-col items-center flex-1">
                            <div 
                              className="w-10 bg-gradient-to-t from-amber-700 to-amber-500 shadow-lg border-x-2 border-amber-600 rounded-t"
                              style={{ height: `${solarForce}%`, minHeight: '20%' }}
                            ></div>
                            <span className="text-[10px] font-mono font-bold text-[#d4af37] mt-2">J (Jakin - {solarForce}%)</span>
                          </div>
                        </div>

                        {/* Balance Controls */}
                        <div className="space-y-4 max-w-sm mx-auto">
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs font-mono">
                              <span className="text-stone-500">Boaz: Fuerza Lunar (Luna)</span>
                              <span className="font-bold">{lunarForce}%</span>
                            </div>
                            <input 
                              type="range" 
                              min="10" 
                              max="90" 
                              value={lunarForce}
                              onChange={(e) => setLunarForce(parseInt(e.target.value))}
                              className="w-full accent-stone-500 h-1"
                            />
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-xs font-mono">
                              <span className="text-[#d4af37]">Jakin: Fuerza Solar (Sol)</span>
                              <span className="font-bold">{solarForce}%</span>
                            </div>
                            <input 
                              type="range" 
                              min="10" 
                              max="90" 
                              value={solarForce}
                              onChange={(e) => setSolarForce(parseInt(e.target.value))}
                              className="w-full accent-amber-600 h-1"
                            />
                          </div>
                        </div>

                        {/* Balance Evaluation message */}
                        <div className="text-center">
                          {Math.abs(solarForce - lunarForce) < 10 ? (
                            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-lg text-xs leading-relaxed font-serif font-medium">
                              ✨ ¡Armonía sublime! Las fuerzas del Sol (J) y de la Luna (B) se funden en el centro magnético de la Logia. Has descifrado la dualidad: <em>"Invenies Occultum Lapidem"</em>.
                            </div>
                          ) : (
                            <p className="text-xs italic text-stone-500">
                              Mueve los deslizadores de forma que ambos queden en valores similares (p. ej., ambos a 50%) para unificar la dualidad elemental.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 4. HAMMER & CHISEL (WILLPOWER VS INTELLIGENCE) */}
                  {activeLesson.interactiveType === "hammer" && (
                    <div className="bg-stone-50 border border-stone-200 rounded-xl p-6 shadow-xs">
                      <p className="text-xs text-stone-500 text-center mb-4">
                        Ajusta el Mazo (Voluntad ciega) y el Cincel (Dirección del pensamiento). Busca el equilibrio de fuerzas para un tallado óptimo.
                      </p>

                      <div className="max-w-md mx-auto space-y-6">
                        {/* Sliders for force & guidance */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="bg-white p-3 border border-stone-200 rounded-lg space-y-2 text-center">
                            <Sliders className="w-4 h-4 text-amber-700 mx-auto" />
                            <label className="text-xs font-mono font-bold block">🔨 MAZO (Voluntad)</label>
                            <input 
                              type="range" 
                              min="10" 
                              max="100" 
                              value={willpower}
                              onChange={(e) => setWillpower(parseInt(e.target.value))}
                              className="w-full accent-amber-700 h-1"
                            />
                            <span className="text-xs font-mono text-stone-500">{willpower}% Poder</span>
                          </div>

                          <div className="bg-white p-3 border border-stone-200 rounded-lg space-y-2 text-center">
                            <Compass className="w-4 h-4 text-sky-700 mx-auto" />
                            <label className="text-xs font-mono font-bold block">📐 CINCEL (Inteligencia)</label>
                            <input 
                              type="range" 
                              min="10" 
                              max="100" 
                              value={intelligence}
                              onChange={(e) => setIntelligence(parseInt(e.target.value))}
                              className="w-full accent-sky-700 h-1"
                            />
                            <span className="text-xs font-mono text-stone-500">{intelligence}% Criterio</span>
                          </div>
                        </div>

                        {/* Interactive trigger action */}
                        <div className="text-center space-y-4">
                          <button 
                            onClick={handleCarvingAction}
                            className="px-5 py-2.5 bg-stone-900 border border-[#d4af37]/30 text-[#d4af37] hover:bg-stone-950 font-serif font-bold tracking-widest text-xs uppercase rounded hover:scale-102 transition-all cursor-pointer"
                          >
                            Asestar golpe en la piedra
                          </button>
                          
                          <div className={`p-4 rounded-lg text-xs leading-relaxed text-center font-medium ${
                            carvingMessage.includes("❌") ? "bg-red-50 border border-red-200 text-red-800" :
                            carvingMessage.includes("✨") ? "bg-emerald-50 border border-emerald-200 text-emerald-800" :
                            "bg-amber-50 border border-amber-200 text-amber-800"
                          }`}>
                            {carvingMessage}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 5. LETTERS (BREATHING & VOCALIZATION) MODULE */}
                  {activeLesson.interactiveType === "letters" && (
                    <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 sm:p-6 shadow-xs text-center">
                      <p className="text-xs text-stone-500 mb-4">
                        Las 5 letras del aprendiz masónico. Haz clic para ver su aura alquímica y entonar el ejercicio práctico de respiración coordinada.
                      </p>

                      {/* Letters Selector Grid */}
                      <div className="flex justify-center gap-3 sm:gap-4 mb-6 flex-wrap">
                        {[
                          { char: "A", detail: "Voz primordial. Purifica el Aliento espiritual. Blanco/Violeta.", note: "Inhalar calma profunda." },
                          { char: "B", detail: "Equilibrio lunar de los contrarios. Fuerza concentrada.", note: "Retener energía mental." },
                          { char: "G", detail: "Imaginación pura, generación de ideas luminosas. Púrpura.", note: "Inspirar la Belleza." },
                          { char: "D", detail: "Voluntad sólida en el plano biológico material. Rojo oscuro.", note: "Exhalar impurezas." },
                          { char: "Hé", detail: "Fuego vivificante que desinfecta vicios del cuerpo y cura.", note: "Vocalizar 'He' con amor." }
                        ].map((lettr) => (
                          <button
                            key={lettr.char}
                            onClick={() => {
                              setActiveLetter(lettr.char === activeLetter ? null : lettr.char);
                              setBreathingActive(false);
                            }}
                            className={`w-12 h-12 rounded-lg font-serif font-bold text-xl flex items-center justify-center transition-all cursor-pointer transform hover:scale-105 shadow-sm border ${
                              activeLetter === lettr.char 
                                ? "bg-stone-900 border-[#d4af37] text-[#d4af37] scale-102" 
                                : "bg-white border-stone-200 text-stone-800 hover:border-stone-300"
                            }`}
                          >
                            {lettr.char}
                          </button>
                        ))}
                      </div>

                      {/* Letter Detail viewport */}
                      {activeLetter && (
                        <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-4 max-w-sm mx-auto">
                          <div>
                            <h5 className="font-serif font-bold text-[#d4af37] leading-none mb-1">
                              Letra Sagrada "{activeLetter}"
                            </h5>
                            <p className="text-xs text-stone-600 leading-relaxed">
                              {activeLetter === "A" && "Representa el 1 (Unidad Absoluta). Violeta. El aliento original que inicia el universo."}
                              {activeLetter === "B" && "Representa el 2 (Boaz / Polaridad receptiva). Plata. Sostiene la materia por cohesión."}
                              {activeLetter === "G" && "Representa el 3 (Gimel / G.A.D.U.). Púrpura. El impulso rector que decora la fuerza bruta."}
                              {activeLetter === "D" && "Representa el 4 (Dalet / Puerta del Templo sutil). Rojo. El plano de la acción manifestada."}
                              {activeLetter === "Hé" && "Representa el 5 (Aliento que regenera). Amarillo. El soplo vital del pneuma espiritual."}
                            </p>
                          </div>

                          {/* Interactive Breathing circle generator */}
                          <div className="pt-2 border-t border-stone-100">
                            <button
                              onClick={() => setBreathingActive(!breathingActive)}
                              className={`px-4 py-1.5 rounded-full font-mono text-[10px] font-bold tracking-widest uppercase cursor-pointer ${
                                breathingActive 
                                  ? "bg-red-950 text-red-400 border border-red-800/50" 
                                  : "bg-emerald-950 text-emerald-400 border border-emerald-800/50"
                              }`}
                            >
                              {breathingActive ? "Detener Ejercicio" : "Iniciar Respiración Sónica"}
                            </button>

                            {/* Circular visual expander */}
                            {breathingActive && (
                              <div className="flex flex-col items-center justify-center mt-6">
                                <motion.div 
                                  animate={{
                                    scale: breatheState === "Inhalar" ? [1, 1.8] : breatheState === "Retener" ? 1.8 : [1.8, 1],
                                  }}
                                  transition={{
                                    duration: 4,
                                    ease: "easeInOut",
                                    repeat: Infinity
                                  }}
                                  className="w-16 h-16 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center"
                                >
                                  <div className="w-3 h-3 rounded-full bg-[#d4af37]"></div>
                                </motion.div>
                                <p className="text-xs font-mono font-bold uppercase text-stone-800 mt-4 tracking-wider animate-pulse">
                                  {breatheState} : {breatheSeconds}s
                                </p>
                                <p className="text-[10px] text-stone-400 italic max-w-xs mt-1">
                                  Vocaliza internamente el eco de la letra "{activeLetter}" coincidiendo con el globo vibratorio.
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* 6. ALTAR COMPONENT (ANATOMY IN TABERNACLE) */}
                  {activeLesson.interactiveType === "altar" && (
                    <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 sm:p-6 shadow-xs text-center">
                      <p className="text-xs text-stone-500 mb-4">
                        El cuerpo humano es el altar real. Selecciona cada cámara del Tabernáculo Sutil del Iniciado para leer sus misterios correspondientes.
                      </p>

                      <div className="max-w-md mx-auto grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                        {/* Anatomy vertical list */}
                        <div className="sm:col-span-5 flex flex-col gap-2">
                          {[
                            { key: "head", label: "Neuronas (Sanctasanctórum)", icon: "🧠" },
                            { key: "heart", label: "Corazón (Inciensos)", icon: "❤️" },
                            { key: "liver", label: "Hígado (Lavabo)", icon: "🧪" },
                            { key: "stomach", label: "Vientre (Bronce)", icon: "🔥" }
                          ].map((sec) => (
                            <button
                              key={sec.key}
                              onClick={() => setSelectedAltar(sec.key)}
                              className={`p-2.5 rounded-lg text-xs font-serif font-semibold border flex items-center gap-2 transform active:scale-98 transition-all cursor-pointer ${
                                selectedAltar === sec.key 
                                  ? "bg-stone-900 border-[#d4af37] text-[#d4af37]" 
                                  : "bg-white border-stone-200 text-stone-700 hover:bg-stone-50"
                              }`}
                            >
                              <span>{sec.icon}</span>
                              <span className="truncate">{sec.label}</span>
                            </button>
                          ))}
                        </div>

                        {/* Detail layout */}
                        <div className="sm:col-span-7 bg-white border border-stone-200 rounded-xl p-4 h-48 flex flex-col justify-center text-center">
                          {selectedAltar === null ? (
                            <div className="text-stone-400 italic text-xs">
                              <Compass className="w-8 h-8 text-amber-600/30 mx-auto mb-2 animate-spin-slow" />
                              <p>Pulsa sobre un altar del Tabernáculo a la izquierda para empezar.</p>
                            </div>
                          ) : (
                            <div className="space-y-2 animate-fadeIn">
                              {selectedAltar === "head" && (
                                <>
                                  <h6 className="font-serif font-bold text-stone-900 uppercase tracking-wide text-xs">Sanctasanctórum (Glándula Pineal)</h6>
                                  <p className="text-xs text-stone-600 leading-relaxed">Representa la residencia del Rey Inteligente, el espíritu del Yo Soy socrático. El lugar donde arden las ideas celestes en sintonía con la Inteligencia del G.A.D.U.∴</p>
                                </>
                              )}
                              {selectedAltar === "heart" && (
                                <>
                                  <h6 className="font-serif font-bold text-stone-900 uppercase tracking-wide text-xs">Altar de los Perfumes (Corazón)</h6>
                                  <p className="text-xs text-stone-600 leading-relaxed">El templo sutil del amor fraternal incondicional. Aquí el aprendiz destila el perfume de la caridad pura, la empatía estoica y la fraternidad universal sin ostentación.</p>
                                </>
                              )}
                              {selectedAltar === "liver" && (
                                <>
                                  <h6 className="font-serif font-bold text-stone-900 uppercase tracking-wide text-xs">El Lavabo Expiatorio (Hígado)</h6>
                                  <p className="text-xs text-stone-600 leading-relaxed">Filtro de la bilis alquímica y los resentimientos. Se desbastan los celos profanos y se purifican las emociones líquidas antes de poder ascender la montaña del Intelecto.</p>
                                </>
                              )}
                              {selectedAltar === "stomach" && (
                                <>
                                  <h6 className="font-serif font-bold text-stone-900 uppercase tracking-wide text-xs">Altar del Alquitrán / Bronce (Vientre)</h6>
                                  <p className="text-xs text-stone-600 leading-relaxed">La caldera de la digestión biológica y la base instintiva animal. En este caldero se incineran permanentemente las pasiones más crudas, el apetito vulgar y la codicia mercantil.</p>
                                </>
                              )}
                              <button 
                                onClick={() => setSelectedAltar(null)}
                                className="text-[9px] uppercase font-mono tracking-wider text-stone-400 hover:text-stone-600 cursor-pointer text-center"
                              >
                                Ocultar
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 7. CONTRAST CARDS: EXOTÉRICO VS ESOTÉRICO (BINARY) */}
                  {activeLesson.interactiveType === "binary" && (
                    <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 sm:p-6 shadow-xs text-center">
                      <p className="text-xs text-stone-500 mb-4">
                        El Pavimento de Mosaico y la Dicotomía del Saber. Haz clic en las tarjetas misteriosas para darles la vuelta y descubrir la enseñanza interna detrás de la máscara externa.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          { id: "exo_eso", titleLogo: "📜", title1: "Exotérico (Exterior)", title2: "Esotérico (Interior)", text1: "Dogmas rígidos, historias literales y fe ciega ordenada por sacerdotes ajenos para las masas.", text2: "Cuestionamiento racional, meditación profunda y autodescubrimiento experimental individual." },
                          { id: "pavi_law", titleLogo: "🏁", title1: "Cuadro Negro (Sufrimiento)", title2: "Cuadro Blanco (Gozo)", text1: "La mentira social, la enfermedad, las crisis y la amargura de la traición profana.", text2: "La verdad, la ecuanimidad y la iluminación inamovible que trasciende las tormentas." }
                        ].map((card) => {
                          const isFlipped = flippedBinary[card.id] || false;
                          return (
                            <div 
                              key={card.id}
                              onClick={() => setFlippedBinary(prev => ({ ...prev, [card.id]: !isFlipped }))}
                              className="h-44 [perspective:1000px] cursor-pointer"
                            >
                              <motion.div 
                                animate={{ rotateY: isFlipped ? 180 : 0 }}
                                transition={{ duration: 0.6 }}
                                className="relative w-full h-full [transform-style:preserve-3d]"
                              >
                                {/* Front Side */}
                                <div className="absolute inset-0 bg-white border border-stone-200 rounded-xl p-4 flex flex-col justify-center items-center text-center [backface-visibility:hidden] shadow-sm">
                                  <span className="text-3xl mb-1">{card.titleLogo}</span>
                                  <h6 className="font-serif font-bold text-stone-900 uppercase text-xs mb-1">
                                    {card.title1}
                                  </h6>
                                  <p className="text-[11px] text-stone-500 line-clamp-3">
                                    {card.text1}
                                  </p>
                                  <span className="text-[9px] font-mono uppercase text-[#d4af37] font-semibold tracking-wider mt-2.5">
                                    Hacer clic para Transmutar ∴
                                  </span>
                                </div>

                                {/* Back Side */}
                                <div className="absolute inset-0 bg-stone-950 border border-[#d4af37]/45 rounded-xl p-4 flex flex-col justify-center items-center text-center [backface-visibility:hidden] [transform:rotateY(180deg)] text-stone-200">
                                  <span className="text-2xl text-[#d4af37] font-bold">∴</span>
                                  <h6 className="font-serif font-bold text-[#d4af37] uppercase text-xs mb-1">
                                    {card.title2}
                                  </h6>
                                  <p className="text-[11px] text-stone-350">
                                    {card.text2}
                                  </p>
                                  <span className="text-[9px] font-mono uppercase text-stone-500 tracking-wider mt-3">
                                    Regresar al mundo externo
                                  </span>
                                </div>
                              </motion.div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* 8. TRIAD PILLARS MODULE (SABIDURÍA, FUERZA Y BELLEZA) */}
                  {activeLesson.interactiveType === "triad" && (
                    <div className="bg-stone-50 border border-stone-200 rounded-xl p-6 shadow-xs text-center">
                      <p className="text-xs text-stone-500 mb-4">
                        Los tres Pilares que sostienen el Cosmos. Enciende cada portal del Ternario pulsando sobre los vértices para dar luz a la Síntesis trascendente.
                      </p>

                      <div className="max-w-xs mx-auto relative pt-4 pb-8">
                        {/* Triangle Layout background */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-10 font-serif text-[180px] pointer-events-none select-none text-stone-900 leading-none">
                          Δ
                        </div>

                        <div className="flex flex-col gap-8 relative z-10">
                          {/* Top: Wisdom */}
                          <div className="flex justify-center">
                            <button
                              onClick={() => setTriadActive(p => ({ ...p, thesis: !p.thesis }))}
                              className={`px-4 py-2 border rounded-full text-xs font-serif font-bold tracking-wider transition-all transform active:scale-95 cursor-pointer flex items-center gap-1.5 shadow-xs ${
                                triadActive.thesis 
                                  ? "bg-amber-100 border-amber-500 text-amber-900 font-bold" 
                                  : "bg-white border-stone-200 text-stone-700"
                              }`}
                            >
                              <span>🕯️</span>
                              <span>SABIDURÍA (Tesis)</span>
                            </button>
                          </div>

                          {/* Left & Right: Force & Beauty */}
                          <div className="flex justify-between gap-4">
                            <button
                              onClick={() => setTriadActive(p => ({ ...p, antithesis: !p.antithesis }))}
                              className={`px-3 py-2 border rounded-full text-xs font-serif font-bold tracking-wider transition-all transform active:scale-95 cursor-pointer flex items-center gap-1.5 shadow-xs ${
                                triadActive.antithesis 
                                  ? "bg-[#1c1a17] border-stone-700 text-[#d4af37]" 
                                  : "bg-white border-stone-200 text-stone-700"
                              }`}
                            >
                              <span>🛡️</span>
                              <span>FUERZA (Antítesis)</span>
                            </button>

                            <button
                              onClick={() => setTriadActive(p => ({ ...p, synthesis: !p.synthesis }))}
                              className={`px-3 py-2 border rounded-full text-xs font-serif font-bold tracking-wider transition-all transform active:scale-95 cursor-pointer flex items-center gap-1.5 shadow-xs ${
                                triadActive.synthesis 
                                  ? "bg-emerald-100 border-emerald-500 text-emerald-900" 
                                  : "bg-white border-stone-200 text-stone-700"
                              }`}
                            >
                              <span>🎨</span>
                              <span>BELLEZA (Síntesis)</span>
                            </button>
                          </div>
                        </div>

                        {/* Synthesis central message */}
                        <div className="mt-8">
                          {triadActive.thesis && triadActive.antithesis && triadActive.synthesis ? (
                            <motion.div 
                              initial={{ scale: 0.9, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="bg-[#d4af37]/20 border border-[#d4af37] text-stone-900 p-4 rounded-xl text-xs leading-relaxed font-serif"
                            >
                              <strong className="block text-sm text-[#be9d2e] mb-1">∴ EL DELTA LUMINOSO ACTIVO ∴</strong>
                              El ternario perfecto se ha reconciliado en el centro del espíritu. Comprendes cómo la fusión de ideas dota al aprendiz del salario de la maestría. ¡Que la Luz sea contigo!
                            </motion.div>
                          ) : (
                            <p className="text-[10px] text-stone-400 italic">
                              Enciende las tres virtudes ceremoniales para coronar la cúpula mística.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              )}

            </div>
          </section>

          {/* Master Chat Dialog Panel - Deep Muted Warm-Organic dark layout matching the sidebar gradient */}
          <aside className="col-span-1 lg:col-span-5 shrink-0 border-t lg:border-t-0 lg:border-l border-stone-200 bg-gradient-to-b from-[#1a1815] to-[#12110e] text-stone-200 flex flex-col h-[550px] lg:h-full relative overflow-hidden shadow-2xl">
            
            {/* Header of the master responder panel with Master avatar and status */}
            <div className="p-4 bg-black/45 border-b border-[#d4af37]/20 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                {/* Master Miniature Avatar */}
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-[#d4af37]/15 border-2 border-[#d4af37]/60 flex items-center justify-center overflow-hidden shadow-md">
                    <img 
                      src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=150&h=150" 
                      alt="Venerable Maestro" 
                      className="w-full h-full object-cover scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#12110e] animate-pulse"></span>
                </div>
                <div>
                  <h3 className="font-serif text-sm text-[#d4af37] font-semibold flex items-center gap-1">
                    Venerable Maestro ∴
                  </h3>
                  <p className="text-[9px] uppercase tracking-wider text-stone-400 font-mono">
                    En comunión espiritual • En línea
                  </p>
                </div>
              </div>
              <Compass className="w-4 h-4 text-[#d4af37]/75 animate-spin-slow" />
            </div>

            {/* Chat Body container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide text-stone-300">
              {chatHistory.map((msg, idx) => (
                <div 
                  key={idx}
                  className={`flex gap-2.5 items-start ${msg.role === "student" ? "justify-end" : "justify-start"}`}
                >
                  {/* Master Avatar for model messages */}
                  {msg.role !== "student" && msg.role !== "system" && (
                    <div className="w-8 h-8 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/35 flex items-center justify-center shrink-0 overflow-hidden shadow-sm mt-0.5">
                      <img 
                        src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=150&h=150" 
                        alt="Maestro" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}

                  <div 
                    className={`p-3.5 rounded-xl text-xs leading-relaxed max-w-[82%] shadow-md whitespace-pre-wrap transition-all relative ${
                      msg.role === "student"
                        ? "bg-[#d4af37] text-stone-950 font-medium rounded-tr-none border border-[#fff2cb]/20"
                        : msg.role === "system"
                        ? "bg-stone-900 border border-stone-800 text-stone-400 italic text-center w-full max-w-none text-[11px]"
                        : "bg-white/8 text-stone-200 rounded-tl-none border border-white/5 shadow-[0_4px_12px_rgba(212,175,55,0.03)]"
                    }`}
                  >
                    {/* Role Tag for aesthetic flair */}
                    {msg.role !== "system" && (
                      <span className={`text-[8px] uppercase tracking-wider block mb-1 opacity-60 font-mono ${msg.role === "student" ? "text-stone-850 font-bold" : "text-[#d4af37]"}`}>
                        {msg.role === "student" ? "Hermano Aprendiz" : "Venerable Maestro ∴"}
                      </span>
                    )}
                    {msg.text}
                  </div>

                  {/* Student initials badge for student messages */}
                  {msg.role === "student" && (
                    <div className="w-8 h-8 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[9px] text-[#d4af37] font-serif font-bold shrink-0 mt-0.5">
                      AM
                    </div>
                  )}
                </div>
              ))}

              {/* Chat Loader representation */}
              {chatLoading && (
                <div className="flex gap-2.5 items-start justify-start">
                  {/* Miniature pulse avatar */}
                  <div className="w-8 h-8 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center shrink-0 overflow-hidden animate-pulse">
                    <img 
                      src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=150&h=150" 
                      alt="Maestro Pensando" 
                      className="w-full h-full object-cover grayscale opacity-60"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="bg-white/5 text-stone-400 p-3.5 rounded-xl rounded-tl-none text-xs leading-relaxed max-w-[80%] border border-white/5 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-bounce block [animation-delay:0ms]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-bounce block [animation-delay:150ms]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-bounce block [animation-delay:300ms]"></span>
                    <span className="text-[10px] font-mono italic text-stone-500">
                      Sopesando en la balanza del templo...
                    </span>
                  </div>
                </div>
              )}

              {/* Autoscroll anchor */}
              <div ref={chatBottomRef} />
            </div>

            {/* Suggested prompts helper bottom container */}
            <div className="px-4 py-2 border-t border-white/5 bg-black/15 flex gap-2 overflow-x-auto scrollbar-hide shrink-0 flex-nowrap items-center">
              <span className="text-[9px] uppercase font-mono text-[#d4af37]/65 shrink-0">Temas:</span>
              {getPresets().map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => setQuestion(preset)}
                  className="bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white px-2.5 py-1 rounded text-[10px] border border-white/5 whitespace-nowrap transition-all select-none cursor-pointer"
                >
                  {preset}
                </button>
              ))}
            </div>

            {/* Input submission form container */}
            <form 
              onSubmit={handleAskMaster}
              className="p-4 bg-[#12110e] border-t border-white/5 flex gap-2 items-center shrink-0"
            >
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Pregunta al Maestro sobre los misterios..."
                className="flex-1 bg-white/5 hover:bg-white/8 focus:bg-white/10 text-stone-150 border border-white/10 hover:border-white/20 focus:border-[#d4af37] rounded-xl px-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#d4af37] placeholder-stone-500 transition-all resize-none h-11 scrollbar-hide text-[12.5px] leading-normal"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleAskMaster();
                  }
                }}
              />
              <button
                type="submit"
                disabled={!question.trim() || chatLoading}
                className="w-11 h-11 bg-[#d4af37] disabled:bg-stone-700 disabled:text-stone-500 disabled:border-transparent text-stone-950 font-bold rounded-xl flex items-center justify-center border border-[#ffecb4]/20 hover:bg-[#ebc441] active:scale-95 transition-all text-sm shadow-sm cursor-pointer shrink-0"
                title="Consultar"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            </form>

          </aside>

        </div>

      </div>

    </div>
  );
}
