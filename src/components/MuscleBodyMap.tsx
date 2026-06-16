import React from 'react';
import { PTSession } from '../types';
import { Activity } from 'lucide-react';

interface Props { sessions: PTSession[] }

export default function MuscleBodyMap({ sessions }: Props) {
  // 카테고리별 누적 세트 수 집계
  const sets: Record<string, number> = {};
  sessions.forEach(s =>
    s.exercises.forEach(ex => {
      sets[ex.category] = (sets[ex.category] || 0) + ex.sets.length;
    })
  );
  const maxSets = Math.max(...Object.values(sets), 1);
  const total  = Object.values(sets).reduce((a, b) => a + b, 0) || 1;

  /** 세트 수에 따른 rgba 채우기 — 0이면 회색, 있으면 빨강 */
  const fill = (cat: string, mul = 1): string => {
    const n = sets[cat] || 0;
    if (n === 0) return 'rgba(203,213,225,0.35)';
    const a = Math.min(0.88, (0.18 + (n / maxSets) * 0.70) * mul);
    return `rgba(239,68,68,${a.toFixed(2)})`;
  };
  const strk = (cat: string): string =>
    (sets[cat] || 0) > 0 ? 'rgba(220,38,38,0.35)' : 'rgba(148,163,184,0.4)';

  const BASE = 'rgba(203,213,225,0.3)';
  const BSTRK = 'rgba(148,163,184,0.45)';

  const sorted = Object.entries(sets)
    .filter(([, v]) => v > 0)
    .sort(([, a], [, b]) => b - a);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">

      {/* 헤더 */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0">
            <Activity className="w-4 h-4 text-red-400" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-200 leading-none">운동 부위 인체도</h3>
            <p className="text-[10px] text-slate-500 mt-0.5 font-mono">붉을수록 누적 운동량 많음</p>
          </div>
        </div>
      </div>

      {/* SVG 인체도 — 전면 + 후면 */}
      <div className="flex justify-center">
        <svg viewBox="0 0 290 330" xmlns="http://www.w3.org/2000/svg"
          className="w-full max-w-xs">

          {/* ══════ 전면 (front, g centered x=65) ══════ */}
          <g>
            <text x="65" y="326" textAnchor="middle" fontSize="9.5"
              fill="#64748b" fontFamily="monospace" fontWeight="bold">전면</text>

            {/* 머리 */}
            <circle cx="65" cy="24" r="19" fill={BASE} stroke={BSTRK} strokeWidth="0.8" />
            {/* 목 */}
            <path d="M 58,42 L 72,42 L 74,57 L 56,57 Z" fill={BASE} stroke={BSTRK} strokeWidth="0.5" />

            {/* 어깨 — 왼쪽 */}
            <ellipse cx="31" cy="68" rx="19" ry="13"
              fill={fill('어깨')} stroke={strk('어깨')} strokeWidth="0.6" />
            {/* 어깨 — 오른쪽 */}
            <ellipse cx="99" cy="68" rx="19" ry="13"
              fill={fill('어깨')} stroke={strk('어깨')} strokeWidth="0.6" />

            {/* 가슴 */}
            <path d="M 42,57 Q 65,52 88,57 L 90,122 Q 65,126 40,122 Z"
              fill={fill('가슴')} stroke={strk('가슴')} strokeWidth="0.6" />

            {/* 코어 / 복근 */}
            <path d="M 40,124 Q 65,128 90,124 L 87,182 Q 65,186 43,182 Z"
              fill={fill('코어')} stroke={strk('코어')} strokeWidth="0.6" />

            {/* 골반 */}
            <path d="M 43,183 Q 65,187 87,183 L 91,208 Q 65,212 39,208 Z"
              fill={BASE} stroke={BSTRK} strokeWidth="0.5" />

            {/* 대퇴 (하체) — 왼쪽 */}
            <path d="M 39,208 L 63,208 L 60,283 L 33,283 Z"
              fill={fill('하체')} stroke={strk('하체')} strokeWidth="0.6" />
            {/* 대퇴 (하체) — 오른쪽 */}
            <path d="M 63,208 L 91,208 L 97,283 L 65,283 Z"
              fill={fill('하체')} stroke={strk('하체')} strokeWidth="0.6" />

            {/* 종아리 — 왼 */}
            <path d="M 35,285 L 58,285 L 55,316 L 30,316 Z"
              fill={fill('하체', 0.45)} stroke={strk('하체')} strokeWidth="0.5" />
            {/* 종아리 — 오른 */}
            <path d="M 67,285 L 97,285 L 100,316 L 68,316 Z"
              fill={fill('하체', 0.45)} stroke={strk('하체')} strokeWidth="0.5" />

            {/* 이두 (팔) — 왼쪽 상완 */}
            <path d="M 11,62 L 30,62 L 34,143 L 8,143 Z"
              fill={fill('팔')} stroke={strk('팔')} strokeWidth="0.6" />
            {/* 이두 (팔) — 오른쪽 상완 */}
            <path d="M 100,62 L 119,62 L 122,143 L 96,143 Z"
              fill={fill('팔')} stroke={strk('팔')} strokeWidth="0.6" />

            {/* 전완 — 왼 */}
            <path d="M 8,145 L 30,145 L 26,200 L 4,200 Z"
              fill={fill('팔', 0.55)} stroke={strk('팔')} strokeWidth="0.5" />
            {/* 전완 — 오른 */}
            <path d="M 100,145 L 122,145 L 126,200 L 104,200 Z"
              fill={fill('팔', 0.55)} stroke={strk('팔')} strokeWidth="0.5" />
          </g>

          {/* ══════ 후면 (back, translate +145) ══════ */}
          <g transform="translate(145,0)">
            <text x="65" y="326" textAnchor="middle" fontSize="9.5"
              fill="#64748b" fontFamily="monospace" fontWeight="bold">후면</text>

            {/* 머리 */}
            <circle cx="65" cy="24" r="19" fill={BASE} stroke={BSTRK} strokeWidth="0.8" />
            {/* 목 */}
            <path d="M 58,42 L 72,42 L 74,57 L 56,57 Z" fill={BASE} stroke={BSTRK} strokeWidth="0.5" />

            {/* 후면 어깨 — 왼 */}
            <ellipse cx="31" cy="68" rx="19" ry="13"
              fill={fill('어깨')} stroke={strk('어깨')} strokeWidth="0.6" />
            {/* 후면 어깨 — 오른 */}
            <ellipse cx="99" cy="68" rx="19" ry="13"
              fill={fill('어깨')} stroke={strk('어깨')} strokeWidth="0.6" />

            {/* 광배근 + 승모 (등) */}
            <path d="M 42,57 Q 65,52 88,57 L 90,145 Q 65,149 40,145 Z"
              fill={fill('등')} stroke={strk('등')} strokeWidth="0.6" />

            {/* 허리 하부 (등) */}
            <path d="M 40,147 Q 65,151 90,147 L 87,184 Q 65,188 43,184 Z"
              fill={fill('등', 0.6)} stroke={strk('등')} strokeWidth="0.5" />

            {/* 둔근 (하체) */}
            <path d="M 43,185 Q 65,189 87,185 L 91,210 Q 65,214 39,210 Z"
              fill={fill('하체')} stroke={strk('하체')} strokeWidth="0.6" />

            {/* 햄스트링 (하체) — 왼 */}
            <path d="M 39,210 L 63,210 L 60,283 L 33,283 Z"
              fill={fill('하체', 0.8)} stroke={strk('하체')} strokeWidth="0.6" />
            {/* 햄스트링 (하체) — 오른 */}
            <path d="M 63,210 L 91,210 L 97,283 L 65,283 Z"
              fill={fill('하체', 0.8)} stroke={strk('하체')} strokeWidth="0.6" />

            {/* 종아리 후면 — 왼 */}
            <path d="M 35,285 L 58,285 L 55,316 L 30,316 Z"
              fill={fill('하체', 0.45)} stroke={strk('하체')} strokeWidth="0.5" />
            {/* 종아리 후면 — 오른 */}
            <path d="M 67,285 L 97,285 L 100,316 L 68,316 Z"
              fill={fill('하체', 0.45)} stroke={strk('하체')} strokeWidth="0.5" />

            {/* 삼두 (팔) — 왼 상완 후면 */}
            <path d="M 11,62 L 30,62 L 34,143 L 8,143 Z"
              fill={fill('팔')} stroke={strk('팔')} strokeWidth="0.6" />
            {/* 삼두 (팔) — 오른 상완 후면 */}
            <path d="M 100,62 L 119,62 L 122,143 L 96,143 Z"
              fill={fill('팔')} stroke={strk('팔')} strokeWidth="0.6" />

            {/* 후면 전완 — 왼 */}
            <path d="M 8,145 L 30,145 L 26,200 L 4,200 Z"
              fill={fill('팔', 0.55)} stroke={strk('팔')} strokeWidth="0.5" />
            {/* 후면 전완 — 오른 */}
            <path d="M 100,145 L 122,145 L 126,200 L 104,200 Z"
              fill={fill('팔', 0.55)} stroke={strk('팔')} strokeWidth="0.5" />
          </g>

          {/* 가운데 구분선 */}
          <line x1="140" y1="5" x2="140" y2="318" stroke="rgba(148,163,184,0.15)" strokeWidth="1" strokeDasharray="4,4" />
        </svg>
      </div>

      {/* 범례: 부위별 세트 수 바 */}
      <div className="mt-4 pt-4 border-t border-slate-800/60 space-y-2">
        <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">부위별 누적 세트 수</p>
        {sorted.map(([cat, count]) => {
          const pct = Math.round((count / total) * 100);
          const barPct = Math.round((count / maxSets) * 100);
          const alpha = 0.18 + (count / maxSets) * 0.70;
          return (
            <div key={cat} className="flex items-center gap-2 text-[11px]">
              <span className="w-12 text-right font-mono font-bold text-slate-400 flex-shrink-0">{cat}</span>
              <div className="flex-1 h-2 bg-slate-800/60 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${barPct}%`, background: `rgba(239,68,68,${alpha.toFixed(2)})` }}
                />
              </div>
              <span className="w-16 font-mono text-slate-500 flex-shrink-0">
                {count}세트 <span className="text-slate-600">({pct}%)</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
