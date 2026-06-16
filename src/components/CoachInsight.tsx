import React, { useState, useEffect } from 'react';
import { PTSession } from '../types';
import { Sparkles, MessageSquare, Send, Quote, Heart, Zap, Shield, User } from 'lucide-react';

interface CoachInsightProps {
  sessions: PTSession[];
}

export default function CoachInsight({ sessions }: CoachInsightProps) {
  const [query, setQuery] = useState("");
  const [chatHistory, setChatHistory] = useState<{ sender: 'user' | 'coach'; text: string; time: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [analysisText, setAnalysisText] = useState("");

  // Compile general statistics to feeds the static or dynamic coach intro
  useEffect(() => {
    const total = sessions.length;
    const completed = sessions.filter(s => s.completed).length;
    
    // Find highest weight in Back Squat or Leg Press to mention
    let maxSquatWeight = 0;
    let maxLegPressWeight = 0;
    sessions.forEach(s => {
      s.exercises.forEach(e => {
        if (e.name.includes("스쿼트")) {
          e.sets.forEach(set => {
            if (set.weight > maxSquatWeight) maxSquatWeight = set.weight;
          });
        }
        if (e.name.includes("레그 프레스")) {
          e.sets.forEach(set => {
            if (set.weight > maxLegPressWeight) maxLegPressWeight = set.weight;
          });
        }
      });
    });

    const analysis = `안녕하세요! 회원님의 전담 AI 코프 에이든(Aiden)입니다. 
지난 12월부터 현재까지 누적된 총 ${total}회(이수 완료 ${completed}회)의 퍼스널 트레이닝 기록을 정밀 분석해 보았습니다.

💪 주요 분석 결과 및 전술가이드:
1. 점진적 과부하 달성도: 백 스쿼트 최고 중량 ${maxSquatWeight > 0 ? maxSquatWeight : 60}kg, 레그 프레스 최고 중량 ${maxLegPressWeight > 0 ? maxLegPressWeight : 140}kg 를 무난히 완수하며 하체 지구력 부문에서 괄목할 성장을 이루셨습니다.
2. 성실 연도 분석 (Streak): 3월과 4월, 5월에 주당 평균 2회(월 8회)의 빈도를 일정하게 소화해 주신 것이 근성장의 매우 소중한 포석이 되었습니다.
3. 6월 회복 가이드: 현재 6월은 3회의 세션으로 기록 중입니다. 다가오는 6월 19일 세션에서는 하프 스쿼트 오버로드 데이가 계획되어 있으니 충분한 탄수화물 식단 덤벨 정밀 웜업을 권고합니다.`;

    setAnalysisText(analysis);

    // Initial greeting from coach
    setChatHistory([
      {
        sender: 'coach',
        text: `반갑습니다, 회원님! 식단 구성, 고중량 훈련 전 부상 예방책, 혹은 오늘 부위별 근육통 원인에 대해 무엇이든 전담 에이든 코치에게 물어보세요!`,
        time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [sessions]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const currentTime = new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
    const userMsg = query.trim();
    
    // Append user message
    setChatHistory(prev => [...prev, { sender: 'user', text: userMsg, time: currentTime }]);
    setQuery("");
    setIsTyping(true);

    // Generate responsive feedback based on keywords
    setTimeout(() => {
      let coachReply = "";

      if (userMsg.includes("식단") || userMsg.includes("밥") || userMsg.includes("닭가슴살") || userMsg.includes("프로틴")) {
        coachReply = `회원님의 PT 성장 속도에 불을 붙일 영양 요건입니다. 현재 체중 x 1.5g ~ 2.0g의 단백질 섭취를 추천합니다. 
스쿼트나 고강도 전신 세션을 한 날에는 '단백질 닭가슴살 150g + 고구마/햇반 1개'를 탄크 조합으로 운동 후 1시간 내에 보충해 주세요. 술과 당분이 높은 탄산가루 음료는 근육 회복 속도를 절반으로 지연시킵니다!`;
      } else if (userMsg.includes("통증") || userMsg.includes("아파") || userMsg.includes("무릎") || userMsg.includes("허리") || userMsg.includes("염증")) {
        coachReply = `런지 또는 주말 고중량 스쿼트 후 무릎 전면부에 약한 통증이 발생했다면, 대퇴사두근의 폼롤러 마사지와 장강근 스트레칭을 즉시 이행해 신장성 긴장을 낮춰줘야 마찰을 피할 수 있습니다. 
만약 날카로운 통증이 속출된다면 다음 6월 19일 PT 전까지 무거운 기립 중량 훈련은 배제하고, 저항 밴드 위주의 가동성 모빌리티 운동으로 선회해 드리겠습니다. 꼭 저에게 오프라인에서도 말씀해 주세요!`;
      } else if (userMsg.includes("하체") || userMsg.includes("스쿼트") || userMsg.includes("다리")) {
        coachReply = `우수한 기록에 따르면 회원님의 하체 근지구력은 이미 고도로 발달되어 가고 있습니다. 
다만 백 스쿼트를 하실 때 가슴을 곧게 펴는 '흉추 가동성'이 무너져 허리 아치에 보상 통증이 오는 경우가 가끔 있으니 흉압 벨트 복압 유지를 핵심으로 훈련을 늘 가져가겠습니다. 기구 대퇴 자극을 최대화하기 위해 레그프레스 발판의 위치 유행성도 조언해 드립니다.`;
      } else if (userMsg.includes("등") || userMsg.includes("랫풀") || userMsg.includes("어깨") || userMsg.includes("숄더")) {
        coachReply = `상체 볼륨의 비결은 견갑골(날개뼈)의 하강과 거상 컨트롤입니다. 
랫풀다운 시 양손 손잡이를 움켜진 손가락 아귀 힘으로만 무식하게 당기면 전완만 지치고 등이 단련되지 않으니, '새끼손가락' 부위에 걸고 팔꿈치 칼날로 명치를 갈라 들어온다는 상상을 해주세요. 승모근 가담이 비약적으로 가벼워질 겁니다.`;
      } else if (userMsg.includes("정체기") || userMsg.includes("무게") || userMsg.includes("증량")) {
        coachReply = `중량이 정체될 때는 세트 수나 휴식 시간에 역치를 줘야 합니다. 
일반 60~90초 휴식을 2분까지 늘려 온전히 ATP 고갈 회복력을 획득한 뒤, 1세트에서 1-2rep만이라도 목표 중량을 초과해 마이너 밀착 트레이닝을 진행하는 '스트렝스 루틴'을 도입할 시기입니다. 다음 6월 19일 세션에서 이 스트렝스 한계 테스트를 진행하겠습니다.`;
      } else {
        coachReply = `질문해 주신 내용 아주 적극적이며 긍정적인 운동 태도입니다! 회원님의 지난 ${sessions.length}회 기록을 기반으로 보면 회복력과 점진 과부하 리듬이 아주 좋습니다. 
말씀 주신 부분은 다가올 개인 맞춤 세션에서 정식 피드백과 코칭으로 꼼꼼히 반영해 드리겠습니다. 수분 보충 절대 잊지 마세요!`;
      }

      setChatHistory(prev => [...prev, {
        sender: 'coach',
        text: coachReply,
        time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6" id="coach-insight-block">
      {/* Dynamic Summary analysis output on Left (3/5) */}
      <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
        <div className="absolute right-0 top-0 w-32 h-32 bg-lime-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-lime-500/10 text-lime-400 border border-lime-500/20">
              <Sparkles className="w-5 h-5" />
            </span>
            <h3 className="text-sm font-black text-slate-100 uppercase tracking-wider font-mono">
              PT 기록 기반 AI 코치 리포트
            </h3>
          </div>

          <div className="relative bg-slate-950/65 rounded-xl border border-slate-800/80 p-5">
            <Quote className="absolute right-4 top-4 w-12 h-12 text-slate-800 opacity-20" />
            <pre className="text-xs text-slate-300 font-sans whitespace-pre-wrap leading-relaxed">
              {analysisText}
            </pre>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-800/60 flex items-center gap-3 text-xs text-slate-500 font-mono">
          <span className="flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-lime-400" />
            통합 분석 엔진 작동 중
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
          <span>업데이트: 방금 전</span>
        </div>
      </div>

      {/* Interactive Coach Q&A Box on Right (2/5) */}
      <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between h-[420px]">
        <div>
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800 mb-4">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-lime-400 font-black text-sm">
                A
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-slate-900" />
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-200">에이든 (Aiden Senior Coach)</h4>
              <p className="text-[10px] text-slate-500 font-mono">스포츠 재활 및 웨이트 피지컬 전문의</p>
            </div>
          </div>

          {/* Chat scrolling log */}
          <div className="space-y-3 h-[240px] overflow-y-auto pr-1 flex flex-col-reverse scrollbar-thin">
            <div className="space-y-3">
              {chatHistory.map((chat, idx) => (
                <div 
                  key={idx} 
                  className={`flex flex-col ${chat.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className={`max-w-[85%] rounded-xl px-3 py-2 text-xs leading-relaxed ${
                    chat.sender === 'user' 
                      ? 'bg-lime-400 text-slate-950 font-semibold rounded-tr-none' 
                      : 'bg-slate-950 border border-slate-800 text-slate-300 rounded-tl-none'
                  }`}>
                    {chat.text}
                  </div>
                  <span className="text-[9px] text-slate-600 font-mono mt-0.5 px-0.5">{chat.time}</span>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex items-center gap-1.5 pl-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  <span className="text-[10px] text-slate-600 font-mono ml-1">에이든 코치가 분석 중...</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action input trigger */}
        <form onSubmit={handleSendMessage} className="mt-3 pt-3 border-t border-slate-800/80 flex items-center gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isTyping}
            placeholder="식단 조언, 어깨 통증 등 궁금한 점 질문..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-slate-700 transition font-medium"
          />
          <button
            type="submit"
            disabled={isTyping || !query.trim()}
            className="p-2 rounded-xl bg-lime-500 hover:bg-lime-400 text-slate-950 disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer"
          >
            <Send className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </form>
      </div>
    </div>
  );
}
