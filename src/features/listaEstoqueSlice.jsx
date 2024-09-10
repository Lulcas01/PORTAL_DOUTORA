import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { estoqueService } from '../API/API_NODE/Services/estoqueService';

export const fetchEstoque = createAsyncThunk(
  'estoque/fetchEstoque',
  async () => {
    const resposta = await estoqueService.getAll();
    return resposta;
  }
);

export const deleteItemById = createAsyncThunk(
  'estoque/deleteItemById',
  async (id) => {
    await estoqueService.deleteById(id);
    return id;
  }
);

export const updateItemById = createAsyncThunk(
  'estoque/updateItemById',
  async ({ id, data }) => {
    const resposta = await estoqueService.updateById(id, data);
    return resposta;
  }
);

export const createItem = createAsyncThunk(
  'estoque/createItem',
  async (data) => {
    const resposta = await estoqueService.create(data);
    return resposta;
  }
);

const initialState = {
  estoque: []
};

const listaEstoqueSlice = createSlice({
  name: 'estoque',
  initialState,
  reducers: {
    adicionarItem: (state, action) => {
      state.estoque.push(action.payload);
    },
    rmvItem: (state, action) => {
      state.estoque = state.estoque.filter((item) => item._id !== action.payload);
    },
    editConsulta: (state, action) => {
      const index = state.consultas.findIndex((consulta) => consulta.id === action.payload.id);
      if (index !== -1) {
        state.consultas[index] = {
          ...state.consultas[index],
          ...action.payload.data,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEstoque.fulfilled, (state, action) => {
      state.estoque = action.payload;
    });
    builder.addCase(deleteItemById.fulfilled, (state, action) => {
      state.estoque = state.estoque.filter((item) => item._id !== action.payload);
    });
    builder.addCase(updateItemById.fulfilled, (state, action) => {
      const updatedItem = action.payload;
      const index = state.estoque.findIndex(item => item._id === updatedItem._id);
      if (index !== -1) {
        state.estoque[index] = updatedItem;
      }
    });
  },
});

export const { adicionarItem, editItem, rmvItem } = listaEstoqueSlice.actions;
export default listaEstoqueSlice.reducer;
