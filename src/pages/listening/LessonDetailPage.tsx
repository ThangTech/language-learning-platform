import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Input, message, Progress, Radio, Tag } from 'antd';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  EditOutlined,
  FormOutlined,
  SoundOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import AudioPlayer from '../../components/listening/AudioPlayer';
import LessonDetailHeader from '../../components/listening/LessonDetailHeader';
import { getDictationSets, getLessonById, submitListeningResult } from '../../services/listening';
import { getQuizzesByLesson, submitQuiz } from '../../services/quiz';
import type { DictationSetDto, DictationSentenceDto, ListeningLessonDto } from '../../interfaces/listening';
import type { QuizDto } from '../../interfaces/quiz';

interface TranscriptLine {
  time: string;
  speaker: string;
  text: string;
}

const parseTranscript = (value?: string) => {
  if (!value) return [] as TranscriptLine[];

  try {
    return JSON.parse(value) as TranscriptLine[];
  } catch {
    return [] as TranscriptLine[];
  }
};

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

  const correct = expectedWords.filter((word, index) => answerWords[index] === word).length;
  return Math.round((correct / expectedWords.length) * 100);
};

const buildHint = (sentence: string, visibleWords: number) => {
  const words = sentence.split(/\s+/).filter(Boolean);
  if (visibleWords <= 0) return 'Nhấn gợi ý để mở dần đáp án.';
  if (visibleWords >= words.length) return sentence;
  return `${words.slice(0, visibleWords).join(' ')} ...`;
};

const getLevelColor = (level?: string) => {
  if (level === 'A1' || level === 'A2') return 'bg-primary-fixed text-on-primary-fixed';
  return 'bg-secondary-fixed text-on-secondary-container';
};

