import {Router} from "express";
import {methods as reporteController} from "../controllers/reporte.controller";

const router=Router();

router.get("/", reporteController.getReportes);
router.get("/", reporteController.getReportesUsuario);
router.get("/:idRep", reporteController.getReporte);
router.post("/", reporteController.addReporte);
router.put("/:idRep", reporteController.updateReporte);
router.delete("/:idRep", reporteController.deleteReporte);


export default router;