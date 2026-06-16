import React, { useState } from 'react';
import { PTSession } from '../types';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, CheckCircle2 } from 'lucide-react';

interface CalendarViewProps {
  sessions: PTSession[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

export default function CalendarView({ sessions, selectedDate, onSelectDate }: CalendarViewProps) {
  // Current calendar view year & month. Default to the current month in our dataset: June 2026 (2026-06)
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(6); // 1-12

  const months = [
    { value: 12, label: '2025년 12월' },
    { value: 1, label: '2026년 1월' },
    { value: 2, label: '2026년 2월' },
    { value: 3, label: '2026년 3월' },
    { value: 4, label: '2026년 4월' },
    { value: 5, label: '2026년 5월' },
    { value: 6, label: '2026년 6월' },
  ];

  const handlePrevMonth = () => {
    if (currentYear === 2025 && currentMonth === 12) return;
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(2025);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentYear === 2026 && currentMonth === 6) return;
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(2026);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Get total days in currentMonth/currentYear
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  // Get weekday of the 1st day of the month (0 = Sun, 1 = Mon, ..., 6 = Sat)
  const getFirstDayOfMonth = (year: number, month: number) => {
    const day = new Date(year, month - 1, 1).getDay();
    // Re-align so Monday is 0, Sunday is 6
    return day === 0 ? 6 : day - 1;
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayIndex = getFirstDayOfMonth(currentYear, currentMonth);

  // Create dates array
  const calendarDays: { dateString: string; dayNum: number; isCurrentMonth: boolean }[] = [];
  
  // Fill leading empty days from previous month
  const prevMonthYear = currentMonth === 1 ? currentYear - 1 : currentYear;
  const prevMonthVal = currentMonth === 1 ? 12 : currentMonth - 1;
  const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonthVal);
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const d = daysInPrevMonth - i;
    const dateStr = `${prevMonthYear}-${String(prevMonthVal).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    calendarDays.push({ dateString: dateStr, dayNum: d, isCurrentMonth: false });
  }

  // Fill current month days
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    calendarDays.push({ dateString: dateStr, dayNum: d, isCurrentMonth: true });
  }

  // Fill trailing days for a full grid of 42 (6 weeks) or 35 cells
  const remaining = calendarDays.length <= 35 ? 35 - calendarDays.length : 42 - calendarDays.length;
  const nextMonthYear = currentMonth === 12 ? currentYear + 1 : currentYear;
  const nextMonthVal = currentMonth === 12 ? 1 : currentMonth + 1;
  for (let d = 1; d <= remaining; d++) {
    const dateStr = `${nextMonthYear}-${String(nextMonthVal).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    calendarDays.push({ dateString: dateStr, dayNum: d, isCurrentMonth: false });
  }

  // Find session for a given date
  const getSessionForDate = (dateStr: string) => {
    return sessions.find(s => s.date === dateStr);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl transition-all duration-300 hover:border-slate-700" id="pt-calendar-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-lime-400" />
          <h2 className="text-lg font-bold text-slate-100 tracking-tight">PT 전용 캘린더</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevMonth}
            disabled={currentYear === 2025 && currentMonth === 12}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-100 disabled:opacity-30 disabled:pointer-events-none transition"
            title="이전 달"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm font-semibold text-slate-200 min-w-[90px] text-center font-mono">
            {currentYear}. {String(currentMonth).padStart(2, '0')}
          </span>
          <button
            onClick={handleNextMonth}
            disabled={currentYear === 2026 && currentMonth === 6}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-100 disabled:opacity-30 disabled:pointer-events-none transition"
            title="다음 달"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 text-center text-xs font-semibold text-slate-500 mb-2 font-mono">
        <div>월</div>
        <div>화</div>
        <div>수</div>
        <div>목</div>
        <div>금</div>
        <div className="text-blue-400">토</div>
        <div className="text-rose-400">일</div>
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((cell, idx) => {
          const session = getSessionForDate(cell.dateString);
          const isSelected = selectedDate === cell.dateString;
          
          let cellBg = "bg-transparent";
          let borderStyle = "border border-transparent";
          let textColor = cell.isCurrentMonth ? "text-slate-300" : "text-slate-600";
          
          if (session) {
            if (session.completed) {
              cellBg = isSelected 
                ? "bg-lime-500 text-slate-950 font-bold" 
                : "bg-lime-500/15 hover:bg-lime-500/25 text-lime-400 font-semibold";
              borderStyle = isSelected 
                ? "border-2 border-lime-300" 
                : "border border-lime-500/40";
            } else {
              // Plannned (incomplete) session (e.g. 2026-06-19)
              cellBg = isSelected 
                ? "bg-teal-500 text-slate-950 font-bold" 
                : "bg-teal-500/15 hover:bg-teal-500/25 text-teal-400 font-semibold";
              borderStyle = isSelected 
                ? "border-2 border-teal-300" 
                : "border border-teal-500/40";
            }
          } else if (isSelected) {
            cellBg = "bg-slate-800 text-slate-100";
            borderStyle = "border border-slate-600";
          } else {
            // normal day
            cellBg = "hover:bg-slate-800/50";
          }

          const weekdayIndex = idx % 7;
          let isWeekendText = "";
          if (!session && cell.isCurrentMonth) {
            if (weekdayIndex === 5) isWeekendText = "text-blue-400/80";
            if (weekdayIndex === 6) isWeekendText = "text-rose-400/80";
          }

          return (
            <button
              key={`${cell.dateString}-${idx}`}
              onClick={() => onSelectDate(cell.dateString)}
              className={`h-10 rounded-xl flex flex-col items-center justify-center relative text-xs transition duration-200 ${cellBg} ${borderStyle} ${textColor} ${isWeekendText}`}
            >
              <span className="font-mono">{cell.dayNum}</span>
              {session && (
                <span className={`w-1.5 h-1.5 rounded-full mt-0.5 ${
                  session.completed 
                    ? (isSelected ? 'bg-slate-950' : 'bg-lime-400') 
                    : (isSelected ? 'bg-slate-950' : 'bg-teal-400')
                }`} />
              )}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-800/60 text-[11px] text-slate-400 font-mono">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-lime-500/20 border border-lime-500/50" />
          <span>PT 이수 완료</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-teal-500/20 border border-teal-500/50" />
          <span>PT 예정/미완료</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
          <span>일반 일지</span>
        </div>
      </div>
    </div>
  );
}
