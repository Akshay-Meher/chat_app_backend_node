const express = require('express');
const { sendMessage, uploadFile, getMessagesByGroupId, getMessagesByUser } = require('../controllers/messageController');
const { body } = require('express-validator');
const { sendMessageValidation } = require('../validations/commonValidations');
const { checkValidationMidd } = require('../middleware/checkValidationMidd');
// const { uploadFile } = require('../controller/messageController');

const router = express.Router();

router.post('/send', sendMessageValidation, checkValidationMidd, sendMessage);
router.post('/sendFile', sendMessageValidation, checkValidationMidd, uploadFile);
router.get('/group/:groupId', getMessagesByGroupId);
router.get('/user/:sender_id/:reciever_id', getMessagesByUser);

module.exports = router;
