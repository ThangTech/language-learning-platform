import { Modal, Form, Input, Select, Button } from 'antd';
import type { WordData, LevelInfo } from './WordCard';

interface AddWordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (word: WordData) => void;
}

const LEVEL_OPTIONS: LevelInfo[] = [
  { label: 'A1', bgColor: 'bg-primary-fixed', textColor: 'text-on-primary-fixed' },
  { label: 'A2', bgColor: 'bg-primary-fixed', textColor: 'text-on-primary-fixed' },
  { label: 'B1', bgColor: 'bg-primary-fixed', textColor: 'text-on-primary-fixed' },
  { label: 'B2', bgColor: 'bg-secondary-fixed', textColor: 'text-on-secondary-fixed' },
  { label: 'C1', bgColor: 'bg-secondary-fixed', textColor: 'text-on-secondary-fixed' },
  { label: 'C2', bgColor: 'bg-secondary-fixed', textColor: 'text-on-secondary-fixed' },
];

const CATEGORIES = ['Văn học', 'Triết học', 'Kinh doanh', 'Công nghệ', 'Học thuật'];

const AddWordModal = ({ isOpen, onClose, onAdd }: AddWordModalProps) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const levelInfo = LEVEL_OPTIONS.find(l => l.label === values.level) || LEVEL_OPTIONS[0];

      const newWord: WordData = {
        id: `w${Date.now()}`,
        category: values.category,
        word: values.word.trim(),
        pronunciation: values.pronunciation?.trim() || '/.../',
        definition: values.definition.trim(),
        example: values.example?.trim() || '-',
        levels: [levelInfo],
        isFavorite: false,
      };

      onAdd(newWord);
      form.resetFields();
      onClose();
    });
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      title="Thêm từ mới"
      centered
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="word"
          label="Từ vựng"
          rules={[{ required: true, message: 'Vui lòng nhập từ vựng' }]}
        >
          <Input placeholder="Nhập từ mới..." />
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

        <Form.Item className="mb-0 flex gap-3 pt-4">
          <Button onClick={onClose} className="flex-1">
            Hủy
          </Button>
          <Button type="primary" htmlType="submit" className="flex-1">
            Thêm từ
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddWordModal;
