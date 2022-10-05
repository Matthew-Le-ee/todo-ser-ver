import express from 'express'
import Cors from 'cors'
import mongoose from 'mongoose'
import List from './Database.js'
const app = express()

const connection = 'mongodb+srv://admin:0P69WIcwaAZwHLsR@cluster0.irljc9y.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(connection,{useNewUrlParser:true} ,()=> console.log("connect"));

const port = process.env.PORT || 8080;
app.use(express.json())
app.use(Cors());

app.listen(port,()=> console.log(`Listening on localhost ${port}`))

app.get('/', (req,res)=>{
    res.send(200).send("Hello ExpressJs");
})

app.get('/post',(req,res)=>{
    List.find((err,data)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).send(data);
        }
    })
})

app.post('/post', (req,res)=>{
    const data = req.body;
    List.create(data,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(201).send(data)
        }
    })
})

app.put('/post/:id', (req,res)=>{
   const id = req.params.id;
   console.log(id)
   const newText = req.body;
   console.log(newText)
   List.findByIdAndUpdate(id, newText, (err,data)=>{
    if(err){
        res.status(500).send(err)
    }
    else{
        res.status(200).send(data)
    }
   })
})

app.delete('/post/:id', (req,res)=>{
    const id = req.params.id;
    console.log(id)
    List.findByIdAndDelete(id, (err,data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})