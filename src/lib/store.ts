export type ItemType = 'mobil' | 'motor' | 'hp';
export type SearchType = ItemType | 'admin-lp';

export interface BaseItem {
  id: string;
  type: ItemType;
  noLp: string;
  tglLp: string;
  pelapor: string;
  lokasiTkp: string;
  satker: string;
  asalLp: string;
  foto?: string;
  createdAt: number;
}

export interface VehicleItem extends BaseItem {
  type: 'mobil' | 'motor';
  noPolisi: string;
  noRangka: string;
  noMesin: string;
  merk: string;
  tipe?: string; // Mobil only typically
  jenis?: string; // Motor only typically
  warna: string;
  tahun: string;
}

export interface HpItem extends BaseItem {
  type: 'hp';
  merk: string;
  model: string;
  imei1: string;
  imei2?: string;
  warna: string;
}

export type EvidenceItem = VehicleItem | HpItem;

export interface UserAccount {
  id: string;
  nrp: string;
  name: string;
  unit: string;
  role: 'admin' | 'polri';
  password: string;
  createdAt: number;
}

export interface SystemLog {
  id: string;
  timestamp: number;
  user: string;
  role: string;
  action: string;
  details: string;
}

const initialData: EvidenceItem[] = [
  {
    id: "1",
    type: "mobil",
    noPolisi: "DD 1234 AB",
    noRangka: "MHKG3452293847",
    noMesin: "1NZFE29384",
    merk: "Toyota",
    tipe: "Avanza",
    warna: "Hitam",
    tahun: "2019",
    noLp: "LP/123/IV/2026/SPKT POLRESTABES MAKASSAR",
    tglLp: "2026-04-12",
    pelapor: "Budi Santoso",
    lokasiTkp: "Jl. AP Pettarani",
    satker: "POLRESTABES MAKASSAR",
    asalLp: "Polsek Panakkukang",
    createdAt: Date.now() - 100000,
  },
  {
    id: "2",
    type: "motor",
    noPolisi: "DD 5678 CD",
    noRangka: "MH12394857",
    noMesin: "K44E1234",
    merk: "Honda",
    jenis: "Beat",
    warna: "Merah Putih",
    tahun: "2021",
    noLp: "LP/456/V/2026/SPKT RESMOB POLDA SULSEL",
    tglLp: "2026-05-01",
    pelapor: "Andi Makkasau",
    lokasiTkp: "Jl. Urip Sumoharjo",
    satker: "RESMOB POLDA SULSEL",
    asalLp: "Polres Bone",
    createdAt: Date.now() - 50000,
  },
  {
    id: "4",
    type: "mobil",
    noPolisi: "DD 9999 XX",
    noRangka: "MHKG3452293899",
    noMesin: "1NZFE29399",
    merk: "Daihatsu",
    tipe: "Xenia",
    warna: "Putih",
    tahun: "2022",
    noLp: "LP/321/I/2026/SPKT POLRES MAROS",
    tglLp: "2026-01-15",
    pelapor: "Rahmat",
    lokasiTkp: "Jl. Poros Maros",
    satker: "POLRES MAROS",
    asalLp: "Polsek Turikale",
    createdAt: Date.now() - 120000,
  },
  {
    id: "5",
    type: "motor",
    noPolisi: "DD 1111 YY",
    noRangka: "MH12394855",
    noMesin: "K44E1235",
    merk: "Yamaha",
    jenis: "NMAX",
    warna: "Hitam",
    tahun: "2023",
    noLp: "LP/654/II/2026/SPKT POLRES TAKALAR",
    tglLp: "2026-02-10",
    pelapor: "Sudirman",
    lokasiTkp: "Jl. Poros Takalar",
    satker: "POLRES TAKALAR",
    asalLp: "Polsek Pattallassang",
    createdAt: Date.now() - 80000,
  },
  {
    id: "6",
    type: "motor",
    noPolisi: "DD 2222 ZZ",
    noRangka: "MH12394856",
    noMesin: "K44E1236",
    merk: "Suzuki",
    jenis: "Aerox",
    warna: "Merah",
    tahun: "2020",
    noLp: "LP/987/III/2026/SPKT POLRESTABES MAKASSAR",
    tglLp: "2026-03-20",
    pelapor: "Ahmad",
    lokasiTkp: "Jl. Boulevard",
    satker: "POLRESTABES MAKASSAR",
    asalLp: "Polsek Rappocini",
    createdAt: Date.now() - 60000,
  },
  {
    id: "3",
    type: "hp",
    merk: "Samsung",
    model: "Galaxy S23",
    imei1: "358912345678901",
    warna: "Phantom Black",
    noLp: "LP/789/VI/2026/SPKT POLRES GOWA",
    tglLp: "2026-06-15",
    pelapor: "Siti Aminah",
    lokasiTkp: "Jl. Sultan Hasanuddin",
    satker: "POLRES GOWA",
    asalLp: "Polsek Somba Opu",
    createdAt: Date.now() - 10000,
  },
  {
    id: "7",
    type: "hp",
    merk: "Apple",
    model: "iPhone 13",
    imei1: "358912345678902",
    warna: "Blue",
    noLp: "LP/123/IV/2026/SPKT POLRESTABES MAKASSAR",
    tglLp: "2026-04-12",
    pelapor: "Budi Santoso",
    lokasiTkp: "Jl. AP Pettarani",
    satker: "POLRESTABES MAKASSAR",
    asalLp: "Polsek Tamalanrea",
    createdAt: Date.now() - 90000,
  },
  {
    id: "8",
    type: "hp",
    merk: "Xiaomi",
    model: "Redmi Note 12",
    imei1: "358912345678903",
    warna: "Onyx Gray",
    noLp: "LP/456/V/2026/SPKT RESMOB POLDA SULSEL",
    tglLp: "2026-05-01",
    pelapor: "Andi Makkasau",
    lokasiTkp: "Jl. Urip Sumoharjo",
    satker: "RESMOB POLDA SULSEL",
    asalLp: "Polres Sidrap",
    createdAt: Date.now() - 40000,
  },
  {
    id: "9",
    type: "hp",
    merk: "Oppo",
    model: "Reno 8",
    imei1: "358912345678904",
    warna: "Shimmer Gold",
    noLp: "LP/321/I/2026/SPKT POLRES MAROS",
    tglLp: "2026-01-15",
    pelapor: "Rahmat",
    lokasiTkp: "Jl. Poros Maros",
    satker: "POLRES MAROS",
    asalLp: "Polsek Lau",
    createdAt: Date.now() - 110000,
  },
  {
    id: "10",
    type: "hp",
    merk: "Vivo",
    model: "V27",
    imei1: "358912345678905",
    warna: "Magic Blue",
    noLp: "LP/654/II/2026/SPKT POLRES TAKALAR",
    tglLp: "2026-02-10",
    pelapor: "Sudirman",
    lokasiTkp: "Jl. Poros Takalar",
    satker: "POLRES TAKALAR",
    asalLp: "Polsek Galesong Utara",
    createdAt: Date.now() - 70000,
  }
];

