import React, { useState } from 'react';
import './stylesAgenda.css';

const FormularioCompromisso = ({ onAdicionarCompromisso, ListaDePacientes }) => {
  const [nomePaciente, setNomePaciente] = useState('');
  const [cpfPaciente, setCpfPaciente] = useState('');

  const onChangeCPF = (e) => {
    const cpf = e.target.value;
    setCpfPaciente(cpf);

    const pacienteEncontrado = ListaDePacientes.find((paciente) => paciente.cpf === cpf);
    if (pacienteEncontrado) {
      setNomePaciente(pacienteEncontrado.nome);
    } else {
      setNomePaciente('');
    }
  };

  const onChangeNome = (e) => {
    const nome = e.target.value;
    setNomePaciente(nome);

    const pacienteEncontrado = ListaDePacientes.find((paciente) => paciente.nome === nome);
    if (pacienteEncontrado) {
      setCpfPaciente(pacienteEncontrado.cpf);
    } else {
      setCpfPaciente('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdicionarCompromisso(e);
  };

  return (
    <form onSubmit={handleSubmit} className="formulario-compromisso">
      <div className="areaPaciente">
        <div className='cpfInput'>
          <label>CPF do Paciente</label>
          <input type="text" placeholder="CPF do Paciente" name='cpfPaciente' onChange={onChangeCPF} value={cpfPaciente} required/>
        </div>

        <div className='nomeInput'>
          <label>Nome do Paciente</label>
          <input type="text" placeholder="Nome do Paciente" name='nomePaciente' onChange={onChangeNome} value={nomePaciente} list="pacientes" required/>
        </div>  
      </div>
      <input type="text" placeholder="Descrição do compromisso" name='descricao' required />
      <button type="submit">Adicionar</button>

      <datalist id="pacientes">
        {ListaDePacientes.map((paciente, index) => (
          <option key={index} value={paciente.nome} />
        ))}
      </datalist>
    </form>
  );
};

export default FormularioCompromisso;