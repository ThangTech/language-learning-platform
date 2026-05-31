import { useEffect, useState } from 'react';
import { Input, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { getUser } from '../../services/auth';
import { createGrammarTopic, deleteGrammarTopic, getGrammarTopics, getUserGrammarProgress, updateGrammarTopic } from '../../services/grammar';
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
  const [searchText, setSearchText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTopic, setEditingTopic] = useState<GrammarTopicDto | null>(null);
  const [loading, setLoading] = useState(false);

  const loadTopics = async (search?: string) => {
    try {
      const result = await getGrammarTopics(1, 100, undefined, search);
      if (!result.success || !result.data) {
        message.error(result.message || 'Không thể tải ngữ pháp');
        return;
      }

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
    } catch (error: any) {
      message.error(error?.response?.data?.message || 'Lỗi kết nối');
    }
  };

  useEffect(() => {
    loadTopics();
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadTopics(searchText.trim() || undefined);
    }, 300);

    return () => window.clearTimeout(timer);
  }, [searchText]);

  const handleSearchChange = (value: string) => {
    setSearchText(value);
  };

  const handleClearSearch = () => {
    setSearchText('');
  };

  const handleAddTopic = () => {
    setEditingTopic(null);
    setIsModalOpen(true);
  };

  const handleEditTopic = (topic: GrammarTopicDto) => {
    setEditingTopic(topic);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTopic(null);
  };



  const handleSaveTopic = async (values: {
    title: string;
    content: string;
    explanation?: string;
    examples?: string;
    level: string;
    youTubeUrl?: string;
  }) => {
    setLoading(true);
    try {
      if (editingTopic) {
        const result = await updateGrammarTopic(editingTopic.id, values);
        if (result.success) {
          message.success('Đã cập nhật chủ đề');
          await loadTopics(searchText.trim() || undefined);
        } else {
          message.error(result.message || 'Không thể cập nhật');
        }
      } else {
        const result = await createGrammarTopic(values);
        if (result.success) {
          message.success('Đã thêm chủ đề');
          await loadTopics(searchText.trim() || undefined);
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
        setTopics((prev) => prev.filter((topic) => topic.id !== id));
      } else {
        message.error(result.message || 'Không thể xóa');
      }
    } catch (error: any) {
      message.error(error?.response?.data?.message || 'Lỗi xóa');
    }
  };

  const filteredTopics = topics.filter((topic) => {
    if (selectedLevel === 'Tất cả') return true;
    return topic.level.toLowerCase() === selectedLevel.toLowerCase();
  });
  const totalVisible = filteredTopics.length;
  const isFiltered = selectedLevel !== 'Tất cả' || searchText.trim().length > 0;
  let emptyTitle = 'Chưa có chủ đề phù hợp';
  let emptyHint = 'Thử đổi cấp độ hoặc từ khóa tìm kiếm.';

  if (isFiltered) {
    emptyTitle = 'Không có chủ đề phù hợp';
    emptyHint = 'Thử bỏ bộ lọc hoặc đổi từ khóa để xem thêm chủ đề.';
  }

  return (
    <div className="max-w-7xl mx-auto">
      <GrammarHero totalTopics={topics.length} completedCount={topics.filter((topic) => topic.isCompleted).length} />

      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <Input
          value={searchText}
          onChange={(e) => handleSearchChange(e.target.value)}
          allowClear
          onClear={handleClearSearch}
          placeholder="Tìm chủ đề theo tiêu đề hoặc nội dung"
          prefix={<SearchOutlined />}
          className="max-w-xl"
        />
      </div>

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
        onClose={handleCloseModal}
        onSave={handleSaveTopic}
      />
    </div>
  );
};

export default GrammarPage;
