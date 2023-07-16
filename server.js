
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}


const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const IndexRouter = require('./Routes/index')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 5000;

const app = express();

app.set('view engine','ejs')
app.set('views',__dirname+'/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser:true
});

const db = mongoose.connection
db.on('error', error=>console.error(error))
db.on('open', ()=>console.log('Connected to Mongoose'))


app.use('/',IndexRouter);

app.listen(PORT);
console.log(`app is listening at port ${PORT}`)
