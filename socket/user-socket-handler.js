const userConnected = new Map();

exports.addUserConnection = (socketId, phoneNumber) => {
    if (!userConnected.has(phoneNumber)) {
        userConnected.set(phoneNumber, { socketId });
        console.log(`User connected: ${phoneNumber} - Socket ID: ${socketId}`);
    } else {
        const existingUser = userConnected.get(phoneNumber);
        existingUser.socketId = socketId;
        console.log(`User reconnected: ${phoneNumber} - Updated Socket ID: ${socketId}`);
    }
};

exports.deleteUserConnection = (socketId) => {
    for (const [phoneNumber, user] of userConnected.entries()) {
        if (user.socketId === socketId) {
            userConnected.delete(phoneNumber);
            console.log(`User disconnected: ${phoneNumber} - Socket ID: ${socketId}`);
            break;
        }
    }
};

const getUser = (phoneNumber) => {
    if (userConnected.has(phoneNumber)) {
        return userConnected.get(phoneNumber).socketId;
    } else {
        return null;
    }
};

exports.sendMessage = (socket, data) => {
    const socketId = getUser(data.to);
    if (socketId === null && data.to.startsWith("room-")) {
        socket.to(data.to).emit("receive-message", data);
    } else if (socketId !== null) {
        socket.to(socketId).emit("receive-message", data);
    }
};