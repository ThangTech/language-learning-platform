import { useState, useEffect } from 'react';
import { Button, Tooltip, Switch } from 'antd';


export const speakText = (text: string, rate: number = 1.0, lang: string = "en-US", onEnd?: () => void) => {
  if (!('speechSynthesis' in window)) return;
  

  window.speechSynthesis.cancel();
  
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = rate;
  
  if (onEnd) {
    utterance.onend = onEnd;
  }
  
  window.speechSynthesis.speak(utterance);
};


interface InteractiveTextProps {
  text: string;
  rate?: number;
  className?: string;
}

export const InteractiveText = ({ text, rate = 1.0, className = "" }: InteractiveTextProps) => {
  const speakWord = (word: string) => {

    const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").trim();
    if (!cleanWord) return;
    speakText(cleanWord, rate);
  };

  const tokens = text.split(/(\s+)/);

  return (
    <span className={`interactive-text-container inline-flex flex-wrap ${className}`}>
      {tokens.map((token, index) => {
        const isWord = /\w+/.test(token);
        if (isWord) {
          return (
            <span
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                speakWord(token);
              }}
              className="cursor-pointer text-on-surface hover:text-primary hover:bg-primary/10 rounded px-0.5 transition-all duration-150 border-b border-dashed border-outline-variant hover:border-solid hover:border-primary font-medium"
              title="Click để nghe phát âm từ này"
            >
              {token}
            </span>
          );
        }
        return <span key={index} className="text-on-surface-variant">{token}</span>;
      })}
    </span>
  );
};

interface TtsPlayerProps {
  text: string;
  autoplay?: boolean;
  size?: 'small' | 'medium' | 'large';
  showShadowing?: boolean;
}

export const TtsPlayer = ({
  text,
  autoplay = false,
  size = 'medium',
  showShadowing = true,
}: TtsPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1.0); // 1.0 normal, 0.75 slow
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShadowingMode, setIsShadowingMode] = useState(false);
  const [shadowingState, setShadowingState] = useState<'idle' | 'listening' | 'shadowing' | 'done'>('idle');
  const [shadowingTimer, setShadowingTimer] = useState(0);


  const handlePlay = () => {
    setIsPlaying(true);
    if (isShadowingMode) {
      setShadowingState('listening');
      speakText(text, speed, "en-US", () => {

        setShadowingState('shadowing');
        setShadowingTimer(4); 
      });
    } else {
      speakText(text, speed, "en-US", () => {
        setIsPlaying(false);
        if (isRepeat) {
          setTimeout(handlePlay, 1000);
        }
      });
    }
  };

  // Shadowing timer countdown
  useEffect(() => {
    let timerId: any;
    if (shadowingState === 'shadowing' && shadowingTimer > 0) {
      timerId = setTimeout(() => {
        setShadowingTimer((prev) => prev - 1);
      }, 1000);
    } else if (shadowingState === 'shadowing' && shadowingTimer === 0) {
      setShadowingState('done');
      setIsPlaying(false);
      
      // Auto-reset back to idle after a brief message
      setTimeout(() => {
        setShadowingState('idle');
      }, 2000);
    }
    return () => clearTimeout(timerId);
  }, [shadowingState, shadowingTimer]);

  // Cancel synthesis on unmount
  useEffect(() => {
    if (autoplay) {
      setTimeout(handlePlay, 500);
    }
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [text]);

  const handleStop = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setShadowingState('idle');
  };

  const toggleSpeed = () => {
    setSpeed((prev) => (prev === 1.0 ? 0.75 : prev === 0.75 ? 0.6 : 1.0));
  };

  const getSpeedLabel = () => {
    if (speed === 1.0) return '1.0x';
    if (speed === 0.75) return '0.75x 🐢';
    return '0.6x 🐌';
  };

  return (
    <div className="flex flex-col gap-3 p-4 bg-surface-container-low rounded-2xl border border-outline-variant/30 shadow-sm max-w-md w-full transition-all">
      {/* Audio controls */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {isPlaying ? (
            <Button
              type="primary"
              danger
              shape="circle"
              onClick={handleStop}
              icon={<span className="material-symbols-outlined text-[1.2rem]">stop</span>}
              size={size === 'small' ? 'small' : 'middle'}
            />
          ) : (
            <Tooltip title="Nghe đọc cả câu">
              <Button
                type="primary"
                shape="circle"
                onClick={handlePlay}
                icon={<span className="material-symbols-outlined text-[1.2rem]">volume_up</span>}
                className="bg-primary hover:scale-105 transition-transform"
                size={size === 'small' ? 'small' : 'middle'}
              />
            </Tooltip>
          )}

          {/* Speed adjuster */}
          <Button
            size="small"
            onClick={toggleSpeed}
            className="font-headline font-bold text-xs rounded-full border-outline-variant/50"
          >
            {getSpeedLabel()}
          </Button>

          {/* Repeat mode */}
          <Tooltip title={isRepeat ? "Tắt lặp lại" : "Lặp lại tự động"}>
            <Button
              size="small"
              shape="circle"
              type={isRepeat ? "primary" : "default"}
              onClick={() => setIsRepeat(!isRepeat)}
              icon={
                <span className={`material-symbols-outlined text-[1.1rem] ${isRepeat ? 'text-on-primary' : 'text-on-surface-variant'}`}>
                  repeat
                </span>
              }
              className={isRepeat ? 'bg-primary' : 'border-outline-variant/30'}
            />
          </Tooltip>
        </div>

        {/* Shadowing Mode Toggle */}
        {showShadowing && (
          <div className="flex items-center gap-2">
            <span className="font-headline text-xs font-bold text-on-surface-variant">Shadowing 🎙️</span>
            <Switch
              size="small"
              checked={isShadowingMode}
              onChange={(checked) => {
                setIsShadowingMode(checked);
                if (!checked) handleStop();
              }}
            />
          </div>
        )}
      </div>

      {/* Shadowing Mode Status Animation */}
      {isShadowingMode && isPlaying && (
        <div className="mt-2 p-3 bg-surface-container-high rounded-xl border border-outline-variant/20 flex flex-col items-center justify-center text-center animate-fade-in transition-all">
          {shadowingState === 'listening' && (
            <div className="flex items-center gap-2 text-primary font-bold text-sm">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              <span>Đang nghe AI đọc câu mẫu...</span>
            </div>
          )}

          {shadowingState === 'shadowing' && (
            <div className="flex flex-col items-center gap-1.5 w-full">
              <div className="flex items-center gap-2 text-error font-extrabold text-sm animate-pulse">
                <span className="material-symbols-outlined text-[1.3rem]">mic</span>
                <span>Hãy nhại lại (Shadowing)! {shadowingTimer}s</span>
              </div>
              {/* Mic pulsing wave */}
              <div className="flex gap-1 items-center justify-center h-4 mt-1">
                <div className="w-1 h-3 bg-error rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-1 h-4 bg-error rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-1 h-2 bg-error rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                <div className="w-1 h-4 bg-error rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                <div className="w-1 h-3 bg-error rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
              </div>
            </div>
          )}

          {shadowingState === 'done' && (
            <div className="flex items-center gap-2 text-success font-black text-sm animate-bounce">
              <span className="material-symbols-outlined text-[1.3rem]">check_circle</span>
              <span>Tuyệt vời! Hoàn thành luyện nói 🌟</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
