import express from "express";
import passport from "passport";
import { userModel } from "../persistence/mongo/dao/user.dao.js";
import { hashPassword, comparePassword } from "../utils/hasPassword.js";
import { generateToken } from "../utils/jwt.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    const { first_name, last_name, email, age, password, role } = req.body;

    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "El usuario ya está registrado" });

        const hashedPassword = hashPassword(password);
        const newUser = await userModel.create({
            first_name,
            last_name,
            email,
            age,
            password: hashedPassword,
            role,
        });

        res.status(201).json({ message: "Usuario registrado exitosamente", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Error al registrar usuario", error });
    }
});

router.post("/login", (req, res, next) => {
    passport.authenticate("login", (err, user, info) => {
        if (err) return res.status(500).json({ message: "Error interno del servidor" });
        if (!user) return res.status(400).json({ message: info.message });

        const token = generateToken({ id: user._id, email: user.email, role: user.role });

        res.status(200).json({
            message: "Inicio de sesión exitoso",
            token,
            user: {
                id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                role: user.role,
            },
        });
    })(req, res, next);
});

export default router;