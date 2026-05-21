interface AudioPlayerControlsProps {
  speeds: number[];
  speed: number;
  hasAudio: boolean;
  onSpeedChange: (speed: number) => void;
  onRewind: () => void;
  onTogglePlay: () => void;
  onForward: () => void;
  onVolumeChange: (value: number) => void;
  volume: number;
  controlButtonClass: string;
  playButtonClass: string;
  actionDisabled: boolean;
  speedDisabled: boolean;
  volumeDisabled: boolean;
  currentButtonIcon: string;
}

const AudioPlayerControls = ({
  speeds,
  speed,
  hasAudio,
  onSpeedChange,
  onRewind,
  onTogglePlay,
  onForward,
  onVolumeChange,
  volume,
  controlButtonClass,
  playButtonClass,
  actionDisabled,
  speedDisabled,
  volumeDisabled,
  currentButtonIcon,
}: AudioPlayerControlsProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        {speeds.map((item) => (
          <button
            key={item}
            onClick={() => {
              if (!hasAudio) return;
              onSpeedChange(item);
            }}
            disabled={speedDisabled}
            className={`px-2.5 py-1 rounded-full text-xs font-headline font-bold transition-all ${
              speed === item
                ? 'bg-primary text-on-primary'
                : 'text-on-surface-variant hover:bg-surface-container'
            } ${speedDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {item}x
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onRewind}
          disabled={actionDisabled}
          className={controlButtonClass}
          title="Tua lại 10s"
        >
          <span className="material-symbols-outlined text-[1.3rem]">replay_10</span>
        </button>

        <button
          onClick={onTogglePlay}
          disabled={actionDisabled}
          className={playButtonClass}
        >
          <span className="material-symbols-outlined text-[1.8rem]" style={{ fontVariationSettings: "'FILL' 1" }}>
            {currentButtonIcon}
          </span>
        </button>

        <button
          onClick={onForward}
          disabled={actionDisabled}
          className={controlButtonClass}
          title="Tua tới 10s"
        >
          <span className="material-symbols-outlined text-[1.3rem]">forward_10</span>
        </button>
      </div>

      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-on-surface-variant text-[1.2rem]">volume_up</span>
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={(e) => {
            if (!hasAudio) return;
            onVolumeChange(Number(e.target.value));
          }}
          disabled={volumeDisabled}
          className={`w-20 accent-primary ${volumeDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        />
      </div>
    </div>
  );
};

export default AudioPlayerControls;
