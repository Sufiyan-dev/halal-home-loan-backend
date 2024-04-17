const express = require('express');
const { balanceController, balanceBatchController, uriController, isApproveForAllController, setApprovalForAllController } = require('../controllers/erc1155.controller');
const router = express.Router();

router.post("/balance",balanceController);
router.post("/balanceBatch",balanceBatchController);
router.post("/uri",uriController);
router.post("/isApproveForAll",isApproveForAllController);
router.post("/setApproveFotAll",setApprovalForAllController);

module.exports = router;