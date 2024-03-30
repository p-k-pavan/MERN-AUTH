import express from "express";
import {
  test,
  updateUser,
  deleteUser,
  signout
} from "../controllers/user.controller.js";
import { verifyToken } from "../utiles/verifyUser.js";

const router = express.Router();

router.get("/", test);
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/signout",signout)

export default router;
