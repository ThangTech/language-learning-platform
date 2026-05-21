import { Link } from 'react-router-dom';

const ListeningJourneyCta = () => {
  return (
    <div className="mt-10 bg-surface-container-low rounded-[1.5rem] p-6 border border-outline-variant/10 flex flex-wrap gap-3 items-center justify-between">
      <div>
        <h3 className="font-headline text-lg font-bold text-on-surface">
          Tiếp tục lộ trình VSTEPS
        </h3>
        <p className="text-sm text-on-surface-variant">
          Sau khi nghe xong, sang tiến độ hoặc làm quiz để củng cố ngay.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Link to="/progress" className="no-underline">
          <button className="px-5 py-3 rounded-full bg-primary text-on-primary font-headline font-bold text-sm hover:opacity-90 transition-all">
            Xem tiến độ
          </button>
        </Link>
        <Link to="/quiz" className="no-underline">
          <button className="px-5 py-3 rounded-full border border-primary text-primary font-headline font-bold text-sm hover:bg-primary/5 transition-all">
            Làm quiz
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ListeningJourneyCta;
