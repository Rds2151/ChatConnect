const server = require("../app");
const io = require("socket.io")(server);
const redis = require("redis");
const { addUserConnection, deleteUserConnection, sendMessage, publishMessage, fetchChatMessage, } = require("./user-socket-handler");

const subscriber = redis.createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_URL,
        port: process.env.REDIS_PORT,
    },
});

subscriber
    .connect()
    .then(() => {
        console.log("Connected to Redis server : Subscriber");
    })
    .catch((error) => {
        console.error("Error connecting to Redis:", error);
    });

subscriber.on("error", function (error) {
    console.error("Subscriber Error:", error);
});

onConnected = (socket) => {
    // Subscribe to a channel
    subscriber.subscribe("MESSAGES", function (message) {
        sendMessage(socket, JSON.parse(message));
    });

    socket.on("addPhoneNumber", (phoneNumber) =>
        addUserConnection(socket.id, phoneNumber)
    );

    socket.on("disconnect", () => deleteUserConnection(socket.id));

    socket.on("send-message", (data) => publishMessage(data));

    socket.on("join-room", (roomName) => socket.join("room-" + roomName));

    socket.on("load-message", async (data, onDataLoaded) => {
        const result = await fetchChatMessage(data);
        if (result) onDataLoaded(result);
    });
};

io.on("connection", onConnected);
