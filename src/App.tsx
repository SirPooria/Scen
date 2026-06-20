import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Copy, 
  Check, 
  RotateCcw, 
  RefreshCw,
  Send, 
  Megaphone, 
  Users, 
  ShoppingBag, 
  TrendingUp, 
  FileText, 
  Video, 
  Mic2, 
  HelpCircle, 
  Flame, 
  AlertTriangle,
  Cpu,
  Printer,
  Coins,
  Lock,
  History,
  LogOut,
  CheckCircle2,
  Wallet,
  ArrowLeft,
  User,
  ExternalLink,
  Zap
} from "lucide-react";
import { Scenario, ExampleConfig } from "./types";
import { OtpLoginModal, PricingPaywall, UserHistoryView } from "./components/SaaSComponents";
import { UserProfileView } from "./components/UserProfileView";


const ALL_EXAMPLES: ExampleConfig[] = [
  {
    title: "👞 کفش چرم طبیعی تبریز",
    productName: "کفش چرم طبیعی گاو دست‌دوز تبریز (کلاسیک مردانه)",
    targetAudience: "کارمندان اداری، مدیران و آقایان شیک‌پوش ۲۵ تا ۵۵ سال که پا درد دارند",
    competitiveAdvantage: "۳۰ روز ضمانت تعویض بی‌قید و شرط قالب پا + کفی طبی نانو اشانتیون + ارسال کاملاً رایگان"
  },
  {
    title: "🎓 دوره فشرده مکالمه آیلتس",
    productName: "دوره ۳ ماهه مکالمه فوری انگلیسی و آیلتس (سفارشی شده)",
    targetAudience: "دانشجویان، مهاجران و شاغلینی که کمبود وقت شدید دارند و از گرامر خسته شده‌اند",
    competitiveAdvantage: "تضمین کتبی کسب نمره ۶.۵ یا عودت کل وجه بدون سوال + مشاوره تعیین سطح رایگان امروز"
  },
  {
    title: "🧴 بمب آبرسان پوست طبیعی",
    productName: "سرم هیالورونیک اسید طبیعی ارگانیک گیاهی با عصاره بابونه",
    targetAudience: "خانم‌های ۱۸ تا ۴۵ سال که از پوست خشک، لک یا خستگی پوست بعد از آرایش کلافه شده‌اند",
    competitiveAdvantage: "خرید ۲ عدد = ۱ عدد هدیه رایگان کیف آرایشی مخمل اشانتیون + تست حساسیت ۷ روزه"
  },
  {
    title: "🍯 عسل طبیعی سبلان",
    productName: "عسل خالص و طبیعی ۱۰۰٪ ارگانیک کوهستان سبلان با ساکاروز زیر ۲ درصد",
    targetAudience: "خانواده‌های علاقه‌مند به تغذیه سالم، افراد دیابتی کنترل‌شده و حامیان سبک زندگی ارگانیک",
    competitiveAdvantage: "ارسال برگه آزمایشگاه رسمی همراه با سفارش‌ها + بازگشت ۳ برابری وجه در صورت عدم اصالت"
  },
  {
    title: "🕯️ شمع مومی دست‌ساز لوکس",
    productName: "شمع دست‌ساز موم عسل با اسانس‌های درمانی فرانسوی و فیتیله چوبی طبیعی",
    targetAudience: "علاقه‌مندان به یوگا، دکوراسیون مینیمال، بیوتی سالن‌ها و کسانی که به دنبال آرامش ذهنی و رایحه‌درمانی هستند",
    competitiveAdvantage: "سوخت ۲ برابر طولانی‌تر بدون دود سیاه + خرید بالای ۳ عدد = پایه چوبی صنوبر اشانتیون دست‌ساز"
  },
  {
    title: "☕ دانه قهوه تخصصی کلمبیا",
    productName: "پک دانه قهوه تازه برشته‌شده ۱۰۰ درصد عربیکا تک‌خاستگاه کلمبیا",
    targetAudience: "عشاق قهوه، دکه‌های تخصصی، کارمندان صبحگاهی و ورزشکارانی که به انرژی بالا نیاز دارند",
    competitiveAdvantage: "برشته‌کاری روزانه به سفارش مشتری + یک عدد تراول‌ماگ دوجداره با سفارش اول"
  },
  {
    title: "🎒 کوله‌پشتی سفر ضدآب",
    productName: "کوله‌پشتی چندمنظوره ضدآب و ضدسرقت با پورت شارژ هوشمند USB",
    targetAudience: "طبیعت‌گردان، دانشجویان، بک‌پکرها و مسافرانی که لپ‌تاپ گران‌قیمت با خود جابه‌جا می‌کنند",
    competitiveAdvantage: "۱۸ ماه ضمانت پارگی یراق‌آلات و دوخت + ارسال تستی ۲۴ ساعته برای لمس کیفیت قبل پرداخت"
  },
  {
    title: "💎 دستبند نقره سنتی نیشابور",
    productName: "دستبند نقره عیار ۹۲۵ با سنگ فیروزه طبیعی نیشابور دست‌ساز شیک",
    targetAudience: "بانوان شیک‌پوش، هدیه خاص برای سالگرد ازدواج یا کادوی تولد دختران جوان",
    competitiveAdvantage: "ارسال شناسنامه فیزیکی تائید اصالت سنگ فیروزه + جعبه لاکچری چراغ‌دار کادویی اشانتیون"
  },
  {
    title: "🚗 نانو سرامیک بدنه خودرو",
    productName: "پک نانو سرامیک بدنه خودرو با ماندگاری ۳ ساله و اثر آب‌گریزی فوق‌العاده",
    targetAudience: "صاحبان خودروهای سواری، عاشقان تیونینگ و زیبایی خودرو، و کسانی که وسواس تمیزی ماشین دارند",
    competitiveAdvantage: "آموزش گام‌به‌گام تصویری + اسپری مکمل شوینده رایگان + تضمین عدم شوره و زردی رنگ"
  },
  {
    title: "🌾 زعفران ممتاز صادراتی",
    productName: "زعفران سرگل صادراتی درجه یک قائنات (پاک شده امسال)",
    targetAudience: "خانه‌دارها، رستوران‌دارها، تالارهای پذیرایی و افرادی که به عطر و رنگ غذا اهمیت بسیار می‌دهند",
    competitiveAdvantage: "بسته‌بندی کریستالی ضد ضربه + هاون برنجی اشانتیون روی خرید نیم مثقال به بالا + ارسال رایگان"
  }
];

const VIRAL_TIPS = [
  "فرمول قلاب طلایی: طرح یک چالش شدید یا سوال شوکه‌کننده در ۳ ثانیه اول ویدیو برای توقف اسکرول.",
  "تکنیک کات سریع: کات‌ها و تغییر زاویه‌های ویدیو باید زیر ۲ ثانیه باشند تا توجه مغز مخاطب پرت نشود.",
  "راز دایرکت خودکار: از کاربر نخواهید فالو کند، بلکه بگویید کلمه‌ای را دایرکت بفرستد تا ربات فوراً هدیه را ارسال کند.",
  "امتداد قلاب در کپشن: خط اول کپشن باید مانند تیتر اصلی روزنامه باشد؛ وسوسه‌کننده و ناتمام.",
  "آفر جذاب‌تر از تخفیف: هدیه یا اشانتیون با ارزش بالا همیشه پرقدرت‌تر از تخفیف نقدی مشتری را ترغیب به خرید می‌کند."
];

