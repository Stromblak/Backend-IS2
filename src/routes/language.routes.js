import {Router} from "express";
import {methods as languageController} from "./../controllers/language.controller";

const router=Router();

router.get("/", languageController.getLanguages);
router.get("/:idRep", languageController.getLanguage);
router.delete("/:idRep", languageController.deleteLanguage);
router.post("/", languageController.addLanguage);
router.put("/:idRep", languageController.updateLanguage);
export default router;