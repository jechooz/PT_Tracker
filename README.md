# 🏋️ PT Tracker

> 개인 트레이닝 세션을 기록·분석·시각화하는 풀스택 웹 애플리케이션

[![Vercel](https://img.shields.io/badge/Vercel-배포완료-black?logo=vercel)](https://pt-tracker-ivory.vercel.app)
[![Supabase](https://img.shields.io/badge/Supabase-DB연동-3ECF8E?logo=supabase)](https://supabase.com)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)

**🔗 라이브 데모:** [https://pt-tracker-ivory.vercel.app](https://pt-tracker-ivory.vercel.app)

---

## 📱 화면 구성

### 1. 저널 (Journal)
- **PT 전용 캘린더** — 운동한 날짜를 한눈에 파악, 날짜 클릭으로 세션 전환
- **세션 상세 카드** — 운동 종목·세트·중량·횟수 전체 기록 열람
- **트레이너 피드백** — 코칭 내용 편집 및 저장
- **숙제 체크리스트** — 다음 세션까지 해야 할 과제 완료 여부 추적
- **전체 타임라인** (데스크탑) — 월별로 묶인 전체 세션 목록 사이드바

### 2. 운동도감 (Exercise Directory)
- **운동 카드 그리드** — 수행한 모든 동작을 상체·하체·코어·기타 카테고리로 분류
- **실시간 검색** — 동작명·자극 부위 키워드로 즉시 필터링
- **누적 히스토리** — 동작별 회차·중량 성장 히스토리 시계열 조회
- **자세 가이드 이미지** — 스쿼트·데드리프트·플랭크·랫풀다운 포스처 팁

### 3. 갤러리 (Gallery)
- **PT 사진 그리드** — KakaoTalk 저장 사진을 날짜 그룹으로 자동 분류 (2열→5열 반응형)
- **라이트박스 뷰어** — 클릭 시 전체화면 확대, 키보드 ←→ 탐색, ESC·배경 클릭 닫기

### 4. 통계 (Stats)
- **월별 세션 횟수** 바 차트
- **부위별 운동 빈도** 분포 시각화
- **누적 볼륨 트렌드** (세트 수 기준)

### 5. AI 코치 (Coach)
- **세션 데이터 기반 인사이트** — 최근 트레이닝 패턴 분석
- **약점 부위 파악** 및 다음 세션 추천

---

## ⚙️ 주요 기능

| 기능 | 설명 |
|------|------|
| **실시간 DB 동기화** | Supabase PostgreSQL — 모든 기기에서 동일 데이터 접근 |
| **PT 세션 CRUD** | 세션 추가·수정·삭제, 운동 종목·세트 상세 편집 |
| **모바일 최적화** | 하단 고정 내비게이션, 터치 친화적 UI |
| **반응형 레이아웃** | 모바일 단일 컬럼 → 데스크탑 12열 그리드 자동 전환 |
| **데이터 초기화** | 오리지널 PT 기록으로 원클릭 복원 |

---

## 🛠 기술 스택

### Frontend
- **React 18** + **TypeScript** — 컴포넌트 기반 UI
- **Vite** — 빌드 툴 및 개발 서버
- **Tailwind CSS v4** — `@theme` CSS 변수 기반 커스텀 테마
- **Lucide React** — 아이콘

### Backend / Infra
- **Supabase** — PostgreSQL DB, RLS(Row Level Security) 적용
- **Vercel** — GitHub 연동 자동 배포 (CI/CD)

### 아키텍처
```
GitHub (main 브랜치) → Vercel (자동 빌드·배포) → 사용자 브라우저
                                                          ↕
                                               Supabase PostgreSQL
```

---

## 🗂 프로젝트 구조

```
src/
├── components/
│   ├── CalendarView.tsx       # PT 캘린더
│   ├── SessionDetail.tsx      # 세션 상세 + 피드백 편집
│   ├── ExerciseDirectory.tsx  # 운동도감 + 검색/필터
│   ├── GalleryView.tsx        # 사진 갤러리 + 라이트박스
│   ├── StatsDashboard.tsx     # 통계 차트
│   ├── CoachInsight.tsx       # AI 코치 패널
│   └── AddSessionDialogue.tsx # 세션 추가 다이얼로그
├── data/
│   └── initialData.ts         # 초기 PT 세션 시드 데이터
├── lib/
│   └── supabase.ts            # Supabase 클라이언트
├── types.ts                   # TypeScript 인터페이스
├── App.tsx                    # 라우팅 + 전역 상태
└── index.css                  # Tailwind @theme 커스텀 변수
```

---

## 🚀 로컬 실행

```bash
# 1. 저장소 클론
git clone https://github.com/jechooz/PT_Tracker.git
cd PT_Tracker

# 2. 패키지 설치
npm install

# 3. 환경변수 설정
cp .env.example .env
# .env 파일에 Supabase URL과 anon key 입력

# 4. 개발 서버 실행
npm run dev
```

### 환경변수 (.env)
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

---

## 🗄 Supabase 테이블 스키마

```sql
create table pt_sessions (
  id                 text primary key,
  date               text not null,
  title              text default '',
  focus              text[] default '{}',
  exercises          jsonb default '[]',
  duration           int default 0,
  trainer_feedback   text default '',
  user_notes         text default '',
  score              int default 3,
  homework           text default '',
  homework_completed boolean default false,
  completed          boolean default true,
  created_at         timestamptz default now()
);
```

---

## 📄 License

MIT
