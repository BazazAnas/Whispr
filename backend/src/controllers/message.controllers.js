import cloudinary from "../lib/cloudinary.js";
import Message from "../models/Message.js"
import User from "../models/User.js"

export const getContacts = async (req, res) => {
    try {
        const loggedInUser = req.user._id;
        const filteredUser = await User.find({ _id: { $ne: loggedInUser } }).select("-password");

        return res.status(200).json(filteredUser);

    } catch (error) {
        console.log("Error in getContacts", error)
        return res.status(500).json({ message: "Server error" })
    }
}

export const getChatPartners = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId: loggedInUserId },
                { receiverId: loggedInUserId }
            ]
        });

        const chatPartnerId = [...new Set(
            messages.map((msg) =>
                msg.senderId.toString() === loggedInUserId.toString()
                    ? msg.receiverId.toString()
                    : msg.senderId.toString())
        )]

        const chatPartner = await User.find({_id: { $in :chatPartnerId }}).select("-password");

        return res.status(201).json(chatPartner);
    } catch (error) {
        console.log("Error in getChatPartners");
        return res.status(500).json({ message : "Internal Server Error"});
    }
}

export const getMessageByUserId = async (req, res) => {
    try {
        const myId = req.user._id;
        const { id: userToChat } = req.params;

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChat },
                { senderId: userToChat, receiverId: myId }
            ]
        })

        return res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getmessagebyuserid");
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageURL;

        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageURL = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageURL
        })

        await newMessage.save()

        res.status(201).json(newMessage)
    } catch (error) {
        console.log("Error in sendMessage")
        return res.status(500).json({ message: "Internal Server Error" })
    }
}