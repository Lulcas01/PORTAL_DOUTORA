import React from 'react';
import './stylesAgenda.css';

const Calendario = ({ dataAtual, dataSelecionada, onCliqueData, alterarMes }) => {
  const diasDaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const diasNoMes = (mes, ano) => new Date(ano, mes + 1, 0).getDate();

  const gerarDiasCalendario = () => {
    const dias = [];
    const primeiroDia = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 1).getDay();
    const totalDias = diasNoMes(dataAtual.getMonth(), dataAtual.getFullYear());

    for (let i = 0; i < primeiroDia; i++) {
      dias.push(<div key={`vazio-${i}`} className="celula-vazia" />);
    }

    for (let dia = 1; dia <= totalDias; dia++) {
      dias.push(
        <div
          key={dia}
          className={`celula-dia ${dataSelecionada?.getDate() === dia ? 'selecionado' : ''}`}
          onClick={() => onCliqueData(dia)}
        >
          {dia}
        </div>
      );
    }

    const celulasRestantes = 7 - ((primeiroDia + totalDias) % 7);
    if (celulasRestantes < 7) {
      for (let i = 0; i < celulasRestantes; i++) {
        dias.push(<div key={`vazio-${i + primeiroDia + totalDias}`} className="celula-vazia" />);
      }
    }

    return dias;
  };

  return (
    <div className="calendario">
      <div className="cabecalho">
        <button onClick={() => alterarMes(-1)}>Anterior</button>
        <h2>{dataAtual.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}</h2>
        <button onClick={() => alterarMes(1)}>Próximo</button>
      </div>
      <div className="grade-calendario">
        {diasDaSemana.map((dia, index) => (
          <div key={index} className="nome-dia">{dia}</div>
        ))}
        {gerarDiasCalendario()}
      </div>
    </div>
  );
};

export default Calendario;
