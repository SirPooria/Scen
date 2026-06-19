import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Lock, 
  Smartphone, 
  KeyRound, 
  CheckCircle2, 
  TrendingUp, 
  Coins, 
  Trash2, 
  Clock, 
  ArrowLeft, 
  Sparkles,
  Zap,
  HelpCircle,
  FileText,
  DollarSign
} from "lucide-react";
import { Scenario } from "../types";

// ==========================================
// 1. DYNAMIC OTP LOGIN MODAL COMPONENT
// ==========================================
interface OtpLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (phoneNumber: string) => void;
}

export function OtpLoginModal({ isOpen, onClose, onLoginSuccess }: OtpLoginModalProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let interval: any;
    if (step === "code" && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const regex = /^(09|\+989)\d{9}$/;
    if (!regex.test(phoneNumber)) {
      setError("لطفاً یک شماره موبایل معتبر ایران وارد کنید (مثال: 09123456789)");
      return;
    }

    setLoading(true);
    // Simulate API Delay
    setTimeout(() => {
      setLoading(false);
      setStep("code");
      setTimer(60);
    }, 1200);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (otpCode.length !== 5) {
      setError("کد فعال‌سازی باید ۵ رقمی باشد.");
      return;
    }

    setLoading(true);
    // Simulate absolute success
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess(phoneNumber);
      // Reset
      setPhoneNumber("");
      setOtpCode("");
      setStep("phone");
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-slate-900 border border-slate-800 rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl p-6 sm:p-8 text-right font-sans relative"
        dir="rtl"
      >
        {/* Decor Background Glow */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-red-600/10 flex items-center justify-center text-red-500">
              <Smartphone className="w-4 h-4" />
            </span>
            <h3 className="text-lg font-black text-white">ورود یا ثبت‌نام سریع</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-white transition-colors text-xs bg-slate-950/60 border border-slate-800 h-8 w-8 rounded-xl flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        <AnimatePresence mode="wait">
          {step === "phone" ? (
            <motion.form
              key="phone"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              onSubmit={handleSendOtp}
              className="space-y-5"
            >
              <div className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                جهت دسترسی به سناریوهای کامل، سنسورهای سنجش پتانسیل رشد و آرشیو سناریوها، شماره جادویی خود را بنویسید.
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 block">شماره تلفن همراه شما</label>
                <div className="relative">
                  <Smartphone className="absolute right-4.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                  <input
                    type="tel"
                    placeholder="مثال: 09121234567"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    disabled={loading}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-red-600 rounded-2xl pr-12 pl-4 py-3.5 focus:outline-none transition-colors text-white text-sm font-semibold tracking-wide placeholder:font-normal"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-950/40 border border-red-900 rounded-xl text-red-300 text-xs leading-relaxed">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-extrabold rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-2 text-sm"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4.5 w-4.5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>ارسال پیامک تایید...</span>
                  </>
                ) : (
                  <>
                    <span>دریافت کد تایید رایگان</span>
                    <ArrowLeft className="w-4 h-4 shrink-0 rotate-180" />
                  </>
                )}
              </button>
            </motion.form>
          ) : (
            <motion.form
              key="code"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              onSubmit={handleVerifyOtp}
              className="space-y-5"
            >
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-xs">کد ارسال شده به: <strong className="text-white font-mono">{phoneNumber}</strong></span>
                <button
                  type="button"
                  onClick={() => setStep("phone")}
                  className="text-red-500 text-xs hover:underline cursor-pointer"
                >
                  ویرایش شماره
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 block">کد تأیید ۵ رقمی</label>
                <div className="relative">
                  <KeyRound className="absolute right-4.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="۱ ۲ ۳ ۴ ۵"
                    maxLength={5}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                    disabled={loading}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-2xl pr-12 pl-4 py-3.5 focus:outline-none transition-colors text-white text-center text-lg font-black tracking-[0.5em]"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-950/40 border border-red-900 rounded-xl text-red-300 text-xs leading-relaxed">
                  {error}
                </div>
              )}

              <div className="flex justify-between items-center text-xs text-slate-500">
                {timer > 0 ? (
                  <span>ارسال مجدد تا {timer} ثانیه دیگر</span>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setTimer(60);
                      setError(null);
                    }}
                    className="text-red-400 hover:text-red-300 transition-colors cursor-pointer font-bold"
                  >
                    ارسال مجدد پیامک تایید
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-2 text-sm"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4.5 w-4.5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>در حال بررسی کد...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-100" />
                    <span>تایید هویت و ورود فوری</span>
                  </>
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

// ==========================================
// 2. PRICING & PAYWALL PLANS CARD GRID
// ==========================================
interface PricingPaywallProps {
  onSelectPlan: (planId: string, coinsToAdd: number, price: string, name: string) => void;
  isLoggedIn: boolean;
  onRequestLogin: () => void;
}

export function PricingPaywall({ onSelectPlan, isLoggedIn, onRequestLogin }: PricingPaywallProps) {
  return (
    <div className="w-full max-w-7xl mx-auto py-8 sm:py-12" dir="rtl">
      <div className="text-center mb-12">
        <span className="text-[10px] bg-red-500/10 text-red-500 border border-red-500/20 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
          💎 پکیجهای شارژ کیف پول وایرال ریلز
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-white mt-4 tracking-tight leading-normal">
          با مهندسی سناریو، بازدید میلیونی جذب کنید🚀
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-2xl mx-auto leading-relaxed">
          اکانت خود را به یک کارخانه تولید مداوم ریلزهای پولساز تبدیل کنید. با اولین خرید، ۳۰ روز پشتیبانی و ایده‌پردازی پلتفرم ما باز می‌شود.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch px-2 sm:px-0">
        
        {/* Card 1: استارتر (Starter - Right card in RTL visual flow) */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-[2.5rem] p-6 sm:p-8 flex flex-col justify-between transition-all hover:border-slate-700/80 relative">
          <div className="space-y-6">
            <div>
              <span className="text-[10px] bg-slate-800 text-slate-400 px-3 py-1 rounded-full font-bold uppercase">
                شروع با قدرت
              </span>
              <h3 className="text-xl font-black text-white mt-3">استارتر</h3>
              <p className="text-slate-500 text-xs mt-1">مناسب برای تست و شروع پرقدرت</p>
            </div>

            <div className="py-2">
              <span className="text-2xl sm:text-3xl font-black text-white">۳۹۸,۰۰۰ تومان</span>
              <span className="text-slate-500 text-[10px] mr-1 block sm:inline">/ ماهیانه</span>
            </div>

            <ul className="space-y-3.5 text-xs text-slate-300 border-t border-slate-800/80 pt-6">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>تولید ۱۰ سناریوی وایرال کامل</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>دسترسی به داشبورد پایه</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>پشتیبانی ایمیلی</span>
              </li>
            </ul>
          </div>

          <div className="mt-8">
            <button
              onClick={() => {
                if (isLoggedIn) {
                  onSelectPlan("starter", 10, "۳۹۸,۰۰۰ تومان", "استارتر (۱۰ کوین)");
                } else {
                  onRequestLogin();
                }
              }}
              type="button"
              className="w-full py-3.5 bg-transparent hover:bg-slate-800/50 text-white font-extrabold text-xs rounded-2xl transition-all cursor-pointer border border-slate-700 hover:border-slate-500 text-center flex items-center justify-center gap-1.5 active:scale-95"
            >
              <span>شروع با استارتر</span>
              <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
            </button>
          </div>
        </div>

        {/* Card 2: رشد پیج (Middle Card - Highlighted Best Seller) */}
        <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-red-950/20 border-2 border-red-500/80 rounded-[2.5rem] p-6 sm:p-8 flex flex-col justify-between transition-all shadow-[0_0_40px_rgba(239,68,68,0.15)] relative md:scale-[1.05] z-10">
          <div className="absolute -top-4 right-6 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 text-[10px] sm:text-xs font-black px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 animation-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            <span>پرفروش‌ترین</span>
          </div>

          <div className="space-y-6">
            <div>
              <span className="text-[10px] bg-red-500/15 text-red-400 border border-red-500/20 px-3 py-1 rounded-full font-bold uppercase">
                محبوب‌ترین پلن
              </span>
              <h3 className="text-2xl font-black text-white mt-3 flex items-center gap-2">
                <span>رشد پیج</span>
                <Zap className="w-4 h-4 text-red-500 fill-red-500" />
              </h3>
              <p className="text-slate-400 text-xs mt-1">بهترین انتخاب برای ادمین‌ها و فروشگاه‌ها</p>
            </div>

            <div className="py-2 flex flex-col">
              <span className="text-xs text-slate-500 line-through">۱,۲۹۰,۰۰۰ تومان</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-black text-red-550">۶۹۸,۰۰۰ تومان</span>
                <span className="text-slate-400 text-[10px]">/ ماهیانه</span>
              </div>
            </div>

            <ul className="space-y-3.5 text-xs text-slate-200 border-t border-red-950/40 pt-6">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>تولید ۳۰ سناریوی وایرال کامل</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>دسترسی به A/B تست (آزادسازی سناریوهای تار شده)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>ذخیره نامحدود تاریخچه در داشبورد</span>
              </li>
            </ul>
          </div>

          <div className="mt-8">
            <button
              onClick={() => {
                if (isLoggedIn) {
                  onSelectPlan("growth", 30, "۶۹۸,۰۰۰ تومان", "رشد پیج (۳۰ کوین)");
                } else {
                  onRequestLogin();
                }
              }}
              className="w-full py-4 bg-gradient-to-r from-red-650 to-orange-650 hover:from-red-600 hover:to-orange-600 text-white font-black text-xs rounded-2xl transition-all cursor-pointer shadow-lg active:scale-95 flex items-center justify-center gap-1.5"
            >
              <span>خرید و فعالسازی فوری</span>
              <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
            </button>
          </div>
        </div>

        {/* Card 3: پنل آژانس (Agency - Left Card in RTL visual flow) */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-[2.5rem] p-6 sm:p-8 flex flex-col justify-between transition-all hover:border-slate-700/80 relative">
          <div className="space-y-6">
            <div>
              <span className="text-[10px] bg-slate-800 text-slate-400 px-3 py-1 rounded-full font-bold uppercase">
                باندل آژانس و مارکت‌های بزرگ
              </span>
              <h3 className="text-xl font-black text-white mt-3">پنل آژانس</h3>
              <p className="text-slate-500 text-xs mt-1">ویژه آژانس‌های مارکتینگ و مدیران شبکه‌های اجتماعی</p>
            </div>

            <div className="py-2 flex flex-col">
              <span className="text-xs text-slate-500 line-through">۳,۸۹۰,۰۰۰ تومان</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-black text-white">۱,۹۹۰,۰۰۰ تومان</span>
                <span className="text-slate-500 text-[10px]">/ ماهیانه</span>
              </div>
            </div>

            <ul className="space-y-3.5 text-xs text-slate-300 border-t border-slate-800/80 pt-6">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>تولید ۱۰۰ سناریوی وایرال کامل</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>خروجی پروپوزال PDF (بدون واتر مارک سیستم) برای ارائه به کارفرما</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>اولویت پردازش VIP</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>پشتیبانی اختصاصی</span>
              </li>
            </ul>
          </div>

          <div className="mt-8">
            <button
              onClick={() => {
                if (isLoggedIn) {
                  onSelectPlan("agency", 100, "۱,۹۹۰,۰۰۰ تومان", "پنل آژانس (۱۰۰ کوین)");
                } else {
                  onRequestLogin();
                }
              }}
              className="w-full py-3.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-300 hover:text-white font-extrabold text-xs rounded-2xl transition-all cursor-pointer text-center flex items-center justify-center gap-1.5 active:scale-95"
            >
              <span>ارتقا به پنل آژانس</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// 3. USER ARCHIVED SCENARIOS HISTORY COMPONENT
// ==========================================
interface UserHistoryViewProps {
  history: any[];
  onSelectHistoryItem: (item: any) => void;
  onDeleteHistoryItem: (id: string) => void;
}

export function UserHistoryView({ history, onSelectHistoryItem, onDeleteHistoryItem }: UserHistoryViewProps) {
  if (history.length === 0) {
    return (
      <div className="bg-slate-900/40 border border-slate-800/60 rounded-[2.5rem] p-8 text-center flex flex-col items-center justify-center min-h-[400px] text-right font-sans" dir="rtl">
        <div className="w-14 h-14 bg-slate-800 border border-slate-700 rounded-2xl flex items-center justify-center mb-4 text-slate-500">
          <Clock className="w-6 h-6 animate-pulse" />
        </div>
        <h3 className="text-lg font-black text-white mb-2">هنوز سناریویی ثبت نکردید!</h3>
        <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
          سناریوهایی که با استفاده از اعتبار خود می‌نویسید در اینجا ثبت و بایگانی می‌شوند تا در آینده بتوانید آن‌ها را کپی یا به PDF تبدیل کنید.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-right font-sans" dir="rtl">
      <div>
        <h3 className="text-xl font-black text-white flex items-center gap-2">
          <span>آرشیو و تاریخچه ریلزهای تولیدی شما</span>
          <span className="text-xs font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded-full">
            {history.length} سناریو ذخیره شده
          </span>
        </h3>
        <p className="text-xs text-slate-400 mt-1">با کلیک روی کارت مربوطه، متن سناریوهای آماده مجدداً بر روی کادر اصلی بارگذاری خواهد شد.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {history.map((item) => (
          <div 
            key={item.id}
            className="bg-slate-900 border border-slate-800/80 rounded-[2rem] p-5 hover:border-slate-700 transition-all flex flex-col justify-between group h-full relative"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="text-[10px] text-slate-500 font-mono tracking-tight flex items-center gap-1">
                  <Clock className="w-3 h-3 text-red-500" />
                  {item.date}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteHistoryItem(item.id);
                  }}
                  className="text-slate-500 hover:text-red-500 transition-colors h-7 w-7 rounded-lg bg-slate-950 border border-slate-800/50 flex items-center justify-center cursor-pointer"
                  title="حذف از تاریخچه"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div>
                <h4 className="text-sm font-black text-white leading-relaxed line-clamp-1">
                  📦 {item.prompt.productName}
                </h4>
                <div className="text-[11px] text-slate-400 mt-1 text-right line-clamp-2">
                  <strong>مخاطب:</strong> {item.prompt.targetAudience}
                </div>
              </div>

              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/50 flex flex-col gap-1.5 text-right">
                <div className="text-[10px] text-slate-400 font-bold block mb-0.5">🔥 ایده اول (قلاب تستر):</div>
                <p className="text-xs text-slate-200 line-clamp-2 font-medium">"{item.scenarios[0]?.hook}"</p>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-800/50 flex items-center justify-between">
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-red-500/10 text-red-400 border border-red-500/20 font-bold uppercase shrink-0">
                {item.prompt.tone === "funny" ? "🎭 طنز" : item.prompt.tone === "formal" ? "👔 رسمی" : item.prompt.tone === "excited" ? "🔥 هیجانی" : item.prompt.tone === "aggressive" ? "⚡ جسور" : "⚖️ صمیمی"}
              </span>
              
              <button
                onClick={() => onSelectHistoryItem(item)}
                className="bg-red-600/10 hover:bg-red-600 border border-red-500/10 hover:border-red-600 text-red-400 hover:text-white px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1 group-hover:px-4"
              >
                <span>بارگذاری کامل سناریوها</span>
                <ArrowLeft className="w-3 h-3 rotate-180" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
