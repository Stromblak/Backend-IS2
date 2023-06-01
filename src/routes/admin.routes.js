import {Router} from "express";
import {methods as adminController} from "../controllers/admin.controller";

const router=Router();

router.post("/software_devs", adminController.getDesarrolladores);  // Es POST pq algunos nombres de software incluyen espacios
router.post("/assign", adminController.asignarReporte);
router.get("/software", adminController.getSoftware);
router.get("/getDevs", adminController.getAllDevs);
router.get("/", adminController.getReportesAsignados);              // Todos los reportes ya asignados con el correo del desarrollador
router.get("/:correoDev", adminController.getAsignadosDev);         // Los reportes asignados a un desarrollador especifico
export default router;