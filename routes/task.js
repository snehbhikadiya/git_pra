const { rejects } = require('assert');
const express=require('express');
const router=express.Router();
const fs=require('fs');
const { resolve } = require('path');
const path=require('path');
const path_file=path.join(__dirname,'../data.json');


router.put('student/:id',async(req,res)=>
{
    const {id}=req.params;
    const get_data=await readfile(path_file,'utf8');
    const data_parse=JSON.parse(get_data);
    const finde_data=data_parse.find(elm=>elm.id===id);
    console.log(finde_data);
    res.status(200).json({
        success:true,
        data:finde_data
    })


})

const readfile=(path,type)=>
{
    return new Promise((resolve,rejects)=>
    {
        fs.readFileSync(path,type,(err,data)=>
        {
            if(err)rejects (err)
            resolve(data);
        })
    })

}

module.exports=router