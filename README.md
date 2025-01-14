# Backend Project OpenMusic API Version 1
## Made by Muhammad Dava Pasha (mdavap)

### How to run this project?

#### Install required modules
```
npm install
```

#### Prepare database by using migration
```
npm run migrate up
```

#### Start the backend and consumer
```
npm run start
```

#### Environment example
```
# Server
HOST=localhost
PORT=5000
MAX_UPLOAD_SIZE=512000 # Max upload size in bytes

# Postgresql
PGUSER=postgres
PGPASSWORD=postgres
PGHOST=127.0.0.1
PGPORT=5432

# Jwt
ACCESS_TOKEN_AGE=3600 # 3600 seconds or 1 hour
ACCESS_TOKEN_KEY=RANDOMBYTES
REFRESH_TOKEN_KEY=RANDOMBYTES

# SMTP
SMTP_USER=<SMTP_USERNAME>
SMTP_PASSWORD=<SMTP_PASSWORD>
SMTP_HOST=<SMTP_HOST>
SMTP_PORT=<SMTP_PORT> # 587/TLS is recommended
SMTP_SENDER=<SMTP_SENDER_EMAIL> # example is noreply@demomailtrap.com

# RabbitMQ
RABBITMQ_SERVER=amqp://localhost

# REDIS
REDIS_SERVER=localhost
CACHE_TIME=1800 # 30 minutes
```

### SMTP
Recommended SMTP protocol is TLS which uses port `587`.

#### Generate random bytes for `ACCESS_TOKEN_KEY` and `REFRESH_TOKEN_KEY`
```
console.log(require('crypto').randomBytes(64).toString('hex'))
```