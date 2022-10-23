import { Router } from "express";
import * as TransactiionController from "../controller/TransactionController.js";

const router = new Router();

router.get("/", TransactiionController.index);
router.post("/", TransactiionController.create);
router.delete("/:id", TransactiionController.destroy);
router.patch("/:id", TransactiionController.update);

export default router;
