import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import axios from 'axios';



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


app.post('/charge', async(req, res) => {
  try {
    const reqBody = {
      currency: "NGN",
      token: req.body.token,
      country: "NG",
      amount: 100,
      email: "joel@gmail.com",
      first_name: "Joel",
      last_name: "Ugwumadu",
      tx_ref: Date.now()
    }

    const result = await axios({
      url: "https://api.flutterwave.com/v3/tokenized-charges",
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
  
    return res.json({
      data: error.response.data,
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