export function getEvidenceData(): EvidenceItem[] {
  const stored = localStorage.getItem("kuboyako_evidence");
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem("kuboyako_evidence", JSON.stringify(initialData));
  return initialData;
}

export function saveEvidenceItem(item: EvidenceItem) {
  const data = getEvidenceData();
  data.push(item);
  localStorage.setItem("kuboyako_evidence", JSON.stringify(data));
}

export function updateEvidenceItem(item: EvidenceItem) {
  const data = getEvidenceData();
  const index = data.findIndex(i => i.id === item.id);
  if (index !== -1) {
    data[index] = item;
    localStorage.setItem("kuboyako_evidence", JSON.stringify(data));
  }
}

export function deleteEvidenceItem(id: string) {
  const data = getEvidenceData();
  const filtered = data.filter(i => i.id !== id);
  localStorage.setItem("kuboyako_evidence", JSON.stringify(filtered));
}

export function searchEvidence(type: SearchType, query: string): EvidenceItem | undefined {
  const data = getEvidenceData();
  // Normalize query: lowercase and remove all non-alphanumeric characters
  const q = query.toLowerCase().replace(/[^a-z0-9]/g, "").trim();

  if (!q) return undefined;

  if (type === 'admin-lp') {
    return data.find(item => item.noLp.toLowerCase().replace(/[^a-z0-9]/g, "").includes(q));
  }

  return data.find(item => {
    if (item.type !== type) return false;

    if (item.type === 'mobil' || item.type === 'motor') {
      const v = item as VehicleItem;
      // Search in Plate, Chassis (Rangka), and Engine (Mesin)
      const nopol = v.noPolisi.toLowerCase().replace(/[^a-z0-9]/g, "");
      const rangka = v.noRangka.toLowerCase().replace(/[^a-z0-9]/g, "");
      const mesin = v.noMesin.toLowerCase().replace(/[^a-z0-9]/g, "");

      return nopol.includes(q) || rangka.includes(q) || mesin.includes(q);
    }

    if (item.type === 'hp') {
      const h = item as HpItem;
      // Search in IMEI 1 and IMEI 2
      const imei1 = h.imei1.replace(/[^0-9]/g, "");
      const imei2 = h.imei2?.replace(/[^0-9]/g, "") || "";

      return imei1.includes(q) || imei2.includes(q);
    }

    return false;
  });
}

