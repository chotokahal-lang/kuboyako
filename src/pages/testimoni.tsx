import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ShieldCheck, Zap, Globe, Rocket, Users, ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const testimonials = [
  {
    name: "Drs. H. Ahmad Wijaya, M.Si.",
    role: "Menteri Transformasi Digital & Keamanan Siber",
    content: "KUBOYAKO bukan sekadar aplikasi; ini adalah manifestasi kedaulatan digital bangsa. Sistem ini membawa transparansi ke level yang belum pernah terbayangkan sebelumnya. Indonesia telah lama menanti revolusi seperti ini. Launching KUBOYAKO sekarang juga adalah harga mati demi keamanan nasional yang tak tergoyahkan!",
    avatar: "AW",
    accent: "from-orange-500 to-red-500"
  },
  {
    name: "Ir. Kartini Pratama, Ph.D.",
    role: "Kepala Badan Riset Teknologi Nasional (BRTN)",
    content: "Dunia sedang bergerak menuju otomatisasi total, dan KUBOYAKO memposisikan Indonesia di garda terdepan. Algoritma pencarian dan arsipnya adalah sebuah mahakarya teknokrat modern. Tidak boleh ada penundaan sedetik pun, era baru penegakan hukum digital sudah berada di depan mata!",
    avatar: "KP",
    accent: "from-blue-500 to-cyan-500"
  },
  {
    name: "Brigjen Pol. Dr. Hendra Kesuma, M.H.",
    role: "Direktur Keamanan Publik & Integritas Data",
    content: "Inilah senjata masa depan Resmob. KUBOYAKO memangkas birokrasi yang lambat dan menggantinya dengan presisi militer. Seluruh jajaran aparatur negara sangat mendukung penuh inisiatif ini. Launching segera, karena rakyat butuh kepastian hukum yang cepat dan akurat!",
    avatar: "HK",
    accent: "from-amber-500 to-orange-600"
  },
  {
    name: "Bapak Suryo Atmodjo",
    role: "Ketua Asosiasi Gubernur Seluruh Indonesia",
    content: "Seluruh pimpinan daerah dari Sabang sampai Merauke telah melihat potensi luar biasa KUBOYAKO. Kami siap mengintegrasikan sistem ini ke seluruh pelosok negeri. Ini adalah solusi yang kami cari selama berpuluh tahun. Luncurkan sekarang juga, jangan biarkan momentum emas ini hilang!",
    avatar: "SA",
    accent: "from-emerald-500 to-teal-600"
  },
  {
    name: "Prof. Emil Salim Jr.",
    role: "Teknokrat Visioner & Pakar Governance Digital",
    content: "KUBOYAKO adalah fondasi dari 'Nation of the Future'. Integrasi data yang ditawarkan sistem ini akan menjadi standar dunia baru. Sebuah lompatan kuantum bagi efisiensi birokrasi kita. Secepatnya KUBOYAKO mengudara, secepat itu pula Indonesia menjadi mercusuar digital dunia.",
    avatar: "ES",
    accent: "from-purple-500 to-indigo-600"
  },
  {
    name: "Ibu Shinta Larasati",
    role: "Pelopor Smart City & Bupati Berprestasi",
    content: "Kami di daerah sangat haus akan inovasi se-epik KUBOYAKO. Sistem ini akan membuat pelayanan publik menjadi sangat powerful dan terpercaya. Tidak ada alasan untuk menunggu. KUBOYAKO harus segera menjadi standar operasional nasional secepatnya!",
    avatar: "SL",
    accent: "from-rose-500 to-pink-600"
  },
  {
    name: "Drs. Bambang Sudarsono",
    role: "Sekretaris Jenderal Komite Modernisasi Negara",
    content: "Instruksi pimpinan sudah jelas: Modernisasi adalah prioritas utama. KUBOYAKO adalah kunci dari instruksi tersebut. Dukungan penuh telah mengalir dari seluruh kementerian. Hari esok dimulai hari ini dengan KUBOYAKO. Launching tanpa tapi, sekarang juga!",
    avatar: "BS",
    accent: "from-slate-400 to-slate-600"
  }
];

