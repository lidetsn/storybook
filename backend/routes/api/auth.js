const passport = require("passport");
const express = require("express");
const { session } = require("passport");
const app = express();

module.exports = app => {

  app.get("/auth/test", (req, res) => {
    res.send("Auth Working properly");
  });

  
app.get("/auth/users/user", (req,res)=>{
  
  if(req.user===undefined){
    res.json({isAutenticated:false});
}
else{
  res.json({isAutenticated:true});

}
})


  app.get(
         "/auth/google",
          passport.authenticate("google", {
          scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email"
          ]
    }),
    
  );

  app.get(
         "/auth/google/callback",
         passport.authenticate("google"),
         (req, res) => {
        // console.log("++++++++++++++++++++++++++++++++++++++")
        //  console.log(req)
          res.redirect("/dashboard");
    }
  );

  app.get("/api/logout", async (req, res) => {
   // console.log("======================")
   // console.log(req.user)
    await req.logout();
  //  console.log(req)
    req.session = null
   req.sessionCookies=null 
   // res.clearCookie('connect.sid') 
   // console.log(req.user)
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};

