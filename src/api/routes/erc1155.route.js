const express = require('express');
const { balanceController, balanceBatchController, uriController, isApproveForAllController, setApprovalForAllController } = require('../controllers/erc1155.controller');
const router = express.Router();

router.get("/balance",balanceController);
router.get("/balanceBatch",balanceBatchController);
router.get("/uri",uriController);
router.get("/isApproveForAll",isApproveForAllController);
router.post("/setApproveFotAll",setApprovalForAllController);

module.exports = router;