import {Router} from "express";
import {methods as usuarioController} from "../controllers/usuario.controller";

const router=Router();

router.get("/", usuarioController.getUsuarios);
router.get("/:correo", usuarioController.getUsuario);           // No es lo mejor buscar con el correo, pero por ahora si :)
router.post("/", usuarioController.addUsuario);
router.put("/:correo", usuarioController.updateUsuario);
router.delete("/:correo", usuarioController.deleteUsuario);
router.post("/verify", usuarioController.verifyUsuario);
export default router;