// ── ACCOUNT MANAGEMENT ──────────────────────────────────────────

const initialAccounts: UserAccount[] = [
  {
    id: "admin-1",
    nrp: "admin",
    name: "IRZAL MAKKARAWA, S.H.",
    unit: "RESMOB POLDA SULSEL",
    role: "admin",
    password: "poldasulsel",
    createdAt: Date.now(),
  },
  {
    id: "polri-1",
    nrp: "71040001",
    name: "BUDI SANTOSO",
    unit: "POLRESTABES MAKASSAR",
    role: "polri",
    password: "password123",
    createdAt: Date.now(),
  }
];

export function getUserAccounts(): UserAccount[] {
  const stored = localStorage.getItem("kuboyako_accounts");
  if (stored) return JSON.parse(stored);
  localStorage.setItem("kuboyako_accounts", JSON.stringify(initialAccounts));
  return initialAccounts;
}

export function saveUserAccount(account: UserAccount) {
  const accounts = getUserAccounts();
  accounts.push(account);
  localStorage.setItem("kuboyako_accounts", JSON.stringify(accounts));
}

export function deleteUserAccount(id: string) {
  const accounts = getUserAccounts();
  const filtered = accounts.filter(a => a.id !== id);
  localStorage.setItem("kuboyako_accounts", JSON.stringify(filtered));
}

export function validateLogin(nrp: string, pass: string): UserAccount | undefined {
  const accounts = getUserAccounts();
  return accounts.find(a => a.nrp === nrp && a.password === pass);
}

// ── LOG MANAGEMENT ─────────────────────────────────────────────

export function getLogs(): SystemLog[] {
  const stored = localStorage.getItem("kuboyako_logs");
  return stored ? JSON.parse(stored) : [];
}

export function addLog(user: string, role: string, action: string, details: string) {
  const logs = getLogs();
  const newLog: SystemLog = {
    id: Math.random().toString(36).slice(2, 11),
    timestamp: Date.now(),
    user,
    role,
    action,
    details
  };
  logs.unshift(newLog); // Newest first
  localStorage.setItem("kuboyako_logs", JSON.stringify(logs.slice(0, 500))); // Keep last 500 logs
}
