const config = {
  server: {
    host: process.env.HOST,
    port: process.env.PORT,
    max_upload_size: process.env.MAX_UPLOAD_SIZE,
  },
  auth: {
    age: process.env.ACCESS_TOKEN_AGE,
    access_key: process.env.ACCESS_TOKEN_KEY,
    refresh_key: process.env.REFRESH_TOKEN_KEY,
  },
  smtp: {
    sender: process.env.SMTP_SENDER,
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD,
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
  },
  broker: {
    server: process.env.RABBITMQ_SERVER,
  },
  cache: {
    server: process.env.REDIS_SERVER,
    expire: process.env.CACHE_TIME,
  },
};

module.exports = config;
