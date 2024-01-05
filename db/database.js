const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contactNo: { type: String, required: true, unique: true },
    img: { type: String, required: true },
    status: { type: String, default: "offline" },
    preview: { type: String },
    Password: { type: String, required: true },
});

const chatSchema = new mongoose.Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    message: { type: String, required: true },
    datetime: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
const Chat = mongoose.model("Chat", chatSchema);

module.exports = { User, Chat };

// Data present in Database

// [
//     {
//         _id: ObjectId("6596eeb15340b40fbdaebc84"),
//         name: "Louis Litt",
//         contactNo: "9876543210",
//         img: "http://emilcarlsson.se/assets/louislitt.png",
//         status: "online",
//         preview: "You just got LITT up, Mike.",
//         Password: "$2b$10$WNmM8Fz2gZpJqV/hzp8FJOynV1a5nADbR83lQiCmikf9vM/NiLjSG", // Password=123
//     },
//     {
//         _id: ObjectId("6596eeb15340b40fbdaebc85"),
//         name: "Mike Ross",
//         contactNo: "9876543211",
//         img: "http://emilcarlsson.se/assets/mikeross.png",
//         status: "online",
//         preview: "How the hell am I supposed to get a jury to believe you when I am not even sure that I do?!",
//         Password: "$2b$10$WNmM8Fz2gZpJqV/hzp8FJOynV1a5nADbR83lQiCmikf9vM/NiLjSG", // Password=123
//     },
//     {
//         _id: ObjectId("6596eeb15340b40fbdaebc86"),
//         name: "Harvey Specter",
//         contactNo: "9876543212",
//         img: "http://emilcarlsson.se/assets/harveyspecter.png",
//         status: "busy",
//         preview: "Wrong. You take the gun, or you pull out a bigger one. Or, you call their bluff. Or, you do any one of a hundred and forty-six other things.",
//         Password: "$2b$10$WNmM8Fz2gZpJqV/hzp8FJOynV1a5nADbR83lQiCmikf9vM/NiLjSG",  // Password=123
//     },
//     {
//         _id: ObjectId("6596eeb15340b40fbdaebc87"),
//         name: "Jonathan Sidwell",
//         contactNo: "9876543213",
//         img: "http://emilcarlsson.se/assets/jonathansidwell.png",
//         status: "",
//         preview: "That's bullshit. This deal is solid.",
//         Password: "$2b$10$WNmM8Fz2gZpJqV/hzp8FJOynV1a5nADbR83lQiCmikf9vM/NiLjSG", // Password=123
//     },
// ];
