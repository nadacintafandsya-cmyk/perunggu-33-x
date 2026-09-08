import React, { useState } from "react";
import {
  Check,
  Copy,
  Music,
  Disc3,
  BookOpen,
  Quote,
  Sparkles,
  Play,
  Pause,
} from "lucide-react";
import { songData, primaryChorusLines, extendedChorusLines } from "./data/lyrics";

export default function App() {
  const [viewMode, setViewMode] = useState<"chorus-1" | "chorus-2" | "full">(
    "chorus-1"
  );
  const [showTranslation, setShowTranslation] = useState<boolean>(false);
  const [showStory, setShowStory] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [isPlayingPulse, setIsPlayingPulse] = useState<boolean>(false);

  const getActiveTextToCopy = () => {
    if (viewMode === "chorus-1") {
      return primaryChorusLines.join("\n");
    }
    if (viewMode === "chorus-2") {
      return extendedChorusLines.join("\n");
    }
    return songData.sections
      .map((sec) => `[${sec.title}]\n${sec.lines.join("\n")}`)
      .join("\n\n");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getActiveTextToCopy());
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // fallback
      const textarea = document.createElement("textarea");
      textarea.value = getActiveTextToCopy();
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const activeChorusSection =
    viewMode === "chorus-2"
      ? songData.sections.find((s) => s.id === "chorus-2")
      : songData.sections.find((s) => s.id === "chorus-1");

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col justify-between selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Header */}
      <header className="border-b border-stone-800/70 bg-stone-900/40 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Disc3
                className={`w-5 h-5 ${
                  isPlayingPulse ? "animate-spin text-amber-300" : ""
                }`}
                style={{ animationDuration: "3s" }}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-stone-100">
                  {songData.title}
                </span>
                <span className="text-stone-500">•</span>
                <span className="text-amber-400/90 font-medium text-sm">
                  {songData.artist}
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Album: {songData.album} ({songData.year})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="toggle-audio-pulse-btn"
              onClick={() => setIsPlayingPulse(!isPlayingPulse)}
              className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-all ${
                isPlayingPulse
                  ? "border-amber-500/50 bg-amber-500/15 text-amber-300"
                  : "border-stone-800 bg-stone-900 text-stone-400 hover:text-stone-200 hover:border-stone-700"
              }`}
              title="Ketukan tempo lagu (130 BPM)"
            >
              {isPlayingPulse ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Ritme Aktif</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Iringan Ritme</span>
                </>
              )}
            </button>

            <button
              id="copy-lyrics-btn"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 transition-colors shadow-sm cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-stone-950 stroke-[3]" />
                  <span>Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Salin Lirik</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col justify-center">
        {/* Navigation Selector for Chorus Variations */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex p-1 bg-stone-900 border border-stone-800 rounded-xl">
            <button
              id="tab-chorus-1"
              onClick={() => setViewMode("chorus-1")}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                viewMode === "chorus-1"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                  : "text-stone-400 hover:text-stone-200"
              }`}
            >
              Chorus Utama
            </button>
            <button
              id="tab-chorus-2"
              onClick={() => setViewMode("chorus-2")}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                viewMode === "chorus-2"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                  : "text-stone-400 hover:text-stone-200"
              }`}
            >
              Chorus 2 (Extended)
            </button>
            <button
              id="tab-full"
              onClick={() => setViewMode("full")}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                viewMode === "full"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                  : "text-stone-400 hover:text-stone-200"
              }`}
            >
              Lirik Lengkap
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="toggle-translation-btn"
              onClick={() => setShowTranslation(!showTranslation)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border transition-colors cursor-pointer ${
                showTranslation
                  ? "bg-stone-800 border-stone-700 text-stone-200"
                  : "bg-stone-900/60 border-stone-800/80 text-stone-400 hover:text-stone-300"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>{showTranslation ? "Sembunyikan Arti" : "Arti / Terjemahan"}</span>
            </button>

            <button
              id="toggle-story-btn"
              onClick={() => setShowStory(!showStory)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border transition-colors cursor-pointer ${
                showStory
                  ? "bg-amber-500/15 border-amber-500/40 text-amber-300"
                  : "bg-stone-900/60 border-stone-800/80 text-stone-400 hover:text-stone-300"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Makna Lagu</span>
            </button>
          </div>
        </div>

        {/* Meaning / Story Expandable Box */}
        {showStory && (
          <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-stone-900 to-stone-900/80 border border-amber-500/30 text-stone-300 text-sm leading-relaxed">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs tracking-wider uppercase mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tentang Lagu "33x" oleh Perunggu</span>
            </div>
            <p className="text-stone-300 text-sm mt-1">{songData.meaning}</p>
            <p className="text-stone-400 text-xs mt-2 italic">
              "Melamban bukanlah hal yang tabu, kadang itu yang kau butuh..." adalah pesan
              agar kita tidak malu melambat sejenak saat lelah mengejar impian.
            </p>
          </div>
        )}

        {/* Lyrics Display Card */}
        {viewMode !== "full" ? (
          <div
            className={`relative p-6 sm:p-10 rounded-2xl bg-stone-900/70 border border-stone-800 shadow-2xl backdrop-blur transition-all ${
              isPlayingPulse ? "ring-1 ring-amber-500/40" : ""
            }`}
          >
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-stone-800/80">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-widest">
                <Quote className="w-4 h-4" />
                <span>
                  {viewMode === "chorus-1"
                    ? "Chorus (Reff)"
                    : "Chorus 2 (Extended Reff)"}
                </span>
              </div>
              <span className="text-xs text-stone-400 bg-stone-800/60 px-2.5 py-1 rounded-full">
                Perunggu • 33x
              </span>
            </div>

            {/* Chorus Verses */}
            <div className="space-y-4">
              {activeChorusSection?.lines.map((line, idx) => {
                // Highlight the memorable iconic punchlines
                const isHighlight =
                  line.includes("Melamban bukanlah") ||
                  line.includes("dua sembilan kau terus mencari");

                const translationLine =
                  activeChorusSection.translation &&
                  activeChorusSection.translation[idx];

                return (
                  <div
                    key={idx}
                    className={`group transition-all ${
                      isPlayingPulse ? "duration-700 hover:translate-x-1" : ""
                    }`}
                  >
                    <p
                      className={`text-xl sm:text-2xl font-serif-display font-medium leading-relaxed tracking-wide ${
                        isHighlight
                          ? "text-amber-300 font-semibold"
                          : "text-stone-100 group-hover:text-amber-200/90"
                      }`}
                    >
                      {line}
                    </p>
                    {showTranslation && translationLine && (
                      <p className="text-sm text-stone-400 italic mt-0.5">
                        {translationLine}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Chorus Annotation */}
            {activeChorusSection?.annotation && (
              <div className="mt-8 pt-5 border-t border-stone-800/60 flex items-start gap-2.5 text-xs text-stone-400">
                <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <p>{activeChorusSection.annotation}</p>
              </div>
            )}
          </div>
        ) : (
          /* Full Lyrics View */
          <div className="space-y-6">
            {songData.sections.map((section) => (
              <div
                key={section.id}
                className={`p-6 rounded-xl border transition-all ${
                  section.isChorus
                    ? "bg-stone-900/90 border-amber-500/40 shadow-lg"
                    : "bg-stone-900/40 border-stone-800/70"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-xs font-semibold uppercase tracking-wider ${
                      section.isChorus ? "text-amber-400" : "text-stone-400"
                    }`}
                  >
                    {section.title}
                  </span>
                  {section.isChorus && (
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30">
                      Chorus
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  {section.lines.map((line, lIdx) => (
                    <div key={lIdx}>
                      <p
                        className={`text-base sm:text-lg leading-relaxed ${
                          section.isChorus
                            ? "text-stone-100 font-serif-display font-medium"
                            : "text-stone-300"
                        } ${
                          line.includes("Melamban bukanlah") ||
                          line.includes("dua sembilan kau terus mencari") ||
                          line.includes("Sebutlah nama-Nya")
                            ? "text-amber-300 font-medium"
                            : ""
                        }`}
                      >
                        {line}
                      </p>
                      {showTranslation && section.translation?.[lIdx] && (
                        <p className="text-xs text-stone-400 italic mt-0.5">
                          {section.translation[lIdx]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Key Lines Highlight Card */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-stone-900/40 border border-stone-800/80">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400 block mb-1">
              Pesan Inti Chorus
            </span>
            <p className="text-sm text-stone-300 leading-snug">
              "Melamban bukanlah hal yang tabu, kadang itu yang kau butuh, bersandar
              hibahkan bebanmu."
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-900/40 border border-stone-800/80">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400 block mb-1">
              Klimaks Refrain
            </span>
            <p className="text-sm text-stone-300 leading-snug">
              "Sebutlah nama-Nya, tetap di jalan-Nya. Terus berenang, lanjutlah mendaki."
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-800/60 py-6 text-center text-xs text-stone-500">
        <div className="flex items-center justify-center gap-1.5 mb-1">
          <Music className="w-3.5 h-3.5 text-amber-400/80" />
          <span>Lagu "33x" oleh Perunggu • Album Memorandum (2022)</span>
        </div>
        <p className="text-stone-400">
          Hak cipta lirik milik Perunggu & label terkait.
        </p>
      </footer>
    </div>
  );
}
