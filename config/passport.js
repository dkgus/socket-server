const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;

module.exports = () => {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/auth/github/callback",
      },
      verifyCallback
    )
  );
};

function verifyCallback(accessToken, refreshToken, profile, done) {
  return done(null, profile);
}
