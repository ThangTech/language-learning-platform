interface AudioPlayerProgressProps {
  hasAudio: boolean;
  progressWidth: string;
  timeLabel: string;
  totalLabel: string;
  onSeek?: (event: React.MouseEvent<HTMLDivElement>) => void;
  emptyBarClass: string;
  emptyThumbClass: string;
}

const AudioPlayerProgress = ({
  hasAudio,
  progressWidth,
  timeLabel,
  totalLabel,
  onSeek,
  emptyBarClass,
  emptyThumbClass,
}: AudioPlayerProgressProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div
        className={`w-full h-2 rounded-full relative group ${hasAudio ? 'bg-surface-container-highest cursor-pointer' : 'bg-surface-container-highest cursor-not-allowed'}`}
        onClick={hasAudio ? onSeek : undefined}
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
  );
};

export default AudioPlayerProgress;
