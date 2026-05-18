import { useEffect } from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';
import type { WordData, LevelInfo } from './WordCard';

export interface WordFormValues {
  word: string;
  pronunciation?: string;
  definition: string;
  example?: string;
  category: string;
  level: string;
}

interface AddWordModalProps {
  isOpen: boolean;
  loading?: boolean;
  editingWord?: WordData | null;
  onClose: () => void;
  onSave: (values: WordFormValues) => void;
}

const LEVEL_OPTIONS: LevelInfo[] = [
  { label: 'A1', bgColor: 'bg-primary-fixed', textColor: 'text-on-primary-fixed' },
  { label: 'A2', bgColor: 'bg-primary-fixed', textColor: 'text-on-primary-fixed' },
  { label: 'B1', bgColor: 'bg-primary-fixed', textColor: 'text-on-primary-fixed' },
  { label: 'B2', bgColor: 'bg-secondary-fixed', textColor: 'text-on-secondary-fixed' },
];

const CATEGORIES = ['Văn học', 'Triết học', 'Kinh doanh', 'Công nghệ', 'Học thuật'];

const AddWordModal = ({
  isOpen,
  loading = false,
  editingWord,
  onClose,
  onSave,
}: AddWordModalProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingWord) {
      form.setFieldsValue({
        word: editingWord.word,
        pronunciation: editingWord.pronunciation,
        definition: editingWord.definition,
        example: editingWord.example,
        category: editingWord.category,
        level: editingWord.levels[0]?.label || 'A1',
      });
      return;
    }

    form.resetFields();
  }, [editingWord, form, isOpen]);

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
      title={editingWord ? 'Sửa từ vựng' : 'Thêm từ vựng'}
      centered
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="word"
          label="Từ vựng"
          rules={[{ required: true, message: 'Vui lòng nhập từ vựng' }]}
        >
          <Input placeholder="Nhập từ vựng..." />
        </Form.Item>

        <Form.Item
          name="pronunciation"
          label="Phiên âm"
        >
          <Input placeholder="Ví dụ: /ˈwɜːrd/" />
        </Form.Item>

        <Form.Item
          name="definition"
          label="Nghĩa"
          rules={[{ required: true, message: 'Vui lòng nhập nghĩa của từ' }]}
        >
          <Input.TextArea rows={2} placeholder="Nhập nghĩa của từ..." />
        </Form.Item>

        <Form.Item
          name="example"
          label="Ví dụ"
        >
          <Input.TextArea rows={2} placeholder="Nhập câu ví dụ..." />
        </Form.Item>

        <Form.Item
          name="category"
          label="Danh mục"
          initialValue={CATEGORIES[0]}
        >
          <Select options={CATEGORIES.map(c => ({ value: c, label: c }))} />
        </Form.Item>

        <Form.Item
          name="level"
          label="Cấp độ"
          initialValue="A1"
        >
          <Select options={LEVEL_OPTIONS.map(l => ({ value: l.label, label: l.label }))} />
        </Form.Item>

        <Form.Item className="mb-0 pt-4">
          <div className="flex items-center justify-end gap-3">
            <Button onClick={onClose}>
              Hủy
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              {editingWord ? 'Lưu' : 'Thêm từ'}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddWordModal;
