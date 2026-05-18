import { useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import type { QuestionType } from '../../interfaces/listening';

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface QuizQuestionProps {
  question: string;
  type: QuestionType;
  options?: QuizOption[];
  blankText?: string;
  expectedAnswer?: string;
  selectedAnswer?: string;
  onAnswer: (answer: string) => void;
  showResult?: boolean;
}

interface QuizQuestionFormValues {
  answer: string;
}

const QuizQuestion = ({
  question,
  type,
  options,
  blankText,
  expectedAnswer,
  selectedAnswer,
  onAnswer,
  showResult,
}: QuizQuestionProps) => {
  const [form] = Form.useForm<QuizQuestionFormValues>();

  useEffect(() => {
    if (selectedAnswer !== undefined) {
      form.setFieldsValue({ answer: selectedAnswer });
    }
  }, [selectedAnswer, form, type]);

  let typeLabel = 'Suy luận';
  if (type === 'MULTIPLE_CHOICE') typeLabel = 'Trắc nghiệm';
  else if (type === 'FILL_IN_BLANK') typeLabel = 'Điền chỗ trống';
  else if (type === 'DICTATION') typeLabel = 'Chép chính tả';
  else if (type === 'MAIN_IDEA') typeLabel = 'Ý chính';

  let typeClass = 'bg-tertiary/10 text-tertiary';
  if (type === 'MULTIPLE_CHOICE') typeClass = 'bg-primary/10 text-primary';
  else if (type === 'FILL_IN_BLANK') typeClass = 'bg-secondary/10 text-secondary';

  const handleFinish = (values: QuizQuestionFormValues) => {
    onAnswer(values.answer);
  };

  const renderMultipleChoice = () => (
    <div className="space-y-3">
      {options?.map((opt) => {
        const isSelected = selectedAnswer === opt.id;
        const isCorrect = showResult && opt.isCorrect;
        const isWrong = showResult && isSelected && !opt.isCorrect;

        return (
          <button
            key={opt.id}
            onClick={() => onAnswer(opt.id)}
            className={`w-full p-4 rounded-xl text-left transition-all ${
              isCorrect
                ? 'bg-success/20 border-2 border-success text-success'
                : isWrong
                ? 'bg-error/20 border-2 border-error text-error'
                : isSelected
                ? 'bg-primary/10 border-2 border-primary'
                : 'bg-surface-container border-2 border-transparent hover:border-primary/30'
            }`}
          >
            {opt.text}
          </button>
        );
      })}
    </div>
  );

  const renderTextAnswer = (placeholder: string) => (
    <Form form={form} layout="vertical" requiredMark={false} onFinish={handleFinish}>
      <Form.Item name="answer" className="mb-0">
        <Input.TextArea
          placeholder={placeholder}
          rows={4}
          className="w-full p-4 bg-surface-container rounded-xl border-2 border-outline focus:border-primary outline-none resize-none"
        />
      </Form.Item>

      <div className="mt-4 flex flex-wrap gap-3">
        <Button type="primary" htmlType="submit">
          Kiểm tra
        </Button>
        <Button onClick={() => onAnswer(form.getFieldValue('answer') || '')}>
          Nộp bài
        </Button>
      </div>
    </Form>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${typeClass}`}>
          {typeLabel}
        </span>
      </div>

      <h3 className="text-xl font-medium text-on-surface">{question}</h3>

      {type === 'MULTIPLE_CHOICE' && renderMultipleChoice()}

      {type === 'FILL_IN_BLANK' && (
        <div>
          <p className="text-lg mb-4">{blankText?.replace('___', '______')}</p>
          {renderTextAnswer('Nhập đáp án...')}
          {showResult && (
            <p className="mt-2 text-success">Đáp án: {expectedAnswer}</p>
          )}
        </div>
      )}

      {type === 'DICTATION' && (
        <div>
          <p className="text-on-surface-variant mb-4">Nghe và đánh văn bản:</p>
          {renderTextAnswer('Nhập nội dung bạn nghe được...')}
          {showResult && (
            <div className="mt-4 p-4 bg-surface-container-high rounded-xl">
              <p className="text-success font-medium">Đáp án:</p>
              <p>{expectedAnswer}</p>
            </div>
          )}
        </div>
      )}

      {(type === 'MAIN_IDEA' || type === 'INFERENCE') && renderMultipleChoice()}
    </div>
  );
};

export default QuizQuestion;
