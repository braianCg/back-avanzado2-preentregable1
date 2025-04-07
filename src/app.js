import express from "express";
import passport from "passport";
import passportConfig from "./config/passport/passport.js";
import authRoutes from "./routes/auth.routes.js";
import protectedRoutes from "./routes/protectedRoutes.js";

const app = express();

app.use(express.json());
app.use(passport.initialize());

app.use("/auth", authRoutes);
app.use("/api", protectedRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));