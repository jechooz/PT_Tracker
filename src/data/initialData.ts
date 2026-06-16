import { PTSession, Exercise, ExerciseSet } from '../types';

// Helper to generate unique IDs
const generateId = () => Math.random().toString(36).substring(2, 9);

interface RawExercise {
  name: string;
  category: '하체' | '가슴' | '등' | '어깨' | '팔' | '코어' | '유산소' | '전신';
  targetDetail?: string;
  postureImage?: string;
  sets: { weight: number; reps: number; completed: boolean }[];
  notes?: string;
}

interface RawSession {
  date: string;
  title: string;
  focus: string[];
  trainerFeedback: string;
  userNotes: string;
  homework?: string;
  homeworkCompleted?: boolean;
  score?: number;
  exercises: RawExercise[];
}

const rawSessions: RawSession[] = [
  // ================= 2025년 12월 =================
  {
    date: "2025-12-30",
    title: "플랭크 및 등·하부 견갑골 안정화 트레이닝",
    focus: ["코어", "등"],
    trainerFeedback: "플랭크 수행 시 무릎을 대고 복압 제어 위주로 연습했습니다. Y-T-W 레이즈 동작 중 날개뼈를 하강하여 하부 승모근에 자극이 오는 포인트를 아주 잘 잡아주셨습니다. 당기는 감각을 몸에 서서히 체득시키는 단계입니다.",
    userNotes: "첫 PT 수업. 몸이 굳어있어 스트레칭할 때 뻐근했지만 날개뼈 주변이 많이 풀린 느낌이 든다. 플랭크 동작 시 생각보다 부하가 많이 느껴진다.",
    homework: "폼롤러 및 스트레칭",
    homeworkCompleted: true,
    score: 4,
    exercises: [
      {
        name: "플랭크 원레그리프트",
        category: "코어",
        targetDetail: "코어 안정성",
        postureImage: "/postures/plank_posture_tip.png",
        sets: [{ weight: 0, reps: 5, completed: true }],
        notes: "무릎 내리고 진행"
      },
      {
        name: "Y-T-W 레이즈",
        category: "등",
        targetDetail: "견갑 하부",
        sets: [
          { weight: 0, reps: 10, completed: true },
          { weight: 0, reps: 10, completed: true },
          { weight: 0, reps: 10, completed: true },
          { weight: 0, reps: 10, completed: true }
        ],
        notes: "날개뼈 아래로 내리기, 팔 전체 회전, 등근육 움직임에 집중"
      },
      {
        name: "랫풀다운 (광배근)",
        category: "등",
        targetDetail: "광배근",
        postureImage: "/postures/latpulldown_posture_tip.png",
        sets: [
          { weight: 5, reps: 15, completed: true },
          { weight: 10, reps: 15, completed: true }
        ],
        notes: "당겼을 때 아래로 꽉 수축하기!"
      }
    ]
  },
  {
    date: "2025-12-31",
    title: "폼롤러 릴리즈 및 광배근·둔근 타겟 트레이닝",
    focus: ["등", "하체"],
    trainerFeedback: "아웃타이 시 골반을 똑바로 세우고 고정하여 바깥쪽 둔근을 고립해서 잘 자극했습니다. 롱풀 시 당길 때 상체가 너무 굽지 않도록 가슴을 밀어내는 자세를 복습하세요.",
    userNotes: "폼롤러로 근막 이완을 꼼꼼하게 하니 가동 범위가 조금 더 잘 나오는 것 같다. 아웃타이는 엉덩이 측면이 완전히 타는 기분이다.",
    homework: "폼롤러 및 스트레칭 후 전체 복습!!",
    homeworkCompleted: true,
    score: 5,
    exercises: [
      {
        name: "폼롤러 (상,하)",
        category: "전신",
        targetDetail: "상·하체 근막 이완",
        sets: [{ weight: 0, reps: 15, completed: true }],
        notes: "누운 상태 또는 앉은 상태에서 몸통 고정"
      },
      {
        name: "롱풀 (등)",
        category: "등",
        targetDetail: "광배근/능형근",
        sets: [
          { weight: 5, reps: 15, completed: true },
          { weight: 5, reps: 15, completed: true },
          { weight: 5, reps: 15, completed: true },
          { weight: 10, reps: 15, completed: true }
        ],
        notes: "아래로 당기고 가슴 내밀어주기"
      },
      {
        name: "아웃타이 (엉덩이)",
        category: "하체",
        targetDetail: "둔근 바깥쪽",
        sets: [
          { weight: 32.5, reps: 15, completed: true },
          { weight: 32.5, reps: 15, completed: true },
          { weight: 40, reps: 15, completed: true },
          { weight: 40, reps: 15, completed: true }
        ],
        notes: "골반 세워둔 상태로 고정, 바깥쪽 힙 자극"
      },
      {
        name: "체스트 프레스 머신",
        category: "가슴",
        targetDetail: "대흉근 중부",
        sets: [
          { weight: 5, reps: 12, completed: true },
          { weight: 5, reps: 12, completed: true }
        ],
        notes: "팔꿈치와 손목의 일직선 유지"
      }
    ]
  },

  // ================= 2026년 1월 =================
  {
    date: "2026-01-05",
    title: "시티드 굿모닝 및 힙힌지 가동성 확보",
    focus: ["하체", "가슴"],
    trainerFeedback: "허리에 저항 밴드를 감고 힙힌지의 전후 움직임 반동 궤적을 연습했습니다. 스미스 머신을 활용한 푸쉬업 시 복압을 잡고 몸통 일직선을 유지해 주세요.",
    userNotes: "스미스 푸쉬업할 때 코어가 흔들리지 않게 버티는 게 꽤 까다롭다. 힙힌지 시 골반이 접히는 느낌을 더 연습하겠다.",
    homework: "진통 없는 부위만 전체 복습!!",
    homeworkCompleted: true,
    score: 4,
    exercises: [
      {
        name: "시티드 굿모닝",
        category: "하체",
        targetDetail: "햄스트링/둔근 가동성",
        sets: [
          { weight: 0, reps: 20, completed: true },
          { weight: 0, reps: 20, completed: true },
          { weight: 0, reps: 20, completed: true },
          { weight: 0, reps: 20, completed: true }
        ],
        notes: "허리에 밴드 매고 상체 유지 (맨몸+밴드)"
      },
      {
        name: "스미스 스티프 데드리프트",
        category: "하체",
        targetDetail: "햄스트링/둔근",
        postureImage: "/postures/deadlift_posture_tip.png",
        sets: [
          { weight: 2.5, reps: 15, completed: true },
          { weight: 2.5, reps: 15, completed: true },
          { weight: 5, reps: 15, completed: true },
          { weight: 5, reps: 15, completed: true }
        ],
        notes: "무릎 뒤로 갈 때 안쪽 골반선 버티기"
      },
      {
        name: "힙힌지 연습",
        category: "하체",
        targetDetail: "골반 굴곡 인지",
        sets: [
          { weight: 0, reps: 10, completed: true },
          { weight: 0, reps: 10, completed: true }
        ],
        notes: "전·후 방향으로 밀고 버티기 (밴드 저항)"
      },
      {
        name: "스미스 push up",
        category: "가슴",
        targetDetail: "대흉근 하부/삼두",
        sets: [
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 10, completed: true },
          { weight: 0, reps: 10, completed: true },
          { weight: 0, reps: 10, completed: true }
        ],
        notes: "몸통 일직선 유지하며 내려가기 (맨몸, 스미스 5번째칸)"
      }
    ]
  },
  {
    date: "2026-01-07",
    title: "코어 밸런스 인지 및 둔근 활성화 트레이닝",
    focus: ["코어", "전신"],
    trainerFeedback: "케틀벨 스윙 시 팔로 들어올리지 않고 힙힌지의 힘으로 케틀벨을 밀어내는 느낌을 배웠습니다. 로우 머신 시 날개뼈를 뒤로 모으는 동작에 유의하세요.",
    userNotes: "짐볼 위에서 덤벨 중심을 잡으려니 코어가 엄청 자극되었다. 케틀벨 스윙은 타이밍 잡는 게 중요하다.",
    homework: "선행운동 후 동작 3개씩 복습",
    homeworkCompleted: true,
    score: 4,
    exercises: [
      {
        name: "코어운동1 ★",
        category: "코어",
        targetDetail: "다열근/복횡근",
        sets: [
          { weight: 0, reps: 20, completed: true },
          { weight: 0, reps: 20, completed: true },
          { weight: 0, reps: 20, completed: true },
          { weight: 0, reps: 20, completed: true }
        ],
        notes: "짐볼 위에서 덤벨 들고 코어 정렬 제어 (영상 참조)"
      },
      {
        name: "코어운동2 ★",
        category: "코어",
        targetDetail: "하복부",
        sets: [
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true }
        ],
        notes: "매트 위 코어 안정화 제어 (영상 참조)"
      },
      {
        name: "케틀벨스윙",
        category: "전신",
        targetDetail: "후면 사슬 폭발성",
        sets: [
          { weight: 4, reps: 20, completed: true },
          { weight: 4, reps: 20, completed: true },
          { weight: 4, reps: 20, completed: true },
          { weight: 4, reps: 20, completed: true }
        ],
        notes: "힙의 반동으로 동작 (4kg 케틀벨)"
      },
      {
        name: "로우머신 (중등승모근)",
        category: "등",
        targetDetail: "중등승모근",
        sets: [
          { weight: 5, reps: 15, completed: true },
          { weight: 5, reps: 15, completed: true },
          { weight: 5, reps: 15, completed: true },
          { weight: 5, reps: 15, completed: true }
        ],
        notes: "날개뼈 움직임 팔꿈치 뒤로 모아주기"
      }
    ]
  },
  {
    date: "2026-01-14",
    title: "시티드 레그프레스 및 기본 코어 강화",
    focus: ["하체", "코어"],
    trainerFeedback: "골반 정렬 및 뒤꿈치 궤적을 연습했습니다. 레그프레스 중량이 조금 올라갔는데 무릎 흔들리지 않게 발판 고정에 유의하세요.",
    userNotes: "하체 위주 훈련. 발목 가동성이 부족한 걸 스트레칭으로 풀면서 프레스를 밀었더니 훨씬 골반 압박이 덜했다.",
    homework: "하체 폼롤러 스트레칭",
    homeworkCompleted: true,
    score: 4,
    exercises: [
      {
        name: "시티드 레그 프레스",
        category: "하체",
        targetDetail: "대퇴사두근",
        sets: [
          { weight: 30, reps: 15, completed: true },
          { weight: 30, reps: 15, completed: true },
          { weight: 40, reps: 15, completed: true },
          { weight: 40, reps: 15, completed: true }
        ],
        notes: "뒤꿈치 접지 집중"
      },
      {
        name: "엘보우 플랭크",
        category: "코어",
        targetDetail: "코어",
        postureImage: "/postures/plank_posture_tip.png",
        sets: [
          { weight: 0, reps: 45, completed: true },
          { weight: 0, reps: 45, completed: true },
          { weight: 0, reps: 45, completed: true }
        ],
        notes: "골반 쳐지지 않게 엉덩이 수축 유지"
      }
    ]
  },
  {
    date: "2026-01-23",
    title: "상체 등 상부 및 대흉근 기초 프레스",
    focus: ["등", "가슴"],
    trainerFeedback: "체스트프레스 동작 시 손목 꺾이지 않도록 수직으로 저항선을 맞춰 밀도록 피드백드렸습니다. 랫풀다운 시 날개뼈를 하강하는 수축력을 잘 가져가고 있습니다.",
    userNotes: "날씨가 춥지만 움직이니까 열이 나서 기분 좋다. 체스트프레스 기구 각도를 낮춰 어깨 전면 부담을 줄였다.",
    homework: "상체 폼롤러 이완",
    homeworkCompleted: true,
    score: 4,
    exercises: [
      {
        name: "체스트 프레스 머신",
        category: "가슴",
        targetDetail: "대흉근",
        sets: [
          { weight: 5, reps: 15, completed: true },
          { weight: 5, reps: 15, completed: true },
          { weight: 5, reps: 15, completed: true }
        ],
        notes: "수직 프레스 밀기"
      },
      {
        name: "랫풀다운 (광배근)",
        category: "등",
        targetDetail: "광배근",
        postureImage: "/postures/latpulldown_posture_tip.png",
        sets: [
          { weight: 5, reps: 15, completed: true },
          { weight: 10, reps: 15, completed: true },
          { weight: 10, reps: 15, completed: true }
        ],
        notes: "당길 때 가슴 확장"
      }
    ]
  },
  {
    date: "2026-01-27",
    title: "케틀벨 스윙 볼륨 강화 및 코어 복압 통제",
    focus: ["전신", "코어"],
    trainerFeedback: "케틀벨 스윙 20회 반복 시 호흡 조절을 잘 수행하셨습니다. 매일 플랭크 1분을 목표로 집에서도 선행 코어 훈련을 실행해 보길 적극 제안합니다.",
    userNotes: "스윙하고 나면 심장이 터질 것 같지만 그만큼 기초 체력이 늘고 있다는 증거 같다. 복부 근육통 있음.",
    homework: "선행 플랭크 하루 3세트",
    homeworkCompleted: true,
    score: 5,
    exercises: [
      {
        name: "케틀벨스윙",
        category: "전신",
        targetDetail: "둔근/햄스트링",
        sets: [
          { weight: 4, reps: 20, completed: true },
          { weight: 4, reps: 20, completed: true },
          { weight: 4, reps: 20, completed: true }
        ],
        notes: "반동 시 척추 정렬 신경쓰기"
      },
      {
        name: "엘보우 플랭크",
        category: "코어",
        targetDetail: "복횡근",
        postureImage: "/postures/plank_posture_tip.png",
        sets: [
          { weight: 0, reps: 60, completed: true },
          { weight: 0, reps: 60, completed: true }
        ],
        notes: "등 평평하게 복압 통제"
      }
    ]
  },

  // ================= 2026년 2월 =================
  {
    date: "2026-02-04",
    title: "이너타이 내전근 및 덤벨 프레스 상체 정밀성",
    focus: ["하체", "가슴"],
    trainerFeedback: "골반을 고정하고 내전근 수축에 신경 써 이너타이를 수행했습니다. 덤벨을 쇄골 수평 라인으로 무너지지 않게 수직 통제해 가슴 가동을 높였습니다.",
    userNotes: "하체 이너타이를 먼저 진행해 골반 밸런스를 잡고 가슴 프레스를 미니까 훨씬 견갑이 잘 맞물린다.",
    homework: "이너타이 모빌리티 스트레칭",
    homeworkCompleted: true,
    score: 4,
    exercises: [
      {
        name: "이너타이 (내전근)",
        category: "하체",
        targetDetail: "내전근",
        sets: [
          { weight: 15, reps: 15, completed: true },
          { weight: 20, reps: 15, completed: true },
          { weight: 20, reps: 15, completed: true }
        ],
        notes: "골반 세워둔 상태 유지"
      },
      {
        name: "체스트 프레스 머신",
        category: "가슴",
        targetDetail: "대흉근",
        sets: [
          { weight: 5, reps: 12, completed: true },
          { weight: 5, reps: 12, completed: true }
        ],
        notes: "팔꿈치 각 유지"
      }
    ]
  },
  {
    date: "2026-02-11",
    title: "티바로우 및 프레스 머신 상체 정렬 트레이닝",
    focus: ["등", "어깨", "가슴"],
    trainerFeedback: "티바로우 수행 시 날개뼈를 뒤로 먼저 움직인 후 팔꿈치를 당기는 습관을 들여보세요. 숄더프레스는 팔꿈치가 그립 밑에 수직으로 위치해야 어깨 관절에 무리가 가지 않습니다.",
    userNotes: "가슴 프레스와 어깨 프레스 중량을 5kg로 소화했다. 플랭크를 무릎 대고 성공해서 기분이 좋다!",
    homework: "유산소운동 후, 상체/복부 위주로 연습.",
    homeworkCompleted: true,
    score: 4,
    exercises: [
      {
        name: "티바로우 (중등승모근)",
        category: "등",
        targetDetail: "중등승모근",
        sets: [
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true }
        ],
        notes: "날개뼈 움직임 뒤로 먼저 가기 (빈바)"
      },
      {
        name: "체스트 프레스 머신",
        category: "가슴",
        targetDetail: "대흉근",
        sets: [
          { weight: 5, reps: 15, completed: true },
          { weight: 5, reps: 15, completed: true },
          { weight: 5, reps: 15, completed: true },
          { weight: 5, reps: 15, completed: true }
        ],
        notes: "손목과 팔꿈치 수평으로 매칭하기"
      },
      {
        name: "숄더프레스 머신",
        category: "어깨",
        targetDetail: "전면삼각근",
        sets: [
          { weight: 5, reps: 15, completed: true },
          { weight: 5, reps: 15, completed: true },
          { weight: 5, reps: 15, completed: true },
          { weight: 5, reps: 15, completed: true }
        ],
        notes: "그립 아래에 팔꿈치 오도록"
      },
      {
        name: "무릎대고 플랭크 ★",
        category: "코어",
        targetDetail: "코어 복압",
        postureImage: "/postures/plank_posture_tip.png",
        sets: [
          { weight: 0, reps: 2, completed: true },
          { weight: 0, reps: 2, completed: true }
        ],
        notes: "몸통 일직선 유지 (맨몸 성공)"
      }
    ]
  },
  {
    date: "2026-02-24",
    title: "시티드 굿모닝 및 후면사슬 강화 트레이닝",
    focus: ["하체", "코어", "등"],
    trainerFeedback: "시티드 굿모닝 수행 시 상체를 올릴 때 둔근과 골반을 위로 밀어내는 감각에 집중하세요. 인클라인 플랭크 시 골반이 아래로 쳐지지 않도록 복부 긴장감을 유지해야 합니다.",
    userNotes: "백익스텐션 패드 높이를 올리니 확실히 뒷벅지에 자극이 많이 간다. 롱풀 중량 10kg 성공!",
    homework: "선행운동 후에 상체 1가지 + 하체 2가지 (견갑골 보고 매칭하기)",
    homeworkCompleted: true,
    score: 4,
    exercises: [
      {
        name: "시티드 굿모닝",
        category: "하체",
        targetDetail: "둔근/골반 가동성",
        sets: [
          { weight: 7.5, reps: 15, completed: true },
          { weight: 7.5, reps: 15, completed: true },
          { weight: 7.5, reps: 15, completed: true },
          { weight: 10, reps: 15, completed: true }
        ],
        notes: "골반을 위로 밀면서 올라오기 (*골반만 뒤로 밀기)"
      },
      {
        name: "백익스텐션 (뒷허벅지)",
        category: "하체",
        targetDetail: "뒷허벅지",
        sets: [
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true }
        ],
        notes: "골반을 패드에 대고 힘으로 운동 (패드높이 높게)"
      },
      {
        name: "인클라인 플랭크 (코어)",
        category: "코어",
        targetDetail: "코어 정렬",
        postureImage: "/postures/plank_posture_tip.png",
        sets: [
          { weight: 0, reps: 4, completed: true }
        ],
        notes: "몸 일직선 유지 (*골반 내려가지 않도록 주의, 45초/60초)"
      },
      {
        name: "롱풀 (등)",
        category: "등",
        targetDetail: "광배근/중부승모근",
        sets: [
          { weight: 10, reps: 15, completed: true },
          { weight: 10, reps: 15, completed: true },
          { weight: 10, reps: 15, completed: true }
        ],
        notes: "몸을 바르게 세운 상태에서"
      }
    ]
  },
  {
    date: "2026-02-27",
    title: "케틀벨 로우 및 이너타이 내전근 강화",
    focus: ["등", "하체", "가슴"],
    trainerFeedback: "이너타이 동작 시 골반을 세우고 곧게 고정하여 내전근 고유 장력을 사용했습니다. 레그프레스 시 발판을 밀 때 발끝이 아닌 뒤꿈치 중심의 저항을 이용해 밀어냅니다.",
    userNotes: "케틀벨 로우 영상 보면서 혼자 연습해봐야겠다. 이너타이 32.5kg 세트 성공해서 뿌듯함.",
    homework: "폼롤러 및 스트레칭",
    homeworkCompleted: true,
    score: 5,
    exercises: [
      {
        name: "케틀벨 로우",
        category: "등",
        targetDetail: "광배근/등중부",
        sets: [
          { weight: 8, reps: 15, completed: true },
          { weight: 8, reps: 15, completed: true },
          { weight: 8, reps: 15, completed: true },
          { weight: 8, reps: 15, completed: true }
        ],
        notes: "영상 참조 (*한 하부 쪽에 덤벨을 얹고 있으면 도움이 될 것 같음)"
      },
      {
        name: "이너타이 (내전근)",
        category: "하체",
        targetDetail: "내전근",
        sets: [
          { weight: 15, reps: 15, completed: true },
          { weight: 20, reps: 15, completed: true },
          { weight: 25, reps: 15, completed: true },
          { weight: 32.5, reps: 15, completed: true }
        ],
        notes: "골반 세워둔 상태로 고정"
      },
      {
        name: "시티드 레그 프레스 (앞허벅지)",
        category: "하체",
        targetDetail: "대퇴사두근",
        sets: [
          { weight: 30, reps: 15, completed: true },
          { weight: 30, reps: 15, completed: true },
          { weight: 40, reps: 15, completed: true },
          { weight: 40, reps: 15, completed: true }
        ],
        notes: "뒤꿈치로 발판 밀고 나가는 느낌"
      },
      {
        name: "인클라인 푸쉬 업",
        category: "가슴",
        targetDetail: "대흉근 하부",
        sets: [
          { weight: 0, reps: 12, completed: true },
          { weight: 0, reps: 12, completed: true },
          { weight: 0, reps: 12, completed: true },
          { weight: 0, reps: 12, completed: true }
        ],
        notes: "팔꿈치 안쪽으로 누르면서 몸을 위로 밀기 (스미스 5번째칸)"
      }
    ]
  },

  // ================= 2026년 3월 =================
  {
    date: "2026-03-04",
    title: "인클라인 플랭크 및 뒷허벅지 레그프레스 집중",
    focus: ["코어", "하체", "등"],
    trainerFeedback: "백익스텐션 수행 시 골반을 패드 약간 아래에 두고 가동 범위를 짧게 가져가 둔근의 지속적 수축을 완성했습니다. 루마니안 데드리프트는 무게중심을 앞쪽에 두고 척추 정렬을 정밀하게 잡았습니다.",
    userNotes: "레그프레스 할 때 엉덩이 패드에 엉덩이를 바짝 밀착시켜서 앉았더니 대퇴후면 자극이 배로 온다.",
    homework: "선행운동 4가지 복습",
    homeworkCompleted: true,
    score: 4,
    exercises: [
      {
        name: "인클라인 플랭크",
        category: "코어",
        targetDetail: "코어",
        postureImage: "/postures/plank_posture_tip.png",
        sets: [
          { weight: 0, reps: 60, completed: true },
          { weight: 0, reps: 45, completed: true },
          { weight: 0, reps: 45, completed: true }
        ],
        notes: "몸통 일직선 유지 (1분 / 45초 / 45초)"
      },
      {
        name: "백익스텐션 (힙위주)",
        category: "하체",
        targetDetail: "둔근/힙",
        sets: [
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true }
        ],
        notes: "골반 패드 아래에 두고 짧게 내려가기"
      },
      {
        name: "루마니안 데드리프트 (등)",
        category: "등",
        targetDetail: "척추기립근/등전체",
        postureImage: "/postures/deadlift_posture_tip.png",
        sets: [
          { weight: 10, reps: 15, completed: true },
          { weight: 10, reps: 15, completed: true },
          { weight: 10, reps: 15, completed: true },
          { weight: 10, reps: 15, completed: true }
        ],
        notes: "무게중심 항상 앞쪽에 실은 상체 유지"
      },
      {
        name: "파워레그프레스머신 (뒷허벅지)",
        category: "하체",
        targetDetail: "햄스트링",
        sets: [
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true },
          { weight: 5, reps: 15, completed: true },
          { weight: 5, reps: 15, completed: true }
        ],
        notes: "1. 의자 패드 하단만 앉기, 2. 뒤꿈치로 발판 밀기 (빈바/5kg)"
      }
    ]
  },
  {
    date: "2026-03-06",
    title: "시티드 레그프레스 밴드 활성화 및 등 상부 확장",
    focus: ["하체", "등", "어깨"],
    trainerFeedback: "레그프레스 시 허벅지 외측 정렬 유지를 위해 저항 밴드를 적극 사용했습니다. 랫풀다운 시 허리가 과신전되지 않도록 갈비뼈를 닫고 끌어당기세요.",
    userNotes: "허리에 부하가 쏠리지 않고 등과 어깨, 엉덩이에 정직한 근육통이 느껴지기 시작했다. 밴드 운동이 진짜 알짜배기다.",
    homework: "선행운동 후에 상체 3가지 + 하체 2가지 (견갑골 보고 매칭하기)",
    homeworkCompleted: true,
    score: 4,
    exercises: [
      {
        name: "시티드레그프레스 (엉덩이)",
        category: "하체",
        targetDetail: "대둔근/외측광근",
        sets: [
          { weight: 0, reps: 15, completed: true },
          { weight: 10, reps: 15, completed: true },
          { weight: 10, reps: 15, completed: true },
          { weight: 10, reps: 15, completed: true }
        ],
        notes: "밴드를 계속 묶어둔 상태 유지 (맨몸/10kg 바벨)"
      },
      {
        name: "몬스터 글루트 (엉덩이)",
        category: "하체",
        targetDetail: "중둔근",
        sets: [
          { weight: 2.5, reps: 15, completed: true },
          { weight: 2.5, reps: 15, completed: true },
          { weight: 5, reps: 15, completed: true },
          { weight: 5, reps: 15, completed: true }
        ],
        notes: "내쉴때 1-2초 쥐기"
      },
      {
        name: "랫풀다운 (등-광배근)",
        category: "등",
        targetDetail: "광배근",
        postureImage: "/postures/latpulldown_posture_tip.png",
        sets: [
          { weight: 10, reps: 15, completed: true },
          { weight: 10, reps: 15, completed: true },
          { weight: 10, reps: 15, completed: true },
          { weight: 10, reps: 15, completed: true }
        ],
        notes: "허리 꺾이지 않도록"
      },
      {
        name: "80도 숄더프레스머신",
        category: "어깨",
        targetDetail: "전면삼각근",
        sets: [
          { weight: 5, reps: 15, completed: true },
          { weight: 5, reps: 15, completed: true },
          { weight: 5, reps: 15, completed: true }
        ],
        notes: "패드에서 팔꿈치가 떨어지지 않도록"
      }
    ]
  },
  {
    date: "2026-03-09",
    title: "데드버그 복압 안정화 및 숄더패킹 등 훈련",
    focus: ["코어", "등", "하체"],
    trainerFeedback: "데드버그 시 허리가 매트에서 뜨지 않도록 폼롤러를 가볍게 눌러 안정화했습니다. 레그프레스 밀 때는 뒤꿈치 힘전달율을 90% 이상으로 유지하세요.",
    userNotes: "풀업 머신에서 중량을 59kg로 셋업하고 당기니 확실히 등이 곧게 퍼진다. 뒤꿈치로 발판을 더 강력하게 밀었다.",
    homework: "선행운동 후 상체 2가지 + 하체 1가지",
    homeworkCompleted: true,
    score: 4,
    exercises: [
      {
        name: "데드버그 (코어) ★",
        category: "코어",
        targetDetail: "코어 근육",
        sets: [
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true }
        ],
        notes: "허리 뜨지 않도록 유지 (맨몸 + 폼롤러)"
      },
      {
        name: "레그레이즈",
        category: "코어",
        targetDetail: "복직근 하부",
        sets: [
          { weight: 0, reps: 10, completed: true }
        ],
        notes: "※ 각 올릴때 다리 수직성있게"
      },
      {
        name: "어시스트풀업 (패러럴그립)",
        category: "등",
        targetDetail: "광배근/대원근",
        sets: [
          { weight: 59, reps: 12, completed: true },
          { weight: 59, reps: 12, completed: true },
          { weight: 59, reps: 12, completed: true },
          { weight: 59, reps: 12, completed: true }
        ],
        notes: "어깨 들리지 않도록 숄더패킹 날개뼈"
      },
      {
        name: "시티드레그프레스 (앞벅지)",
        category: "하체",
        targetDetail: "대퇴사두근",
        sets: [
          { weight: 30, reps: 15, completed: true },
          { weight: 30, reps: 15, completed: true },
          { weight: 40, reps: 15, completed: true },
          { weight: 40, reps: 15, completed: true }
        ],
        notes: "발 뒤꿈치로 더 밀어내기"
      }
    ]
  },
  {
    date: "2026-03-13",
    title: "티바로우 정렬성 확보 및 손목 수직 유지 랫풀다운",
    focus: ["등", "팔"],
    trainerFeedback: "랫풀다운 와이드 패러럴그립 시 손목과 팔꿈치가 수직 방향을 일치시키도록 밀착 코칭했습니다. 롱풀 시 회전을 추가해 등 하부 깊숙하게 자극을 유도했습니다.",
    userNotes: "티바로우 중량 없는 빈바인데도 견갑 수축각이 잘 들어가서 땀이 엄청 났다. 이두 컬 할 때 팔꿈치 계속 고정함.",
    homework: "선행운동 상체 2가지 + 하체 2가지",
    homeworkCompleted: true,
    score: 5,
    exercises: [
      {
        name: "티바로우 (광배근)",
        category: "등",
        targetDetail: "광배근/중부승모근",
        sets: [
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true }
        ],
        notes: "몸 세운 상태에서 내리지 않도록 (빈바)"
      },
      {
        name: "랫풀다운 (와이드패러럴그립)",
        category: "등",
        targetDetail: "광배근 바깥쪽",
        postureImage: "/postures/latpulldown_posture_tip.png",
        sets: [
          { weight: 5, reps: 15, completed: true },
          { weight: 5, reps: 15, completed: true },
          { weight: 12, reps: 15, completed: true },
          { weight: 12, reps: 15, completed: true }
        ],
        notes: "1. 양손바닥 견갑하부에서 내려당기기 2. 손목과 팔꿈치는 수직형태 그대로 유지 (size 17/12)"
      },
      {
        name: "롱풀 (광배근)",
        category: "등",
        targetDetail: "광배근/대원근",
        sets: [
          { weight: 5, reps: 15, completed: true },
          { weight: 5, reps: 15, completed: true },
          { weight: 5, reps: 15, completed: true },
          { weight: 10, reps: 15, completed: true }
        ],
        notes: "덤벨들을 몸 안쪽으로 회전시키며 진행"
      },
      {
        name: "덤벨 이두 컬",
        category: "팔",
        targetDetail: "상완이두근",
        sets: [
          { weight: 1, reps: 15, completed: true },
          { weight: 1, reps: 15, completed: true },
          { weight: 2, reps: 15, completed: true },
          { weight: 2, reps: 15, completed: true }
        ],
        notes: "팔꿈치 위치 고정 (동작 천천히!) (1kg/2kg)"
      }
    ]
  },
  {
    date: "2026-03-16",
    title: "케틀벨 스윙 발목 접지 및 런지 기립각 유지",
    focus: ["전신", "하체", "코어"],
    trainerFeedback: "스탠딩 아웃타이 시 상체를 사선으로 단단히 눕혀 고정하고 둔근의 장력을 길게 가져갔습니다. 스미스 머신 런지는 올라갈 때 상체 기립각이 흔들리지 않도록 제어했습니다.",
    userNotes: "케틀벨 스윙 시 8kg로 증량 완료! 발바닥 전체로 매트를 누르면서 힙을 미니까 반동이 훨씬 수월했다.",
    homework: "선행운동 등지압+가슴지압+힘에의해+뒤꿈치 지탱 -> 사타구니, 엉덩이허리 + 어깨몸통 꼬리뼈",
    homeworkCompleted: true,
    score: 4,
    exercises: [
      {
        name: "케틀벨 스윙 (코어·엉덩이)",
        category: "전신",
        targetDetail: "후면 사슬 코어",
        sets: [
          { weight: 4, reps: 20, completed: true },
          { weight: 4, reps: 20, completed: true },
          { weight: 8, reps: 20, completed: true },
          { weight: 8, reps: 20, completed: true }
        ],
        notes: "발바닥으로 밀면서 힙을 밀어주기 (4kg/8kg 맨몸)"
      },
      {
        name: "스미스 런지 (엉덩이·하체)",
        category: "하체",
        targetDetail: "둔근/대퇴사두",
        sets: [
          { weight: 2.5, reps: 15, completed: true },
          { weight: 2.5, reps: 15, completed: true },
          { weight: 5, reps: 15, completed: true },
          { weight: 5, reps: 15, completed: true }
        ],
        notes: "내려갈 때 상체 기립각 유지하면서 일어나기 (각 2세트, 2.5kg/5kg)"
      },
      {
        name: "스탠딩 아웃타이 (엉덩이)",
        category: "하체",
        targetDetail: "중둔근 상부",
        sets: [
          { weight: 2.5, reps: 15, completed: true },
          { weight: 2.5, reps: 15, completed: true },
          { weight: 2.5, reps: 15, completed: true },
          { weight: 2.5, reps: 15, completed: true }
        ],
        notes: "사선 방향으로 몸 지탱, 일어섰다 내려갈때 천천히 내려가기"
      },
      {
        name: "윗몸일으키기 (복부)",
        category: "코어",
        targetDetail: "복직근 상부",
        sets: [
          { weight: 0, reps: 20, completed: true },
          { weight: 0, reps: 20, completed: true }
        ],
        notes: "복압 유지 (맨몸)"
      }
    ]
  },
  {
    date: "2026-03-20",
    title: "덤벨 숄더 프레스 귀옆 배치 및 점프 스쿼트 복합",
    focus: ["어깨", "하체"],
    trainerFeedback: "어깨 전면 타겟 숄더프레스는 덤벨 귀옆 수직라인을 고착했습니다. 사이드레터럴레이즈 시 승모 가입 배제를 위해 팔꿈치 좌우대칭 유지 리듬을 살렸습니다.",
    userNotes: "점프스쿼트 앉을 때 발바닥 전체 지탱해서 천천히 하도록 지적받았다. 덤벨 와이드스쿼트는 5kg로 수축 유지.",
    homework: "복습했던 3가지 중 2가지 하기",
    homeworkCompleted: true,
    score: 5,
    exercises: [
      {
        name: "덤벨 숄더프레스 (어깨전면)",
        category: "어깨",
        targetDetail: "전면삼각근",
        sets: [
          { weight: 2.5, reps: 15, completed: true },
          { weight: 2.5, reps: 15, completed: true },
          { weight: 2.5, reps: 15, completed: true },
          { weight: 2.5, reps: 15, completed: true },
          { weight: 2.5, reps: 15, completed: true }
        ],
        notes: "덤벨이 내 귀옆에 있도록"
      },
      {
        name: "벤트오버레터럴레이즈 (어깨후면)",
        category: "어깨",
        targetDetail: "후면삼각근",
        sets: [
          { weight: 2.5, reps: 15, completed: true },
          { weight: 2.5, reps: 15, completed: true },
          { weight: 2.5, reps: 15, completed: true },
          { weight: 2.5, reps: 15, completed: true },
          { weight: 2.5, reps: 15, completed: true }
        ],
        notes: "팔꿈치 바깥으로 밀어내며 리듬"
      },
      {
        name: "사이드레터럴레이즈 (어깨측면)",
        category: "어깨",
        targetDetail: "측면삼각근",
        sets: [
          { weight: 2, reps: 15, completed: true },
          { weight: 2, reps: 15, completed: true },
          { weight: 1, reps: 15, completed: true },
          { weight: 1, reps: 15, completed: true },
          { weight: 1, reps: 15, completed: true }
        ],
        notes: "팔꿈치 좌우대칭 유지 (2kg/1kg)"
      },
      {
        name: "이너타이 (안벅지)",
        category: "하체",
        targetDetail: "내전근",
        sets: [
          { weight: 15, reps: 15, completed: true },
          { weight: 20, reps: 15, completed: true },
          { weight: 20, reps: 15, completed: true },
          { weight: 25, reps: 15, completed: true }
        ],
        notes: "완전하게 벌어지기 전에 모아주기"
      },
      {
        name: "덤벨와이드 스쿼트 (앞허벅지·안벅지)",
        category: "하체",
        targetDetail: "내전근/대퇴사두",
        postureImage: "/postures/squat_posture_tip.png",
        sets: [
          { weight: 5, reps: 15, completed: true },
          { weight: 5, reps: 15, completed: true },
          { weight: 5, reps: 15, completed: true },
          { weight: 5, reps: 15, completed: true }
        ],
        notes: "덤벨을 땅에서 몸으로 올린다고 생각하기"
      },
      {
        name: "점프 스쿼트",
        category: "하체",
        targetDetail: "대퇴사두 근성장",
        postureImage: "/postures/squat_posture_tip.png",
        sets: [
          { weight: 0, reps: 20, completed: true },
          { weight: 0, reps: 20, completed: true }
        ],
        notes: "덤벨스쿼트 하듯이 앉을 때 천천히!!"
      }
    ]
  },
  {
    date: "2026-03-24",
    title: "스미스 스티프 및 스쿼트 하체 고립 트레이닝",
    focus: ["하체"],
    trainerFeedback: "스미스 스티프 데드리프트 시 어깨 정렬을 단단히 숄더패킹하고 햄스트링 신장성 수축에 초점을 두었습니다. 몬스터글루트는 반동 없이 둔근 힘으로 정지했습니다.",
    userNotes: "스미스 스쿼트 일어날 때 발가락이 아닌 발끝/뒤꿈치로 밀어 일어나니까 허벅지 전면 자극이 아주 정직하게 박힌다.",
    homework: "복습했던 3가지 중 2가지 하기",
    homeworkCompleted: true,
    score: 4,
    exercises: [
      {
        name: "스미스 스티프 데드리프트 (뒷벅지)",
        category: "하체",
        targetDetail: "대퇴이두근",
        postureImage: "/postures/deadlift_posture_tip.png",
        sets: [
          { weight: 20, reps: 15, completed: true },
          { weight: 20, reps: 15, completed: true },
          { weight: 20, reps: 15, completed: true },
          { weight: 20, reps: 15, completed: true }
        ],
        notes: "발을 골반 넓이로 서기 (한쪽 10kg, 총무게 20kg)"
      },
      {
        name: "몬스터 글루트 (둔근)",
        category: "하체",
        targetDetail: "둔근 중심부",
        sets: [
          { weight: 25, reps: 15, completed: true },
          { weight: 25, reps: 15, completed: true },
          { weight: 25, reps: 15, completed: true },
          { weight: 25, reps: 15, completed: true }
        ],
        notes: "반동없이 엉덩이 수축 유지"
      },
      {
        name: "스미스 스쿼트 (하체)",
        category: "하체",
        targetDetail: "대퇴사두/둔근",
        postureImage: "/postures/squat_posture_tip.png",
        sets: [
          { weight: 2.5, reps: 15, completed: true },
          { weight: 2.5, reps: 15, completed: true },
          { weight: 5, reps: 15, completed: true },
          { weight: 5, reps: 15, completed: true }
        ],
        notes: "발끝으로 미는게 일어나기! (2.5kg/5kg)"
      }
    ]
  },
  {
    date: "2026-03-31",
    title: "스미스 런지 골반 안정화 및 복부 크런치",
    focus: ["하체", "코어"],
    trainerFeedback: "케이블 스티프 데드리프트 시 고관절 정렬을 그대로 수평 유지하도록 피드백드렸습니다. 백익스텐션 힙위주는 뒤꿈치를 밀착 고정하여 둔근 참여율을 높였습니다.",
    userNotes: "스미스 런지 시 앞발에 체중을 80% 이상 싣고 엉덩이 힘으로 딛고 올라섰더니 양 엉덩이가 뻐근하다. 복부 말기도 성공.",
    homework: "3/20 복습",
    homeworkCompleted: true,
    score: 4,
    exercises: [
      {
        name: "스미스 런지 (엉덩이)",
        category: "하체",
        targetDetail: "둔근/대둔근",
        sets: [
          { weight: 5, reps: 15, completed: true },
          { weight: 5, reps: 15, completed: true },
          { weight: 5, reps: 15, completed: true },
          { weight: 5, reps: 15, completed: true }
        ],
        notes: "앞발 힘주기 (각 4세트)"
      },
      {
        name: "케이블 스티프 데드리프트 (둔근·햄스트링)",
        category: "하체",
        targetDetail: "햄스트링/둔근",
        postureImage: "/postures/deadlift_posture_tip.png",
        sets: [
          { weight: 20, reps: 15, completed: true },
          { weight: 20, reps: 15, completed: true },
          { weight: 20, reps: 15, completed: true },
          { weight: 20, reps: 15, completed: true }
        ],
        notes: "뒤로 고관절 그대로 유지!"
      },
      {
        name: "백익스텐션 (힙위주)",
        category: "하체",
        targetDetail: "둔근 하부",
        sets: [
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true }
        ],
        notes: "뒤꿈치 단단히 누르기 (맨몸)"
      },
      {
        name: "복부말아올리기 (복부)",
        category: "코어",
        targetDetail: "복직근",
        sets: [
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true }
        ],
        notes: "내쉬는 숨에 말아올리기 (맨몸)"
      }
    ]
  },

  // ================= 2026년 4월 =================
  {
    date: "2026-04-08",
    title: "새 훈련 주기 진입 및 푸쉬업 가동성 인지",
    focus: ["코어", "가슴"],
    trainerFeedback: "근육량 2.2kg 증량이라는 새로운 목표를 함께 세우고 진행했습니다. 코어운동 시 복강 내 압력 정립을 위한 허리프레스(압착) 기술을 숙련시켰습니다.",
    userNotes: "푸쉬업을 스미스 2-3번째 칸 높이에서 수행했는데 골반 정렬 잡는 게 무척 무거웠다. 벌써 4개 성공했으니 앞으로 증량이다.",
    homework: "선행운동: 등지압 + 가슴지압 + 힘에 의해서 + 뒤꿈치 지탱 -> 사타구니, 엉덩이허리 + 어깨몸통 꼬리뼈",
    homeworkCompleted: true,
    score: 4,
    exercises: [
      {
        name: "코어운동1",
        category: "코어",
        targetDetail: "복직근압착",
        sets: [
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true }
        ],
        notes: "허리프레스 (맨몸+플랭크)"
      },
      {
        name: "인플랭크 (코어)",
        category: "코어",
        targetDetail: "코어 안정화",
        postureImage: "/postures/plank_posture_tip.png",
        sets: [
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true }
        ],
        notes: "팔꿈치 내릴때 가슴 뒤쪽으로 빼기"
      },
      {
        name: "push up",
        category: "가슴",
        targetDetail: "대흉근/전면삼각근",
        sets: [
          { weight: 0, reps: 5, completed: true }
        ],
        notes: "현재 4개 완료, 1. 고관절중립성 (스미스 2-3번째 칸)"
      }
    ]
  },
  {
    date: "2026-04-10",
    title: "덤벨 숄더 프레스 수직 및 삼두 킥백 정지",
    focus: ["어깨", "팔"],
    trainerFeedback: "덤벨 킥백 시 팔꿈치 흔들림을 배제하고 완전히 수평으로 곧게 펴 정지하는 통제에 집중했습니다. 사이드레터럴레이즈 시 귓잔등을 밀어올려 측면 삼각근을 고립했습니다.",
    userNotes: "날개뼈를 조이지 않고 측면과 후면 어깨만 고립해서 올리니 승모근 통증이 없어서 너무 신기했다. 킥백 2kg 수행.",
    homework: "스트레칭 X 복습",
    homeworkCompleted: true,
    score: 4,
    exercises: [
      {
        name: "덤벨숄더프레스 (어깨전면)",
        category: "어깨",
        targetDetail: "전면삼각근",
        sets: [
          { weight: 2, reps: 15, completed: true },
          { weight: 2, reps: 15, completed: true },
          { weight: 2, reps: 15, completed: true },
          { weight: 2, reps: 15, completed: true }
        ],
        notes: "팔꿈치 손목과 일직선 유지"
      },
      {
        name: "사이드레터럴레이즈 (어깨측면)",
        category: "어깨",
        targetDetail: "측면삼각근",
        sets: [
          { weight: 2, reps: 15, completed: true },
          { weight: 1, reps: 15, completed: true },
          { weight: 1, reps: 15, completed: true },
          { weight: 1, reps: 15, completed: true }
        ],
        notes: "귓잔등을 위로 밀어올리기 (2kg/1kg)"
      },
      {
        name: "벤트오버레터럴레이즈 (어깨후면)",
        category: "어깨",
        targetDetail: "후면삼각근",
        sets: [
          { weight: 2, reps: 15, completed: true },
          { weight: 2, reps: 15, completed: true },
          { weight: 2, reps: 15, completed: true },
          { weight: 2, reps: 15, completed: true }
        ],
        notes: "날개뼈 쓰지 X"
      },
      {
        name: "덤벨 킥백 (삼두)",
        category: "팔",
        targetDetail: "상완삼두근",
        sets: [
          { weight: 2, reps: 15, completed: true },
          { weight: 2, reps: 15, completed: true },
          { weight: 2, reps: 15, completed: true },
          { weight: 2, reps: 15, completed: true }
        ],
        notes: "팔꿈치 완전히 펴고 정지하기"
      }
    ]
  },
  {
    date: "2026-04-14",
    title: "아웃타이 밴드 반동 억제 및 하이로우 등 상부",
    focus: ["하체", "등", "어깨"],
    trainerFeedback: "하이로우 머신을 활용해 수축 시 팔꿈치를 과도하게 뒤로 당기기보다 겨갑골 하강 궤적으로 당기도록 자세를 교정해 드렸습니다. 밴드 아웃타이는 안정적으로 통제 중입니다.",
    userNotes: "스텝업 덤벨 2.5kg씩 양손에 쥐고 진행했더니 무릎이 흔들리는 보상작용이 와서 무릎 정렬 유지에 엄청 집중했다.",
    homework: "3/19 복습",
    homeworkCompleted: true,
    score: 5,
    exercises: [
      {
        name: "아웃타이 (엉덩이)",
        category: "하체",
        targetDetail: "중둔근 외측",
        sets: [
          { weight: 32.5, reps: 15, completed: true },
          { weight: 40, reps: 15, completed: true },
          { weight: 40, reps: 15, completed: true },
          { weight: 47.5, reps: 15, completed: true }
        ],
        notes: "밴드 힘으로 버티기 (1/2/1 세트)"
      },
      {
        name: "한발 스텝업 (엉덩이)",
        category: "하체",
        targetDetail: "대둔근/대퇴사두",
        sets: [
          { weight: 2.5, reps: 15, completed: true },
          { weight: 2.5, reps: 15, completed: true },
          { weight: 2.5, reps: 15, completed: true },
          { weight: 2.5, reps: 15, completed: true }
        ],
        notes: "무릎 밀리게 하지않기 (맨몸 + 덤벨 2.5kg씩 각 4세트)"
      },
      {
        name: "하이로우머신 (등상부)",
        category: "등",
        targetDetail: "광배 상부/승모근",
        sets: [
          { weight: 5, reps: 15, completed: true },
          { weight: 2.5, reps: 15, completed: true },
          { weight: 2.5, reps: 15, completed: true },
          { weight: 2.5, reps: 15, completed: true },
          { weight: 2.5, reps: 15, completed: true }
        ],
        notes: "팔꿈치 뒤쪽으로 당겨가기 (5kg 새로함, 1/4세트)"
      },
      {
        name: "페이스풀 (어깨후면)",
        category: "어깨",
        targetDetail: "후면삼각근/회전근개",
        sets: [
          { weight: 15, reps: 15, completed: true },
          { weight: 15, reps: 15, completed: true },
          { weight: 15, reps: 15, completed: true },
          { weight: 15, reps: 15, completed: true }
        ],
        notes: "날개뼈 조여 등쪽 자세 유지"
      }
    ]
  },
  {
    date: "2026-04-21",
    title: "데드버그 배 힘 유지 및 백익스텐션 로우 복합",
    focus: ["코어", "가슴", "등"],
    trainerFeedback: "백익스텐션 프레임에서 이완 및 수축 시 등 스트레칭 속도를 고르게 통제하도록 코칭했습니다. 무릎올리기 시 날개뼈를 바닥에서 띄워 복압 압축력을 일정하게 했습니다.",
    userNotes: "인클라인 푸쉬업 5번째칸에서 진행했는데 팔꿈치가 안쪽으로 자연스럽게 접혀 어깨 통증 없이 가슴 자극이 잘 왔다.",
    homework: "배 당겨놓기 복습",
    homeworkCompleted: true,
    score: 4,
    exercises: [
      {
        name: "데드버그 (코어)",
        category: "코어",
        targetDetail: "코어안정화",
        sets: [
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true }
        ],
        notes: "배 힘에 집중하며 유지 (각 4세트)"
      },
      {
        name: "무릎올리기 (하복부)",
        category: "코어",
        targetDetail: "복직근 하부",
        sets: [
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true }
        ],
        notes: "날개뼈를 들어 올려 복압 유지"
      },
      {
        name: "인클라인 push up (전신·호흡·가슴·팔)",
        category: "가슴",
        targetDetail: "대흉근 하부",
        sets: [
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true }
        ],
        notes: "팔꿈치 안쪽으로 내리기 (스미스 5번째칸)"
      },
      {
        name: "백익스텐션 머신에서 로우 (등·코어·엉덩이)",
        category: "등",
        targetDetail: "등 하부/기립근",
        sets: [
          { weight: 2.5, reps: 15, completed: true },
          { weight: 2.5, reps: 15, completed: true },
          { weight: 2.5, reps: 15, completed: true },
          { weight: 2.5, reps: 15, completed: true }
        ],
        notes: "등 스트레칭 속도 유지하기"
      }
    ]
  },
  {
    date: "2026-04-23",
    title: "덤벨프레스 수직 하강 및 데드리프트 등 결합",
    focus: ["가슴", "등", "하체"],
    trainerFeedback: "컨벤셔널 데드리프트 수행 시 바벨이 몸에서 멀어지지 않도록 견갑골의 광배 체결을 유도해 허리 부상을 방지했습니다. 스쿼트는 수직 상승 궤적을 확인했습니다.",
    userNotes: "덤벨 프레스를 미는데 쇄골 사선으로 무너지던 라인이 곧게 수직으로 맞춰졌다. 바벨 스쿼트 10kg 완수 완료.",
    homework: "폼롤러 및 스트레칭",
    homeworkCompleted: true,
    score: 4,
    exercises: [
      {
        name: "덤벨프레스 (가슴)",
        category: "가슴",
        targetDetail: "대흉근 중부",
        sets: [
          { weight: 2.5, reps: 15, completed: true },
          { weight: 2.5, reps: 15, completed: true },
          { weight: 2.5, reps: 15, completed: true },
          { weight: 2.5, reps: 15, completed: true }
        ],
        notes: "쇄골 방향으로 수직 하강"
      },
      {
        name: "컨벤셔널 데드리프트",
        category: "등",
        targetDetail: "후면사슬전체",
        postureImage: "/postures/deadlift_posture_tip.png",
        sets: [
          { weight: 10, reps: 15, completed: true },
          { weight: 10, reps: 15, completed: true },
          { weight: 10, reps: 15, completed: true },
          { weight: 15, reps: 15, completed: true },
          { weight: 15, reps: 15, completed: true }
        ],
        notes: "등에 힘을 잘 실은 상태 유지 (10kg/15kg, 3/2세트)"
      },
      {
        name: "바벨스쿼트",
        category: "하체",
        targetDetail: "대퇴사두근/대둔근",
        postureImage: "/postures/squat_posture_tip.png",
        sets: [
          { weight: 10, reps: 15, completed: true },
          { weight: 10, reps: 15, completed: true },
          { weight: 10, reps: 15, completed: true },
          { weight: 10, reps: 15, completed: true }
        ],
        notes: "상체 밀리지 않도록 수직 상승"
      }
    ]
  },
  {
    date: "2026-04-24",
    title: "스미스 스쿼트 엉덩이 수축 및 케틀벨 와이드 힌지",
    focus: ["하체", "코어"],
    trainerFeedback: "케틀벨 와이드 스쿼트 시 대퇴 내전근과 둔근이 늘어나는 힙힌지 각도를 집중지도했습니다. 트위스트 플랭크 시 상체가 좌우로 흔들리는 보상을 억제했습니다.",
    userNotes: "백익스텐션 시 원판 3kg짜리를 가슴에 얹고 골반 지지점에서 이완하는 훈련을 했더니 허리 기립근이 뻐근하다.",
    homework: "4/23 + 4/24 복습 꼭하기!!",
    homeworkCompleted: true,
    score: 5,
    exercises: [
      {
        name: "스미스 스쿼트",
        category: "하체",
        targetDetail: "둔근/사두",
        postureImage: "/postures/squat_posture_tip.png",
        sets: [
          { weight: 5, reps: 15, completed: true },
          { weight: 5, reps: 15, completed: true },
          { weight: 7.5, reps: 15, completed: true },
          { weight: 7.5, reps: 15, completed: true }
        ],
        notes: "엉덩이 아래로 누르며 수축하며 상승 (5kg/7.5kg, 2/2세트)"
      },
      {
        name: "케틀벨 와이드 스쿼트 (내전근, 엉덩이)",
        category: "하체",
        targetDetail: "내전근",
        postureImage: "/postures/squat_posture_tip.png",
        sets: [
          { weight: 8, reps: 15, completed: true },
          { weight: 8, reps: 15, completed: true },
          { weight: 12, reps: 15, completed: true },
          { weight: 12, reps: 15, completed: true }
        ],
        notes: "발 벌려 골반 힌지 느낌 집중 (케틀벨 8kg/12kg)"
      },
      {
        name: "백익스텐션 (기립근)",
        category: "하체",
        targetDetail: "척추기립근",
        sets: [
          { weight: 3, reps: 15, completed: true },
          { weight: 3, reps: 15, completed: true },
          { weight: 3, reps: 15, completed: true },
          { weight: 3, reps: 15, completed: true }
        ],
        notes: "골반을 패드에 대고 이완하기 (맨몸+원판3)"
      },
      {
        name: "트위스트 플랭크 (복부코어)",
        category: "코어",
        targetDetail: "외복사근",
        postureImage: "/postures/plank_posture_tip.png",
        sets: [
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true }
        ],
        notes: "몸이 좌우로 틀어지지 않게 (맨몸)"
      }
    ]
  },
  {
    date: "2026-04-28",
    title: "버드독 일직선 유지 및 어시스트 풀업 밴드 훈련",
    focus: ["코어", "등", "어깨"],
    trainerFeedback: "버드독 코어 시 손과 발을 일직선으로 평평하게 유지하는 밸런스를 맞췄습니다. 바벨 오버헤드프레스 시 어깨 관절 부하 예방을 위해 팔뚝 수직 각도를 점검했습니다.",
    userNotes: "어시스트 풀업을 밴드 걸고 수행했더니 광배근에 자극이 짱짱하게 느껴진다. 티바로우도 빈바로 무난히 소화.",
    homework: "오늘 복습",
    homeworkCompleted: true,
    score: 4,
    exercises: [
      {
        name: "버드독 (코어)",
        category: "코어",
        targetDetail: "후면코어",
        sets: [
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true }
        ],
        notes: "무릎-손 일직선 유지 (각 4세트)"
      },
      {
        name: "풀업 (등) - 어시스트",
        category: "등",
        targetDetail: "광배근/능형근",
        sets: [
          { weight: 0, reps: 10, completed: true },
          { weight: 0, reps: 10, completed: true },
          { weight: 0, reps: 30, completed: true },
          { weight: 0, reps: 30, completed: true },
          { weight: 0, reps: 30, completed: true }
        ],
        notes: "날개뼈 내리기 유지 (맨몸/밴드 2/3세트)"
      },
      {
        name: "Over Head Press (어깨전면-코어)",
        category: "어깨",
        targetDetail: "전면삼각근",
        sets: [
          { weight: 25, reps: 15, completed: true },
          { weight: 25, reps: 15, completed: true },
          { weight: 25, reps: 15, completed: true },
          { weight: 25, reps: 15, completed: true }
        ],
        notes: "손과 팔이 수직 상태를 유지하며 (바벨에서 진행)"
      },
      {
        name: "티바로우 (광배근)",
        category: "등",
        targetDetail: "광배근",
        sets: [
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true }
        ],
        notes: "팔꿈치 뒤로 모아주며 당기기 (빈바)"
      },
      {
        name: "크로스니업 (복부코어)",
        category: "코어",
        targetDetail: "복사근",
        sets: [
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true }
        ],
        notes: "배 쥐어짜며 교대로 비틀기"
      }
    ]
  },
  {
    date: "2026-04-30",
    title: "플랭크 1분 30초 한계 갱신 및 비하인드 랫풀다운",
    focus: ["코어", "등", "어깨"],
    trainerFeedback: "플랭크 3세트 연속 수행 중 1분 30초로 개인 최고 기록을 갱신하셨습니다! 비하인드 랫풀다운 시 경추 정렬에 주의하며 등 상부 중심 수축을 극대화했습니다.",
    userNotes: "플랭크 최고 기록 달성해서 짜릿했다! 크로스니업 할 때도 갈비뼈를 닫고 복압으로 버텼다. 어깨 자극 제대로 옴.",
    homework: "고개기울여 + 어깨당겨 + 턱치켜들며 + 힘주기",
    homeworkCompleted: true,
    score: 5,
    exercises: [
      {
        name: "플랭크",
        category: "코어",
        targetDetail: "코어 한계치",
        postureImage: "/postures/plank_posture_tip.png",
        sets: [
          { weight: 0, reps: 60, completed: true },
          { weight: 0, reps: 80, completed: true },
          { weight: 0, reps: 90, completed: true }
        ],
        notes: "최고기록 갱신!! good (1분 -> 1분20초 -> 1분30초)"
      },
      {
        name: "크로스 니업 (복부)",
        category: "코어",
        targetDetail: "하복부/복횡근",
        sets: [
          { weight: 0, reps: 20, completed: true },
          { weight: 0, reps: 20, completed: true },
          { weight: 0, reps: 20, completed: true },
          { weight: 0, reps: 20, completed: true }
        ],
        notes: "몸 잘 말아서 복압으로 버티며! (맨몸)"
      },
      {
        name: "비하인드 랫풀다운 (등상부)",
        category: "등",
        targetDetail: "등 상부 중심",
        postureImage: "/postures/latpulldown_posture_tip.png",
        sets: [
          { weight: 10, reps: 15, completed: true },
          { weight: 10, reps: 15, completed: true },
          { weight: 10, reps: 15, completed: true },
          { weight: 15, reps: 15, completed: true }
        ],
        notes: "뒤로 당겨수축 (10kg/15kg, 3/1세트)"
      },
      {
        name: "페이스풀 (어깨후면)",
        category: "어깨",
        targetDetail: "후면삼각근",
        sets: [
          { weight: 15, reps: 15, completed: true },
          { weight: 15, reps: 15, completed: true },
          { weight: 20, reps: 15, completed: true },
          { weight: 20, reps: 15, completed: true }
        ],
        notes: "시선 고정 어깨 자극 (15kg/20kg, 2/2세트)"
      }
    ]
  },

  // ================= 2026년 5월 =================
  {
    date: "2026-05-06",
    title: "암워킹 뒷다리 유연성 및 바벨 로우 등 상부 수축",
    focus: ["코어", "등", "하체"],
    trainerFeedback: "암워킹 시 무릎이 꺾여 흔들리지 않게 고관절 힌지 장력을 유지했습니다. 바벨로우 당길 때 어깨 거상 없이 날개뼈를 조여 마무리하도록 피드백드렸습니다.",
    userNotes: "러시안 트위스트 할 때 옆구리가 엄청 꼬이는 느낌을 받았다. 맨몸스쿼트 시 무릎이 발끝 앞으로 밀리지 않게 통제 완료.",
    homework: "오늘 복습",
    homeworkCompleted: true,
    score: 4,
    exercises: [
      {
        name: "암워킹 (코어·전신·뒷다리 스트레칭)",
        category: "코어",
        targetDetail: "햄스트링 유연성",
        sets: [
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true }
        ],
        notes: "무릎 긴장감 유지 (맨몸)"
      },
      {
        name: "러시안트위스트 (내복사근)",
        category: "코어",
        targetDetail: "내복사근",
        sets: [
          { weight: 0, reps: 20, completed: true },
          { weight: 0, reps: 20, completed: true },
          { weight: 0, reps: 20, completed: true },
          { weight: 0, reps: 20, completed: true }
        ],
        notes: "배 비틀기!! (맨몸)"
      },
      {
        name: "스탠딩아웃타이 (엉덩이)",
        category: "하체",
        targetDetail: "중둔근 상부",
        sets: [
          { weight: 5, reps: 15, completed: true },
          { weight: 5, reps: 15, completed: true },
          { weight: 7.5, reps: 15, completed: true },
          { weight: 7.5, reps: 15, completed: true }
        ],
        notes: "사선방향으로 상체 숙이기 (5kg/7.5kg, 2/2세트)"
      },
      {
        name: "바벨로우 (등상부)",
        category: "등",
        targetDetail: "등 상부/승모근",
        sets: [
          { weight: 10, reps: 15, completed: true },
          { weight: 10, reps: 15, completed: true },
          { weight: 10, reps: 15, completed: true },
          { weight: 15, reps: 15, completed: true }
        ],
        notes: "팔꿈치 뒤로 당기며 날개뼈 조여 완료 (10kg/15kg, 3/1세트)"
      },
      {
        name: "맨몸스쿼트 (하체)",
        category: "하체",
        targetDetail: "대퇴사두근",
        postureImage: "/postures/squat_posture_tip.png",
        sets: [
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true }
        ],
        notes: "무릎 밀리지 않기 (맨몸)"
      }
    ]
  },
  {
    date: "2026-05-08",
    title: "스미스 가슴 프레스 궤적 정립 및 레그 익스텐션",
    focus: ["가슴", "팔", "하체"],
    trainerFeedback: "스미스 벤치프레스 시 등을 패드에 견고하게 붙이고 수직 저항 궤적을 제어했습니다. 레그 익스텐션은 수축 끝 지점에서 엉덩이가 패드에서 뜨지 않게 유지시켰습니다.",
    userNotes: "덤벨 플라이 1~2kg로 가슴 안쪽을 쥐어짜는 연습을 했다. 케이블 삼두 프레스 할 때도 장축이 수직 고정되도록 집중.",
    homework: "5/6 복습",
    homeworkCompleted: true,
    score: 4,
    exercises: [
      {
        name: "스미스 벤치 프레스 (가슴)",
        category: "가슴",
        targetDetail: "대흉근 중부",
        sets: [
          { weight: 5, reps: 15, completed: true },
          { weight: 5, reps: 15, completed: true },
          { weight: 5, reps: 15, completed: true },
          { weight: 5, reps: 15, completed: true }
        ],
        notes: "등은 패드에 붙여둔 상태 (수직내려오기)"
      },
      {
        name: "덤벨 플라이 (가슴)",
        category: "가슴",
        targetDetail: "대흉근 안쪽",
        sets: [
          { weight: 1, reps: 15, completed: true },
          { weight: 2, reps: 15, completed: true },
          { weight: 2, reps: 15, completed: true },
          { weight: 2, reps: 15, completed: true }
        ],
        notes: "팔꿈치 고정하고 안쪽 가슴에 자극 오도록 모으기 (1kg/2kg, 1/3세트)"
      },
      {
        name: "케이블 푸쉬다운 (삼두)",
        category: "팔",
        targetDetail: "삼두 외측두",
        sets: [
          { weight: 10, reps: 15, completed: true },
          { weight: 10, reps: 15, completed: true },
          { weight: 10, reps: 15, completed: true },
          { weight: 10, reps: 15, completed: true }
        ],
        notes: "장축이 수직 고정"
      },
      {
        name: "레그 익스텐션 (앞벅지)",
        category: "하체",
        targetDetail: "대퇴사두근",
        sets: [
          { weight: 20, reps: 15, completed: true },
          { weight: 20, reps: 15, completed: true },
          { weight: 20, reps: 15, completed: true }
        ],
        notes: "내릴때 천천히 엉덩이 안뜨게"
      }
    ]
  },
  {
    date: "2026-05-11",
    title: "원레그 힙브릿지 밸런스 및 스미스 푸쉬업",
    focus: ["코어", "하체", "가슴"],
    trainerFeedback: "원레그 힙브릿지 시 골반 수평 정렬이 무너지지 않도록 중심을 다잡았습니다. 몬스터글루트는 긴 바운싱 10회와 짧은 바운싱 10회를 섞어 자극 역치를 극대화했습니다.",
    userNotes: "윗몸일으키기 시 3kg 원판을 안고 어깨를 말아올렸더니 상복부가 찢어질 것 같다. 푸쉬업 날개뼈 모으기 집중.",
    homework: "5/12 복습",
    homeworkCompleted: true,
    score: 5,
    exercises: [
      {
        name: "원레그 힙브릿지 (코어·힙·뒷벅지)",
        category: "코어",
        targetDetail: "후면코어/둔근",
        sets: [
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true }
        ],
        notes: "골반수평 유지하며 천천히 올라오기 (각 4세트)"
      },
      {
        name: "윗몸일으키기 (복부)",
        category: "코어",
        targetDetail: "복직근 상부",
        sets: [
          { weight: 3, reps: 15, completed: true },
          { weight: 3, reps: 15, completed: true },
          { weight: 3, reps: 15, completed: true },
          { weight: 3, reps: 15, completed: true }
        ],
        notes: "올라올때 어깨 말아올려 턱 끝당겨 올려주기 (맨몸+원판3kg)"
      },
      {
        name: "몬스터 글루트 (엉덩이)",
        category: "하체",
        targetDetail: "중둔근/소둔근",
        sets: [
          { weight: 5, reps: 20, completed: true },
          { weight: 5, reps: 20, completed: true },
          { weight: 5, reps: 20, completed: true },
          { weight: 5, reps: 20, completed: true }
        ],
        notes: "짧게 10번 - 길게 10번 바운싱 / 유지"
      },
      {
        name: "스미스 푸쉬업 (전신·가슴·삼두)",
        category: "가슴",
        targetDetail: "대흉근/삼두",
        sets: [
          { weight: 0, reps: 17, completed: true },
          { weight: 0, reps: 12, completed: true },
          { weight: 0, reps: 12, completed: true },
          { weight: 0, reps: 12, completed: true }
        ],
        notes: "날개뼈를 모으듯이 내려가기! (스미스 7번째칸/5번째칸, 1/3세트)"
      }
    ]
  },
  {
    date: "2026-05-15",
    title: "팔로프 프레스 코어 반동 통제 및 스티프 데드",
    focus: ["코어", "하체", "어깨"],
    trainerFeedback: "케이블 팔로프 프레스 시 케이블 각도를 수직 90도로 유지해 횡방향 회전 저항 코어를 숙련했습니다. 스티프 데드리프트 시 무릎이 너무 뒤로 밀리지 않도록 고정했습니다.",
    userNotes: "사이드레터럴레이즈 2kg로 몸앞 X자 반동 없이 고립하는 법을 연습했다. 아래전완부 스트레칭으로 뭉친 팔꿈치 릴리즈.",
    homework: "5/16 복습",
    homeworkCompleted: true,
    score: 4,
    exercises: [
      {
        name: "케이블 팔로프 프레스 (코어·전신·옆구리)",
        category: "코어",
        targetDetail: "회전 방지 코어",
        sets: [
          { weight: 5, reps: 15, completed: true },
          { weight: 5, reps: 15, completed: true },
          { weight: 10, reps: 15, completed: true },
          { weight: 10, reps: 15, completed: true }
        ],
        notes: "폼롤러 케이블 각도는 90도 유지 / 영상참조 (5kg/10kg)"
      },
      {
        name: "스미스 스티프 데드리프트 (뒷벅지·엉덩이)",
        category: "하체",
        targetDetail: "대퇴이두근",
        postureImage: "/postures/deadlift_posture_tip.png",
        sets: [
          { weight: 5, reps: 15, completed: true },
          { weight: 5, reps: 15, completed: true },
          { weight: 7.5, reps: 15, completed: true },
          { weight: 7.5, reps: 15, completed: true }
        ],
        notes: "밀어놓으며 무릎 뒤로가지 않도록 (레그밴드 추가, 5kg/7.5kg, 2/2세트)"
      },
      {
        name: "이너타이 (안벅지)",
        category: "하체",
        targetDetail: "내전근",
        sets: [
          { weight: 10, reps: 15, completed: true },
          { weight: 10, reps: 15, completed: true },
          { weight: 10, reps: 15, completed: true },
          { weight: 10, reps: 15, completed: true }
        ],
        notes: "동작을 좁혀 진행"
      },
      {
        name: "사이드레터럴레이즈 (측면)",
        category: "어깨",
        targetDetail: "측면삼각근",
        sets: [
          { weight: 2, reps: 15, completed: true },
          { weight: 2, reps: 15, completed: true },
          { weight: 2, reps: 15, completed: true },
          { weight: 2, reps: 15, completed: true }
        ],
        notes: "아래에서 몸과의 X 반동 최소화"
      },
      {
        name: "아래전완부 스트레칭",
        category: "팔",
        targetDetail: "굴곡근 이완",
        sets: [
          { weight: 0, reps: 20, completed: true },
          { weight: 0, reps: 20, completed: true }
        ],
        notes: "맨몸 굴곡근/신전근 이완"
      }
    ]
  },
  {
    date: "2026-05-17",
    title: "케틀벨 스윙 둔근 반동 확보 및 스미스 스텝업",
    focus: ["전신", "하체", "코어"],
    trainerFeedback: "케틀벨 스윙 시 골반을 힌지 사선으로 확실히 열어 밀착 수축하도록 지도했습니다. 파워레그프레스 시 골반 패드 밀착을 단단히 유도해 허리를 완벽히 보호했습니다.",
    userNotes: "스미스 스텝업 시 앞발 뒤꿈치에 힘을 100% 싣고 수평 수축했더니 엉덩이 측면이 찢어질 것 같이 당겼다. 아주 좋음.",
    homework: "폼롤러 및 스트레칭 후 복습 5/15",
    homeworkCompleted: true,
    score: 4,
    exercises: [
      {
        name: "케틀벨 스윙 (코어·엉덩이)",
        category: "전신",
        targetDetail: "코어/둔근",
        sets: [
          { weight: 4, reps: 20, completed: true },
          { weight: 4, reps: 20, completed: true },
          { weight: 4, reps: 20, completed: true },
          { weight: 4, reps: 20, completed: true }
        ],
        notes: "엉덩이 뒤로 밀어내기"
      },
      {
        name: "스미스 스텝업 (엉덩이)",
        category: "하체",
        targetDetail: "대둔근/중둔근",
        sets: [
          { weight: 5, reps: 15, completed: true },
          { weight: 5, reps: 15, completed: true },
          { weight: 7.5, reps: 15, completed: true }
        ],
        notes: "발바닥 전체 터치 X 뒷꿈치로 더 밀어내기 (5kg/7.5kg, 3세트)"
      },
      {
        name: "파워레그프레스 (하체)",
        category: "하체",
        targetDetail: "대퇴사두근",
        sets: [
          { weight: 0, reps: 15, completed: true },
          { weight: 2.5, reps: 15, completed: true },
          { weight: 5, reps: 15, completed: true },
          { weight: 7.5, reps: 15, completed: true }
        ],
        notes: "엉덩이 패드에 밀착하고 손잡이 잘 잡아주기 (빈바/2.5kg/5kg/7.5kg)"
      },
      {
        name: "엘보우플랭크 (코어)",
        category: "코어",
        targetDetail: "복횡근",
        postureImage: "/postures/plank_posture_tip.png",
        sets: [
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true }
        ],
        notes: "몸 일직선에 들어 서도록 유지! (맨몸)"
      }
    ]
  },
  {
    date: "2026-05-18",
    title: "랫풀다운 명치 수축 및 이지바 백익스텐션 로우",
    focus: ["등", "팔"],
    trainerFeedback: "랫풀다운 와이드 그립 시 바를 쇄골 하단 명치 쪽 수직 궤적으로 일정하게 내리도록 피드백해 드렸습니다. 이지바 로우 시 이두 힘의 가입을 통제했습니다.",
    userNotes: "덤벨 로우 시 어깨를 뒤로 먼저 당기고 광배를 당기니 자극이 깊다. 이두 컬 할 때 덤벨 회전을 추가해 수축을 확보했다.",
    homework: "수업전 폼롤러 및 스트레칭",
    homeworkCompleted: true,
    score: 4,
    exercises: [
      {
        name: "랫풀다운 (광배근)",
        category: "등",
        targetDetail: "광배근 하부",
        postureImage: "/postures/latpulldown_posture_tip.png",
        sets: [
          { weight: 12, reps: 15, completed: true },
          { weight: 12, reps: 15, completed: true },
          { weight: 12, reps: 15, completed: true },
          { weight: 19, reps: 15, completed: true }
        ],
        notes: "와이드그립에서 바가 명치 아래쪽으로 내려오도록 (12kg/19kg, 3/1세트)"
      },
      {
        name: "덤벨로우 (등상부+광배근)",
        category: "등",
        targetDetail: "광배근/대원근",
        sets: [
          { weight: 2.5, reps: 15, completed: true },
          { weight: 2.5, reps: 15, completed: true },
          { weight: 5, reps: 15, completed: true },
          { weight: 5, reps: 15, completed: true }
        ],
        notes: "어깨 뒤쪽으로 당기기 (2.5kg/5kg, 2/2세트)"
      },
      {
        name: "백익스텐션에서 이바로우 (등전체)",
        category: "등",
        targetDetail: "척추기립근/광배하부",
        sets: [
          { weight: 10, reps: 15, completed: true },
          { weight: 10, reps: 15, completed: true },
          { weight: 10, reps: 15, completed: true },
          { weight: 10, reps: 15, completed: true }
        ],
        notes: "이지바 명치쪽으로 당겨 등수축 유지 (이지바 10kg)"
      },
      {
        name: "덤벨 바이셉 컬 (이두)",
        category: "팔",
        targetDetail: "상완이두근",
        sets: [
          { weight: 2, reps: 15, completed: true },
          { weight: 2, reps: 15, completed: true },
          { weight: 2, reps: 15, completed: true },
          { weight: 2, reps: 15, completed: true }
        ],
        notes: "덤벨 회전시키면서 수행 (2kg)"
      }
    ]
  },
  {
    date: "2026-05-21",
    title: "덤벨 데드버그 비틀기 및 케이블 풀오버 등 훈련",
    focus: ["코어", "등", "팔"],
    trainerFeedback: "케이블 풀오버 시 광배근 상부 신장성 자극을 위해 팔꿈치를 바깥으로 살짝 밀며 궤적을 그리도록 유도했습니다. 인클라인 해머로우 각도를 조절했습니다.",
    userNotes: "데드버그 시 덤벨 회전을 추가해 배 안쪽까지 강도 높게 쥐어짰다. 백익스텐션 시 기립근과 광배 후면 수축 완료.",
    homework: "5/18 복습",
    homeworkCompleted: true,
    score: 5,
    exercises: [
      {
        name: "데드버그 (코어)",
        category: "코어",
        targetDetail: "코어 근육",
        sets: [
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true }
        ],
        notes: "덤벨을 몸 안쪽으로 회전하며 (각 4세트)"
      },
      {
        name: "백익스텐션 (기립근+등)",
        category: "등",
        targetDetail: "척추기립근",
        sets: [
          { weight: 2.5, reps: 15, completed: true },
          { weight: 2.5, reps: 15, completed: true },
          { weight: 2.5, reps: 15, completed: true },
          { weight: 2.5, reps: 15, completed: true }
        ],
        notes: "팔꿈치 고정하고 등수축 (2.5kg)"
      },
      {
        name: "케이블 풀오버 (등상부)",
        category: "등",
        targetDetail: "광배근/대원근",
        sets: [
          { weight: 20, reps: 15, completed: true },
          { weight: 20, reps: 15, completed: true },
          { weight: 20, reps: 15, completed: true },
          { weight: 20, reps: 15, completed: true }
        ],
        notes: "팔꿈치 바깥으로 내밀기 (20kg)"
      },
      {
        name: "인클라인 덤벨 해머 로우 (등중부/하부)",
        category: "등",
        targetDetail: "광배 하부/능형근",
        sets: [
          { weight: 2.5, reps: 15, completed: true },
          { weight: 2.5, reps: 15, completed: true },
          { weight: 2.5, reps: 15, completed: true },
          { weight: 2.5, reps: 15, completed: true }
        ],
        notes: "상체 각도 낮춰서 당기기 (2.5kg)"
      },
      {
        name: "인클라인 덤벨바이셉컬",
        category: "팔",
        targetDetail: "이두 장두",
        sets: [
          { weight: 2.5, reps: 15, completed: true },
          { weight: 2.5, reps: 15, completed: true }
        ],
        notes: "상완 고정시키고 회전수축 (2.5kg, 2세트)"
      }
    ]
  },
  {
    date: "2026-05-28",
    title: "암풀다운 광배 바깥 확장 및 원암 덤벨 로우",
    focus: ["등"],
    trainerFeedback: "암풀다운 시 광배 근육의 이완 궤적을 넓게 그려 팔꿈치를 바깥쪽으로 당기게 코칭했습니다. 어시스트 풀업은 무릎 지지각을 평평하게 조율했습니다.",
    userNotes: "자격 시험을 앞둔 마지막 PT 수업! 시티드로우로 광배 하부 견갑골 수축을 끝장냈다. 시험 합격 화이팅!",
    homework: "시험 잘보고 오세요!! ♥",
    homeworkCompleted: true,
    score: 5,
    exercises: [
      {
        name: "암풀다운 (광배근)",
        category: "등",
        targetDetail: "광배근 외측",
        sets: [
          { weight: 5, reps: 15, completed: true },
          { weight: 10, reps: 15, completed: true },
          { weight: 10, reps: 15, completed: true },
          { weight: 10, reps: 15, completed: true }
        ],
        notes: "팔꿈치 바깥쪽 당겨주기 (5kg/10kg, 1/3세트)"
      },
      {
        name: "어시스트 풀업 (등)",
        category: "등",
        targetDetail: "광배근/등중부",
        sets: [
          { weight: 59, reps: 15, completed: true },
          { weight: 49, reps: 15, completed: true },
          { weight: 49, reps: 15, completed: true },
          { weight: 49, reps: 15, completed: true }
        ],
        notes: "무릎 패드위에 올려두기 (59kg/49kg, 1/3세트)"
      },
      {
        name: "원암 덤벨 로우 (광배근)",
        category: "등",
        targetDetail: "광배 하부 고립",
        sets: [
          { weight: 2.5, reps: 15, completed: true },
          { weight: 2.5, reps: 15, completed: true },
          { weight: 5, reps: 15, completed: true },
          { weight: 5, reps: 15, completed: true }
        ],
        notes: "팔꿈치 뒤쪽으로 밀어주기 (2.5kg/5kg, 2/2세트, 각 15회)"
      },
      {
        name: "시티드로우 (광배근, 하부승모근)",
        category: "등",
        targetDetail: "하부승모근",
        sets: [
          { weight: 12, reps: 15, completed: true },
          { weight: 12, reps: 15, completed: true },
          { weight: 12, reps: 15, completed: true },
          { weight: 12, reps: 15, completed: true }
        ],
        notes: "뒤로 견갑을 펴주는 느낌 (12kg)"
      }
    ]
  },

  // ================= 2026년 6월 =================
  {
    date: "2026-06-01",
    title: "짐볼 플랭크 전진 밸런스 및 4초 스쿼트 저항",
    focus: ["코어", "하체"],
    trainerFeedback: "짐볼을 활용한 불안정 플랭크 시 전진 압력을 이용해 복압을 한계까지 제어했습니다. 바벨 스쿼트는 하단에서 4초간 등속성 저항 버티기를 훈련시켰습니다.",
    userNotes: "짐볼 힙브릿지 시 뒤꿈치로 볼을 밀며 올라갔더니 뒷허벅지가 터질 것 같다. 레그익스텐션 20kg 성공.",
    homework: "5/15, 4/28 위주로 복습",
    homeworkCompleted: true,
    score: 4,
    exercises: [
      {
        name: "짐볼 플랭크",
        category: "코어",
        targetDetail: "심부코어 안정성",
        postureImage: "/postures/plank_posture_tip.png",
        sets: [
          { weight: 0, reps: 75, completed: true },
          { weight: 0, reps: 90, completed: true },
          { weight: 0, reps: 70, completed: true }
        ],
        notes: "짐볼을 누른채 전진 (1분15초/1분30초/1분10초)"
      },
      {
        name: "짐볼 힙브릿지 (코어·힙)",
        category: "코어",
        targetDetail: "대둔근/후면코어",
        sets: [
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true }
        ],
        notes: "짐볼을 누르며 천천히 올라가기 (아래 전완부 지탱)"
      },
      {
        name: "레그익스텐션 (내전근)",
        category: "하체",
        targetDetail: "대퇴내전근/사두",
        sets: [
          { weight: 10, reps: 15, completed: true },
          { weight: 10, reps: 15, completed: true },
          { weight: 10, reps: 15, completed: true },
          { weight: 20, reps: 15, completed: true }
        ],
        notes: "끝까지 다리 꽉 모아주기 (10kg/20kg, 3/1세트)"
      },
      {
        name: "바벨스쿼트 (하체)",
        category: "하체",
        targetDetail: "대퇴사두근",
        postureImage: "/postures/squat_posture_tip.png",
        sets: [
          { weight: 10, reps: 15, completed: true },
          { weight: 10, reps: 15, completed: true },
          { weight: 15, reps: 15, completed: true },
          { weight: 15, reps: 15, completed: true }
        ],
        notes: "엉덩이 아래로 수평으로 4초 버티기 (10kg/15kg, 2/2세트)"
      }
    ]
  },
  {
    date: "2026-06-08",
    title: "인플랭크 골반 제어 및 대하부 다각도 훈련",
    focus: ["코어", "하체"],
    trainerFeedback: "아웃타이 수행 시 골반을 단단히 접어 상체를 기울여 외측 중둔근 고립률을 최대화했습니다. 이너타이 시 뒤꿈치 안쪽 복사뼈 라인을 쥐어짜는 감각을 유도했습니다.",
    userNotes: "레그익스텐션 20kg 4세트를 완전히 밀어내 수축했다. 인플랭크 시 엉덩이가 높이 솟구치는 걸 고관절 중립으로 수정.",
    homework: "수업전 폼롤러 및 스트레칭",
    homeworkCompleted: true,
    score: 4,
    exercises: [
      {
        name: "인플랭크 (코어)",
        category: "코어",
        targetDetail: "코어",
        postureImage: "/postures/plank_posture_tip.png",
        sets: [
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true }
        ],
        notes: "엉덩이 너무 들리지 않기 (맨몸)"
      },
      {
        name: "아웃타이 (엉덩이)",
        category: "하체",
        targetDetail: "중둔근/소둔근",
        sets: [
          { weight: 32.5, reps: 15, completed: true },
          { weight: 40, reps: 15, completed: true },
          { weight: 40, reps: 33, completed: true },
          { weight: 47.5, reps: 30, completed: true }
        ],
        notes: "골반을 접은상태에서 바깥쪽 엉덩이로 밀어내기 (32.5/40/40/47.5kg)"
      },
      {
        name: "이너타이 (내전근)",
        category: "하체",
        targetDetail: "대퇴내전근",
        sets: [
          { weight: 10, reps: 15, completed: true },
          { weight: 15, reps: 20, completed: true },
          { weight: 15, reps: 30, completed: true },
          { weight: 15, reps: 25, completed: true }
        ],
        notes: "뒷꿈치 안쪽을 쪼여 준다고 생각하기 (10/15/15/15kg)"
      },
      {
        name: "레그익스텐션 (허벅지)",
        category: "하체",
        targetDetail: "대퇴사두근",
        sets: [
          { weight: 20, reps: 20, completed: true },
          { weight: 20, reps: 15, completed: true },
          { weight: 20, reps: 15, completed: true },
          { weight: 20, reps: 23, completed: true }
        ],
        notes: "끝까지 밀어내서 수축하기! (20kg)"
      }
    ]
  },
  {
    date: "2026-06-09",
    title: "백익스텐션 골반 힌지 제어 및 광배근 하강 랫풀다운",
    focus: ["코어", "등", "어깨"],
    trainerFeedback: "랫풀다운 수행 시 날개뼈를 하강시키고 팔꿈치 각도를 갈비뼈 옆구리 쪽으로 수직에 가깝게 당기도록 코칭했습니다. 트위스트 플랭크 시 복압 장력을 유지시켰습니다.",
    userNotes: "백익스텐션 시 골반 힌지를 접어 하단 저항에 저항하면서 골반을 접는 느낌이 확실해졌다. 후면 어깨 수평 유지 성공.",
    homework: "6/8, 6/9 복습",
    homeworkCompleted: true,
    score: 5,
    exercises: [
      {
        name: "백익스텐션 (기립근)",
        category: "코어",
        targetDetail: "척추기립근",
        sets: [
          { weight: 0, reps: 15, completed: true },
          { weight: 0, reps: 15, completed: true },
          { weight: 5, reps: 20, completed: true }
        ],
        notes: "골반을 접어주고 내려가기 (맨몸/5kg, 2/1세트)"
      },
      {
        name: "랫풀다운 (광배근)",
        category: "등",
        targetDetail: "광배근 전체",
        postureImage: "/postures/latpulldown_posture_tip.png",
        sets: [
          { weight: 10, reps: 15, completed: true },
          { weight: 10, reps: 20, completed: true },
          { weight: 10, reps: 15, completed: true },
          { weight: 15, reps: 15, completed: true }
        ],
        notes: "팔꿈치를 아래쪽으로 당겨가기 (10/10/10/15kg)"
      },
      {
        name: "페이스풀 (어깨후면)",
        category: "어깨",
        targetDetail: "후면삼각근",
        sets: [
          { weight: 10, reps: 15, completed: true },
          { weight: 10, reps: 15, completed: true },
          { weight: 15, reps: 15, completed: true },
          { weight: 20, reps: 20, completed: true }
        ],
        notes: "팔꿈치 옆으로 수평으로 일직선 (10/15/20kg, 2/1/1세트)"
      },
      {
        name: "트위스트 플랭크 (내외복사근-코어)",
        category: "코어",
        targetDetail: "외복사근",
        postureImage: "/postures/plank_posture_tip.png",
        sets: [
          { weight: 0, reps: 25, completed: true },
          { weight: 0, reps: 20, completed: true },
          { weight: 0, reps: 20, completed: true },
          { weight: 0, reps: 25, completed: true }
        ],
        notes: "배 힘으로 잘 버텨주기 (맨몸, 25초/20초/20초/25초)"
      }
    ]
  },
  {
    date: "2026-06-15",
    title: "짐볼 코어 플랭크 수축 극대화 및 풀오버 당기기",
    focus: ["코어", "가슴", "등", "어깨"],
    trainerFeedback: "풀오버 머신 수행 시 팔꿈치 굴곡 각도를 고정하고 광배근 상부 장력으로 끝까지 눌러 당기도록 코칭했습니다. 리버스 숄더프레스 시 척추 과신전을 제어했습니다.",
    userNotes: "짐볼 플랭크 1분 30초 성공! 엉덩이가 들리지 않고 완전히 아래로 꽉 눌러 복압을 유지했더니 배 전체가 타는 것 같다.",
    homework: "수업전 폼롤러 및 스트레칭",
    homeworkCompleted: false,
    score: 5,
    exercises: [
      {
        name: "짐볼 플랭크 (코어)",
        category: "코어",
        targetDetail: "코어 안정화",
        postureImage: "/postures/plank_posture_tip.png",
        sets: [
          { weight: 0, reps: 75, completed: true },
          { weight: 0, reps: 80, completed: true },
          { weight: 0, reps: 75, completed: true },
          { weight: 0, reps: 90, completed: true }
        ],
        notes: "엉덩이 낮추기 (1분15초/1분20초/1분15초/1분30초)"
      },
      {
        name: "케이블 플라이 (가슴)",
        category: "가슴",
        targetDetail: "대흉근 내측",
        sets: [
          { weight: 5, reps: 15, completed: true },
          { weight: 5, reps: 15, completed: true },
          { weight: 5, reps: 15, completed: true },
          { weight: 5, reps: 15, completed: true }
        ],
        notes: "가슴 긴장상태 유지 (5kg)"
      },
      {
        name: "풀오버 머신 (등)",
        category: "등",
        targetDetail: "광배 상부/대원근",
        sets: [
          { weight: 20, reps: 15, completed: true },
          { weight: 20, reps: 15, completed: true },
          { weight: 30, reps: 15, completed: true },
          { weight: 20, reps: 15, completed: true }
        ],
        notes: "팔꿈치 고정하고 당기기 (20/30/20kg, 2/1/1세트)"
      },
      {
        name: "리버스 숄더프레스 머신 (어깨전면)",
        category: "어깨",
        targetDetail: "전면삼각근",
        sets: [
          { weight: 5, reps: 15, completed: true },
          { weight: 5, reps: 15, completed: true },
          { weight: 5, reps: 15, completed: true },
          { weight: 5, reps: 15, completed: true }
        ],
        notes: "몸을 기대서 밀기 (5kg)"
      }
    ]
  }
];

