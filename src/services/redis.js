const { createClient } = require('redis');

const initRedis = async () => {
  const client = createClient();

  client.on('error', (err) => console.log('Redis Client Error', err));

  await client.connect();

  await client.set('key', 'value');
  const value = await client.get('key');

  console.log('redis value', value);
};

module.exports = {
  initRedis,
};
