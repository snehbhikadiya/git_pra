const express=require('express');
const app=express();
const router=require('./routes/index');

app.use(express.json({limit:"500mb"}))
app.use('/api',router)


app.listen(32000,()=>
{
    console.log("server start");
})

