import Redis from 'ioredis';

// Create a Redis instance.
// By default, it will connect to localhost:6379.
// We are going to cover how to specify connection options soon.
const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: 13440, // needs Redis >= 6
  password: process.env.REDIS_PASSOWRD,
});

export default redis
