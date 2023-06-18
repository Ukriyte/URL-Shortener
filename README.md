# URL-Shortner

URL Shortner with multiple features 

## Demo


## Tech Stacks

**Client:** HTML, CSS, Bootstrap, JS, EJS

**Server:** Node, Express

**Database:** MongoDB

## Run Locally

Go to project directory

```bash
  cd URL Shortner
```

Clone the project

```bash
  git clone https://github.com/Ukriyte/URL-Shortner.git
```

Initialize package.json

```bash
  npm init -y
```

Install dependencies

```bash
  npm i mongoose express shortid ejs
```

Install node and mongodb compass on your device locally and add the path of there respective bin files to your device environment variables.
Note: Your mongodb application should be running in the background.

Edit the following code present in the beginning of server.js file and put the mongodb host url shown in mongodb compass

```bash
  //Mongo db connection
mongoose.connect('mongodb://127.0.0.1:27017', {
    useNewUrlParser: true, useUnifiedTopology: true
})

```
Start the server

```bash
  node .\server.js
```

Search the following in the browser and URL shortner will open up

```bash
  http://localhost:5000
```

## Working behind the URL Shortner

### URL Shrinking Mechanism:

Whenever a Long url with its description is added in the form and Create button is clicked, the backend handles that route
as a post route and Data is added to the database then the server redirects the browser to the initial page. Also the ShortURL is created using
a shortID generator on the backend. Check the following code for reference:

```bash
//Adding new data to database
app.post('/shortUrls', async (req,res)=>{
    await ShortUrl.create({ full: req.body.fullUrl, Notes: req.body.Notes})
    res.redirect('/')
    //Redirecting will invoke get request to original page and the newly
    //added data will be visible
})
```

### Database on frontend

Every get request to the initial page is rendered by the backend and all the ShortURLs and the data attached with them is send
This is put in form of a table using html, bootstrap. The for.each loop of is created using ejs.

### Redirecting of Short URLs to original URL

Whenever anyone searchs for a shortURL, the backend processes the get request. It searchs if the ShortUrl id is present in the database,
 if not then an error is returned. If it is present then the browser is redirected to the long URL. Also the number clicks is incremented and saved to database. This is done by the following piece of code:
 
 ```bash
 app.get('/:shortUrl', async (req,res) =>{
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl})
    if(shortUrl == null) return res.sendStatus(404)
    shortUrl.Clicks++
    shortUrl.save()
    res.redirect(shortUrl.full)
})
```
     
### Search Mechanism:

A search can be done on the basis of ShortUrl id, long URL and notes. Whenever the required field is put in the search box and search button is clicked,
the backend recieves a post request and checks for the input in all three parameters. If it does not find any matching object, it returns a NOT found error
If it is found then a new page is rendered(search.ejs) and all the information of the url is shown. Check the following code snippet for refernce:

```bash
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
```



