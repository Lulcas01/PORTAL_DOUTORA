import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPaciente } from '../../features/listaPacientesSlice';
import ListaDinamica from '../EDA/ListaDinamica.jsx';

export function AdicionarPaciente({ handleInicioPaciente }) {
    const [novoPaciente, setNovoPaciente] = useState({
        nome: "",
        telefone: "",
        cpf: "",
        endereco: "",
        cidade: "",
        alergias: [],
        responsavel: "",
        medicacoes: [],
        cirurgias: [],
    });

    const dispatch = useDispatch();

    const handleMudanca = (e) => {
        const { name, value } = e.target;
        setNovoPaciente({
            ...novoPaciente,
            [name]: value,
        });
    };

    const handleAdicionarPaciente = (e) => {
        e.preventDefault();
        dispatch(createPaciente(novoPaciente)); 
        handleInicioPaciente();
    };
    return (
        <div>
            <button className='botãoPaciente' onClick={handleInicioPaciente}>Início</button>
            <div className='container-lg'>
                <form onSubmit={handleAdicionarPaciente} className='row g-3'>
                    <div className='col-md-6'>
                        <label>Nome:</label>
                        <input className='inputPaciente' type="text" name='nome' onChange={handleMudanca} />
                    </div>
                    <div className='col-md-3'>
                        <label>Telefone:</label>
                        <input className='inputPaciente' type="text" name='telefone' onChange={handleMudanca} />
                    </div>
                    <div className='col-md-3'>
                        <label>CPF:</label>
                        <input className='inputPaciente' type="text" name='cpf' onChange={handleMudanca} />
                    </div>
                    <div className='col-md-6'>
                        <label>Endereço:</label>
                        <input className='inputPaciente' type="text" name='endereco' onChange={handleMudanca} />
                    </div>
                    <div className='col-md-3'>
                        <label>Cidade:</label>
                        <input className='inputPaciente' type="text" name='cidade' onChange={handleMudanca} />
                    </div>
                    <div className='col-md-3'>
                        <label>Responsável:</label>
                        <input className='inputPaciente' type="text" name='responsavel' onChange={handleMudanca} />
                    </div>
                    <div className='col-md-4'>
                        <ListaDinamica label="Alergias" itens={novoPaciente.alergias} setItens={(itens) => setNovoPaciente({ ...novoPaciente, alergias: itens })} />
                    </div>
                    <div className='col-md-4'>
                        <ListaDinamica label="Medicações" itens={novoPaciente.medicacoes} setItens={(itens) => setNovoPaciente({ ...novoPaciente, medicacoes: itens })} />
                    </div>
                    <div className='col-md-4'>
                        <ListaDinamica label="Cirurgias" itens={novoPaciente.cirurgias} setItens={(itens) => setNovoPaciente({ ...novoPaciente, cirurgias: itens })} />
                    </div>
                    <button className='botãoPaciente' type='submit'>Adicionar Paciente</button>
                </form>
            </div>
        </div>
    );
}

export default AdicionarPaciente;