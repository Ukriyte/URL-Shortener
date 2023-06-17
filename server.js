//imports
const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl')
const shortUrl = require('./models/shortUrl')
const app = express()

//Mongo db connection
mongoose.connect('mongodb://127.0.0.1:27017', {
    useNewUrlParser: true, useUnifiedTopology: true
})


app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}))

//index page with all the posted shortUrls in table
app.get('/', async (req,res)=>{
    const shortUrls = await ShortUrl.find()
    res.render('index', { shortUrls: shortUrls})
})

//Adding new data to database
app.post('/shortUrls', async (req,res)=>{
    await ShortUrl.create({ full: req.body.fullUrl, Notes: req.body.Notes})
    res.redirect('/')
    //Redirecting will invoke get request to original page and the newly
    //added data will be visible
})

//Sending search request to backend from searchInput field and finding matching
//value in database and rendering new site with link that was searched for
app.post('/search1', async (req,res) =>{
    const temp = await shortUrl.findOne({Notes : req.body.searchInput1}) 
    if(temp==null){
        return res.sendStatus(404)
    }
    else{
    res.render('search', {longsearch1: temp.full, longsearch2: temp.short,
        longsearch3: temp.Clicks, longsearch4: temp.Notes });
    }
})

app.post('/search2', async (req,res) =>{
    const temp = await shortUrl.findOne({short : req.body.searchInput2}) 
    if(temp==null){
        return res.sendStatus(404)
    }
    else{
    res.render('search', {longsearch1: temp.full, longsearch2: temp.short,
        longsearch3: temp.Clicks, longsearch4: temp.Notes });
    }
})

app.post('/search3', async (req,res) =>{
    const temp = await shortUrl.findOne({full : req.body.searchInput3}) 
    if(temp==null){
        return res.sendStatus(404)
    }
    else{
    res.render('search', {longsearch1: temp.full, longsearch2: temp.short,
        longsearch3: temp.Clicks, longsearch4: temp.Notes });
    }
})

//3 routes for 3 search boxes

//When the shorturl is searched for, this will be invoked and if the shortUrl exists
//then clicks will be incremented by one and saved to database
//Finally the browser will be redirected towards the original full link
app.get('/:shortUrl', async (req,res) =>{
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl})
    if(shortUrl == null) return res.sendStatus(404)

    shortUrl.Clicks++
    shortUrl.save()
    res.redirect(shortUrl.full)
})


app.listen(process.env.PORT || 5000)
