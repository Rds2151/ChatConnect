const server = require('../app')
const io = require("socket.io")(server);
const { addUserConnection , deleteUserConnection, sendMessage, fetchChatMessage } = require('./user-socket-handler')

onConnected = (socket) => {
    
    socket.on("addPhoneNumber", (phoneNumber) => addUserConnection(socket.id, phoneNumber));

    socket.on("disconnect", () => deleteUserConnection(socket.id));

    socket.on("send-message", (data) => sendMessage(socket, data));

    socket.on("join-room", (roomName) => socket.join("room-"+roomName));

    socket.on("load-message",async (data, onDataLoaded) => {
        const result = await fetchChatMessage(data)
        if (result) onDataLoaded(result)
    })
};

io.on("connection", onConnected);