/*const Message = require("../models/message");
const User = require("../models/User");

module.exports = {
  getAllMessages: async (req, res) => {
    try {
      const pageSize = 12;
      const page = req.query.page || 1;

      const skipMessages = (page - 1) * pageSize;

      var message = await Message.find({ chat: req.params.id })
        .populate("sender", "username profile email")
        .populate("chat")
        .sort({ createAt: -1 })
        .skip(skipMessages)
        .limit(pageSize);

      message = await User.populate(message, {
        path: "chat.users",
        select: "username profile email",
      });

      res.json(message);
    } catch (error) {
      res.status(500).json({ error: "could not recieve messages" });
    }
  },
  sendMessage: async (req, res) => {
    const { content, chatId, reciver } = req.body;
    if (!content || !chatId) {
      console.log("invilid data");
      return res.status(400).json("invalid data");
    }

    var newMessage = {
      sender: req.user.id,
      content: content,
      reciver: reciver,
      chat: chatId,
    };

    try {
      var message = await Message.create(newMessage);
      message = await message.populate("sender", "username profile email");
      message = await message.populate("chat");
      message = await User.populate(message, {
        path: "chat.users",
        select: "username profile email",
      });

      await chat.findByIdAndUpdate(request.body.chatId, {
        latestMessage: message,
      });

      res.json(message);
    } catch (error) {
      res.status(400).json(error);
    }
  },
};*/
