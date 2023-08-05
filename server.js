
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}


const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const IndexRouter = require('./Routes/index')
const authorsRouter = require('./Routes/authors')
const bodyParser = require('body-parser')


const mongoose = require('mongoose')

const PORT = process.env.PORT || 8080;

const app = express();

app.set('view engine','ejs')
app.set('views',__dirname+'/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit:'20mb' , extended:false}))
mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser:true
});

const db = mongoose.connection
db.on('error', error=>console.error(error))
db.on('open', ()=>console.log('Connected to Mongoose'))



app.use('/',IndexRouter);
app.use('/authors',authorsRouter);


app.listen(PORT);
console.log(`App is listening at Port ${PORT} `);



