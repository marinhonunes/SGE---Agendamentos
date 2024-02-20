const Database = require("../database");

const banco = new Database();

class Agendamentos {
  nome;
  data;
  horario;

  constructor(
    nome,
    data,
    hora
  ) {
    (this.nome = nome),
      (this.dataAg = data),
      (this.hora = hora)
  }

  async getAgendamentos() {
    const agendamentos = await banco.ExecutaComando(
      "select * from agendamentos"
    );
    return agendamentos;
  }

  async filtrar({ termo }) {
    const sql = `
      SELECT * FROM agendamentos
      WHERE nome LIKE '%${termo}%'
    `;
    const agendamentos = await banco.ExecutaComando(sql);
    return agendamentos;
  }
  

  async create(dadosAgendamento) {
    await banco.ExecutaComandoNonQuery(
      "INSERT INTO agendamentos set ?",
      dadosAgendamento
    );
  }

  async update(nome, dadosAgendamento) {
    await banco.ExecutaComando("UPDATE agendamentos set ? where nome=?", [
      dadosAgendamento,
      nome,
    ]);
  }

  async getByNome(nome) {
    const result = await banco.ExecutaComando(
      "SELECT * FROM agendamentos WHERE nome = ?",
      [nome]
    );
    const agendamento = result[0];
    return agendamento;
  }

  async deleteByNome(nome) {
    await banco.ExecutaComandoNonQuery(
      "DELETE FROM funcionarios WHERE nome=?",
      [nome]
    );
  }
}
module.exports = Agendamentos;
