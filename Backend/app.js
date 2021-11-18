const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
//authjwt middleware
const authjwt = require('./helperfiles/authjwt');
const errors = require('./helperfiles/errors');




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
app.options('*', cors());
app.use(authjwt());
app.use(errors);
app.use('/resources/uploads',express.static(__dirname+'/resources/uploads'));



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






//routes
// const authRoute = require('./routes/auth');
// const userRoute = require('./routes/user');
// const categoryRoute = require('./routes/category');
// const productRoute = require('./routes/product');
// const orderRoute = require('./routes/order');
// const cartRoute = require('./routes/cart');
// const addressRoute = require('./routes/address');
// const paymentRoute = require('./routes/payment');
// const reviewRoute = require('./routes/review');
// const wishlistRoute = require('./routes/wishlist');
// const adminRoute = require('./routes/admin');
// const adminCategoryRoute = require('./routes/adminCategory');
// const adminProductRoute = require('./routes/adminProduct');
// const adminOrderRoute = require('./routes/adminOrder');
// const adminUserRoute = require('./routes/adminUser');
// const adminReviewRoute = require('./routes/adminReview');
// const adminAddressRoute = require('./routes/adminAddress');
// const adminPaymentRoute = require('./routes/adminPayment');
// const adminWishlistRoute = require('./routes/adminWishlist');


