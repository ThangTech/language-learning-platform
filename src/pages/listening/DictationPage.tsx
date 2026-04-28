import AudioPlayer from '../../components/listening/AudioPlayer';
import DictationInput from '../../components/listening/DictationInput';

const DictationPage = () => {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <h1 className="font-headline text-4xl font-bold mb-4">Luyện đánh văn bản</h1>
        <p className="text-on-surface-variant">Nghe và đánh văn bản chính xác</p>

        <div className="mt-8 max-w-2xl">
          <AudioPlayer />
          <div className="mt-6">
            <DictationInput />
          </div>
          <div className="mt-4 flex gap-3">
            <button className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-headline font-bold text-sm">
              Nộp bài
            </button>
            <button className="px-6 py-2.5 rounded-full border border-outline-variant text-on-surface-variant text-sm">
              Kiểm tra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DictationPage;