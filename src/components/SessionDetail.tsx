import React, { useState, useEffect } from 'react';
import { PTSession, Exercise, ExerciseSet } from '../types';
import {
  Check, Dumbbell, Clock, MessageSquare,
  Trash2, Plus, X, Save, Sparkles
} from 'lucide-react';

interface SessionDetailProps {
  session: PTSession | undefined;
  onUpdateSession: (updated: PTSession) => void;
  onDeleteSession: (sessionId: string) => void;
  onAddSessionForDate: (date: string) => void;
  selectedDate: string;
}

export default function SessionDetail({ 
  session, 
  onUpdateSession, 
  onDeleteSession, 
  onAddSessionForDate,
  selectedDate 
}: SessionDetailProps) {

  // Local state for adding an exercise inline
  const [addingExercise, setAddingExercise] = useState(false);
  const [newExerciseName, setNewExerciseName] = useState("");
  const [newExerciseCategory, setNewExerciseCategory] = useState<'하체' | '가슴' | '등' | '어깨' | '팔' | '코어' | '유산소'>("하체");

  const [localFeedback, setLocalFeedback] = useState("");

  // Toggle visibility of posture guides per exercise ID
  const [showGuides, setShowGuides] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (session) {
      setLocalFeedback(session.trainerFeedback || "");
    }
  }, [session]);

  if (!session) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center text-center min-h-[400px] shadow-xl" id="no-session-card">
        <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mb-4 border border-slate-700/60 text-slate-500">
          <Dumbbell className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-200">{selectedDate}의 PT 일지가 없습니다</h3>
        <p className="text-xs text-slate-500 max-w-sm mt-2 leading-relaxed font-mono">
          해당 날짜에는 배정되거나 진행된 퍼스널 트레이닝 기록이 비어 있습니다. 아래 버튼을 눌러 새 맞춤형 루틴을 등록해 보세요!
        </p>
        <button
          onClick={() => onAddSessionForDate(selectedDate)}
          className="mt-6 px-5 py-2.5 bg-lime-500 hover:bg-lime-400 font-bold text-slate-950 text-sm rounded-xl shadow-[0_4px_16px_rgba(132,204,22,0.25)] flex items-center gap-2 transition duration-200"
        >
          <Plus className="w-4 h-4 text-slate-950 stroke-[3]" />
          이 날짜에 새 PT 세션 생성
        </button>
      </div>
    );
  }

  // 1. Handlers for master properties
  const handleToggleCompleted = () => {
    const updated = { 
      ...session, 
      completed: !session.completed,
      // If we mark completed, auto complete all sets as well
      exercises: session.exercises.map(ex => ({
        ...ex,
        sets: ex.sets.map(set => ({ ...set, completed: !session.completed }))
      }))
    };
    onUpdateSession(updated);
  };

  // 2. Handlers for Notes in real time
  const handleSaveNotes = () => {
    const updated = { ...session, trainerFeedback: localFeedback };
    onUpdateSession(updated);
  };

  // 3. Handlers for Sets inside Exercises
  const handleSetFieldChange = (exerciseId: string, setNumber: number, field: 'weight' | 'reps', value: string) => {
    const parsedVal = value === "" ? 0 : parseInt(value);
    const updatedExercises = session.exercises.map(ex => {
      if (ex.id === exerciseId) {
        return {
          ...ex,
          sets: ex.sets.map(set => {
            if (set.setNumber === setNumber) {
              return { ...set, [field]: isNaN(parsedVal) ? 0 : parsedVal };
            }
            return set;
          })
        };
      }
      return ex;
    });

    onUpdateSession({ ...session, exercises: updatedExercises });
  };

  const handleToggleSetCompleted = (exerciseId: string, setNumber: number) => {
    const updatedExercises = session.exercises.map(ex => {
      if (ex.id === exerciseId) {
        return {
          ...ex,
          sets: ex.sets.map(set => {
            if (set.setNumber === setNumber) {
              return { ...set, completed: !set.completed };
            }
            return set;
          })
        };
      }
      return ex;
    });

    // Check if ALL sets are completed to auto-complete the session
    const allSetsAreFinished = updatedExercises.flatMap(ex => ex.sets).every(s => s.completed);

    onUpdateSession({ 
      ...session, 
      exercises: updatedExercises,
      completed: allSetsAreFinished
    });
  };

  const handleAddSet = (exerciseId: string) => {
    const updatedExercises = session.exercises.map(ex => {
      if (ex.id === exerciseId) {
        const lastSet = ex.sets[ex.sets.length - 1];
        const newSetNum = ex.sets.length > 0 ? lastSet.setNumber + 1 : 1;
        const newWeight = lastSet ? lastSet.weight : 10;
        const newReps = lastSet ? lastSet.reps : 12;
        return {
          ...ex,
          sets: [
            ...ex.sets,
            { setNumber: newSetNum, weight: newWeight, reps: newReps, completed: false }
          ]
        };
      }
      return ex;
    });
    onUpdateSession({ ...session, exercises: updatedExercises });
  };

  const handleRemoveSet = (exerciseId: string, setNumber: number) => {
    const updatedExercises = session.exercises.map(ex => {
      if (ex.id === exerciseId) {
        return {
          ...ex,
          sets: ex.sets
            .filter(set => set.setNumber !== setNumber)
            // Re-index sets
            .map((set, idx) => ({ ...set, setNumber: idx + 1 }))
        };
      }
      return ex;
    });
    onUpdateSession({ ...session, exercises: updatedExercises });
  };

  // 4. Exercise Add/Remove
  const handleAddExerciseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExerciseName.trim()) return;

    const newEx: Exercise = {
      id: `ex-added-${Math.random().toString(36).substring(2, 9)}`,
      name: newExerciseName.trim(),
      category: newExerciseCategory,
      sets: [
        { setNumber: 1, weight: 10, reps: 12, completed: false },
        { setNumber: 2, weight: 15, reps: 10, completed: false },
        { setNumber: 3, weight: 20, reps: 8, completed: false },
      ]
    };

    onUpdateSession({
      ...session,
      exercises: [...session.exercises, newEx]
    });

    setNewExerciseName("");
    setAddingExercise(false);
  };

  const handleRemoveExercise = (exId: string) => {
    onUpdateSession({
      ...session,
      exercises: session.exercises.filter(ex => ex.id !== exId)
    });
  };

  const categoryColor = (cat: string) => {
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
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6" id="session-detail-panel">
      {/* 1. Header Portion */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] bg-lime-500/10 text-lime-400 border border-lime-500/20 font-bold px-2 py-0.5 rounded-full font-mono uppercase">PT SESSION LOG</span>
            <span className="text-xs text-slate-500 font-mono font-semibold">{session.date}</span>
          </div>
          <h2 className="text-xl font-black text-slate-100 tracking-tight">{session.title}</h2>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className="flex items-center gap-1 text-[11px] font-mono font-medium text-slate-400 bg-slate-800 border border-slate-700/50 px-2 py-0.5 rounded">
              <Clock className="w-3 h-3 text-lime-400" />
              {session.duration}분 세션
            </span>
            {session.focus.map(f => (
              <span key={f} className={`text-[11px] font-bold px-2 py-0.5 rounded border ${categoryColor(f)}`}>
                #{f}
              </span>
            ))}
          </div>
        </div>

        {/* Master Complete Button and Rating */}
        <div className="flex items-center gap-3 self-start sm:self-center">
          <button
            onClick={handleToggleCompleted}
            className={`px-4 py-2 rounded-xl text-xs font-bold border flex items-center gap-2 transition duration-200 ${
              session.completed
                ? 'bg-lime-500/15 border-lime-500/40 text-lime-400'
                : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
            }`}
          >
            <Check className={`w-4 h-4 ${session.completed ? 'stroke-[3]' : ''}`} />
            {session.completed ? 'PT 완료됨' : 'PT 미완료'}
          </button>
          
          <button
            onClick={() => onDeleteSession(session.id)}
            className="p-2 sm:p-2.5 text-slate-500 hover:text-rose-400 bg-slate-800/60 hover:bg-rose-500/10 border border-slate-700/60 rounded-xl transition"
            title="일지 강제삭제"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Homework Checklist Widget */}
      {session.homework && (
        <div className="bg-pink-500/5 p-4 rounded-xl border border-pink-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition duration-200">
          <div className="space-y-1">
            <span className="text-[10px] bg-pink-500/10 text-pink-400 border border-pink-500/20 font-bold px-2 py-0.5 rounded-full font-mono uppercase tracking-wider">
              오늘의 PT 숙제
            </span>
            <h4 className="text-xs font-bold text-slate-200 mt-1 flex items-center gap-2">
              <span className="text-sm">📋</span> {session.homework}
            </h4>
          </div>
          <button
            onClick={() => {
              const updated = { 
                ...session, 
                homeworkCompleted: !session.homeworkCompleted 
              };
              onUpdateSession(updated);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold border flex items-center gap-2 transition duration-200 cursor-pointer ${
              session.homeworkCompleted
                ? 'bg-pink-500 text-slate-950 border-pink-400 font-black shadow-md'
                : 'bg-slate-950/60 hover:bg-slate-800 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Check className={`w-3.5 h-3.5 ${session.homeworkCompleted ? 'stroke-[3]' : ''}`} />
            {session.homeworkCompleted ? '숙제 완료!' : '숙제 미완료'}
          </button>
        </div>
      )}

      {/* 3. Detailed Exercise Set Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold font-mono uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Dumbbell className="w-4 h-4 text-lime-400" />
            세션 트레이닝 파트 ({session.exercises.length}개 운동)
          </span>
          <button
            onClick={() => setAddingExercise(!addingExercise)}
            className="text-xs font-bold text-lime-400 bg-lime-500/5 hover:bg-lime-500/15 border border-lime-500/20 px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            개별 운동 추가
          </button>
        </div>

        {/* Dynamic Inner Form to Add custom exercise */}
        {addingExercise && (
          <form onSubmit={handleAddExerciseSubmit} className="bg-slate-950/60 p-4 border border-slate-800 rounded-xl space-y-3">
            <h4 className="text-xs text-slate-300 font-bold">새 운동 항목 추가</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="예: 벤치 프레스, 데드리프트..."
                value={newExerciseName}
                onChange={(e) => setNewExerciseName(e.target.value)}
                className="col-span-1 sm:col-span-2 px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-lime-500"
                required
              />
              <select
                value={newExerciseCategory}
                onChange={(e) => setNewExerciseCategory(e.target.value as any)}
                className="px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-lime-500 font-mono"
              >
                <option value="하체">하체</option>
                <option value="등">등</option>
                <option value="가슴">가슴</option>
                <option value="어깨">어깨</option>
                <option value="팔">팔</option>
                <option value="코어">코어</option>
                <option value="유산소">유산소</option>
              </select>
            </div>
            <div className="flex items-center gap-2 justify-end">
              <button
                type="button"
                onClick={() => setAddingExercise(false)}
                className="px-3 py-1.5 text-[11px] text-slate-400 hover:text-slate-100"
              >
                취소
              </button>
              <button
                type="submit"
                className="px-3 py-1.5 text-[11px] bg-lime-400 hover:bg-lime-300 text-slate-950 font-bold rounded-lg shadow"
              >
                추가
              </button>
            </div>
          </form>
        )}

        {/* List of exercises inside this session */}
        <div className="space-y-4">
          {session.exercises.length === 0 ? (
            <div className="text-center p-6 border border-dashed border-slate-800 rounded-xl text-slate-500 text-xs font-mono">
              등록된 운동이 없습니다. 새로운 맞춤형 운동을 추가해 주세요!
            </div>
          ) : (
            session.exercises.map((ex) => (
              <div key={ex.id} className="bg-slate-950/20 border border-slate-800/70 p-4 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  {/* Name and Tag */}
                  <div className="flex items-center flex-wrap gap-2">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md border font-mono ${categoryColor(ex.category)}`}>
                      {ex.category}
                    </span>
                    {ex.targetDetail && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md border border-slate-800 bg-slate-950 text-slate-400 font-mono">
                        {ex.targetDetail}
                      </span>
                    )}
                    <h4 className="text-sm font-bold text-slate-200">{ex.name}</h4>
                  </div>
                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {ex.postureImage && (
                      <button
                        onClick={() => setShowGuides(prev => ({ ...prev, [ex.id]: !prev[ex.id] }))}
                        className={`p-1 flex items-center gap-1 text-[10px] font-bold rounded-lg px-2 py-1 transition-all cursor-pointer ${
                          showGuides[ex.id]
                            ? 'bg-lime-500 text-slate-950 hover:bg-lime-400 font-black shadow-sm'
                            : 'text-slate-400 hover:text-lime-400 bg-slate-900 hover:bg-slate-800 border border-slate-800'
                        }`}
                        title="자세 시각 가이드"
                      >
                        <Sparkles className="w-3 h-3" />
                        가이드
                      </button>
                    )}
                    <button
                      onClick={() => handleAddSet(ex.id)}
                      className="p-1 text-slate-400 hover:text-lime-400 transition"
                      title="세트 추가"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleRemoveExercise(ex.id)}
                      className="p-1 text-slate-600 hover:text-rose-400 transition"
                      title="이 운동 삭제"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Sub exercise note (e.g., target instruction) */}
                {ex.notes && (
                  <p className="text-[11px] text-slate-500 italic pl-1 font-mono">
                    💡 가이드: {ex.notes}
                  </p>
                )}

                {/* Aiden's visual posture guide preview panel */}
                {ex.postureImage && showGuides[ex.id] && (
                  <div className="bg-slate-950 rounded-xl border border-slate-800 p-3.5 flex flex-col md:flex-row gap-4 items-center">
                    <img
                      src={ex.postureImage}
                      alt={`${ex.name} 자세 가이드`}
                      className="w-full md:w-36 h-24 object-cover rounded-lg border border-slate-800 bg-slate-900"
                    />
                    <div className="text-xs text-slate-400 space-y-1.5 flex-1 w-full">
                      <p className="font-bold text-slate-200 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-lime-400" />
                        에이든(Aiden) 코치의 자세 포인트
                      </p>
                      <ul className="list-disc pl-4 space-y-0.5 font-mono text-[10.5px] leading-relaxed">
                        {ex.name.includes("스쿼트") && (
                          <>
                            <li>골반 힌지(Hinge)를 단단히 잠가 상체가 앞으로 쏠리지 않도록 방어합니다.</li>
                            <li>체중 저항 분산은 항상 발바닥 전체 접지 및 뒤꿈치 수평 방향에 실어줍니다.</li>
                            <li>일어설 때 복압 압축력을 단단히 쥔 락아웃 완성에 집중합니다.</li>
                          </>
                        )}
                        {ex.name.includes("데드리프트") && (
                          <>
                            <li>바벨 궤적이 정강이 전면부에 밀착되어 수직 상하강하도록 통제합니다.</li>
                            <li>견갑골 하강(숄더패킹) 상태를 유지하여 허리 보상 아치를 철저히 방지합니다.</li>
                            <li>무게중심은 뒤쪽 햄스트링 신장성 수축 방향에 맞춰 사선 밀어내기를 실행합니다.</li>
                          </>
                        )}
                        {ex.name.includes("플랭크") && (
                          <>
                            <li>뒤통수부터 등, 허리, 뒤꿈치까지 평평한 일직선 라인을 유지합니다.</li>
                            <li>팔꿈치는 어깨 밑 수직 고착하고 복부 안쪽 내외복사근 수축에 압력을 넣습니다.</li>
                            <li>골반이 밑으로 쳐질 시 요추 통증이 올 수 있으니 즉시 무릎을 대고 수정합니다.</li>
                          </>
                        )}
                        {ex.name.includes("랫풀다운") && (
                          <>
                            <li>양 그립을 넓게 쥐어 견갑 하강 수축을 유도해 승모 가입률을 최소화합니다.</li>
                            <li>당길 때 명치 아래 가슴을 충분히 하늘 방향으로 열어 일직선 수직 수축을 완료합니다.</li>
                            <li>전완의 힘보다는 팔꿈치 칼날로 바를 끌고 들어온다는 궤적 이미지에 집중합니다.</li>
                          </>
                        )}
                        {!ex.name.includes("스쿼트") && !ex.name.includes("데드리프트") && !ex.name.includes("플랭크") && !ex.name.includes("랫풀다운") && (
                          <>
                            <li>이완 시 동작 저항 속도를 통제하여 타겟 부위의 장력을 유지합니다.</li>
                            <li>수축 극대화 지점에서 1~2초간 호흡을 완전히 내쉬며 근수축을 지속시킵니다.</li>
                            <li>개인 훈련 시에도 항상 손목-팔꿈치 각도가 저항 방향과 수평인지 체크합니다.</li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Set-by-set input grids */}
                <div className="overflow-x-prevent">
                  <div className="grid grid-cols-12 gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono pb-1 border-b border-slate-800/60 mb-2 pl-2">
                    <div className="col-span-2">세트</div>
                    <div className="col-span-4">중량 (kg)</div>
                    <div className="col-span-4">횟수 / 시간</div>
                    <div className="col-span-2 text-center">완료</div>
                  </div>

                  <div className="space-y-1.5">
                    {ex.sets.map((set) => (
                      <div 
                        key={`${ex.id}-set-${set.setNumber}`}
                        className={`grid grid-cols-12 gap-1.5 items-center pl-2 py-1 rounded-lg transition-all duration-200 ${
                          set.completed ? 'bg-lime-500/5 border-l-2 border-lime-500' : 'hover:bg-slate-900/40 border-l-2 border-transparent'
                        }`}
                      >
                        <div className="col-span-2 text-xs font-black text-slate-400 font-mono pl-1">
                          {set.setNumber}
                        </div>
                        {/* Weight inputs */}
                        <div className="col-span-4 flex items-center gap-1">
                          <input
                            type="number"
                            min="0"
                            value={set.weight === 0 ? "" : set.weight}
                            placeholder="맨몸"
                            onChange={(e) => handleSetFieldChange(ex.id, set.setNumber, 'weight', e.target.value)}
                            className="w-16 px-1.5 py-1 text-xs text-center font-mono font-bold bg-slate-900 border border-slate-800 rounded text-slate-300 focus:outline-none focus:border-slate-600 focus:bg-slate-950 transition"
                          />
                          <span className="text-[10px] text-slate-500 font-mono font-medium">kg</span>
                        </div>
                        {/* Reps input */}
                        <div className="col-span-4 flex items-center gap-1">
                          <input
                            type="number"
                            min="1"
                            value={set.reps === 0 ? "" : set.reps}
                            onChange={(e) => handleSetFieldChange(ex.id, set.setNumber, 'reps', e.target.value)}
                            className="w-14 px-1.5 py-1 text-xs text-center font-mono font-bold bg-slate-900 border border-slate-800 rounded text-slate-300 focus:outline-none focus:border-slate-600 focus:bg-slate-950 transition"
                          />
                          <span className="text-[10px] text-slate-500 font-mono font-medium">
                            {ex.category === '유산소' ? '분' : '회'}
                          </span>
                        </div>
                        {/* Done toggle and delete set */}
                        <div className="col-span-2 flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleToggleSetCompleted(ex.id, set.setNumber)}
                            className={`w-5 h-5 rounded-md flex items-center justify-center border transition ${
                              set.completed
                                ? 'bg-lime-400 border-lime-400 text-slate-950'
                                : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-600'
                            }`}
                          >
                            <Check className="w-3 h-3 stroke-[3]" />
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => handleRemoveSet(ex.id, set.setNumber)}
                            className="text-slate-700 hover:text-rose-400 p-0.5"
                            title="이 세트 삭제"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 4. Trainer Feedback */}
      <div className="space-y-2 pt-4 border-t border-slate-800/80">
        <label className="text-xs font-black text-slate-400 font-mono uppercase tracking-wider flex items-center gap-1.5">
          <MessageSquare className="w-4 h-4 text-emerald-400" />
          트레이너 코칭 피드백 / 조언
        </label>
        <textarea
          value={localFeedback}
          onChange={(e) => setLocalFeedback(e.target.value)}
          placeholder="트레이너가 짚어준 주요 팁 및 극복 자세 기록..."
          rows={4}
          className="w-full text-xs font-medium leading-relaxed bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-300 focus:outline-none focus:border-slate-600 transition"
        />
        <div className="flex justify-end">
          <button
            onClick={handleSaveNotes}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-bold text-slate-200 flex items-center gap-1.5 transition"
          >
            <Save className="w-3.5 h-3.5" />
            피드백 저장
          </button>
        </div>
      </div>

    </div>
  );
}
