const { validationResult } = require('express-validator');
const { Message, User } = require('../models');

const sendMessage = async (req, res) => {

    const { sender_id, receiver_id, group_id, content, reply_to_message_id } = req.body;

    try {
        const message = await Message.create({
            sender_id,
            receiver_id,
            group_id,
            content,
            reply_to_message_id,
        });

        return res.status(201).json({ message: 'Message sent successfully', data: message });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to send message' });
    }
};


const uploadFile = async (req, res) => {
    try {

        const { sender_id, group_id } = req.body;

        const message = await Message.create({
            sender_id,
            group_id,
            file_url: req.file.path,
            filename: req.file.originalname,
            filetype: req.file.mimetype,
            filesize: req.file.size,
        });

        return res.status(201).json({ message: 'File sent successfully', data: message });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to upload file' });
    }
};



const getMessagesByGroupId = async (req, res) => {
    const { groupId } = req.params;

    try {
        // Fetch messages for the group along with sender and receiver details
        const messages = await Message.findAll({
            where: { group_id: groupId },
            include: [
                {
                    model: User,
                    as: 'Sender', // Alias for sender details
                    attributes: ['id', 'name', 'email'], // Specify the fields to include
                },
                {
                    model: User,
                    as: 'Receiver', // Alias for receiver details (optional for private chats)
                    attributes: ['id', 'name', 'email'], // Specify the fields to include
                },
            ],
            order: [['createdAt', 'ASC']], // Sort messages by creation time
        });

        if (!messages.length) {
            return res.status(404).json({ message: 'No messages found for this group' });
        }

        return res.status(200).json({ messages });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to fetch messages' });
    }
};


const getMessagesByUser = async (req, res) => {
    const { sender_id, receiver_id } = req.params;

    try {
        // Fetch messages for the group along with sender and receiver details
        const messages = await Message.findAll({
            where: { sender_id, receiver_id },
            include: [
                {
                    model: User,
                    as: 'Sender', // Alias for sender details
                    attributes: ['id', 'name', 'email'], // Specify the fields to include
                },
                {
                    model: User,
                    as: 'Receiver', // Alias for receiver details (optional for private chats)
                    attributes: ['id', 'name', 'email'], // Specify the fields to include
                },
            ],
            order: [['createdAt', 'ASC']], // Sort messages by creation time
        });

        if (!messages.length) {
            return res.status(404).json({ message: 'No messages found for this group' });
        }

        return res.status(200).json({ messages });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to fetch messages' });
    }
};

module.exports = { uploadFile, sendMessage, getMessagesByGroupId, getMessagesByUser };

