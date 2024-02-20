import React, { useState } from "react";
import "./FormAgenda.css";
import ListaHorario from "./ListaHorario.jsx";
import AgendamentoService from "../../SERVICES/agendaService.js";

const agendamentoService = new AgendamentoService();

function FormAgendamento({ isMenuExpanded }) {
  const [agendamentoEditando, setAgendamentoEditando] = useState(null);
  const [AgendamentoData, setAgendamentoData] = useState({
    nome: "",
    assunto: "",
    data: "",
    hora: "",
  });
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAgendamentoData({ ...AgendamentoData, [name]: value });
  };
  const clearAlertAfterDelay = () => {
    setTimeout(() => {
      setAlertMessage("");
      setAlertType("");
      window.location.reload();
    }, 3000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const nome = form.nome.value;
    const data = form.data.value;
    const hora = form.hora.value;

    // Validação se todos os campos estão preenchidos
    if (!nome || !data || !hora) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    // Validação da data
    const hoje = new Date();
    const dataAgendamentoDate = new Date(data);
    if (dataAgendamentoDate < hoje) {
      alert("A data do agendamento precisar ser futura.");
      return;
    }

    const clearAlertAfterDelay = () => {
      setTimeout(() => {
        setAlertMessage("");
        setAlertType("");
        window.location.reload();
      }, 3000);
    };

    try {
      if (agendamentoEditando === null) {
        await agendamentoService.createAgendamento(AgendamentoData);
        setAlertMessage("Horário cadastrado com sucesso.");
        setAlertType("success");
        clearAlertAfterDelay();
        setAgendamentoData({
          nome: "",
          assunto: "",
          data: "",
          hora: "",
        });

      } else {
        await agendamentoService.updateAgendamento(
          agendamentoEditando.matricula,
          AgendamentoData
        );
        alert("Atualizado com sucesso!");
      }
    } catch (error) {
      setAlertMessage("Erro ao cadastrar Horário: " + error.message);
      setAlertType("danger");
      clearAlertAfterDelay();
    }
  };

  const handleClear = () => {
    setAgendamentoData({
      nome: "",
          assunto: "",
          data: "",
          hora: "",
    });
    if (agendamentoEditando !== null) {
      setAgendamentoEditando(null);
    }
  };

  return (
<div id="formularioAgendamento" className={isMenuExpanded ? "expanded" : ""}>
  <div className="content-section" id="agendamentos-section">
    <form
      onSubmit={handleSubmit}
      method="POST"
      action="#"
      id="formulario"
      name="cadastroAgendamento"
    >
      <div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.2s" style={{ backgroundColor: "#eeeeee", borderRadius: "10px" }}>
        <div className="container py-5">
          <div className="section-title text-center position-relative pb-3 mx-auto" style={{ maxWidth: "600px" }}>
            <h3 className="fw-bold text-uppercase">
              <i className="bi bi-person-badge-fill"> </i>
              CADASTRO DE AGENDAMENTOS
            </h3>
            <br />
          </div>

          <div className="row borda-form">
            <div className="col">
              <label htmlFor="professor">
                <strong className="bi bi-person-vcard"> Professor(a):</strong>
              </label>
              <select
                className="form-select form-select-sm"
                name="professor"
                id="professor"
                value={AgendamentoData.professor}
                onChange={handleInputChange}
                required
              >
                <option value="">Selecione um professor</option>
                <option value="professor1">Professor 1</option>
                <option value="professor2">Professor 2</option>
                {/* professores */}
              </select>
              <div className="invalid-feedback">
                Por favor, selecione um professor.
              </div>
            </div>

            <div className="col">
              <label htmlFor="dataAgendamento">
                <strong className="bi bi-calendar-week"> Data:</strong>
              </label>
              <input
                className="form-control form-control-sm"
                type="date"
                name="dataAgendamento"
                id="dataAgendamento"
                value={AgendamentoData.dataAgendamento}
                onChange={handleInputChange}
                required
              />
              <div className="invalid-feedback">
                Por favor, informe a data de Agendamento.
              </div>
            </div>

            <div className="col">
              <label htmlFor="horaAgendamento">
                <strong className="bi bi-clock"> Horário:</strong>
              </label>
              <input
                className="form-control form-control-sm"
                type="time"
                name="horaAgendamento"
                id="horaAgendamento"
                value={AgendamentoData.horaAgendamento}
                onChange={handleInputChange}
                required
              />
              <div className="invalid-feedback">
                Por favor, informe o horário.
              </div>
            </div>
          </div>

          <div className="pt-4 d-flex justify-content-center">
            <div className="mr-3">
              <button
                className="btn btn-primary py-1 px-3 btn-gradient"
                type="reset"
                onClick={handleClear}
              >
                LIMPAR
              </button>
            </div>

            <div className="mr-3">
              <button
                className="btn btn-primary py-1 px-3 btn-gradient"
                id="cadastrar"
                type="submit"
                onClick={clearAlertAfterDelay}
              >
                CADASTRAR
              </button>
            </div>
          </div>
          <div className="custom-alert">
            {alertMessage && (
              <div className={`alert alert-${alertType}`} role="alert">
                {alertMessage}
              </div>
            )}
          </div>
        </div>
        <div class="pt-5">
                <ListaHorario
                  setAgendamentoData={setAgendamentoData}
                  setAgendamentoEditando={setAgendamentoEditando}
                  setAlertMessage={setAlertMessage}
                  setAlertType={setAlertType}
                  clearAlertAfterDelay={clearAlertAfterDelay}
                />
              </div>
      </div>
    </form>
  </div>
</div>


  );
}

export default FormAgendamento;
