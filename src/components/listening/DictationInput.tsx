const DictationInput = () => {
  return (
    <div className="p-6 bg-surface-container-low rounded-2xl">
      <textarea
        placeholder="Nhập nội dung bạn nghe được..."
        className="w-full h-32 p-4 bg-surface-container rounded-xl border-2 border-outline focus:border-primary outline-none resize-none"
      />
    </div>
  );
};

export default DictationInput;