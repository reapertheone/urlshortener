const express=require('express')
const app=express()
const mongoose=require('mongoose')
const path=require('path')
const ejs=require('ejs')
const Url = require('./models/url');

const bp=require('body-parser')

app.listen(3000)




app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


mongoose.connect('mongodb://localhost:27017/urlshort', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

app.get('/',(req,res)=>{
    res.render('index')
})

app.post('/add',async (req,res)=>{
    const saving=await new Url(req.body)
        await saving.save()
        res.redirect(`/done/${saving._id}`)

})

app.get('/done/:id',async (req,res)=>{
    
   result=await  Url.findById(req.params.id)
   res.render('done',result)

})


app.get('/:word',async (req,res)=>{
    const result=await Url.findOne({word:req.params.word})
    const realURL=result.url
    //res.send(realURL)
    res.redirect(`${realURL}`)
})