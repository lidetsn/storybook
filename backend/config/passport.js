const mongoose = require("mongoose");
const User = mongoose.model("users");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;




passport.use(
          new GoogleStrategy(
                    {
                      
                      clientID: process.env.GOOGLE_CLIENT_ID,
                      clientSecret:process.env.GOOGLE_CLIENT_SECRET,
                      callbackURL: "/auth/google/callback",
                      proxy: true
                    },

                    (accessToken, refreshToken, profile, done) => {
                        //  console.log("===profle===from config")
                        //  console.log(profile);
                        User.findOne({ googleId: profile.id }).then(existingUser => {
                              if (existingUser) {
                                  done(null, existingUser);
                              } else {
                                new User({
                                  googleId: profile.id,
                                  displayName: profile.displayName,
                                  firstName: profile.name.givenName,
                                  lastName: profile.name.familyName,
                                  email: profile.emails[0].value,
                                  image: profile.photos[0].value,
                                })
                                  .save()
                                  .then(user => done(null, user));
                              }
                            });
                    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
          User.findById(id).then(user => {
         done(null, user);
      });
});
