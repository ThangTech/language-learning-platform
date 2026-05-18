import { useState, useRef, useEffect } from 'react';

interface AudioPlayerProps {
  title?: string;
  src?: string;
  totalDuration?: number; // in seconds
  speeds?: number[];
}

const AudioPlayer = ({
  title = 'Đoạn hội thoại: Tại sân bay',
  src,
  totalDuration = 185,
  speeds = [0.75, 1, 1.25, 1.5, 2],
}: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [volume, setVolume] = useState(80);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const progress = totalDuration > 0 ? (currentTime / totalDuration) * 100 : 0;

  const togglePlay = () => {
    if (!src) {
      return;
    }

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  const hasAudio = Boolean(src);
  const emptyMessage = 'Chưa có file âm thanh';
  const playLabel = isPlaying ? 'pause' : 'play_arrow';
  const mainTitle = hasAudio ? 'Đang phát' : emptyMessage;
  const helperText = hasAudio ? 'Bấm phát để nghe lại' : 'Bài học này chưa có dữ liệu âm thanh.';
  const titleColor = hasAudio ? 'text-on-surface-variant' : 'text-on-surface-variant';
  const disabledClass = hasAudio ? '' : 'opacity-50 cursor-not-allowed';
  const actionDisabled = !hasAudio;
  const timeLabel = hasAudio ? formatTime(currentTime) : '0:00';
  const totalLabel = hasAudio ? formatTime(totalDuration) : '0:00';
  const volumeDisabled = !hasAudio;
  const speedDisabled = !hasAudio;
  const emptyIcon = 'headphones';
  const emptyBarClass = hasAudio ? 'h-full bg-gradient-to-r from-primary to-primary-container rounded-full transition-all relative' : 'h-full bg-surface-container-high rounded-full transition-all relative';
  const emptyThumbClass = hasAudio ? 'absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity' : 'absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-outline-variant rounded-full shadow-md opacity-100';
  const progressWidth = hasAudio ? `${progress}%` : '0%';
  const currentButtonIcon = playLabel;
  const controlButtonClass = `w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-all ${disabledClass}`;
  const playButtonClass = `w-14 h-14 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-lg hover:opacity-90 active:scale-95 transition-all ${disabledClass}`;

  useEffect(() => {
    if (!src) {
      if (isPlaying) {
        intervalRef.current = setInterval(() => {
          setCurrentTime((t) => {
            if (t >= totalDuration) {
              setIsPlaying(false);
              return 0;
            }
            return t + 1;
          });
        }, 1000);
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }
  }, [isPlaying, src, totalDuration]);

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    const newTime = pct * totalDuration;
    setCurrentTime(newTime);
    if (audioRef.current) audioRef.current.currentTime = newTime;
  };

  const rewind = () => {
    const newTime = Math.max(0, currentTime - 10);
    setCurrentTime(newTime);
    if (audioRef.current) audioRef.current.currentTime = newTime;
  };

  const forward = () => {
    const newTime = Math.min(totalDuration, currentTime + 10);
    setCurrentTime(newTime);
    if (audioRef.current) audioRef.current.currentTime = newTime;
  };

  return (
    <div className="bg-gradient-to-br from-primary/5 to-primary-fixed/20 border border-primary/10 rounded-[1.5rem] p-6 flex flex-col gap-5">
      {hasAudio && (
        <audio
          ref={audioRef}
          src={src}
          onTimeUpdate={() => audioRef.current && setCurrentTime(audioRef.current.currentTime)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => { setIsPlaying(false); setCurrentTime(0); }}
        />
      )}

      {/* Title */}
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl ${hasAudio ? 'bg-primary/10' : 'bg-surface-container'} flex items-center justify-center shrink-0`}>
          <span className={`material-symbols-outlined text-[1.3rem] ${hasAudio ? 'text-primary' : 'text-on-surface-variant'}`} style={{ fontVariationSettings: "'FILL' 1" }}>
            {emptyIcon}
          </span>
        </div>
        <div>
          <p className={`text-xs font-medium uppercase tracking-wide ${titleColor}`}>{mainTitle}</p>
          <h4 className="font-headline font-bold text-on-surface text-base leading-tight">{title}</h4>
          <p className="text-xs text-on-surface-variant mt-1">{helperText}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="flex flex-col gap-2">
        <div
          className={`w-full h-2 rounded-full relative group ${hasAudio ? 'bg-surface-container-highest cursor-pointer' : 'bg-surface-container-highest cursor-not-allowed'}`}
          onClick={hasAudio ? handleSeek : undefined}
        >
          <div
            className={emptyBarClass}
            style={{ width: progressWidth }}
          >
            <div className={emptyThumbClass} />
          </div>
        </div>
        <div className="flex justify-between text-xs text-on-surface-variant font-medium">
          <span>{timeLabel}</span>
          <span>{totalLabel}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        {/* Speed selector */}
        <div className="flex items-center gap-1">
          {speeds.map((s) => (
            <button
              key={s}
              onClick={() => {
                if (!hasAudio) return;
                setSpeed(s);
                if (audioRef.current) audioRef.current.playbackRate = s;
              }}
              disabled={speedDisabled}
              className={`px-2.5 py-1 rounded-full text-xs font-headline font-bold transition-all ${
                speed === s
                  ? 'bg-primary text-on-primary'
                  : 'text-on-surface-variant hover:bg-surface-container'
              } ${speedDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {s}x
            </button>
          ))}
        </div>

        {/* Main controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={rewind}
            disabled={actionDisabled}
            className={controlButtonClass}
            title="Tua lại 10s"
          >
            <span className="material-symbols-outlined text-[1.3rem]">replay_10</span>
          </button>

          <button
            onClick={togglePlay}
            disabled={actionDisabled}
            className={playButtonClass}
          >
            <span className="material-symbols-outlined text-[1.8rem]" style={{ fontVariationSettings: "'FILL' 1" }}>
              {currentButtonIcon}
            </span>
          </button>

          <button
            onClick={forward}
            disabled={actionDisabled}
            className={controlButtonClass}
            title="Tua tới 10s"
          >
            <span className="material-symbols-outlined text-[1.3rem]">forward_10</span>
          </button>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-on-surface-variant text-[1.2rem]">volume_up</span>
          <input
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={(e) => {
              if (!hasAudio) return;
              setVolume(Number(e.target.value));
              if (audioRef.current) audioRef.current.volume = Number(e.target.value) / 100;
            }}
            disabled={volumeDisabled}
            className={`w-20 accent-primary ${volumeDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
