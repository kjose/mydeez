import { createClient } from 'redis';
import Container from './Container';

class RedisClient {
  constructor() {}

  static async init() {
    console.log('Starting redis ...');

    const client = createClient();
    client.on('error', (err) => console.log('Redis Client Error', err));

    await client.connect();
    return client;
  }
}

export default RedisClient;
