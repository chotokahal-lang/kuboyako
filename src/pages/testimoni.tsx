import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ShieldCheck, Zap, Globe, Rocket, Users, ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { LiveText } from "@/components/ui/live-text";
import { Logo3DImg } from "@/components/ui/logo-3d-img";

const testimonials = [
  {
    name: "Aiptu Rizal",
    role: "Bagian Administrasi BB",
    content: "Dulu cari berkas barang bukti makan waktu seharian di gudang, sekarang tinggal klik di HP. Kerja jadi lebih cerdas, bukan lebih keras. Semua data tersusun rapi dan akurat.",
    avatar: "AR",
    accent: "from-blue-600 to-indigo-700"
  },
  {
    name: "Bripka Andi",
    role: "Unit Reaksi Cepat (URC)",
    content: "Sangat membantu kami saat razia di lapangan. Cukup masukkan plat atau IMEI, langsung tahu statusnya dalam hitungan detik. Gak ada lagi alasan buat pelaku buat mengelak.",
    avatar: "BA",
    accent: "from-orange-500 to-red-600"
  },
  {
    name: "Iptu Hasan",
    role: "Panit Resmob Polda Sulsel",
    content: "Inovasi yang pas buat zaman sekarang. Semua anggota sudah pakai dan sangat terbantu. KUBOYAKO bikin sistem di Polda makin rapi dan profesional di mata pimpinan.",
    avatar: "IH",
    accent: "from-emerald-500 to-teal-700"
  },
  {
    name: "Bapak Haji Syamsul",
    role: "Tokoh Masyarakat",
    content: "Warga juga sangat senang karena bisa lapor dan cek sendiri. Sangat transparan dan nggak pakai ribet. Ini yang kami harapkan dari kepolisian modern.",
    avatar: "HS",
    accent: "from-purple-500 to-pink-600"
  },
  {
    name: "Sdr. Rudi",
    role: "Warga Kota Makassar",
    content: "Sebagai masyarakat, saya merasa jauh lebih aman kalau mau belanja HP bekas. Tinggal cek di KUBOYAKO dulu, kalau aman baru saya beli. Sangat bermanfaat!",
    avatar: "SR",
    accent: "from-cyan-500 to-blue-600"
  },
  {
    name: "Operator IT Polda",
    role: "Manajemen Data DORS",
    content: "Integrasi sistemnya sangat mantap. Gak ada lagi data yang hilang atau dobel. Memudahkan sinkronisasi data antar unit dengan sangat cepat dan aman.",
    avatar: "IT",
    accent: "from-slate-600 to-slate-800"
  }
];

