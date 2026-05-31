import { InteractiveText, speakText } from '../common/TtsPlayer';

interface TranscriptLine {
  time: string;
  speaker: string;
  text: string;
}

interface LessonTranscriptProps {
  showTranscript: boolean;
  transcriptLabel: string;
  hasTranscript: boolean;
  transcriptLines: TranscriptLine[];
  activeHighlight: number | null;
  onToggle: () => void;
  onHover: (index: number | null) => void;
}

const LessonTranscript = ({
  showTranscript,
  transcriptLabel,
  hasTranscript,
  transcriptLines,
  activeHighlight,
  onToggle,
  onHover,
}: LessonTranscriptProps) => {
  const handleSpeakLine = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    speakText(text, 1.0);
  };

  return (
    <div className="bg-surface-container-low rounded-[1.5rem] border border-outline-variant/10 overflow-hidden">
      <button onClick={onToggle} className="w-full flex items-center justify-between p-6 hover:bg-surface-container transition-colors">
        <span className="font-headline font-bold text-lg text-on-surface flex items-center gap-2">
          <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>subtitles</span>
          Lời thoại tương tác (Nhấp vào từ để nghe) 🔊
        </span>
        <span className="flex items-center gap-2 text-sm text-on-surface-variant">
          <span>{transcriptLabel}</span>
          <span className={`material-symbols-outlined transition-transform ${showTranscript ? 'rotate-180' : ''}`}>expand_more</span>
        </span>
      </button>

      {showTranscript && (
        <div className="px-6 pb-6 flex flex-col gap-3">
          {hasTranscript ? transcriptLines.map((line, index) => (
            <div
              key={index}
              onMouseEnter={() => onHover(index)}
              onMouseLeave={() => onHover(null)}
              className={`flex gap-4 p-4 rounded-xl transition-all cursor-default items-start ${activeHighlight === index ? 'bg-primary/5' : ''}`}
            >
              <span className="text-xs text-on-surface-variant font-mono mt-1 shrink-0 w-10">{line.time}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-xs font-headline font-bold ${line.speaker === 'Nhân viên' ? 'text-primary' : 'text-secondary'}`}>
                    {line.speaker}:
                  </span>
                  <button
                    onClick={(e) => handleSpeakLine(e, line.text)}
                    className="w-6 h-6 rounded-full hover:bg-primary/10 text-primary flex items-center justify-center transition-all focus:outline-none"
                    title="Đọc cả câu này"
                  >
                    <span className="material-symbols-outlined text-[1rem]">volume_up</span>
                  </button>
                </div>
                <div className="text-on-surface text-sm mt-1 leading-relaxed whitespace-normal break-words">
                  <InteractiveText text={line.text} />
                </div>
              </div>
            </div>
          )) : (
            <p className="text-sm text-on-surface-variant">Bài này chưa có lời thoại.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default LessonTranscript;
