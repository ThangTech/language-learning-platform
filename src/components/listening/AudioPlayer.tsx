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
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    } else {
      // Demo mode — simulate playback
      setIsPlaying((p) => !p);
    }
  };

  // Simulate playback if no actual src
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
      {src && (
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
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-primary text-[1.3rem]" style={{ fontVariationSettings: "'FILL' 1" }}>
            headphones
          </span>
        </div>
        <div>
          <p className="text-xs text-on-surface-variant font-medium uppercase tracking-wide">Đang phát</p>
          <h4 className="font-headline font-bold text-on-surface text-base leading-tight">{title}</h4>
        </div>
      </div>

      {/* Progress bar */}
      <div className="flex flex-col gap-2">
        <div
          className="w-full h-2 bg-surface-container-highest rounded-full cursor-pointer relative group"
          onClick={handleSeek}
        >
          <div
            className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full transition-all relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
        <div className="flex justify-between text-xs text-on-surface-variant font-medium">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(totalDuration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        {/* Speed selector */}
        <div className="flex items-center gap-1">
          {speeds.map((s) => (
            <button
              key={s}
              onClick={() => { setSpeed(s); if (audioRef.current) audioRef.current.playbackRate = s; }}
              className={`px-2.5 py-1 rounded-full text-xs font-headline font-bold transition-all ${
                speed === s
                  ? 'bg-primary text-on-primary'
                  : 'text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>

        {/* Main controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={rewind}
            className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-all"
            title="Tua lại 10s"
          >
            <span className="material-symbols-outlined text-[1.3rem]">replay_10</span>
          </button>

          <button
            onClick={togglePlay}
            className="w-14 h-14 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-lg hover:opacity-90 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[1.8rem]" style={{ fontVariationSettings: "'FILL' 1" }}>
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>

          <button
            onClick={forward}
            className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-all"
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
              setVolume(Number(e.target.value));
              if (audioRef.current) audioRef.current.volume = Number(e.target.value) / 100;
            }}
            className="w-20 accent-primary"
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
