import { useEffect } from 'react';
import { Modal, Form, Input, Select, InputNumber, Button } from 'antd';
import type { QuizDto } from '../../interfaces/quiz';

const LEVEL_OPTIONS = [
  { value: 'Easy', label: 'Dễ' },
  { value: 'Medium', label: 'Trung bình' },
  { value: 'Hard', label: 'Khó' },
];

const TYPE_OPTIONS = [
  { value: 'MultipleChoice', label: 'Trắc nghiệm' },
  { value: 'TrueFalse', label: 'Đúng/Sai' },
  { value: 'Matching', label: 'Nối' },
];

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

  useEffect(() => {
    if (editingQuiz) {
      form.setFieldsValue({
        title: editingQuiz.title,
        difficulty: editingQuiz.difficulty,
        type: editingQuiz.type,
        durationMinutes: editingQuiz.durationMinutes,
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
      title={editingQuiz ? 'Sửa quiz' : 'Thêm quiz mới'}
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

        <Form.Item className="mb-0 pt-4">
          <div className="flex items-center justify-end gap-3">
            <Button onClick={onClose}>
              Hủy
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              {editingQuiz ? 'Lưu' : 'Thêm'}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddQuizModal;
