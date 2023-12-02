
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}


const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const IndexRouter = require('./Routes/index')
const authorsRouter = require('./Routes/authors')
const booksRouter = require('./Routes/books')

const mongoose = require('mongoose')

const PORT = process.env.PORT || 5000;
const DB_KEY = process.env.DATABASE_URL;
const app = express();

app.set('view engine','ejs')
app.set('views',__dirname+'/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({limit:'50mb' , extended: false}))

mongoose
  .connect(DB_KEY, { useNewUrlParser: true })
  .then(() => console.log("Connected to Mongo...."))
  .catch((error) => console.log(error.message));




app.use('/',IndexRouter);
app.use('/authors',authorsRouter);
app.use('/books',booksRouter);

app.listen(PORT);
console.log(`App is listening at Port ${PORT} `);



