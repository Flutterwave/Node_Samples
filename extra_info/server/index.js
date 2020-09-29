import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
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

app.get('/css', (req, res) => {
  res.sendFile(__dirname + '/statics/main.css');
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
