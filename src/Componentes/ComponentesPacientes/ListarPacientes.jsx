import { useState, useEffect } from 'react';
import React from 'react';
import './stylesPaciente.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPacientes } from '../../features/listaPacientesSlice';

function ListarPacientes({ handleAdicionarPaciente, handleVisualizarPaciente }) {
  const [termoPesquisa, setTermoPesquisa] = useState('');
  const ListaDePacientes = useSelector((state) => state.listaPacientes.Pacientes);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPacientes());
  }, []);

  const handlePesquisar = (e) => {
    setTermoPesquisa(e.target.value);
  };

  const pacientesFiltrados = ListaDePacientes.filter((paciente) =>
    paciente.nome.toLowerCase().includes(termoPesquisa.toLowerCase())
  );

  return (
    <div className='corpo'>
      <button className='botãoPaciente' onClick={handleAdicionarPaciente}>Adicionar</button>
      <input className='pesquisaPaciente' type="text" placeholder="Pesquisar paciente..." value={termoPesquisa} onChange={handlePesquisar} />
      <div className='ListaPaciente'>
        <ul>
          <li>Pacientes</li>
          {pacientesFiltrados.map((paciente, index) => (
            <li key={index} onClick={() => handleVisualizarPaciente(paciente)}>{paciente.nome}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ListarPacientes;