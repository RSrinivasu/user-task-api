import '@babel/polyfill'
import express from 'express'
import bodyparser from 'body-parser'
import routes from './routes'
import { MongoClient } from 'mongodb'

import './globals'

const app = express()
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
app.use( (req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use('/user-daily-task/v1/' ,routes)


const URL = "mongodb+srv://srinu:12a21f0028@cluster0-0p13a.mongodb.net/user-task?retryWrites=true&w=majority"

MongoClient.connect(URL, {
                    native_parser:true,
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    poolSize: 10, ssl: true},function(err, database) {
  if(err){
      console.log(err); 
      throw err
  }
  
  mongo_db = database.db();
  // Start the application after the database connection is ready
  app.listen(3030,  ()=>{
        console.log("Live Port Now",3030)
    })
});

