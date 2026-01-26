import express from "express";
import { getChatPartners, getContacts, getMessageByUserId, sendMessage } from "../controllers/message.controllers.js";
import { Authenticate } from "../middleWare/auth.middleware.js";
import { arcjetProtection } from "../middleWare/arcjet.middleware.js";

const router = express.Router();
router.use( arcjetProtection , Authenticate)

router.get("/contact",  getContacts);
router.get("/chats", getChatPartners);
router.get("/:id",  getMessageByUserId);
router.post("/send/:id",  sendMessage);

export default router