import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { pagamentoService } from '../API/API_NODE/Services/pagamentoService';

export const fetchPagamentos = createAsyncThunk(
  'Pagamentos/fetchPagamentos',
  async () => {
    const resposta = await pagamentoService.getAll();
    return resposta;
  }
);

export const deletePagamentoById = createAsyncThunk(
  'Pagamentos/deletePagamentoById',
  async (id) => {
    await pagamentoService.deleteById(id);
    return id;
  }
);

export const updatePagamentoById = createAsyncThunk(
  'Pagamentos/updatePagamentoById',
  async ({ id, data }) => {
    const resposta = await pagamentoService.updateById(id, data);
    return resposta;
  }
);

export const createPagamento = createAsyncThunk(
  'Pagamentos/createPagamento',
  async (data) => {
    const resposta = await pagamentoService.create(data);
    return resposta;
  }
);

const initialState = {
  pagamentos: []
};

const ListaPagamentosSlice = createSlice({
  name: 'Pagamentos',
  initialState,
  reducers: {
    adicionarPagamento: (state, action) => {
      state.pagamentos.push(action.payload);
    },
    removePagamento: (state, action) => {
      state.pagamentos = state.pagamentos.filter((Pagamento) => Pagamento._id !== action.payload);
    },
    editPagamento: (state, action) => {
      const index = state.pagamentos.findIndex((Pagamento) => Pagamento._id === action.payload._id);
      if (index !== -1) {
        state.Pagamentos[index] = {
          ...state.pagamentos[index],
          ...action.payload.data,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPagamentos.fulfilled, (state, action) => {
      state.pagamentos = action.payload;
    });
    builder.addCase(deletePagamentoById.fulfilled, (state, action) => {
      state.pagamentos = state.pagamentos.filter((Pagamento) => Pagamento._id !== action.payload);
    });
    builder.addCase(updatePagamentoById.fulfilled, (state, action) => {
      const updatedPagamento = action.payload;
      const index = state.pagamentos.findIndex(Pagamento => Pagamento._id === updatedPagamento._id);
      if (index !== -1) {
        state.pagamentos[index] = updatedPagamento;
      }
    });
  },
});

export const { adicionarPagamento, editPagamento, removePagamento } = ListaPagamentosSlice.actions;
export default ListaPagamentosSlice.reducer;
