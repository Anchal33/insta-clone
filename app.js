require('dotenv').config();
const express=require('express');
const app=express();
const mongoose=require('mongoose');
const session=require('express-session');
const passport=require('passport');
const bodyParser=require('body-parser');
const User=require('./models/user');


passport.checkAuthentication= function(req, res, next) {
    if (req.isAuthenticated()) return next();
    else res.redirect('/login')
}

app.use(express.json());
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))


app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended : false}));
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


app.use(require("./routes/auth"));
app.use(require("./routes/post"))


mongoose.connect(process.env.MONGODB_URL,{ useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set("useCreateIndex",true);
mongoose.connection.on("connected",()=>console.log("mongodb connected"));
mongoose.connection.on("error",(err)=>console.log(err));


app.listen(process.env.PORT || 3000,()=>{
    console.log("Server is running");
})
