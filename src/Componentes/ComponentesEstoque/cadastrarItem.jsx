import React, { useState } from 'react';
import '../styles.css';
import { useSelector, useDispatch } from 'react-redux';
import { createItem } from '../../features/listaEstoqueSlice';
import './estoque.css';


function CadastrarItem({ handleListarItens }) {
    const dispatch = useDispatch();
    const Filtros = [
        "Ortodontia",
        "Descartável",
        "Equipamento"
    ];

    const [nome, setNomeItem] = useState('')
    const [codigo, setCodigoItem] = useState('')
    const [quantidade, setQuantidadeItem] = useState('')
    const [preco, setPrecoItem] = useState('')
    const [filtroSelecionado, setFiltroSelecionado] = useState([])
    const [descricao, setDescricaoItem] = useState('')

    const handleClickEstoque = (event) => {
        const dados = {
            nome: nome,
            codigo: codigo,
            quantidade: quantidade,
            preco: preco,
            descricao: descricao,
            filtros: filtroSelecionado,
        };
        dispatch(createItem(dados));
    };

    const handleAddFiltro = (filtro) => {
        setFiltroSelecionado([...filtroSelecionado, filtro]);
    }

    const handleDeleteFiltro = (index) => {
        setFiltroSelecionado(filtroSelecionado.filter((_, i) => i !== index));
    };


    return (
        <div>
            <button className='botao' onClick={handleListarItens}>Voltar</button>
            <div className="container-lg">
                <form onSubmit={handleListarItens} className="row g-3">
                    <div className="col-md-4">
                        <label htmlFor="inputNome" className="form-label">Nome</label>
                        <input type="text" className="inputEstoque" id="inputNome" value={nome} onChange={(e) => setNomeItem(e.target.value)} />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="inputCodigo" className="form-label">Código</label>
                        <input type="text" className="inputEstoque" id="inputCodigo" value={codigo} onChange={(e) => setCodigoItem(e.target.value)} />
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="inputQuantidade" className="form-label">Quantidade</label>
                        <input type="number" className="inputEstoque" id="inputQuantidade" value={quantidade} onChange={(e) => setQuantidadeItem(e.target.value)} />
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="inputPreco" className="form-label">Preço</label>
                        <input type="number" className="inputEstoque" id="inputPreco" value={preco} onChange={(e) => setPrecoItem(e.target.value)} />
                    </div>
                    <div className='col-md-4'>
                        <div>
                            <label>Filtros</label>
                            <select className="selectFiltro" onChange={(e) => handleAddFiltro(e.target.value)}>
                                <option selected>Escolha...</option>
                                {Filtros.map((filtro) => (
                                    <option key={filtro} value={filtro}>
                                        {filtro}
                                    </option>))
                                }
                            </select>
                        </div>
                        <ul className='listaFiltros'>
                            {filtroSelecionado.map((filtro, index) => (
                                <li key={index} className='filtro'>
                                    {filtro}
                                    <button type='button' onClick={() => handleDeleteFiltro(index)}>X</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputDescricao" className="form-label">Descrição</label>
                        <textarea type="text" className="inputEstoque area" id="inputDescricao" value={descricao} onChange={(e) => setDescricaoItem(e.target.value)}></textarea>
                    </div>
                    <div className="col-12">
                        <button type="submit" className="botao" onClick={handleClickEstoque}>Cadastrar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CadastrarItem;