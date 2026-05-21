import { useEffect } from 'react';
import { Button, Form, Input, Modal, Select } from 'antd';
import type { CreateQuizQuestionRequest } from '../../interfaces/quiz';

const QUESTION_TYPES = [
  { value: 'MultipleChoice', label: 'Trắc nghiệm' },
  { value: 'TrueFalse', label: 'Đúng/Sai' },
  { value: 'Matching', label: 'Nối' },
];

interface QuizQuestionsModalProps {
  isOpen: boolean;
  loading?: boolean;
  onClose: () => void;
  onSave: (questions: CreateQuizQuestionRequest[]) => void;
}

const QuizQuestionsModal = ({ isOpen, loading = false, onClose, onSave }: QuizQuestionsModalProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
  }, [form, isOpen]);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      onSave(values.questions || []);
    });
  };

  return (
    <Modal open={isOpen} onCancel={onClose} footer={null} title="Thêm câu hỏi quiz" centered destroyOnClose width={720}>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          questions: [
            {
              questionText: '',
              type: 'MultipleChoice',
              options: ['', '', '', ''],
              correctAnswer: '',
              explanation: '',
              audioUrl: '',
            },
          ],
        }}
        onFinish={handleSubmit}
      >
        <Form.List name="questions">
          {(fields, { add, remove }) => (
            <div className="flex flex-col gap-5">
              {fields.map((field, index) => (
                <div key={field.key} className="rounded-2xl border border-outline-variant/10 bg-surface-container-low p-4">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <p className="font-headline font-bold text-on-surface">Câu hỏi {index + 1}</p>
                    <Button size="small" onClick={() => remove(field.name)}>
                      Xóa câu hỏi
                    </Button>
                  </div>

                  <Form.Item
                    name={[field.name, 'questionText']}
                    label="Nội dung câu hỏi"
                    rules={[{ required: true, message: 'Vui lòng nhập nội dung câu hỏi' }]}
                  >
                    <Input.TextArea rows={2} placeholder="Nhập câu hỏi..." />
                  </Form.Item>

                  <div className="grid grid-cols-2 gap-4">
                    <Form.Item name={[field.name, 'type']} label="Loại câu hỏi">
                      <Select options={QUESTION_TYPES} />
                    </Form.Item>

                    <Form.Item
                      name={[field.name, 'correctAnswer']}
                      label="Đáp án đúng"
                      rules={[{ required: true, message: 'Vui lòng nhập đáp án đúng' }]}
                    >
                      <Input placeholder="Nhập đáp án đúng..." />
                    </Form.Item>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Form.Item name={[field.name, 'options', 0]} label="Lựa chọn 1">
                      <Input placeholder="Lựa chọn 1" />
                    </Form.Item>
                    <Form.Item name={[field.name, 'options', 1]} label="Lựa chọn 2">
                      <Input placeholder="Lựa chọn 2" />
                    </Form.Item>
                    <Form.Item name={[field.name, 'options', 2]} label="Lựa chọn 3">
                      <Input placeholder="Lựa chọn 3" />
                    </Form.Item>
                    <Form.Item name={[field.name, 'options', 3]} label="Lựa chọn 4">
                      <Input placeholder="Lựa chọn 4" />
                    </Form.Item>
                  </div>

                  <Form.Item name={[field.name, 'explanation']} label="Giải thích">
                    <Input.TextArea rows={2} placeholder="Giải thích đáp án..." />
                  </Form.Item>

                  <Form.Item name={[field.name, 'audioUrl']} label="Audio URL">
                    <Input placeholder="URL audio nếu có" />
                  </Form.Item>
                </div>
              ))}

              <Button
                onClick={() => add({ questionText: '', type: 'MultipleChoice', options: ['', '', '', ''], correctAnswer: '', explanation: '', audioUrl: '' })}
                className="w-full"
              >
                Thêm câu hỏi
              </Button>
            </div>
          )}
        </Form.List>

        <Form.Item className="mb-0 pt-5">
          <div className="flex items-center justify-end gap-3">
            <Button onClick={onClose}>Hủy</Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              Lưu câu hỏi
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default QuizQuestionsModal;
