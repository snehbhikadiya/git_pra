const fs=require('fs');

    exports.getfile=async(req,res,next)=>{   
    //   const data= fs.readFileSync('./data.json','utf-8')
        const students=await readFile('./data.json','utf8')
      const result=JSON.parse(students);
      res.status(200).json({
        success:true,
        data:result,
        message:"students retrived successfuly"
      })
    }


    exports.post_file=async(req,res,next)=>
    { try{
      const { id,name,age,sem }=req.body
    
      const student={
        id,
        name,
        age,
        sem
      };
    
      const takefile=await readFile('./data.json','utf8');
    
      const parse_stu=JSON.parse(takefile);
    
      console.log(parse_stu);
    
      const student_position=parse_stu.at(-1);
    
      const  last_id=student_position.id;
    
      const new_id=+last_id + 1;
    
      student.id=String(new_id);
    
      parse_stu.push(student);
    
      const student_stringify=JSON.stringify(parse_stu);
    
      const write_student=await writefile('./data.json',student_stringify);
    
      res.status(200).json({
        success:true,
        data:write_student,
        massage:"data added successfuly"
      })
     
    }
    catch(err)
    {
      console.log("error");
      res.status(200).json({
        success:false,
        message:"student unsuccessfuly"
      })
    }}


exports.update_file=async(req,res)=>
{ 
  try{
    const{id}=req.params;
   

    const read_file=await readFile(filepath,'utf8');
  
    const parse_stu=JSON.parse(read_file);

    const get_stu=parse_stu.at(req.params.id -1);
  
    const student=parse_stu.find(elm=>elm.id  === id);
 
    if(!student){return res.status(404).json({message:"not find data",success:false})};
    
    const indexof=parse_stu.findIndex(student=>student.id === id)
  
     const update_stu={
      id:student.id,
      name:req.body.name,
      sem:req.body.sem
     }
     
     parse_stu.splice(indexof,1,update_stu);
  
     const data_stringfy=JSON.stringify(parse_stu);
  
     await writefile(filepath,data_stringfy);

     return res.status(200).json({success : true,data:get_stu,message :' student updated successfully'})
  }
  catch(error){

    return res.status(404).json({
      success:true,
      message:error.message
    });
}};


exports.delete_file=async(req,res)=>
{
  try{
    const {id}=req.params;

    const read=await readFile(filepath,'utf8');

    const read_per=JSON.parse(read);

    const find=read_per.find(elm=>elm.id===id);

    if(!find){res.status(200).json({success:false,message:"not find"})};
    

   const find_Index=read_per.findIndex((find)=>find.id===id);
    // console.log(find_Index);


     const store= read_per.splice(find_Index,1,find_Index);
      // console.log(pop_data);
     
      const stri=JSON.stringify(read_per);

      await writefile(filepath,stri);

      return req.status(200).json({success:true,message:"deleted"});

  }
  catch(error)
  {

    return res.status(200).json({success:false,message:"not"});
  }
  

}


const readFile = (path,type) =>{
    return new Promise((resolve,reject)=>
    {
        fs.readFile(path,type, (err,data) =>{
                if(err)
                {
                    return reject(err)
                }
                return resolve(data);
                
        })

    })
}






const writefile=(path,type)=>
{
    return new Promise((resolve,reject)=>
    {
      fs.writeFile(path,type,(err,data)=>
      {
            if(err)
            {
              return reject(err)
            }
            else
            return resolve(data);
      })
    })
}



