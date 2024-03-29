import { Router } from "express";
import { methods as reporteController } from "../controllers/reporte.controller";

const router = Router();

router.get("/getReportes", reporteController.getReportes);
router.get("/getReporteUsuario", reporteController.getReportesUsuario);
router.get("/getReporte/:idRep", reporteController.getReporte);
router.get("/getNoAsignados", reporteController.getReporteNoAsignados);
router.post("/addReporte", reporteController.addReporte);
router.put("/updateReporte/:idRep", reporteController.updateReporte);
router.delete("/deleteReporte/:idRep", reporteController.deleteReporte);
router.get("/getAvance/:idRep", reporteController.getAvance);
router.post("/addAvance", reporteController.addAvance);
router.get("/getComentariosAvance/:idRep", reporteController.getComentariosAvance);

export default router;