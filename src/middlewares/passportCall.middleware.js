import passport from "passport";

export const passportCall = (strategy) => {
  return (req, res, next) => {

    passport.authenticate(strategy, (err, user, info) => {

      if (err) return next(err);
      if (!user) return res.status(401).json({ status: "error", msg: info.message });

      req.user = user;
      next();
    })(req, res, next)

  }
}