const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()

app.use((req, res, next) => {
  console.log("=>  " + req.url);
  next();
});

app.use(cors())
app.use(cookieParser())
app.use(express.json());
app.use(require('body-parser').urlencoded({extended: false}))
app.use(express.static(path.resolve(__dirname, "../build")));

app.use('/api', require("../routes"))

app.get("*", (req, res)=>{
    if(process.env.NODE_ENV === 'production')
        return res.sendFile(path.resolve(__dirname, "../../../client/public/index.html"))

    res.json({message: 'No landing page in dev mode'})
})

module.exports = app