const LessonDetailPage = () => {
  const { id } = useParams();
  const [lesson, setLesson] = useState<ListeningLessonDto | null>(null);
  const [dictationSet, setDictationSet] = useState<DictationSetDto | null>(null);
  const [quizzes, setQuizzes] = useState<QuizDto[]>([]);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [quizLoading, setQuizLoading] = useState(false);
  const [dictationAnswers, setDictationAnswers] = useState<Record<string, string>>({});
  const [dictationScores, setDictationScores] = useState<Record<string, number>>({});
  const [hintWordCounts, setHintWordCounts] = useState<Record<string, number>>({});
  const [dictationSaved, setDictationSaved] = useState(false);
  const [savingDictation, setSavingDictation] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!id) return;

      try {
        const [lessonRes, dictationRes, quizRes] = await Promise.all([
          getLessonById(id),
          getDictationSets(),
          getQuizzesByLesson(id),
        ]);

        if (lessonRes.success && lessonRes.data) {
          setLesson(lessonRes.data);
        } else {
          message.error(lessonRes.message || 'Không thể tải bài nghe');
        }

        if (dictationRes.success && dictationRes.data) {
          setDictationSet(dictationRes.data.find((item) => item.lessonId === id) ?? null);
        }

        if (quizRes.success && quizRes.data) {
          setQuizzes(quizRes.data);
        }
      } catch (error: any) {
        message.error(error?.response?.data?.message || 'Lỗi kết nối');
      }
    };

    void load();
  }, [id]);

  const transcriptLines = useMemo(() => parseTranscript(lesson?.transcriptJson), [lesson?.transcriptJson]);
  const quiz = quizzes[0] ?? null;
  const dictationItems = useMemo(
    () => [...(dictationSet?.sentences ?? [])].sort((a, b) => a.orderIndex - b.orderIndex),
    [dictationSet?.sentences]
  );
  const lessonDuration = lesson ? `${Math.floor(lesson.duration / 60)}:${(lesson.duration % 60).toString().padStart(2, '0')}` : '0:00';
  const isPartOne = lesson?.title.toLowerCase().includes('part 1');

  const answeredQuizCount = quiz?.questions.filter((question) => quizAnswers[question.id]).length ?? 0;
  const checkedDictationCount = dictationItems.filter((item) => dictationScores[item.id] !== undefined).length;
  const dictationAverage = dictationItems.length > 0
    ? Math.round(dictationItems.reduce((total, item) => total + (dictationScores[item.id] ?? 0), 0) / dictationItems.length)
    : 0;

  const handleSubmitQuiz = async () => {
    if (!quiz) return;

    const unanswered = quiz.questions.filter((question) => !quizAnswers[question.id]);
    if (unanswered.length > 0) {
      message.warning('Bạn cần chọn đáp án cho tất cả câu hỏi trước khi nộp bài.');
      return;
    }

    setQuizLoading(true);
    try {
      const answers = Object.entries(quizAnswers).map(([questionId, answer]) => ({ questionId, answer }));
      const result = await submitQuiz(quiz.id, answers);

      if (result.success && result.data) {
        setQuizScore(result.data.score);
        setQuizSubmitted(true);
        message.success(`Đã nộp bài nghe. Điểm: ${result.data.score}/100`);
      } else {
        message.error(result.message || 'Không thể nộp bài nghe');
      }
    } catch (error: any) {
      message.error(error?.response?.data?.message || 'Không thể nộp bài nghe');
    } finally {
      setQuizLoading(false);
    }
  };

  const handleCheckDictation = (item: DictationSentenceDto) => {
    const answer = dictationAnswers[item.id] || '';
    if (!answer.trim()) {
      message.warning('Hãy nhập nội dung bạn nghe được trước khi chấm điểm.');
      return;
    }

    setDictationScores((prev) => ({
      ...prev,
      [item.id]: scoreDictation(answer, item.sentence),
    }));
  };

  const handleSaveDictation = async () => {
    if (!dictationSet?.lessonId) return;
    if (checkedDictationCount < dictationItems.length) {
      message.warning('Bạn cần chấm tất cả câu chép chính tả trước khi lưu kết quả.');
      return;
    }

    setSavingDictation(true);
    try {
      const result = await submitListeningResult(dictationSet.lessonId, dictationAverage);
      if (result.success) {
        setDictationSaved(true);
        message.success(`Đã lưu điểm chép chính tả: ${dictationAverage}/100`);
      } else {
        message.error(result.message || 'Không thể lưu kết quả chép chính tả');
      }
    } catch (error: any) {
      message.error(error?.response?.data?.message || 'Không thể lưu kết quả chép chính tả');
    } finally {
      setSavingDictation(false);
    }
  };

  if (!lesson) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center text-on-surface-variant">
        Đang tải bài nghe...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <nav className="flex items-center gap-2 text-sm text-on-surface-variant mb-8">
        <Link to="/listening" className="hover:text-primary transition-colors no-underline">Luyện nghe</Link>
        <span className="material-symbols-outlined text-[1rem]">chevron_right</span>
        <span className="text-on-surface font-medium">{lesson.title}</span>
      </nav>

      <div className="flex flex-col gap-8">
        <LessonDetailHeader
          level={lesson.level}
          levelColor={getLevelColor(lesson.level)}
          topicIcon={lesson.topicIcon}
          topic={lesson.topic}
          duration={lessonDuration}
          title={lesson.title}
          description={lesson.description}
        />

        {!isPartOne && (
          <AudioPlayer title={lesson.audioTitle} totalDuration={lesson.totalDuration} src={lesson.audioUrl || undefined} />
        )}

        <section className="rounded-[1.5rem] border border-outline-variant/10 bg-surface-container-lowest p-6">
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
              <div className="rounded-full bg-primary/10 px-4 py-2 font-headline text-sm font-bold text-primary">
                Điểm quiz: {quizScore}/100
              </div>
            )}
          </div>

          {!quiz || quiz.questions.length === 0 ? (
            <div className="rounded-xl bg-surface-container-low p-6 text-sm text-on-surface-variant">
              Chưa có câu hỏi cho phần nghe này.
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              <Progress percent={Math.round((answeredQuizCount / quiz.questions.length) * 100)} showInfo={false} />
              {quiz.questions.map((question, index) => (
                <div key={question.id} className="rounded-2xl border border-outline-variant/10 bg-surface-container-low p-5">
                  <div className="mb-4 flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-headline text-base font-bold text-on-surface">
                        Question {index + 1}. {question.questionText}
                      </h3>
                      <Tag color={quizAnswers[question.id] ? 'green' : 'default'}>
                        {quizAnswers[question.id] ? 'Đã chọn' : 'Chưa chọn'}
                      </Tag>
                    </div>
                    {question.audioUrl && (
                      <AudioPlayer title={`Audio for question ${index + 1}`} totalDuration={undefined} src={question.audioUrl} />
                    )}
                  </div>

                  <Radio.Group
                    value={quizAnswers[question.id]}
                    disabled={quizSubmitted}
                    onChange={(event) => {
                      setQuizAnswers((prev) => ({ ...prev, [question.id]: event.target.value }));
                    }}
                    className="grid gap-3"
                  >
                    {question.options.map((option, optionIndex) => (
                      <Radio key={option} value={option} className="rounded-xl bg-surface-container-lowest px-4 py-3 text-sm">
                        {String.fromCharCode(65 + optionIndex)}. {option}
                      </Radio>
                    ))}
                  </Radio.Group>
                </div>
              ))}

              <Button
                type="primary"
                size="large"
                loading={quizLoading}
                disabled={quizSubmitted}
                onClick={() => { void handleSubmitQuiz(); }}
                className="self-end rounded-full px-8 font-headline font-bold"
              >
                {quizSubmitted ? 'Đã nộp bài' : 'Nộp bài nghe'}
              </Button>
            </div>
          )}
        </section>

        <section className="rounded-[1.5rem] border border-outline-variant/10 bg-surface-container-lowest p-6">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="flex items-center gap-2 font-headline text-2xl font-extrabold text-on-surface">
                <EditOutlined className="text-primary" />
                Chép chính tả
              </h2>
              <p className="mt-1 text-sm text-on-surface-variant">
                Câu gốc được ẩn. Nhập nội dung nghe được, chấm điểm, hoặc mở gợi ý dần khi cần.
              </p>
            </div>
            <div className="rounded-full bg-secondary/10 px-4 py-2 font-headline text-sm font-bold text-secondary">
              {checkedDictationCount}/{dictationItems.length} câu đã chấm
            </div>
          </div>

          {dictationItems.length === 0 ? (
            <div className="rounded-xl bg-surface-container-low p-6 text-sm text-on-surface-variant">
              Chưa có bài chép chính tả cho phần nghe này.
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {dictationItems.map((item, index) => {
                const score = dictationScores[item.id];
                const hintWords = hintWordCounts[item.id] ?? 0;

                return (
                  <div key={item.id} className="rounded-2xl border border-outline-variant/10 bg-surface-container-low p-5">
                    <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wide text-on-surface-variant">
                          Dictation {index + 1}
                        </p>
                        <h3 className="mt-1 font-headline text-base font-bold text-on-surface">
                          Listen and type what you hear
                        </h3>
                      </div>
                      {score !== undefined && (
                        <Tag color={score >= 80 ? 'green' : score >= 50 ? 'orange' : 'red'}>
                          {score}% chính xác
                        </Tag>
                      )}
                    </div>

                    <AudioPlayer title={item.audioTitle || `Dictation ${index + 1}`} totalDuration={item.duration} src={item.audioUrl || lesson.audioUrl || undefined} />

                    <div className="mt-4 rounded-xl border border-tertiary/15 bg-tertiary/5 p-4 text-sm text-on-surface">
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <span className="font-headline font-bold text-tertiary">Gợi ý</span>
                        <Button
                          size="small"
                          onClick={() => {
                            setHintWordCounts((prev) => ({ ...prev, [item.id]: Math.min((prev[item.id] ?? 0) + 4, item.sentence.split(/\s+/).length) }));
                          }}
                        >
                          Mở thêm
                        </Button>
                      </div>
                      {buildHint(item.sentence, hintWords)}
                    </div>

                    <Input.TextArea
                      rows={4}
                      value={dictationAnswers[item.id] || ''}
                      disabled={score !== undefined}
                      onChange={(event) => {
                        setDictationAnswers((prev) => ({ ...prev, [item.id]: event.target.value }));
                      }}
                      placeholder="Gõ lại nội dung bạn nghe được..."
                      className="mt-4"
                    />

                    <div className="mt-4 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                        <SoundOutlined />
                        Có thể nghe lại nhiều lần trước khi chấm.
                      </div>
                      <Button
                        type="primary"
                        disabled={score !== undefined}
                        onClick={() => handleCheckDictation(item)}
                        className="rounded-full font-headline font-bold"
                      >
                        {score !== undefined ? 'Đã chấm' : 'Tính điểm'}
                      </Button>
                    </div>
                  </div>
                );
              })}

              <div className="flex flex-col gap-3 rounded-2xl bg-primary/5 p-5 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-3">
                  {dictationSaved ? <CheckCircleOutlined className="text-2xl text-primary" /> : <TrophyOutlined className="text-2xl text-primary" />}
                  <div>
                    <p className="font-headline font-bold text-on-surface">Điểm chép chính tả: {dictationAverage}/100</p>
                    <p className="text-xs text-on-surface-variant">Điểm trung bình từ các câu đã chấm.</p>
                  </div>
                </div>
                <Button
                  type="primary"
                  loading={savingDictation}
                  disabled={dictationSaved || checkedDictationCount < dictationItems.length}
                  onClick={() => { void handleSaveDictation(); }}
                  className="rounded-full font-headline font-bold"
                >
                  {dictationSaved ? 'Đã lưu kết quả' : 'Lưu kết quả'}
                </Button>
              </div>
            </div>
          )}
        </section>

        {transcriptLines.length > 0 && (
          <div className="rounded-xl border border-outline-variant/10 bg-surface-container-low p-4 text-xs text-on-surface-variant">
            <ClockCircleOutlined className="mr-2" />
            Transcript đang được dùng làm đáp án ẩn cho phần chép chính tả và không hiển thị trong lúc làm bài.
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonDetailPage;
