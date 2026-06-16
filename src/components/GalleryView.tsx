import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ImageIcon, Calendar, Clock } from 'lucide-react';

interface GalleryImage {
  filename: string;
  src: string;
  date: string;   // YYYY-MM-DD
  time: string;   // HH:MM
  label: string;  // 사람이 읽기 좋은 날짜 표시
}

// KakaoTalk_YYYYMMDD_HHmmssSSS.jpg → date/time 파싱
function parseKakaoFilename(filename: string): { date: string; time: string; label: string } {
  const match = filename.match(/KakaoTalk_(\d{4})(\d{2})(\d{2})_(\d{2})(\d{2})(\d{2})/);
  if (!match) return { date: '?', time: '?', label: filename };
  const [, year, month, day, hh, mm] = match;
  const date = `${year}-${month}-${day}`;
  const time = `${hh}:${mm}`;
  const label = `${parseInt(year)}년 ${parseInt(month)}월 ${parseInt(day)}일`;
  return { date, time, label };
}

// 이미지 파일 목록 — public/image 폴더에 있는 파일들
const IMAGE_FILES = [
  'KakaoTalk_20260615_024121747.jpg',
  'KakaoTalk_20260615_024125332.jpg',
  'KakaoTalk_20260615_024126777.jpg',
  'KakaoTalk_20260615_024127751.jpg',
  'KakaoTalk_20260615_024128620.jpg',
  'KakaoTalk_20260615_024130054.jpg',
  'KakaoTalk_20260615_030005419.jpg',
  'KakaoTalk_20260615_030006739.jpg',
  'KakaoTalk_20260615_030007493.jpg',
  'KakaoTalk_20260615_200417842.jpg',
];

const IMAGES: GalleryImage[] = IMAGE_FILES.map(f => ({
  filename: f,
  src: `/image/${f}`,
  ...parseKakaoFilename(f),
}));

export default function GalleryView() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  // 그룹: 날짜별
  const grouped = IMAGES.reduce<Record<string, GalleryImage[]>>((acc, img) => {
    if (!acc[img.date]) acc[img.date] = [];
    acc[img.date].push(img);
    return acc;
  }, {});

  const sortedDates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  // lightbox 키보드 내비게이션
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (lightboxIdx === null) return;
    if (e.key === 'ArrowRight') setLightboxIdx(i => (i! + 1) % IMAGES.length);
    if (e.key === 'ArrowLeft')  setLightboxIdx(i => (i! - 1 + IMAGES.length) % IMAGES.length);
    if (e.key === 'Escape')     setLightboxIdx(null);
  }, [lightboxIdx]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  const current = lightboxIdx !== null ? IMAGES[lightboxIdx] : null;

  return (
    <div className="space-y-8">

      {/* 헤더 */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-md shadow-violet-500/20 flex-shrink-0">
          <ImageIcon className="w-4 h-4 text-white stroke-[2.5]" />
        </div>
        <div>
          <h2 className="text-base font-black text-slate-100 tracking-tight">PT 일지 갤러리</h2>
          <p className="text-[11px] text-slate-500 mt-0.5">총 {IMAGES.length}장 · 날짜별 PT 현장 사진</p>
        </div>
      </div>

      {/* 날짜별 그룹 */}
      {sortedDates.map(date => {
        const imgs = grouped[date];
        const label = imgs[0].label;

        return (
          <div key={date} className="space-y-3">
            {/* 날짜 라벨 */}
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-violet-400" />
              <span className="text-xs font-black text-slate-300 font-mono">{label}</span>
              <span className="text-[10px] text-slate-600 font-mono">({imgs.length}장)</span>
              <div className="flex-1 h-px bg-slate-800" />
            </div>

            {/* 그리드 */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {imgs.map((img, localIdx) => {
                const globalIdx = IMAGES.findIndex(i => i.filename === img.filename);
                return (
                  <button
                    key={img.filename}
                    onClick={() => setLightboxIdx(globalIdx)}
                    className="group relative aspect-square rounded-xl overflow-hidden bg-slate-800 border border-slate-800 hover:border-violet-500/40 transition-all duration-200 focus:outline-none"
                  >
                    <img
                      src={img.src}
                      alt={`PT 일지 ${img.date} ${img.time}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    {/* 호버 오버레이 */}
                    <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/30 transition-all duration-200 flex items-end p-2">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[10px] font-mono font-bold text-white bg-slate-950/60 px-1.5 py-0.5 rounded">
                        <Clock className="w-2.5 h-2.5 inline mr-0.5" />
                        {img.time}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* 라이트박스 */}
      {current && lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxIdx(null)}
        >
          {/* 닫기 */}
          <button
            onClick={() => setLightboxIdx(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* 이전 */}
          <button
            onClick={e => { e.stopPropagation(); setLightboxIdx((lightboxIdx - 1 + IMAGES.length) % IMAGES.length); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* 이미지 */}
          <div onClick={e => e.stopPropagation()} className="flex flex-col items-center gap-3 max-w-2xl w-full">
            <img
              src={current.src}
              alt={current.filename}
              className="max-h-[75vh] max-w-full rounded-2xl object-contain shadow-2xl"
            />
            <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-violet-400" />
                {current.label}
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-700" />
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-violet-400" />
                {current.time}
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-700" />
              <span className="text-slate-600">{lightboxIdx + 1} / {IMAGES.length}</span>
            </div>
          </div>

          {/* 다음 */}
          <button
            onClick={e => { e.stopPropagation(); setLightboxIdx((lightboxIdx + 1) % IMAGES.length); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}

    </div>
  );
}
