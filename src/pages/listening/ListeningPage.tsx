import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { message } from 'antd';
import ListeningHero from '../../components/listening/ListeningHero';
import ListeningGrid from '../../components/listening/ListeningGrid';
import AddLessonModal from '../../components/listening/AddLessonModal';
import { getLessons, createLesson, updateLesson, deleteLesson } from '../../services/listening';
import { getUser } from '../../services/auth';
import type { ListeningLessonDto } from '../../interfaces/listening';

const LEVELS = ['A1', 'A2', 'B1', 'B2'];

const ListeningPage = () => {
  const user = getUser();
  const isAdmin = user?.role?.toLowerCase() === 'admin';

  const [lessons, setLessons] = useState<ListeningLessonDto[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string>('Tất cả');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<ListeningLessonDto | null>(null);
  const [loading, setLoading] = useState(false);

  const loadLessons = async () => {
    try {
      const result = await getLessons(1, 100);
      if (result.success && result.data) {
        setLessons(result.data.items);
      } else {
        message.error(result.message || 'Không thể tải bài nghe');
      }
    } catch (error: any) {
      message.error(error?.response?.data?.message || 'Lỗi kết nối');
    }
  };

  useEffect(() => {
    loadLessons();
  }, []);

  const handleAddLesson = () => {
    setEditingLesson(null);
    setIsModalOpen(true);
  };

  const handleEditLesson = (lesson: ListeningLessonDto) => {
    setEditingLesson(lesson);
    setIsModalOpen(true);
  };

  const handleSaveLesson = async (values: {
    title: string;
    description: string;
    audioUrl: string;
    level: string;
    topic: string;
    duration: number;
    transcriptJson?: string;
  }) => {
    setLoading(true);
    try {
      if (editingLesson) {
        const result = await updateLesson(editingLesson.id, values);
        if (result.success) {
          message.success('Đã cập nhật bài nghe');
          loadLessons();
        } else {
          message.error(result.message || 'Không thể cập nhật');
        }
      } else {
        const result = await createLesson(values);
        if (result.success) {
          message.success('Đã thêm bài nghe');
          loadLessons();
        } else {
          message.error(result.message || 'Không thể thêm bài nghe');
        }
      }
      setIsModalOpen(false);
      setEditingLesson(null);
    } catch (error: any) {
      message.error(error?.response?.data?.message || 'Không thể lưu bài nghe');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLesson = async (id: string) => {
    try {
      const result = await deleteLesson(id);
      if (result.success) {
        message.success('Đã xóa bài nghe');
        setLessons(lessons.filter(l => l.id !== id));
      } else {
        message.error(result.message || 'Không thể xóa');
      }
    } catch (error: any) {
      message.error(error?.response?.data?.message || 'Lỗi xóa');
    }
  };

  const handlePlayLesson = (id: string) => {
    window.location.href = `/listening/${id}`;
  };

  const filteredLessons = lessons.filter(l =>
    selectedLevel === 'Tất cả' || l.level === selectedLevel
  );

  return (
    <div className="max-w-6xl mx-auto">
      <ListeningHero totalLessons={lessons.length} />

      <div className="my-6 flex flex-wrap items-center gap-3">
        <span className="font-headline text-sm font-semibold text-on-surface-variant">Lọc theo cấp độ:</span>
        {['Tất cả', ...LEVELS].map(level => (
          <button
            key={level}
            onClick={() => setSelectedLevel(level)}
            className={`px-4 py-1.5 rounded-full text-sm font-headline font-semibold transition-colors
              ${selectedLevel === level
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
              }`}
          >
            {level}
          </button>
        ))}
      </div>

      <ListeningGrid
        lessons={filteredLessons}
        isAdmin={isAdmin}
        onEditLesson={handleEditLesson}
        onDeleteLesson={handleDeleteLesson}
        onPlayLesson={handlePlayLesson}
      />

      {isAdmin && (
        <div className="fixed bottom-10 right-10 z-50">
          <button
            onClick={handleAddLesson}
            className="w-16 h-16 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
          >
            <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>add</span>
          </button>
        </div>
      )}

      <div className="mt-10 bg-surface-container-low rounded-[1.5rem] p-6 border border-outline-variant/10 flex flex-wrap gap-3 items-center justify-between">
        <div>
          <h3 className="font-headline text-lg font-bold text-on-surface">Tiếp tục lộ trình VSTEPS</h3>
          <p className="text-sm text-on-surface-variant">Sau khi nghe xong, sang tiến độ hoặc làm quiz để củng cố ngay.</p>
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

      <AddLessonModal
        isOpen={isModalOpen}
        editingLesson={editingLesson}
        loading={loading}
        onClose={() => {
          setIsModalOpen(false);
          setEditingLesson(null);
        }}
        onSave={handleSaveLesson}
      />
    </div>
  );
};

export default ListeningPage;
