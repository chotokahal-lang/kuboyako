import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MobileFrame } from "@/components/layout/mobile-frame";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SkipForward } from "lucide-react";
import { useLocation } from "react-router-dom";
import Splash from "@/pages/splash";
import RoleSelect from "@/pages/role-select";
import Login from "@/pages/login";
import AdminDashboard from "@/pages/admin-dashboard";
import AdminInput from "@/pages/admin-input";
import AdminScan from "@/pages/admin-scan";
import AdminRiwayat from "@/pages/admin-riwayat";
import AdminDetail from "@/pages/admin-detail";
import AdminAccounts from "@/pages/admin-accounts";
import AdminLogs from "@/pages/admin-logs";
import UserDashboard from "@/pages/user-dashboard";
import UserCek from "@/pages/user-cek";
import UserHasil from "@/pages/user-hasil";
import UserLapor from "@/pages/user-lapor";
import UserDaftar from "@/pages/user-daftar";
import UserVerifikasiWajah from "@/pages/user-verifikasi-wajah";
import Profile from "@/pages/profile";
import Notifications from "@/pages/notifications";
import HelpFaq from "@/pages/help-faq";
import About from "@/pages/about";
import NotFound from "@/pages/not-found";
import Presentasi from "@/pages/presentasi";
import TestimoniPage from "@/pages/testimoni";
import AgentManager from "@/pages/agent-manager";
import AgentAutoFixPage from "@/pages/agent-autofix";
import FileManager from "@/pages/file-manager";
import { LiveEditToggle } from "@/components/ui/live-edit-toggle";
import { LiveToolbar } from "@/components/ui/live-toolbar";
import { LiveText } from "@/components/ui/live-text";
import openingVideo from "@/assets/video.mp4";

const queryClient = new QueryClient();

