//import required packages 
import fetch from "node-fetch";
import express from "express";
import path from 'path';
import bodyParser  from "body-parser";
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let app = express();
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'))

const port = 8080;

let scout=[]

app.use(express.static('public'))
/* Middleware ends here */

app.get('/home', (req, res)=>{
   /*  res.send('This is the home page') */
   //res.sendFile('index.html', {root: __dirname})

   res.sendFile(__dirname+'/public/index.html')
})

//POST request that will be called on button click in index.html form
app.post('/get_scoutid',async (req,res)=>{
    let id=req.body.id;
   
   //fetching of API data
       await fetch(
          `https://ssd-api.jpl.nasa.gov/scout.api?tdes=${id}&eph-start=now`
        )
          .then((response) => response.json())
          .then((data) => {
            scout=data;
          
       });
    res.redirect('/view_scoutid')
})

//get request that will render near_earth_object.ejs file and pass json data from Scout API to form
app.get('/view_scoutid',(req,res)=>{
    res.render(__dirname+'/views/near_earth_object.ejs',{scout:scout})
})

//Launching of localhost server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/home`);
});
