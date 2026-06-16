import React, { useState } from 'react';
import { PTSession, Exercise } from '../types';
import { X, Calendar as CalendarIcon, Clock, ShieldAlert, ListPlus, CheckSquare } from 'lucide-react';

interface AddSessionDialogueProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSession: (newSession: PTSession) => void;
  defaultDate: string;
}

export default function AddSessionDialogue({ isOpen, onClose, onAddSession, defaultDate }: AddSessionDialogueProps) {
  const [date, setDate] = useState(defaultDate);
  const [title, setTitle] = useState("개인 피지컬 증강 코어 트레이닝");
  const [duration, setDuration] = useState(60);
  const [focus, setFocus] = useState<string[]>(["하체"]);
  const [selectedPreset, setSelectedPreset] = useState<string>("Preset1");

  if (!isOpen) return null;

  const focusOptions = ["하체", "가슴", "등", "어깨", "팔", "코어", "유산소"];

  const handleToggleFocus = (f: string) => {
    if (focus.includes(f)) {
      setFocus(focus.filter(item => item !== f));
    } else {
      setFocus([...focus, f]);
    }
  };

  // Pre-made routine presets mapping
  const buildPresetExercises = (preset: string): Exercise[] => {
    switch (preset) {
      case "Preset1": // Lower Limit
        return [
          {
            id: `added-${Math.random()}`,
            name: "바벨 스쿼트",
            category: "하체",
            sets: [
              { setNumber: 1, weight: 30, reps: 15, completed: false },
              { setNumber: 2, weight: 40, reps: 12, completed: false },
              { setNumber: 3, weight: 50, reps: 10, completed: false }
            ]
          },
          {
            id: `added-${Math.random()}`,
            name: "레그 익스텐션",
            category: "하체",
            sets: [
              { setNumber: 1, weight: 15, reps: 15, completed: false },
              { setNumber: 2, weight: 20, reps: 12, completed: false },
              { setNumber: 3, weight: 25, reps: 12, completed: false }
            ]
          }
        ];
      case "Preset2": // Back
        return [
          {
            id: `added-${Math.random()}`,
            name: "랫 풀 다운",
            category: "등",
            sets: [
              { setNumber: 1, weight: 25, reps: 15, completed: false },
              { setNumber: 2, weight: 30, reps: 12, completed: false },
              { setNumber: 3, weight: 35, reps: 10, completed: false }
            ]
          },
          {
            id: `added-${Math.random()}`,
            name: "시티드 로우",
            category: "등",
            sets: [
              { setNumber: 1, weight: 20, reps: 15, completed: false },
              { setNumber: 2, weight: 25, reps: 12, completed: false },
              { setNumber: 3, weight: 30, reps: 10, completed: false }
            ]
          }
        ];
      case "Preset3": // Chest
        return [
          {
            id: `added-${Math.random()}`,
            name: "덤벨 인클라인 프레스",
            category: "가슴",
            sets: [
              { setNumber: 1, weight: 8, reps: 15, completed: false },
              { setNumber: 2, weight: 10, reps: 12, completed: false },
              { setNumber: 3, weight: 12, reps: 10, completed: false }
            ]
          },
          {
            id: `added-${Math.random()}`,
            name: "펙 덱 플라이",
            category: "가슴",
            sets: [
              { setNumber: 1, weight: 15, reps: 15, completed: false },
              { setNumber: 2, weight: 20, reps: 12, completed: false },
              { setNumber: 3, weight: 20, reps: 12, completed: false }
            ]
          }
        ];
      case "Preset4": // Shoulder
        return [
          {
            id: `added-${Math.random()}`,
            name: "덤벨 숄더 프레스",
            category: "어깨",
            sets: [
              { setNumber: 1, weight: 6, reps: 15, completed: false },
              { setNumber: 2, weight: 8, reps: 12, completed: false },
              { setNumber: 3, weight: 10, reps: 10, completed: false }
            ]
          },
          {
            id: `added-${Math.random()}`,
            name: "사이드 레터럴 레이즈",
            category: "어깨",
            sets: [
              { setNumber: 1, weight: 3, reps: 20, completed: false },
              { setNumber: 2, weight: 4, reps: 15, completed: false },
              { setNumber: 3, weight: 4, reps: 15, completed: false }
            ]
          }
        ];
      case "Preset5": // Cardio
        return [
          {
            id: `added-${Math.random()}`,
            name: "버피 테스트",
            category: "유산소",
            sets: [
              { setNumber: 1, weight: 0, reps: 15, completed: false },
              { setNumber: 2, weight: 0, reps: 15, completed: false },
              { setNumber: 3, weight: 0, reps: 15, completed: false }
            ]
          },
          {
            id: `added-${Math.random()}`,
            name: "트레드밀 인터벌 러닝",
            category: "유산소",
            sets: [
              { setNumber: 1, weight: 8, reps: 15, completed: false }
            ]
          }
        ];
      case "Custom":
      default:
        return [];
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) return;

    // Determine default titles from presets if title was generic
    let finalTitle = title;
    if (title === "개인 피지컬 증강 코어 트레이닝") {
      if (selectedPreset === "Preset1") finalTitle = "하체 스쿼트 증강 코어 트레이닝";
      if (selectedPreset === "Preset2") finalTitle = "광배 프레임 강화 상체 운동";
      if (selectedPreset === "Preset3") finalTitle = "대흉근 수평내전 볼륨 운동";
      if (selectedPreset === "Preset4") finalTitle = "삼각근 분리도 극대화 숄더 운동";
      if (selectedPreset === "Preset5") finalTitle = "서킷 기반 고강도 다이어트 유산소";
    }

    const presetExercises = buildPresetExercises(selectedPreset);

    const newSession: PTSession = {
      id: Math.random().toString(36).substring(2, 9),
      date,
      title: finalTitle,
      focus: focus.length > 0 ? focus : ["전신"],
      duration,
      trainerFeedback: "추가된 세션의 맞춤 가이드는 PT 일정이 종료되면 작성됩니다. 자세 유지와 호흡법에 유의하세요!",
      userNotes: "새롭게 계획한 트레이닝 세션입니다. 컨디션을 조절하며 목표 세트를 완수해 보세요.",
      exercises: presetExercises,
      completed: false
    };

    onAddSession(newSession);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in" id="add-session-overlay">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative space-y-4">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 p-1 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
          <ListPlus className="w-5 h-5 text-lime-400" />
          <h3 className="text-base font-black text-slate-100">새 PT 매칭 및 운동루틴 일지 생성</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Date and Duration */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-slate-400 font-bold font-mono">기록 날짜 <span className="text-rose-500">*</span></label>
              <div className="relative">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-slate-950 text-slate-100 px-3 py-2 border border-slate-800 rounded-xl focus:outline-none focus:border-slate-700 font-mono"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 font-bold font-mono">트레이닝 시간 (분)</label>
              <input
                type="number"
                min="10"
                max="240"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value))}
                className="w-full bg-slate-950 text-slate-100 px-3 py-2 border border-slate-800 rounded-xl focus:outline-none focus:border-slate-700 font-mono"
              />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-1">
            <label className="text-slate-400 font-bold">주요 타겟 세션 제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-950 text-slate-100 px-3 py-2 border border-slate-800 rounded-xl focus:outline-none focus:border-slate-700"
              placeholder="예: 백 벤드 하체 및 대둔근 대포 각인"
              required
            />
          </div>

          {/* Preset templates */}
          <div className="space-y-1.5">
            <label className="text-slate-400 font-bold flex items-center gap-1">
              <CheckSquare className="w-4 h-4 text-lime-400" />
              추천 프리셋 운동 루틴 불러오기
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => { setSelectedPreset("Preset1"); setFocus(["하체"]); }}
                className={`p-2 rounded-xl border text-left transition font-medium ${
                  selectedPreset === "Preset1" 
                    ? 'bg-lime-500/10 border-lime-500 text-lime-400 font-bold' 
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400'
                }`}
              >
                <div>하체 웨이트</div>
                <span className="text-[9px] text-slate-500 font-mono">스쿼트, 레그익스텐션</span>
              </button>
              <button
                type="button"
                onClick={() => { setSelectedPreset("Preset2"); setFocus(["등"]); }}
                className={`p-2 rounded-xl border text-left transition font-medium ${
                  selectedPreset === "Preset2" 
                    ? 'bg-lime-500/10 border-lime-500 text-lime-400 font-bold' 
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400'
                }`}
              >
                <div>광배 강화 (등)</div>
                <span className="text-[9px] text-slate-500 font-mono">랫풀다운, 시티드로우</span>
              </button>
              <button
                type="button"
                onClick={() => { setSelectedPreset("Preset3"); setFocus(["가슴"]); }}
                className={`p-2 rounded-xl border text-left transition font-medium ${
                  selectedPreset === "Preset3" 
                    ? 'bg-lime-500/10 border-lime-500 text-lime-400 font-bold' 
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400'
                }`}
              >
                <div>대흉근 집중 (가슴)</div>
                <span className="text-[9px] text-slate-500 font-mono">덤벨인클라인, 플라이</span>
              </button>
              <button
                type="button"
                onClick={() => { setSelectedPreset("Preset4"); setFocus(["어깨"]); }}
                className={`p-2 rounded-xl border text-left transition font-medium ${
                  selectedPreset === "Preset4" 
                    ? 'bg-lime-500/10 border-lime-500 text-lime-400 font-bold' 
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400'
                }`}
              >
                <div>구형 삼각근 (어깨)</div>
                <span className="text-[9px] text-slate-500 font-mono">숄더프레스, 사레레</span>
              </button>
              <button
                type="button"
                onClick={() => { setSelectedPreset("Preset5"); setFocus(["유산소"]); }}
                className={`p-2 rounded-xl border text-left transition font-medium ${
                  selectedPreset === "Preset5" 
                    ? 'bg-lime-500/10 border-lime-500 text-lime-400 font-bold' 
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400'
                }`}
              >
                <div>전신 버닝 (유산소)</div>
                <span className="text-[9px] text-slate-500 font-mono">버피테스트, 러닝머신</span>
              </button>
              <button
                type="button"
                onClick={() => { setSelectedPreset("Custom"); setFocus(["전신"]); }}
                className={`p-2 rounded-xl border text-left transition font-medium ${
                  selectedPreset === "Custom" 
                    ? 'bg-lime-500/10 border-lime-500 text-lime-400 font-bold' 
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400'
                }`}
              >
                <div>빈 운동 슬롯</div>
                <span className="text-[9px] text-slate-500 font-mono">스스로 일지 구성하기</span>
              </button>
            </div>
          </div>

          {/* Focus Targets (Multi select badges) */}
          <div className="space-y-1">
            <label className="text-slate-400 font-bold">주요 자극 부위 다중 선택</label>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {focusOptions.map(f => {
                const active = focus.includes(f);
                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() => handleToggleFocus(f)}
                    className={`px-3 py-1.5 rounded-full border text-[10px] font-bold transition ${
                      active 
                        ? 'bg-lime-500/10 border-lime-400/80 text-lime-400' 
                        : 'bg-slate-950/50 border-slate-800 text-slate-500 hover:border-slate-700'
                    }`}
                  >
                    #{f}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-2 pt-4 justify-end border-t border-slate-800/80">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 hover:bg-slate-800 rounded-xl font-bold text-slate-400 hover:text-slate-200 transition"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold rounded-xl shadow-lg transition"
            >
              PT 일지 바로 저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