// Opening Video Component
function OpeningVideo({ onComplete }: { onComplete: () => void }) {
  const [showVideo, setShowVideo] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      const prog = (video.currentTime / video.duration) * 100;
      setProgress(prog);
    };

    const handleEnded = () => {
      setShowVideo(false);
      onComplete();
    };

    video.addEventListener("timeupdate", updateProgress);
    video.addEventListener("ended", handleEnded);

    // Auto-play
    video.play().catch(() => {
      // If autoplay fails, skip video
      handleSkip();
    });

    return () => {
      video.removeEventListener("timeupdate", updateProgress);
      video.removeEventListener("ended", handleEnded);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setShowVideo(false);
    onComplete();
  };

  return (
    <AnimatePresence>
      {showVideo && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Video */}
          <div className="relative w-full h-full md:w-[410px] md:h-[840px] md:aspect-[9/19.5] md:rounded-[3.5rem] overflow-hidden bg-black md:border-[10px] md:border-[#121212] phone-frame-desktop">
            {/* Dynamic Island Mockup */}
            <div className="hidden md:flex absolute top-4 left-1/2 -translate-x-1/2 w-32 h-8 dynamic-island rounded-full z-50 items-center justify-center">
              <div className="w-1.5 h-1.5 bg-[#1a1a1a] rounded-full ml-auto mr-4 ring-1 ring-white/5 opacity-40" />
            </div>

            {/* Physical Button Mockups */}
            <div className="hidden md:block absolute -left-[12px] top-32 w-[4px] h-12 bg-white/10 rounded-l-md ring-1 ring-white/5" />
            <div className="hidden md:block absolute -left-[12px] top-48 w-[4px] h-20 bg-white/10 rounded-l-md ring-1 ring-white/5" />
            <div className="hidden md:block absolute -left-[12px] top-72 w-[4px] h-20 bg-white/10 rounded-l-md ring-1 ring-white/5" />
            <div className="hidden md:block absolute -right-[12px] top-48 w-[4px] h-24 bg-white/10 rounded-r-md ring-1 ring-white/5" />

            {/* Status Bar */}
            <div className="absolute top-0 left-0 right-0 h-10 flex items-center justify-between px-8 z-[60] text-[10px] font-bold text-white/80 pointer-events-none">
              <span>
                <LiveText as="span" id="app-opening-clock" defaultText="9:41" />
              </span>
              <div className="flex items-center gap-1.5">
                <div className="flex gap-0.5 items-end h-2">
                  <div className="w-0.5 h-[3px] bg-white/40" />
                  <div className="w-0.5 h-[5px] bg-white/40" />
                  <div className="w-0.5 h-[7px] bg-white" />
                  <div className="w-0.5 h-[9px] bg-white" />
                </div>
                <span>
                  <LiveText as="span" id="app-opening-network" defaultText="5G" />
                </span>
                <div className="w-5 h-2.5 border border-white/40 rounded-sm relative px-0.5 flex items-center">
                  <div className="h-full bg-white w-[80%]" />
                  <div className="absolute -right-1 w-0.5 h-1 bg-white/40 rounded-r-sm" />
                </div>
              </div>
            </div>

            {/* Reflection Effect */}
            <div className="absolute inset-0 pointer-events-none z-[60] overflow-hidden rounded-[3rem] phone-reflection opacity-40" />

            {/* Home Bar */}
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-white/20 rounded-full z-[60] backdrop-blur-md" />

            <video
              ref={videoRef}
              src={openingVideo}
              className="absolute inset-0 w-full h-full object-cover"
              muted
              playsInline
              autoPlay
            />
          </div>

          {/* Gradient overlay for better visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

          {/* Skip button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            onClick={handleSkip}
            className="absolute bottom-12 right-6 z-10 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium hover:bg-white/20 transition-colors"
          >
            <SkipForward className="w-4 h-4" />
            <LiveText as="span" id="app-opening-skip" defaultText="Lewati" />
          </motion.button>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
            <motion.div
              className="h-full bg-primary"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Logo overlay */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="absolute top-12 left-6 z-10"
          >
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary/20 backdrop-blur-md flex items-center justify-center border border-primary/30">
                <LiveText as="span" id="app-opening-brand-letter" className="text-primary font-bold text-lg" defaultText="K" />
              </div>
              <LiveText as="span" id="app-opening-brand-name" className="text-white font-semibold text-sm" defaultText="KUBOYAKO" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function AppContent() {
  const { pathname } = useLocation();
  const isPresentasi = pathname.includes("presentasi");
  
  const [showOpening, setShowOpening] = useState(() => {
    return !sessionStorage.getItem("openingVideoShown");
  });

  const handleVideoComplete = () => {
    sessionStorage.setItem("openingVideoShown", "true");
    setShowOpening(false);
  };

  return (
    <>
      {!isPresentasi && (
        <>
          <Toaster />
          <Sonner />
        </>
      )}
      {showOpening && <OpeningVideo onComplete={handleVideoComplete} />}
      <Routes>
        {/* Full-screen pages (Bypass MobileFrame) */}
        <Route path="/presentasi" element={<Presentasi />} />
        <Route path="/testimoni" element={<TestimoniPage />} />
        <Route path="/agent-manager" element={<AgentManager />} />
        <Route path="/agent-autofix" element={<AgentAutoFixPage />} />
        <Route path="/file-manager" element={<FileManager />} />

        {/* Mobile-framed pages */}
        <Route
          path="*"
          element={
            <MobileFrame>
              <Routes>
                <Route path="/" element={<Splash />} />
                <Route path="/role-select" element={<RoleSelect />} />
                <Route path="/login/:type" element={<Login />} />

                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/input" element={<AdminInput />} />
                <Route path="/admin/scan" element={<AdminScan />} />
                <Route path="/admin/riwayat" element={<AdminRiwayat />} />
                <Route path="/admin/detail/:id" element={<AdminDetail />} />
                <Route path="/admin/accounts" element={<AdminAccounts />} />
                <Route path="/admin/logs" element={<AdminLogs />} />

                <Route path="/user" element={<UserDashboard />} />
                <Route path="/user/cek/:type" element={<UserCek />} />
                <Route path="/user/hasil/:type/:query" element={<UserHasil />} />
                <Route path="/user/lapor" element={<UserLapor />} />
                <Route path="/user/daftar" element={<UserDaftar />} />
                <Route path="/user/verifikasi-wajah" element={<UserVerifikasiWajah />} />

                <Route path="/profile" element={<Profile />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/help-faq" element={<HelpFaq />} />
                <Route path="/about" element={<About />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </MobileFrame>
          }
        />
      </Routes>
      <LiveEditToggle />
      <LiveToolbar />
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
