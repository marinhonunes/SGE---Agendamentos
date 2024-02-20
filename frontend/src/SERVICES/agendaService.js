const API_BASE_URL = "http://localhost:3001";

class AgendamentoService {

  async filterAgendamento(filterData) {
    try {
      const response = await fetch(`${API_BASE_URL}/agendamentos/filtrar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filterData),
      });

      if (!response.ok) {
        throw new Error("Erro ao filtrar agendamentos");
      }

      const dados = await response.json();
      return dados;
    } catch (error) {
      throw error;
    }
  }

  async getAllAgendamentos() {
    try {
      const response = await fetch(`${API_BASE_URL}/agendamentos`);
      if (!response.ok) {
        throw new Error("Erro ao buscar agendamentos");
      }
      const dados = await response.json();
      return dados;
    } catch (error) {
      console.error("Erro ao buscar agendamentos:", error);
      throw error;
    }
  }

  async createAgendamento(agendamentoData) {
    try {
      const response = await fetch(`${API_BASE_URL}/agendamentos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(agendamentoData),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar agendamento");
      }
    } catch (error) {
      throw error;
    }
  }

  async updateAgendamento(matricula, agendamentoData) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/agendamentos/${matricula}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(agendamentoData),
        }
      );
      if (!response.ok) {
        throw new Error("Erro ao atualizar agendamento");
      }
    } catch (error) {
      throw error;
    }
  }

  async getAgendamentosByMatricula(matricula) {
    try {
      const response = await fetch(`${API_BASE_URL}/agendamentos/${matricula}`);
      if (!response.ok) {
        throw new Error("Erro ao buscar agendamentos");
      }
      const dados = await response.json();
      return dados;
    } catch (error) {
      console.error("Erro ao buscar agendamentos:", error);
      throw error;
    }
  }

  async deleteAgendamento(matricula) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/agendamentos/${matricula}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(`Erro ao deletar agendamento: ${errorMessage.error}`);
      }
    } catch (error) {
      console.error("Erro ao deletar agendamentos:", error);
      throw error;
    }
  }
}
export default AgendamentoService;
