import {Router} from "express";
import {methods as archivoController} from "../controllers/archivo.controller";

const router=Router();

router.get("/:idRep", archivoController.getArchivo);
router.post("/", archivoController.addArchivo);
router.delete("/:idRep", archivoController.deleteArchivo);
export default router;