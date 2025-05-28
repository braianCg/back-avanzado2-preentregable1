import express from "express";
import { connectMongoDB } from "./config/mongoDB.config.js";
import session from "express-session";
import routes from "./routes/index.js";
import envsConfig from "./config/env.config.js";
import cookieParser from "cookie-parser";
import passport from "./config/passport/passport.config.js";
import { sendEmail } from "./email/sendEmail.js";
import { welcomeUserTemplate } from "./email/templates/welcome.template.js";




const app = express();

connectMongoDB();



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));



app.use(
  session({
    secret: envsConfig.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 500000 },
  })
);

app.use("/email", async (req, res) => {
  const template = welcomeUserTemplate("Javier");
  await sendEmail(template, "Prueba 3 email", "profeluismeradev@gmail.com");
  res.status(200).json({ msg: "Email enviado" });
});


app.use(cookieParser());

app.use(passport.initialize());


app.use("/api", routes);

app.use((req, res) => {
  res.status(404).json({ error: "Recurso no encontrado" });
});

app.listen(envsConfig.PORT, () => {
  console.log(`Servidor escuchando en el puerto ${envsConfig.PORT}`);
});
