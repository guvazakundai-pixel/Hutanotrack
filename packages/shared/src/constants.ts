export const APP_NAME = 'HutanoTrack';
export const TAGLINE = 'Keeping Communities Connected to Care';
export const VERSION = '1.0.0';

export const COLORS = {
  medicalBlue: '#2563EB',
  healthcareGreen: '#16A34A',
  white: '#FFFFFF',
  lightGrey: '#F8FAFC',
  darkBg: '#0F172A',
  darkCard: '#1E293B',
  error: '#DC2626',
  warning: '#F59E0B',
  success: '#16A34A',
  info: '#3B82F6',
};

export const RISK_COLORS = {
  green: '#16A34A',
  amber: '#F59E0B',
  red: '#DC2626',
};

export const RISK_LABELS = {
  green: 'Stable',
  amber: 'Needs Attention',
  red: 'Immediate Referral',
};

export const ZIMBABWE_PROVINCES = [
  'Bulawayo',
  'Harare',
  'Manicaland',
  'Mashonaland Central',
  'Mashonaland East',
  'Mashonaland West',
  'Masvingo',
  'Matabeleland North',
  'Matabeleland South',
  'Midlands',
];

export const NORMAL_RANGES = {
  bloodPressure: { systolic: { min: 90, max: 120 }, diastolic: { min: 60, max: 80 } },
  bloodGlucose: { fasting: { min: 3.9, max: 6.1 }, postprandial: { min: 0, max: 7.8 } },
  heartRate: { min: 60, max: 100 },
  temperature: { min: 36.1, max: 37.2 },
  oxygenSaturation: { min: 95, max: 100 },
  respiratoryRate: { min: 12, max: 20 },
};

export const ADHERENCE_THRESHOLDS = {
  good: 80,
  fair: 50,
  poor: 0,
};

export const OFFLINE_SYNC_INTERVAL = 30000; // 30 seconds
export const SESSION_TIMEOUT = 3600000; // 1 hour
export const MAX_LOGIN_ATTEMPTS = 5;
export const OTP_EXPIRY = 300; // 5 minutes

export const PAGINATION = {
  defaultPage: 1,
  defaultLimit: 20,
  maxLimit: 100,
};

export const DANGER_SIGNS_QUESTIONS = [
  { id: 'chestPain', question_en: 'Are you experiencing chest pain?', question_sho: 'Uri kunzwa kurwadziwa muchipfuva?', question_nde: 'Uzwa ubuhlungu esifubeni?' },
  { id: 'severeHeadache', question_en: 'Do you have a severe headache?', question_sho: 'Une musoro unorwadza zvakanyanya?', question_nde: 'Unekhanda elibuhlungu kakhulu?' },
  { id: 'blurredVision', question_en: 'Is your vision blurred?', question_sho: 'Maziso ako anoona makushe?', question_nde: 'Amehlo akho ayabona kufiphele?' },
  { id: 'difficultyBreathing', question_en: 'Are you having difficulty breathing?', question_sho: 'Uri kunetseka kufema?', question_nde: 'Uhlangabezana nobunzima bokuphefumula?' },
  { id: 'highGlucoseSymptoms', question_en: 'Are you experiencing symptoms of high blood sugar?', question_sho: 'Uri kunzwa zviratidzo zveshuga yakawanda?', question_nde: 'Uzwa izimpawu zoshukela ephezulu?' },
  { id: 'pregnancyDangerSigns', question_en: 'Do you have any pregnancy danger signs?', question_sho: 'Une zviratidzo zvine ngozi zvepamuviri?', question_nde: 'Une izimpawu eziyingozi zokukhulelwa?' },
];

export const EMERGENCY_INSTRUCTIONS = {
  en: 'Please remain calm. Emergency services have been notified. A healthcare worker will contact you shortly. If you feel your condition is worsening, please call your nearest clinic or emergency services immediately.',
  sho: 'Ndapota ramba wakadzikama. Vashandi vehutano vave kuziviswa. Mushandi wehutano achakubatirai muchangobva. Kana uchinzwa mamiriro ako achiwedzera, ndapota fona kukiriniki yako yepedyo kana mauto ekukurumidzira.',
  nde: 'Sicela uhlale uzolile. Izinsiza eziphuthumayo sezazisiwe. Umsebenzi wezempilo uzakuthinta maduze. Uma uzwa isimo sakho siba sibi, sicela ushayele umtholampilo oseduze noma izinsiza eziphuthumayo.',
};
