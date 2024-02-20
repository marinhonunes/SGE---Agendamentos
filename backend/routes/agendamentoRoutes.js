const express = require("express");
const AgendamentoController = require("../controller/agendaController");
const router = express.Router();
const agendamentoController = new AgendamentoController();

router.get("/", agendamentoController.getAgendamentos);
router.get("/:nome", agendamentoController.getByNome);
router.delete("/:nome", agendamentoController.delete);
router.post("/", agendamentoController.create);
router.put("/:nome", agendamentoController.update);
router.post("/filtrar", agendamentoController.filtrar);
module.exports = router;
