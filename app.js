const express = require("express");
const ejs = require("ejs");
const app = express();
const bodyparser = require("body-parser");
const path = require("path");
const indexRoutes = require("./routes/index");
const session = require("express-session");
const passport = require("passport");

app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const sessionMiddleware = session({
    secret: "random cat",
    resave: true,
    saveUninitialized: true,
});

app.use(sessionMiddleware);

app.use(passport.initialize());
app.use(passport.session());
require("./auth/passport-config");

app.use("/", indexRoutes);

const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
    console.log(`Listening on the port ${port}...`)
);

const io = require("socket.io")(server);
const users = require("./db/database").users;
const userConnected = new Map();

function addUserConnection(socketId, phoneNumber) {
    if (!userConnected.has(phoneNumber)) {
        userConnected.set(phoneNumber, { socketId });
        console.log(`User connected: ${phoneNumber} - Socket ID: ${socketId}`);
    } else {
        const existingUser = userConnected.get(phoneNumber);
        existingUser.socketId = socketId;
        console.log(
            `User reconnected: ${phoneNumber} - Updated Socket ID: ${socketId}`
        );
    }
}

function deleteUserConnection(socketId) {
    for (const [phoneNumber, user] of userConnected.entries()) {
        if (user.socketId === socketId) {
            userConnected.delete(phoneNumber);
            console.log(`User disconnected: ${phoneNumber} - Socket ID: ${socketId}`);
            break;
        }
    }
}

function getUser(phoneNumber) {
    if (userConnected.has(phoneNumber)) {
        return userConnected.get(phoneNumber).socketId;
    } else {
        return null;
    }
}


onConnected = (socket) => {
    socket.on("addPhoneNumber", (phoneNumber) => {
        addUserConnection(socket.id, phoneNumber);
    });

    socket.on("disconnect", () => {
        deleteUserConnection(socket.id)
    });

    socket.on("send-message", (data) => {
        const socketId = getUser(data.to)
        console.log(data)
        socket.to(socketId).emit("receive-message", data);
    });
};

io.on("connection", onConnected);
