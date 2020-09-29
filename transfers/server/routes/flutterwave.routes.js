import express from 'express';
import flutterwaveController from '../controllers/flutterwave.controller';

const router = express.Router();

router.post('/verify', flutterwaveController.Verify);
router.get('/customers', flutterwaveController.Customers);
router.get('/transactions', flutterwaveController.Transactions);

export default router;
