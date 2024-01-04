const { User, Chat } = require("../db/database");

class Server {
    getUserByContactNo = async (contactNo) => {
        try {
            const user = await User.findOne({ contactNo })

            if (user !== null) return user;
        } catch (error) {
            console.error(error.message);
            throw new Error("User not found");
        }
    };

    getUserById = async (id) => {
        try {
            const user = await User.findOne({ _id: id })
            if (user !== null) return user;
        } catch (error) {
            console.error(error.message);
            throw new Error("User not found");
        }
    };

    fetchAllUser = async () => {
        try {
            const users = await User.find();
            return users;
        } catch (error) {
            throw error;
        }
    };

    
    fetchChatMessage = async (detail) => {
        try {
            const chats = await Chat.find({
                $or: [
                    { from: detail.from, to: detail.to },
                    { from: detail.to, to: detail.from }
                ]
            }, { _id: 0, __v: 0 });            
            
            if (!chats) throw new Error("Chats not found");

            return chats;
        } catch (error) {
            throw error;
        }
    };

    appendChat = async (data) => {
        try {
            const chat = new Chat(data)
            const result = await chat.save()
            return result;
        } catch (error) {
            throw error;
        }
    };
}

module.exports = Server;