export default function TestimoniPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden font-outfit">
      {/* Cinematic Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Mesh Gradients */}
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-primary/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-500/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[30%] right-[-5%] w-[40%] h-[40%] bg-orange-500/5 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '4s' }} />
        
        {/* Animated Grid Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 contrast-150 brightness-100" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-24">
        {/* Auto-Rotating Hero Testimonial */}
        <div className="max-w-5xl mx-auto mb-24">
          <div className="relative h-[400px] md:h-[350px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.05, y: -20 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <div className="h-full surface-elevated rounded-[3.5rem] p-8 md:p-12 border border-primary/20 shadow-glow flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2" />
                  
                  {/* Big Avatar */}
                  <div className={`w-32 h-32 md:w-48 md:h-48 rounded-[2.5rem] bg-gradient-to-br ${testimonials[activeIndex].accent} flex items-center justify-center text-4xl md:text-6xl font-black text-white shadow-2xl shrink-0`}>
                    {testimonials[activeIndex].avatar}
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                       {[...Array(5)].map((_, i) => (
                         <Star key={i} className="w-4 h-4 fill-primary text-primary animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                       ))}
                    </div>
                    
                    <h2 className="text-xl md:text-3xl font-bold text-foreground mb-4 leading-relaxed">
                      <LiveText id={`testi-real-hero-content-${activeIndex}`} defaultText={`"${testimonials[activeIndex].content}"`} />
                    </h2>
                    
                    <div>
                      <h3 className="text-lg font-black text-primary uppercase tracking-wider">
                        <LiveText id={`testi-real-hero-name-${activeIndex}`} defaultText={testimonials[activeIndex].name} />
                      </h3>
                      <p className="text-xs text-muted-foreground font-bold uppercase tracking-[0.2em] mt-1">
                        <LiveText id={`testi-real-hero-role-${activeIndex}`} defaultText={testimonials[activeIndex].role} />
                      </p>
                    </div>
                  </div>

                  {/* Indicator Dots */}
                  <div className="absolute bottom-8 left-1/2 md:left-auto md:right-12 -translate-x-1/2 md:translate-x-0 flex gap-2">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        className={`h-1.5 rounded-full transition-all duration-500 ${i === activeIndex ? "w-8 bg-primary" : "w-2 bg-white/20"}`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-[1px] w-12 bg-primary/40" />
            <span className="eyebrow text-primary text-sm">Kesaksian Nyata</span>
            <div className="h-[1px] w-12 bg-primary/40" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-black mb-8 tracking-tight leading-tight"
          >
            <LiveText id="testi-real-page-title-1" defaultText="DAFTAR ULASAN" /> <span className="text-gradient"><LiveText id="testi-real-page-title-2" defaultText="PENGGUNA KUBOYAKO" /></span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto"
          >
            <LiveText id="testi-real-page-desc" defaultText="Dengarkan langsung pengalaman nyata dari para petugas kepolisian di lapangan dan masyarakat yang telah merasakan manfaat kemudahan dari sistem KUBOYAKO." />
          </motion.p>
        </div>

        {/* Hero Badge Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-5xl mx-auto mb-24 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <div className="surface-elevated rounded-3xl p-6 text-center border border-white/5">
            <ShieldCheck className="w-8 h-8 text-primary mx-auto mb-3" />
            <div className="text-2xl font-bold">100%</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Aman & Terenkripsi</div>
          </div>
          <div className="surface-elevated rounded-3xl p-6 text-center border border-white/5">
            <Zap className="w-8 h-8 text-orange-400 mx-auto mb-3" />
            <div className="text-2xl font-bold">Ultra</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Respon Real-time</div>
          </div>
          <div className="surface-elevated rounded-3xl p-6 text-center border border-white/5">
            <Globe className="w-8 h-8 text-blue-400 mx-auto mb-3" />
            <div className="text-2xl font-bold">Nasional</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Cakupan Seluruh RI</div>
          </div>
          <div className="surface-elevated rounded-3xl p-6 text-center border border-white/5">
            <Rocket className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
            <div className="text-2xl font-bold">Segera</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Wajib Launching</div>
          </div>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="break-inside-avoid"
            >
              <div className="surface p-8 rounded-[2.5rem] relative group hover:border-primary/40 transition-all border border-white/5 shadow-2xl">
                <div className="absolute -top-4 -right-4 w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary backdrop-blur-xl border border-primary/20 shadow-glow rotate-12 group-hover:rotate-0 transition-transform">
                  <Quote className="w-6 h-6 fill-primary" />
                </div>
                
                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${t.accent} flex items-center justify-center text-xl font-black text-white shadow-lg`}>
                    {t.avatar}
                  </div>
                  <div>
                    <h3 className="font-bold text-base leading-tight">
                      <LiveText id={`testi-real-grid-name-${i}`} defaultText={t.name} />
                    </h3>
                    <p className="text-[10px] text-primary font-black uppercase tracking-widest mt-1">
                      <LiveText id={`testi-real-grid-role-${i}`} defaultText={t.role} />
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <p className="text-base leading-relaxed text-foreground/90 italic">
                    <LiveText id={`testi-real-grid-content-${i}`} defaultText={`"${t.content}"`} />
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-primary text-primary" />
                    ))}
                  </div>
                  <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Diverifikasi Pemerintah</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 max-w-5xl mx-auto surface-elevated rounded-[3rem] p-12 text-center border border-primary/20 relative overflow-hidden group shadow-[0_0_100px_rgba(249,115,22,0.15)]"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2" />
          
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
            Waktu Tidak Bisa <span className="text-gradient">Menunggu Lagi.</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Setiap detik KUBOYAKO ditunda, kita kehilangan kesempatan untuk mengamankan aset bangsa. 
            Bersama kita jemput masa depan sekarang juga.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/presentasi" className="h-16 px-10 rounded-2xl gradient-primary text-primary-foreground font-black text-sm flex items-center gap-3 shadow-glow hover:scale-105 transition-transform">
              LIHAT PRESENTASI PENUH <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/" className="h-16 px-10 rounded-2xl surface-glass border border-white/10 text-foreground font-bold text-sm flex items-center gap-3 hover:bg-white/5 transition-colors">
              KEMBALI KE BERANDA
            </Link>
          </div>
          
          <div className="mt-12 flex items-center justify-center gap-8 opacity-40 grayscale group-hover:grayscale-0 transition-all">
             <Users className="w-8 h-8" />
             <div className="text-xs font-bold uppercase tracking-[0.3em]">Didukung Oleh Seluruh Jajaran Aparatur Negara</div>
          </div>
        </motion.div>
      </div>

      {/* Footer Branding */}
      <footer className="py-12 text-center">
         <p className="text-[10px] text-muted-foreground uppercase tracking-[0.5em] font-bold">
           KUBOYAKO 2030 — ULTIMATE EDITION [VER-0405]
         </p>
      </footer>
    </div>
  );
}
