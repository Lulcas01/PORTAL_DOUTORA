import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';
import CloseButton from 'react-bootstrap/CloseButton';
import { deleteItemById, fetchEstoque, updateItemById } from '../../features/listaEstoqueSlice';
import './estoque.css';

function ListaEstoque({ handleCadastrarItem }, { handleListarItens }) {

  const dispatch = useDispatch();
  const itens = useSelector((state) => state.listaEstoque.estoque);
  const [codigo, setCodigo] = useState('');
  const [nomeAtualizado, setNomeAtualizado] = useState('');
  const [precoAtualizado, setPrecoAtualizado] = useState('');
  const [descricaoAtualizado, setDescricaoAtualizado] = useState('');
  const [filtroAtualizado, setFiltroAtualizado] = useState('');
  const [quantidadeAtualizada, setQuantidadeAtualizada] = useState('');
  const [editarItem, setEditarItem] = useState(false);
 
  useEffect(() => {
    dispatch(fetchEstoque());
  }, []);

  const handleClickBotaoRemover = (id) => {
    dispatch(deleteItemById(id));
  };

  const handleClickEditar = (cod) => {
    setCodigo(cod);
    setEditarItem(true);
  };

  const handleAtualizarItem = (item) => {
    
    const data = {
      nome: nomeAtualizado || item.nome, 
      codigo: codigo || item.codigo,
      quantidade: quantidadeAtualizada || item.quantidade, 
      preco: precoAtualizado || item.preco, 
      descricao: descricaoAtualizado || item.descricao, 
      filtros: filtroAtualizado || item.filtros
    }

    dispatch(updateItemById({id: item._id, data}));
    setNomeAtualizado('');
    setPrecoAtualizado('');
    setQuantidadeAtualizada('');
    setEditarItem(false);
  }
  
  return (
    <div>
      <button className='botao' onClick={handleCadastrarItem}>Cadastrar</button>
      <div className="container-lg">
        <table className='tabela'>
          <thead className='cabecaTabela'>
            <tr>
              <th className='TituloColuna'>Código</th>
              <th className='TituloColuna'>Item</th>
              <th className='TituloColuna'>Preço</th>
              <th className='TituloColuna'>Quantidade</th>
              <th className='TituloColuna'>Descrição</th>
              <th className='TituloColuna'>Remover</th>
              <th className='TituloColuna'>Editar</th>
            </tr>
          </thead>
          <tbody>
            {itens.map((item) => (
              <tr key={item.codigo}>
                <td>{item.codigo}</td>
                <td>
                  {editarItem && codigo === item.codigo ? (
                    <input type="text" value={nomeAtualizado} onChange={(e) => setNomeAtualizado(e.target.value || item.nome)} />
                  ) : (
                    item.nome
                  )}
                </td>
                <td>
                  {editarItem && codigo === item.codigo ? (
                    <input type="number" value={precoAtualizado} onChange={(e) => setPrecoAtualizado(e.target.value || item.preco)} />
                  ) : (
                    item.preco
                  )}
                </td>
                <td>
                  {editarItem && codigo === item.codigo ? (
                    <input type="number" value={quantidadeAtualizada} onChange={(e) => setQuantidadeAtualizada(e.target.value || item.quantidade)} />
                  ) : (
                    item.quantidade
                  )}
                </td>
                <td>
                  {editarItem && codigo === item.codigo ? (
                    <textarea type="text" value={descricaoAtualizado} onChange={(e) => setDescricaoAtualizado(e.target.value || item.descricao)} />
                  ) : (
                    item.descricao
                  )}
                </td>
                <td>
                  <CloseButton onClick={(e) => handleClickBotaoRemover(item._id)} />
                </td>
                <td>
                  {editarItem && codigo === item.codigo ? (
                    <button onClick={(e) => { handleAtualizarItem(item); e.preventDefault() }}>Atualizar</button>
                  ) : (
                    <button onClick={(e) => { handleClickEditar(item.codigo); e.preventDefault() }}>Editar</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div >
  );
}

export default ListaEstoque;