import React from 'react';
import { PTSession } from '../types';
import { Award, TrendingUp, Sparkles, CheckCircle2, Flame, Heart, PieChart } from 'lucide-react';

interface StatsDashboardProps {
  sessions: PTSession[];
}

export default function StatsDashboard({ sessions }: StatsDashboardProps) {
  // 1. Core KPIs
  const totalCount = sessions.length;
  const completedSessions = sessions.filter(s => s.completed);
  const completedCount = completedSessions.length;
  const pendingCount = totalCount - completedCount;
  const completionRate = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // 2. Average Session Rating/Score (from completed ones)
  const scoreSessions = completedSessions.filter(s => s.score !== undefined);
  const avgScore = scoreSessions.length > 0
    ? (scoreSessions.reduce((acc, s) => acc + (s.score || 0), 0) / scoreSessions.length).toFixed(1)
    : "0.0";

  // 3. Muscle Focus Distribution (Count of exercises per category)
  const muscleGroups: Record<string, number> = {
    '하체': 0,
    '등': 0,
    '가슴': 0,
    '어깨': 0,
    '팔': 0,
    '코어': 0,
    '유산소': 0
  };

  let totalExerciseVolumeCount = 0;
  sessions.forEach(session => {
    session.exercises.forEach(ex => {
      if (muscleGroups[ex.category] !== undefined) {
        // We can weight by total sets scale
        const setsCount = ex.sets.length;
        muscleGroups[ex.category] += setsCount;
        totalExerciseVolumeCount += setsCount;
      }
    });
  });

  const musclePercentages = Object.entries(muscleGroups).map(([group, count]) => {
    const percentage = totalExerciseVolumeCount > 0 ? Math.round((count / totalExerciseVolumeCount) * 100) : 0;
    return { group, count, percentage };
  }).sort((a, b) => b.count - a.count);

  // 4. Monthly Session Counts
  // Helper to extract month label
  const getMonthKey = (dateStr: string) => {
    // format YYYY-MM-DD -> YYYY.MM
    const parts = dateStr.split('-');
    if (parts.length >= 2) {
      const year = parts[0];
      const month = parts[1];
      return `${year}.${month}`;
    }
    return '기타';
  };

  const monthlyCounts: Record<string, { total: number; completed: number }> = {
    '2025.12': { total: 0, completed: 0 },
    '2026.01': { total: 0, completed: 0 },
    '2026.02': { total: 0, completed: 0 },
    '2026.03': { total: 0, completed: 0 },
    '2026.04': { total: 0, completed: 0 },
    '2026.05': { total: 0, completed: 0 },
    '2026.06': { total: 0, completed: 0 }
  };

  sessions.forEach(session => {
    const key = getMonthKey(session.date);
    if (!monthlyCounts[key]) {
      monthlyCounts[key] = { total: 0, completed: 0 };
    }
    monthlyCounts[key].total += 1;
    if (session.completed) {
      monthlyCounts[key].completed += 1;
    }
  });

  const monthlyData = Object.entries(monthlyCounts).map(([month, data]) => {
    const [year, mVal] = month.split('.');
    const cleanMonthName = year === '2025' ? '25년 12월' : `${parseInt(mVal)}월`;
    return {
      monthStr: cleanMonthName,
      key: month,
      total: data.total,
      completed: data.completed
    };
  });

  const maxMonthTotal = Math.max(...monthlyData.map(d => d.total), 4);

  // 5. Attendance Streak Calculation
  // Sort sessions chronologically
  const sortedSessions = [...sessions].sort((a, b) => a.date.localeCompare(b.date));
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  sortedSessions.forEach(session => {
    if (session.completed) {
      tempStreak += 1;
      if (tempStreak > longestStreak) {
        longestStreak = tempStreak;
      }
    } else {
      tempStreak = 0;
    }
  });
  currentStreak = tempStreak;

  // Let's configure color maps for muscle groups
  const colorMap: Record<string, string> = {
    '하체': 'bg-rose-500 text-rose-400 border-rose-500/20',
    '등': 'bg-blue-500 text-blue-400 border-blue-500/20',
    '가슴': 'bg-amber-500 text-amber-400 border-amber-500/20',
    '어깨': 'bg-purple-500 text-purple-400 border-purple-500/20',
    '팔': 'bg-teal-500 text-teal-400 border-teal-500/20',
    '코어': 'bg-indigo-500 text-indigo-400 border-indigo-500/20',
    '유산소': 'bg-emerald-500 text-emerald-400 border-emerald-500/20'
  };

  const ringColorMap: Record<string, string> = {
    '하체': '#f43f5e',
    '등': '#3b82f6',
    '가슴': '#f59e0b',
    '어깨': '#a855f7',
    '팔': '#14b8a6',
    '코어': '#6366f1',
    '유산소': '#10b981'
  };

  return (
    <div className="space-y-6" id="stats-dashboard-container">
      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Card 1: Total */}
        <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-4 flex items-center justify-between shadow-lg">
          <div>
            <span className="text-xs font-semibold text-slate-500 block font-mono uppercase tracking-wider">누적 PT 세션</span>
            <span className="text-2xl font-black text-slate-100 font-mono mt-1 block">{totalCount}<span className="text-xs text-slate-500 font-normal ml-0.5">회</span></span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-lime-500/10 flex items-center justify-center border border-lime-500/20 text-lime-400">
            <Award className="w-5 h-5" />
          </div>
        </div>

        {/* Card 2: Completed */}
        <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-4 flex items-center justify-between shadow-lg">
          <div>
            <span className="text-xs font-semibold text-slate-500 block font-mono uppercase tracking-wider">완료한 세션</span>
            <span className="text-2xl font-black text-lime-400 font-mono mt-1 block">{completedCount}<span className="text-xs text-slate-500 font-normal ml-0.5">/ {totalCount}회</span></span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-lime-500/10 flex items-center justify-center border border-lime-500/20 text-lime-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        {/* Card 3: Completion rate */}
        <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-4 flex items-center justify-between shadow-lg">
          <div>
            <span className="text-xs font-semibold text-slate-500 block font-mono uppercase tracking-wider">세션 달성도</span>
            <span className="text-2xl font-black text-indigo-400 font-mono mt-1 block">{completionRate}<span className="text-sm font-bold text-indigo-400/80 ml-0.5">%</span></span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 text-indigo-400">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        {/* Card 4: Streak */}
        <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-4 flex items-center justify-between shadow-lg">
          <div>
            <span className="text-xs font-semibold text-slate-500 block font-mono uppercase tracking-wider">연속 운동 달성</span>
            <span className="text-2xl font-black text-rose-400 font-mono mt-1 block">{longestStreak}<span className="text-xs text-slate-500 font-normal ml-0.5">회 최장</span></span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center border border-rose-500/20 text-rose-400">
            <Flame className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Charts Layout (2 columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Column 1: Monthly Bar Chart (3/5 width) */}
        <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-200 tracking-tight flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-lime-400" />
                월별 PT 트레이닝 빈도 추이
              </h3>
              <p className="text-[11px] text-slate-500 font-mono">12월부터 6월까지의 월별 PT 횟수 분석</p>
            </div>
            <div className="text-xs font-mono font-semibold bg-slate-800 px-2.5 py-1 rounded-full text-slate-300">
              최대 월 {maxMonthTotal}회
            </div>
          </div>

          {/* Bar Chart Container */}
          <div className="h-48 flex items-end justify-between px-2 pt-4 relative">
            {/* Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8 text-[9px] text-slate-700 font-mono">
              <div className="border-t border-slate-800/60 w-full pt-1"></div>
              <div className="border-t border-slate-800/30 w-full pt-1"></div>
              <div className="border-t border-slate-800/30 w-full pt-1"></div>
              <div className="border-t border-slate-800/30 w-full pt-1"></div>
            </div>

            {monthlyData.map((d) => {
              // height percent calculations
              const totalHeight = `${(d.total / maxMonthTotal) * 100}%`;
              const completedHeight = `${(d.completed / maxMonthTotal) * 100}%`;

              return (
                <div key={d.key} className="flex flex-col items-center flex-1 h-full relative z-10 group">
                  {/* Tooltip on Hover */}
                  <div className="absolute bottom-full mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-slate-950 border border-slate-800 text-[10px] text-slate-300 rounded px-2 py-1 font-mono text-center pointer-events-none shadow-2xl z-20">
                    <div>계획: {d.total}회</div>
                    <div className="text-lime-400">완료: {d.completed}회</div>
                  </div>

                  {/* Interleaved Columns */}
                  <div className="w-4 sm:w-6 bg-slate-800/40 rounded-t-md h-[80%] flex items-end relative overflow-hidden transition-all duration-300 group-hover:bg-slate-800/80">
                    {/* Planned volume height (dark teal/slate) */}
                    <div 
                      style={{ height: totalHeight }} 
                      className="w-full bg-slate-700/60 rounded-t-sm absolute bottom-0 left-0 transition-all duration-500"
                    />
                    {/* Completed volume height (electric lime) */}
                    <div 
                      style={{ height: completedHeight }} 
                      className="w-full bg-lime-500/80 group-hover:bg-lime-400 rounded-t-sm absolute bottom-0 left-0 transition-all duration-500 shadow-[0_0_12px_rgba(132,204,22,0.3)]"
                    />
                  </div>

                  {/* Numeric label */}
                  <span className="text-[10px] font-black text-slate-300 font-mono mt-2 block">
                    {d.total}회
                  </span>

                  {/* Month Label */}
                  <span className="text-[10px] text-slate-500 font-medium font-mono mt-1">
                    {d.monthStr}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-4 justify-center mt-4 pt-4 border-t border-slate-800/50 text-[10px] text-slate-400 font-mono">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded bg-lime-500" />
              <span>완료된 세션</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded bg-slate-700" />
              <span>진행 예정/미완료</span>
            </div>
          </div>
        </div>

        {/* Column 2: Muscle Distribution (2/5 width) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="space-y-1 mb-4">
              <h3 className="text-sm font-bold text-slate-200 tracking-tight flex items-center gap-1.5">
                <PieChart className="w-4 h-4 text-lime-400" />
                부위별 세트 트레이닝 비중
              </h3>
              <p className="text-[11px] text-slate-500 font-mono">PT 세션 간 투입된 총 세트 수의 분포도</p>
            </div>

            {/* List breakdown */}
            <div className="space-y-2.5">
              {musclePercentages.slice(0, 5).map(({ group, count, percentage }) => {
                const colorInfo = colorMap[group] || "bg-lime-500";
                const bgIndicator = colorInfo.split(' ')[0]; // bg-rose-500 etc.

                return (
                  <div key={group} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${bgIndicator}`} />
                        {group}
                      </span>
                      <span className="text-slate-400 font-mono font-medium">
                        {count}세트 <span className="text-[10px] text-slate-600 font-normal">({percentage}%)</span>
                      </span>
                    </div>
                    {/* Multi-layered progress bar */}
                    <div className="w-full h-1.5 bg-slate-800/50 rounded-full overflow-hidden">
                      <div 
                        style={{ width: `${percentage}%` }}
                        className={`h-full rounded-full transition-all duration-500 ${bgIndicator}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-[11px] text-slate-500 italic mt-4 pt-4 border-t border-slate-800/60 leading-relaxed">
            🌿 하체와 가공된 상체 프레임(등, 가슴)에 세트 배분이 집중되어 균형 있는 체형 발달이 설계되었습니다.
          </div>
        </div>
      </div>
    </div>
  );
}
