const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const moongose = require('mongoose')
const PORT = process.env.PORT||5000;
require('./Employee')

app.use(bodyParser.json())


const Employee = moongose.model('employee')
const mongouri = "mongodb+srv://himanshu:handsomehunk@cluster0.dzzjm.mongodb.net/<dbname>?retryWrites=true&w=majority"

moongose.connect(mongouri,{
    useNewUrlParser:true
})

moongose.connection.on("connected",()=>{
    console.log("connected mongo yeah")
})

moongose.connection.on("error",(err)=>{
    console.log("error",err)
})
app.get('/',(req,res)=>{
    Employee.find({}).then(data=>{
        res.send(data)
    }).catch(err=>{
        console.log(err)
    }) 

})
app.post('/send-data',(req,res)=>{
    const employee = new Employee({
        name:req.body.name,
        email:req.body.email,
        salary:req.body.salary,
        position:req.body.position,
        phone:req.body.phone,
        picture:req.body.picture
    })
    employee.save()
    .then(data=>{
        console.log(data)
    }).catch(err=>{
        console.log(err)
    })   
})

app.post('/delete',(req,res)=>{
    Employee.findByIdAndRemove(req.body.id)
    .then(data=>{
        console.log(data)
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })   
})
app.post('/update',(req,res)=>{
    Employee.findByIdAndUpdate(req.body.id,{
        name:req.body.name,
        email:req.body.email,
        salary:req.body.salary,
        position:req.body.position,
        phone:req.body.phone,
        picture:req.body.picture
    }).then(data=>{
        console.log(data)
        res.send(data)
    }).catch(err=>{
        console.log(err)
    }) 
})
app.listen(3000,()=>{
    console.log("server running")
})



// "name":"ram",
        // "email":"ran@ran",
        // "salary":"10 lpa",
        // "position":"web dev",
        // "phone":"",
        // "picture":""