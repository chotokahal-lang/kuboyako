import { useState, useEffect } from "react";
import { Plus, User, Shield, Briefcase, Key, Save, Trash2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getUserAccounts, saveUserAccount, UserAccount, addLog, deleteUserAccount } from "@/lib/store";
import { PageHeader } from "@/components/layout/page-header";
import { Icon3D } from "@/components/ui/icon-3d";
import { icons3d } from "@/assets/icons";
import { LiveText } from "@/components/ui/live-text";
import { useToast } from "@/hooks/use-toast";

export default function AdminAccounts() {
  const [accounts, setAccounts] = useState<UserAccount[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    nrp: "",
    name: "",
    unit: "",
    password: "",
    role: "polri" as const
  });

  useEffect(() => {
    setAccounts(getUserAccounts());
  }, []);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newAccount: UserAccount = {
      id: Math.random().toString(36).slice(2, 11),
      ...formData,
      createdAt: Date.now()
    };
    
    saveUserAccount(newAccount);
    setAccounts([...accounts, newAccount]);
    setShowAdd(false);
    
    const adminNrp = localStorage.getItem("kuboyako_user_nrp") || "admin";
    addLog(adminNrp, "admin", "CREATE_ACCOUNT", `Membuat akun Polri: ${formData.nrp} (${formData.name})`);
    
    toast({
      title: "Akun Berhasil Dibuat",
      description: `Akun untuk ${formData.name} telah aktif.`
    });
    
    setFormData({ nrp: "", name: "", unit: "", password: "", role: "polri" });
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Hapus akun ${name}?`)) {
      deleteUserAccount(id);
      setAccounts(accounts.filter(a => a.id !== id));
      
      const adminNrp = localStorage.getItem("kuboyako_user_nrp") || "admin";
      addLog(adminNrp, "admin", "DELETE_ACCOUNT", `Menghapus akun Polri: ${name}`);
      
      toast({
        title: "Akun Dihapus",
        description: `Akun ${name} telah dihapus dari sistem.`
      });
    }
  };

  return (
    <div className="flex flex-col min-h-full pb-10">
      <PageHeader
        eyebrow={<LiveText as="span" id="accounts-eyebrow" defaultText="Personel" />}
        title={<LiveText as="span" id="accounts-title" defaultText="Manajemen Akun" />}
        subtitle={<LiveText as="span" id="accounts-subtitle" defaultText="Kelola hak akses Anggota Polri dan Operator sistem." />}
        back="/admin"
      />

      <div className="px-6 mb-6">
        <button
          onClick={() => setShowAdd(true)}
          className="w-full h-14 rounded-2xl gradient-primary text-primary-foreground font-bold flex items-center justify-center gap-3 shadow-glow"
        >
          <Plus className="w-5 h-5" />
          <span>Buat Akun Baru</span>
        </button>
      </div>

      <div className="px-6 space-y-4">
        <div className="flex justify-between items-center px-1">
          <h2 className="eyebrow">Daftar Personel Terdaftar</h2>
          <span className="text-[10px] text-muted-foreground/60">{accounts.length} Akun</span>
        </div>

        {accounts.map((acc, i) => (
          <motion.div
            key={acc.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="surface-elevated rounded-2xl p-4 flex items-center gap-4 border border-white/5"
          >
            <div className="w-12 h-12 rounded-2xl surface-glass flex items-center justify-center text-primary shrink-0">
              {acc.role === "admin" ? <Shield className="w-6 h-6" /> : <User className="w-6 h-6" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-foreground truncate uppercase">{acc.name}</h3>
                <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-tighter ${acc.role === "admin" ? "bg-primary/20 text-primary" : "bg-accent/20 text-accent"}`}>
                  {acc.role}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">{acc.nrp} · {acc.unit}</p>
            </div>
            {acc.nrp !== "admin" && (
              <button
                onClick={() => handleDelete(acc.id, acc.name)}
                className="w-9 h-9 rounded-xl surface-glass flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showAdd && (
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
                onClick={() => setShowAdd(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full surface-glass flex items-center justify-center text-muted-foreground"
              >
                <X className="w-4 h-4" />
              </button>

              <h2 className="display-font text-xl text-foreground mb-6">Tambah Akun Polri</h2>
              
              <form onSubmit={handleAdd} className="space-y-4">
                <Field icon={<User className="w-4 h-4" />} label="NRP / Username" value={formData.nrp} onChange={v => setFormData({...formData, nrp: v})} placeholder="7104XXXX" />
                <Field icon={<User className="w-4 h-4" />} label="Nama Lengkap" value={formData.name} onChange={v => setFormData({...formData, name: v})} placeholder="Nama Sesuai KTP/KTA" />
                <Field icon={<Briefcase className="w-4 h-4" />} label="Kesatuan / Unit" value={formData.unit} onChange={v => setFormData({...formData, unit: v})} placeholder="RESMOB POLDA SULSEL" />
                <Field icon={<Key className="w-4 h-4" />} label="Password" value={formData.password} onChange={v => setFormData({...formData, password: v})} type="password" placeholder="••••••••" />
                
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full h-12 rounded-xl gradient-primary text-primary-foreground font-bold flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Simpan Akun
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

function Field({ icon, label, value, onChange, placeholder, type = "text" }: { icon: any, label: string, value: string, onChange: (v: string) => void, placeholder: string, type?: string }) {
  return (
    <div>
      <label className="eyebrow ml-1">{label}</label>
      <div className="mt-1.5 relative surface rounded-xl focus-within:ring-2 focus-within:ring-primary/40 transition-all">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</span>
        <input
          type={type}
          required
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full h-11 pl-10 pr-4 bg-transparent outline-none text-sm font-medium text-foreground"
        />
      </div>
    </div>
  );
}
