interface DictationFooterProps {
  onRestart: () => void;
}

const DictationFooter = ({ onRestart }: DictationFooterProps) => {
  return (
    <div className="mt-8 bg-primary/5 border border-primary/10 rounded-[1.5rem] p-6 flex gap-4">
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
        <span className="material-symbols-outlined text-primary text-[1.4rem]" style={{ fontVariationSettings: "'FILL' 1" }}>tips_and_updates</span>
      </div>
      <div className="flex-1">
        <h3 className="font-headline font-bold text-on-surface mb-1">Mẹo luyện tập hiệu quả</h3>
        <p className="text-on-surface-variant text-sm leading-relaxed">
          Nghe ít nhất <strong className="text-primary">2-3 lần</strong> trước khi bắt đầu gõ. Lần đầu để hiểu tổng thể, lần sau chú ý từng từ.
        </p>
      </div>
      <button
        onClick={onRestart}
        className="px-4 py-2 rounded-full border border-primary text-primary text-sm font-headline font-bold hover:bg-primary/5 transition-all self-start"
      >
        Làm lại
      </button>
    </div>
  );
};

export default DictationFooter;
