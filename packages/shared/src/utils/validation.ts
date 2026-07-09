export const isValidPhoneNumber = (phone: string): boolean => {
  const zimbabwePattern = /^(?:\+263|0)[1-9]\d{8}$/;
  return zimbabwePattern.test(phone.replace(/\s/g, ''));
};

export const isValidEmail = (email: string): boolean => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
};

export const isValidBloodPressure = (systolic: number, diastolic: number): boolean => {
  return systolic >= 60 && systolic <= 250 && diastolic >= 30 && diastolic <= 150;
};

export const isValidBloodGlucose = (value: number): boolean => {
  return value >= 1 && value <= 50;
};

export const isValidWeight = (kg: number): boolean => {
  return kg >= 1 && kg <= 500;
};

export const isValidTemperature = (celsius: number): boolean => {
  return celsius >= 32 && celsius <= 45;
};

export const isValidHeartRate = (bpm: number): boolean => {
  return bpm >= 20 && bpm <= 250;
};
