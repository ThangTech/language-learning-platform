const AudioPlayer = () => {
  return (
    <div className="flex items-center gap-4 p-4 bg-surface-container rounded-2xl">
      <button className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center">
        <span className="material-symbols-outlined">play_arrow</span>
      </button>
      <div className="flex-1">
        <div className="h-1 bg-surface-container-high rounded-full overflow-hidden">
          <div className="h-full w-1/3 bg-primary rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;