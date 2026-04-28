const LessonCard = () => {
  return (
    <div className="bg-surface-container-low rounded-2xl p-6">
      <div className="w-full h-32 bg-surface-container-high rounded-xl mb-4" />
      <h3 className="font-headline font-bold text-lg">Lesson title</h3>
      <p className="text-on-surface-variant text-sm">Level • Duration</p>
    </div>
  );
};

export default LessonCard;