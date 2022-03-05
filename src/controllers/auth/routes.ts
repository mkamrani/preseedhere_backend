import { Router } from "express";
import passport from "passport";

const router = Router();
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["profile", "email"] })
);

router.get(
  "/twitter",
  passport.authenticate("twitter", { scope: ["profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect:
      process.env.CLIENT_GOOGLE_REDIRECT_URL || "http://localhost:8000/",
    failureRedirect:
      process.env.CLIENT_LOGIN_FAIL_REDIRECT_URL ||
      "http://localhost:8000/login_failed",
  }),
  (req, res) => {
    res.redirect(
      process.env.CLIENT_GOOGLE_REDIRECT_URL || "http://localhost:8000/"
    );
  }
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect:
      process.env.CLIENT_GITHUB_REDIRECT_URL || "http://localhost:8000/",
    failureRedirect:
      process.env.CLIENT_LOGIN_FAIL_REDIRECT_URL ||
      "http://localhost:8000/login_failed",
  }),
  (req, res) => {
    res.redirect(
      process.env.CLIENT_GITHUB_REDIRECT_URL || "http://localhost:8000/"
    );
  }
);
router.get(
  "/twitter/callback",
  passport.authenticate("twitter", {
    successRedirect:
      process.env.CLIENT_GITHUB_REDIRECT_URL || "http://localhost:8000/",
    failureRedirect:
      process.env.CLIENT_LOGIN_FAIL_REDIRECT_URL ||
      "http://localhost:8000/login_failed",
  }),
  (req, res) => {
    res.redirect(
      process.env.CLIENT_GITHUB_REDIRECT_URL || "http://localhost:8000/"
    );
  }
);

// router.get(
//   "/twitter/callback",
//   passport.authenticate("twitter", {
//     successRedirect:
//       process.env.CLIENT_LOGIN_SUCCESS_REDIRECT_URL || "http://localhost:8000/",
//     failureRedirect:
//       process.env.CLIENT_LOGIN_FAIL_REDIRECT_URL ||
//       "http://localhost:8000/login_failed",
//   }),
//   (req, res) => {
//     res.redirect(
//       process.env.CLIENT_LOGIN_SUCCESS_REDIRECT_URL || "http://localhost:8000/"
//     );
//   }
// );

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(
    process.env.CLIENT_LOGOUT_REDIRECT_URL || "http://localhost:8000/news"
  );
});

export default router;
