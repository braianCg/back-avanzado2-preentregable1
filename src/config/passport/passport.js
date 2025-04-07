import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { userModel } from "../../persistence/mongo/models/use.model.js";
import { comparePassword } from "../../utils/hasPassword.js";

const JWT_SECRET = process.env.JWT_SECRET || "secretKey";

passport.use(
    "login",
    new LocalStrategy(
        { usernameField: "email", passwordField: "password" },
        async (email, password, done) => {
            try {
                const user = await userModel.findOne({ email });
                if (!user) return done(null, false, { message: "Usuario no encontrado" });

                const isPasswordValid = comparePassword(password, user.password);
                if (!isPasswordValid) return done(null, false, { message: "Contraseña inválida" });

                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);

passport.use(
    "jwt",
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: JWT_SECRET,
        },
        async (jwtPayload, done) => {
            try {
                const user = await userModel.findById(jwtPayload.id);
                if (!user) return done(null, false, { message: "Usuario no encontrado" });

                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);

export default passport;