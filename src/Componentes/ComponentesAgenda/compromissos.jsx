import React, { useState } from 'react';
import './stylesAgenda.css';
import Popup from '../EDA/Popup';
import ConclusaoCompromisso from './ConclusaoCompromisso';

const gerarHorarios = () => {
  const horarios = [];
  for (let hora = 8; hora <= 20; hora++) {
    for (let minutos = 0; minutos < 60; minutos += 15) {
      const horario = `${hora.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
      horarios.push(horario);
    }
  }
  return horarios;
};

const Compromissos = ({ compromissosDoDia, dataSelecionada, horaSelecionada, onCliqueHora, onConclusaoCompromisso, ListaDePacientes }) => {
  const [compromissoAtual, setCompromissoAtual] = useState(null);

  const handleConcluirCompromisso = (compromisso) => {
    setCompromissoAtual(compromisso);
  };

  const fecharPopup = () => {
    setCompromissoAtual(null);
  };

  return (
    <div className="compromissos">
      {!dataSelecionada ? (
        <div className="lista-compromissos">
          <h3>Nenhum dia selecionado</h3>
          <ul>
            {gerarHorarios().map((hora) => (
              <li key={hora} className={`hora ${horaSelecionada === hora ? 'selecionado' : ''}`}>
                <strong>{hora}:</strong> Nenhum compromisso
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="lista-compromissos">
          <h3>Compromissos para {dataSelecionada.toDateString()}</h3>
          <ul>
            {gerarHorarios().map((hora) => {
              var compromissosHora = [];
              if (compromissosDoDia != null) {
                compromissosHora = compromissosDoDia.filter((compromisso) => compromisso.hora === hora);
              }
              return (
                <li
                  key={hora}
                  className={`hora ${horaSelecionada === hora ? 'selecionado' : ''}`}
                  onClick={() => onCliqueHora(hora)}
                >
                  <strong>{hora}:</strong>
                  {compromissosHora.length > 0 ? ` ${compromissosHora.length} compromisso(s)` : ' Nenhum compromisso'}
                  {compromissosHora.map((compromisso, index) => {
                    var pacienteCompromisso= ListaDePacientes.find((paciente) => paciente.cpf == compromisso.cpfPaciente) 
                    return (
                      <div key={index} className="card-compromisso">
                        <div>
                          <h4>{pacienteCompromisso.nome}</h4>
                          <p>{compromisso.descricao}</p>
                          <p>Status: {!compromisso.observacoes ? ('Pendente') : ('Concluída')}</p>
                        </div>
                        <button
                          className="botao-concluir"
                          onClick={() => handleConcluirCompromisso(compromisso)}
                        >
                          Concluir
                        </button>
                      </div>
                    )
                  })}
                </li>
              )
            })}
          </ul>
        </div>
      )
      }

      {
        compromissoAtual && (
          <Popup className='popupconcluir' titulo={`Atendimento com ${ListaDePacientes.find((paciente) => paciente.cpf == compromissoAtual.cpfPaciente).nome}`} onClose={fecharPopup}>
            <ConclusaoCompromisso fecharPopup={fecharPopup} onConclusaoCompromisso={onConclusaoCompromisso} compromissoAtual={compromissoAtual}/>
          </Popup>
        )
      }
    </div >
  );
};

export default Compromissos;
