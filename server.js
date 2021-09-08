const express=require('express')
const app=express();
const mongoose=require('mongoose');
require('dotenv').config()
const Document=require('./models/Document');
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended:true})) 
mongoose.connect(`mongodb+srv://shubham_user:${process.env.DATABASE_PASSWORD}@cluster0.xxeot.mongodb.net/my_database?retryWrites=true&w=majority`,
{useUnifiedTopology:true,useNewUrlParser:true})
app.get('/',(req,res)=>{
    const code=`Welcome to Wastebin
    
Use the commands in the top right corner
to create a new file to share with others`
    res.render('code-display',{code,language:'plaintext'});
})
app.get('/new',(req,res)=>{
    res.render("new",{canSave:true})
})
app.post('/save',async (req,res)=>{
 const value=req.body.value;
 try{
        const document=await Document.create({value});
        res.redirect(`/${document.id}`)
 }
 catch(e)
 {   console.log(e);
     res.render("new",{value});
 }
})
app.get('/:id',async (req,res)=>{
    const id=req.params.id;
    try{
      const document=await Document.findById(id);
      res.render('code-display',{code:document.value,id})
    }
    catch(e)
    {
        res.redirect('/');
    }
})
app.get('/:id/duplicate',async (req,res)=>{
    const id=req.params.id;
    try{
      const document=await Document.findById(id);
      res.render('new',{value:document.value,canSave:true})
    }
    catch(e)
    {
        res.redirect(`/${id}`);
    }

})
app.listen(3001,()=>{
    console.log("running");
});