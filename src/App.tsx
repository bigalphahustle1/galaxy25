import { useEffect, useState } from 'react';

export default function App() {
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
  const [question, setQuestion] = useState(1);
  const [verifyingStep, setVerifyingStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (qNumber: number) => {
    if (qNumber === 1 && question === 1) setQuestion(2);
    if (qNumber === 2 && question === 2) setQuestion(3);
    if (qNumber === 3 && question === 3) {
      setQuestion(4);
      setTimeout(() => setVerifyingStep(1), 1000);
      setTimeout(() => setVerifyingStep(2), 2000);
      setTimeout(() => setVerifyingStep(3), 3000);
      setTimeout(() => setVerifyingStep(4), 4000);
    }
  };

  const getQuestionProps = (qNum: number) => {
    let classes = "space-y-6 mb-16 transition-all duration-500";
    if (question < qNum) classes += " opacity-50 pointer-events-none";
    if (question > qNum) classes += " opacity-50 pointer-events-none";
    return { className: classes };
  };

  let progress = "33%";
  if (question === 2) progress = "66%";
  if (question >= 3) progress = "100%";

  return (
    <div className="dark">
      {/* Urgency Top Bar */}
      <div className="bg-secondary-container text-white py-2 px-4 text-center sticky top-0 z-[60] shadow-lg">
        <p className="font-headline font-bold text-sm tracking-tight flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
            warning
          </span>
          &gt; ATENÇÃO: Esta oferta expira em:{' '}
          <span className="font-mono bg-black/20 px-2 rounded">{formatTime(timeLeft)}</span>
        </p>
      </div>

      {/* Top Navigation */}
      <header className="fixed top-10 w-full z-50 bg-[#131313]/60 backdrop-blur-xl flex justify-between items-center px-6 py-4 max-w-full">
        <div className="text-xl font-black text-[#bcc3ff] tracking-tight font-headline uppercase">
          SAMSUNG GALAXY S25
        </div>
        <nav className="hidden md:flex gap-8 items-center">
          <a className="text-[#bcc3ff] border-b-2 border-[#bcc3ff] pb-1 font-headline tracking-tighter uppercase font-bold text-sm" href="#">
            Specs
          </a>
          <a className="text-white/60 hover:text-white font-headline tracking-tighter uppercase font-bold text-sm transition-colors" href="#">
            Rules
          </a>
          <a className="text-white/60 hover:text-white font-headline tracking-tighter uppercase font-bold text-sm transition-colors" href="#">
            Privacy
          </a>
        </nav>
        <div className="text-[#bcc3ff] font-headline font-bold tracking-tighter">00:00:00</div>
      </header>

      <main className="relative overflow-hidden pt-24">
        {/* Hero Section */}
        <section className="kinetic-gradient min-h-[819px] flex flex-col items-center justify-center px-6 py-20 relative">
          <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-12 items-center">
            <div className="z-10 order-2 lg:order-1">
              <span className="inline-block bg-primary-container text-primary px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                Exclusivo Brasil
              </span>
              <h1 className="font-headline text-5xl md:text-7xl font-extrabold text-white leading-[0.95] tracking-tighter mb-6">
                Parabéns!
                <br />
                <span className="text-primary">Você foi selecionado!</span>
              </h1>
              <p className="text-on-surface-variant text-lg md:text-xl max-w-xl mb-8 leading-relaxed">
                Como parte do nosso programa de fidelidade no Brasil, você tem a chance de ganhar o novo Samsung Galaxy S25. Responda a 3 perguntas rápidas para continuar.
              </p>
              <div className="flex items-center gap-4 text-sm font-medium text-tertiary">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified
                </span>
                <span>Promoção Verificada Samsung Brasil</span>
              </div>
            </div>
            <div className="relative order-1 lg:order-2 flex justify-center">
              <div className="absolute -inset-10 bg-primary/20 blur-[120px] rounded-full"></div>
              <img
                alt="New Samsung Galaxy S25 model"
                className="relative z-10 w-full max-w-lg drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform rotate-6 hover:rotate-0 transition-transform duration-700"
                src="https://lh3.googleusercontent.com/aida/ADBb0ug7tL0Mrcm9coYl0xnNUe6OiLN6I8C48QigDuebgwxPQgb0-FtEybmR-VAYfkMO63jbVUVXXUP6ft6G03rK2prL27RQMWTkGI5uEV_3luh_URGLHvm_ReGEE1sIjaKi8cHPmi3-KbmxetmfgbX2x0yWJzcf4CLnIR_ORPKpCLkYQSkqe_ooLhpwi0Oveitht3i0Xa7EAXXnS385xb6OGhxsZ0JKYufBPRoBDs6ah0VWVq9CcdiEGilJkyE_cuzF1yqXI657QEVe5g"
              />
            </div>
          </div>
        </section>

        {/* Survey Section */}
        <section className="bg-surface-container-low py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="glass-card p-8 md:p-12 rounded-3xl border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-primary transition-all duration-500"></div>
              {/* Progress Header */}
              <div className="flex justify-between items-end mb-12">
                <div>
                  <h2 className="font-headline text-3xl font-bold text-white mb-2">Questionário</h2>
                  <p className="text-on-surface-variant">Rápido e fácil: leva menos de 1 minuto.</p>
                </div>
                <div className="text-right">
                  <span className="text-primary font-headline font-black text-4xl italic transition-all">{progress}</span>
                </div>
              </div>

              {/* Question 1 */}
              <div {...getQuestionProps(1)}>
                <div className="flex gap-4 items-start">
                  <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </span>
                  <h3 className="font-headline text-xl font-bold text-white">Você reside atualmente no Brasil?</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => handleAnswer(1)} className="bg-surface-container-high hover:bg-primary hover:text-on-primary py-4 rounded-xl font-bold transition-all duration-300 transform active:scale-95 border border-white/5 cursor-pointer">
                    SIM
                  </button>
                  <button onClick={() => handleAnswer(1)} className="bg-surface-container-high hover:bg-primary hover:text-on-primary py-4 rounded-xl font-bold transition-all duration-300 transform active:scale-95 border border-white/5 cursor-pointer">
                    NÃO
                  </button>
                </div>
              </div>

              {/* Question 2 */}
              <div {...getQuestionProps(2)}>
                <div className="flex gap-4 items-start">
                  <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </span>
                  <h3 className="font-headline text-xl font-bold text-white">Qual marca de smartphone você usa atualmente?</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button onClick={() => handleAnswer(2)} className="bg-surface-container-high hover:bg-primary hover:text-on-primary py-4 rounded-xl font-bold border border-white/5 transition-all duration-300 transform active:scale-95 cursor-pointer">
                    SAMSUNG
                  </button>
                  <button onClick={() => handleAnswer(2)} className="bg-surface-container-high hover:bg-primary hover:text-on-primary py-4 rounded-xl font-bold border border-white/5 transition-all duration-300 transform active:scale-95 cursor-pointer">
                    APPLE
                  </button>
                  <button onClick={() => handleAnswer(2)} className="bg-surface-container-high hover:bg-primary hover:text-on-primary py-4 rounded-xl font-bold border border-white/5 transition-all duration-300 transform active:scale-95 cursor-pointer">
                    OUTRO
                  </button>
                </div>
              </div>

              {/* Question 3 */}
              <div {...getQuestionProps(3)} className={`${getQuestionProps(3).className.replace(' mb-16', '')}`}>
                <div className="flex gap-4 items-start">
                  <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </span>
                  <h3 className="font-headline text-xl font-bold text-white">Se você ganhar, qual cor você prefere?</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => handleAnswer(3)} className="bg-surface-container-high flex flex-col items-center gap-3 py-6 rounded-xl font-bold border border-white/5 hover:bg-primary hover:text-on-primary transition-all duration-300 transform active:scale-95 cursor-pointer group">
                    <div className="w-8 h-8 rounded-full bg-[#1c1c1c] border border-white/20 group-hover:border-on-primary/50"></div>
                    PRETO FANTASMA
                  </button>
                  <button onClick={() => handleAnswer(3)} className="bg-surface-container-high flex flex-col items-center gap-3 py-6 rounded-xl font-bold border border-white/5 hover:bg-primary hover:text-on-primary transition-all duration-300 transform active:scale-95 cursor-pointer group">
                    <div className="w-8 h-8 rounded-full bg-[#d9d9d9] border border-white/20 group-hover:border-on-primary/50"></div>
                    PRATA
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Status Area */}
        {question >= 4 && (
          <section className="bg-surface py-20 px-6 transition-all duration-500">
            <div className="max-w-xl mx-auto space-y-4">
              {verifyingStep >= 1 && (
                <div className="flex items-center justify-between p-5 rounded-2xl bg-surface-container-highest border border-white/5 transition-all animate-in fade-in slide-in-from-bottom-2">
                  <span className="font-medium text-on-surface">Verificando estoque...</span>
                  <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                </div>
              )}
              {verifyingStep >= 2 && (
                <div className="flex items-center justify-between p-5 rounded-2xl bg-surface-container-highest border border-white/5 transition-all animate-in fade-in slide-in-from-bottom-2">
                  <span className="font-medium text-on-surface">Validando sua resposta...</span>
                  <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                </div>
              )}
              {verifyingStep >= 3 && (
                <div className="flex items-center justify-between p-5 rounded-2xl bg-tertiary/10 border border-tertiary/30 transition-all animate-in fade-in slide-in-from-bottom-2">
                  <span className="font-bold text-tertiary">Vaga disponível!</span>
                  <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Final CTA */}
        {verifyingStep >= 4 && (
          <section className="bg-surface-container-low py-24 px-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="max-w-2xl mx-auto">
              <h2 className="font-headline text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter uppercase">TUDO PRONTO!</h2>
              <p className="text-on-surface-variant text-lg mb-12">
                Clique no botão abaixo na próxima página e insira seus dados para concluir sua participação. Você está a apenas um passo do seu novo Galaxy S25.
              </p>
              <a
                className="group relative inline-flex items-center justify-center bg-tertiary text-on-tertiary px-10 py-6 rounded-xl font-headline font-extrabold text-xl tracking-tight transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-[0_0_40px_rgba(102,223,117,0.3)] hover:shadow-[0_0_60px_rgba(102,223,117,0.5)]"
                href="https://singingfiles.com/show.php?l=0&u=1073998&id=70079"
              >
                <span className="relative z-10 flex items-center gap-3">
                  [REIVINDICAR MEU S25 AGORA]
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
              </a>
              <div className="mt-12 flex flex-wrap justify-center gap-8 opacity-40 grayscale">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined">security</span>
                  <span className="text-xs font-bold uppercase tracking-widest">Conexão Segura SSL</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined">verified_user</span>
                  <span className="text-xs font-bold uppercase tracking-widest">Proteção de Dados LGPD</span>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#1b1b1b] w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        <div className="font-body text-sm text-white/40">© 2024 Samsung Electronics Co., Ltd.</div>
        <div className="flex flex-wrap justify-center gap-6">
          <a className="text-white/40 hover:text-[#bcc3ff] font-body text-sm transition-opacity duration-300" href="#">
            Terms of Service
          </a>
          <a className="text-white/40 hover:text-[#bcc3ff] font-body text-sm transition-opacity duration-300" href="#">
            Privacy Policy
          </a>
          <a className="text-white/40 hover:text-[#bcc3ff] font-body text-sm transition-opacity duration-300" href="#">
            Official Rules
          </a>
          <a className="text-white/40 hover:text-[#bcc3ff] font-body text-sm transition-opacity duration-300" href="#">
            Contact Support
          </a>
        </div>
      </footer>

      {/* Persistant Countdown Ticker */}
      <div className="fixed bottom-0 left-0 w-full bg-secondary-container text-white py-1 z-50 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center overflow-hidden whitespace-nowrap">
        <div className="flex gap-12 animate-marquee">
          <span>ÚLTIMAS UNIDADES DISPONÍVEIS • ÚLTIMAS UNIDADES DISPONÍVEIS • ÚLTIMAS UNIDADES DISPONÍVEIS • ÚLTIMAS UNIDADES DISPONÍVEIS • ÚLTIMAS UNIDADES DISPONÍVEIS</span>
          <span>ÚLTIMAS UNIDADES DISPONÍVEIS • ÚLTIMAS UNIDADES DISPONÍVEIS • ÚLTIMAS UNIDADES DISPONÍVEIS • ÚLTIMAS UNIDADES DISPONÍVEIS • ÚLTIMAS UNIDADES DISPONÍVEIS</span>
        </div>
      </div>
    </div>
  );
}

