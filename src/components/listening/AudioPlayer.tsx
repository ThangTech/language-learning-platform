import { useEffect, useRef, useState } from 'react';
import AudioPlayerHeader from './AudioPlayerHeader';
import AudioPlayerProgress from './AudioPlayerProgress';
import AudioPlayerControls from './AudioPlayerControls';

interface AudioPlayerProps {
  title?: string;
  src?: string;
  totalDuration?: number;
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

  const formatTime = (value: number) => {
    const minute = Math.floor(value / 60);
    const second = Math.floor(value % 60);
    return `${minute}:${second.toString().padStart(2, '0')}`;
  };

  const progress = totalDuration > 0 ? (currentTime / totalDuration) * 100 : 0;

  const togglePlay = () => {
    if (!src) return;

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
  const currentButtonIcon = isPlaying ? 'pause' : 'play_arrow';
  const mainTitle = hasAudio ? 'Đang phát' : emptyMessage;
  const helperText = hasAudio ? 'Bấm phát để nghe lại' : 'Bài học này chưa có dữ liệu âm thanh.';
  const titleColor = 'text-on-surface-variant';
  const disabledClass = hasAudio ? '' : 'opacity-50 cursor-not-allowed';
  const actionDisabled = !hasAudio;
  const timeLabel = hasAudio ? formatTime(currentTime) : '0:00';
  const totalLabel = hasAudio ? formatTime(totalDuration) : '0:00';
  const volumeDisabled = !hasAudio;
  const speedDisabled = !hasAudio;
  const emptyIcon = 'headphones';
  const emptyBarClass = hasAudio
    ? 'h-full bg-gradient-to-r from-primary to-primary-container rounded-full transition-all relative'
    : 'h-full bg-surface-container-high rounded-full transition-all relative';
  const emptyThumbClass = hasAudio
    ? 'absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity'
    : 'absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-outline-variant rounded-full shadow-md opacity-100';
  const progressWidth = hasAudio ? `${progress}%` : '0%';
  const controlButtonClass = `w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-all ${disabledClass}`;
  const playButtonClass = `w-14 h-14 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-lg hover:opacity-90 active:scale-95 transition-all ${disabledClass}`;

  useEffect(() => {
    if (!src) {
      if (isPlaying) {
        intervalRef.current = setInterval(() => {
          setCurrentTime((value) => {
            if (value >= totalDuration) {
              setIsPlaying(false);
              return 0;
            }
            return value + 1;
          });
        }, 1000);
      } else if (intervalRef.current) {
        clearInterval(intervalRef.current);
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
          onEnded={() => {
            setIsPlaying(false);
            setCurrentTime(0);
          }}
        />
      )}

      <AudioPlayerHeader
        hasAudio={hasAudio}
        title={title}
        mainTitle={mainTitle}
        helperText={helperText}
        titleColor={titleColor}
        emptyIcon={emptyIcon}
      />

      <AudioPlayerProgress
        hasAudio={hasAudio}
        progressWidth={progressWidth}
        timeLabel={timeLabel}
        totalLabel={totalLabel}
        onSeek={handleSeek}
        emptyBarClass={emptyBarClass}
        emptyThumbClass={emptyThumbClass}
      />

      <AudioPlayerControls
        speeds={speeds}
        speed={speed}
        hasAudio={hasAudio}
        onSpeedChange={(nextSpeed) => {
          setSpeed(nextSpeed);
          if (audioRef.current) audioRef.current.playbackRate = nextSpeed;
        }}
        onRewind={rewind}
        onTogglePlay={togglePlay}
        onForward={forward}
        onVolumeChange={(value) => {
          setVolume(value);
          if (audioRef.current) audioRef.current.volume = value / 100;
        }}
        volume={volume}
        controlButtonClass={controlButtonClass}
        playButtonClass={playButtonClass}
        actionDisabled={actionDisabled}
        speedDisabled={speedDisabled}
        volumeDisabled={volumeDisabled}
        currentButtonIcon={currentButtonIcon}
      />
    </div>
  );
};

export default AudioPlayer;
