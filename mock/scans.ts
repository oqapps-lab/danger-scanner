/**
 * Mock scan history. Replace with real Supabase query in Stage 6.
 */
export type ScanRisk = 'safe' | 'caution' | 'danger';

export type ScanEntry = {
  id: string;
  title: string;
  category: string;
  risk: ScanRisk;
  summary: string;
  scannedAt: string; // ISO string
};

export const MOCK_SCANS: ScanEntry[] = [
  {
    id: 's_003',
    title: 'Black mold patch',
    category: 'Mold',
    risk: 'danger',
    summary: 'Stachybotrys indicators. Ventilate, avoid contact, call remediation.',
    scannedAt: '2026-04-21T09:14:00Z',
  },
  {
    id: 's_002',
    title: 'Unknown spider',
    category: 'Arachnid',
    risk: 'caution',
    summary: 'Likely house spider — not medically significant. Rehome, don\'t squish.',
    scannedAt: '2026-04-20T18:42:00Z',
  },
  {
    id: 's_001',
    title: 'Garden snake',
    category: 'Reptile',
    risk: 'safe',
    summary: 'Common garter snake. Non-venomous. Move along quietly.',
    scannedAt: '2026-04-20T11:07:00Z',
  },
];
