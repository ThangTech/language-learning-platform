import { Pie } from '@ant-design/charts';
import type { UserProgressDto, StreakDto } from '../../interfaces/progress';

interface ProfileStatsTabProps {
  progress: UserProgressDto | null;
  streak: StreakDto | null;
}

const ProfileStatsTab = ({ progress, streak }: ProfileStatsTabProps) => {
  const listening = progress?.listeningCompleted ?? 0;
  const quizzes = progress?.quizzesCompleted ?? 0;
  const words = progress?.wordsLearned ?? 0;
  const grammar = progress?.grammarCompleted ?? 0;
  const total = listening + quizzes + words + grammar;

  const pieData = [
    { type: 'Bài nghe', value: listening },
    { type: 'Quiz', value: quizzes },
    { type: 'Từ vựng', value: words },
    { type: 'Ngữ pháp', value: grammar },
  ].filter((d) => d.value > 0);

  const currentStreak = streak?.currentStreak ?? progress?.currentStreak ?? 0;
  const longestStreak = streak?.longestStreak ?? progress?.longestStreak ?? 0;

  const isEmpty = total === 0;

  return (
    <div className="flex flex-col gap-6">
      {/* Streak stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-secondary-container rounded-2xl p-6 flex flex-col gap-2">
          <span
            className="material-symbols-outlined text-on-secondary-container text-3xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            local_fire_department
          </span>
          <p className="font-headline font-extrabold text-3xl text-on-secondary-container">
            {currentStreak}
          </p>
          <p className="text-sm text-on-secondary-container/70">Chuỗi hiện tại (ngày)</p>
        </div>
        <div className="bg-primary/10 rounded-2xl p-6 flex flex-col gap-2">
          <span
            className="material-symbols-outlined text-primary text-3xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            emoji_events
          </span>
          <p className="font-headline font-extrabold text-3xl text-primary">{longestStreak}</p>
          <p className="text-sm text-on-surface-variant">Chuỗi dài nhất (ngày)</p>
        </div>
      </div>

      {/* Pie chart tỉ lệ hoạt động */}
      <div className="bg-surface-container-low rounded-[1.5rem] p-8 border border-outline-variant/10">
        <h3 className="font-headline font-bold text-on-surface mb-6">Phân bổ hoạt động học tập</h3>
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center gap-4 py-10">
            <span className="material-symbols-outlined text-5xl text-outline">pie_chart</span>
            <p className="text-on-surface-variant text-sm">
              Chưa có dữ liệu. Hãy hoàn thành bài học đầu tiên!
            </p>
          </div>
        ) : (
          <Pie
            data={pieData}
            angleField="value"
            colorField="type"
            radius={0.8}
            label={{ type: 'spider', content: '{name}: {percentage}' }}
            legend={{ position: 'bottom' }}
            height={260}
            color={['#6750a4', '#625b71', '#7d5260', '#4a6741']}
            tooltip={{
              formatter: (datum: { type: string; value: number }) => ({
                name: datum.type,
                value: datum.value,
              }),
            }}
          />
        )}
      </div>

      {/* Summary numbers */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Bài nghe', value: listening, icon: 'headphones', color: 'text-primary' },
          { label: 'Quiz', value: quizzes, icon: 'fact_check', color: 'text-tertiary' },
          { label: 'Từ vựng', value: words, icon: 'translate', color: 'text-secondary' },
          { label: 'Ngữ pháp', value: grammar, icon: 'menu_book', color: 'text-primary' },
        ].map((item) => (
          <div key={item.label} className="bg-surface-container rounded-2xl p-4 text-center">
            <span className={`material-symbols-outlined text-2xl ${item.color}`}>{item.icon}</span>
            <p className="font-headline font-extrabold text-2xl text-on-surface mt-2">{item.value}</p>
            <p className="text-xs text-on-surface-variant">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileStatsTab;
