import React, { useEffect, useState } from 'react';
import ListaDinamica from '../EDA/ListaDinamica';
import { deletePacienteById, updatePacienteById } from '../../features/listaPacientesSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { deleteConsultaById, fetchConsultas } from '../../features/listaConsultaSlice';
import { deletePagamentoById, fetchPagamentos } from '../../features/listaPagamentosSlice';

function VisualizarPaciente({ handleInicioPaciente, paciente }) {
    const [isEditing, setIsEditing] = useState(false);
    const [novoPaciente, setNovoPaciente] = useState(paciente);
    const consultas = useSelector((state) => state.listaConsulta.consultas);
    const pagamentos = useSelector((state) => state.listaPagamentos.pagamentos)

    const consultasDoPaciente = consultas.filter((consulta) => consulta.cpfPaciente == paciente.cpf)
    const consultasDoPacienteConcluidas = consultasDoPaciente.filter((consulta) => consulta.observacoes)
    const consultasDoPacienteMarcadas = consultasDoPaciente.filter((consulta) => !consulta.observacoes)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchConsultas());
        dispatch(fetchPagamentos())
    }, [dispatch]);

    useEffect(() => {
        setNovoPaciente(paciente);
    }, [paciente]);

    function formatarData(dataISO) {
        const data = new Date(dataISO);
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();

        return `${dia}/${mes}/${ano}`;
    }

    const handleMudanca = (e) => {
        const { name, value } = e.target;
        setNovoPaciente({ ...novoPaciente, [name]: value });
    };

    const handleEditarPaciente = (e) => {
        e.preventDefault();

        if (isEditing && JSON.stringify(paciente) !== JSON.stringify(novoPaciente)) {
            dispatch(updatePacienteById({ id: novoPaciente._id, data: novoPaciente }));
            paciente = novoPaciente
        }

        setIsEditing(!isEditing);
    };

    const handleDeletePaciente = () => {
        consultasDoPaciente.map((consulta) => {
            var pagamentoDaConsulta = pagamentos.find((pagamento) => pagamento.idConsulta == consulta._id);
            if (pagamentoDaConsulta) {
                dispatch(deletePagamentoById(pagamentoDaConsulta._id))
            }
            dispatch(deleteConsultaById(consulta._id))
        })
        dispatch(deletePacienteById(paciente._id));
        handleInicioPaciente();
    }

    return (
        <div>
            <button className='botãoPaciente' onClick={handleInicioPaciente}>Início</button>
            <div className='container-lg'>
                <form onSubmit={handleEditarPaciente} className='row g-3'>
                    <div className='cabecalhoVisu'>
                        <button type='button' className='botãoPaciente' onClick={handleDeletePaciente}>Deletar</button>
                        <button type="submit" className='botãoPaciente'>
                            {isEditing ? 'Salvar' : 'Editar'}
                        </button>
                    </div>
                    <div className='col-md-6'>
                        <label>Nome:</label>
                        <input
                            className='inputPaciente'
                            type="text"
                            name='nome'
                            value={novoPaciente.nome}
                            onChange={handleMudanca}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className='col-md-3'>
                        <label>Telefone:</label>
                        <input
                            className='inputPaciente'
                            type="text"
                            name='telefone'
                            value={novoPaciente.telefone}
                            onChange={handleMudanca}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className='col-md-3'>
                        <label>CPF:</label>
                        <input
                            className='inputPaciente'
                            type="text"
                            name='cpf'
                            value={novoPaciente.cpf}
                            onChange={handleMudanca}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className='col-md-6'>
                        <label>Endereço:</label>
                        <input
                            className='inputPaciente'
                            type="text"
                            name='endereco'
                            value={novoPaciente.endereco}
                            onChange={handleMudanca}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className='col-md-3'>
                        <label>Cidade:</label>
                        <input
                            className='inputPaciente'
                            type="text"
                            name='cidade'
                            value={novoPaciente.cidade}
                            onChange={handleMudanca}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className='col-md-3'>
                        <label>Responsável:</label>
                        <input
                            className='inputPaciente'
                            type="text"
                            name='responsavel'
                            value={novoPaciente.responsavel}
                            onChange={handleMudanca}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className='col-md-4'>
                        {isEditing ?
                            (<ListaDinamica
                                label="Alergias"
                                itens={novoPaciente.alergias}
                                setItens={(itens) => setNovoPaciente({ ...novoPaciente, alergias: itens })}
                                disabled={!isEditing}
                            />) :
                            (<div>
                                <label> Alergias:</label>
                                <ul className='visuLista'>
                                    {paciente.alergias.map((alergias, i) => (
                                        <li key={i}>{alergias}</li>
                                    ))}
                                </ul>
                            </div>)
                        }

                    </div>
                    <div className='col-md-4'>
                        {isEditing ?
                            (<ListaDinamica
                                label="Medicações"
                                itens={novoPaciente.medicacoes}
                                setItens={(itens) => setNovoPaciente({ ...novoPaciente, medicacoes: itens })}
                                disabled={!isEditing}
                            />) :
                            (<div>
                                <label> Medicações</label>
                                <ul className='visuLista'>
                                    {paciente.medicacoes.map((medicacoes, i) => (
                                        <li key={i}>{medicacoes}</li>
                                    ))}
                                </ul>
                            </div>)
                        }
                    </div>
                    <div className='col-md-4'>
                        {isEditing ?
                            (<ListaDinamica
                                label="Cirurgias"
                                itens={novoPaciente.cirurgias}
                                setItens={(itens) => setNovoPaciente({ ...novoPaciente, cirurgias: itens })}
                                disabled={!isEditing}
                            />) :
                            (<div>
                                <label> Cirurgias:</label>
                                <ul className='visuLista'>
                                    {paciente.cirurgias.map((cirurgia, i) => (
                                        <li key={i}>{cirurgia}</li>
                                    ))}
                                </ul>
                            </div>)
                        }
                    </div>
                </form>
            </div>
            <div className='container-lg'>
                <h4 className='col-md-12 tituloConsulta'>Consultas Marcadas</h4>
                <ul className='listaConsultas'>
                    {consultasDoPacienteMarcadas.map((consulta, index) => (
                        <li className="row g-3 consulta">
                            <div className="col-md-12">
                                <label>Título:</label>
                                <span>{consulta.descricao}</span>
                            </div>
                            <div className="col-md-6">
                                <label>Data:</label>
                                <span>{formatarData(consulta.dia)}</span>
                            </div>
                            <div className="col-md-6">
                                <label>Hora:</label>
                                <span>{consulta.hora}</span>
                            </div>
                        </li>
                    ))}
                </ul>
                <h4 className='col-md-12 tituloConsulta'>Consultas Concluídas</h4>
                <ul className='listaConsultas'>
                    {consultasDoPacienteConcluidas.map((consulta, index) => (
                        <li className="row g-3 consulta">
                            <div className="col-md-12">
                                <label>Título:</label>
                                <span>{consulta.descricao}</span>
                            </div>
                            <div className="col-md-6">
                                <label>Data:</label>
                                <span>{formatarData(consulta.dia)}</span>
                            </div>
                            <div className="col-md-6">
                                <label>Hora:</label>
                                <span>{consulta.hora}</span>
                            </div>
                            <div className="col-md-12">
                                <label>Observações</label>
                                <span>{consulta.observacoes}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default VisualizarPaciente;
