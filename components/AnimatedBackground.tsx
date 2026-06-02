export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-1 overflow-hidden pointer-events-none select-none">
      {/* ================= গ্রুপ ১: স্লো মুভিং (Slow & Majestic) ================= */}
      <div className="absolute left-[1%] w-3 h-3 bg-blue-main/60 dark:bg-blue-main/40 rounded-full blur-[0.2px] border-[0.5px] border-blue-main/20 shadow-xs animate-p-slow" />
      <div className="absolute left-[6%] w-2 h-2 bg-accent/70 dark:bg-accent/40 rounded-full border-[0.5px] border-accent/20 animate-p-slow pd-3" />
      <div className="absolute left-[12%] w-4 h-4 bg-blue-soft/50 dark:bg-blue-soft/30 rounded-full blur-[1px] shadow-sm animate-p-slow pd-7" />
      <div className="absolute left-[19%] w-2.5 h-2.5 bg-blue-main/60 dark:bg-blue-main/40 rounded-full border-[0.5px] border-blue-main/20 animate-p-slow pd-1" />
      <div className="absolute left-[25%] w-3.5 h-3.5 bg-accent/60 dark:bg-accent/30 rounded-full blur-[0.5px] shadow-xs animate-p-slow pd-5" />
      <div className="absolute left-[31%] w-2 h-2 bg-blue-main/70 dark:bg-blue-light/50 rounded-full animate-p-slow pd-9" />
      <div className="absolute left-[37%] w-4 h-4 bg-accent-soft/50 dark:bg-accent-soft/30 rounded-full blur-[1px] shadow-sm animate-p-slow pd-4" />
      <div className="absolute left-[44%] w-3 h-3 bg-blue-main/50 dark:bg-blue-main/30 rounded-full blur-[0.5px] animate-p-slow pd-8" />
      <div className="absolute left-[51%] w-2.5 h-2.5 bg-accent/70 dark:bg-accent/40 rounded-full border-[0.5px] border-accent/20 animate-p-slow pd-2" />
      <div className="absolute left-[58%] w-3.5 h-3.5 bg-blue-soft/50 dark:bg-blue-soft/30 rounded-full blur-[1px] shadow-xs animate-p-slow pd-10" />
      <div className="absolute left-[66%] w-2 h-2 bg-blue-main/70 dark:bg-blue-main/40 rounded-full animate-p-slow pd-6" />
      <div className="absolute left-[73%] w-4 h-4 bg-accent/50 dark:bg-accent/30 rounded-full blur-[1px] shadow-sm animate-p-slow pd-3" />
      <div className="absolute left-[81%] w-2.5 h-2.5 bg-blue-main/60 dark:bg-blue-light/40 rounded-full border-[0.5px] border-blue-main/10 animate-p-slow pd-7" />
      <div className="absolute left-[88%] w-3 h-3 bg-accent-soft/60 dark:bg-accent-soft/30 rounded-full blur-[0.5px] animate-p-slow pd-1" />
      <div className="absolute left-[94%] w-2 h-2 bg-blue-main/70 dark:bg-blue-main/40 rounded-full animate-p-slow pd-5" />

      {/* ================= গ্রুপ ২: মিডিয়াম স্পিড (Mid Speed Dynamic) ================= */}
      <div className="absolute left-[3%] w-2.5 h-2.5 bg-accent/60 dark:bg-accent/40 rounded-full border-[0.5px] border-accent/20 animate-p-mid pd-2" />
      <div className="absolute left-[9%] w-3.5 h-3.5 bg-blue-main/50 dark:bg-blue-main/30 rounded-full blur-[0.5px] shadow-xs animate-p-mid pd-6" />
      <div className="absolute left-[16%] w-2 h-2 bg-accent-soft/75 dark:bg-accent-soft/40 rounded-full animate-p-mid pd-1" />
      <div className="absolute left-[22%] w-3 h-3 bg-blue-main/50 dark:bg-blue-light/30 rounded-full border-[0.5px] border-blue-main/10 animate-p-mid pd-9" />
      <div className="absolute left-[28%] w-2 h-2 bg-blue-main/70 dark:bg-blue-main/40 rounded-full animate-p-mid pd-4" />
      <div className="absolute left-[34%] w-3 h-3 bg-accent/60 dark:bg-accent/30 rounded-full blur-[0.5px] animate-p-mid pd-8" />
      <div className="absolute left-[40%] w-2.5 h-2.5 bg-blue-soft/60 dark:bg-blue-soft/40 rounded-full animate-p-mid pd-3" />
      <div className="absolute left-[47%] w-3.5 h-3.5 bg-blue-main/50 dark:bg-blue-main/30 rounded-full blur-[1px] shadow-xs animate-p-mid pd-7" />
      <div className="absolute left-[53%] w-2 h-2 bg-accent/70 dark:bg-accent/40 rounded-full animate-p-mid pd-2" />
      <div className="absolute left-[60%] w-3 h-3 bg-accent-soft/60 dark:bg-accent-soft/30 rounded-full border-[0.5px] border-accent/10 animate-p-mid pd-10" />
      <div className="absolute left-[68%] w-2 h-2 bg-blue-main/60 dark:bg-blue-light/40 rounded-full animate-p-mid pd-5" />
      <div className="absolute left-[75%] w-3.5 h-3.5 bg-blue-main/50 dark:bg-blue-main/30 rounded-full blur-[0.5px] animate-p-mid pd-1" />
      <div className="absolute left-[83%] w-2 h-2 bg-accent/70 dark:bg-accent/40 rounded-full animate-p-mid pd-6" />
      <div className="absolute left-[89%] w-3 h-3 bg-blue-soft/60 dark:bg-blue-soft/30 rounded-full blur-[0.5px] animate-p-mid pd-4" />
      <div className="absolute left-[96%] w-2.5 h-2.5 bg-accent-soft/70 dark:bg-accent-soft/40 rounded-full animate-p-mid pd-8" />

      {/* ================= গ্রুপ ৩: ফাস্ট মুভিং (Fast & Lively) ================= */}
      <div className="absolute left-[5%] w-2 h-2 bg-blue-main/60 dark:bg-blue-light/40 rounded-full animate-p-fast pd-4" />
      <div className="absolute left-[11%] w-3 h-3 bg-blue-main/50 dark:bg-blue-main/40 rounded-full border-[0.5px] border-blue-main/20 animate-p-fast pd-1" />
      <div className="absolute left-[18%] w-2 h-2 bg-accent/70 dark:bg-accent/40 rounded-full animate-p-fast pd-6" />
      <div className="absolute left-[24%] w-2.5 h-2.5 bg-blue-soft/60 dark:bg-blue-soft/40 rounded-full border-[0.5px] border-blue-soft/20 animate-p-fast pd-3" />
      <div className="absolute left-[30%] w-1.5 h-1.5 bg-accent-soft/80 dark:bg-accent-soft/50 rounded-full animate-p-fast pd-9" />
      <div className="absolute left-[36%] w-3 h-3 bg-blue-main/50 dark:bg-blue-main/30 rounded-full blur-[0.5px] animate-p-fast pd-5" />
      <div className="absolute left-[42%] w-2 h-2 bg-accent/70 dark:bg-accent/40 rounded-full animate-p-fast pd-10" />
      <div className="absolute left-[49%] w-2.5 h-2.5 bg-blue-main/60 dark:bg-blue-light/40 rounded-full animate-p-fast pd-2" />
      <div className="absolute left-[56%] w-2 h-2 bg-blue-main/70 dark:bg-blue-main/40 rounded-full animate-p-fast pd-8" />
      <div className="absolute left-[63%] w-3 h-3 bg-accent/60 dark:bg-accent/30 rounded-full border-[0.5px] border-accent/20 animate-p-fast pd-4" />
      <div className="absolute left-[70%] w-2 h-2 bg-accent-soft/70 dark:bg-accent-soft/40 rounded-full animate-p-fast pd-7" />
      <div className="absolute left-[77%] w-2.5 h-2.5 bg-blue-soft/60 dark:bg-blue-soft/40 rounded-full animate-p-fast pd-1" />
      <div className="absolute left-[85%] w-2 h-2 bg-blue-main/70 dark:bg-blue-main/40 rounded-full animate-p-fast pd-6" />
      <div className="absolute left-[92%] w-3 h-3 bg-accent/60 dark:bg-accent/30 rounded-full blur-[0.5px] animate-p-fast pd-3" />
      <div className="absolute left-[98%] w-1.5 h-1.5 bg-blue-main/70 dark:bg-blue-light/50 rounded-full animate-p-fast pd-10" />

      {/* ================= গ্রুপ ৪: সুপার ফাস্ট এবং টাইনি (Super Fast Sparks) ================= */}
      <div className="absolute left-[8%] w-1.5 h-1.5 bg-accent/80 dark:bg-accent/50 rounded-full animate-p-super pd-3" />
      <div className="absolute left-[21%] w-2 h-2 bg-blue-main/60 dark:bg-blue-main/40 rounded-full border-[0.5px] border-blue-main/20 animate-p-super pd-7" />
      <div className="absolute left-[35%] w-1.5 h-1.5 bg-blue-soft/80 dark:bg-blue-soft/50 rounded-full animate-p-super pd-1" />
      <div className="absolute left-[50%] w-2 h-2 bg-accent-soft/75 dark:bg-accent-soft/40 rounded-full animate-p-super pd-9" />
      <div className="absolute left-[65%] w-1.5 h-1.5 bg-blue-main/70 dark:bg-blue-light/50 rounded-full animate-p-super pd-5" />
      <div className="absolute left-[79%] w-2 h-2 bg-blue-main/60 dark:bg-blue-main/40 rounded-full border-[0.5px] border-blue-main/20 animate-p-super pd-2" />
      <div className="absolute left-[91%] w-1.5 h-1.5 bg-accent/80 dark:bg-accent/50 rounded-full animate-p-super pd-8" />
      <div className="absolute left-[14%] w-2 h-2 bg-blue-soft/70 dark:bg-blue-soft/40 rounded-full animate-p-super pd-4" />
      <div className="absolute left-[46%] w-1.5 h-1.5 bg-accent-soft/80 dark:bg-accent-soft/50 rounded-full animate-p-super pd-10" />
      <div className="absolute left-[70%] w-2 h-2 bg-blue-main/60 dark:bg-blue-main/40 rounded-full blur-[0.2px] animate-p-super pd-6" />
    </div>
  );
}
