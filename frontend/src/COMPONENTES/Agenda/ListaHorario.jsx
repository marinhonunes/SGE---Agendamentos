import { useState, useEffect } from "react";
import AgendamentoService from "../../SERVICES/agendaService";
import "./ListaHorario.css";
const agendamentoService = new AgendamentoService();

function ListaAgendamentos({
  setAgendamentoData,
  setAgendamentoEditando,
  setAlertMessage,
  setAlertType,
  clearAlertAfterDelay,
}) {
  const [agendamentos, setAgendamentos] = useState([]);
  const [searchValue, setSearchValue] = useState("");


  const carregarAgendamentos = async (nome = "") => {
    try {
      const dados = await agendamentoService.getAllAgendamentos(nome);
      setAgendamentos(dados);
    } catch (error) {
      console.error("Erro ao carregar agendamentos:", error);
    }
  };

  useEffect(() => {
    carregarAgendamentos();
  }, []);

  const handleReset = () => {
    window.location.reload();
  };

  const handleDelete = async (id) => {
    const confirmarExclusao = window.confirm("Deseja realmente excluir?");
    if (confirmarExclusao) {
      try {
        if (confirmarExclusao) {
          await agendamentoService.deleteAgendamento(id);
          await carregarAgendamentos();
          setAlertMessage("Agendamento excluído com sucesso.");
          setAlertType("success");
          clearAlertAfterDelay();
        }
      } catch (error) {
        setAlertMessage("Erro ao excluir agendamento: " + error.message);
        setAlertType("danger");
        clearAlertAfterDelay();
      }
    }
  };

  const handleEdit = (agendamento) => {
    const confirmarAlteracao = window.confirm(
      "Deseja alterar os dados de cadastro?"
    );
    if (confirmarAlteracao) {
      setAgendamentoEditando(agendamento);
      setAgendamentoData(agendamento);
    }
  };

  const handleSearch = async () => {
    try {
      const dados = await agendamentoService.filterAgendamentos({
        termo: searchValue,
      });
      setAgendamentos(dados);
    } catch (error) {
      console.error("Erro ao buscar Agendamentos:", error);
    }
  };

  return (
    <div className="tabela">
      <div className="row">
        <div className="col-6">
          <div className="form-group borda-form">
            <label htmlFor="pesquisar">
              <i className="bi bi-search"></i> Pesquisar:
            </label>
            <div className="input-group flex-nowrap">
              <input
                type="text"
                className="form-control"
                placeholder="Informe o Nome do Professor"
                aria-label="Username"
                aria-describedby="addon-wrapping"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div id="pesquisar" className="bpesq">
          <button
            className="btn btn-primary btn-gradient"
            id="pesquisarButton"
            type="button"
            onClick={handleSearch}
          >
            Pesquisar
          </button>
          <button
            className="btn btn-secondary btn-gradient"
            id="resetButton"
            type="button"
            onClick={handleReset}
          >
            Restaurar Tabela
          </button>
        </div>
      </div>
      <table className="table table-hover">
        <thead className="azul">
          <tr>
            <th>Nome</th>
            <th>Data</th>
            <th>Horário</th>
          </tr>
        </thead >
        <tbody>
          {agendamentos.map((agendamento) => (
            <tr key={agendamento.matricula}>
              <td>{agendamento.nome}</td>
              <td>{agendamento.data}</td>
              <td>{agendamento.hora}</td>
              <td>
              <button
                  className="btn btn-primary m-2"
                  onClick={() => handleEdit(agendamento)}
                >
                  <i className="bi bi-pencil-square"></i>
                </button>

              </td>
              <td>
                <button
                  className="btn btn-danger m-2"
                  onClick={() => handleDelete(agendamento.matricula)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaAgendamentos;
