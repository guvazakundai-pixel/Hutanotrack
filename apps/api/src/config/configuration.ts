export default () => ({
  port: parseInt(process.env.PORT!, 10) || 4000,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwt: {
    secret: process.env.JWT_SECRET || 'super-secret-key-change-in-production',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
  },
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT!, 10) || 5432,
    username: process.env.DB_USER || 'hutanotrack',
    password: process.env.DB_PASSWORD || 'hutanotrack',
    name: process.env.DB_NAME || 'hutanotrack',
  },
  sms: {
    provider: process.env.SMS_PROVIDER || 'africastalking',
    apiKey: process.env.SMS_API_KEY,
    senderId: process.env.SMS_SENDER_ID || 'HutanoTrack',
  },
  storage: {
    provider: process.env.STORAGE_PROVIDER || 'local',
    bucket: process.env.STORAGE_BUCKET || 'uploads',
  },
});
