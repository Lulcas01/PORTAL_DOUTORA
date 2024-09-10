import {configureStore} from '@reduxjs/toolkit';
import listaPagamentosReducer from '../features/listaPagamentosSlice';
import listaPacientesReducer from '../features/listaPacientesSlice';
import listaEstoqueReducer from '../features/listaEstoqueSlice';
import listaConsultaReducer from '../features/listaConsultaSlice';
import userReducer from '../features/userSlice';

const store = configureStore({
    reducer:{
        listaPagamentos: listaPagamentosReducer,
        listaPacientes: listaPacientesReducer,
        listaEstoque: listaEstoqueReducer,
        listaConsulta: listaConsultaReducer,
        listaUser : userReducer
    }
});

export {store};
