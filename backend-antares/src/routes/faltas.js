const router = require("express").Router();
const faltasController = require("../controllers/faltasController");

router
  .route("/faltas")
  .post((req, res) => faltasController.create(req, res))
  .delete((req, res) => faltasController.delete(req, res))
  .patch((req, res) => faltasController.update(req, res))
  
router
  .route("/getFaltas")
  .post((req, res) => faltasController.getAll(req, res))

module.exports = router;
