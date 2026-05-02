import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  FileText,
  MapPin,
  Calendar,
  Loader2,
  ArrowLeft,
  Phone,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { searchEvidence, EvidenceItem, addLog } from "@/lib/store";
import { Icon3D } from "@/components/ui/icon-3d";
import { icons3d } from "@/assets/icons";
import { LiveText } from "@/components/ui/live-text";

export default function UserHasil() {
  const { type, query } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState<EvidenceItem | null>(null);
  const [loading, setLoading] = useState(true);

  const role = localStorage.getItem("kuboyako_role") || "umum";
  const isUmum = role === "umum";

  useEffect(() => {
    const timer = setTimeout(() => {
      const decoded = decodeURIComponent(query || "");
      const found = searchEvidence(type as any, decoded) || null;
      setResult(found);
      setLoading(false);

      const userNrp = localStorage.getItem("kuboyako_user_nrp") || "guest";
      const userRole = localStorage.getItem("kuboyako_role") || "umum";
      addLog(userNrp, userRole, "SEARCH", `Mencari ${type}: ${decoded} (${found ? "Ditemukan" : "Tidak Ditemukan"})`);
    }, 1600);
    return () => clearTimeout(timer);
  }, [type, query]);

  const decoded = decodeURIComponent(query || "");
  const isSafe = !result;

  if (loading) {
    return (
      <div className="flex flex-col min-h-full items-center justify-center px-8 text-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-primary/25 blur-[60px] rounded-full animate-pulse" />
          <div className="w-24 h-24 surface-elevated rounded-3xl flex items-center justify-center relative">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
        </div>
        <h2 className="display-font text-2xl text-foreground mb-2"><LiveText as="span" id="hasil-loading-title" defaultText="Memverifikasi…" /></h2>
        <p className="text-xs text-muted-foreground max-w-[28ch] leading-relaxed">
          <LiveText as="span" id="hasil-loading-desc" defaultText="Menghubungkan ke pusat data RESMOB POLDA SULSEL." />
        </p>
        <div className="mt-10 w-48 h-1.5 surface rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
            className="h-full gradient-primary rounded-full"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full pb-10 relative overflow-hidden">
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 w-[140%] h-[40%] blur-[120px] rounded-full opacity-30 pointer-events-none ${
          isSafe ? "bg-emerald-500" : "bg-destructive"
        }`}
      />

      <header
        className="px-6 pb-4 relative z-10 flex items-center justify-between"
        style={{ paddingTop: "max(3rem, calc(env(safe-area-inset-top, 0px) + 1rem))" }}
      >
        <Link to={`/user/cek/${type}`} aria-label="Kembali">
          <span className="w-11 h-11 surface-glass rounded-2xl flex items-center justify-center text-foreground/80">
            <ArrowLeft className="w-5 h-5" />
          </span>
        </Link>
        <div className="text-center">
          <p className="eyebrow text-muted-foreground"><LiveText as="span" id="hasil-header-label" defaultText="Hasil Verifikasi" /></p>
          <p
            className={`text-xs font-bold uppercase tracking-[0.3em] mt-0.5 ${
              isSafe ? "text-emerald-500" : "text-destructive"
            }`}
          >
            {isSafe ? <LiveText as="span" id="hasil-status-safe" defaultText="Status Aman" /> : <LiveText as="span" id="hasil-status-danger" defaultText="Terdeteksi BB" />}
          </p>
        </div>
        <span className="w-11 h-11" />
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10 gap-4">
        <AnimatePresence mode="wait">
          {isSafe ? (
            /* ── STATUS AMAN ─────────────────────────────── */
            <motion.div
              key="safe"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-sm surface-elevated rounded-3xl p-8 text-center"
            >
              <div className="relative mx-auto mb-8 w-24 h-24">
                <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full" />
                <div className="w-24 h-24 rounded-3xl border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center relative">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                </div>
              </div>
              <h1 className="display-font text-3xl text-foreground mb-1"><LiveText as="span" id="hasil-safe-title" defaultText="Status Aman" /></h1>
              <p className="eyebrow text-emerald-500/80 mb-6"><LiveText as="span" id="hasil-safe-desc" defaultText="Tidak ditemukan dalam arsip barang bukti" /></p>

              <div className="surface rounded-2xl p-4 mb-6">
                <p className="eyebrow mb-2">Data yang Diperiksa</p>
                <p className="text-base font-bold text-foreground tracking-wider uppercase break-all">
                  {decoded}
                </p>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                Unit ini <b className="text-foreground">tidak tercatat</b> sebagai barang bukti
                tindak pidana dalam sistem RESMOB POLDA SULSEL.
              </p>
            </motion.div>
          ) : (
            /* ── TERDETEKSI BARANG BUKTI ─────────────────── */
            <motion.div
              key="danger"
              initial={{ scale: 1.05, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-sm surface-elevated rounded-3xl overflow-hidden"
            >
              {/* Header merah */}
              <div className="bg-destructive/10 p-8 text-center border-b border-white/5 relative">
                <div className="absolute inset-0 bg-destructive/5 blur-3xl pointer-events-none" />
                <div className="w-20 h-20 rounded-3xl border border-destructive/30 bg-destructive/15 flex items-center justify-center mx-auto mb-5 relative animate-pulse-glow">
                  <AlertTriangle className="w-10 h-10 text-destructive" />
                </div>
                <h1 className="display-font text-2xl text-foreground"><LiveText as="span" id="hasil-danger-title" defaultText="Terdeteksi!" /></h1>
                <p className="eyebrow text-destructive mt-1"><LiveText as="span" id="hasil-danger-subtitle" defaultText="Tercatat sebagai Barang Bukti" /></p>
              </div>

              {/* Identitas unit */}
              <div className="p-6 space-y-5">
                <div className="surface rounded-2xl p-4 flex items-center gap-4">
                  <Icon3D
                    src={
                      result!.type === "hp"
                        ? icons3d.phone
                        : result!.type === "mobil"
                        ? icons3d.car
                        : icons3d.motor
                    }
                    alt={result!.type}
                    size="md"
                    tone="primary"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="eyebrow text-destructive/80 mb-1"><LiveText as="span" id="hasil-unit-label" defaultText="Identitas Unit" /></p>
                    <p className="text-base font-bold text-foreground tracking-tight uppercase truncate">
                      {result!.type === "hp" ? result!.imei1 : (result as any).noPolisi}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {result!.merk}{" "}
                      {(result as any).tipe || (result as any).jenis || (result as any).model}
                    </p>
                    {result!.type !== "hp" && (
                      <div className="mt-2 pt-2 border-t border-white/5 flex flex-col gap-1">
                        <p className="text-[10px] text-muted-foreground">
                          No. Mesin: <span className="text-foreground font-mono">{(result as any).noMesin}</span>
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          No. Rangka: <span className="text-foreground font-mono">{(result as any).noRangka}</span>
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Detail LP — hanya untuk Polri & Admin */}
                {!isUmum && (
                  <div className="space-y-3">
                    {[
                      { icon: <FileText className="w-4 h-4" />, label: "Nomor LP", val: result!.noLp },
                      { icon: <FileText className="w-4 h-4" />, label: "Satuan Penerbit", val: result!.satker },
                      {
                        icon: <Calendar className="w-4 h-4" />,
                        label: "Tanggal Laporan",
                        val: new Date(result!.tglLp).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }),
                      },
                      { icon: <MapPin className="w-4 h-4" />, label: "Lokasi TKP", val: result!.lokasiTkp },
                      { icon: <ShieldAlert className="w-4 h-4" />, label: "Asal LP (Kesatuan)", val: result!.asalLp },
                    ].map((it, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="w-9 h-9 rounded-xl surface-glass flex items-center justify-center text-foreground/70 shrink-0">
                          {it.icon}
                        </span>
                        <div className="flex-1 min-w-0 border-b border-white/5 pb-3">
                          <p className="eyebrow mb-0.5">{it.label}</p>
                          <p className="text-sm font-medium text-foreground uppercase truncate">
                            {it.val}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tombol Lapor — khusus Umum */}
                {isUmum && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-2"
                  >
                    <p className="eyebrow text-center text-[10px] text-muted-foreground/70 mb-1">
                      Jangan dibeli atau digunakan!
                    </p>
                    <button
                      onClick={() => navigate("/user/lapor")}
                      className="w-full h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-500 font-bold flex items-center justify-center gap-2 text-sm"
                    >
                      <Phone className="w-4 h-4" />
                      Laporkan ke Kepolisian
                    </button>
                  </motion.div>
                )}
              </div>

              {/* Footer peringatan */}
              <div className="bg-destructive/10 p-5 flex gap-3 border-t border-white/5">
                <span className="w-10 h-10 rounded-xl bg-destructive/20 border border-destructive/30 flex items-center justify-center shrink-0">
                  <ShieldAlert className="w-5 h-5 text-destructive" />
                </span>
                <p className="text-xs text-destructive/90 leading-relaxed font-medium">
                  {isUmum
                    ? <LiveText as="span" id="hasil-footer-warn-umum" defaultText="Segera hubungi RESMOB POLDA SULSEL atau Polsek terdekat. Jangan membeli, menjual, atau menggunakan unit ini." />
                    : <LiveText as="span" id="hasil-footer-warn-polri" defaultText="Unit ini terdaftar sebagai barang bukti. Tindak lanjuti sesuai prosedur RESMOB POLDA SULSEL." />}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <footer className="px-6 pt-6 text-center relative z-10">
        <p className="eyebrow text-muted-foreground/50">
          <LiveText as="span" id="hasil-footer" defaultText="Terverifikasi Digital · KUBOYAKO · RESMOB POLDA SULSEL" />
        </p>
      </footer>
    </div>
  );
}
