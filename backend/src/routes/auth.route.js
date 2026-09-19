import express from "express"
import { login, logout, signup, updateProfile } from "../controllers/auth.controllers.js";
import { Authenticate } from "../middleWare/auth.middleware.js";
import { arcjetProtection } from "../middleWare/arcjet.middleware.js";

const router = express.Router();

router.use(arcjetProtection);

router.post("/login", login);

router.post("/logout", logout);

router.post("/signup", signup);

router.put("/update-profile", Authenticate, updateProfile);

router.get("/check", Authenticate, (req, res) => {
    res.status(200).json(req.user)
});

export default router;