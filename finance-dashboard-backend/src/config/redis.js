// const redis = require('redis');

// const client = redis.createClient({
//     url: `redis://${process.env.REDIS_PASSWORD ? `${process.env.REDIS_PASSWORD}@` : ''}${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
// });

// client.on('error', (err) => {
//   console.error('Redis error:', err);
// });

// client.connect().catch(console.error); // Connect the client

// module.exports = client;