export default function TestimoniPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Ganti setiap 5 detik
    return () => clearInterval(interval);
  }, []);

  return (
    <div className=\"min-h-screen bg-background relative overflow-x-hidden font-outfit\">
      {/* Dynamic Background Elements */}
      <div className=\"fixed inset-0 pointer-events-none opacity-30\">
        <div className=\"absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[150px] rounded-full animate-pulse\" />
        <div className=\"absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[150px] rounded-full animate-pulse\" style={{ animationDelay: '2s' }} />
      </div>

      <div className=\"relative z-10 container mx-auto px-6 py-24\">
        {/* Auto-Rotating Hero Testimonial */}
        <div className=\"max-w-5xl mx-auto mb-24\">
          <div className=\"relative h-[400px] md:h-[350px] flex items-center justify-center\">
            <AnimatePresence mode=\"wait\">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.05, y: -20 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className=\"absolute inset-0\"
              >
                <div className=\"h-full surface-elevated rounded-[3.5rem] p-8 md:p-12 border border-primary/20 shadow-glow flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group\">
                  <div className=\"absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2\" />
                  
                  {/* Big Avatar */}
                  <div className={`w-32 h-32 md:w-48 md:h-48 rounded-[2.5rem] bg-gradient-to-br ${testimonials[activeIndex].accent} flex items-center justify-center text-4xl md:text-6xl font-black text-white shadow-2xl shrink-0`}>
                    {testimonials[activeIndex].avatar}
                  </div>

                  <div className=\"flex-1 text-center md:text-left\">
                    <div className=\"flex items-center justify-center md:justify-start gap-2 mb-4\">
                       {[...Array(5)].map((_, i) => (
                         <Star key={i} className=\"w-4 h-4 fill-primary text-primary animate-pulse\" style={{ animationDelay: `${i * 0.1}s` }} />
                       ))}
                    </div>
                    
                    <h2 className=\"text-xl md:text-3xl font-bold text-foreground mb-4 leading-relaxed\">
                      \"{testimonials[activeIndex].content}\"
                    </h2>
                    
                    <div>
                      <h3 className=\"text-lg font-black text-primary uppercase tracking-wider\">{testimonials[activeIndex].name}</h3>
                      <p className=\"text-xs text-muted-foreground font-bold uppercase tracking-[0.2em] mt-1\">{testimonials[activeIndex].role}</p>
                    </div>
                  </div>

                  {/* Indicator Dots */}
                  <div className=\"absolute bottom-8 left-1/2 md:left-auto md:right-12 -translate-x-1/2 md:translate-x-0 flex gap-2\">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        className={`h-1.5 rounded-full transition-all duration-500 ${i === activeIndex ? \"w-8 bg-primary\" : \"w-2 bg-white/20\"}`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Header Section */}
        <div className=\"max-w-4xl mx-auto text-center mb-24\">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className=\"flex items-center justify-center gap-3 mb-6\"
          >
            <div className=\"h-[1px] w-12 bg-primary/40\" />
            <span className=\"eyebrow text-primary text-sm\">Testimoni Nasional</span>
            <div className=\"h-[1px] w-12 bg-primary/40\" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className=\"text-5xl md:text-7xl font-black mb-8 tracking-tight leading-tight\"
          >
            Suara Para <span className=\"text-gradient\">Pemimpin Bangsa</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className=\"text-xl text-muted-foreground leading-relaxed\"
          >
            Dari meja menteri hingga pelosok daerah, KUBOYAKO diakui sebagai pilar utama transformasi digital Indonesia. 
            Era baru keamanan dan transparansi telah tiba—saatnya bergerak sekarang juga.
          </motion.p>
        </div>

        {/* Hero Badge Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className=\"max-w-5xl mx-auto mb-24 grid grid-cols-2 md:grid-cols-4 gap-6\"
        >
          <div className=\"surface-elevated rounded-3xl p-6 text-center border border-white/5\">
            <ShieldCheck className=\"w-8 h-8 text-primary mx-auto mb-3\" />
            <div className=\"text-2xl font-bold\">100%</div>
            <div className=\"text-[10px] text-muted-foreground uppercase tracking-widest font-bold\">Aman & Terenkripsi</div>
          </div>
          <div className=\"surface-elevated rounded-3xl p-6 text-center border border-white/5\">
            <Zap className=\"w-8 h-8 text-orange-400 mx-auto mb-3\" />
            <div className=\"text-2xl font-bold\">Ultra</div>
            <div className=\"text-[10px] text-muted-foreground uppercase tracking-widest font-bold\">Respon Real-time</div>
          </div>
          <div className=\"surface-elevated rounded-3xl p-6 text-center border border-white/5\">
            <Globe className=\"w-8 h-8 text-blue-400 mx-auto mb-3\" />
            <div className=\"text-2xl font-bold\">Nasional</div>
            <div className=\"text-[10px] text-muted-foreground uppercase tracking-widest font-bold\">Cakupan Seluruh RI</div>
          </div>
          <div className=\"surface-elevated rounded-3xl p-6 text-center border border-white/5\">
            <Rocket className=\"w-8 h-8 text-emerald-400 mx-auto mb-3\" />
            <div className=\"text-2xl font-bold\">Segera</div>
            <div className=\"text-[10px] text-muted-foreground uppercase tracking-widest font-bold\">Wajib Launching</div>
          </div>
        </motion.div>

        {/* Testimonials Grid */}
        <div className=\"columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8\">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className=\"break-inside-avoid\"
            >
              <div className=\"surface p-8 rounded-[2.5rem] relative group hover:border-primary/40 transition-all border border-white/5 shadow-2xl\">
                <div className=\"absolute -top-4 -right-4 w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary backdrop-blur-xl border border-primary/20 shadow-glow rotate-12 group-hover:rotate-0 transition-transform\">
                  <Quote className=\"w-6 h-6 fill-primary\" />
                </div>
                
                <div className=\"flex items-center gap-4 mb-8\">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${t.accent} flex items-center justify-center text-xl font-black text-white shadow-lg`}>
                    {t.avatar}
                  </div>
                  <div>
                    <h3 className=\"font-bold text-base leading-tight\">{t.name}</h3>
                    <p className=\"text-[10px] text-primary font-black uppercase tracking-widest mt-1\">{t.role}</p>
                  </div>
                </div>

                <div className=\"relative\">
                  <p className=\"text-base leading-relaxed text-foreground/90 italic\">
                    \"{t.content}\"
                  </p>
                </div>

                <div className=\"mt-8 flex items-center justify-between\">
                  <div className=\"flex gap-1\">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className=\"w-3 h-3 fill-primary text-primary\" />
                    ))}
                  </div>
                  <div className=\"text-[9px] font-bold text-muted-foreground uppercase tracking-widest\">Diverifikasi Pemerintah</div>
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
          className=\"mt-32 max-w-5xl mx-auto surface-elevated rounded-[3rem] p-12 text-center border border-primary/20 relative overflow-hidden group shadow-[0_0_100px_rgba(249,115,22,0.15)]\"
        >
          <div className=\"absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2\" />
          
          <h2 className=\"text-4xl md:text-5xl font-black mb-6 tracking-tight\">
            Waktu Tidak Bisa <span className=\"text-gradient\">Menunggu Lagi.</span>
          </h2>
          <p className=\"text-lg text-muted-foreground mb-12 max-w-2xl mx-auto\">
            Setiap detik KUBOYAKO ditunda, kita kehilangan kesempatan untuk mengamankan aset bangsa. 
            Bersama kita jemput masa depan sekarang juga.
          </p>
          
          <div className=\"flex flex-col sm:flex-row gap-4 justify-center items-center\">
            <Link to=\"/presentasi\" className=\"h-16 px-10 rounded-2xl gradient-primary text-primary-foreground font-black text-sm flex items-center gap-3 shadow-glow hover:scale-105 transition-transform\">
              LIHAT PRESENTASI PENUH <ArrowRight className=\"w-5 h-5\" />
            </Link>
            <Link to=\"/\" className=\"h-16 px-10 rounded-2xl surface-glass border border-white/10 text-foreground font-bold text-sm flex items-center gap-3 hover:bg-white/5 transition-colors\">
              KEMBALI KE BERANDA
            </Link>
          </div>
          
          <div className=\"mt-12 flex items-center justify-center gap-8 opacity-40 grayscale group-hover:grayscale-0 transition-all\">
             <Users className=\"w-8 h-8\" />
             <div className=\"text-xs font-bold uppercase tracking-[0.3em]\">Didukung Oleh Seluruh Jajaran Aparatur Negara</div>
          </div>
        </motion.div>
      </div>

      {/* Footer Branding */}
      <footer className=\"py-12 text-center\">
         <p className=\"text-[10px] text-muted-foreground uppercase tracking-[0.5em] font-bold\">
           KUBOYAKO 2030 — ULTIMATE EDITION
         </p>
      </footer>
    </div>
  );
}
