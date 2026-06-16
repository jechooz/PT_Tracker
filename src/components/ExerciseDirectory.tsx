import React, { useState, useMemo } from 'react';
import { PTSession, Exercise, ExerciseSet } from '../types';
import { Search, Sparkles, Calendar, ChevronRight, HelpCircle, Eye, EyeOff } from 'lucide-react';

interface ExerciseHistoryItem {
  date: string;
  sets: ExerciseSet[];
  notes?: string;
}

interface GroupedExercise {
  name: string;
  category: '하체' | '가슴' | '등' | '어깨' | '팔' | '코어' | '유산소' | '전신';
  targetDetail?: string;
  postureImage?: string;
  history: ExerciseHistoryItem[];
}

interface ExerciseDirectoryProps {
  sessions: PTSession[];
  onSelectDate: (date: string) => void;
  onSwitchTab: (tab: 'journal' | 'directory' | 'stats' | 'coach') => void;
}

type FilterCategory = '전체' | '상체' | '하체' | '코어' | '기타';

export default function ExerciseDirectory({ sessions, onSelectDate, onSwitchTab }: ExerciseDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('전체');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Group exercises from all sessions
  const groupedExercises = useMemo(() => {
    const exerciseMap: Record<string, GroupedExercise> = {};

    // Sort sessions chronologically first so history accumulates chronologically
    const sortedSessions = [...sessions].sort((a, b) => a.date.localeCompare(b.date));

    sortedSessions.forEach(session => {
      session.exercises.forEach(ex => {
        const key = ex.name.trim();
        
        if (!exerciseMap[key]) {
          exerciseMap[key] = {
            name: ex.name,
            category: ex.category,
            targetDetail: ex.targetDetail,
            postureImage: ex.postureImage,
            history: []
          };
        }

        // Update targetDetail and postureImage if they weren't set yet
        if (!exerciseMap[key].targetDetail && ex.targetDetail) {
          exerciseMap[key].targetDetail = ex.targetDetail;
        }
        if (!exerciseMap[key].postureImage && ex.postureImage) {
          exerciseMap[key].postureImage = ex.postureImage;
        }

        // Add to history
        exerciseMap[key].history.push({
          date: session.date,
          sets: ex.sets,
          notes: ex.notes
        });
      });
    });

    // Convert map to array and sort history items in reverse-chronological order (most recent first)
    return Object.values(exerciseMap).map(item => {
      return {
        ...item,
        history: [...item.history].reverse()
      };
    });
  }, [sessions]);

  // Filters & search logic
  const filteredExercises = useMemo(() => {
    return groupedExercises.filter(ex => {
      // 1. Text Search matching name, category, or target detail
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        ex.name.toLowerCase().includes(query) ||
        (ex.targetDetail && ex.targetDetail.toLowerCase().includes(query)) ||
        ex.category.toLowerCase().includes(query);

      if (!matchesSearch) return false;

      // 2. Category filters
      if (activeFilter === '전체') return true;
      if (activeFilter === '하체') return ex.category === '하체';
      if (activeFilter === '상체') {
        return ['가슴', '등', '어깨', '팔'].includes(ex.category);
      }
      if (activeFilter === '코어') return ex.category === '코어';
      if (activeFilter === '기타') {
        return ['유산소', '전신'].includes(ex.category);
      }
      return true;
    });
  }, [groupedExercises, searchQuery, activeFilter]);

  const handleJumpToSession = (date: string) => {
    onSelectDate(date);
    onSwitchTab('journal');
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case '하체': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      case '등': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case '가슴': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case '어깨': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case '팔': return 'bg-teal-500/10 text-teal-400 border-teal-500/20';
      case '코어': return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
      case '유산소': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <div className="space-y-6" id="exercise-directory-container">

      {/* 🔍 Search & Filtering Row */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-black text-slate-100 uppercase tracking-wider font-mono flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-lime-400" />
              피지컬 운동 도감
            </h3>
            <p className="text-[11px] text-slate-500 mt-1 font-mono">
              수행한 모든 운동 동작을 분류별로 모아보고 누적 수행 히스토리와 자세 가이드를 한눈에 추적합니다.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="동작 이름, 자극 부위(예: 내전근) 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-300 focus:outline-none focus:border-slate-700 focus:bg-slate-950 transition font-medium"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-1 border-t border-slate-800/50">
          {(['전체', '상체', '하체', '코어', '기타'] as FilterCategory[]).map(filter => (
            <button
              key={filter}
              onClick={() => {
                setActiveFilter(filter);
                setExpandedId(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeFilter === filter
                  ? 'bg-lime-500 text-slate-950 font-black shadow-md'
                  : 'bg-slate-950/60 hover:bg-slate-800 border border-slate-800/80 text-slate-400 hover:text-slate-200'
              }`}
            >
              {filter === '기타' ? '유산소 & 전신' : filter}
            </button>
          ))}
          
          <span className="text-[10px] text-slate-600 self-center ml-auto font-mono font-bold">
            검색 결과: {filteredExercises.length}개 동작
          </span>
        </div>
      </div>

      {/* 🏋️ Exercises Grid */}
      {filteredExercises.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-500 text-xs font-mono">
          검색 및 필터 조건에 부합하는 운동 동작 기록이 없습니다.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredExercises.map(ex => {
            const isExpanded = expandedId === ex.name;
            const totalSetsCount = ex.history.reduce((acc, curr) => acc + curr.sets.length, 0);

            return (
              <div 
                key={ex.name} 
                className={`bg-slate-900 border rounded-2xl p-5 shadow-xl transition-all duration-300 flex flex-col justify-between ${
                  isExpanded ? 'border-lime-500/30 ring-1 ring-lime-500/10' : 'border-slate-800/80 hover:border-slate-700/80'
                }`}
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className={`text-[9.5px] font-bold px-2 py-0.5 rounded border font-mono ${getCategoryColor(ex.category)}`}>
                          {ex.category}
                        </span>
                        {ex.targetDetail && (
                          <span className="text-[9.5px] font-bold px-2 py-0.5 rounded border border-slate-800 bg-slate-950 text-slate-400 font-mono">
                            {ex.targetDetail}
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-black text-slate-100">{ex.name}</h4>
                    </div>

                    <button
                      onClick={() => setExpandedId(isExpanded ? null : ex.name)}
                      className="p-1.5 rounded-lg bg-slate-950/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition cursor-pointer"
                      title={isExpanded ? "상세 정보 접기" : "상세 정보 보기"}
                    >
                      {isExpanded ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="flex items-center gap-4 mt-3 text-[10px] font-mono text-slate-500">
                    <span>누적 수행: <strong className="text-slate-300">{ex.history.length}회 세션</strong></span>
                    <span className="w-1 h-1 rounded-full bg-slate-800" />
                    <span>총 세트: <strong className="text-slate-300">{totalSetsCount}세트</strong></span>
                  </div>

                  {/* expanded details info */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-slate-800/60 space-y-4 animate-fade-in">
                      
                      {/* Posture Guide */}
                      {ex.postureImage && (
                        <div className="bg-slate-950 rounded-xl border border-slate-800/80 p-3 flex flex-col sm:flex-row gap-3 items-center">
                          <img
                            src={ex.postureImage}
                            alt={`${ex.name} 가이드`}
                            className="w-24 h-16 object-cover rounded-lg border border-slate-800 bg-slate-900 flex-shrink-0"
                          />
                          <div className="text-[10px] text-slate-400 space-y-1 w-full">
                            <p className="font-bold text-slate-200 flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-lime-400" />
                              자세 주요 팁
                            </p>
                            <ul className="list-disc pl-4 font-mono leading-relaxed space-y-0.2">
                              {ex.name.includes("스쿼트") ? (
                                <>
                                  <li>골반 힌지 장력 확보에 우선을 둡니다.</li>
                                  <li>일어설 때 뒤꿈치 위주로 접지 밀어내기를 실행합니다.</li>
                                </>
                              ) : ex.name.includes("데드리프트") ? (
                                <>
                                  <li>등 평평하게 유지, 날개뼈 하강 광배근 수축 체결.</li>
                                  <li>바벨 정강이에 최대한 밀착 궤적 유지.</li>
                                </>
                              ) : ex.name.includes("플랭크") ? (
                                <>
                                  <li>정수리부터 발목까지 일직선 수평 정렬.</li>
                                  <li>어깨 밑에 수직으로 팔꿈치 단단히 고정.</li>
                                </>
                              ) : ex.name.includes("랫풀다운") ? (
                                <>
                                  <li>와이드 그립 수축 시 가슴을 하늘로 충분히 엽니다.</li>
                                  <li>전완의 개입을 줄이고 팔꿈치 방향 수직 수축.</li>
                                </>
                              ) : (
                                <>
                                  <li>안정적인 흉압 고정 후 타겟 고립.</li>
                                  <li>호흡 내쉴 때 자극 피크에서 1-2초 홀딩.</li>
                                </>
                              )}
                            </ul>
                          </div>
                        </div>
                      )}

                      {/* Cumulative Load History */}
                      <div className="space-y-2">
                        <p className="text-[10px] font-black uppercase text-slate-500 tracking-wider font-mono">
                          📈 중량 성장 히스토리
                        </p>
                        <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1 scrollbar-thin">
                          {ex.history.map((hist, idx) => (
                            <div 
                              key={`${hist.date}-${idx}`} 
                              className="bg-slate-950/40 border border-slate-800/50 p-2.5 rounded-xl flex items-center justify-between gap-3 text-xs"
                            >
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-mono text-[10px] text-lime-400 font-bold">{hist.date}</span>
                                  {hist.notes && (
                                    <span className="text-[9.5px] text-slate-500 font-mono break-keep leading-relaxed">
                                      ({hist.notes})
                                    </span>
                                  )}
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  {hist.sets.map((set, setIdx) => (
                                    <span 
                                      key={setIdx} 
                                      className="text-[9.5px] px-1.5 py-0.2 rounded border border-slate-800 bg-slate-900 text-slate-400 font-mono font-medium"
                                    >
                                      {set.weight > 0 ? `${set.weight}kg` : '맨몸'} x {set.reps}회
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <button
                                onClick={() => handleJumpToSession(hist.date)}
                                className="px-2 py-1 bg-slate-950 hover:bg-slate-800 hover:text-slate-200 border border-slate-800 hover:border-slate-700 text-[10px] font-bold text-slate-400 rounded-lg flex items-center gap-0.5 transition cursor-pointer"
                              >
                                저널
                                <ChevronRight className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  )}
                </div>

                {!isExpanded && (
                  <button
                    onClick={() => setExpandedId(ex.name)}
                    className="mt-4 w-full py-1.5 bg-slate-950 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 text-[10px] font-bold text-slate-400 hover:text-slate-300 rounded-xl flex items-center justify-center gap-1 transition cursor-pointer"
                  >
                    누적 히스토리 및 코칭 보기
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
