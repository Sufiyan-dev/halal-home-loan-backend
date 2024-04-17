const express = require('express');
const { allowanceController, approveController, balanceController, symbolController } = require('../controllers/erc20.controller.js');
const router = express.Router();

router.get('/balance',balanceController);
router.get('/allowance',allowanceController);
router.get('/symbol',symbolController);
router.post('/approve',approveController);

module.exports = router;