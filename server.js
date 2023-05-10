const express=require('express');
const cors=require('cors');
const app = express();
app.use(cors({
    origin:"*"
}))


const bodyParser = require('body-parser');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sellerstock = require('./models/SellerStock');
var http = require('http');


const sequelize=require('./helper/database');
const userActionsRoutes=require('./routes/userActions');

app.use(userActionsRoutes);

sequelize
.sync()
.then(result=>{
    console.log(result)
    console.log("DB CONNECTED")
    app.listen(2000,()=>console.log('server running...'));})
.catch(err=>{
    console.log(err);
});


