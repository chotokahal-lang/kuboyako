import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, ChevronRight, ShieldCheck, Bell } from "lucide-react";
import { getEvidenceData, EvidenceItem } from "@/lib/store";
import { Icon3D } from "@/components/ui/icon-3d";
import { icons3d } from "@/assets/icons";
import { Logo3DImg } from "@/components/ui/logo-3d-img";
import { getUnreadCount } from "./notifications";
import { LiveText } from "@/components/ui/live-text";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ mobil: 0, motor: 0, hp: 0 });
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    const data = getEvidenceData();
    setStats({
      mobil: data.filter((d) => d.type === "mobil").length,
      motor: data.filter((d) => d.type === "motor").length,
      hp: data.filter((d) => d.type === "hp").length,
    });
    setUnread(getUnreadCount("admin"));
  }, []);

  const chartData = [
    { name: 'Mobil', count: stats.mobil, color: '#3b82f6' },
    { name: 'Motor', count: stats.motor, color: '#60a5fa' },
    { name: 'HP', count: stats.hp, color: '#fbbf24' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setUnread(getUnreadCount("admin"));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("kuboyako_role");
    navigate("/role-select");
  };

  const stat = [
    { label: "Mobil", val: stats.mobil, icon: icons3d.car },
    { label: "Motor", val: stats.motor, icon: icons3d.motor },
    { label: "HP", val: stats.hp, icon: icons3d.phone },
  ];

  const actions = [
    { title: "Input Manual", desc: "Catat data barang bukti baru", href: "/admin/input", icon: icons3d.form },
    { title: "Scan Foto LP", desc: "Ekstraksi otomatis dari foto LP", href: "/admin/scan", icon: icons3d.scan },
    { title: "Manajemen Akun", desc: "Kelola akun Anggota Polri", href: "/admin/accounts", icon: icons3d.user },
    { title: "Log Aktivitas", desc: "Riwayat penggunaan sistem", href: "/admin/logs", icon: icons3d.archive },
    { title: "Status Penginputan", desc: "Riwayat & arsip data BB", href: "/admin/riwayat", icon: icons3d.archive },
  ];

  return (
    <div className="flex flex-col min-h-full pb-10">
      {/* Hero header */}
      <header
        className="px-6 pb-8 relative z-10"
        style={{ paddingTop: "max(3rem, calc(env(safe-area-inset-top, 0px) + 1.25rem))" }}
      >
        <div className="flex items-center justify-between mb-6">
          <Link to="/profile" className="block">
            <Logo3DImg size="sm" intensity="low" />
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/notifications" className="relative w-11 h-11 surface-glass rounded-2xl flex items-center justify-center text-foreground/70 hover:text-primary transition-colors">
              <Bell className="w-5 h-5" />
              {unread > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-[9px] font-bold text-white flex items-center justify-center shadow-lg animate-pulse">
                  {unread > 99 ? "99+" : unread}
                </span>
              )}
            </Link>
            <button
              onClick={handleLogout}
              aria-label="Keluar"
              className="w-11 h-11 surface-glass rounded-2xl flex items-center justify-center text-foreground/70 hover:text-primary transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4"
        >
          <Icon3D src={icons3d.shield} alt="Admin" size="lg" tone="primary" />
          <div className="min-w-0">
            <p className="eyebrow flex items-center gap-2 text-primary/80 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <LiveText as="span" id="admin-role-label" defaultText="Operator" />
            </p>
            <h1 className="display-font text-2xl text-foreground leading-tight truncate">
              <LiveText as="span" id="admin-name" defaultText="IRZAL MAKKARAWA, S.H." />
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              <LiveText as="span" id="admin-unit" defaultText="RESMOB POLDA SULSEL" />
            </p>
            <p className="text-[9px] text-primary/60 mt-1 uppercase tracking-widest font-bold">
              <LiveText as="span" id="admin-integration" defaultText="Terintegrasi SI SDM POLRI" />
            </p>
          </div>
        </motion.div>
      </header>

      {/* Stats cards with 3D icons */}
      <section className="px-6 grid grid-cols-3 gap-3 mb-8 relative z-10">
        {stat.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i + 0.2 }}
            className="surface-elevated rounded-2xl p-4 flex flex-col items-center text-center"
          >
            <Icon3D src={s.icon} alt={s.label} size="md" glow={false} tone="neutral" />
            <span className="display-font text-2xl mt-3 text-foreground">{s.val}</span>
            <span className="eyebrow mt-1"><LiveText as="span" id={`stat-label-${s.label.toLowerCase()}`} defaultText={s.label} /></span>
          </motion.div>
        ))}
      </section>

      {/* Visual Analytics */}
      <section className="px-6 mb-8 relative z-10">
        <div className="flex justify-between items-center mb-4 px-1">
          <h2 className="eyebrow"><LiveText as="span" id="admin-section-stats" defaultText="Analitik Tren BB" /></h2>
          <span className="text-[10px] text-muted-foreground/60">Live Data</span>
        </div>
        
        <div className="surface-elevated rounded-3xl p-5 h-64 shadow-soft border border-white/5">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 600 }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }}
              />
              <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{ 
                  backgroundColor: 'rgba(20,20,20,0.8)', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  backdropFilter: 'blur(10px)',
                  fontSize: '11px'
                }}
              />
              <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={40}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
      <section className="px-6 flex flex-col gap-4 relative z-10">
        <div className="flex justify-between items-center mb-1 px-1">
          <h2 className="eyebrow"><LiveText as="span" id="admin-section-ops" defaultText="Manajemen Operasional" /></h2>
          <span className="text-[10px] text-muted-foreground/60"><LiveText as="span" id="admin-module-count" defaultText="5 Modul" /></span>
        </div>

        {actions.map((a, i) => (
          <motion.div
            key={a.href}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 * i + 0.3 }}
          >
            <Link to={a.href}>
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="surface-elevated rounded-2xl p-4 flex items-center gap-4 group cursor-pointer"
              >
                <Icon3D src={a.icon} alt={a.title} size="md" tone={i === 1 ? "accent" : "primary"} />
                <div className="flex-1 min-w-0">
                  <h3 className="display-font text-base text-foreground leading-tight">
                    <LiveText as="span" id={`action-title-${i}`} defaultText={a.title} />
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">
                    <LiveText as="span" id={`action-desc-${i}`} defaultText={a.desc} />
                  </p>
                </div>
                <span className="w-9 h-9 rounded-full surface-glass flex items-center justify-center text-foreground/60 group-hover:text-primary transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </span>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </section>

      {/* Status footer */}
      <div className="mt-auto px-6 pt-8">
        <div className="surface rounded-2xl p-4 flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-primary" />
          </span>
          <div className="min-w-0">
            <p className="eyebrow text-primary/80"><LiveText as="span" id="admin-status" defaultText="Sistem Aktif" /></p>
            <p className="text-xs text-foreground mt-0.5 truncate">
              <LiveText as="span" id="admin-conn" defaultText="Terhubung · Mainframe RPS" />
            </p>
          </div>
          <span className="ml-auto w-2 h-2 rounded-full bg-primary animate-pulse" />
        </div>
      </div>
    </div>
  );
}
