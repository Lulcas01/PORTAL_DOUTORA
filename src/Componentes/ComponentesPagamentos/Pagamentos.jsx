import React, { useState } from 'react';
import PagPaci from './pagPaci'
import PagData from './pagData'

import '../styles.css';

function Pagamentos() {

  const [Modo, setModo] = useState('Inicial')

  const handleListarPagamentos = () => {
    setModo('Inicial')
  };

  const handlePagamentoPorData = () => {
    setModo('Data')
  };

  const renderizarConteudo = () => {
    if (Modo === 'Inicial') {
      return <PagPaci handlePagamentoPorData={handlePagamentoPorData} />;
    }
    else if (Modo === 'Data') {
      return <PagData handleListarPagamentos={handleListarPagamentos}/>;
    }
  }

  return (
    <div className="corpo">
      {renderizarConteudo()}
    </div>
  );
}

export default Pagamentos;