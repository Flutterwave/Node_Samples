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
        const data = await flutterwaveService.updateCustomerRecord(verifyTransaction.data.data.amountsettledforthistransaction, req.body.user)
     
      return res.status(200).json({
        status: 200,
        data,
      });

    } catch (error) {
      console.log(error)
      return res.status(400).json({
        status: 400,
        error: "Not verified",
      });
    }
  }

  static async Getbanks(req, res) {
    const query = "/NG" //pss NG, GH, KE
    try {
      const banks = await  axios({
        url: `https://api.flutterwave.com/v3/banks${query}`,
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SECRET_KEY}`,
        },
      })
     
      return res.status(200).json({
        status: 200,
        data: banks.data.data
      });

    } catch (error) {
      console.log(error)
      return res.status(400).json({
        status: 400,
        error: "Something went wrong",
      });
    }
  }

  static async SingleTransfer(req, res) {
    try {
      const tansfer = await  axios({
        url: `https://api.flutterwave.com/v3/transfers`,
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer FLWSECK-46635852fe75cd2c112f19fa8c3850b2-X`,
        },
        data: {...req.body.reqData}

      })
      const charge = Number(tansfer.data.data.amount)+ Number(tansfer.data.data.fee)
    
      const data = await flutterwaveService.updateCustomerRecord(charge, req.body.user, 'remove')

      console.log(data)
      return res.status(200).json({
        status: 200,
        data
      });

    } catch (error) {
      console.log(error)
      return res.status(400).json({
        status: 400,
        error: "Something went wrong",
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