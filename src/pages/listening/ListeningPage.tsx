import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import {
  CustomerServiceOutlined,
  TeamOutlined,
  FileTextOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import AddLessonModal from '../../components/listening/AddLessonModal';
import { getLessons, createLesson, updateLesson, deleteLesson } from '../../services/listening';
import { getUser } from '../../services/auth';
import type { ListeningLessonDto } from '../../interfaces/listening';

const PART_ICONS = [
  <CustomerServiceOutlined key="p1" className="text-4xl text-primary" />,
  <TeamOutlined key="p2" className="text-4xl text-primary" />,
  <FileTextOutlined key="p3" className="text-4xl text-primary" />,
];

const LEVEL_COLORS: Record<string, string> = {
  B1: 'bg-primary-fixed text-on-primary-fixed',
  B2: 'bg-secondary-fixed text-on-secondary-container',
};

const ListeningPage = () => {
  const user = getUser();
  const isAdmin = user?.role?.toLowerCase() === 'admin';
  const navigate = useNavigate();

  const [lessons, setLessons] = useState<ListeningLessonDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<ListeningLessonDto | null>(null);

  const loadLessons = async () => {
    try {
      const result = await getLessons(1, 50);
      if (result.success && result.data) {
        setLessons(result.data.items);
      }
    } catch (error: any) {
      message.error(error?.response?.data?.message || 'Lỗi kết nối');
    }
  };

  useEffect(() => {
    void loadLessons();
  }, []);

  const vstepLessons = lessons.filter((l) =>
    l.title.toLowerCase().includes('vstep listening part')
  );

  const displayLessons =
    vstepLessons.length === 3
      ? vstepLessons
      : lessons.slice(0, 3).length > 0
        ? lessons.slice(0, 3)
        : [];

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
          void loadLessons();
        } else {
          message.error(result.message || 'Không thể cập nhật');
        }
      } else {
        const result = await createLesson(values);
        if (result.success) {
          message.success('Đã thêm bài nghe');
          void loadLessons();
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
        setLessons(lessons.filter((lesson) => lesson.id !== id));
      } else {
        message.error(result.message || 'Không thể xóa');
      }
    } catch (error: any) {
      message.error(error?.response?.data?.message || 'Lỗi xóa');
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <div className="mb-10 pt-8">
        <h1 className="font-headline text-4xl font-extrabold text-on-surface">
          Luyện nghe VSTEP
        </h1>
        <p className="mt-2 text-on-surface-variant max-w-2xl">
          Bộ đề luyện nghe VSTEP gồm 3 phần với các dạng bài
          Announcement, Conversation và Talk. Mỗi phần có một file
          nghe duy nhất kèm câu hỏi trắc nghiệm và bài chép chính tả.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {displayLessons.map((lesson, index) => {
          const levelColor =
            LEVEL_COLORS[lesson.level] || 'bg-surface-container text-on-surface';
          const partNum = index + 1;

          return (
            <div key={lesson.id} className="relative group">
              <button
                onClick={() => navigate(`/listening/${lesson.id}`)}
                className="flex w-full flex-col items-start rounded-[1.5rem] border border-outline-variant/10 bg-surface-container-lowest p-6 text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                  {PART_ICONS[index]}
                </div>

                <span className={`mb-2 rounded-full px-3 py-0.5 text-xs font-headline font-bold ${levelColor}`}>
                  Part {partNum} - {lesson.level}
                </span>

                <h3 className="font-headline text-lg font-bold text-on-surface">
                  {lesson.title}
                </h3>

                <p className="mt-1 text-sm text-on-surface-variant line-clamp-2">
                  {lesson.description}
                </p>

                <div className="mt-4 flex items-center gap-4 text-xs text-on-surface-variant">
                  <span>
                    {Math.floor(lesson.duration / 60)}:
                    {(lesson.duration % 60).toString().padStart(2, '0')}
                  </span>
                </div>
              </button>

              {isAdmin && (
                <div className="absolute right-3 top-3 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditLesson(lesson);
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-primary shadow hover:bg-primary/10"
                  >
                    <EditOutlined />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteLesson(lesson.id);
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-red-500 shadow hover:bg-red-50"
                  >
                    <DeleteOutlined />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {isAdmin && (
        <div className="fixed bottom-10 right-10 z-50">
          <button
            onClick={handleAddLesson}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-on-primary shadow-lg hover:scale-105 transition-transform"
          >
            <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>add</span>
          </button>
        </div>
      )}

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
