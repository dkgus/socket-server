const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;

module.exports = () => {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_SERVER_CALLBACK_URL,
      },
      verifyCallback
    )
  );
};

function verifyCallback(accessToken, refreshToken, profile, done) {
  return done(null, profile);
}
