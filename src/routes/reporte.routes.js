import {Router} from "express";
import {methods as reporteController} from "../controllers/reporte.controller";

const router=Router();

router.get("/", reporteController.getReportes);
router.get("/:idRep", reporteController.getReporte);
router.delete("/:idRep", reporteController.deleteReporte);
router.post("/", reporteController.addReporte);
router.put("/:idRep", reporteController.updateReporte);
export default router;