export const getInitialSessions = (): PTSession[] => {
  const borderDate = "2026-06-15";

  const formattedSessions = rawSessions.map((raw) => {
    const isCompleted = raw.date <= borderDate;
    
    const exercises: Exercise[] = raw.exercises.map((ex, exIdx) => {
      const sets: ExerciseSet[] = ex.sets.map((set, setIdx) => ({
        setNumber: setIdx + 1,
        weight: set.weight,
        reps: set.reps,
        completed: isCompleted ? set.completed : false
      }));

      return {
        id: `ex-${raw.date}-${exIdx}-${generateId()}`,
        name: ex.name,
        category: ex.category,
        targetDetail: ex.targetDetail,
        postureImage: ex.postureImage,
        sets,
        notes: ex.notes
      };
    });

    return {
      id: `session-${raw.date}-${generateId()}`,
      date: raw.date,
      title: raw.title,
      focus: raw.focus,
      duration: 60,
      trainerFeedback: raw.trainerFeedback,
      userNotes: raw.userNotes,
      exercises,
      completed: isCompleted,
      score: isCompleted ? (raw.score ?? 4) : undefined,
      homework: raw.homework,
      homeworkCompleted: isCompleted ? (raw.homeworkCompleted ?? false) : false
    };
  });

  // Add the planned upcoming session on 2026-06-19
  const upcomingDate = "2026-06-19";
  const upcomingSession: PTSession = {
    id: `session-${upcomingDate}-${generateId()}`,
    date: upcomingDate,
    title: "하체 둔근 확장 및 하프 스쿼트 정복",
    focus: ["하체", "코어"],
    duration: 60,
    trainerFeedback: "다가오는 PT 세션 예정 루틴입니다. 이번 시간에는 백스쿼트 최고 중량 65kg에 도전할 오버로드 데이입니다. 기력 보충 잘 하시고 방문하세요!",
    userNotes: "스쿼트 증량 목표일! 단백질이랑 칼로리 충분히 채워두고 가야겠다.",
    homework: "충분한 탄수화물 섭취 및 다리 폼롤러 스트레칭",
    homeworkCompleted: false,
    completed: false,
    exercises: [
      {
        id: `ex-${upcomingDate}-1-${generateId()}`,
        name: "바벨 백 스쿼트 (Barbell Squat)",
        category: "하체",
        targetDetail: "대퇴사두근/대둔근",
        postureImage: "/postures/squat_posture_tip.png",
        sets: [
          { setNumber: 1, weight: 40, reps: 15, completed: false },
          { setNumber: 2, weight: 50, reps: 12, completed: false },
          { setNumber: 3, weight: 60, reps: 10, completed: false },
          { setNumber: 4, weight: 65, reps: 8, completed: false }
        ],
        notes: "하프 지점에서 2초 정지 후 골반 중립 기립"
      },
      {
        id: `ex-${upcomingDate}-2-${generateId()}`,
        name: "몬스터 글루트 (둔근)",
        category: "하체",
        targetDetail: "중둔근",
        sets: [
          { setNumber: 1, weight: 25, reps: 15, completed: false },
          { setNumber: 2, weight: 30, reps: 12, completed: false },
          { setNumber: 3, weight: 30, reps: 12, completed: false }
        ],
        notes: "엉덩이 수축감 풀리지 않도록 긴장 유지"
      },
      {
        id: `ex-${upcomingDate}-3-${generateId()}`,
        name: "엘보우 플랭크 (Elbow Plank)",
        category: "코어",
        targetDetail: "코어 복횡근",
        postureImage: "/postures/plank_posture_tip.png",
        sets: [
          { setNumber: 1, weight: 0, reps: 60, completed: false },
          { setNumber: 2, weight: 0, reps: 60, completed: false }
        ],
        notes: "엉덩이가 올라오지 않게 등 평평하게 유지"
      }
    ]
  };

  // Sort all chronologically and return
  const allSessions = [...formattedSessions, upcomingSession];
  return allSessions.sort((a, b) => a.date.localeCompare(b.date));
};
