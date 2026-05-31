import { Column } from '@ant-design/charts';
import type { UserProgressDto } from '../../interfaces/progress';

interface FluencyChartProps {
  progress: UserProgressDto | null;
}

/**
 * FluencyChart — Dùng Ant Design Charts (Column chart) để hiển thị tiến trình tuần hiện tại.
 * Dữ liệu là số bài đã hoàn thành (listening + quizzes) tính trên tổng.
 */
const FluencyChart = ({ progress }: FluencyChartProps) => {
  // Tạo dữ liệu bar chart từ progress thực tế
  const chartData = [
    {
      category: 'Từ vựng',
      value: progress?.wordsLearned ?? 0,
      type: 'Số từ đã học',
    },
    {
      category: 'Nghe',
      value: progress?.listeningCompleted ?? 0,
      type: 'Bài nghe',
    },
    {
      category: 'Quiz',
      value: progress?.quizzesCompleted ?? 0,
      type: 'Bài quiz',
    },
    {
      category: 'Ngữ pháp',
      value: progress?.grammarCompleted ?? 0,
      type: 'Chủ điểm ngữ pháp',
    },
  ];

  const config = {
    data: chartData,
    xField: 'category',
    yField: 'value',
    colorField: 'category',
    color: ['#6750a4', '#625b71', '#7d5260', '#4a6741'],
    label: {
      position: 'top' as const,
      style: { fill: '#49454f', fontSize: 12, fontWeight: 600 },
      formatter: (text: string) => text,
    },
    xAxis: {
      label: {
        style: { fill: '#49454f', fontSize: 13, fontWeight: 600 },
      },
    },
    yAxis: {
      label: {
        formatter: (v: string) => `${v}`,
        style: { fill: '#49454f', fontSize: 12 },
      },
      grid: { line: { style: { stroke: '#e7e0ec', lineWidth: 1 } } },
    },
    columnStyle: {
      radius: [8, 8, 0, 0],
    },
    tooltip: {
      formatter: (datum: { category: string; value: number }) => ({
        name: datum.category,
        value: datum.value,
      }),
    },
    animation: {
      appear: {
        animation: 'scale-in-y',
        duration: 600,
      },
    },
  };

  const isEmpty =
    (progress?.wordsLearned ?? 0) === 0 &&
    (progress?.listeningCompleted ?? 0) === 0 &&
    (progress?.quizzesCompleted ?? 0) === 0 &&
    (progress?.grammarCompleted ?? 0) === 0;

  return (
    <div className="col-span-12 bg-surface-container-low rounded-[2rem] p-10">
      {/* Chart header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="font-headline font-bold text-2xl tracking-tight text-on-surface">
            Thống kê tiến trình học tập
          </h3>
          <p className="text-sm text-on-surface-variant mt-1">
            {isEmpty
              ? 'Hãy bắt đầu học để xem thống kê của bạn!'
              : `Tổng điểm: ${progress?.totalScore ?? 0} điểm`}
          </p>
        </div>
        {!isEmpty && (
          <div className="px-4 py-2 bg-primary/10 rounded-full">
            <span className="text-primary font-headline font-bold text-sm">
              {progress?.scoreText ?? ''}
            </span>
          </div>
        )}
      </div>

      {isEmpty ? (
        <div className="h-48 flex flex-col items-center justify-center gap-3">
          <span className="material-symbols-outlined text-5xl text-outline">bar_chart</span>
          <p className="text-on-surface-variant text-sm font-medium">
            Chưa có dữ liệu. Hãy hoàn thành bài học đầu tiên!
          </p>
        </div>
      ) : (
        <Column {...config} height={220} />
      )}
    </div>
  );
};

export default FluencyChart;
