
const express=require('express'); 
const router=express.Router();
const fs=require('fs');
const path = require('path');
const filepath=path.join(__dirname,'../data.json');
// const takefile=require('../controller/confile');



router.get('/students',takefile.getfile);


router.post('/students',takefile.post_file);



router.put('/students/:id',takefile.update_file);


router.delete('/students/:id',takefile.delete_file)







module.exports=router