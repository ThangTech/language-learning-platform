import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button, message, Spin, Tag, Radio, Statistic } from 'antd';
import { 
  ArrowLeftOutlined, 
  CheckCircleOutlined, 
  PlayCircleOutlined, 
  TrophyOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';
import { getGrammarTopicById, markTopicCompleted, getUserGrammarProgress } from '../../services/grammar';
import { getMyQuizResults, getQuizzesByGrammar, submitQuiz } from '../../services/quiz';
import type { GrammarTopicDto } from '../../interfaces/grammar';
import type { QuizDto } from '../../interfaces/quiz';

const { Countdown } = Statistic;

const getLevelColor = (level: string) => {
  if (level === 'Beginner') return 'green';
  if (level === 'Intermediate') return 'blue';
  if (level === 'Advanced') return 'red';
  return 'default';
};

const getLevelText = (level: string) => {
  if (level === 'Beginner') return 'Cơ bản';
  if (level === 'Intermediate') return 'Trung cấp';
  if (level === 'Advanced') return 'Nâng cao';
  return level;
};

const getYouTubeEmbedUrl = (url?: string) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11
    ? `https://www.youtube.com/embed/${match[2]}`
    : null;
};

const GrammarDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [topic, setTopic] = useState<GrammarTopicDto | null>(null);
  const [quizzes, setQuizzes] = useState<QuizDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [isTopicCompleted, setIsTopicCompleted] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  // Quiz Gameplay State
  const [activeQuiz, setActiveQuiz] = useState<QuizDto | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [submittingQuiz, setSubmittingQuiz] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [quizResultDetails, setQuizResultDetails] = useState<any[]>([]);
  const [deadline, setDeadline] = useState<number>(0);
  const [perfectQuizIds, setPerfectQuizIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!id) return;

    const loadData = async () => {
      setLoading(true);
      try {
        const topicRes = await getGrammarTopicById(id);
        if (topicRes.success && topicRes.data) {
          setTopic(topicRes.data);

          // Check if topic is completed by user
          try {
            const progressRes = await getUserGrammarProgress();
            if (progressRes.success && progressRes.data) {
              const completed = progressRes.data.some((p) => p.topicId === id);
              setIsTopicCompleted(completed);
            }
          } catch {
            setIsTopicCompleted(false);
          }

          // Fetch quizzes for this grammar topic
          const quizRes = await getQuizzesByGrammar(id);
          if (quizRes.success && quizRes.data) {
            setQuizzes(quizRes.data);
          }

          try {
            const resultsRes = await getMyQuizResults();
            if (resultsRes.success && resultsRes.data) {
              setPerfectQuizIds(new Set(
                resultsRes.data
                  .filter((result) => result.score >= 100)
                  .map((result) => result.quizId)
              ));
            }
          } catch {
            setPerfectQuizIds(new Set());
          }
        } else {
          message.error(topicRes.message || 'Không tìm thấy bài học ngữ pháp');
          navigate('/grammar');
        }
      } catch (err: any) {
        message.error(err?.response?.data?.message || 'Lỗi tải dữ liệu');
        navigate('/grammar');
      } finally {
        setLoading(false);
      }
    };

    void loadData();
  }, [id, navigate]);

  const handleMarkAsCompleted = async () => {
    if (!topic || isTopicCompleted) return;
    setUpdatingStatus(true);
    try {
      const res = await markTopicCompleted(topic.id);
      if (res.success) {
        setIsTopicCompleted(true);
        message.success('Tuyệt vời! Bạn đã hoàn thành chủ đề ngữ pháp này.');
      } else {
        message.error(res.message || 'Không thể đánh dấu hoàn thành');
      }
    } catch (err: any) {
      message.error(err?.response?.data?.message || 'Lỗi kết nối');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleStartQuiz = (quiz: QuizDto) => {
    if (perfectQuizIds.has(quiz.id)) {
      message.info('Bạn đã đạt điểm tối đa cho bài quiz này nên không cần làm lại.');
      return;
    }

    setActiveQuiz(quiz);
    setUserAnswers({});
    setQuizSubmitted(false);
    setQuizScore(null);
    setQuizResultDetails([]);
    
    // Set timer deadline
    const minutes = quiz.durationMinutes || 10;
    setDeadline(Date.now() + minutes * 60 * 1000);
  };

  const handleAnswerSelect = (questionId: string, value: string) => {
    if (quizSubmitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmitQuiz = async (isAuto = false) => {
    if (!activeQuiz || submittingQuiz || quizSubmitted) return;

    // Check if user answered all questions (if not auto-submit)
    if (!isAuto) {
      const unanswered = activeQuiz.questions.filter((q) => !userAnswers[q.id]);
      if (unanswered.length > 0) {
        message.warning('Vui lòng trả lời đầy đủ tất cả các câu hỏi trước khi nộp bài.');
        return;
      }
    } else {
      message.info('Hết thời gian làm bài! Hệ thống đang tự động nộp bài...');
    }

    setSubmittingQuiz(true);
    try {
      const answersList = Object.entries(userAnswers).map(([qId, val]) => ({
        questionId: qId,
        answer: val,
      }));

      const res = await submitQuiz(activeQuiz.id, answersList);
      if (res.success && res.data) {
        setQuizScore(res.data.score);
        setQuizResultDetails(res.data.answers || []);
        setQuizSubmitted(true);
        if (res.data.score >= 100) {
          setPerfectQuizIds((prev) => new Set(prev).add(activeQuiz.id));
        }
        message.success(`Nộp bài thành công! Điểm số: ${res.data.score}/100`);

        // If score is high, let's mark the topic as completed automatically!
        if (res.data.score >= 80 && !isTopicCompleted) {
          void handleMarkAsCompleted();
        }
      } else {
        message.error(res.message || 'Lỗi nộp bài kiểm tra');
      }
    } catch (err: any) {
      message.error(err?.response?.data?.message || 'Lỗi kết nối khi nộp bài');
    } finally {
      setSubmittingQuiz(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Spin size="large" />
        <span className="text-secondary font-medium">Đang tải bài học ngữ pháp...</span>
      </div>
    );
  }

  if (!topic) return null;

  const embedUrl = getYouTubeEmbedUrl(topic.youTubeUrl);

  return (
    <div className="max-w-6xl mx-auto pb-16 px-4">
      {/* Quay lại */}
      <Link to="/grammar" className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary font-headline font-bold text-sm mb-6 no-underline transition-all">
        <ArrowLeftOutlined />
        Quay lại danh sách ngữ pháp
      </Link>

      {/* Tiêu đề & Cấp độ */}
      <div className="bg-surface-container-lowest rounded-[2rem] p-8 border border-outline-variant/10 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <Tag color={getLevelColor(topic.level)} className="font-headline text-xs px-3 py-0.5 rounded-full">
                {getLevelText(topic.level)}
              </Tag>
              {isTopicCompleted && (
                <span className="bg-primary/10 text-primary font-headline text-xs px-3 py-0.5 rounded-full flex items-center gap-1 font-bold">
                  <CheckCircleOutlined /> Đã hoàn thành
                </span>
              )}
            </div>
            <h1 className="font-headline text-3xl md:text-4xl font-black text-on-surface tracking-tight leading-tight">
              {topic.title}
            </h1>
          </div>

          <div className="shrink-0">
            <Button
              type={isTopicCompleted ? 'default' : 'primary'}
              size="large"
              loading={updatingStatus}
              onClick={handleMarkAsCompleted}
              disabled={isTopicCompleted}
              className={`rounded-full px-8 font-headline font-bold flex items-center gap-2 h-12 shadow-md ${
                isTopicCompleted ? 'bg-surface-container-high border-outline' : 'bg-primary text-on-primary'
              }`}
            >
              {isTopicCompleted ? (
                <>
                  <CheckCircleOutlined className="text-primary" />
                  Đã hoàn thành
                </>
              ) : (
                'Đánh dấu hoàn thành bài học'
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Nội dung chính và Cột phải (Video/Quiz) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cột trái: Bài học */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Mô tả chủ đề */}
          <div className="bg-surface-container-lowest rounded-[2rem] p-8 border border-outline-variant/10 shadow-sm">
            <h2 className="font-headline text-xl font-extrabold text-on-surface mb-6 border-b border-outline-variant/20 pb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[1.4rem]">menu_book</span>
              Nội dung ngữ pháp
            </h2>
            <div className="font-body text-[1.05rem] text-on-surface-variant leading-relaxed whitespace-pre-line prose max-w-none">
              {topic.content}
            </div>
          </div>

          {/* Giải thích & Ví dụ */}
          {(topic.explanation || topic.examples) && (
            <div className="bg-surface-container-lowest rounded-[2rem] p-8 border border-outline-variant/10 shadow-sm">
              <h2 className="font-headline text-xl font-extrabold text-on-surface mb-6 border-b border-outline-variant/20 pb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[1.4rem]">lightbulb</span>
                Chi tiết & Ví dụ minh họa
              </h2>

              {topic.explanation && (
                <div className="bg-primary-fixed/20 p-6 rounded-2xl mb-6 border-l-4 border-primary">
                  <h3 className="font-headline text-sm font-black text-primary uppercase tracking-wider mb-2">
                    Giải thích chuyên sâu
                  </h3>
                  <p className="font-body text-base text-on-surface leading-relaxed whitespace-pre-line">
                    {topic.explanation}
                  </p>
                </div>
              )}

              {topic.examples && (
                <div className="bg-tertiary-fixed/20 p-6 rounded-2xl border-l-4 border-tertiary">
                  <h3 className="font-headline text-sm font-black text-tertiary uppercase tracking-wider mb-2">
                    Các ví dụ thực tế
                  </h3>
                  <div className="font-body text-base text-on-surface-variant italic leading-relaxed whitespace-pre-line">
                    {topic.examples}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Cột phải: Video & Quiz */}
        <div className="flex flex-col gap-6">
          {/* YouTube Video Section */}
          {embedUrl && (
            <div className="bg-surface-container-lowest rounded-[2rem] p-6 border border-outline-variant/10 shadow-sm overflow-hidden">
              <h2 className="font-headline text-lg font-extrabold text-on-surface mb-4 flex items-center gap-2">
                <PlayCircleOutlined className="text-red-500" />
                Video bài giảng YouTube
              </h2>
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-inner border border-outline-variant/25">
                <iframe
                  src={embedUrl}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full"
                ></iframe>
              </div>
            </div>
          )}

          {/* Quiz Section */}
          <div className="bg-surface-container-lowest rounded-[2rem] p-6 border border-outline-variant/10 shadow-sm sticky top-4">
            <h2 className="font-headline text-lg font-extrabold text-on-surface mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[1.3rem]">quiz</span>
              Luyện tập ngữ pháp (Quiz)
            </h2>

            {quizzes.length === 0 ? (
              <div className="text-center py-6 bg-surface-container-low rounded-2xl">
                <span className="material-symbols-outlined text-outline text-[2.5rem] mb-2 block">assignment_late</span>
                <p className="font-headline text-sm font-bold text-on-surface">Chưa có Quiz cho chủ đề này</p>
                <p className="font-body text-xs text-outline mt-1 px-4">Bài ôn tập ngữ pháp đang được chuẩn bị và sẽ sớm phát hành.</p>
              </div>
            ) : !activeQuiz ? (
              // Quiz List
              <div className="flex flex-col gap-4">
                {quizzes.map((quiz) => (
                  <div key={quiz.id} className="p-5 bg-surface-container-low rounded-2xl border border-outline-variant/20 hover:border-primary/30 transition-all">
                    {perfectQuizIds.has(quiz.id) && (
                      <div className="mb-3 inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                        <CheckCircleOutlined /> Đã đạt 100 điểm
                      </div>
                    )}
                    <h3 className="font-headline text-sm font-black text-on-surface leading-tight mb-2">
                      {quiz.title}
                    </h3>
                    <div className="flex items-center gap-2 flex-wrap mb-4">
                      <Tag color="orange" className="text-[10px] rounded-full px-2 py-0">
                        {quiz.difficulty}
                      </Tag>
                      <span className="text-xs text-outline font-medium flex items-center gap-1">
                        <ClockCircleOutlined /> {quiz.durationMinutes} phút
                      </span>
                      <span className="text-xs text-outline font-medium">
                        📝 {quiz.questions?.length || 0} câu hỏi
                      </span>
                    </div>
                    <Button
                      type={perfectQuizIds.has(quiz.id) ? 'default' : 'primary'}
                      onClick={() => handleStartQuiz(quiz)}
                      disabled={perfectQuizIds.has(quiz.id)}
                      className="w-full rounded-full bg-primary font-headline font-bold text-sm h-10 shadow-md shadow-primary/10"
                    >
                      {perfectQuizIds.has(quiz.id) ? 'Đã hoàn thành tối đa' : 'Bắt đầu làm bài'}
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              // Active Quiz Player
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3 mb-2">
                  <div className="flex flex-col overflow-hidden">
                    <span className="font-headline text-[10px] font-black text-primary uppercase">Đang làm:</span>
                    <span className="font-headline text-xs font-black text-on-surface leading-tight truncate max-w-[120px]">
                      {activeQuiz.title}
                    </span>
                  </div>

                  {!quizSubmitted && (
                    <div className="flex items-center gap-2 bg-error/10 px-3 py-1 rounded-full border border-error/20">
                      <ClockCircleOutlined className="text-error text-xs animate-pulse" />
                      <Countdown 
                        value={deadline} 
                        onFinish={() => void handleSubmitQuiz(true)}
                        valueStyle={{ fontSize: '14px', fontWeight: 'bold', color: '#ff4d4f', fontFamily: 'monospace' }}
                        format="mm:ss"
                      />
                    </div>
                  )}

                  <Button
                    size="small"
                    danger
                    type="text"
                    onClick={() => setActiveQuiz(null)}
                    className="font-headline font-bold text-xs"
                    icon={<CloseCircleOutlined />}
                  >
                    Thoát
                  </Button>
                </div>

                {!quizSubmitted ? (
                  // Display Questions
                  <div className="flex flex-col gap-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                    {activeQuiz.questions && activeQuiz.questions.length > 0 ? (
                      activeQuiz.questions.map((q: any, qIndex: number) => (
                        <div key={q.id} className="bg-surface-container-low/50 p-4 rounded-xl border border-outline-variant/10">
                          <p className="font-headline text-sm font-bold text-on-surface mb-3">
                            Câu {qIndex + 1}: {q.questionText}
                          </p>
                          <Radio.Group
                            value={userAnswers[q.id]}
                            onChange={(e) => handleAnswerSelect(q.id, e.target.value)}
                            className="flex flex-col gap-2.5 w-full"
                          >
                            {q.options && q.options.map((opt: string) => (
                              <Radio
                                key={opt}
                                value={opt}
                                className="font-body text-sm text-on-surface-variant hover:text-primary transition-colors flex items-center align-middle"
                              >
                                {opt}
                              </Radio>
                            ))}
                          </Radio.Group>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-10 italic text-outline">
                        Không có câu hỏi cho bài Quiz này.
                      </div>
                    )}

                    {activeQuiz.questions && activeQuiz.questions.length > 0 && (
                      <Button
                        type="primary"
                        loading={submittingQuiz}
                        onClick={() => void handleSubmitQuiz(false)}
                        className="w-full rounded-full bg-primary font-headline font-bold h-11 shadow-lg shadow-primary/20 mt-2 mb-4"
                      >
                        Nộp bài kiểm tra
                      </Button>
                    )}
                  </div>
                ) : (
                  // Display Results & Review
                  <div className="flex flex-col gap-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                    <div className="text-center py-6 bg-primary/5 rounded-2xl border border-primary/20">
                      <TrophyOutlined className="text-primary text-[2.5rem] mb-2" />
                      <p className="font-headline text-lg font-black text-on-surface">Kết quả kiểm tra</p>
                      <p className="font-headline text-3xl font-black text-primary mt-2">
                        {quizScore} / 100
                      </p>
                      <p className="font-body text-xs text-secondary mt-1">
                        {quizScore && quizScore >= 80 ? 'Bạn làm rất tốt!' : 'Hãy cố gắng hơn ở lần sau nhé!'}
                      </p>
                    </div>

                    <h3 className="font-headline text-sm font-black text-on-surface mb-2 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-primary text-[1.2rem]">rate_review</span>
                      Xem lại đáp án
                    </h3>

                    <div className="flex flex-col gap-4">
                      {activeQuiz.questions.map((q: any, qIndex: number) => {
                        const isCorrect = quizResultDetails.find((r) => r.questionId === q.id)?.isCorrect;
                        const explanation = quizResultDetails.find((r) => r.questionId === q.id)?.explanation;

                        return (
                          <div key={q.id} className={`p-4 rounded-xl border ${
                            isCorrect ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'
                          }`}>
                            <p className="font-headline text-sm font-bold text-on-surface mb-2">
                              Câu {qIndex + 1}: {q.questionText}
                            </p>
                            <p className="font-body text-xs text-on-surface-variant">
                              Câu trả lời của bạn: <span className={isCorrect ? 'text-green-600 font-bold' : 'text-red-500 font-bold'}>
                                {userAnswers[q.id] || '(Chưa trả lời)'}
                              </span>
                            </p>
                            {!isCorrect && (
                              <p className="font-body text-xs text-on-surface-variant mt-1">
                                Đáp án đúng: <span className="text-green-600 font-bold">{q.correctAnswer}</span>
                              </p>
                            )}
                            {explanation && (
                              <div className="bg-surface-container-lowest p-3 rounded-lg border border-outline-variant/10 mt-2.5">
                                <p className="font-headline text-[10px] font-black text-primary uppercase">Giải thích</p>
                                <p className="font-body text-xs text-on-surface-variant mt-0.5">{explanation}</p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex gap-3 mb-4">
                      <Button
                        type="default"
                        onClick={() => handleStartQuiz(activeQuiz)}
                        disabled={perfectQuizIds.has(activeQuiz.id)}
                        className="flex-1 rounded-full h-10 font-headline font-bold text-sm"
                      >
                        {perfectQuizIds.has(activeQuiz.id) ? 'Đã đạt 100 điểm' : 'Làm lại'}
                      </Button>
                      <Button
                        type="primary"
                        onClick={() => setActiveQuiz(null)}
                        className="flex-1 rounded-full h-10 font-headline font-bold text-sm bg-primary"
                      >
                        Xong
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrammarDetailPage;
