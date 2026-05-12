import { useEffect } from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';
import type { GrammarTopicDto } from '../../interfaces/grammar';

const LEVEL_OPTIONS = [
  { value: 'Beginner', label: 'Cơ bản' },
  { value: 'Intermediate', label: 'Trung cấp' },
  { value: 'Advanced', label: 'Nâng cao' },
];

interface AddGrammarModalProps {
  isOpen: boolean;
  loading?: boolean;
  editingTopic?: GrammarTopicDto | null;
  onClose: () => void;
  onSave: (values: {
    title: string;
    content: string;
    explanation?: string;
    examples?: string;
    level: string;
  }) => void;
}

const AddGrammarModal = ({
  isOpen,
  loading = false,
  editingTopic,
  onClose,
  onSave,
}: AddGrammarModalProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingTopic) {
      form.setFieldsValue({
        title: editingTopic.title,
        content: editingTopic.content,
        explanation: editingTopic.explanation,
        examples: editingTopic.examples,
        level: editingTopic.level,
      });
      return;
    }
    form.resetFields();
  }, [editingTopic, form, isOpen]);

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
      title={editingTopic ? 'Sửa chủ đề ngữ pháp' : 'Thêm chủ đề ngữ pháp'}
      centered
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="title"
          label="Tiêu đề"
          rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
        >
          <Input placeholder="Nhập tiêu đề..." />
        </Form.Item>

        <Form.Item
          name="content"
          label="Nội dung"
          rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}
        >
          <Input.TextArea rows={4} placeholder="Nhập nội dung ngữ pháp..." />
        </Form.Item>

        <Form.Item
          name="explanation"
          label="Giải thích"
        >
          <Input.TextArea rows={2} placeholder="Giải thích thêm (nếu cần)..." />
        </Form.Item>

        <Form.Item
          name="examples"
          label="Ví dụ"
        >
          <Input.TextArea rows={2} placeholder="Nhập ví dụ minh họa..." />
        </Form.Item>

        <Form.Item
          name="level"
          label="Cấp độ"
          initialValue="Beginner"
        >
          <Select options={LEVEL_OPTIONS} />
        </Form.Item>

        <Form.Item className="mb-0 flex gap-3 pt-4">
          <Button onClick={onClose} className="flex-1">
            Hủy
          </Button>
          <Button type="primary" htmlType="submit" loading={loading} className="flex-1">
            {editingTopic ? 'Lưu' : 'Thêm'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddGrammarModal;
