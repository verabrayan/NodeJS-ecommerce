const passport = require("passport");
const config = require("../config/index");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;


const authUser = (req, accesToken, refreshToken, profile, done) => {
  //console.log("Request",req)
  //console.log("AccesToken", accesToken);
  //console.log("RefreshToken",refreshToken)
  //console.log("Profile", profile);
  //console.log("Done",done)
  return done(null, {profile, accesToken});
};
passport.use(
  new GoogleStrategy(
    {
      clientID: config.google_client_id,
      clientSecret: config.google_client_secret,
      callbackURL: "http://localhost:4000/auth/google/callback",
      passReqToCallback: true,
    },
    authUser
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
