const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const ExpressError = require('./utils/ExpressError');
const flash = require('connect-flash');
const session = require('express-session')
const passport = require('passport')
const User = require('./models/user')
const Host = require('./models/admin')
const Message = require('./models/message')

const LocalStrategy = require('passport-local')
const mongoSanitize = require('express-mongo-sanitize');




//login route
const userRoutes = require('./routes/users')
const detailsRoutes = require('./routes/details')
const MongoDBStore = require("connect-mongo")(session);

const dbUrl = 'mongodb+srv://sans:bowbow@codefury.gkzbe.mongodb.net/codefury?retryWrites=true&w=majority' ; 
//const dbUrl = 'mongodb://localhost:27017/codefuryyy' ; 


mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true, 
    useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))


var http = require("http").Server(app);
var io = require("socket.io")(http);

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public'))); //used as one of  boilerplate scripts
app.use(mongoSanitize({
    replaceWith: '_' //not necessary 
}))

const secret =  'thisshouldbeabettersecret!';

const store = new MongoDBStore({
    url: dbUrl,
    secret,
    touchAfter: 24 * 60 * 60
});

store.on("error", function (e) {
    console.log("SESSION STORE ERROR", e)
})

const sessionConfig = { 
    name: 'session' , 
    secret  , //change this later ..
    resave: false , 
    saveUninitialized : true , 
    cookie: {
        httpOnly: true , 
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session()); 
passport.use(new LocalStrategy(User.authenticate())) ;

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); 


app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/' , userRoutes);
app.use('/' , detailsRoutes);

app.get('/', (req, res) => {
    Host.find({},function(err,found){
        //console.log(found)
        if(err)console.log(err)
        else     res.render('chat',{categories:found[0].categories})

    })
  
});

io.on("connection", () =>{
    console.log("a user is connected")
   })

app.get('/messages', (req, res) => {

        Message.find({userid:req.query.id},(err, messages)=> {
            if(err)res.send(err)
            else res.send(messages);
          })

    
  })

  app.post('/messages/:id/:name', (req, res) => {
   
    var message = new Message({name:req.params.name,message:req.body.message,userid:req.params.id});
    message.save((err) =>{
      if(err)
        sendStatus(500);
        io.emit('message', message);
      res.sendStatus(200);
    })
  })

app.all('*' , (req, res, next) => {
    next(new ExpressError('Page Not Found' , 404))
})


app.use((err, req, res, next) => {
    const {statusCode = 500} = err ;
    if(!err.message) err.message = "Something Doesn't Seem right!!";
    res.status(statusCode).render('error' , {err})
});

const port = process.env.PORT || 3000 ;

var server = http.listen(3000, () => {
    console.log('server is running on port', server.address().port);
  });

// app.listen(port, () => {
//     console.log(`Serving on port ${port}`)
// })