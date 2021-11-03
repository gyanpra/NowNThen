const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');


const api = process.env.API_URL;


//database connection
const url = "mongodb+srv://gyanp:TxciYgPz6kYbI0rN@cluster0.9vpye.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(url, connectionParams)
    .then(() => {
        console.log('Connected to database ')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

app.use(express.json())


//setting up cors
app.use(cors());
app.options('*', cors())


//Routes

const categoriesRouter = require('./routes/category');
const usersRouter = require('./routes/user');
const ordersRouter = require('./routes/order');
const productsRouter = require('./routes/product');

app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/users`, usersRouter);
app.use(`${api}/orders`, ordersRouter);
app.use(`${api}/products`, productsRouter);



//app.listen at port 3000

app.listen(3000, () => {
    console.log(api);
    console.log("Server is running at http://localhost:3000");
})



