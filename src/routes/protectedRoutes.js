import express from "express";
import jwtAuth from "../middlewares/jwtAuth.js";

const protectedRoutes = express.Router();

protectedRoutes.get("/profile", jwtAuth, (req, res) => {
    res.json({ message: "Acceso permitido", user: req.user });
});

protectedRoutes.get("/cart", jwtAuth, (req, res) => {
    res.json({ message: "Tu carrito está aquí", cart: req.user.cart });
});

export default protectedRoutes;