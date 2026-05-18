import { useEffect } from 'react';
import { Modal, Form, Input, Select, InputNumber, Button } from 'antd';
import type { ListeningLessonDto } from '../../interfaces/listening';

const LEVEL_OPTIONS = ['A1', 'A2', 'B1', 'B2'].map(level => ({
  value: level,
  label: level,
}));

const TOPIC_OPTIONS = [
  { value: 'Du lịch', label: 'Du lịch' },
  { value: 'Mua sắm', label: 'Mua sắm' },
  { value: 'Học tập', label: 'Học tập' },
  { value: 'Giáo dục', label: 'Giáo dục' },
];

interface AddLessonModalProps {
  isOpen: boolean;
  loading?: boolean;
  editingLesson?: ListeningLessonDto | null;
  onClose: () => void;
  onSave: (values: {
    title: string;
    description: string;
    audioUrl: string;
    level: string;
    topic: string;
    duration: number;
    transcriptJson?: string;
  }) => void;
}

const AddLessonModal = ({
  isOpen,
  loading = false,
  editingLesson,
  onClose,
  onSave,
}: AddLessonModalProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingLesson) {
      form.setFieldsValue({
        title: editingLesson.title,
        description: editingLesson.description,
        audioUrl: editingLesson.audioUrl,
        level: editingLesson.level,
        topic: editingLesson.topic,
        duration: editingLesson.duration,
        transcriptJson: editingLesson.transcriptJson,
      });
      return;
    }

    form.resetFields();
  }, [editingLesson, form, isOpen]);

  const normalizeTranscript = (value?: string) => {
    if (!value) return undefined;

    const trimmed = value.trim();
    if (!trimmed) return undefined;

    try {
      return JSON.stringify(JSON.parse(trimmed), null, 2);
    } catch {
      return trimmed;
    }
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      onSave({
        ...values,
        transcriptJson: normalizeTranscript(values.transcriptJson),
      });
    });
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      title={editingLesson ? 'Sửa bài nghe' : 'Thêm bài học nghe'}
      centered
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="title"
          label="Tiêu đề"
          rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
        >
          <Input placeholder="Nhập tiêu đề bài nghe..." />
        </Form.Item>

        <Form.Item
          name="description"
          label="Mô tả"
          rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
        >
          <Input.TextArea rows={2} placeholder="Nhập mô tả..." />
        </Form.Item>

        <Form.Item
          name="audioUrl"
          label="Đường dẫn âm thanh"
          rules={[{ required: true, message: 'Vui lòng nhập đường dẫn âm thanh' }]}
        >
          <Input placeholder="https://..." />
        </Form.Item>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="level"
            label="Cấp độ"
            initialValue="A1"
          >
            <Select options={LEVEL_OPTIONS} />
          </Form.Item>

          <Form.Item
            name="topic"
            label="Chủ đề"
            initialValue="Du lịch"
          >
            <Select options={TOPIC_OPTIONS} />
          </Form.Item>
        </div>

        <Form.Item
          name="duration"
          label="Thời lượng (giây)"
          initialValue={60}
        >
          <InputNumber min={1} className="w-full" />
        </Form.Item>

        <Form.Item
          name="transcriptJson"
          label="Lời thoại"
        >
          <Input.TextArea rows={4} placeholder='Nhập JSON mảng lời thoại hoặc text thô...'
          />
        </Form.Item>
        <p className="-mt-2 text-xs text-on-surface-variant">
          Nếu nhập JSON, hệ thống sẽ tự định dạng lại trước khi lưu.
        </p>

        <Form.Item className="mb-0 pt-4">
          <div className="flex items-center justify-end gap-3">
            <Button onClick={onClose}>
              Hủy
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              {editingLesson ? 'Lưu' : 'Thêm'}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddLessonModal;
