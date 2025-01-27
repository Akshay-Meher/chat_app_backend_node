const { MessageReaction } = require('../models');

exports.addReaction = async (req, res) => {
    const { message_id, user_id, reaction } = req.body;

    try {
        const newReaction = await MessageReaction.create({
            message_id,
            user_id,
            reaction,
        });

        return res.status(201).json({ message: 'Reaction added', data: newReaction });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to add reaction' });
    }
};
