const { createClient } = require("redis");

const client = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_URL,
        port: process.env.REDIS_PORT
    }
});

client.on('error', err => console.log(`Redis Client Error ${err}`))

client.connect()
    .then(() => {
        console.log("Connected to Redis server");
    })
    .catch((error) => {
        console.error("Error connecting to Redis:", error);
    });

module.exports = client;