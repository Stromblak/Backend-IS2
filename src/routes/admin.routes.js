import { Router } from "express";
import { methods as adminController } from "../controllers/admin.controller";

const router = Router();

router.post("/assign", adminController.asignarReporte);
router.post("/agregarDev", adminController.agregarDev);
router.get("/software_devs", adminController.getDesarrolladores);
router.get("/getAllDevs", adminController.getAllDevs);
router.get("/software", adminController.getSoftware);
router.get("/getDevsOf", adminController.getDevsOf);
router.get("/getDev/:correoDev", adminController.getDev);
router.get("/getRepsAsignados", adminController.getReportesAsignados);              // Todos los reportes ya asignados con el correo del desarrollador
router.get("/getRepsDe/:correoDev", adminController.getAsignadosDev);         // Los reportes asignados a un desarrollador especifico
router.get("/getEncargadoDe", adminController.getEncargadoDe);
export default router;