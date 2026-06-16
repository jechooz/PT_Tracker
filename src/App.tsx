import React, { useState, useEffect } from 'react';
import { PTSession } from './types';
import { getInitialSessions } from './data/initialData';
import { supabase } from './lib/supabase';
import CalendarView from './components/CalendarView';
import SessionDetail from './components/SessionDetail';
import StatsDashboard from './components/StatsDashboard';
import CoachInsight from './components/CoachInsight';
import AddSessionDialogue from './components/AddSessionDialogue';
import ExerciseDirectory from './components/ExerciseDirectory';
import GalleryView from './components/GalleryView';
import {
  Dumbbell, Calendar as CalIcon, TrendingUp, Sparkles, Plus,
  RotateCcw, ShieldCheck, BookOpen, ImageIcon, Loader2
} from 'lucide-react';

type ActiveTab = 'journal' | 'directory' | 'gallery' | 'stats' | 'coach';

/* DB row(snake_case) ↔ PTSession(camelCase) 변환 */
function toRow(s: PTSession) {
  return {
    id: s.id,
    date: s.date,
    title: s.title,
    focus: s.focus,
    exercises: s.exercises,
    duration: s.duration ?? 0,
    trainer_feedback: s.trainerFeedback ?? '',
    user_notes: s.userNotes ?? '',
    score: s.score ?? 3,
    homework: s.homework ?? '',
    homework_completed: s.homeworkCompleted ?? false,
    completed: s.completed ?? true,
  };
}

function fromRow(row: any): PTSession {
  return {
    id: row.id,
    date: row.date,
    title: row.title,
    focus: row.focus ?? [],
    exercises: row.exercises ?? [],
    duration: row.duration ?? 0,
    trainerFeedback: row.trainer_feedback ?? '',
    userNotes: row.user_notes ?? '',
    score: row.score ?? 3,
    homework: row.homework ?? '',
    homeworkCompleted: row.homework_completed ?? false,
    completed: row.completed ?? true,
  };
}

