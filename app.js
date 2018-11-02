const express = require('express');
const app = express();
const Joi = require('joi');
const cors = require('cors'); 
var bodyParser = require('body-parser')
let mongoose = require('mongoose');
let qrs = require('./models');
// app.use(cors());
app.use(bodyParser.json());
app.use(cors({origin: 'http://localhost:4200'}));

// res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200' );

const url = "mongodb://bejoyrosily:survey1@ds149279.mlab.com:49279/survey1";

const db = mongoose.connect(url,
    function (err, db) {
    if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
    console.log('Connection established to', url);
    }
    },{ useNewUrlParser: true });

// const db = mongoose.connect("mongodb://localhost:27017/survey2", (error)=>{
//     if(error){
//         console.log(error);
//         return;
//     } 
//     console.log('connection successful');
// });

app.get('/api/questions',(req,res)=>{
    // console.log("received ...");
    qrs.
    find({})
    .then(doc =>{
        res.send(doc);
    })
    .catch(err=>{
        console.error(err);
    })
})

app.get('/api/questions/edit/:id',(req,res)=>{
    // console.log("received ...");
    qrs.
    findOne({_id:req.params.id})
    .then(doc =>{
        res.send(doc);
        console.log(doc);
    })
    .catch(err=>{
        console.error(err);
    })
})

app.post('/api/questions/add', (req,res)=>{
    console.log(req.body)
    const schema = {
        _id: Joi.string(),
        question:Joi.string().required(),
        option1: Joi.string().required(),
        option2: Joi.string().required(),
        option3: Joi.string().required(),
        option4: Joi.string().required(),        
    };

    const result = Joi.validate(req.body,schema);

    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    // else{
    //     console.log("Schema is OK")
    // }
    
    var question = new qrs({
        question: req.body.question,
        option1 : req.body.option1,
        option2 : req.body.option2,
        option3 : req.body.option3,
        option4 : req.body.option4,
    })

    question.save()
    .then(doc =>{
        console.log(doc);
        res.send(doc);
    })
    .catch(err=>{
        console.error(err);
    });
})

app.delete('/api/questions/delete/:id', (req,res)=>{
    console.log("req.params.id");    
    qrs.deleteOne({_id:req.params.id}, (err,deletedItem)=>{
        console.log(req.params.id)
        if(err){
            console.log(err);
            return;
        }
        else{
            console.log("deleted successfully");
            // res.send("done");
        }
        
    });   
})

app.put('/api/questions/edit/:id', (req,res)=>{
    
        
    const schema = {
        _id: Joi.string(),
        question:Joi.string(),
        option1: Joi.string(),
        option2: Joi.string(),
        option3: Joi.string(),
        option4: Joi.string(),  
        __v: Joi.number(),      
    };

    const result = Joi.validate(req.body,schema);

    if(result.error){
        res.status(400).send(result.error.details[0].message);
        console.log(result.error.details[0].message);
        return;
    };

    console.log("receivedd...")
    qrs.update({_id:req.params.id},req.body,{new : true}, (err,deletedItem)=>{
        console.log(req.body)
        if(err){
            console.log(err);
            return;
        }
        else{
            console.log("updated successfully");
            //res.send('default');
        }
        
    });   
})

const port =process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`Listening to port ${port}`);
    });
    

// app.listen(3000,()=>console.log('Listening on port 3000..'))
    