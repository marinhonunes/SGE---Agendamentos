const Agendamentos = require("../model/entidades/agendamento.js");
const agendamento = new Agendamentos();

class AgendamentoController {
  async getAgendamentos(req, res) {
    try {
      const result = await agendamento.getAgendamentos();
      return res.status(200).json(result);
    } catch (error) {
      console.log("Erro ao buscar Agendamentos: " + error);
      res.status(500).json({ error: "Erro ao buscar Agendamentos" });
    }
  }

  async filtrar(req, res) {
    const filtro = req.body;

    try {
      const result = await agendamento.filtrar(filtro);
      return res.status(200).json(result);
    } catch (error) {}
  }

  async getByNome(req, res) {
    const nome = req.params.nome;
    try {
      const result = await agendamento.getByNome(nome);
      if (result) {
        return res.status(200).json(result);
      } else {
        res.status(404).json({ error: "Agendamento não encontrado" });
      }
    } catch (error) {
      console.log("Erro ao buscar Agendamento: " + error);
      res.status(500).json({ error: "Erro ao buscar Agendamento" });
    }
  }

  async create(req, res) {
    const agendamentoData = req.body;
    try {
      await agendamento.create(agendamentoData);
      res.status(201).json({ message: "Cadastro de Agendamento realizado com sucesso." });
    } catch (error) {
      console.log("Erro ao cadastrar Agendamento: " + error);
      res.status(500).json({ error: "Erro ao cadastrar Agendamento" });
    }
  }

  async update(req, res) {
    const agendamentoData = req.body;
    const nome = req.params.nome;
    try {
      await agendamento.update(nome, agendamentoData);
      res.status(201).json({ message: "Agendamento atualizado com sucesso." });
    } catch (error) {
      console.log("Erro ao atualizar Agendamento: " + error);
      res.status(500).json({ error: "Erro ao atualizar Agendamento" });
    }
  }

  async delete(req, res) {
    const nome = req.params.nome;
    try {
      await agendamento.deleteByNome(nome);
      res.status(200).json({ message: "Agendamentos deletado com sucesso" });
    } catch (error) {
      console.log("Erro ao deletar agendamento:", error);
      res.status(500).json({ error: "Erro ao deletar agendamento" });
    }
  }
}

module.exports = AgendamentoController;