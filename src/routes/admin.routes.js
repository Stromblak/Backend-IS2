import {Router} from "express";
import {methods as adminController} from "../controllers/admin.controller";

const router=Router();

router.get("/:software", adminController.getDesarrolladores);
router.post("/assign", adminController.asignarReporte);
export default router;