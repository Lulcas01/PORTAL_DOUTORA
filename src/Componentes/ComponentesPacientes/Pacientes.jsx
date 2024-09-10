import React, { useState } from 'react';
import '../styles.css';
import PacData from '../Data/pacData';
import ListarPacientes from './ListarPacientes';
import AdicionarPaciente from './AdicionarPaciente';
import VisualizarPaciente from './VisualizarPaciente';

function Pacientes() {
  const [Modo, setModo] = useState('Inicial')
  const [paciente, setPaciente] = useState('')

  const handleVisualizarPaciente = (pacienteSelecionado) => {
    setModo('Visualizar');
    setPaciente(pacienteSelecionado);
  }

  const handleAdicionarPaciente = () => {
    setModo('Adicionar');
  };

  const handleInicioPaciente = () => {
    setModo('Inicial');
  };

  const renderizarConteudo = () => {
    if (Modo === 'Inicial') {
      return <ListarPacientes handleAdicionarPaciente={handleAdicionarPaciente} handleVisualizarPaciente={handleVisualizarPaciente} />;
    }
    else if (Modo === 'Adicionar') {
      return <AdicionarPaciente handleInicioPaciente={handleInicioPaciente} />;
    }
    else if (Modo === 'Visualizar') {
      return <VisualizarPaciente handleInicioPaciente={handleInicioPaciente} paciente={paciente} />;
    }
  };

  return (
    <div className='corpo'>
      {renderizarConteudo()}
    </div>
  );
}

export default Pacientes;