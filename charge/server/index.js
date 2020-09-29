import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import axios from 'axios';
import {encrypt3Des} from './helpers'



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

app.get('/card', (req, res) => {
    res.writeHead(200, {"Content-Type": "text/html"});
    fs.readFile("./card.html", null, (error, data) => {
        if(error) {
            res.writeHead(404);
            res.write("File not found")
        }else{
            res.write(data)
        }
        res.end()

    })
});

app.get('/account', (req, res) => {
    res.writeHead(200, {"Content-Type": "text/html"});
    fs.readFile("./account.html", null, (error, data) => {
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
    const reqBody = JSON.stringify({
      ...req.body
  })
   
    const encryptPost = await encrypt3Des(  process.env.ENCRYPTION_KEY, reqBody )
    const result = await axios({
      url: "https://api.flutterwave.com/v3/charges?type=card",
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.SECRET_KEY}`,
      },
      data: {client: encryptPost}
    })
    // console.log(result.data)

   return res.status(200).json({
      status: 200,
      data: result.data,
    })
    
  } catch (error) {
    console.log(error)
    if(error.response){
      return res.json({
        data: error.response.data,
      })

    }else{
      return res.json({
        data: error,
      })
    }
  
    
  }
});

app.post('/charge-bank', async(req, res) => {
  try {
  //   const reqBody = JSON.stringify({
  //     ...req.body
  // })
   
    const result = await axios({
      url: "https://api.flutterwave.com/v3/charges?type=debit_ng_account",
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.SECRET_KEY}`,
      },
      data: {...req.body}
    })
    // console.log(result.data)

   return res.status(200).json({
      status: 200,
      data: result.data,
    })
    
  } catch (error) {
    console.log(error)
    if(error.response){
      return res.json({
        data: error.response.data,
      })

    }else{
      return res.json({
        data: error,
      })
    }
  
    
  }
});

app.post('/validate', async(req, res) => {
  try {
    const result = await axios({
      url: "https://api.flutterwave.com/v3/validate-charge",
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.SECRET_KEY}`,
      },
      data: {...req.body}
    })

   return res.status(200).json({
      status: 200,
      data: result.data,
    })
    
  } catch (error) {
    console.log(error)
    if(error.response){
      return res.json({
        data: error.response.data,
      })

    }else{
      return res.json({
        data: error,
      })
    }
  
    
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
