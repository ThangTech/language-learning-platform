import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { message } from 'antd';
import { getUser } from '../../services/auth';
import { getGrammarTopics, getUserGrammarProgress, createGrammarTopic, updateGrammarTopic, deleteGrammarTopic, markTopicCompleted } from '../../services/grammar';
import GrammarHero from '../../components/grammar/GrammarHero';
import GrammarGrid from '../../components/grammar/GrammarGrid';
import AddGrammarModal from '../../components/grammar/AddGrammarModal';
import type { GrammarTopicDto } from '../../interfaces/grammar';

const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

const GrammarPage = () => {
  const user = getUser();
  const isAdmin = user?.role?.toLowerCase() === 'admin';

  const [topics, setTopics] = useState<GrammarTopicDto[]>([]);
  const [selectedLevel, setSelectedLevel] = useState('Tất cả');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTopic, setEditingTopic] = useState<GrammarTopicDto | null>(null);
  const [loading, setLoading] = useState(false);

  const loadTopics = async () => {
    try {
      const result = await getGrammarTopics(1, 100);
      if (result.success && result.data) {
        let items = result.data.items as GrammarTopicDto[];

        const token = localStorage.getItem('token');
        if (!isAdmin && token) {
          try {
            const progressResult = await getUserGrammarProgress();
            if (progressResult.success && progressResult.data) {
              const completedIds = new Set(progressResult.data.map(p => p.topicId));
              items = items.map(t => ({
                ...t,
                isCompleted: completedIds.has(t.id),
              }));
            }
          } catch {
            items = items.map(t => ({ ...t, isCompleted: false }));
          }
        }

        setTopics(items);
      } else {
        message.error(result.message || 'Không thể tải ngữ pháp');
      }
    } catch (error: any) {
      message.error(error?.response?.data?.message || 'Lỗi kết nối');
    }
  };

  useEffect(() => {
    loadTopics();
  }, []);

  const handleToggleComplete = async (id: string) => {
    try {
      const result = await markTopicCompleted(id);
      if (result.success) {
        message.success('Đã đánh dấu hoàn thành');
        setTopics(topics.map(t => t.id === id ? { ...t, isCompleted: true } : t));
      } else {
        message.error(result.message || 'Không thể cập nhật trạng thái');
      }
    } catch (error: any) {
      message.error(error?.response?.data?.message || 'Lỗi kết nối');
    }
  };

  const handleAddTopic = () => {
    setEditingTopic(null);
    setIsModalOpen(true);
  };

  const handleEditTopic = (topic: GrammarTopicDto) => {
    setEditingTopic(topic);
    setIsModalOpen(true);
  };

  const handleSaveTopic = async (values: {
    title: string;
    content: string;
    explanation?: string;
    examples?: string;
    level: string;
  }) => {
    setLoading(true);
    try {
      if (editingTopic) {
        const result = await updateGrammarTopic(editingTopic.id, values);
        if (result.success) {
          message.success('Đã cập nhật chủ đề');
          loadTopics();
        } else {
          message.error(result.message || 'Không thể cập nhật');
        }
      } else {
        const result = await createGrammarTopic(values);
        if (result.success) {
          message.success('Đã thêm chủ đề');
          loadTopics();
        } else {
          message.error(result.message || 'Không thể thêm chủ đề');
        }
      }
      setIsModalOpen(false);
      setEditingTopic(null);
    } catch (error: any) {
      message.error(error?.response?.data?.message || 'Không thể lưu chủ đề');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTopic = async (id: string) => {
    try {
      const result = await deleteGrammarTopic(id);
      if (result.success) {
        message.success('Đã xóa chủ đề');
        setTopics(topics.filter(t => t.id !== id));
      } else {
        message.error(result.message || 'Không thể xóa');
      }
    } catch (error: any) {
      message.error(error?.response?.data?.message || 'Lỗi xóa');
    }
  };

  const filteredTopics = topics.filter(t =>
    selectedLevel === 'Tất cả' || t.level === selectedLevel
  );

  return (
    <div className="max-w-6xl mx-auto">
      <GrammarHero totalTopics={topics.length} completedCount={topics.filter(t => t.isCompleted).length} />

      <div className="my-6 flex flex-wrap items-center gap-3">
        <span className="font-headline text-sm font-semibold text-on-surface-variant">Lọc theo cấp độ:</span>
        {['Tất cả', ...LEVELS].map(level => (
          <button
            key={level}
            onClick={() => setSelectedLevel(level)}
            className={`px-4 py-1.5 rounded-full text-sm font-headline font-semibold transition-all
              ${selectedLevel === level
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
              }`}
          >
            {level === 'All' ? 'Tất cả' : level === 'Beginner' ? 'Cơ bản' : level === 'Intermediate' ? 'Trung cấp' : 'Nâng cao'}
          </button>
        ))}
      </div>

      <GrammarGrid
        topics={filteredTopics}
        isAdmin={isAdmin}
        onEditTopic={handleEditTopic}
        onDeleteTopic={handleDeleteTopic}
        onCompleteTopic={handleToggleComplete}
      />

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

      {isAdmin && (
        <div className="fixed bottom-10 right-10 z-50">
          <button
            onClick={handleAddTopic}
            className="w-16 h-16 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
          >
            <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>add</span>
          </button>
        </div>
      )}

      <AddGrammarModal
        isOpen={isModalOpen}
        editingTopic={editingTopic}
        loading={loading}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTopic(null);
        }}
        onSave={handleSaveTopic}
      />
    </div>
  );
};

export default GrammarPage;
