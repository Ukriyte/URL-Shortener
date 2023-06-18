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
