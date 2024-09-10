import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { consultaService } from '../API/API_NODE/Services/consultaService';

export const fetchConsultas = createAsyncThunk(
  'consulta/fetchConsultas',
  async () => {
    const resposta = await consultaService.getAll();
    return resposta;
  }
);

export const deleteConsultaById = createAsyncThunk(
  'consulta/deleteConsultaById',
  async (id) => {
    await consultaService.deleteById(id);
    return id;
  }
);

export const updateConsultaById = createAsyncThunk(
  'consulta/updateConsultaById',
  async ({ id, data }) => {
    const resposta = await consultaService.updateById(id, data);
    return resposta;
  }
);

export const createConsulta = createAsyncThunk(
  'consulta/createConsulta',
  async (data) => {
    const resposta = await consultaService.create(data);
    return resposta;
  }
);

const initialState = {
  consultas: []
};

const consultaSlice = createSlice({
  name: 'consulta',
  initialState,
  reducers: {
    addConsulta: (state, action) => {
      state.consultas.push(action.payload);
    },
    removeConsulta: (state, action) => {
      state.consultas = state.consultas.filter((consulta) => consulta._id !== action.payload);
    },
    editConsulta: (state, action) => {
      const index = state.consultas.findIndex((consulta) => consulta._id === action.payload._id);
      if (index !== -1) {
        state.consultas[index] = {
          ...state.consultas[index],
          ...action.payload.data,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchConsultas.fulfilled, (state, action) => {
      state.consultas = action.payload;
    });
    builder.addCase(deleteConsultaById.fulfilled, (state, action) => {
      state.consultas = state.consultas.filter((consulta) => consulta._id !== action.payload);
    });
    builder.addCase(updateConsultaById.fulfilled, (state, action) => {
      const updatedConsulta = action.payload;
      const index = state.consultas.findIndex(consulta => consulta._id === updatedConsulta._id);
      
      if (index !== -1) {
        state.consultas[index] = updatedConsulta;
      }
    });
    builder.addCase(createConsulta.fulfilled, (state, action) => {
      state.consultas.push(action.payload);
    });
  },
});

export const { addConsulta, removeConsulta, editConsulta } = consultaSlice.actions;
export default consultaSlice.reducer;
