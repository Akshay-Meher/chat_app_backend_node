const { body } = require('express-validator');

const create_grp_validations = [
    body('group_name').notEmpty().withMessage('Group name is required'),
    body('admin_id').isInt().withMessage('Admin ID must be an integer'),
    body('user_ids').notEmpty().withMessage('User IDs are required'),
];

const sendMessageValidation = [
    body('sender_id').isInt().withMessage('Sender ID must be an integer'),
    body('content').optional().isString(),
];


const reactionValidation = [
    body('message_id').isInt().withMessage('Message ID must be an integer'),
    body('reaction').isIn(['like', 'love', 'laugh', 'sad', 'angry']).withMessage('Invalid reaction'),
]


module.exports = { create_grp_validations, sendMessageValidation, reactionValidation };