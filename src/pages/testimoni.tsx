import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ShieldCheck, Zap, Globe, Rocket, Users, ArrowRight, CheckCircle2, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { LiveText } from "@/components/ui/live-text";

const testimonialsSelesai = [
  {
    name: "Iptu Irwan Setiawan, S.H.",
    role: "Kanit V Subdit Jatanras Ditkrimum",
    content: "Penyelidikan kasus pencurian kendaraan bermotor (Curanmor) sindikat antar-kabupaten biasanya memakan waktu berminggu-minggu untuk pencocokan nomor mesin dan rangka. Dengan KUBOYAKO, identifikasi 14 unit motor bodong di lapangan langsung selesai dalam 2 jam. Kasus LP/B/234/IV/2026 tuntas sempurna.",
    avatar: "IS",
    accent: "from-blue-600 to-indigo-700",
    photo: "https://i.pravatar.cc/150?u=iptu_irwan"
  },
  {
    name: "Bripka Ahmad Faisal",
    role: "Anggota Opsnal Resmob Polda Sulsel",
    content: "Saat penggerebekan penadah barang curian di Makassar, kami menemukan puluhan smartphone tanpa kardus. Berkat fitur pemindaian IMEI KUBOYAKO, kami langsung bisa membuktikan 8 unit adalah barang bukti dari LP Polsek Panakkukang. Tersangka langsung diamankan tanpa celah untuk mengelak.",
    avatar: "AF",
    accent: "from-emerald-500 to-teal-700",
    photo: "https://i.pravatar.cc/150?u=bripka_ahmad"
  },
  {
    name: "H. Rustam",
    role: "Korban Pencurian (Warga Makassar)",
    content: "Mobil pick-up saya hilang dicuri sebulan lalu. Sempat pesimis bisa kembali. Tapi tiba-tiba saya dihubungi pihak Resmob bahwa mobil saya ditemukan saat razia di perbatasan berkat deteksi pelat palsu menggunakan KUBOYAKO. Pelayanan yang luar biasa, terima kasih Bapak-bapak Polisi!",
    avatar: "HR",
    accent: "from-orange-500 to-red-600",
    photo: "https://i.pravatar.cc/150?u=h_rustam_korban"
  }
];

const testimonialsProses = [
  {
    name: "Aipda Rahmat Hidayat",
    role: "Penyidik Pembantu Ditkrimum",
    content: "Saat ini kami sedang melacak sindikat pencurian elektronik lintas provinsi (LP/B/451/V/2026). Meski tersangka utama belum tertangkap, sistem peringatan dini KUBOYAKO telah memblokir 3 IMEI HP curian saat dicoba dijual di konter terdaftar. Pergerakan sindikat semakin menyempit.",
    avatar: "RH",
    accent: "from-slate-600 to-slate-800",
    photo: "https://i.pravatar.cc/150?u=aipda_rahmat"
  },
  {
    name: "Iptu M. Ridwan, S.I.K.",
    role: "Panit 2 Resmob Polda Sulsel",
    content: "Dalam operasi Jaring Mantop bulan ini, kami berhasil mendeteksi pergerakan motor bodong yang dilaporkan di Gowa. Tim sedang dalam proses penyergapan target. Transparansi data antara Polres dan Polda melalui KUBOYAKO membuat koordinasi pengejaran menjadi sangat taktis dan efisien.",
    avatar: "MR",
    accent: "from-cyan-500 to-blue-600",
    photo: "https://i.pravatar.cc/150?u=iptu_ridwan"
  },
  {
    name: "Andi Kumala",
    role: "Pelapor (Masyarakat Umum)",
    content: "Baru saja melaporkan kehilangan motor Beat saya pagi ini lewat sistem terintegrasi. Statusnya sekarang 'Proses Pelacakan'. Melihat bagaimana aplikasi ini mencatat detail mesin dan rangka dan tersebar ke seluruh jajaran, saya merasa jauh lebih tenang dan yakin laporan saya ditindaklanjuti.",
    avatar: "AK",
    accent: "from-purple-500 to-pink-600",
    photo: "https://i.pravatar.cc/150?u=andi_kumala"
  }
];