export default function App() {
  const [sessions, setSessions] = useState<PTSession[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("2026-06-19");
  const [activeTab, setActiveTab] = useState<ActiveTab>('journal');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  /* 초기 데이터 로드 */
  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('pt_sessions')
        .select('*')
        .order('date', { ascending: true });

      if (!error && data && data.length > 0) {
        setSessions(data.map(fromRow));
      } else {
        /* DB가 비어 있으면 초기 데이터 삽입 */
        const fresh = getInitialSessions();
        await supabase.from('pt_sessions').insert(fresh.map(toRow));
        setSessions(fresh);
      }
      setIsLoading(false);
    })();
  }, []);

  const handleUpdateSession = async (updated: PTSession) => {
    setSessions(prev => prev.map(s => s.id === updated.id ? updated : s));
    await supabase.from('pt_sessions').upsert(toRow(updated));
  };

  const handleDeleteSession = async (sessionId: string) => {
    if (window.confirm("정말로 이 PT 트레이닝 일지를 영구 삭제하시겠습니까?")) {
      setSessions(prev => prev.filter(s => s.id !== sessionId));
      await supabase.from('pt_sessions').delete().eq('id', sessionId);
    }
  };

  const handleCreateSession = async (newSession: PTSession) => {
    const existing = sessions.find(s => s.date === newSession.date);
    if (existing) {
      alert(`이미 ${newSession.date} 날짜에 PT 세션이 배정되어 있습니다!`);
      setSelectedDate(newSession.date);
      return;
    }
    setSessions(prev => [...prev, newSession].sort((a, b) => a.date.localeCompare(b.date)));
    setSelectedDate(newSession.date);
    setIsAddOpen(false);
    await supabase.from('pt_sessions').insert(toRow(newSession));
  };

  const handleAddSessionInlineForDate = (date: string) => {
    setSelectedDate(date);
    setIsAddOpen(true);
  };

  const handleResetData = async () => {
    if (window.confirm("모든 트레이닝 변경 이력을 초기화하고 오리지널 PT 기록 데이터로 재설정하시겠습니까?")) {
      const fresh = getInitialSessions();
      setSessions(fresh);
      setSelectedDate("2026-06-19");
      await supabase.from('pt_sessions').delete().neq('id', '');
      await supabase.from('pt_sessions').insert(fresh.map(toRow));
      alert("성공적으로 오리지널 PT 트레이닝이 복원되었습니다!");
    }
  };

  const activeSession = sessions.find(s => s.date === selectedDate);

  const tabItems: { key: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { key: 'journal',   label: '저널',    icon: <CalIcon className="w-5 h-5" /> },
    { key: 'directory', label: '운동도감', icon: <Dumbbell className="w-5 h-5" /> },
    { key: 'gallery',   label: '갤러리',  icon: <ImageIcon className="w-5 h-5" /> },
    { key: 'stats',     label: '통계',    icon: <TrendingUp className="w-5 h-5" /> },
    { key: 'coach',     label: 'AI코치',  icon: <Sparkles className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-lime-400 selection:text-slate-950 pb-20 md:pb-0">

      {/* ─── Header ─── */}
      <header className="border-b border-slate-800/80 bg-slate-900/70 backdrop-blur-md sticky top-0 z-40 px-4 md:px-8 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-lime-500 to-emerald-500 flex items-center justify-center shadow-md shadow-lime-500/20 flex-shrink-0">
            <Dumbbell className="w-4 h-4 text-slate-900 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-sm font-black tracking-tight text-slate-100 uppercase font-mono leading-none">
              PT Tracker
            </h1>
            <p className="text-[10px] text-slate-500 leading-none mt-0.5 hidden sm:block">체계적 PT 기록 & 분석</p>
          </div>
        </div>

        {/* Desktop tabs */}
        <div className="hidden md:flex bg-slate-950/80 p-1 rounded-xl border border-slate-800/60 text-xs gap-0.5">
          {tabItems.map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-4 py-2 rounded-lg font-bold flex items-center gap-1.5 transition-all duration-200 ${
                activeTab === key
                  ? 'bg-lime-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <span className="w-3.5 h-3.5 [&>svg]:w-full [&>svg]:h-full">{icon}</span>
              {label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="px-3 py-2 bg-lime-500 hover:bg-lime-400 active:scale-95 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-[0_4px_14px_rgba(132,204,22,0.2)] transition-all duration-200 flex-shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span className="hidden sm:inline">새 PT 일정</span>
        </button>
      </header>

      {/* ─── Main ─── */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-6 lg:p-8">

        {/* 로딩 */}
        {isLoading && (
          <div className="flex items-center justify-center h-64 gap-3 text-slate-500">
            <Loader2 className="w-5 h-5 animate-spin text-lime-400" />
            <span className="text-sm font-mono">데이터 불러오는 중...</span>
          </div>
        )}

        {!isLoading && (
          <>
            {activeTab === 'journal' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                <div className="lg:col-span-5 space-y-5">
                  <CalendarView
                    sessions={sessions}
                    selectedDate={selectedDate}
                    onSelectDate={setSelectedDate}
                  />
                  <div className="hidden lg:block">
                    <TimelinePanel
                      sessions={sessions}
                      selectedDate={selectedDate}
                      onSelectDate={setSelectedDate}
                    />
                  </div>
                </div>
                <div className="lg:col-span-7">
                  <SessionDetail
                    session={activeSession}
                    onUpdateSession={handleUpdateSession}
                    onDeleteSession={handleDeleteSession}
                    onAddSessionForDate={handleAddSessionInlineForDate}
                    selectedDate={selectedDate}
                  />
                </div>
              </div>
            )}

            {activeTab === 'directory' && (
              <ExerciseDirectory
                sessions={sessions}
                onSelectDate={setSelectedDate}
                onSwitchTab={setActiveTab}
              />
            )}

            {activeTab === 'gallery' && <GalleryView />}

            {activeTab === 'stats' && <StatsDashboard sessions={sessions} />}

            {activeTab === 'coach' && <CoachInsight sessions={sessions} />}
          </>
        )}

      </main>

      {/* ─── Footer ─── */}
      <footer className="hidden md:flex border-t border-slate-800/60 bg-slate-900/30 py-4 px-8 text-[11px] text-slate-600 font-mono items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-lime-500/60" />
          <span>PT Routine Tracker — Supabase</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleResetData}
            className="flex items-center gap-1 hover:text-slate-400 transition"
          >
            <RotateCcw className="w-3 h-3" />
            데이터 리셋
          </button>
          <span>jieunchc@gmail.com</span>
        </div>
      </footer>

      {/* ─── 모바일 내비게이션 ─── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800/80 z-50">
        <div className="flex items-center justify-around px-1 pb-safe">
          {tabItems.map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex flex-col items-center gap-0.5 py-2.5 px-2 min-w-0 flex-1 transition-all duration-200 ${
                activeTab === key ? 'text-lime-400' : 'text-slate-600'
              }`}
            >
              <span className={`transition-transform duration-200 ${activeTab === key ? 'scale-110' : 'scale-100'}`}>
                {icon}
              </span>
              <span className="text-[9px] font-bold truncate w-full text-center">{label}</span>
            </button>
          ))}
        </div>
      </nav>

      <AddSessionDialogue
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAddSession={handleCreateSession}
        defaultDate={selectedDate}
      />
    </div>
  );
}

/* ─── 타임라인 패널 ─── */
function TimelinePanel({
  sessions, selectedDate, onSelectDate,
}: {
  sessions: PTSession[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
}) {
  const getMonthLabel = (dateStr: string) => {
    const [year, month] = dateStr.split('-');
    return year === '2025' ? '2025년 12월' : `2026년 ${parseInt(month)}월`;
  };

  const grouped: Record<string, PTSession[]> = {};
  sessions.forEach(s => {
    const key = getMonthLabel(s.date);
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(s);
  });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col" style={{ height: 360 }}>
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
        <BookOpen className="w-4 h-4 text-lime-400" />
        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 font-mono">
          전체 타임라인 <span className="text-slate-600 font-medium">({sessions.length}회)</span>
        </h3>
      </div>
      <div className="overflow-y-auto flex-1 space-y-4 pr-1">
        {Object.entries(grouped).reverse().map(([month, list]) => (
          <div key={month} className="space-y-1">
            <p className="text-[10px] font-black text-lime-400/70 font-mono px-1 sticky top-0 bg-slate-900 py-0.5 z-10">
              {month} <span className="text-slate-600 font-medium">({list.length})</span>
            </p>
            {list.slice().reverse().map(s => {
              const isSelected = selectedDate === s.date;
              return (
                <button
                  key={s.id}
                  onClick={() => onSelectDate(s.date)}
                  className={`w-full text-left px-3 py-2 rounded-xl border flex items-center justify-between gap-2 text-xs transition-all duration-200 ${
                    isSelected
                      ? 'bg-lime-500 text-slate-950 border-lime-400 font-bold'
                      : 'bg-slate-950/30 hover:bg-slate-800/60 border-slate-800/60 text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={`font-mono text-[10px] flex-shrink-0 ${isSelected ? 'text-slate-950 font-black' : 'text-slate-600'}`}>
                      {s.date.substring(5)}
                    </span>
                    <span className="truncate font-medium">{s.title}</span>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-bold border ${
                      isSelected
                        ? 'border-slate-950/20 bg-slate-950/15 text-slate-950'
                        : 'border-slate-800 bg-slate-900 text-slate-500'
                    }`}>
                      {s.focus[0] || '전신'}
                    </span>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      s.completed
                        ? (isSelected ? 'bg-slate-950' : 'bg-lime-400')
                        : (isSelected ? 'bg-slate-950' : 'bg-teal-400')
                    }`} />
                  </div>
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
