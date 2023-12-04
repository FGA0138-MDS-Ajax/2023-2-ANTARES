const router = require("express").Router();
const faltasController = require("../controllers/faltasController");

router
  .post("/faltas", (req, res) => faltasController.create(req, res))
  .delete("/faltas", (req, res) => faltasController.delete(req, res))
  .get("/faltas", (req, res) => faltasController.getAll(req, res))
  .patch("/faltas", (req, res) => faltasController.update(req, res));

module.exports = router;
