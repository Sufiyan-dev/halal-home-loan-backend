const express = require('express');
const { allowanceController, approveController } = require('../controllers/erc20.controller.js');
const router = express.Router();

// router.get('/balance',verifyOtpOfUser);
router.get('/allowance',allowanceController);
router.post('/approve',approveController);

module.exports = router;