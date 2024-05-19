import {
  getMessageValidator,
  sendMessageValidator,
} from "../utils/validators/message.validator.js";
import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { error } = sendMessageValidator.validate(req.body);
    if (error) throw new Error(`Invalid data`);

    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
        messages: [],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage["_id"]);
      await conversation.save();
    }

    console.log(
      `[sendMessage] Message sent successfully from ${senderId} to ${receiverId}`,
    );
    res.status(200).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (err) {
    console.log([`[sendMessage] Error while message. ${err}`]);
    res.status(500).json({
      success: false,
      message: `something went wrong`,
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { error } = getMessageValidator.validate(req.params);
    if (error) throw new Error("Invalid data");
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");

    console.log(
      `[getMessages] fetched messages successfully between users ${senderId} and ${receiverId}`,
    );
    res.status(200).json({
      success: true,
      message: "fetched messages successfully",
      data: conversation || {},
    });
  } catch (err) {
    console.log(`[getMessages] Error while getting messages. ${err}`);
    res.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
};
