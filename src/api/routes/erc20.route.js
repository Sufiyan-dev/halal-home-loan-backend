import express from 'express';
import { allowanceController, approveController } from '../controllers/erc20.controller.js';
const router = express.Router();

// router.get('/balance',verifyOtpOfUser);
router.get('/allowance',allowanceController);
router.post('/approve',approveController);

export default router;