const redis =  require('redis');

const client = createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
        host: 'dog-kettle-button-58831.db.redis.io',
        port: 11113
    }
});