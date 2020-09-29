import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';
import fs from 'fs';


const app = express();
dotenv.config();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 3002;

app.get('/', (req, res) => {
    res.writeHead(200, {"Content-Type": "text/html"});
    fs.readFile("./index.html", null, (error, data) => {
        if(error) {
            res.writeHead(404);
            res.write("File not found")
        }else{
            res.write(data)
        }
        res.end()

    })
});

app.get('/standard-modal', async(req, res) => {
  try {
    const reqBody = {
      tx_ref: Date.now(),
      amount: 300,
      currency: "NGN",
      payment_options: 'card,mobilemoney,ussd',
      redirect_url: 
        "http://localhost:3002/",
      meta: {
        consumer_id: 3,
        consumer_mac: "wded-eewww111-eeww2",
      },
      customer: {
        email: "joel@gmail.com",
        phone_number: "07064586146",
        name: "Joel ugwumadu",
      },
      customizations: {
          title: 'Pay Joel',
          description: 'Payment for items in cart',
          logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
  
      },
    }

    const result = await axios({
      url: 'https://api.flutterwave.com/v3/payments',
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.SECRET_KEY}`,
      },
      data: reqBody
    })
    

   return res.status(200).json({
      status: 200,
      data: result.data.data,
    })
  
    
  } catch (error) {
    console.log(error)
    return res.json({
      data: error.message,
    })
   
    
  }
});


app.use(async (req, res) => {
  try {
    throw new Error('Route does not exist');
  } catch (error) {
    return res.status(error.status || 404).json({
      status: error.status || 404,
      error: error.message,
    });
  }
});

app.listen(PORT, () => console.log(`Welcome ${PORT}`));

export default app;
