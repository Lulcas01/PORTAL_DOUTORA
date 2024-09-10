import React, { useState } from 'react';
import Agenda from '../ComponentesAgenda/Agenda.jsx';
import Pacientes from '../ComponentesPacientes/Pacientes.jsx';
import Estoque from '../ComponentesEstoque/Estoque.jsx';
import Pagamentos from '../ComponentesPagamentos/Pagamentos.jsx';
import '../styles.css';

function NavApp() {
  const [modo, setModo] = useState('Pacientes');
  const [menuAberto, setMenuAberto] = useState(false);

  const components = {
    Pacientes: <Pacientes />,
    Agenda: <Agenda />,
    Estoque: <Estoque />,
    Pagamentos: <Pagamentos />,
  };

  const handleClick = (modoSelecionado) => {
    setModo(modoSelecionado);
    setMenuAberto(false);
  };

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  return (
    <div className='janela'>
      <nav className={`side-bar ${menuAberto ? 'menu-aberto' : ''}`}>
        <div className="logo">
          <div className="escrita1">
            Portal da
            <img src={require('../Imagens/Imagem1.png')} alt="Logo" />
          </div>
          <div className="escrita2">Doutora</div>
        </div>

        <ul>
          {Object.keys(components).map((key) => (
            <li key={key} className="side-bar-item">
              <button onClick={() => handleClick(key)} className={`aba ${key === modo ? 'selecionada' : ''}`}>
                {key}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <button className="botao-menu" onClick={toggleMenu}>
        ☰
      </button>
      <div className='conteudoPrincipal'>
        {components[modo]}
      </div>
    </div>
  );
}

export default NavApp;
