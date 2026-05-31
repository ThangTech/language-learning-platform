import { useState } from 'react';
import { Button, message, Progress, Radio, Tag } from 'antd';
import {
  CheckCircleFilled,
  CloseCircleFilled,
  FormOutlined,
} from '@ant-design/icons';
import { submitQuiz } from '../../services/quiz';
import type { QuizAnswerResultDto, QuizQuestionDto } from '../../interfaces/quiz';

interface VstepQuizSectionProps {
  quizId: string;
  questions: QuizQuestionDto[];
}

const VstepQuizSection = ({ quizId, questions }: VstepQuizSectionProps) => {
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizResults, setQuizResults] = useState<QuizAnswerResultDto[]>([]);

  const answeredCount = questions.filter((q) => quizAnswers[q.id]).length;

  const getResult = (questionId: string) =>
    quizResults.find((r) => r.questionId === questionId);

  const handleSubmit = async () => {
    const unanswered = questions.filter((q) => !quizAnswers[q.id]);
    if (unanswered.length > 0) {
      message.warning('Bạn cần chọn đáp án cho tất cả câu hỏi trước khi nộp bài.');
      return;
    }

    setQuizLoading(true);
    try {
      const answers = Object.entries(quizAnswers).map(
        ([questionId, answer]) => ({ questionId, answer })
      );
      const result = await submitQuiz(quizId, answers);

      if (result.success && result.data) {
        setQuizScore(result.data.score);
        setQuizSubmitted(true);
        setQuizResults(result.data.answers);
        if (result.data.score === 100) {
          message.success('Xuất sắc! Bạn đã trả lời đúng tất cả câu hỏi!');
        } else {
          message.info(`Điểm của bạn: ${result.data.score}/100. Xem lại đáp án sai bên dưới.`);
        }
      } else {
        message.error(result.message || 'Không thể nộp bài nghe');
      }
    } catch (error: any) {
      message.error(error?.response?.data?.message || 'Không thể nộp bài nghe');
    } finally {
      setQuizLoading(false);
    }
  };

  const handleRetry = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(null);
    setQuizResults([]);
  };

  const allCorrect = quizScore === 100;

  return (
    <section className="rounded-[1.5rem] border border-outline-variant/10 bg-surface-container-lowest p-6 mb-8">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="flex items-center gap-2 font-headline text-2xl font-extrabold text-on-surface">
            <FormOutlined className="text-primary" />
            Bài nghe và câu hỏi
          </h2>
          <p className="mt-1 text-sm text-on-surface-variant">
            Nghe audio, chọn đáp án, rồi nộp bài để tính điểm.
          </p>
        </div>
        {quizScore !== null && (
          <div
            className={`rounded-full px-4 py-2 font-headline text-sm font-bold ${
              allCorrect
                ? 'bg-green-50 text-green-700'
                : 'bg-red-50 text-red-700'
            }`}
          >
            Điểm: {quizScore}/100
          </div>
        )}
      </div>

      {questions.length === 0 ? (
        <div className="rounded-xl bg-surface-container-low p-6 text-sm text-on-surface-variant">
          Chưa có câu hỏi cho phần nghe này.
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          <Progress
            percent={Math.round((answeredCount / questions.length) * 100)}
            showInfo={false}
          />
          {questions.map((question, index) => {
            const result = getResult(question.id);
            const isCorrect = result?.isCorrect;
            const selected = quizAnswers[question.id];

            return (
              <div
                key={question.id}
                className={`rounded-2xl border bg-surface-container-low p-5 ${
                  quizSubmitted
                    ? isCorrect
                      ? 'border-green-300'
                      : 'border-red-300'
                    : 'border-outline-variant/10'
                }`}
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h3 className="font-headline text-base font-bold text-on-surface">
                    Question {index + 1}. {question.questionText}
                  </h3>
                  {!quizSubmitted && (
                    <Tag color={quizAnswers[question.id] ? 'green' : 'default'}>
                      {quizAnswers[question.id] ? 'Đã chọn' : 'Chưa chọn'}
                    </Tag>
                  )}
                  {quizSubmitted && isCorrect && (
                    <Tag
                      icon={<CheckCircleFilled />}
                      color="success"
                    >
                      Đúng
                    </Tag>
                  )}
                  {quizSubmitted && !isCorrect && (
                    <Tag
                      icon={<CloseCircleFilled />}
                      color="error"
                    >
                      Sai
                    </Tag>
                  )}
                </div>

                <Radio.Group
                  value={quizAnswers[question.id]}
                  disabled={quizSubmitted}
                  onChange={(event) => {
                    setQuizAnswers((prev) => ({
                      ...prev,
                      [question.id]: event.target.value,
                    }));
                  }}
                  className="flex flex-col gap-3"
                >
                  {question.options.map((option, optionIndex) => {
                    const isSelected = selected === option;
                    const isCorrectOption = option === question.correctAnswer;
                    let optionClass =
                      'rounded-xl bg-surface-container-lowest px-4 py-3 text-sm';

                    if (quizSubmitted) {
                      if (isCorrectOption && isSelected) {
                        optionClass += ' border-2 border-green-500 bg-green-50 text-green-800';
                      } else if (isCorrectOption) {
                        optionClass += ' border-2 border-green-500 bg-green-50 text-green-800';
                      } else if (isSelected && !isCorrectOption) {
                        optionClass += ' border-2 border-red-500 bg-red-50 text-red-800';
                      }
                    }

                    return (
                      <Radio key={option} value={option} className={optionClass}>
                        {String.fromCharCode(65 + optionIndex)}. {option}
                      </Radio>
                    );
                  })}
                </Radio.Group>
              </div>
            );
          })}

          <div className="flex justify-end gap-3">
            {quizSubmitted && !allCorrect && (
              <Button
                size="large"
                onClick={handleRetry}
                className="rounded-full px-8 font-headline font-bold"
              >
                Làm lại
              </Button>
            )}
            {!quizSubmitted && (
              <Button
                type="primary"
                size="large"
                loading={quizLoading}
                onClick={() => void handleSubmit()}
                className="rounded-full px-8 font-headline font-bold"
              >
                Nộp bài nghe
              </Button>
            )}
            {quizSubmitted && allCorrect && (
              <Button
                type="primary"
                size="large"
                disabled
                className="rounded-full px-8 font-headline font-bold"
              >
                Hoàn thành
              </Button>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default VstepQuizSection;
