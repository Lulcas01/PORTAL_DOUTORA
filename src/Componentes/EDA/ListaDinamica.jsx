import React, { useState } from 'react';
import '../EDA/ListaDinamicaStyles.css'

function ListaDinamica({ label, itens, setItens }) {
    const [inputValue, setInputValue] = useState('');

    const handleAddItem = () => {
        if (inputValue.trim()) {
            setItens([...itens, inputValue]);
            setInputValue('');
        }
    };

    const handleDeleteItem = (index) => {
        setItens(itens.filter((_, i) => i !== index));
    };

    return (
        <div className="listaDinamica">
            <label>{label}:</label>
            <div className="inputDinamicoGrupo">
                <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                <button className="botaoAdd" type="button" onClick={handleAddItem}>
                    +
                </button>
            </div>
            <ul className="listagem">
                {itens.map((item, index) => (
                    <li key={index}>
                        {item}
                        <button className="botaoExclui" type="button" onClick={() => handleDeleteItem(index)}>
                            X
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListaDinamica;