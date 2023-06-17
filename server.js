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
app.post('/search', async (req,res) =>{
    const temp1 = await shortUrl.findOne({Notes : req.body.searchInput}) 
    if(temp1==null){
        const temp2 = await shortUrl.findOne({short : req.body.searchInput}) 
        if(temp2==null){
            const temp3 = await shortUrl.findOne({full : req.body.searchInput})
            if(temp3==null){
                return res.sendStatus(404)
            }
            else{
                res.render('search', {longsearch1: temp3.full, longsearch2: temp3.short,
                    longsearch3: temp3.Clicks, longsearch4: temp3.Notes });
                } 
        }
        else{
            res.render('search', {longsearch1: temp2.full, longsearch2: temp2.short,
                longsearch3: temp2.Clicks, longsearch4: temp2.Notes });
            }
    }
    else{
        res.render('search', {longsearch1: temp1.full, longsearch2: temp1.short,
            longsearch3: temp1.Clicks, longsearch4: temp1.Notes });
        }
    
})
//1 route for three different parameters


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
