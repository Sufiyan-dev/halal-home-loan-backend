const express = require('express');
const { ownerController, projectTokenController, paymentTokenController, currentProjectIdController, projectInfoController, investInProjectController, devestFromProjectController, purchaseResaleTokensController, addTenantPaymentController, quoteController } = require('../controllers/projectManager.controller');
const router = express.Router();

router.get("/owner",ownerController);
router.get("/projectToken",projectTokenController);
router.get("/paymentToken",paymentTokenController);
router.get("/currentProjectId",currentProjectIdController);
router.get("/paused",);
router.get("/projectInfo",projectInfoController);
router.post("/investInProject",investInProjectController);
router.post("/devestFromProject",devestFromProjectController);
router.post("/purchaseResaleTokens",purchaseResaleTokensController);
router.post("/addTenantPayment",addTenantPaymentController);
router.get("/quote",quoteController);

router.post("/admin/initiateProject",);
router.post("/admin/startProject",);
router.post("/admin/updateTargetAmount",);
router.post("/admin/updateInitialSupply",);
router.post("/admin/withdrawFund",);


module.exports = router;