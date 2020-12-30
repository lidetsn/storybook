const express =require("express")
const connectDb=require("./config/db")
const dotenv=require("dotenv")
const passport = require("passport");
const cookieSession = require("cookie-session");


const app=express()
dotenv.config()
connectDb()

app.use(express.json())
app.use(express.urlencoded({extended:true}))


require("./model/User.js");
require("./config/passport");

const PORT =process.env.PORT||5050

app.use(
      cookieSession({
           name:"mySession",
           maxAge: 30 * 24 * 60 * 60 * 1000,
           keys: ["somesecretsauce"]
  })
);

//require("./model/user.js");
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());



require("./routes/api/auth.js")(app);
app.use("/api/posts/",require("./routes/api/postRoutes") )
app.use("/api/stories/",require("./routes/api/stories") )




app.listen(PORT,()=>{
          console.log(`app is now running at http://localhost:${PORT}`)
})