import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { getEvidenceData, EvidenceItem } from "@/lib/store";
import { PageHeader } from "@/components/layout/page-header";
import { icons3d } from "@/assets/icons";
import { LiveText } from "@/components/ui/live-text";

const filters = [
  { id: "semua", label: "Semua", icon: null },
  { id: "mobil", label: "Mobil", icon: icons3d.car },
  { id: "motor", label: "Motor", icon: icons3d.motor },
  { id: "hp", label: "HP", icon: icons3d.phone },
] as const;

export default function AdminRiwayat() {
  const [data, setData] = useState<EvidenceItem[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("semua");

  useEffect(() => {
    setData(getEvidenceData().sort((a, b) => b.createdAt - a.createdAt));
  }, []);

  const filtered = data.filter((item) => {
    if (filter !== "semua" && item.type !== filter) return false;
    if (!search) return true;
    
    const q = search.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (!q) return true;

    if (item.type === "hp") {
      const imei1 = item.imei1.replace(/[^0-9]/g, "");
      const imei2 = item.imei2?.replace(/[^0-9]/g, "") || "";
      const merk = item.merk.toLowerCase().replace(/[^a-z0-9]/g, "");
      const lp = item.noLp.toLowerCase().replace(/[^a-z0-9]/g, "");
      
      return imei1.includes(q) || imei2.includes(q) || merk.includes(q) || lp.includes(q);
    }

    const nopol = (item as any).noPolisi?.toLowerCase().replace(/[^a-z0-9]/g, "") || "";
    const rangka = (item as any).noRangka?.toLowerCase().replace(/[^a-z0-9]/g, "") || "";
    const mesin = (item as any).noMesin?.toLowerCase().replace(/[^a-z0-9]/g, "") || "";
    const merk = item.merk.toLowerCase().replace(/[^a-z0-9]/g, "");
    const lp = item.noLp.toLowerCase().replace(/[^a-z0-9]/g, "");

    return nopol.includes(q) || rangka.includes(q) || mesin.includes(q) || merk.includes(q) || lp.includes(q);
  });

  return (
    <div className="flex flex-col min-h-full pb-10">
      <PageHeader
        eyebrow={`${data.length} Arsip Tersimpan`}
        title="Riwayat Arsip"
        subtitle="Cari dan telusuri seluruh arsip barang bukti."
        back="/admin"
      />

      {/* Search */}
      <div className="px-6 mb-4 relative z-10">
        <div className="surface rounded-2xl flex items-center px-4 h-12 focus-within:ring-2 focus-within:ring-primary/40 transition-all">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Plat, IMEI, atau No. LP…"
            className="flex-1 h-12 bg-transparent outline-none px-3 text-sm font-medium text-foreground placeholder:text-muted-foreground/50"
          />
        </div>
      </div>

      {/* Filter chips */}
      <div className="px-6 flex gap-2 overflow-x-auto scrollbar-hide pb-1 mb-4 relative z-10">
        {filters.map((f) => {
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`shrink-0 h-11 px-4 rounded-full flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-all border ${
                active
                  ? "gradient-primary text-primary-foreground border-transparent shadow-soft"
                  : "surface text-muted-foreground hover:text-foreground border-white/5"
              }`}
            >
              {f.icon && <img src={f.icon} alt="" className="w-5 h-5 object-contain" />}
              {f.label}
            </button>
          );
        })}
      </div>

      {/* List */}
      <div className="px-6 flex-1 space-y-3 relative z-10">
        {filtered.length > 0 ? (
          filtered.map((item, idx) => {
            const iconSrc =
              item.type === "hp" ? icons3d.phone : item.type === "mobil" ? icons3d.car : icons3d.motor;
            const primary =
              item.type === "hp" ? item.imei1 : (item as any).noPolisi;
            const sub =
              item.merk +
              " " +
              ((item as any).tipe || (item as any).jenis || (item as any).model || "") +
              " · " +
              item.warna;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
              >
                <Link to={`/admin/detail/${item.id}`}>
                  <div className="surface-elevated rounded-2xl p-4 flex items-center gap-4 group cursor-pointer hover:border-primary/30 transition-colors">
                    <img
                      src={iconSrc}
                      alt={item.type}
                      className="w-14 h-14 object-contain shrink-0 drop-shadow-[0_8px_14px_rgba(0,0,0,0.5)]"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-foreground text-base tracking-tight uppercase truncate group-hover:text-primary transition-colors">
                        {primary}
                      </h3>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">{sub}</p>
                      <p className="text-[10px] text-muted-foreground/70 truncate mt-1.5 font-medium">
                        {item.noLp}
                      </p>
                    </div>
                    <span className="w-9 h-9 rounded-full surface-glass flex items-center justify-center text-foreground/60 group-hover:text-primary transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })
        ) : (
          <div className="surface rounded-3xl border-dashed border border-white/10 p-12 text-center mt-4">
            <Filter className="w-10 h-10 text-muted-foreground/60 mx-auto mb-4" />
            <h3 className="display-font text-base text-foreground"><LiveText as="span" id="admin-riwayat-empty-title" defaultText="Arsip tidak ditemukan" /></h3>
            <p className="text-xs text-muted-foreground mt-1">
              <LiveText as="span" id="admin-riwayat-empty-desc" defaultText="Coba kata kunci atau filter berbeda." />
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
