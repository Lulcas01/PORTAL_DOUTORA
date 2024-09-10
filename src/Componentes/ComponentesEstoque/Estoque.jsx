import React, { useState } from 'react';
import CadastrarItem from './cadastrarItem';
import ListaEstoque from './listaEstoque';



function Estoque() {

  const[Modo, setModo] = useState('Inicial')
  const[item, setItem] = useState('')

  const handleCadastrarItem = () =>{
    setModo('Cadastrar');
  };

  const handleListarItens = () =>{
    setModo('Inicial');
  };

  const renderizarConteudo = () => {
    if (Modo === 'Inicial') {
      return <ListaEstoque handleCadastrarItem={handleCadastrarItem} handleListarItens={handleListarItens}/>;
    }
    else if (Modo === 'Cadastrar') {
      return <CadastrarItem handleListarItens={handleListarItens}/>;
    }
  }
  
  return (
    <div className="corpo">
      {renderizarConteudo()}
    </div>
    
  );
}

export default Estoque;