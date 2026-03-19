// "use client";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { useAuthStore } from "@/zustand/authStore";

// export default function Dashboard() {
//   const { user, clearAuth } = useAuthStore();
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) router.push("/wgAuthForm");
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     clearAuth();
//     router.push("/wgAuthForm");
//   };

//   return (
//     <div className="min-h-screen bg-black text-white pt-28 px-4">
//       <div className="max-w-4xl mx-auto">

//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold text-[#9EFF00]">Dashboard</h1>
//           <p className="text-gray-400 mt-2">Welcome back, {user?.fullname || "User"} 👋</p>
//         </div>

//         {/* Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//           {/* Profile Card */}
//           <Link href="/dashboard/profile">
//             <div className="border border-[#333] rounded-xl p-6 hover:border-[#9EFF00] transition-all cursor-pointer bg-[#111]">
//               <div className="flex items-center gap-4 mb-4">
//                 <div className="w-14 h-14 rounded-full bg-[#9EFF00] flex items-center justify-center text-black text-2xl font-bold">
//                   {user?.fullname?.charAt(0)?.toUpperCase() || "U"}
//                 </div>
//                 <div>
//                   <h2 className="text-xl font-semibold">{user?.fullname}</h2>
//                   <p className="text-gray-400 text-sm">{user?.email}</p>
//                 </div>
//               </div>
//               <p className="text-[#9EFF00] text-sm font-medium">Edit Profile →</p>
//             </div>
//           </Link>

//           {/* Proposals Card */}
//           <div className="border border-[#333] rounded-xl p-6 bg-[#111]">
//             <h2 className="text-xl font-semibold mb-2">My Proposals</h2>
//             <p className="text-gray-400 text-sm">View your submitted proposals and their status.</p>
//             <p className="text-[#9EFF00] text-sm font-medium mt-4">Coming Soon →</p>
//           </div>

//         </div>

//         {/* Logout */}
//         <div className="mt-10">
//           <button
//             onClick={handleLogout}
//             className="border border-red-500 text-red-500 px-6 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-all"
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/zustand/authStore";
import { Settings, LogOut, User, FileText } from "lucide-react";

export default function Dashboard() {
  const { user, clearAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/wgAuthForm");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    clearAuth();
    router.push("/wgAuthForm");
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-4 pb-10">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#9EFF00]">Dashboard</h1>
            <p className="text-gray-400 mt-1">Welcome back, <span className="text-white font-medium">{user?.fullname || "User"}</span> 👋</p>
          </div>
          <Link href="/dashboard/profile"
            className="flex items-center gap-2 bg-[#1a1a1a] border border-[#333] hover:border-[#9EFF00] px-4 py-2 rounded-xl transition-all text-sm text-gray-400 hover:text-white">
            <Settings size={16} />
            Settings
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Profile Card */}
          <Link href="/dashboard/profile">
            <div className="border border-[#222] rounded-2xl p-6 hover:border-[#9EFF00] transition-all cursor-pointer bg-[#0d0d0d] group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-[#9EFF00] flex items-center justify-center text-black text-2xl font-bold overflow-hidden border-2 border-[#9EFF00]">
                  {user?.profilePicture ? (
                    <img src={`http://localhost:8003${user.profilePicture}`}
                      alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span>{user?.fullname?.charAt(0)?.toUpperCase() || "U"}</span>
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">{user?.fullname || "—"}</h2>
                  <p className="text-gray-400 text-sm">{user?.email || "—"}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[#9EFF00] text-sm font-medium group-hover:gap-3 transition-all">
                <User size={14} />
                Edit Profile →
              </div>
            </div>
          </Link>

          {/* Proposals Card */}
          <div className="border border-[#222] rounded-2xl p-6 bg-[#0d0d0d]">
            <div className="flex items-center gap-2 mb-3">
              <FileText size={18} className="text-[#9EFF00]" />
              <h2 className="text-lg font-semibold">My Proposals</h2>
            </div>
            <p className="text-gray-400 text-sm mb-4">View your submitted proposals and their status.</p>
            <span className="text-[#9EFF00] text-sm font-medium">Coming Soon →</span>
          </div>

        </div>

        {/* Logout */}
        <div className="mt-8">
          <button onClick={handleLogout}
            className="flex items-center gap-2 bg-[#1a1a1a] border border-red-500/30 text-red-400 px-6 py-3 rounded-xl hover:bg-red-500/10 hover:border-red-500 transition-all text-sm font-medium">
            <LogOut size={16} />
            Sign Out
          </button>
        </div>

      </div>
    </div>
  );
}