import { useState } from 'react';
import { Button, Input, message, Tag } from 'antd';
import {
  CheckCircleOutlined,
  EditOutlined,
  EyeOutlined,
  SoundOutlined,
} from '@ant-design/icons';
import type { QuizQuestionDto } from '../../interfaces/quiz';

interface VstepDictationSectionProps {
  questions: QuizQuestionDto[];
}

const normalizeText = (value: string) =>
  value
    .toLowerCase()
    .replace(/[.,!?;:'"]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

const scoreDictation = (answer: string, expected: string) => {
  const answerWords = normalizeText(answer).split(' ').filter(Boolean);
  const expectedWords = normalizeText(expected).split(' ').filter(Boolean);

  if (expectedWords.length === 0) return 0;

  const correct = expectedWords.filter(
    (word, index) => answerWords[index] === word
  ).length;
  return Math.round((correct / expectedWords.length) * 100);
};

const buildHint = (sentence: string, visibleWords: number) => {
  const words = sentence.split(/\s+/).filter(Boolean);
  if (visibleWords <= 0) return 'Nhấn "Mở thêm" để hiện dần đáp án.';
  if (visibleWords >= words.length) return sentence;
  return `${words.slice(0, visibleWords).join(' ')} ...`;
};

const VstepDictationSection = ({ questions }: VstepDictationSectionProps) => {
  const [dictationAnswers, setDictationAnswers] = useState<
    Record<string, string>
  >({});
  const [dictationScores, setDictationScores] = useState<
    Record<string, number>
  >({});
  const [hintWordCounts, setHintWordCounts] = useState<
    Record<string, number>
  >({});
  const [dictationSaved, setDictationSaved] = useState(false);

  const checkedCount = questions.filter(
    (q) => dictationScores[q.id] !== undefined
  ).length;

  const averageScore =
    questions.length > 0
      ? Math.round(
          questions.reduce(
            (sum, q) => sum + (dictationScores[q.id] ?? 0),
            0
          ) / questions.length
        )
      : 0;

  const isFullScore =
    questions.length > 0 &&
    questions.every((q) => dictationScores[q.id] === 100);

  const handleCheck = (questionId: string) => {
    const answer = dictationAnswers[questionId] || '';
    if (!answer.trim()) {
      message.warning('Hãy nhập nội dung bạn nghe được trước khi chấm điểm.');
      return;
    }

    const question = questions.find((q) => q.id === questionId);
    if (!question) return;

    setDictationScores((prev) => ({
      ...prev,
      [questionId]: scoreDictation(answer, question.correctAnswer),
    }));
  };

  const handleRetry = (questionId: string) => {
    setDictationScores((prev) => {
      const next = { ...prev };
      delete next[questionId];
      return next;
    });
  };

  const handleSave = () => {
    if (checkedCount < questions.length) {
      message.warning('Bạn cần chấm tất cả câu trước khi lưu kết quả.');
      return;
    }
    setDictationSaved(true);
    if (isFullScore) {
      message.success('Hoàn hảo! Bạn đã chép chính tả đúng tất cả!');
    } else {
      message.success(`Đã lưu điểm chép chính tả: ${averageScore}/100`);
    }
  };

  return (
    <section className="rounded-[1.5rem] border border-outline-variant/10 bg-surface-container-lowest p-6">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="flex items-center gap-2 font-headline text-2xl font-extrabold text-on-surface">
            <EditOutlined className="text-primary" />
            Chép chính tả
          </h2>
          <p className="mt-1 text-sm text-on-surface-variant">
            Nghe audio ở trên, gõ lại nội dung bạn nghe được. Dùng nút gợi ý để mở dần đáp án.
          </p>
        </div>
        <div className="rounded-full bg-secondary/10 px-4 py-2 font-headline text-sm font-bold text-secondary">
          {checkedCount}/{questions.length} câu đã chấm
        </div>
      </div>

      {questions.length === 0 ? (
        <div className="rounded-xl bg-surface-container-low p-6 text-sm text-on-surface-variant">
          Chưa có dữ liệu chép chính tả.
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {questions.map((question, index) => {
            const score = dictationScores[question.id];
            const hintWords = hintWordCounts[question.id] ?? 0;
            const totalWords = question.correctAnswer
              .split(/\s+/)
              .filter(Boolean).length;
            const isFull = score === 100;

            return (
              <div
                key={question.id}
                className={`rounded-2xl border bg-surface-container-low p-5 ${
                  score !== undefined
                    ? isFull
                      ? 'border-green-300'
                      : 'border-red-300'
                    : 'border-outline-variant/10'
                }`}
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-on-surface-variant">
                      Dictation {index + 1}
                    </p>
                    <h3 className="mt-1 font-headline text-base font-bold text-on-surface">
                      {question.questionText}
                    </h3>
                  </div>
                  {score !== undefined && (
                    <Tag
                      color={isFull ? 'success' : 'error'}
                      icon={isFull ? <CheckCircleOutlined /> : undefined}
                    >
                      {score}% {isFull ? 'Hoàn hảo' : 'Chưa đúng'}
                    </Tag>
                  )}
                </div>

                <p className="mb-2 text-xs text-on-surface-variant">
                  <SoundOutlined className="mr-1" />
                  Nghe audio ở trên và gõ lại nội dung.
                </p>

                {score === undefined && (
                  <div className="mb-4 rounded-xl border border-tertiary/15 bg-tertiary/5 p-4">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <span className="flex items-center gap-1 font-headline text-xs font-bold text-tertiary">
                        <EyeOutlined />
                        Gợi ý
                      </span>
                      <Button
                        size="small"
                        disabled={hintWords >= totalWords}
                        onClick={() => {
                          setHintWordCounts((prev) => ({
                            ...prev,
                            [question.id]: Math.min(
                              (prev[question.id] ?? 0) + 3,
                              totalWords
                            ),
                          }));
                        }}
                      >
                        Mở thêm
                      </Button>
                    </div>
                    <p className="text-sm italic text-on-surface">
                      {buildHint(question.correctAnswer, hintWords)}
                    </p>
                  </div>
                )}

                {isFull && (
                  <div className="mb-4 rounded-xl bg-green-50 p-4 text-sm text-green-700">
                    <CheckCircleOutlined className="mr-1" />
                    Đáp án đúng: <strong>{question.correctAnswer}</strong>
                  </div>
                )}

                <Input.TextArea
                  rows={3}
                  value={dictationAnswers[question.id] || ''}
                  disabled={score !== undefined && isFull}
                  onChange={(event) => {
                    setDictationAnswers((prev) => ({
                      ...prev,
                      [question.id]: event.target.value,
                    }));
                  }}
                  placeholder="Gõ lại nội dung bạn nghe được..."
                  className="mb-4"
                />

                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs text-on-surface-variant">
                    Có thể nghe lại nhiều lần trước khi chấm.
                  </span>
                  {score === undefined && (
                    <Button
                      type="primary"
                      onClick={() => handleCheck(question.id)}
                      className="rounded-full font-headline font-bold"
                    >
                      Tính điểm
                    </Button>
                  )}
                  {!isFull && score !== undefined && (
                    <Button
                      onClick={() => handleRetry(question.id)}
                      className="rounded-full font-headline font-bold"
                    >
                      Làm lại
                    </Button>
                  )}
                  {isFull && (
                    <Button
                      type="primary"
                      disabled
                      className="rounded-full font-headline font-bold"
                    >
                      Hoàn thành
                    </Button>
                  )}
                </div>
              </div>
            );
          })}

          <div
            className={`flex items-center justify-between rounded-2xl p-5 ${
              isFullScore ? 'bg-green-50' : 'bg-primary/5'
            }`}
          >
            <div className="flex items-center gap-3">
              {isFullScore ? (
                <CheckCircleOutlined className="text-2xl text-green-600" />
              ) : (
                <CheckCircleOutlined className="text-2xl text-primary" />
              )}
              <div>
                <p className="font-headline font-bold text-on-surface">
                  Điểm chép chính tả: {averageScore}/100
                </p>
                <p className="text-xs text-on-surface-variant">
                  {isFullScore
                    ? 'Tất cả câu đều đúng!'
                    : 'Điểm trung bình từ các câu đã chấm.'}
                </p>
              </div>
            </div>
            <Button
              type="primary"
              disabled={dictationSaved || checkedCount < questions.length}
              onClick={handleSave}
              className="rounded-full font-headline font-bold"
            >
              {dictationSaved
                ? isFullScore
                  ? 'Đã hoàn thành'
                  : 'Đã lưu kết quả'
                : isFullScore
                  ? 'Hoàn thành'
                  : 'Lưu kết quả'}
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default VstepDictationSection;
