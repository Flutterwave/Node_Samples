import dotenv from 'dotenv';
import axios from 'axios';

import flutterwaveService from '../services/flutterwave.services';

dotenv.config();

class UserController {
 
  static async Verify(req, res) {
    try {
      
      const verifyTransaction = await  axios({
        url: "https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaidx/api/v2/verify",
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({txref: req.body.txref, SECKEY: process.env.SECRET_KEY})
      })
        await flutterwaveService.addCustomerRecord(verifyTransaction.data.data)
        await flutterwaveService.addTransactionRecord(verifyTransaction.data)
     
      return res.status(200).json({
        status: 200,
        data: "verifyTransaction.data"
      });

    } catch (error) {
      console.log(error)
      return res.status(400).json({
        status: 400,
        error: "Not verified",
      });
    }
  }

  static async Customers(req, res) {
    try {
      
      const getCustomers =   await flutterwaveService.getCustomerRecord()
     
      return res.status(200).json({
        status: 200,
        data: getCustomers
      });

    } catch (error) {
      console.log(error)
      return res.status(400).json({
        status: 400,
        error: "Not verified",
      });
    }
  }

  static async Transactions(req, res) {
    try {
      
      const getTransactions =   await flutterwaveService.getTransactionRecord()
     
      return res.status(200).json({
        status: 200,
        data: getTransactions
      });

    } catch (error) {
      console.log(error)
      return res.status(400).json({
        status: 400,
        error: "Not verified",
      });
    }
  }
}
export default UserController;