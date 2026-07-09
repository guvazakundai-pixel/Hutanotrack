import { RiskLevel } from '../types';

export const classifyBP = (
  systolic: number,
  diastolic: number
): { level: RiskLevel; label: string } => {
  if (systolic >= 180 || diastolic >= 120) {
    return { level: RiskLevel.RED, label: 'Hypertensive Crisis' };
  }
  if (systolic >= 140 || diastolic >= 90) {
    return { level: RiskLevel.RED, label: 'Stage 2 Hypertension' };
  }
  if (systolic >= 130 || diastolic >= 80) {
    return { level: RiskLevel.AMBER, label: 'Stage 1 Hypertension' };
  }
  if (systolic >= 120) {
    return { level: RiskLevel.AMBER, label: 'Elevated' };
  }
  return { level: RiskLevel.GREEN, label: 'Normal' };
};

export const classifyGlucose = (
  value: number,
  isFasting: boolean
): { level: RiskLevel; label: string } => {
  if (isFasting) {
    if (value >= 7.0) return { level: RiskLevel.RED, label: 'Diabetes' };
    if (value >= 6.1) return { level: RiskLevel.AMBER, label: 'Pre-diabetes' };
    return { level: RiskLevel.GREEN, label: 'Normal' };
  }
  if (value >= 11.1) return { level: RiskLevel.RED, label: 'Diabetes' };
  if (value >= 7.8) return { level: RiskLevel.AMBER, label: 'Pre-diabetes' };
  return { level: RiskLevel.GREEN, label: 'Normal' };
};

export const classifyBMI = (bmi: number): { level: RiskLevel; label: string } => {
  if (bmi >= 40) return { level: RiskLevel.RED, label: 'Severe Obesity' };
  if (bmi >= 30) return { level: RiskLevel.AMBER, label: 'Obese' };
  if (bmi >= 25) return { level: RiskLevel.AMBER, label: 'Overweight' };
  if (bmi >= 18.5) return { level: RiskLevel.GREEN, label: 'Normal' };
  return { level: RiskLevel.RED, label: 'Underweight' };
};

export const calculateBMI = (weightKg: number, heightCm: number): number => {
  const heightM = heightCm / 100;
  return Number((weightKg / (heightM * heightM)).toFixed(1));
};

export const isEmergencyDetected = (screening: {
  chestPain: boolean;
  severeHeadache: boolean;
  blurredVision: boolean;
  difficultyBreathing: boolean;
  highGlucoseSymptoms: boolean;
  pregnancyDangerSigns: boolean;
}): boolean => {
  return (
    screening.chestPain ||
    screening.severeHeadache ||
    screening.blurredVision ||
    screening.difficultyBreathing ||
    screening.highGlucoseSymptoms ||
    screening.pregnancyDangerSigns
  );
};
