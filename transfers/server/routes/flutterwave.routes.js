import express from 'express';
import flutterwaveController from '../controllers/flutterwave.controller';

const router = express.Router();

router.post('/verify', flutterwaveController.Verify);
router.get('/banks', flutterwaveController.Getbanks);
router.post('/single-transfer', flutterwaveController.SingleTransfer);
router.get('/transactions', flutterwaveController.Transactions);

export default router;
