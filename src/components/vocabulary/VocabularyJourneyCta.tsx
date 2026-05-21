import { Link } from 'react-router-dom';

const VocabularyJourneyCta = () => {
  return (
    <div className="mt-10 flex flex-wrap gap-3">
      <Link to="/listening" className="no-underline">
        <button className="px-5 py-3 rounded-full bg-primary text-on-primary font-headline font-bold text-sm hover:opacity-90 transition-all">
          Sang Listening
        </button>
      </Link>
      <Link to="/progress" className="no-underline">
        <button className="px-5 py-3 rounded-full border border-primary text-primary font-headline font-bold text-sm hover:bg-primary/5 transition-all">
          Xem tiến độ
        </button>
      </Link>
    </div>
  );
};

export default VocabularyJourneyCta;
