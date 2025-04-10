const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const router = express.Router();
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get("/:provider/callback", (req, res, next) => {
  const provider = req.params.provider;

  passport.authenticate(provider, { session: false }, (err, user) => {
    if (err || !user) return res.redirect("/login?error=true");

    const token = jwt.sign(
      {
        id: user.id,
        provider: provider,
        displayName: user.displayName,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.redirect(`${process.env.GITHIB_REDIRECT_URL}?token=${token}`);
  })(req, res, next);
});

module.exports = router;
