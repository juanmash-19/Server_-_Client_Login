const express = require("express");
const router = express.Router();
const superheroeController = require("../controllers/superheroe");

router.post("/new-superheroe", superheroeController.createSuperhero);
router.get("/", superheroeController.getListSuperhero);
router.get("/:id", superheroeController.getSuperheroById)
router.patch("/:id", superheroeController.editSuperhero);
router.delete("/:id",superheroeController.deleteSuperhero);

module.exports = router;