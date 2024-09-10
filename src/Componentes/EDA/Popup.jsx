import React from 'react';
import './Popup.css';

const Popup = ({ titulo, children, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className='cabecalho'>
          <h3>{titulo}</h3>
          <button className="close-button" onClick={onClose}>X</button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Popup;