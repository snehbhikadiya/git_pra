const express=require('express');
const app=express();
const router=require('./routes/task')


app.use(express.json({limit:"23mb"}))
app.use('api2',router);

app.listen(4003,()=>
{
    console.log("start");
})