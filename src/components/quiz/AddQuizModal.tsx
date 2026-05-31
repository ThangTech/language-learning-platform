import { useEffect, useState } from 'react';
import { Modal, Form, Input, Select, InputNumber, Button } from 'antd';
import type { QuizDto } from '../../interfaces/quiz';
import { getGrammarTopics } from '../../services/grammar';
import { getLessons } from '../../services/listening';

const LEVEL_OPTIONS = [
  { value: 'Easy', label: 'Dễ' },
  { value: 'Medium', label: 'Trung bình' },
  { value: 'Hard', label: 'Khó' },
];

const TYPE_OPTIONS = [
  { value: 'MultipleChoice', label: 'Trắc nghiệm' },
  { value: 'FillInBlank', label: 'Điền vào chỗ trống' },
  { value: 'Dictation', label: 'Chép chính tả' },
];

const normalizeDifficulty = (difficulty?: string) => {
  const map: Record<string, string> = {
    'Dễ': 'Easy',
    'Trung bình': 'Medium',
    'Khó': 'Hard',
  };

  return difficulty ? map[difficulty] || difficulty : 'Medium';
};

const normalizeType = (type?: string) => {
  const map: Record<string, string> = {
    'Trắc nghiệm': 'MultipleChoice',
    'Điền vào chỗ trống': 'FillInBlank',
    'Chép chính tả': 'Dictation',
  };

  return type ? map[type] || type : 'MultipleChoice';
};

interface AddQuizModalProps {
  isOpen: boolean;
  loading?: boolean;
  editingQuiz?: QuizDto | null;
  onClose: () => void;
  onSave: (values: {
    title: string;
    difficulty: string;
    type: string;
    durationMinutes: number;
    grammarTopicId?: string;
    lessonId?: string;
  }) => void;
}

const AddQuizModal = ({
  isOpen,
  loading = false,
  editingQuiz,
  onClose,
  onSave,
}: AddQuizModalProps) => {
  const [form] = Form.useForm();
  const [grammarTopics, setGrammarTopics] = useState<{ id: string; title: string }[]>([]);
  const [lessons, setLessons] = useState<{ id: string; title: string }[]>([]);

  useEffect(() => {
    if (isOpen) {
      void getGrammarTopics(1, 100).then(res => {
        if (res.success && res.data) setGrammarTopics(res.data.items);
      });
      void getLessons(1, 100).then(res => {
        if (res.success && res.data) setLessons(res.data.items);
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (editingQuiz) {
      form.setFieldsValue({
        title: editingQuiz.title,
        difficulty: normalizeDifficulty(editingQuiz.difficulty),
        type: normalizeType(editingQuiz.type),
        durationMinutes: editingQuiz.durationMinutes,
        grammarTopicId: editingQuiz.grammarTopicId,
        lessonId: editingQuiz.lessonId,
      });
      return;
    }
    form.resetFields();
  }, [editingQuiz, form, isOpen]);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      onSave(values);
    });
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      title={editingQuiz ? 'Sửa quiz' : 'Thêm quiz'}
      centered
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="title"
          label="Tiêu đề quiz"
          rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
        >
          <Input placeholder="Nhập tiêu đề..." />
        </Form.Item>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="difficulty"
            label="Độ khó"
            initialValue="Medium"
          >
            <Select options={LEVEL_OPTIONS} />
          </Form.Item>

          <Form.Item
            name="type"
            label="Loại quiz"
            initialValue="MultipleChoice"
          >
            <Select options={TYPE_OPTIONS} />
          </Form.Item>
        </div>

        <Form.Item
          name="durationMinutes"
          label="Thời lượng (phút)"
          initialValue={10}
        >
          <InputNumber min={1} className="w-full" />
        </Form.Item>

        <Form.Item
          name="grammarTopicId"
          label="Gắn với chủ đề Ngữ pháp (tùy chọn)"
        >
          <Select 
            placeholder="Chọn chủ đề ngữ pháp..." 
            allowClear
            options={grammarTopics.map(t => ({ value: t.id, label: t.title }))} 
          />
        </Form.Item>

        <Form.Item
          name="lessonId"
          label="Gắn với bài nghe Listening (tùy chọn)"
        >
          <Select 
            placeholder="Chọn bài nghe..." 
            allowClear
            options={lessons.map(l => ({ value: l.id, label: l.title }))} 
          />
        </Form.Item>

        <Form.Item className="mb-0 pt-4">
          <div className="flex items-center justify-end gap-3">
            <Button onClick={onClose}>
              Hủy
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              {editingQuiz ? 'Lưu' : 'Tiếp tục thêm câu hỏi'}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddQuizModal;
