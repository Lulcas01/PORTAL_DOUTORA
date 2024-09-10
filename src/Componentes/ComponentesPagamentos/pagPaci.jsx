import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { useSelector, useDispatch } from 'react-redux';
import { editPag, rmvPag, fetchPagamentos, deletePagamentoById,updatePagamentoById } from '../../features/listaPagamentosSlice';
import './pagPaci.css'


function PagPaci({handlePagamentoPorData}) {

  const pagamentos = useSelector((state) => state.listaPagamentos.pagamentos);
  const Consulta = useSelector((state) => state.listaConsulta.consulta);
  const dispatch = useDispatch();
  
  useEffect(() => {
 
    dispatch(fetchPagamentos());
  }, []);

  const [filtroCPF, setFiltroCPF] = useState('');
  const [filtroIDConsulta, setFiltroIDConsulta] = useState('');
  const [id, setId] = useState(null);
  const [editPagamento, setEditPagamento] = useState(false);

  const [totalAtualizado, setTotalAtualizado] = useState('');
  const [dataAtualizado, setDataAtualizado] = useState(null);
  const [parcelaAtualizado, setParcelaAtualizado] = useState('');
  const valorParcelaAtualizada = (parseFloat(totalAtualizado) / parseInt(parcelaAtualizado)).toFixed(2);






  useEffect(() => {
    const valorParcelaAtualizada = (parseFloat(totalAtualizado) / parseInt(parcelaAtualizado)).toFixed(2);
    setParcelaAtualizado(parcelaAtualizado);
  }, [totalAtualizado, parcelaAtualizado]);

  const handleClickRmv = (id) => {
    dispatch(deletePagamentoById(id));
  };

  const handleFiltroCPFChange = (event) => {
    setFiltroCPF(event.target.value);
  };

  const handleFiltroIDConsultaChange = (event) => {
    setFiltroIDConsulta(event.target.value);
  };

  const pagamentosFiltrados = pagamentos.filter((pagamento) => {
    const cpfFormatado = pagamento.cpf.replace(/[^\d]/g, '');
    return (
      cpfFormatado.includes(filtroCPF) &&
      (filtroIDConsulta === '' || pagamento.idConsulta === filtroIDConsulta)
    );
  });

  const handleUpdateClick = (id) => {
    setId(id);
    setEditPagamento(true);
  };

  const handleUpdateSubmit = (pagamento) => {
    const pagEditado = {
      id: pagamento.id,
      cpf: pagamento.cpf,
      nome: pagamento.nome,
      valorTotal: totalAtualizado,
      valorParcela:valorParcelaAtualizada,
      data: dataAtualizado,
      parcela: parcelaAtualizado,
      idConsulta: pagamento.idConsulta
    };
  
    dispatch(updatePagamentoById({ id: pagamento.id, data: pagEditado }));
    
    setId(null);
    setTotalAtualizado('');
    setDataAtualizado(null);
    setParcelaAtualizado('');
    setEditPagamento(false);
  };

  return (
    <div>
      <h1>Pagamentos</h1>
      <button onClick={handlePagamentoPorData}>Ver Pagamentos Por Data</button>
      <div className='box'>
        <input
          type="text"
          value={filtroCPF}
          onChange={handleFiltroCPFChange}
          placeholder="Filtrar por CPF"
        />
        <input
          type="text"
          value={filtroIDConsulta}
          onChange={handleFiltroIDConsultaChange}
          placeholder="Filtrar por ID da Consulta"
        />
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>Total</th>
              <th>Parcelas</th>
              <th>Valor Parcela</th>
              <th>Data</th>
              <th>Ação</th>
              <th>Consulta</th>
            </tr>
          </thead>
          <tbody>
            {pagamentosFiltrados.map((pagamento) => (
              <tr key={pagamento.id}>
                <td>{pagamento.nome}</td>
                <td>{pagamento.cpf}</td>
                <td>{pagamento.valorTotal}</td>
                <td>{pagamento.parcela}</td>
                <td>{pagamento.valorParcela}</td>
                <td>{new Date(pagamento.data).toLocaleDateString()}</td>

                <td>
                  {editPagamento && id === pagamento.id ? (
                    <>
                      <input
                        type="text"
                        placeholder="Atualizar Valor total"
                        value={totalAtualizado}
                        onChange={(e) => setTotalAtualizado(e.target.value)}
                      />
                      <input
                        type="number"
                        placeholder="Atualizar Parcelas"
                        value={parcelaAtualizado}
                        onChange={(e) => setParcelaAtualizado(e.target.value)}
                      />
                      <input type="date" className="form-control" id="inputData"

                        onChange={(e) => setDataAtualizado(new Date(e.target.value + 'T00:00:00'))}
                      />
                      <button onClick={() => handleUpdateSubmit(pagamento)}>Salvar</button>
                    </>
                  ) : (
                    <button onClick={() => handleUpdateClick(pagamento.id)}>Editar</button>
                  )}
                  <button onClick={() => handleClickRmv(pagamento.id)}>Remover</button>
                </td>
                <td>{pagamento.idConsulta}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default PagPaci;