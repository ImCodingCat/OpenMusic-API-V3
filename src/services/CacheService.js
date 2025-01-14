const redis = require('redis');
const { cache } = require('../config');

class CacheService {
  constructor() {
    this._client = redis.createClient({
      socket: {
        host: cache.server,
      },
    });

    this._client.on('error', (error) => {
      console.error(error);
    });

    this._client.connect();
  }

  set(key, value) {
    return this._client.set(key, value, {
      EX: cache.expire,
    });
  }

  get(key) {
    return this._client.get(key);
  }

  delete(key) {
    return this._client.del(key);
  }
}

module.exports = CacheService;
