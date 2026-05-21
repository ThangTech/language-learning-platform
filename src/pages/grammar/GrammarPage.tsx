import { useEffect, useState } from 'react';
import { message } from 'antd';
import { getUser } from '../../services/auth';
import { getGrammarTopics, getUserGrammarProgress, createGrammarTopic, updateGrammarTopic, deleteGrammarTopic, markTopicCompleted } from '../../services/grammar';
import GrammarHero from '../../components/grammar/GrammarHero';
import GrammarGrid from '../../components/grammar/GrammarGrid';
import GrammarFilters from '../../components/grammar/GrammarFilters';
import GrammarEmptyState from '../../components/grammar/GrammarEmptyState';
import GrammarJourneyCta from '../../components/grammar/GrammarJourneyCta';
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
              const completedIds = new Set(progressResult.data.map((progress) => progress.topicId));
              items = items.map((topic) => ({
                ...topic,
                isCompleted: completedIds.has(topic.id),
              }));
            }
          } catch {
            items = items.map((topic) => ({ ...topic, isCompleted: false }));
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
        setTopics(topics.map((topic) => (topic.id === id ? { ...topic, isCompleted: true } : topic)));
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
        setTopics(topics.filter((topic) => topic.id !== id));
      } else {
        message.error(result.message || 'Không thể xóa');
      }
    } catch (error: any) {
      message.error(error?.response?.data?.message || 'Lỗi xóa');
    }
  };

  const filteredTopics = topics.filter((topic) => selectedLevel === 'Tất cả' || topic.level === selectedLevel);
  const totalVisible = filteredTopics.length;
  const isFiltered = selectedLevel !== 'Tất cả';
  const emptyTitle = isFiltered ? 'Không có chủ đề phù hợp' : 'Chưa có chủ đề phù hợp';
  const emptyHint = isFiltered
    ? 'Thử bỏ lọc cấp độ để xem thêm chủ đề.'
    : 'Thử chọn cấp độ khác hoặc thêm chủ đề mới nếu bạn là admin.';

  return (
    <div className="max-w-6xl mx-auto">
      <GrammarHero totalTopics={topics.length} completedCount={topics.filter((topic) => topic.isCompleted).length} />

      <GrammarFilters
        levels={['Tất cả', ...LEVELS]}
        selectedLevel={selectedLevel}
        onSelectLevel={setSelectedLevel}
      />

      {totalVisible > 0 ? (
        <GrammarGrid
          topics={filteredTopics}
          isAdmin={isAdmin}
          onEditTopic={handleEditTopic}
          onDeleteTopic={handleDeleteTopic}
          onCompleteTopic={handleToggleComplete}
        />
      ) : (
        <GrammarEmptyState
          title={emptyTitle}
          hint={emptyHint}
          onResetLevel={() => setSelectedLevel('Tất cả')}
        />
      )}

      <GrammarJourneyCta />

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
