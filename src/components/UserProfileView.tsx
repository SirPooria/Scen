import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  User, 
  Mail, 
  Coins, 
  Clock, 
  LogOut, 
  Check, 
  Sparkles, 
  Phone, 
  Instagram,
  CreditCard,
  Gift,
  Shield,
  Calendar
} from "lucide-react";

interface UserTransaction {
  id: string;
  date: string;
  planName: string;
  amount: string;
  coinsAdded: number;
}

interface UserProfileData {
  phoneNumber: string;
  coins: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  instagram?: string;
  isProfileRewardClaimed?: boolean;
  transactions?: UserTransaction[];
  subscriptionExpiresAt?: string;
}

interface UserProfileViewProps {
  user: UserProfileData;
  onUpdateUser: (updatedUser: UserProfileData) => void;
  onLogout: () => void;
  triggerToast: (msg: string) => void;
}

export function UserProfileView({ user, onUpdateUser, onLogout, triggerToast }: UserProfileViewProps) {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [email, setEmail] = useState(user.email || "");
  const [instagram, setInstagram] = useState(user.instagram || "");
  const [saving, setSaving] = useState(false);

  // Default transactions if none exist
  const transactionsList = user.transactions || [
    {
      id: "tx_init",
      date: "۱۴۰۵/۰۳/۲۸",
      planName: "هدیه ثبت‌نام اولیه",
      amount: "رایگان",
      coinsAdded: 1
    }
  ];

  // Dynamic subscription info
  const subscriptionExpiresAt = user.subscriptionExpiresAt || "۲۹ روز و ۱۲ ساعت مانده (فعال)";

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    setTimeout(() => {
      let coinsToAdd = 0;
      let rewardClaimed = user.isProfileRewardClaimed;

      // If user fills in first and last name, and hasn't claimed yet, award 2 coins!
      if (firstName.trim() && lastName.trim() && !user.isProfileRewardClaimed) {
        coinsToAdd = 2;
        rewardClaimed = true;
        triggerToast("🎉 تبریک! ۲ کوین هدیه بابت تکمیل پروفایل به حساب شما اضافه شد 🎁");
      } else {
        triggerToast("تنظیمات پروفایل با موفقیت بروزرسانی شد.");
      }

      const updated: UserProfileData = {
        ...user,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        instagram: instagram.trim(),
        coins: user.coins + coinsToAdd,
        isProfileRewardClaimed: rewardClaimed,
        transactions: user.transactions || transactionsList
      };

      onUpdateUser(updated);
      setSaving(false);
    }, 800);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full font-sans text-right" dir="rtl">
      
      {/* Right Column: User Info Card & Info (4 cols) */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        
        {/* Profile Card */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-[2.5rem] p-6 sm:p-8 flex flex-col items-center text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
          
          {/* Avatar frame */}
          <div className="relative mb-4 group">
            <div className="absolute inset-0 bg-gradient-to-tr from-red-600 to-purple-600 rounded-3xl blur-md opacity-40 group-hover:opacity-60 transition-all" />
            <div className="w-18 h-18 bg-slate-950 border-2 border-slate-800 rounded-3xl flex items-center justify-center text-white relative z-10 text-2xl font-black">
              {firstName ? firstName.charAt(0) : <User className="w-8 h-8 text-red-500" />}
            </div>
            <div className="absolute -bottom-1 -left-1 bg-emerald-500 w-4 h-4 rounded-full border-4 border-slate-900" title="آنلاین" />
          </div>

          <h3 className="text-lg font-black text-white">
            {firstName || lastName ? `${firstName} ${lastName}`.trim() : "کاربر گرامی ریلز"}
          </h3>
          <p className="text-slate-500 text-xs mt-1 font-mono">{user.phoneNumber}</p>

          <div className="w-full grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-slate-800/60">
            <div className="bg-slate-950/60 rounded-2xl p-3 border border-slate-800/40">
              <span className="text-[10px] text-slate-500 block mb-0.5">موجودی فعلی</span>
              <div className="flex items-center justify-center gap-1.5 text-white font-extrabold text-sm font-mono">
                <Coins className="w-4 h-4 text-amber-500" />
                <span>{user.coins} کوین</span>
              </div>
            </div>

            <div className="bg-slate-950/60 rounded-2xl p-3 border border-slate-800/40">
              <span className="text-[10px] text-slate-500 block mb-0.5">وضعیت اشتراک</span>
              <div className="flex items-center justify-center gap-1 text-emerald-400 font-extrabold text-xs">
                <Shield className="w-3.5 h-3.5" />
                <span>کاربر ویژه</span>
              </div>
            </div>
          </div>

          {/* Bonus Banner */}
          {!user.isProfileRewardClaimed && (
            <div className="mt-5 w-full bg-gradient-to-r from-purple-950/40 to-red-950/40 border border-purple-500/20 p-4 rounded-2xl flex items-center gap-2.5 text-right">
              <span className="bg-purple-500/10 text-purple-400 p-2.5 rounded-xl shrink-0">
                <Gift className="w-5 h-5" />
              </span>
              <div>
                <span className="text-[11px] font-black text-white block">هدیه تکمیل اطلاعات 🎁</span>
                <span className="text-[10px] text-slate-400">نام و فامیل خود را ذخیره کنید تا ۲ کوین هدیه رایگان بگیرید!</span>
              </div>
            </div>
          )}

          <button
            onClick={onLogout}
            className="mt-6 w-full py-3 bg-red-950/20 hover:bg-red-950/50 text-red-400 hover:text-red-300 border border-red-900/30 font-bold text-xs rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>خروج از حساب کاربری</span>
          </button>
        </div>

        {/* Subscription remaining time Widget */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-[2.5rem] p-6 flex flex-col gap-4 relative overflow-hidden shadow-2xl">
          <div className="flex items-center gap-2.5">
            <span className="bg-amber-500/10 text-amber-500 p-2 rounded-xl">
              <Clock className="w-4 h-4" />
            </span>
            <div>
              <h4 className="text-xs font-black text-white">زمان باقی‌مانده اشتراک</h4>
              <p className="text-[10px] text-slate-500">محدودیت زمانی دسترسی به داشبورد</p>
            </div>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/40 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-amber-500 font-extrabold text-xs">
              <Calendar className="w-4 h-4" />
              <span>{subscriptionExpiresAt}</span>
            </div>
            <span className="text-[9px] font-black text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded-md">رو به اتمام</span>
          </div>
        </div>

      </div>

      {/* Left Column: Edit Profile & Payment history Table (8 cols) */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        
        {/* Edit profile settings Form */}
        <div className="bg-slate-900/40 border border-slate-800/50 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl relative">
          <div className="flex items-center gap-2 pb-4 mb-6 border-b border-slate-800/60">
            <Sparkles className="w-5 h-5 text-red-500 animate-pulse" />
            <h3 className="font-extrabold text-white text-base">تکمیل پروفایل و اطلاعات کاربری</h3>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 block">نام</label>
                <div className="relative">
                  <User className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="مثال: علیرضا"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-red-600 rounded-2xl pr-11 pl-4 py-3.5 focus:outline-none transition-colors text-white text-sm font-semibold text-right"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 block">نام خانوادگی</label>
                <div className="relative">
                  <User className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="مثال: رضایی"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-red-600 rounded-2xl pr-11 pl-4 py-3.5 focus:outline-none transition-colors text-white text-sm font-semibold text-right"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 block">پست الکترونیکی (ایمیل)</label>
                <div className="relative">
                  <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="مثال: email@example.com"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-red-600 rounded-2xl pr-11 pl-4 py-3.5 focus:outline-none transition-colors text-white text-sm font-semibold text-right text-left font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 block">آی‌دی اینستاگرام جهت سنسور وایرال</label>
                <div className="relative">
                  <Instagram className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                  <input
                    type="text"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    placeholder="مثال: creative_reels_id"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-red-600 rounded-2xl pr-11 pl-4 py-3.5 focus:outline-none transition-colors text-white text-sm font-semibold text-right text-left font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="bg-white text-black hover:bg-slate-200 px-6 py-3.5 rounded-2xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95 shadow-lg"
              >
                {saving ? (
                  <>
                    <svg className="animate-spin h-3.5 w-3.5 text-black" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>در حال ذخیره‌سازی...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>بروزرسانی مشخصات و دریافت ۲ کوین 🎁</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Transaction payment history Table */}
        <div className="bg-slate-900/40 border border-slate-800/50 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl relative">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800/60">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-red-500" />
              <h3 className="font-extrabold text-white text-base">سابقه تراکنش‌ها و خریدها</h3>
            </div>
            <span className="text-[10px] bg-slate-950 hover:bg-slate-900 text-slate-400 px-3 py-1 rounded-xl border border-slate-800/80">
              {transactionsList.length} تراکنش ثبت شده
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="border-b border-slate-800/80 text-slate-400 font-extrabold">
                  <th className="pb-3 pr-2 font-black">عنوان تراکنش / پلن خریده شده</th>
                  <th className="pb-3 text-center font-black">مبلغ پرداختی (تومان)</th>
                  <th className="pb-3 text-center font-black">تعداد کوین اضافه شده</th>
                  <th className="pb-3 text-left pl-2 font-black">تاریخ ثبت تراکنش</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40 text-slate-300">
                {transactionsList.map((tx, idx) => (
                  <tr key={tx.id || idx} className="hover:bg-slate-950/20 transition-all">
                    <td className="py-4 pr-2 font-bold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                      <span>{tx.planName}</span>
                    </td>
                    <td className="py-4 text-center font-semibold text-slate-300">{tx.amount}</td>
                    <td className="py-4 text-center text-amber-500 font-black">+{tx.coinsAdded}</td>
                    <td className="py-4 text-left pl-2 font-mono text-slate-400 text-[10px]">{tx.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}
