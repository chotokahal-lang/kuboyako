import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, ChevronRight, Trash2, Download, Edit2, Save, X } from "lucide-react";
import { motion } from "framer-motion";
import { getEvidenceData, EvidenceItem, deleteEvidenceItem, addLog } from "@/lib/store";
import { exportToCsv } from "@/lib/export";
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
  const [editingItem, setEditingItem] = useState<EvidenceItem | null>(null);

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

  const handleDelete = (id: string, noLp: string) => {
    if (confirm(`Hapus data barang bukti LP: ${noLp}?`)) {
      deleteEvidenceItem(id);
      setData(data.filter(it => it.id !== id));
      
      const adminNrp = localStorage.getItem("kuboyako_user_nrp") || "admin";
      addLog(adminNrp, "admin", "DELETE_EVIDENCE", `Menghapus data BB: ${noLp}`);
    }
  };

  const handleExport = () => {
    const dataToExport = filtered.map(it => ({
      ID: it.id,
      Tipe: it.type,
      No_LP: it.noLp,
      Tgl_LP: it.tglLp,
      Pelapor: it.pelapor,
      TKP: it.lokasiTkp,
      Satker: it.satker,
      Asal_LP: it.asalLp,
      ...(it.type === 'hp' 
        ? { Merk: it.merk, Model: (it as any).model, IMEI: (it as any).imei1 }
        : { No_Pol: (it as any).noPolisi, Merk: (it as any).merk, No_Mesin: (it as any).noMesin })
    }));
    exportToCsv(`Daftar_BB_${new Date().toISOString().split('T')[0]}.csv`, dataToExport);
  };

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingItem) return;
    
    const formData = new FormData(e.currentTarget);
    const updatedItem = {
      ...editingItem,
      noLp: formData.get("noLp") as string,
      pelapor: formData.get("pelapor") as string,
      lokasiTkp: formData.get("lokasiTkp") as string,
      asalLp: formData.get("asalLp") as string,
      merk: formData.get("merk") as string,
      warna: formData.get("warna") as string,
      ...(editingItem.type === "hp" 
        ? { imei1: formData.get("imei1") as string }
        : { noPolisi: formData.get("noPolisi") as string })
    } as EvidenceItem;

    updateEvidenceItem(updatedItem);
    setData(data.map(it => it.id === updatedItem.id ? updatedItem : it));
    
    const adminNrp = localStorage.getItem("kuboyako_user_nrp") || "admin";
    addLog(adminNrp, "admin", "UPDATE_EVIDENCE", `Mengubah data BB: ${updatedItem.noLp}`);
    
    setEditingItem(null);
  };

  return (
    <div className="flex flex-col min-h-full pb-10">
      <PageHeader
        eyebrow={`${data.length} Arsip Tersimpan`}
        title="Riwayat Arsip"
        subtitle="Cari dan telusuri seluruh arsip barang bukti."
        back="/admin"
        right={
          <button
            onClick={handleExport}
            className="w-11 h-11 surface-glass rounded-2xl flex items-center justify-center text-primary"
          >
            <Download className="w-5 h-5" />
          </button>
        }
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
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="font-bold text-foreground text-base tracking-tight uppercase truncate group-hover:text-primary transition-colors">
                          {primary}
                        </h3>
                        <span className="text-[8px] font-black px-1.5 py-0.5 rounded-md bg-accent/20 text-accent uppercase tracking-tighter shrink-0">
                          Aktif
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground truncate">{sub}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="px-2 py-0.5 rounded-md surface-glass border border-white/5 text-[9px] font-bold text-muted-foreground uppercase truncate max-w-[120px]">
                          {item.asalLp || "Resmob Polda"}
                        </div>
                        <p className="text-[9px] text-muted-foreground/60 font-mono">
                          {new Date(item.createdAt).toLocaleDateString("id-ID")}
                        </p>
                      </div>
                    </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setEditingItem(item);
                          }}
                          className="w-9 h-9 rounded-xl surface-glass flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleDelete(item.id, item.noLp);
                          }}
                          className="w-9 h-9 rounded-xl surface-glass flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <span className="w-9 h-9 rounded-full surface-glass flex items-center justify-center text-foreground/60 group-hover:text-primary transition-colors">
                          <ChevronRight className="w-4 h-4" />
                        </span>
                      </div>
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

      <AnimatePresence>
        {editingItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-xl flex items-end sm:items-center justify-center p-4"
          >
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              className="w-full max-w-md surface-elevated rounded-3xl p-6 shadow-2xl relative"
            >
              <button
                onClick={() => setEditingItem(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full surface-glass flex items-center justify-center text-muted-foreground"
              >
                <X className="w-4 h-4" />
              </button>

              <h2 className="display-font text-xl text-foreground mb-6">Edit Data Barang Bukti</h2>
              
              <form onSubmit={handleUpdate} className="space-y-4 max-h-[70vh] overflow-y-auto px-1 pb-4 scrollbar-hide">
                <EditField label="Nomor LP" name="noLp" defaultValue={editingItem.noLp} />
                <EditField label="Pelapor" name="pelapor" defaultValue={editingItem.pelapor} />
                <EditField label="Lokasi TKP" name="lokasiTkp" defaultValue={editingItem.lokasiTkp} />
                <EditField label="Asal LP (Kesatuan)" name="asalLp" defaultValue={editingItem.asalLp} />
                
                <div className="grid grid-cols-2 gap-3">
                  <EditField 
                    label={editingItem.type === "hp" ? "IMEI" : "No. Polisi"} 
                    name={editingItem.type === "hp" ? "imei1" : "noPolisi"} 
                    defaultValue={editingItem.type === "hp" ? editingItem.imei1 : (editingItem as any).noPolisi} 
                  />
                  <EditField label="Merk" name="merk" defaultValue={editingItem.merk} />
                </div>
                
                <EditField label="Warna" name="warna" defaultValue={editingItem.warna} />

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full h-12 rounded-xl gradient-primary text-primary-foreground font-bold flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Perbarui Data
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function EditField({ label, name, defaultValue }: { label: string, name: string, defaultValue: string }) {
  return (
    <div>
      <label className="eyebrow ml-1">{label}</label>
      <input
        name={name}
        defaultValue={defaultValue}
        required
        className="mt-1.5 w-full h-11 px-4 surface rounded-xl bg-transparent outline-none text-sm font-medium text-foreground focus:ring-2 focus:ring-primary/40 transition-all"
      />
    </div>
  );
}
