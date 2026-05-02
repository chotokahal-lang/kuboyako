import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Shield, BookOpen, Star, Building2, Layers } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Logo3DImg } from "@/components/ui/logo-3d-img";
import { LiveText } from "@/components/ui/live-text";

const FEATURES = [
  "Input Manual, Scan LP (OCR), Arsip Barang Bukti — khusus Admin",
  "Cek Kendaraan & HP + Akses Detail Asal LP — khusus Anggota Polri",
  "Cek Mandiri & Lapor Temuan — tersedia untuk Masyarakat Umum",
  "Terintegrasi sistem DORS Polda Sulsel",
  "Rencana integrasi E-MP Bareskrim Polri",
];

const HIERARCHY = [
  { label: "Lembaga", value: "POLRI" },
  { label: "Satuan", value: "POLDA SULAWESI SELATAN" },
  { label: "Direktorat", value: "DIREKTORAT KRIMINAL UMUM" },
  { label: "Subdit", value: "SUBDIT JATANRAS" },
  { label: "Unit", value: "UNIT V" },
];

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-full pb-10">
      <PageHeader
        eyebrow={<LiveText as="span" id="about-eyebrow" defaultText="Tentang" />}
        title={<LiveText as="span" id="about-title" defaultText="KUBOYAKO" />}
        subtitle={<LiveText as="span" id="about-subtitle" defaultText="" />}
        back="/profile"
      />

      <div className="px-6 space-y-5">
        {/* Logo & branding */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="surface-elevated rounded-3xl p-6 flex flex-col items-center text-center gap-3"
        >
          <Logo3DImg size="xl" intensity="high" float />
          <div>
            <h2 className="display-font text-2xl text-foreground"><LiveText as="span" id="about-brand" defaultText="KUBOYAKO" /></h2>
            <p className="eyebrow text-primary/80 mt-0.5"><LiveText as="span" id="about-version" defaultText="v2026.1 · RESMOB POLDA SULSEL" /></p>
            <p className="text-[10px] text-muted-foreground max-w-full mx-auto leading-relaxed mt-1">
              <LiveText as="span" id="about-unit" defaultText="UNIT V SUBDIT JATANRAS DIREKTORAT KRIMINAL UMUM POLDA SULSEL" />
            </p>
          </div>
          <div className="surface rounded-xl px-4 py-2.5 flex items-start gap-2.5 text-left w-full">
            <BookOpen className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <div>
              <p className="eyebrow text-accent text-[10px]">Asal Nama</p>
              <p className="text-[11px] text-muted-foreground leading-relaxed mt-0.5">
                Berasal dari bahasa Makassar —{" "}
                <b className="text-primary">BOYA</b> berarti <i>Cari</i>.{" "}
                <b className="text-foreground">KUBOYAKO</b> = Saya Carikan Untukmu.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Developer profile */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="surface rounded-2xl overflow-hidden"
        >
          <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2">
            <Star className="w-4 h-4 text-primary" />
            <p className="eyebrow text-[10px]">Pembuat Aplikasi</p>
          </div>
          <div className="px-4 py-4 flex items-center gap-3">
            <span className="w-12 h-12 rounded-2xl bg-primary/15 border border-primary/20 flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6 text-primary" />
            </span>
            <div>
              <p className="text-sm font-bold text-foreground"><LiveText as="span" id="about-dev-name" defaultText="IRZAL MAKKARAWA, S.H." /></p>
              <p className="text-xs text-muted-foreground mt-0.5"><LiveText as="span" id="about-dev-rank" defaultText="Panit Polda Sulsel" /></p>
              <p className="text-[10px] text-muted-foreground/70"><LiveText as="span" id="about-dev-unit" defaultText="Subdit Jatanras · Ditkrimum Polda Sulsel" /></p>
            </div>
          </div>
        </motion.div>

        {/* Institutional hierarchy */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="surface rounded-2xl overflow-hidden"
        >
          <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-accent" />
            <p className="eyebrow text-[10px]">Hierarki Institusi</p>
          </div>
          {HIERARCHY.map((h, i) => (
            <div key={h.label} className={`px-4 py-2.5 flex items-center justify-between ${i > 0 ? "border-t border-white/5" : ""}`}>
              <p className="eyebrow text-[9px] text-muted-foreground/70">{h.label}</p>
              <p className="text-[11px] font-bold text-foreground tracking-wide">
                <LiveText as="span" id={`about-hierarchy-val-${i}`} defaultText={h.value} />
              </p>
            </div>
          ))}
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="surface rounded-2xl overflow-hidden"
        >
          <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2">
            <Layers className="w-4 h-4 text-primary" />
            <p className="eyebrow text-[10px]">Fitur Aplikasi</p>
          </div>
          <div className="px-4 py-3 space-y-2">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i + 0.3 }}
                className="flex items-start gap-2"
              >
                <span className="w-1 h-1 rounded-full bg-primary shrink-0 mt-1.5" />
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  <LiveText as="span" id={`about-feature-${i}`} defaultText={f} />
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center py-2"
        >
          <p className="eyebrow text-muted-foreground/40 text-[9px]">
            <LiveText as="span" id="about-footer" defaultText="KUBOYAKO · RESMOB POLDA SULSEL · 2026 · Hak Cipta Dilindungi" />
          </p>
        </motion.div>
      </div>
    </div>
  );
}
