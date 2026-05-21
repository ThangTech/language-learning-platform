interface AudioPlayerHeaderProps {
  hasAudio: boolean;
  title: string;
  mainTitle: string;
  helperText: string;
  titleColor: string;
  emptyIcon: string;
}

const AudioPlayerHeader = ({
  hasAudio,
  title,
  mainTitle,
  helperText,
  titleColor,
  emptyIcon,
}: AudioPlayerHeaderProps) => {
  return (
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
  );
};

export default AudioPlayerHeader;
