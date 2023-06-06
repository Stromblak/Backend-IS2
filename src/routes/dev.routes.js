import {Router} from "express";
import {methods as devController} from "../controllers/dev.controller";

const router=Router();

router.get("/:idArc", archivoController.getArchivo);
router.post("/", archivoController.addArchivo);
router.delete("/:idArc", archivoController.deleteArchivo);
export default router;