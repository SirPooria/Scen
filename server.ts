import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini AI client
let aiInstance: GoogleGenAI | null = null;

function getAIClient() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("کلید اختصاصی Gemini (GEMINI_API_KEY) یافت نشد. لطفاً آن را از بخش تنظیمات وارد کنید.");
    }
    aiInstance = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

// Resilient content generation with fallbacks to handle 503 high demand or temporary rate limit errors
async function generateContentWithFallback(params: {
  contents: string;
  config: any;
}) {
  const modelsToTry = ["gemini-3.5-flash", "gemini-flash-latest", "gemini-3.1-flash-lite"];
  let lastError: any = null;
  const ai = getAIClient();

  for (const model of modelsToTry) {
    try {
      console.log(`[Gemini API] Requesting scenario generation using model alias: ${model}`);
      const response = await ai.models.generateContent({
        ...params,
        model,
      });
      return response;
    } catch (error: any) {
      console.warn(`[Gemini API Warning] Model ${model} failed:`, error.message || error);
      lastError = error;
      
      // Look for indicators of overloaded service (503, 429, Unavailable, High Demand)
      const errStr = String(error.message || error).toLowerCase();
      if (errStr.includes("demand") || errStr.includes("503") || errStr.includes("429") || errStr.includes("unavailable")) {
        console.warn(`[Gemini API Retry] Detected heavy load. Attempting next model fallback...`);
      }
      
      // Wait thin delay of 250ms before trying the next available model
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  }
  throw lastError;
}

// AI Generation Endpoint
app.post("/api/generate-scenarios", async (req, res) => {
  try {
    const { productName, targetAudience, competitiveAdvantage, tone } = req.body;

    if (!productName || !targetAudience || !competitiveAdvantage) {
      return res.status(400).json({
        error: "لطفاً تمام فیلدها را پر کنید."
      });
    }

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

بر اساس این داده‌ها، باید ۳ سناریوی کاملاً متفاوت (با زاویه‌های دید گوناگون مثل آموزشی، طنز، مستقیم، داستان‌گویی، چالش‌برانگیز یا اعترافی) برای ریلزهای زیر ۶۰ ثانیه طراحی کنی.
همچنین برای پاسخگویی به طراحان کمپین تبلیغاتی و کسانی که تست A/B بازدهی انجام می‌دهند، وظیفه داری نسخه دومی (نسخه B) برای هر سناریو بنویسی طوری که "فیلم‌برداری" و "توضیحات صوتی عمومی" کاملاً ثابت مانده اما "متن قلاب شروع" (hookB) و "دعوت به اقدام پایان" (callToActionB) و همچنین "کپشن" (captionB) بازنویسی روانشناسی‌شده مجدد شوند تا کپی‌رایترها بتوانند درصد تبدیل و واچ‌تایم را تست کنند.

لحن خروجی تو به زبان فارسی و با ادبیات زیر است:
- ${toneInstruction}
- فاقد هرگونه کلمه یا جمله کلیشه‌ای و تکراری. جملات روان، بسیار کوتاه، کوبنده و ضربتی باشند.
- هماهنگی شدید با ترندهای روز اینستاگرامی ایران.

برای خروجی قالب زیر را حتماً به صورت داده‌های سازمان‌یافته با استفاده از JSON schema برگردان. تمام فیلدها باید به فارسی نوشته شوند (به جز scenarioType که می‌تواند به انگلیسی یا فارسی کوتاه باشد).`;

    const userPrompt = `
محصول: ${productName}
مخاطب هدف: ${targetAudience}
آفر و مزیت رقابتی: ${competitiveAdvantage}
لحن مدنظر: ${tone || "معمولی/صمیمی"}

لطفاً ۳ سناریوی بی‌نظیر ریلز با پتانسیل بالای وایرال شدن برای تبلیغ این محصول بنویس که دقیقاً بازتاب‌دهنده لحن فوق‌الذکر باشد. برای هر سناریو حتماً فیلدهای مربوط به نسخه ثانویه تستی (A/B testing) را نیز در فیلدهای اختصاصی B تولید کن.`;

    const response = await generateContentWithFallback({
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 1.0,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["scenarios"],
          properties: {
            scenarios: {
              type: Type.ARRAY,
              description: "لیست حاوی دقیقاً ۳ سناریو منحصربه‌فرد برای اینستاگرام ریلز",
              items: {
                type: Type.OBJECT,
                required: [
                  "scenarioType",
                  "hook",
                  "hookB",
                  "visualInstructions",
                  "audioScript",
                  "callToAction",
                  "callToActionB",
                  "caption",
                  "captionB",
                  "viralPotentialScore",
                  "hookStrength",
                  "ctaClarity",
                  "visualEngagement"
                ],
                properties: {
                  scenarioType: {
                    type: Type.STRING,
                    description: "نوع سبک ویدئو (مثل: طنز، چالش، آموزشی، داستان‌گویی، مستقیم)"
                  },
                  hook: {
                    type: Type.STRING,
                    description: "قلاب ۳ ثانیه اول نسخه فرضی A (یک جمله به شدت درگیرکننده که مخاطب اسکرول را فوراً متوقف کند)"
                  },
                  hookB: {
                    type: Type.STRING,
                    description: "قلاب بازنویسی‌شده ثانویه نسخه فرضی B (دارای رویکرد کپی‌رایتینگ متفاوت برای بررسی نرخ توقف اسکرول)"
                  },
                  visualInstructions: {
                    type: Type.STRING,
                    description: "دستورالعمل دقیق و مرحله به مرحله برای تصویربرداری و قاب‌بندی ویدیو"
                  },
                  audioScript: {
                    type: Type.STRING,
                    description: "متن گوینده یا وویس‌اور ریلز یا متنهای روی ویدیو به صورت بخش‌بندی شده و کوتاه"
                  },
                  callToAction: {
                    type: Type.STRING,
                    description: "دعوت به اقدام پایانی نسخه فرضی A (CTA) با ایجاد حس فوریت شدید و راهنمای درایو کردن کاربر به دایرکت یا کامنت"
                  },
                  callToActionB: {
                    type: Type.STRING,
                    description: "دعوت به اقدام پایانی نسخه فرضی B با یک آفر ترغیب‌کننده موازی دیگر جهت تست نرخ تعامل"
                  },
                  caption: {
                    type: Type.STRING,
                    description: "کپشن جذاب و خلاصه نسخه A به همراه هشتگ‌ها"
                  },
                  captionB: {
                    type: Type.STRING,
                    description: "کپشن جذاب و خلاصه نسخه B به همراه هشتگ‌های جایگزین و مکمل"
                  },
                  viralPotentialScore: {
                    type: Type.INTEGER,
                    description: "امتیاز حدودی پتانسیل وایرال شدن ویدئو از ۱ تا ۱۰۰ بر اساس ساختار قلاب و ترند بودن"
                  },
                  hookStrength: {
                    type: Type.INTEGER,
                    description: "قدرت قلاب ۳ ثانیه اول ویدیو برای جلب توجه مخاطب از ۱ تا ۱۰۰"
                  },
                  ctaClarity: {
                    type: Type.INTEGER,
                    description: "وضوح و انگیزه دعوت به اقدام انتهای ویدیو و هدایت کاربر از ۱ تا ۱۰۰"
                  },
                  visualEngagement: {
                    type: Type.INTEGER,
                    description: "جذابیت بصری، ریتم و درگیرکنندگی تصاویر پیشنهادی از ۱ تا ۱۰۰"
                  }
                }
              }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("عدم بازگشت پاسخ معتبر از هوش مصنوعی.");
    }

    const result = JSON.parse(text);
    return res.json(result);

  } catch (error: any) {
    console.error("Error generating scenarios:", error);
    return res.status(500).json({
      error: error.message || "خطایی در برقراری ارتباط با هوش مصنوعی رخ داده است."
    });
  }
});

// Serve frontend build or development using Vite middleware
const initServer = async () => {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

initServer().catch((err) => {
  console.error("Failed to start server:", err);
});
