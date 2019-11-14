import '@babel/polyfill'
import express from 'express'
import bodyparser from 'body-parser'
import cors from 'cors'
import routes from './routes'
import { MongoClient } from 'mongodb'
import io from 'socket.io'
import './globals'

const app = express()
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
app.use(cors())
  
app.use('/user-daily-task/v1/' ,routes)

const URI = "mongodb+srv://srinu:12a21f0028@cluster0-0p13a.mongodb.net/user-task?retryWrites=true&w=majority"

MongoClient.connect(URI, {
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
  socket = io(
      app.listen(process.env.PORT || 3030,  ()=>{
            require('./services/Socket/index')
            if(process.env.PORT){
                console.log("Live Port Now default port::" )  
            }
            else{
                console.log("Live Port Now ",3030)
            }         
        })
    )
});
