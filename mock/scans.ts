export type DangerLevel = 'safe' | 'warning' | 'danger';

export type Scan = {
  id: string;
  name: string;
  category: string;
  level: DangerLevel;
  date: string;
  imageUri: string;
};

export const RECENT_SCANS: Scan[] = [
  {
    id: '1',
    name: 'Ixodes scapularis',
    category: 'Tick',
    level: 'danger',
    date: 'Today, 08:42 AM',
    imageUri: 'https://picsum.photos/seed/tick/320/380',
  },
  {
    id: '2',
    name: 'Common Wall Mold',
    category: 'Mold',
    level: 'safe',
    date: 'Yesterday, 14:15',
    imageUri: 'https://picsum.photos/seed/mold/320/380',
  },
  {
    id: '3',
    name: 'Eastern Copperhead',
    category: 'Snake',
    level: 'danger',
    date: 'Apr 26, 10:03 AM',
    imageUri: 'https://picsum.photos/seed/snake/320/380',
  },
  {
    id: '4',
    name: 'Brown Recluse',
    category: 'Spider',
    level: 'warning',
    date: 'Apr 25, 17:30',
    imageUri: 'https://picsum.photos/seed/spider/320/380',
  },
];

export const ALERT = {
  title: 'Tick season starting in NC',
  body: 'Lyme disease risk elevated in wooded areas.',
};

export const SCANS_USED = 2;
export const SCANS_TOTAL = 3;
