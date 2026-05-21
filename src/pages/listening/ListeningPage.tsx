import { useEffect, useState } from 'react';
import { message } from 'antd';
import ListeningHero from '../../components/listening/ListeningHero';
import ListeningGrid from '../../components/listening/ListeningGrid';
import ListeningToolbar from '../../components/listening/ListeningToolbar';
import ListeningEmptyState from '../../components/listening/ListeningEmptyState';
import ListeningJourneyCta from '../../components/listening/ListeningJourneyCta';
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
  const [searchText, setSearchText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<ListeningLessonDto | null>(null);
  const [loading, setLoading] = useState(false);

  const loadLessons = async (search?: string) => {
    try {
      const result = await getLessons(1, 100, undefined, search);
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

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadLessons(searchText.trim() || undefined);
    }, 400);

    return () => window.clearTimeout(timer);
  }, [searchText]);

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

  const filteredLessons = lessons.filter((lesson) => selectedLevel === 'Tất cả' || lesson.level === selectedLevel);
  const normalizedSearch = searchText.trim();
  const isSearchActive = normalizedSearch.length > 0;

  const clearSearch = () => setSearchText('');
  const clearFilters = () => {
    setSearchText('');
    setSelectedLevel('Tất cả');
    void loadLessons();
  };
  const totalVisible = filteredLessons.length;
  const emptyMessage = isSearchActive
    ? 'Không có bài nghe khớp từ khóa này.'
    : selectedLevel === 'Tất cả'
      ? 'Chưa có bài nghe phù hợp.'
      : `Chưa có bài nghe cấp độ ${selectedLevel}.`;
  const emptyHint = isSearchActive
    ? 'Thử đổi từ khóa tìm kiếm hoặc bỏ lọc cấp độ.'
    : selectedLevel === 'Tất cả'
      ? 'Thử chọn cấp độ khác hoặc thêm bài nghe mới nếu bạn là admin.'
      : 'Thử chọn cấp độ khác hoặc quay lại toàn bộ danh sách.';

  return (
    <div className="max-w-6xl mx-auto">
      <ListeningHero totalLessons={lessons.length} />

      <ListeningToolbar
        searchText={searchText}
        onSearchTextChange={setSearchText}
        onClearSearch={clearSearch}
        levels={['Tất cả', ...LEVELS]}
        selectedLevel={selectedLevel}
        onSelectLevel={setSelectedLevel}
      />

      <div className="text-xs text-on-surface-variant mb-4">
        {isSearchActive ? `Đang tìm: ${normalizedSearch}` : 'Tìm kiếm theo tiêu đề hoặc chủ đề để chọn bài nghe nhanh hơn.'}
      </div>

      <div className="text-xs text-on-surface-variant mb-4">
        Đang hiển thị {totalVisible} bài nghe phù hợp.
      </div>

      {totalVisible > 0 ? (
        <ListeningGrid
          lessons={filteredLessons}
          isAdmin={isAdmin}
          onEditLesson={handleEditLesson}
          onDeleteLesson={handleDeleteLesson}
          onPlayLesson={handlePlayLesson}
        />
      ) : (
        <ListeningEmptyState
          title={emptyMessage}
          hint={emptyHint}
          searchActive={isSearchActive}
          selectedLevel={selectedLevel}
          onClearSearch={clearSearch}
          onClearLevel={() => setSelectedLevel('Tất cả')}
          onResetAll={clearFilters}
        />
      )}

      <ListeningJourneyCta />

      <p className="text-xs text-on-surface-variant mb-4">Đang hiển thị {totalVisible} bài nghe phù hợp.</p>

      {totalVisible > 0 ? (
        <ListeningGrid
          lessons={filteredLessons}
          isAdmin={isAdmin}
          onEditLesson={handleEditLesson}
          onDeleteLesson={handleDeleteLesson}
          onPlayLesson={handlePlayLesson}
        />
      ) : (
        <div className="rounded-[1.5rem] border border-dashed border-outline-variant/20 bg-surface-container-low p-8 text-center">
          <p className="font-headline font-semibold text-on-surface">{emptyMessage}</p>
          <p className="mt-2 text-sm text-on-surface-variant">
            {emptyHint}
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            {isSearchActive && (
              <button
                onClick={clearSearch}
                className="px-4 py-2 rounded-full bg-secondary text-on-secondary font-headline font-bold text-sm hover:opacity-90 transition-all"
              >
                Xóa tìm kiếm
              </button>
            )}
            {selectedLevel !== 'Tất cả' && (
              <button
                onClick={() => setSelectedLevel('Tất cả')}
                className="px-4 py-2 rounded-full border border-primary text-primary font-headline font-bold text-sm hover:bg-primary/5 transition-all"
              >
                Bỏ lọc cấp độ
              </button>
            )}
            {!isSearchActive && selectedLevel === 'Tất cả' && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 rounded-full border border-outline-variant text-on-surface-variant font-headline font-bold text-sm hover:bg-surface-container transition-all"
              >
                Làm mới danh sách
              </button>
            )}
          </div>
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
