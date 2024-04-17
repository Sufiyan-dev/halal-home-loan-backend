const express = require('express');
const { allowanceController, approveController, balanceController, symbolController } = require('../controllers/erc20.controller.js');
const router = express.Router();

router.post('/balance',balanceController);
router.post('/allowance',allowanceController);
router.post('/symbol',symbolController);
router.post('/approve',approveController);

module.exports = router;