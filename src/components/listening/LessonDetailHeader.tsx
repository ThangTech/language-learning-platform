interface LessonDetailHeaderProps {
  level: string;
  levelColor: string;
  topicIcon?: string;
  topic: string;
  duration: string;
  title: string;
  description: string;
}

const LessonDetailHeader = ({
  level,
  levelColor,
  topicIcon,
  topic,
  duration,
  title,
  description,
}: LessonDetailHeaderProps) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 flex-wrap">
        <span className={`px-3 py-1 rounded-full text-xs font-headline font-bold ${levelColor}`}>
          {level}
        </span>
        <span className="flex items-center gap-1 text-xs text-on-surface-variant bg-surface-container px-3 py-1 rounded-full">
          <span className="material-symbols-outlined text-[0.9rem]">{topicIcon || 'headphones'}</span>
          {topic}
        </span>
        <span className="flex items-center gap-1 text-xs text-on-surface-variant bg-surface-container px-3 py-1 rounded-full">
          <span className="material-symbols-outlined text-[0.9rem]">schedule</span>
          {duration}
        </span>
      </div>
      <h1 className="font-headline text-3xl md:text-4xl font-extrabold text-on-surface leading-tight">{title}</h1>
      <p className="text-on-surface-variant text-base leading-relaxed max-w-2xl">{description}</p>
    </div>
  );
};

export default LessonDetailHeader;
