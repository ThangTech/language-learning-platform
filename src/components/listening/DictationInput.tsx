import { useState } from 'react';
import { Button, Form, Input } from 'antd';

interface DictationInputProps {
  expectedText?: string;
  onSubmit?: (text: string) => void;
  onCheck?: (text: string) => void;
  showResult?: boolean;
}

interface WordResult {
  word: string;
  correct: boolean;
}

interface DictationFormValues {
  answer: string;
}

const DictationInput = ({
  expectedText = '',
  onSubmit,
  onCheck,
  showResult: externalShowResult,
}: DictationInputProps) => {
  const [form] = Form.useForm<DictationFormValues>();
  const [showResult, setShowResult] = useState(false);
  const [wordResults, setWordResults] = useState<WordResult[]>([]);

  const checkAnswer = (values: DictationFormValues) => {
    const inputWords = values.answer.trim().toLowerCase().replace(/[.,!?]/g, '').split(/\s+/);
    const expectedWords = expectedText.toLowerCase().replace(/[.,!?]/g, '').split(/\s+/);

    const results: WordResult[] = expectedWords.map((word, i) => ({
      word,
      correct: inputWords[i] === word,
    }));

    setWordResults(results);
    setShowResult(true);
    onCheck?.(values.answer);
  };

  const handleSubmit = (values: DictationFormValues) => {
    onSubmit?.(values.answer);
  };

  const correctCount = wordResults.filter((w) => w.correct).length;
  const totalCount = wordResults.length;
  const score = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;

  const isResultShown = externalShowResult !== undefined ? externalShowResult : showResult;

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-surface-container-low rounded-[1.5rem] p-6 border border-outline-variant/20">
        <label className="block font-headline font-semibold text-on-surface mb-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[1.2rem]" style={{ fontVariationSettings: "'FILL' 1" }}>edit_note</span>
          Nhập nội dung bạn nghe được thật chính xác
        </label>

        <Form form={form} layout="vertical" requiredMark={false} onFinish={checkAnswer}>
          <Form.Item name="answer" className="mb-0">
            <Input.TextArea
              placeholder="Gõ lại nội dung bạn nghe được..."
              disabled={isResultShown}
              rows={5}
              className={`w-full h-32 p-4 rounded-xl border-2 outline-none resize-none font-body text-base transition-all
                ${isResultShown
                  ? 'bg-surface-container border-outline-variant/30 text-on-surface-variant cursor-not-allowed'
                  : 'bg-surface-container-lowest border-outline focus:border-primary'
                }`}
            />
          </Form.Item>

          <p className="text-xs text-on-surface-variant mt-2 text-right">
            {(form.getFieldValue('answer') || '').trim().split(/\s+/).filter(Boolean).length} từ
          </p>

          {!isResultShown && (
            <div className="flex gap-3 mt-4">
              <Button
                htmlType="submit"
                disabled={!form.getFieldValue('answer')?.trim()}
                className="flex-1 bg-primary text-on-primary px-6 py-3 rounded-full font-headline font-bold text-sm hover:opacity-90 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[1.1rem]">spellcheck</span>
                Kiểm tra
              </Button>
              <Button
                onClick={() => {
                  const value = form.getFieldValue('answer') || '';
                  onSubmit?.(value);
                }}
                disabled={!form.getFieldValue('answer')?.trim()}
                className="px-6 py-3 rounded-full border border-primary text-primary font-headline font-bold text-sm hover:bg-primary/5 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[1.1rem]">send</span>
                Nộp bài
              </Button>
            </div>
          )}
        </Form>
      </div>

      {isResultShown && wordResults.length > 0 && (
        <div className="bg-surface-container-low rounded-[1.5rem] p-6 border border-outline-variant/20">
          <div className={`flex items-center justify-between p-4 rounded-xl mb-4 ${
            score >= 80 ? 'bg-secondary/10 border border-secondary/20' :
            score >= 50 ? 'bg-tertiary/10 border border-tertiary/20' :
            'bg-error/10 border border-error/20'
          }`}>
            <div className="flex items-center gap-3">
              <span className={`material-symbols-outlined text-[2rem] ${
                score >= 80 ? 'text-secondary' : score >= 50 ? 'text-tertiary' : 'text-error'
              }`} style={{ fontVariationSettings: "'FILL' 1" }}>
                {score >= 80 ? 'emoji_events' : score >= 50 ? 'sentiment_neutral' : 'sentiment_dissatisfied'}
              </span>
              <div>
                <p className="font-headline font-bold text-on-surface text-lg">{score}% chính xác</p>
                <p className="text-on-surface-variant text-sm">{correctCount}/{totalCount} từ đúng</p>
              </div>
            </div>
            <Button
              onClick={() => {
                form.resetFields();
                setShowResult(false);
                setWordResults([]);
              }}
              className="px-4 py-2 rounded-full border border-outline-variant text-on-surface-variant text-sm hover:bg-surface-container transition-colors"
            >
              Thử lại
            </Button>
          </div>

          <div>
            <p className="font-headline font-semibold text-sm text-on-surface-variant mb-3 uppercase tracking-wide">Đáp án đúng:</p>
            <div className="flex flex-wrap gap-2">
              {wordResults.map((result, i) => (
                <span
                  key={i}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                    result.correct
                      ? 'bg-secondary/15 text-secondary border border-secondary/20'
                      : 'bg-error/15 text-error border border-error/20'
                  }`}
                >
                  {result.word}
                  <span className="ml-1 text-[0.7rem] opacity-70">
                    {result.correct ? '✓' : '✗'}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DictationInput;
