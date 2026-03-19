"use client";
import { useState, FormEvent } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import {
  loginUser,
  forgotPasswordApi,
  resetPasswordApi,
  registerUser,
} from "@/api/module/auth";
import Image from "next/image";
import { useAuthStore } from "@/zustand/authStore";

type Mode = "login" | "signup" | "forgot" | "otp" | "reset";

export default function AuthForm() {
  const [fullname, setFullname] = useState("");
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setAuth } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // ✅ LOGIN
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      toast.error("All fields required");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await loginUser({ email: email.trim(), password });
      if (res.status === 200 || res.status === 201) {
        const data = res.data?.data;
        localStorage.setItem("token", data.token);
        setAuth({ token: data.token, user: data.user });
        toast.success("Welcome back!");
        window.location.href = "/dashboard";
      } else {
        toast.error(res.data?.message || "Login failed");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ SIGNUP
  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    if (!fullname.trim() || fullname.length < 3) {
      toast.error("Name min 3 characters");
      return;
    }
    if (!email.trim()) {
      toast.error("Email required");
      return;
    }
    if (!password || password.length < 6) {
      toast.error("Password min 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await registerUser({
        fullname: fullname.trim(),
        username: fullname.trim(),
        email: email.trim(),
        password,
      });
      if (res.status === 200 || res.status === 201) {
        toast.success("Account created! Please login.");
        setMode("login");
        setFullname("");
        setPassword("");
        setConfirmPassword("");
      } else {
        toast.error(res.data?.message || "Signup failed");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ FORGOT
  const handleForgot = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Email required");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await forgotPasswordApi({ email: email.trim() });
      if (res.status === 200 || res.status === 201) {
        toast.success("OTP sent to your email!");
        setMode("otp");
      } else {
        toast.error(res.data?.message || "Email not found");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ OTP
  const handleOtp = (e: FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("Enter 6-digit OTP");
      return;
    }
    setMode("reset");
  };

  // ✅ RESET
  const handleReset = async (e: FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Min 6 characters");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await resetPasswordApi({ email, otp, newPassword });
      if (res.status === 200 || res.status === 201) {
        toast.success("Password reset! Please login.");
        setMode("login");
        setOtp("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.error(res.data?.message || "Reset failed");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white outline-none focus:border-[#9EFF00] transition-all placeholder-gray-600 text-sm";
  const labelClass =
    "text-gray-400 text-xs font-medium mb-1 block uppercase tracking-wider";
  const btnPrimary =
    "w-full bg-[#9EFF00] text-black font-bold py-3 rounded-xl hover:bg-[#8CE600] transition-all disabled:opacity-50 text-sm tracking-widest";
  const eyeBtn =
    "absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors";

  // Right panel content per mode
  const rightPanel = {
    login: {
      emoji: "🚀",
      title: "Welcome Back!",
      sub: "Access your dashboard",
      desc: "Track proposals, manage your profile and stay updated.",
    },
    signup: {
      emoji: "✨",
      title: "Join Us!",
      sub: "Create your account today",
      desc: "Submit proposals, track projects and manage your profile.",
    },
    forgot: {
      emoji: "📧",
      title: "Check Email!",
      sub: "OTP will be sent to you",
      desc: "Enter your registered email to receive a password reset OTP.",
    },
    otp: {
      emoji: "🔐",
      title: "Verify OTP",
      sub: "Check your inbox",
      desc: "Enter the 6-digit code sent to your email. Expires in 10 minutes.",
    },
    reset: {
      emoji: "🔑",
      title: "New Password",
      sub: "Almost done!",
      desc: "Choose a strong password to secure your account.",
    },
  };

  const rp = rightPanel[mode];

  return (
    // <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-black">
    <div className="min-h-screen flex items-center justify-center px-4 py-10 pt-30 md:pt-34 bg-black">
      <div className="w-full max-w-[880px] rounded-3xl overflow-hidden border border-[#222] flex flex-col md:flex-row shadow-2xl min-h-[560px]">
        {/* ===== LEFT PANEL ===== */}
        <div className="w-full md:w-1/2 p-8 md:p-10 bg-[#0d0d0d] flex flex-col justify-between">
          {/* Logo */}
          <div>
            {/* <div className="mb-6">
              <span className="text-[#9EFF00] text-lg font-bold tracking-wide">WG Tech Solutions</span>
            </div> */}
            <div className="mb-6 flex items-center gap-3">
              <Image
                src="/images/Logo.png"
                alt="WG Logo"
                width={40}
                height={40}
                className="object-contain animate-spin-slow"
              />
              <span className="text-[#9EFF00] text-lg font-bold tracking-wide">
                WG Tech Solutions
              </span>
            </div>
            {/* LOGIN */}
            {mode === "login" && (
              <>
                <h1 className="text-white text-2xl font-bold mb-1">Sign In</h1>
                <p className="text-gray-500 text-sm mb-6">
                  Enter your credentials to continue
                </p>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className={labelClass}>Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        minLength={6}
                        className={inputClass + " pr-12"}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={eyeBtn}
                      >
                        {showPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <button
                      type="button"
                      onClick={() => setMode("forgot")}
                      className="text-[#9EFF00] text-xs hover:underline"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={btnPrimary}
                  >
                    {isSubmitting ? "Signing in..." : "SIGN IN"}
                  </button>
                  <p className="text-center text-gray-500 text-xs pt-1">
                    Don't have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setMode("signup")}
                      className="text-[#9EFF00] hover:underline font-semibold"
                    >
                      Sign Up
                    </button>
                  </p>
                </form>
              </>
            )}

            {/* SIGNUP */}
            {mode === "signup" && (
              <>
                <h1 className="text-white text-2xl font-bold mb-1">
                  Create Account
                </h1>
                <p className="text-gray-500 text-sm mb-6">
                  Join WG Tech Solutions today
                </p>
                <form onSubmit={handleSignup} className="space-y-3">
                  <div>
                    <label className={labelClass}>Full Name</label>
                    <input
                      type="text"
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                      placeholder="Muhammad Ali"
                      required
                      minLength={3}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        minLength={6}
                        className={inputClass + " pr-12"}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={eyeBtn}
                      >
                        {showPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Confirm Password</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        minLength={6}
                        className={inputClass + " pr-12"}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className={eyeBtn}
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={btnPrimary + " mt-1"}
                  >
                    {isSubmitting ? "Creating..." : "CREATE ACCOUNT"}
                  </button>
                  <p className="text-center text-gray-500 text-xs pt-1">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setMode("login")}
                      className="text-[#9EFF00] hover:underline font-semibold"
                    >
                      Sign In
                    </button>
                  </p>
                </form>
              </>
            )}

            {/* FORGOT */}
            {mode === "forgot" && (
              <>
                <h1 className="text-white text-2xl font-bold mb-1">
                  Forgot Password
                </h1>
                <p className="text-gray-500 text-sm mb-6">
                  Enter your registered email to receive OTP
                </p>
                <form onSubmit={handleForgot} className="space-y-4">
                  <div>
                    <label className={labelClass}>Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className={inputClass}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={btnPrimary}
                  >
                    {isSubmitting ? "Sending..." : "SEND OTP"}
                  </button>
                  <p className="text-center text-xs text-gray-500 pt-1">
                    <button
                      type="button"
                      onClick={() => setMode("login")}
                      className="text-[#9EFF00] hover:underline"
                    >
                      ← Back to Login
                    </button>
                  </p>
                </form>
              </>
            )}

            {/* OTP */}
            {mode === "otp" && (
              <>
                <h1 className="text-white text-2xl font-bold mb-1">
                  Verify OTP
                </h1>
                <p className="text-gray-500 text-sm mb-1">
                  Code sent to <span className="text-[#9EFF00]">{email}</span>
                </p>
                <p className="text-gray-600 text-xs mb-6">
                  Expires in 10 minutes.
                </p>
                <form onSubmit={handleOtp} className="space-y-4">
                  <div>
                    <label className={labelClass}>6-Digit OTP</label>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) =>
                        setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                      }
                      placeholder="0  0  0  0  0  0"
                      required
                      maxLength={6}
                      className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white outline-none focus:border-[#9EFF00] transition-all text-center text-xl tracking-[0.6em] placeholder-gray-700"
                    />
                  </div>
                  <button type="submit" className={btnPrimary}>
                    VERIFY OTP
                  </button>
                  <p className="text-center text-xs text-gray-500 pt-1">
                    Didn't receive?{" "}
                    <button
                      type="button"
                      onClick={() => setMode("forgot")}
                      className="text-[#9EFF00] hover:underline"
                    >
                      Resend OTP
                    </button>
                  </p>
                </form>
              </>
            )}

            {/* RESET */}
            {mode === "reset" && (
              <>
                <h1 className="text-white text-2xl font-bold mb-1">
                  New Password
                </h1>
                <p className="text-gray-500 text-sm mb-6">
                  Set your new secure password
                </p>
                <form onSubmit={handleReset} className="space-y-4">
                  <div>
                    <label className={labelClass}>New Password</label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        minLength={6}
                        className={inputClass + " pr-12"}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className={eyeBtn}
                      >
                        {showNewPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Confirm Password</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        minLength={6}
                        className={inputClass + " pr-12"}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className={eyeBtn}
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={btnPrimary}
                  >
                    {isSubmitting ? "Resetting..." : "RESET PASSWORD"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

        {/* ===== RIGHT PANEL ===== */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-[#9EFF00] to-[#00D4AA] p-8 md:p-10 flex flex-col items-center justify-center text-center min-h-[280px] md:min-h-0">
          <div className="text-5xl mb-5">{rp.emoji}</div>
          <h2 className="text-black text-3xl font-bold mb-2">{rp.title}</h2>
          <p className="text-black/70 text-base font-medium mb-1">{rp.sub}</p>
          <p className="text-black/60 text-sm max-w-[260px] leading-relaxed">
            {rp.desc}
          </p>

          {/* Mode indicator dots */}
          <div className="flex gap-2 mt-8">
            {(["login", "signup", "forgot", "otp", "reset"] as Mode[]).map(
              (m) => (
                <div
                  key={m}
                  className={`w-2 h-2 rounded-full transition-all ${mode === m ? "bg-black w-5" : "bg-black/30"}`}
                />
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
