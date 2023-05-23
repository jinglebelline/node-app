const express = require('express')
//let cors= require('cors')
const ve= require('./verifyEmail.js')

//const dotenv = require('dotenv')
//const locale= require('locale')
const devf=require('email-smtp-verificator') 
const app = express()
//dotenv.config()

app.use(express.urlencoded({extended:true}))
app.use(express.json())







app.get('/',(req,res)=>{
  
  res.send('Hello world :)')
 
})
app.get('/test/:email',async (req,res)=>{
  let email=req.params.email;
  console.log('testing...');
/*const verify=devf({port:465})
    let result= await verify(email)
    res.send(result)*/
  const isValid= await ve(email)
   res.send(isValid)

 
})





app.get('*', (req,res)=>{
  res.sendStatus(404);
  //res.sendFile(path.join(__dirname, 'build', 'index.html')); // for production
 
  
})

app.listen(process.env.PORT || 3001 , '0.0.0.0',
    ()=>{
        console.log('app is running!')
    })


  