export default function App() {
  const [productName, setProductName] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [competitiveAdvantage, setCompetitiveAdvantage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [tipIndex, setTipIndex] = useState(0);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [cardVersions, setCardVersions] = useState<Record<number, "A" | "B">>({ 0: "A", 1: "A", 2: "A" });
  const [randomExamples, setRandomExamples] = useState<ExampleConfig[]>([]);
  const [tone, setTone] = useState("balanced");
  const [scenarioCount, setScenarioCount] = useState<number>(3);
  const [unlockedScenarioCount, setUnlockedScenarioCount] = useState<number>(3);

  // SaaS States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"generate" | "history" | "pricing" | "profile">("generate");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const isFormLocked = isLoggedIn && user && user.coins <= 0;
  const isFormDisabled = isFormLocked || loading;


  // Initialize and load from localStorage
  useEffect(() => {
    const activePhone = localStorage.getItem("viral_reels_current_phone");
    if (activePhone) {
      const userDataStr = localStorage.getItem(`viral_reels_user_${activePhone}`);
      if (userDataStr) {
        const userData = JSON.parse(userDataStr);
        // Default coins to 1 if not defined so they can test
        if (userData.coins === undefined || userData.coins === null) {
          userData.coins = 1;
          localStorage.setItem(`viral_reels_user_${activePhone}`, JSON.stringify(userData));
        }
        setUser(userData);
        setIsLoggedIn(true);

        const userHistoryStr = localStorage.getItem(`viral_reels_history_${activePhone}`);
        if (userHistoryStr) {
          setHistory(JSON.parse(userHistoryStr));
        }
      }
    }
  }, []);

  const triggerToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 4000);
  };

  const handleLoginSuccess = (phone: string) => {
    let existingUser = localStorage.getItem(`viral_reels_user_${phone}`);
    let userData;
    if (existingUser) {
      userData = JSON.parse(existingUser);
      // Initialize to 1 if not defined so they can test
      if (userData.coins === undefined || userData.coins === null) {
        userData.coins = 1;
        localStorage.setItem(`viral_reels_user_${phone}`, JSON.stringify(userData));
      }
    } else {
      // 1 free coin (was 3) to test the app limit as requested
      userData = { phoneNumber: phone, coins: 1 };
      localStorage.setItem(`viral_reels_user_${phone}`, JSON.stringify(userData));
    }

    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem("viral_reels_current_phone", phone);

    // Load user history
    const userHistoryStr = localStorage.getItem(`viral_reels_history_${phone}`);
    if (userHistoryStr) {
      setHistory(JSON.parse(userHistoryStr));
    } else {
      setHistory([]);
    }

    triggerToast(`ورود موفقیت‌آمیز! خوش آمدید (اعتبار شما: ${userData.coins} کوین)`);
  };

  const handleLogout = () => {
    localStorage.removeItem("viral_reels_current_phone");
    setUser(null);
    setIsLoggedIn(false);
    setHistory([]);
    setActiveTab("generate");
    triggerToast("با موفقیت از سیستم خارج شدید.");
  };

  const handleUpgradeCoins = (planId: string, coinsToAdd: number, price: string, planName: string) => {
    if (!isLoggedIn || !user) {
      setIsLoginModalOpen(true);
      return;
    }

    const newTx = {
      id: `tx_${Date.now()}`,
      date: new Date().toLocaleDateString("fa-IR", { year: "numeric", month: "2-digit", day: "2-digit" }),
      planName: `ارتقا به پلن ${planName}`,
      amount: price,
      coinsAdded: coinsToAdd
    };

    const updatedUser = { 
      ...user, 
      coins: user.coins + coinsToAdd,
      transactions: [newTx, ...(user.transactions || [])]
    };
    
    setUser(updatedUser);
    localStorage.setItem(`viral_reels_user_${user.phoneNumber}`, JSON.stringify(updatedUser));

    triggerToast(`پرداخت موفقیت‌آمیز! ${coinsToAdd} کوین به کیف پول شما اضافه و پلن ${planName} فعال شد.`);
  };

  const handleSelectHistoryItem = (item: any) => {
    setProductName(item.prompt.productName);
    setTargetAudience(item.prompt.targetAudience);
    setCompetitiveAdvantage(item.prompt.competitiveAdvantage);
    setTone(item.prompt.tone || "balanced");
    setScenarios(item.scenarios);
    setUnlockedScenarioCount(item.unlockedCount || item.scenarios?.length || 3);
    setActiveTab("generate");
    triggerToast("سناریو از تاریخچه برای ویرایش مجدد و کپی فراخوانی شد.");
  };

  const handleDeleteHistoryItem = (id: string) => {
    if (!isLoggedIn || !user) return;
    const updatedHistory = history.filter((item) => item.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem(`viral_reels_history_${user.phoneNumber}`, JSON.stringify(updatedHistory));
    triggerToast("سناریو با موفقیت از آرشیو برداشته شد.");
  };


  // Pick 3 random unique examples on component mount
  useEffect(() => {
    const shuffled = [...ALL_EXAMPLES].sort(() => 0.5 - Math.random());
    setRandomExamples(shuffled.slice(0, 3));
  }, []);


  // Cycle tips during loading
  useEffect(() => {
    let interval: any;
    if (loading) {
      interval = setInterval(() => {
        setTipIndex((prev) => (prev + 1) % VIRAL_TIPS.length);
      }, 4000);
    } else {
      setTipIndex(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleApplyExample = (ex: ExampleConfig) => {
    setProductName(ex.productName);
    setTargetAudience(ex.targetAudience);
    setCompetitiveAdvantage(ex.competitiveAdvantage);
    setError(null);
  };

  const handleReset = () => {
    setProductName("");
    setTargetAudience("");
    setCompetitiveAdvantage("");
    setTone("balanced");
    setScenarios([]);
    setError(null);
  };

  const handleCopyText = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (err) {
      console.error("خطا در کپی متن", err);
    }
  };

  const handleCopyFullScenario = async (sc: Scenario, idx: number) => {
    const activeVersion = cardVersions[idx] || "A";
    const hookVal = activeVersion === "A" ? sc.hook : (sc.hookB || sc.hook);
    const ctaVal = activeVersion === "A" ? sc.callToAction : (sc.callToActionB || sc.callToAction);
    const captionVal = activeVersion === "A" ? sc.caption : (sc.captionB || sc.caption);

    const fullText = `🎬 سناریو ریلز شماره ${idx + 1} (${sc.scenarioType}) - نسخه ${activeVersion === "A" ? "A (اصلی)" : "B (تست)"}
🔥 پتانسیل وایرال: ${sc.viralPotentialScore}%

👀 سه ثانیه اول (قلاب):
"${hookVal}"

🎥 تصویربرداری (Visual):
${sc.visualInstructions}

📣 گوینده و وویس‌اور (Audio):
${sc.audioScript}

🚨 اقدام نهایی (CTA):
"${ctaVal}"

✍️ کپشن پیشنهادی:
${captionVal}
    `.trim();

    handleCopyText(fullText, `full-${idx}`);
  };

  // Generate and print high-quality PDF specifically optimized for presenters & strategists
  const handleExportPDF = () => {
    if (scenarios.length === 0) return;
    window.print();
  };

  // Resilient content generation with fallbacks using Puter.js in the frontend
  const generateContentWithFallback = async (systemInstruction: string, userPrompt: string): Promise<string> => {
    const modelsToTry = [
      "gemini-1.5-flash", 
      "gemini-2.5-flash", 
      "gpt-4o-mini", 
      "meta-llama-3-1-405b-instruct",
      "meta-llama-3-1-70b-instruct"
    ];
    let lastError: any = null;
    const pc = (window as any).puter;
    if (!pc) {
      throw new Error("کتابخانه Puter.js یافت نشد. لطفاً چند لحظه صبر کنید یا صفحه را رفرش نمائید.");
    }

    for (const model of modelsToTry) {
      try {
        console.log(`[Puter AI] Requesting generation using model alias: ${model}`);
        const response = await pc.ai.chat([
          { role: "system", content: systemInstruction },
          { role: "user", content: userPrompt }
        ], { model });

        let replyText = "";
        if (typeof response === "string") {
          replyText = response;
        } else if (response && response.message && typeof response.message.content === "string") {
          replyText = response.message.content;
        } else if (response && typeof response.text === "string") {
          replyText = response.text;
        } else {
          replyText = JSON.stringify(response);
        }

        if (replyText && replyText.trim()) {
          return replyText;
        }
      } catch (error: any) {
        console.warn(`[Puter AI Warning] Model ${model} failed:`, error.message || error);
        lastError = error;
        await new Promise((resolve) => setTimeout(resolve, 300));
      }
    }
    throw lastError;
  };

  const cleanAndParseJSON = (text: string): any => {
    let cleaned = text.trim();
    if (cleaned.startsWith("```")) {
      const lines = cleaned.split("\n");
      if (lines[0].startsWith("```json") || lines[0].startsWith("```")) {
        lines.shift();
      }
      if (lines[lines.length - 1].startsWith("```")) {
        lines.pop();
      }
      cleaned = lines.join("\n").trim();
    }
    return JSON.parse(cleaned);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;

    const trimmedProduct = productName ? productName.trim() : "";
    const trimmedAudience = targetAudience ? targetAudience.trim() : "";
    const trimmedAdvantage = competitiveAdvantage ? competitiveAdvantage.trim() : "";

    if (!trimmedProduct || !trimmedAudience || !trimmedAdvantage) {
      setError("خطا: فیلدهای اطلاعات محصول، مخاطبین و پیشنهاد شگفت‌انگیز نمی‌توانند خالی باشند. لطفاً تمام فیلدها را با دقت تکمیل کنید.");
      return;
    }

    // Credits validation for logged-in users
    const requiredCoins = scenarioCount;
    if (isLoggedIn && user) {
      if (user.coins < requiredCoins) {
        setError(`خطا: موجودی کوین شما (${user.coins} کوین) برای تولید ${requiredCoins} سناریو کافی نیست. لطفاً با استفاده از اسکرولر، تعداد سناریوها را کاهش دهید یا ابتدا اعتبار خود را افزایش دهید.`);
        return;
      }
    }

    setLoading(true);
    setError(null);
    setScenarios([]);

    try {
      let toneInstruction = "";
      if (tone === "funny") {
        toneInstruction = "لحن اصلی باید کاملاً طنز، شوخ‌طبعانه، با کنایه‌ها و اصطلاحات خنده‌دار، جذاب و صمیمی روز اینستاگرام ایران باشد تا مخاطب بخندد و درگیر شود.";
      } else if (tone === "formal") {
        toneInstruction = "لحن اصلی باید رسمی، لوکس، پرستیژدار، حرفه‌ای و محترمانه، اما مدرن و متقاعدکننده باشد (بدون به کار بردن کلمات خشک و پیچیده قدیمی اداری).";
      } else if (tone === "excited") {
        toneInstruction = "لحن اصلی باید سرشار از هیجان شدید، فوق‌العاده پرانرژی، حماسی، با ریتم بالا و کلماتی باشد که فوراً شور و ترغیب آنی برای خرید در مخاطب به وجود آورد.";
      } else if (tone === "aggressive") {
        toneInstruction = "لحن اصلی باید چالش‌برانگیز، تهاجمی، رک و بی‌پرده، جسورانه و نترس باشد (مثلاً مچ‌گیری از مشکلات مخاطب، تخریب رویکردهای غلط قدیمی و مقایسه بی‌رحمانه مزیت محصول).";
      } else {
        toneInstruction = "لحن اصلی باید پرانرژی، متقاعدکننده، صمیمی، رفیقانه و به اصطلاح بسیار خیابانی و کپی‌رایت‌شده تمیز و متعادل باشد.";
      }

      const systemInstruction = `
تو یک سناریونویس ارشد ریلز اینستاگرام (Instagram Reels Scriptwriter)، کپی‌رایتر فوق‌حرفه‌ای و استراتژیست رشد وایرال مارکتینگ (Viral Marketing Specialist) در ایران هستی.
تخصص بی‌نظیر تو در نوشتن سناریوهای داغ، میخکوب‌کننده، احساسی و به شدت پولساز برای ریلزهای زیر ۶۰ ثانیه صفحات فروشگاهی اینستاگرام است.
تو اصول روانشناسی مصرف‌کننده، ایجاد حس فوریت (FOMO) و درگیر کردن سریع احساسات مخاطب را بدون نقص پیاده‌سازی می‌کنی.

وظیفه تو:
یک کاربر به تو سه ورودی مشخص می‌دهد:
۱. نام محصول: "${productName}"
۲. مخاطب هدف: "${targetAudience}"
۳. مزیت رقابتی/آفر یا پیشنهاد ویژه: "${competitiveAdvantage}"

بر اساس این داده‌ها، باید به تعداد ${scenarioCount} سناریوی کاملاً متفاوت (با زاویه‌های دید گوناگون مثل آموزشی، طنز، مستقیم، داستان‌گویی، چالش‌برانگیز یا اعترافی) برای ریلزهای زیر ۶۰ ثانیه طراحی کنی.
همچنین برای پاسخگویی به طراحان کمپین تبلیغاتی و کسانی که تست A/B بازدهی انجام می‌دهند، وظیفه داری نسخه دومی (نسخه B) برای هر سناریو بنویسی طوری که "فیلم‌برداری" و "توضیحات صوتی عمومی" کاملاً ثابت مانده اما "متن قلاب شروع" (hookB) و "دعوت به اقدام پایان" (callToActionB) و همچنین "کپشن" (captionB) بازنویسی روانشناسی‌شده مجدد شوند تا کپی‌رایترها بتوانند درصد تبدیل و واچ‌تایم را تست کنند.

لحن خروجی تو به زبان فارسی و با ادبیات زیر است:
- ${toneInstruction}
- فاقد هرگونه کلمه یا جمله کلیشه‌ای و تکراری. جملات روان، بسیار کوتاه، کوبنده و ضربتی باشند.
- هماهنگی شدید با ترندهای روز اینستاگرامی ایران.

تمام فیلدها باید به فارسی نوشته شوند (به جز scenarioType که می‌تواند به انگلیسی یا فارسی کوتاه باشد).
مهم‌ترین نکته: خروجی تو باید فقط و فقط یک شیء JSON معتبر مطابق قالب زیر باشد، بدون هیچ توضیحات اضافی یا مارک‌داون دورش. قالب مورد نیاز:
{
  "scenarios": [
    {
      "scenarioType": "نوع سبک ویدئو (مثل: طنز، چالش، آموزشی، داستان‌گویی، مستقیم)",
      "hook": "قلاب ۳ ثانیه اول نسخه فرضی A (یک جمله به شدت درگیرکننده که مخاطب اسکرول را فوراً متوقف کند)",
      "hookB": "قلاب بازنویسی‌شده ثانویه نسخه فرضی B (دارای رویکرد کپی‌رایتینگ متفاوت)",
      "visualInstructions": "دستورالعمل دقیق و مرحله به مرحله برای تصویربرداری و قاب‌بندی ویدیو",
      "audioScript": "متن گوینده یا وویس‌اور ریلز یا متنهای روی ویدیو به صورت بخش‌بندی شده و کوتاه",
      "callToAction": "دعوت به اقدام پایانی نسخه فرضی A (CTA)",
      "callToActionB": "دعوت به اقدام پایانی نسخه فرضی B برای تست نرخ تعامل",
      "caption": "کپشن جذاب و خلاصه نسخه A به همراه هشتگ‌ها",
      "captionB": "کپشن جذاب و خلاصه نسخه B به همراه هشتگ‌های جایگزین و مکمل",
      "viralPotentialScore": 85, // عدد بین ۱ تا ۱۰۰
      "hookStrength": 90, // عدد بین ۱ تا ۱۰۰
      "ctaClarity": 80, // عدد بین ۱ تا ۱۰۰
      "visualEngagement": 88 // عدد بین ۱ تا ۱۰۰
    }
  ]
}
`.trim();

      const userPrompt = `
محصول: ${productName}
مخاطب هدف: ${targetAudience}
آفر و مزیت رقابتی: ${competitiveAdvantage}
لحن مدنظر: ${tone || "معمولی/صمیمی"}
تعداد سناریوها: دقیقاً ${scenarioCount} سناریو منحصربه‌فرد

لطفاً دقیقاً به تعداد ${scenarioCount} سناریوی بی‌نظیر ریلز با پتانسیل بالای وایرال شدن برای تبلیغ این محصول بنویس که دقیقاً بازتاب‌دهنده لحن فوق‌الذکر باشد. برای هر سناریو حتماً فیلدهای مربوط به نسخه ثانویه تستی (A/B testing) را نیز در فیلدهای اختصاصی B تولید کن.`;

      const aiResponseText = await generateContentWithFallback(systemInstruction, userPrompt);
      const data = cleanAndParseJSON(aiResponseText);

      if (data.scenarios && Array.isArray(data.scenarios)) {
        setScenarios(data.scenarios);

        // If logged in, deduct credit and update history
        if (isLoggedIn && user) {
          const updatedUser = { ...user, coins: user.coins - requiredCoins };
          setUser(updatedUser);
          localStorage.setItem(`viral_reels_user_${user.phoneNumber}`, JSON.stringify(updatedUser));

          const newHistoryItem = {
            id: `hist_${Date.now()}`,
            date: new Date().toLocaleDateString("fa-IR", { year: "numeric", month: "long", day: "numeric" }),
            prompt: { productName, targetAudience, competitiveAdvantage, tone },
            scenarios: data.scenarios,
            unlockedCount: requiredCoins
          };
          const updatedHistory = [newHistoryItem, ...history];
          setHistory(updatedHistory);
          localStorage.setItem(`viral_reels_history_${user.phoneNumber}`, JSON.stringify(updatedHistory));

          setUnlockedScenarioCount(requiredCoins);
          triggerToast(`${requiredCoins} کوین مصرف شد. محصول ثبت گردید و آرشیو شد.`);
        } else {
          setUnlockedScenarioCount(requiredCoins);
          triggerToast("سناریو تست آماده شد! برای مشاهده نسخه کامل ورود کنید.");
        }
      } else {
        throw new Error("فرمت اطلاعات بازگشتی از هوش مصنوعی نامعتبر است.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "خطای غیرمنتظره‌ای رخ داد. از اتصال به اینترنت مطمئن شوید.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      {/* Main app (Hidden during print) */}
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col p-4 sm:p-6 md:p-8 selection:bg-red-500 selection:text-white print:hidden" dir="rtl">
        
        {/* Decorative top ambient glow exactly matching the bento theme */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-red-950/10 via-slate-950/0 to-transparent blur-3xl pointer-events-none -z-10" />

        {/* Modern Header Styled after Bento Layout Guidelines (Logo + details on right) */}
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10 max-w-7xl mx-auto w-full border-b border-slate-900 pb-8">
          
          {/* Left Header Brand Block with Red glow */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center shadow-[0_0_25px_rgba(220,38,38,0.5)] transition-all shrink-0">
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 15.5l6-3.5-6-3.5v7zM21 6S20 5 17 5s-5 0-5 0-2 0-5 0S3 6 3 6s-1 1-1 4v4s0 3 1 4 1 1 4 1 5 0 5 0 2 0 5 0 4-1 4-1 1-1 1-4v-4s0-3-1-4z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
                <span>استراتژیست وایرال ریلز</span>
                <span className="text-[10px] bg-red-500/10 text-red-500 border border-red-500/20 px-2 py-0.5 rounded-md font-medium uppercase animate-pulse">کپشن‌نویس ارشد</span>
              </h1>
              <p className="text-slate-400 text-sm font-medium mt-1">پنل فوق هوشمند مهندسی سناریو و ساخت پیشنهادهای پولساز اینستاگرام</p>
            </div>
          </div>

          {/* Center SaaS Tab Navigation Controls */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-1 p-1 bg-slate-900/80 border border-slate-800/80 rounded-2xl w-full lg:w-auto">
            <button
              onClick={() => setActiveTab("generate")}
              className={`flex-1 sm:flex-none text-center px-3 sm:px-4.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === "generate"
                  ? "bg-red-600 text-white shadow-lg"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Cpu className="w-3.5 h-3.5 shrink-0" />
              <span>ماشین سناریو</span>
            </button>
            <button
              onClick={() => {
                if (isLoggedIn) {
                  setActiveTab("history");
                } else {
                  setIsLoginModalOpen(true);
                }
              }}
              className={`flex-1 sm:flex-none text-center px-3 sm:px-4.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === "history"
                  ? "bg-red-600 text-white shadow-lg"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <History className="w-3.5 h-3.5 shrink-0" />
              <span>تاریخچه تولیدات</span>
              {!isLoggedIn && <Lock className="w-3 h-3 text-slate-500 shrink-0" />}
            </button>
            <button
              onClick={() => setActiveTab("pricing")}
              className={`flex-1 sm:flex-none text-center px-3 sm:px-4.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === "pricing"
                  ? "bg-red-600 text-white shadow-lg"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Wallet className="w-3.5 h-3.5 shrink-0" />
              <span>خرید کوین</span>
            </button>
            {isLoggedIn && (
              <button
                onClick={() => setActiveTab("profile")}
                className={`flex-1 sm:flex-none text-center px-3 sm:px-4.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === "profile"
                    ? "bg-red-600 text-white shadow-lg"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <User className="w-3.5 h-3.5 shrink-0" />
                <span>پروفایل من</span>
              </button>
            )}
          </div>

          {/* Right Info Badges & SaaS Profile Wallet Indicator */}
          <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
            {isLoggedIn && user ? (
              <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800 rounded-2xl p-1.5">
                {/* Coins wallet Indicator */}
                <div 
                  onClick={() => setActiveTab("pricing")}
                  className="bg-red-600/10 hover:bg-red-600/20 border border-red-500/20 px-3 py-2 rounded-xl flex items-center gap-2 cursor-pointer transition-colors"
                  title="شارژ اعتبار کوین"
                >
                  <Coins className="w-4 h-4 text-red-500 animate-spin" style={{ animationDuration: '6s' }} />
                  <div className="text-right">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold leading-none">موجودی کمپین</span>
                    <span className="text-xs font-black text-white">{user.coins} کوین</span>
                  </div>
                </div>

                {/* Profile detail replaced by clickable Minimal User Icon button */}
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`p-2.5 rounded-xl transition-all cursor-pointer border ${
                    activeTab === "profile"
                      ? "bg-red-600/20 text-red-500 border-red-500/30 shadow-md"
                      : "bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white border-slate-800/80 hover:border-slate-700"
                  }`}
                  title={user.firstName ? `پروفایل: ${user.firstName} ${user.lastName || ""}` : "پروفایل من"}
                >
                  <User className="w-4 h-4 shrink-0" />
                </button>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="p-2.5 bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-red-400 border border-slate-800/80 hover:border-slate-700 rounded-xl transition-all cursor-pointer"
                  title="خروج از حساب"
                >
                  <LogOut className="w-4 h-4 shrink-0" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="bg-red-600 hover:bg-red-500 text-white hover:shadow-[0_0_15px_rgba(220,38,38,0.4)] px-4.5 py-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95"
              >
                <User className="w-4 h-4 text-red-200" />
                <span>ورود / ثبت‌نام سریع (رایگان)</span>
              </button>
            )}
          </div>
        </header>

        {/* Main Bento Layout Grid container */}
        <div className="w-full max-w-7xl mx-auto flex-grow flex flex-col">
          
          {activeTab === "generate" && (
            <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full">
              
              {/* Asides sidebar panel (Takes 4 columns in modern grid layout, highly curved borders) */}
              <aside className="lg:col-span-4 bg-slate-900/40 border border-slate-800/50 rounded-[2.5rem] p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative" id="bento-sidebar">
                <div className="space-y-6">
                  
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800/60">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-5 h-5 text-red-500" />
                      <h3 className="font-black text-white text-base">تنظیمات سناریو ریلز</h3>
                    </div>
                    <button 
                      onClick={handleReset}
                      type="button"
                      disabled={isFormDisabled}
                      className="text-xs text-slate-500 hover:text-red-500 transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                      title="پاکسازی فرم"
                    >
                      <RotateCcw className="w-3.5 h-3.5 ml-1" />
                      <span>شروع مجدد</span>
                    </button>
                  </div>

                  {/* Interactive templates chips */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">ایده‌های آماده برای الهام گرفتن:</label>
                      <button
                        onClick={() => {
                          const shuffled = [...ALL_EXAMPLES].sort(() => 0.5 - Math.random());
                          setRandomExamples(shuffled.slice(0, 3));
                        }}
                        type="button"
                        disabled={isFormDisabled}
                        className="text-[10px] text-red-500 hover:text-red-400 font-extrabold transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                        title="نمایش ۳ ایده تصادفی جدید"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>ایده تصادفی جدید</span>
                      </button>
                    </div>
                    <div className="flex flex-col gap-2">
                      {randomExamples.map((ex, idx) => (
                        <button
                          key={idx}
                          disabled={isFormDisabled}
                          onClick={() => handleApplyExample(ex)}
                          type="button"
                          className={`text-right p-3 rounded-2xl border text-xs flex items-center justify-between group transition-all ${
                            isFormDisabled
                              ? "bg-slate-900/20 border-slate-900 text-slate-600 cursor-not-allowed opacity-30 pointer-events-none"
                              : "bg-slate-950/70 border border-slate-800/80 hover:border-red-500/40 text-slate-300 hover:text-white cursor-pointer"
                          }`}
                        >
                          <span className="font-semibold truncate ml-2">{ex.title}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-lg bg-slate-900 border border-slate-800 group-hover:bg-red-500/10 group-hover:text-red-400 transition-all shrink-0">تست آفر</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Main parameters inputs */}
                  <form onSubmit={handleSubmit} className="space-y-5">
                    
                    {/* Product Name Input */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                          <ShoppingBag className="w-3.5 h-3.5 text-red-500" />
                          نام محصول یا خدمات شما
                        </label>
                        <HelpCircle 
                          className="w-4 h-4 text-slate-600 hover:text-slate-400 cursor-pointer" 
                          onClick={() => setShowTooltip(showTooltip === 'product' ? null : 'product')}
                        />
                      </div>
                      
                      <AnimatePresence>
                        {showTooltip === 'product' && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-400 leading-relaxed"
                          >
                            نام کامل محصول را بنویسید؛ مثلاً «شامپو ضد ریزش گیاهی»، «دستگاه قهوه‌ساز اتوماتیک» یا «دوره آموزش عکاسی پرتره».
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <input
                        type="text"
                        value={productName}
                        disabled={isFormDisabled}
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="مثال: ساعت هوشمند مدل Ultra S2 کلاسیک"
                        maxLength={130}
                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3.5 text-white focus:outline-none focus:border-red-600 transition-colors text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                        required
                      />
                    </div>

                    {/* Target Audience Input */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-sky-400" />
                          مخاطب هدف (سناریو برای کیست؟)
                        </label>
                        <HelpCircle 
                          className="w-4 h-4 text-slate-600 hover:text-slate-400 cursor-pointer" 
                          onClick={() => setShowTooltip(showTooltip === 'audience' ? null : 'audience')}
                        />
                      </div>

                      <AnimatePresence>
                        {showTooltip === 'audience' && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-400 leading-relaxed"
                          >
                            جامعه مخاطب خود را تعریف کنید؛ مثلاً «هنرجویان فتوشاپ مبتدی»، «مالکان رستوران‌های محلی» یا «مادران شاغل».
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <input
                        type="text"
                        value={targetAudience}
                        disabled={isFormDisabled}
                        onChange={(e) => setTargetAudience(e.target.value)}
                        placeholder="مثال: گیمرها و ورزشکاران ۱۸ تا ۳۰ سال"
                        maxLength={130}
                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3.5 text-white focus:outline-none focus:border-red-600 transition-colors text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                        required
                      />
                    </div>

                    {/* Offer or Competitive Advantage */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                          <Megaphone className="w-3.5 h-3.5 text-amber-500" />
                          مزیت رقابتی / پیشنهاد شگفت‌انگیز
                        </label>
                        <HelpCircle 
                          className="w-4 h-4 text-slate-600 hover:text-slate-400 cursor-pointer" 
                          onClick={() => setShowTooltip(showTooltip === 'offer' ? null : 'offer')}
                        />
                      </div>

                      <AnimatePresence>
                        {showTooltip === 'offer' && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-400 leading-relaxed"
                          >
                            یک قلاب مالی یا آفر دیوانه‌کننده ارائه دهید؛ مانند «۷۰٪ تخفیف فقط برای ۴۸ ساعت»، «ارسال رایگان درب منزل» یا «گارانتی تعویض ۳ ساله».
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <textarea
                        value={competitiveAdvantage}
                        disabled={isFormDisabled}
                        onChange={(e) => setCompetitiveAdvantage(e.target.value)}
                        placeholder="مثال: ۷۰٪ تخفیف معتبر فقط برای ۴۸ ساعت آینده + اشانتیون دستبند زاپاس سیلیکونی رایگان + ارسال سریع پیشتاز به سراسر کشور"
                        maxLength={200}
                        rows={4}
                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3.5 text-white h-28 resize-none focus:outline-none focus:border-red-600 transition-colors text-sm leading-relaxed disabled:opacity-40 disabled:cursor-not-allowed"
                        required
                      />
                    </div>

                    {/* Script Tone Option */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                          لحن سناریو (Tone)
                        </label>
                        <HelpCircle 
                          className="w-4 h-4 text-slate-600 hover:text-slate-400 cursor-pointer" 
                          onClick={() => setShowTooltip(showTooltip === 'tone' ? null : 'tone')}
                        />
                      </div>

                      <AnimatePresence>
                        {showTooltip === 'tone' && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-400 leading-relaxed"
                          >
                            تغییر لحن، استراتژی قلاب، نوع شوخی‌ها/رابطه صمیمی با مخاطب و چیدمان کپشن‌های نهایی را تحت تأثیر قرار می‌دهد.
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: "balanced", label: "⚖️ صمیمی و متعادل", desc: "کپی‌رایتینگ رفیقانه" },
                          { id: "funny", label: "🎭 طنز و شوخ‌طبع", desc: "وایرال و پر از کنایه" },
                          { id: "formal", label: "👔 رسمی و لوکس", desc: "باپرستیژ و مجاب‌کننده" },
                          { id: "excited", label: "🔥 بمب و هیجانی", desc: "شورانگیز و پر ریتم" },
                          { id: "aggressive", label: "⚡ جسور و تهاجمی", desc: "چالش‌برانگیز و مچ‌گیر" }
                        ].map((t) => {
                          const isSelected = tone === t.id;
                          return (
                            <button
                              key={t.id}
                              type="button"
                              disabled={isFormDisabled}
                              onClick={() => setTone(t.id)}
                              className={`text-right p-3 rounded-2xl border transition-all flex flex-col justify-between cursor-pointer ${
                                t.id === 'balanced' ? 'col-span-2' : ''
                              } ${
                                isSelected 
                                  ? "bg-red-500/10 border-red-500/80 text-white shadow-[0_0_15px_rgba(239,68,68,0.15)]" 
                                  : isFormDisabled
                                    ? "bg-slate-950/20 border-slate-950 text-slate-600 cursor-not-allowed opacity-20"
                                    : "bg-slate-950/40 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                              }`}
                            >
                              <span className="text-xs font-bold">{t.label}</span>
                              <span className="text-[9px] text-slate-500 mt-1">{t.desc}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Dynamic Scenario Count Range Slider / Scrollbar */}
                    <div className="space-y-3 bg-slate-950/60 p-4 border border-slate-800/80 rounded-2xl">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white flex items-center gap-1.5">
                          <Coins className="w-3.5 h-3.5 text-amber-500" />
                          تعداد سناریوهای درخواستی:
                        </span>
                        <span className="text-xs font-mono font-black text-red-500 bg-red-500/10 px-2 py-0.5 rounded-md">
                          {scenarioCount === 1 ? "۱ سناریو" : scenarioCount === 2 ? "۲ سناریو" : "۳ سناریو"}
                        </span>
                      </div>
                      
                      <div className="pt-2 font-sans relative">
                        {/* Custom visual Range input slider acting as scrollbar */}
                        <input
                          type="range"
                          min="1"
                          max="3"
                          step="1"
                          value={scenarioCount}
                          disabled={isFormDisabled}
                          onChange={(e) => setScenarioCount(Number(e.target.value))}
                          className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-600 focus:outline-none focus:ring-1 focus:ring-red-500"
                        />
                        <div className="flex justify-between text-[10px] text-slate-500 mt-2 font-mono" dir="rtl">
                          <button
                            type="button"
                            disabled={isFormDisabled}
                            onClick={() => setScenarioCount(1)}
                            className={`transition-colors cursor-pointer ${scenarioCount === 1 ? 'text-red-500 font-black' : 'text-slate-500 hover:text-slate-300'}`}
                          >
                            ۱ سناریو (۱ کوین)
                          </button>
                          <button
                            type="button"
                            disabled={isFormDisabled}
                            onClick={() => setScenarioCount(2)}
                            className={`transition-colors cursor-pointer ${scenarioCount === 2 ? 'text-red-500 font-black' : 'text-slate-500 hover:text-slate-300'}`}
                          >
                            ۲ سناریو (۲ کوین)
                          </button>
                          <button
                            type="button"
                            disabled={isFormDisabled}
                            onClick={() => setScenarioCount(3)}
                            className={`transition-colors cursor-pointer ${scenarioCount === 3 ? 'text-red-500 font-black' : 'text-slate-500 hover:text-slate-300'}`}
                          >
                            ۳ سناریو (۳ کوین)
                          </button>
                        </div>
                      </div>
                    </div>

                    {error && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3.5 bg-red-950/40 border border-red-800/50 rounded-xl flex items-start gap-2 text-red-300 text-xs leading-relaxed"
                      >
                        <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 ml-1.5" />
                        <span>{error}</span>
                      </motion.div>
                    )}

                    {/* Primary Action Button - White styled after template config file, transitions to hover */}
                    {isFormLocked ? (
                      <button
                        type="button"
                        onClick={() => setActiveTab("pricing")}
                        className="w-full bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 text-white font-black py-4.5 rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl animate-pulse active:scale-95 mt-4"
                      >
                        <Lock className="w-5 h-5 shrink-0" />
                        <span>اعتبار شما تموم شده! ارتقای پلن</span>
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-white text-black hover:bg-slate-200 disabled:opacity-50 disabled:hover:bg-white text-sm font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 shadow-xl mt-4"
                      >
                        {loading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            <span>در حال نگارش {scenarioCount === 1 ? '۱' : scenarioCount === 2 ? '۲' : '۳'} سناریوی وایرال...</span>
                          </>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <span>تولید سناریوهای انفجاری</span>
                            <span className="text-[10px] bg-red-600 text-white px-2.5 py-1 rounded-md font-black flex items-center gap-1 shrink-0">
                              <Coins className="w-3 h-3 text-red-200 rotate-12" />
                              <span>کسر {scenarioCount} کوین</span>
                            </span>
                            <svg className="w-4 h-4 shrink-0 rotate-180 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                            </svg>
                          </div>
                        )}
                      </button>
                    )}
                  </form>
                </div>

                <div className="mt-8 pt-5 border-t border-slate-800/60 flex items-center gap-2 text-[11px] text-slate-500 justify-center">
                  <Flame className="w-3.5 h-3.5 text-red-500" />
                  <span>سازگار با جدیدترین ترند الگوریتم اکسپلور اینستاگرام ایران</span>
                </div>
              </aside>


            {/* Left Output Display Area (Takes 8 cols) */}
            <section className="lg:col-span-8 flex flex-col gap-6" id="output-bento-scenarios">
              <AnimatePresence mode="wait">
                
                {loading && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="bg-slate-900/40 border border-slate-800/60 rounded-[2.5rem] p-8 text-center flex flex-col items-center justify-center min-h-[500px]"
                  >
                    <div className="relative w-24 h-24 mb-6">
                      <div className="absolute inset-0 rounded-full border-4 border-slate-800 border-t-red-600 animate-spin" />
                      <Sparkles className="w-10 h-10 text-red-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-bounce" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2">استراتژیست ارشد در حال اتاق فکر...</h3>
                    <p className="text-slate-400 text-sm max-w-sm mx-auto mb-8 font-normal">
                      در حال خلق زاویه‌های دید منحصربه‌فرد، قلاب‌های میخکوب کننده ۳ ثانیه‌ای و تکنیک‌های روانشناسی متقاعد‌کننده.
                    </p>

                    {/* Cycling Tips Widget */}
                    <motion.div 
                      key={tipIndex}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-slate-950 p-5 rounded-[2rem] border border-slate-800/80 max-w-lg w-full text-right shadow-inner"
                    >
                      <div className="flex items-center gap-2 text-red-400 text-xs font-bold mb-2">
                        <Flame className="w-4 h-4 ml-1 shrink-0" />
                        <span>💡 نکته طلایی ریلز پرفروش:</span>
                      </div>
                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
                        {VIRAL_TIPS[tipIndex]}
                      </p>
                    </motion.div>
                  </motion.div>
                )}

                {/* Empty state (initial) stylized as a clean empty Bento grid */}
                {!loading && scenarios.length === 0 && (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full"
                  >
                    {/* Hero empty Box */}
                    <div className="sm:col-span-2 bg-gradient-to-br from-red-600/10 to-orange-600/5 border border-red-500/20 rounded-[2.5rem] p-8 text-center flex flex-col items-center justify-center min-h-[250px]">
                      <div className="w-14 h-14 bg-red-600/20 border border-red-500/30 rounded-2xl flex items-center justify-center mb-4">
                        <Sparkles className="w-7 h-7 text-red-500" />
                      </div>
                      <h3 className="text-lg font-black text-white mb-2">اتاق فرمان مهندسی محتوا آماده است!</h3>
                      <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                        کافی‌ست فیلدهای سمت راست را پر کرده و دکمه <strong className="text-white">«تولید سناریوهای انفجاری»</strong> را فشار دهید تا ۳ زاویه کپی‌رایتینگ به شدت پربازدید شامل موارد آموزشی، اعترافی یا طنز و داستان‌سرایی تولید شوند.
                      </p>
                    </div>

                    {/* Left Feature card */}
                    <div className="bg-slate-900/40 border border-slate-800/80 rounded-[2rem] p-6 text-right flex flex-col justify-between">
                      <div>
                        <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center mb-3">
                          <Flame className="w-5 h-5 text-emerald-400" />
                        </div>
                        <h4 className="text-sm font-bold text-slate-200 mb-1">فرمت سناریونویسی وایرال</h4>
                        <p className="text-[11px] text-slate-400 leading-normal">
                          تمرکز کامل روی ۳ ثانیه طلایی قلاب ویدئو تا دست مخاطب از روی ریلز برداشته نشود و واچ‌تایم بالا برود.
                        </p>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono mt-4">ENGAGEMENT OPTIMIZED</span>
                    </div>

                    {/* Right Feature card */}
                    <div className="bg-slate-900/40 border border-slate-800/80 rounded-[2rem] p-6 text-right flex flex-col justify-between">
                      <div>
                        <div className="w-10 h-10 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center mb-3">
                          <Cpu className="w-5 h-5 text-indigo-400" />
                        </div>
                        <h4 className="text-sm font-bold text-slate-200 mb-1">کپشن روانشناسی‌شده</h4>
                        <p className="text-[11px] text-slate-400 leading-normal">
                          قوی‌ترین تکنیک‌های لیدسازی، دعوت به اقدام (CTA) برای کشاندن مخاطبان به دایرکت یا بخش کامنت‌ها.
                        </p>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono mt-4">PERSUASION ARCHITECT</span>
                    </div>
                  </motion.div>
                )}

                {/* Real Bento Grid for scenarios when they are available! */}
                {!loading && scenarios.length > 0 && (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full relative overflow-hidden"
                  >
                    
                    {/* Top Header of Results showing Export PDF */}
                    <div className="md:col-span-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-900 mb-2">
                      <div>
                        <h3 className="text-lg font-black text-white flex items-center gap-2">
                          <span>لیست سناریوهای انفجاری تولید‌شده</span>
                          <span className="text-xs font-medium bg-red-500/15 text-red-500 border border-red-500/20 px-2 py-0.5 rounded-full">تست A/B فعال</span>
                        </h3>
                        <p className="text-xs text-slate-400 mt-1">با استفاده از دکمه‌های سوئیچر داخل هر کارت، تفاوت خلاقیت قلاب و CTA را ببینید.</p>
                      </div>
                      
                      <button
                        onClick={handleExportPDF}
                        type="button"
                        className="bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs px-4.5 py-3 rounded-xl shadow-lg shadow-red-600/10 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 group shrink-0"
                      >
                        <Printer className="w-4 h-4 ml-1 shrink-0 text-red-200 group-hover:scale-110 transition-transform" />
                        <span>خروجی PDF پروپوزال (A/B کامل)</span>
                      </button>
                    </div>

                    {scenarios.slice(0, unlockedScenarioCount).map((sc, scIdx) => {
                      const activeVersion = cardVersions[scIdx] || "A";
                      const hookVal = activeVersion === "A" ? sc.hook : (sc.hookB || sc.hook);
                      const ctaVal = activeVersion === "A" ? sc.callToAction : (sc.callToActionB || sc.callToAction);
                      const captionVal = activeVersion === "A" ? sc.caption : (sc.captionB || sc.caption);

                      const themeStyles = scIdx === 0 
                        ? {
                            container: "md:col-span-2 bg-gradient-to-br from-red-600/20 to-orange-600/10 border border-red-500/30 rounded-[2.5rem] p-6 sm:p-8 relative flex flex-col justify-between shadow-xl",
                            badge: "bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full w-fit uppercase tracking-tighter shadow-md",
                            scoreBg: "bg-slate-950/80 border border-white/10",
                            titleColor: "text-red-500"
                          }
                        : scIdx === 1 
                        ? {
                            container: "md:col-span-2 bg-gradient-to-br from-emerald-600/20 to-teal-600/10 border border-emerald-500/30 rounded-[2.5rem] p-6 sm:p-8 relative flex flex-col justify-between shadow-xl",
                            badge: "bg-emerald-600 text-white text-[10px] font-black px-3 py-1 rounded-full w-fit uppercase tracking-tighter shadow-md",
                            scoreBg: "bg-slate-950/80 border border-emerald-500/25",
                            titleColor: "text-emerald-400"
                          }
                        : {
                            container: "md:col-span-2 bg-gradient-to-br from-indigo-600/20 to-purple-600/15 border border-indigo-500/30 rounded-[2.5rem] p-6 sm:p-8 relative flex flex-col justify-between shadow-xl",
                            badge: "bg-indigo-600 text-white text-[10px] font-black px-3 py-1 rounded-full w-fit uppercase tracking-tighter shadow-md",
                            scoreBg: "bg-slate-950/80 border border-indigo-500/25",
                            titleColor: "text-indigo-400"
                          };

                      const scenarioLabel = scIdx === 0 
                        ? `سناریوی ۱: ${sc.scenarioType || "کنجکاوی / هوشمند"}`
                        : scIdx === 1
                        ? `سناریوی ۲: ${sc.scenarioType || "آموزشی / مقایسه‌ای"}`
                        : `سناریوی ۳: ${sc.scenarioType || "لایف‌استایل / چالش"}`;

                      return (
                        <motion.div
                          key={`sc-${scIdx}`}
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: scIdx * 0.1 }}
                          className={themeStyles.container}
                        >
                          {/* Top badge stats */}
                          <div className="flex justify-between items-start flex-wrap gap-4 mb-4">
                            <div className="flex flex-col space-y-1">
                              <span className={themeStyles.badge}>
                                {scenarioLabel}
                              </span>
                              
                              {/* Inner A/B Selector */}
                              <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-white/10 w-fit mb-2">
                                <button
                                  onClick={() => setCardVersions(prev => ({ ...prev, [scIdx]: 'A' }))}
                                  type="button"
                                  className={`px-3 py-1 rounded-lg text-[10px] font-extrabold transition-all cursor-pointer ${activeVersion === 'A' ? 'bg-red-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
                                >
                                  نسخه A (اصلی)
                                </button>
                                <button
                                  onClick={() => setCardVersions(prev => ({ ...prev, [scIdx]: 'B' }))}
                                  type="button"
                                  className={`px-3 py-1 rounded-lg text-[10px] font-extrabold transition-all cursor-pointer ${activeVersion === 'B' ? 'bg-red-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
                                >
                                  نسخه B (تست قلاب)
                                </button>
                              </div>

                              <h3 className="text-lg sm:text-xl font-black text-white tracking-tight leading-relaxed">
                                {hookVal}
                              </h3>
                            </div>
                            
                            {/* Custom Circular styling and copy block */}
                            <div className="flex items-center gap-3">
                              <div className={`flex flex-col items-center px-4 py-2.5 rounded-2xl ${themeStyles.scoreBg}`}>
                                <span className="text-[10px] text-slate-400 mb-1">پتانسیل وایرال</span>
                                <span className={`text-2xl font-black ${themeStyles.titleColor} leading-none`}>{sc.viralPotentialScore}%</span>
                              </div>
                              
                              <button
                                onClick={() => {
                                  if (isLoggedIn) {
                                    handleCopyFullScenario(sc, scIdx);
                                  } else {
                                    setIsLoginModalOpen(true);
                                  }
                                }}
                                type="button"
                                className="bg-white text-black hover:bg-slate-200 px-4 py-2 text-xs font-black rounded-xl transition-all cursor-pointer shadow-md flex items-center gap-1.5"
                              >
                                {copiedKey === `full-${scIdx}` ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                                <span>{isLoggedIn ? `کپی سناریو ${scIdx + 1}` : "قفل‌گشایی نسخه کامل"}</span>
                              </button>
                            </div>
                          </div>

                          {/* Detailed Bento Inner grids */}
                          <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 pt-6 border-t border-white/10 text-slate-200 transition-all duration-300 ${!isLoggedIn ? 'blur-md select-none pointer-events-none' : ''}`}>
                            <div className="space-y-4">
                              <div className="flex items-start gap-2.5 bg-slate-950/40 p-4 rounded-xl border border-white/5">
                                <Video className="w-4 h-4 text-red-400 shrink-0 mt-1" />
                                <div>
                                  <strong className="text-white text-xs block mb-1">فیلمبرداری و تصویر (Visual):</strong>
                                  <p className="text-xs text-slate-300 leading-relaxed font-normal">{sc.visualInstructions}</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-2.5 bg-slate-950/40 p-4 rounded-xl border border-white/5">
                                <Mic2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                                <div>
                                  <strong className="text-white text-[11px] block mb-1">سناریو و وویس‌اور (Audio):</strong>
                                  <p className="text-xs text-slate-200 leading-relaxed font-semibold">{sc.audioScript}</p>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <div className="flex items-start gap-2.5 bg-slate-950/40 p-4 rounded-xl border border-white/5">
                                <FileText className="w-4 h-4 text-purple-400 shrink-0 mt-1" />
                                <div className="w-full">
                                  <div className="flex items-center justify-between mb-1.5">
                                    <strong className="text-white text-[11px] block">کپشن روانشناسی و هشتگ‌ها:</strong>
                                    <span className="text-[9px] font-extrabold text-purple-400 bg-purple-500/15 px-1.5 py-0.5 rounded">
                                      {activeVersion === 'A' ? 'کپشن A' : 'کپشن B (متفاوت)'}
                                    </span>
                                  </div>
                                  <p className="text-xs text-slate-300 leading-relaxed font-normal whitespace-pre-line">
                                    {captionVal}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start gap-2.5 bg-slate-950/40 p-4 rounded-xl border border-white/5">
                                <Megaphone className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                                <div className="w-full">
                                  <div className="flex items-center justify-between mb-1.5">
                                    <strong className="text-white text-[11px] block">دعوت به اقدام نهایی (CTA):</strong>
                                    <span className="text-[9px] font-extrabold text-amber-400 bg-amber-500/15 px-1.5 py-0.5 rounded">
                                      {activeVersion === 'A' ? 'اقدام A' : 'اقدام B (تست)'}
                                    </span>
                                  </div>
                                  <p className="text-xs text-slate-200 font-bold leading-relaxed">
                                    {ctaVal}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}

                    {!isLoggedIn && (
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent flex flex-col items-center justify-end pb-12 pt-40 px-4 z-40">
                        <div className="max-w-lg w-full bg-slate-900/80 backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-[2rem] text-center shadow-[0_20px_50px_rgba(0,0,0,0.6)] space-y-5 hover:scale-[1.01] transition-transform duration-300">
                          <div className="w-12 h-12 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center justify-center mx-auto text-red-500 shadow-lg shadow-red-500/10">
                            <Lock className="w-6 h-6 animate-pulse" />
                          </div>
                          <div>
                            <h4 className="text-base sm:text-lg font-black text-white leading-relaxed">قفل‌زدایی سناریوهای انفجاری تولید‌شده + کارگردانی صوتی و تصویری</h4>
                            <p className="text-xs text-slate-400 leading-relaxed mt-2 px-1.5 font-sans leading-relaxed">
                              برای مشاهده کامل سناریوهای تولید‌شده بر اساس انتخاب خلاق شما، کپشن‌های مهندسی‌شده، هشتگ‌های خاص، و کارگردانی صوتی و تصویری کامل، به راحتی شماره همراه خود را تایید کنید.
                            </p>
                          </div>
                          <button
                            onClick={() => setIsLoginModalOpen(true)}
                            type="button"
                            className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-black text-xs py-4 rounded-2xl transition-all shadow-lg hover:shadow-[0_0_20px_rgba(239,68,68,0.30)] cursor-pointer active:scale-95 flex items-center justify-center gap-2"
                          >
                            <User className="w-4 h-4 text-red-200" />
                            <span>«برای مشاهده کامل سناریوها و کارگردانی ویدیو، شماره موبایلت رو وارد کن (رایگان)»</span>
                          </button>
                          <span className="text-[10px] text-slate-500 block">بدون نیاز به پرداخت وجه کارت بانکی - شروع ویرایش کاملاً رایگان!</span>
                        </div>
                      </div>
                    )}

                  </motion.div>
                )}

              </AnimatePresence>
            </section>

          </main>
        )}

        {/* SaaS Pricing and Credit Upgrade flow */}
        {activeTab === "pricing" && (
          <PricingPaywall 
            onSelectPlan={handleUpgradeCoins} 
            isLoggedIn={isLoggedIn} 
            onRequestLogin={() => setIsLoginModalOpen(true)}
          />
        )}

        {/* SaaS User Scenario Audit Archives logs flow */}
        {activeTab === "history" && (
          <UserHistoryView 
            history={history}
            onSelectHistoryItem={handleSelectHistoryItem}
            onDeleteHistoryItem={handleDeleteHistoryItem}
          />
        )}

        {/* SaaS User Profile settings & transaction logs */}
        {activeTab === "profile" && isLoggedIn && user && (
          <UserProfileView
            user={user}
            onUpdateUser={(updated) => {
              setUser(updated);
              localStorage.setItem(`viral_reels_user_${updated.phoneNumber}`, JSON.stringify(updated));
            }}
            onLogout={handleLogout}
            triggerToast={triggerToast}
          />
        )}

        </div>

        {/* Mini Footer */}
        <footer className="mt-16 text-center border-t border-slate-900 pt-8 w-full max-w-7xl mx-auto" id="footer-credits">
          <p className="text-slate-500 text-xs text-center">
            طراحی‌شده اختصاصی بر اساس تم Bento Grid • پردازش بهینه‌شده به همراه کپی‌رایتینگ تخصصی ریلز اینستاگرام ایران ❤️
          </p>
        </footer>

      </div>

      {/* Print-only section (Only visible during print) */}
      <div className="hidden print:block bg-white text-slate-900 p-8 sm:p-12 font-sans w-full max-w-4xl mx-auto" dir="rtl">
        {/* Print custom global styling injection */}
        <style dangerouslySetInnerHTML={{ __html: `
          @media print {
            body {
              background: white !important;
              color: #0f172a !important;
            }
            @page {
              size: A4;
              margin: 15mm;
            }
            .print-card {
              page-break-inside: avoid;
            }
          }
        `}} />

        {/* Document Header */}
        <div className="bg-slate-900 text-white p-8 rounded-3xl mb-8 flex justify-between items-center" style={{ pageBreakInside: 'avoid' }}>
          <div>
            <h1 className="text-2xl font-black mb-2">📋 سند استراتژی سناریونویسی و ریلز اینستاگرام</h1>
            <p className="text-slate-400 text-sm leading-relaxed">
              این پروپوزال شامل سناریوهای متمایز، اثبات‌شده و روانشناختی با پتانسیل اکسپلورر بالا به همراه تست A/B جهت ارائه سناریوها تنظیم شده است.
            </p>
          </div>
        </div>

        {/* Project Metadata Dashboard */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8" style={{ pageBreakInside: 'avoid' }}>
          <h2 className="text-sm font-black text-slate-800 mb-4 pb-2 border-b border-slate-200">📊 بریف کمپین و مشخصات محصول</h2>
          <div className="space-y-4">
            <div>
              <strong className="text-[10px] text-slate-500 block mb-1">📦 نام محصول / خدمات:</strong>
              <p className="text-xs text-slate-800 font-bold bg-white p-3 rounded-lg border-r-4 border-slate-400 shadow-sm">{productName}</p>
            </div>
            <div>
              <strong className="text-[10px] text-slate-500 block mb-1">🎯 پرسونای مخاطب هدف:</strong>
              <p className="text-xs text-slate-800 font-bold bg-white p-3 rounded-lg border-r-4 border-sky-500 shadow-sm">{targetAudience}</p>
            </div>
            <div>
              <strong className="text-[10px] text-slate-500 block mb-1">🎁 پیشنهاد طلایی و مزیت رقابتی:</strong>
              <p className="text-xs text-slate-800 font-bold bg-white p-3 rounded-lg border-r-4 border-amber-500 shadow-sm">{competitiveAdvantage}</p>
            </div>
          </div>
        </div>

        <h2 className="text-base font-black text-slate-900 mb-6 border-r-4 border-red-600 pr-3 leading-none">
          تفکیک دقیق سناریوهای بازاریابی ریلز (Reels) به همراه تست A/B
        </h2>

        {/* Scenarios List */}
        <div className="space-y-8">
          {scenarios.map((sc, index) => (
            <div key={index} className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm print-card">
              {/* Card Header */}
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center" style={{ pageBreakInside: 'avoid' }}>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-red-600 text-white rounded-full font-black text-xs">
                    {index + 1}
                  </span>
                  <div>
                    <span className="text-[9px] text-slate-500 block font-medium">رویکرد روانشناسی سناریو</span>
                    <span className="text-xs font-extrabold text-slate-800">{sc.scenarioType || 'نامشخص'}</span>
                  </div>
                </div>
                <div className="bg-red-50 border border-red-100 text-red-600 px-3 py-1 rounded-lg text-[10px] font-black">
                  پتانسیل وایرال: {sc.viralPotentialScore}%
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-6">
                
                {/* A / B Hook Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ pageBreakInside: 'avoid' }}>
                  <div className="bg-amber-50/50 border border-amber-200 p-4 rounded-xl">
                    <span className="text-[9px] text-amber-700 font-bold block mb-1">⚡ قلاب شروع - نسخه A:</span>
                    <p className="text-xs font-extrabold text-slate-800 leading-relaxed">"{sc.hook}"</p>
                  </div>
                  <div className="bg-orange-50/50 border border-orange-200 p-4 rounded-xl">
                    <span className="text-[9px] text-orange-700 font-bold block mb-1">⚡ قلاب شروع - نسخه B (تست کپی‌رایت):</span>
                    <p className="text-xs font-extrabold text-slate-800 leading-relaxed">"{sc.hookB || sc.hook}"</p>
                  </div>
                </div>

                {/* Shared Audio/Visual Production Instructions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ pageBreakInside: 'avoid' }}>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-500 font-bold block mb-1">🎥 دستورالعمل تصویربرداری (بصری):</span>
                    <p className="text-[11px] text-slate-700 leading-relaxed whitespace-pre-line">{sc.visualInstructions}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-500 font-bold block mb-1">🎙️ وویس‌اور و متن شات (صوتی):</span>
                    <p className="text-[11px] text-slate-800 font-semibold leading-relaxed whitespace-pre-line">{sc.audioScript}</p>
                  </div>
                </div>

                {/* A / B CTA Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ pageBreakInside: 'avoid' }}>
                  <div className="bg-emerald-50/50 border border-emerald-200 p-4 rounded-xl">
                    <span className="text-[9px] text-emerald-700 font-bold block mb-1">🚨 دعوت به اقدام - نسخه A:</span>
                    <p className="text-[11px] font-bold text-slate-800 leading-relaxed">"{sc.callToAction}"</p>
                  </div>
                  <div className="bg-teal-50/50 border border-teal-200 p-4 rounded-xl">
                    <span className="text-[9px] text-teal-700 font-bold block mb-1">🚨 دعوت به اقدام - نسخه B (تست کپی‌رایت):</span>
                    <p className="text-[11px] font-bold text-slate-800 leading-relaxed">"{sc.callToActionB || sc.callToAction}"</p>
                  </div>
                </div>

                {/* A / B Caption Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ pageBreakInside: 'avoid' }}>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <span className="text-[9px] text-slate-500 font-bold block mb-1">✍️ کپشن پیشنهادی - نسخه A:</span>
                    <p className="text-[11px] text-slate-700 leading-relaxed whitespace-pre-line">{sc.caption}</p>
                  </div>
                  <div className="bg-slate-100/50 p-4 rounded-xl border border-slate-200">
                    <span className="text-[9px] text-slate-500 font-bold block mb-1">✍️ کپشن پیشنهادی - نسخه B (تست کپی‌رایت):</span>
                    <p className="text-[11px] text-slate-700 leading-relaxed whitespace-pre-line">{sc.captionB || sc.caption}</p>
                  </div>
                </div>



              </div>
            </div>
          ))}
        </div>

        {/* Print Footer */}
        <div className="mt-12 pt-6 border-t border-slate-200 flex justify-between items-center text-[10px] text-slate-400" style={{ pageBreakInside: 'avoid' }}>
          <span>تاریخ دریافت سناریو: {new Date().toLocaleDateString("fa-IR", { year: "numeric", month: "long", day: "numeric" })}</span>
          <span className="font-bold text-red-600">طراحی شده توسط دستیار هوشمند وایرال ریلز</span>
        </div>
      </div>

      {/* SaaS Authentication Modal (OTP flow) */}
      <OtpLoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onLoginSuccess={handleLoginSuccess} 
      />

      {/* Dynamic Toast Feedback Notification */}
      <AnimatePresence>
        {successToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-slate-800 px-4.5 py-3 rounded-2xl flex items-center gap-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          >
            <div className="w-8 h-8 rounded-xl bg-red-600/10 border border-red-500/15 flex items-center justify-center text-red-500 animate-pulse">
              <Check className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-white mb-0.5">{successToast.title}</p>
              <p className="text-[10px] text-slate-400 font-normal">{successToast.message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