export default function TestimoniPage() {
  const [activeTab, setActiveTab] = useState<'selesai' | 'proses'>('selesai');
  const [activeIndex, setActiveIndex] = useState(0);

  const activeData = activeTab === 'selesai' ? testimonialsSelesai : testimonialsProses;

  useEffect(() => {
    setActiveIndex(0); // Reset index when tab changes
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % activeData.length);
    }, 6000); 
    return () => clearInterval(interval);
  }, [activeTab, activeData.length]);

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden font-outfit">
      {/* Cinematic Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-primary/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-500/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[30%] right-[-5%] w-[40%] h-[40%] bg-orange-500/5 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '4s' }} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 contrast-150 brightness-100" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-24">
        {/* Header Section */}
        <div className="text-center mb-16 relative">
          <div className="absolute left-1/2 top-0 w-px h-24 bg-gradient-to-b from-transparent via-primary to-transparent -translate-x-1/2 -translate-y-full opacity-50" />
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight"
          >
            <LiveText id="testi-v4-title-1" defaultText="Dampak Nyata" /> <br/>
            <span className="text-gradient"><LiveText id="testi-v4-title-2" defaultText="Sistem KUBOYAKO" /></span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
          >
            <LiveText id="testi-v4-desc" defaultText="Catatan keberhasilan dan progres operasional lapangan Ditkrimum Polda Sulsel dalam menindak kejahatan melalui integrasi data pintar." />
          </motion.p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center mb-16">
          <div className="surface-glass p-2 rounded-2xl border border-white/10 flex gap-2 w-full max-w-md relative z-20 shadow-2xl">
            <button
              onClick={() => setActiveTab('selesai')}
              className={`flex-1 py-4 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                activeTab === 'selesai' 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.2)]' 
                  : 'text-muted-foreground hover:text-white hover:bg-white/5'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              KASUS SELESAI
            </button>
            <button
              onClick={() => setActiveTab('proses')}
              className={`flex-1 py-4 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                activeTab === 'proses' 
                  ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30 shadow-[0_0_20px_rgba(249,115,22,0.2)]' 
                  : 'text-muted-foreground hover:text-white hover:bg-white/5'
              }`}
            >
              <Clock className="w-4 h-4" />
              KASUS BERJALAN
            </button>
          </div>
        </div>

        {/* Hero Testimonial (Featured) */}
        <div className="max-w-5xl mx-auto mb-24">
          <div className="relative h-[450px] md:h-[350px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab + activeIndex}
                initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <div className="h-full surface-elevated rounded-[3.5rem] p-8 md:p-12 border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group">
                  <div className={`absolute top-0 right-0 w-64 h-64 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 opacity-20 ${activeTab === 'selesai' ? 'bg-emerald-500' : 'bg-orange-500'}`} />
                  
                  {/* Photo / Avatar */}
                  <div className="relative shrink-0">
                    <div className={`absolute inset-0 blur-2xl rounded-full opacity-40 ${activeTab === 'selesai' ? 'bg-emerald-500' : 'bg-orange-500'}`} />
                    <img 
                      src={activeData[activeIndex].photo} 
                      alt={activeData[activeIndex].name}
                      className="w-32 h-32 md:w-48 md:h-48 rounded-[2rem] object-cover relative z-10 border-2 border-white/10 shadow-2xl"
                    />
                    <div className={`absolute -bottom-3 -right-3 w-12 h-12 rounded-full flex items-center justify-center z-20 shadow-xl ${activeTab === 'selesai' ? 'bg-emerald-500 text-white' : 'bg-orange-500 text-white'}`}>
                      <Quote className="w-5 h-5 fill-current" />
                    </div>
                  </div>

                  <div className="flex-1 text-center md:text-left z-10">
                    <div className="flex items-center justify-center md:justify-start gap-1 mb-6">
                       {[...Array(5)].map((_, i) => (
                         <Star key={i} className="w-5 h-5 fill-primary text-primary drop-shadow-[0_0_8px_rgba(249,115,22,0.5)]" />
                       ))}
                    </div>
                    
                    <p className="text-lg md:text-xl leading-relaxed text-foreground/90 italic mb-8 font-medium">
                      "{activeData[activeIndex].content}"
                    </p>
                    
                    <div>
                      <h3 className="font-black text-2xl tracking-tight text-white">
                        {activeData[activeIndex].name}
                      </h3>
                      <p className={`text-xs font-bold uppercase tracking-widest mt-1 ${activeTab === 'selesai' ? 'text-emerald-400' : 'text-orange-400'}`}>
                        {activeData[activeIndex].role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Navigation Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {activeData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`transition-all rounded-full ${
                  idx === activeIndex ? "w-10 h-2.5 bg-primary shadow-glow" : "w-2.5 h-2.5 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Metrics Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto mb-24 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <div className="surface-elevated rounded-3xl p-6 text-center border border-white/5 shadow-lg">
            <ShieldCheck className="w-8 h-8 text-primary mx-auto mb-3" />
            <div className="text-3xl font-black text-white">100%</div>
            <div className="text-[9px] text-muted-foreground uppercase tracking-widest font-bold mt-1">Akurasi Identifikasi</div>
          </div>
          <div className="surface-elevated rounded-3xl p-6 text-center border border-white/5 shadow-lg">
            <Zap className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
            <div className="text-3xl font-black text-white">&lt; 2s</div>
            <div className="text-[9px] text-muted-foreground uppercase tracking-widest font-bold mt-1">Kecepatan Pelacakan</div>
          </div>
          <div className="surface-elevated rounded-3xl p-6 text-center border border-white/5 shadow-lg">
            <Globe className="w-8 h-8 text-blue-400 mx-auto mb-3" />
            <div className="text-3xl font-black text-white">24/7</div>
            <div className="text-[9px] text-muted-foreground uppercase tracking-widest font-bold mt-1">Monitoring Aktif</div>
          </div>
          <div className="surface-elevated rounded-3xl p-6 text-center border border-white/5 shadow-lg">
            <Users className="w-8 h-8 text-orange-400 mx-auto mb-3" />
            <div className="text-3xl font-black text-white">14.2k</div>
            <div className="text-[9px] text-muted-foreground uppercase tracking-widest font-bold mt-1">Kueri Terselesaikan</div>
          </div>
        </motion.div>

        {/* Testimonials Grid (All visible items for the active tab) */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          <AnimatePresence mode="popLayout">
            {activeData.map((t, i) => (
              <motion.div
                key={t.name + activeTab}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="break-inside-avoid"
              >
                <div className="surface p-8 rounded-[2.5rem] relative group hover:border-primary/40 transition-all border border-white/5 shadow-2xl bg-gradient-to-b from-white/[0.03] to-transparent">
                  <div className={`absolute -top-4 -right-4 w-12 h-12 rounded-2xl flex items-center justify-center backdrop-blur-xl shadow-glow rotate-12 group-hover:rotate-0 transition-transform ${activeTab === 'selesai' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'}`}>
                    <Quote className="w-6 h-6 fill-current" />
                  </div>
                  
                  <div className="flex items-center gap-4 mb-8">
                    <img 
                      src={t.photo} 
                      alt={t.name}
                      className="w-14 h-14 rounded-2xl object-cover border border-white/20 shadow-lg"
                    />
                    <div>
                      <h3 className="font-bold text-base leading-tight text-white">
                        {t.name}
                      </h3>
                      <p className={`text-[9px] font-black uppercase tracking-widest mt-1 ${activeTab === 'selesai' ? 'text-emerald-400' : 'text-orange-400'}`}>
                        {t.role}
                      </p>
                    </div>
                  </div>

                  <div className="relative">
                    <p className="text-sm leading-relaxed text-foreground/80 italic font-medium">
                      "{t.content}"
                    </p>
                  </div>

                  <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-4">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 fill-current ${activeTab === 'selesai' ? 'text-emerald-500' : 'text-orange-500'}`} />
                      ))}
                    </div>
                    <div className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                      {activeTab === 'selesai' ? <CheckCircle2 className="w-3 h-3 text-emerald-500" /> : <Clock className="w-3 h-3 text-orange-500" />}
                      {activeTab === 'selesai' ? 'Kasus Ditutup' : 'Kasus Berjalan'}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 max-w-4xl mx-auto surface-elevated rounded-[3rem] p-12 text-center border border-primary/20 relative overflow-hidden group shadow-[0_0_100px_rgba(249,115,22,0.1)]"
        >
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full -translate-x-1/2 -translate-y-1/2" />
          
          <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight text-white">
            Punya Laporan Kehilangan?
          </h2>
          <p className="text-base text-muted-foreground mb-10 max-w-xl mx-auto">
            Gunakan fitur pelaporan terintegrasi untuk segera menyebarkan data kendaraan atau perangkat Anda ke seluruh jajaran RESMOB.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/user/lapor" className="h-14 px-8 rounded-2xl gradient-primary text-primary-foreground font-black text-sm flex items-center gap-3 shadow-glow hover:scale-105 transition-transform">
              BUAT LAPORAN SEKARANG <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/admin" className="h-14 px-8 rounded-2xl surface-glass border border-white/10 text-white font-bold text-sm flex items-center gap-3 hover:bg-white/5 transition-colors">
              MASUK KE DASHBOARD
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
