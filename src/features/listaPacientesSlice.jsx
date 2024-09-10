import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { pacienteService } from '../API/API_NODE/Services/pacienteService';

export const fetchPacientes = createAsyncThunk(
  'Pacientes/fetchPacientes',
  async () => {
    const resposta = await pacienteService.getAll();
    return resposta;
  }
);

export const deletePacienteById = createAsyncThunk(
  'Pacientes/deletePacienteById',
  async (id) => {
    await pacienteService.deleteById(id);
    return id;
  }
);

export const updatePacienteById = createAsyncThunk(
  'Pacientes/updatePacienteById',
  async ({ id, data }) => {
    const resposta = await pacienteService.updateById(id, data);
    return resposta;
  }
);

export const createPaciente = createAsyncThunk(
  'Pacientes/createPaciente',
  async (data) => {
    const resposta = await pacienteService.create(data);
    return resposta;
  }
);

const initialState = {
  Pacientes: []
};

const ListaPacientesSlice = createSlice({
  name: 'Pacientes',
  initialState,
  reducers: {
    adicionarPaciente: (state, action) => {
      state.Pacientes.push(action.payload);
    },
    removePaciente: (state, action) => {
      state.Pacientes = state.Pacientes.filter((Paciente) => Paciente._id !== action.payload);
    },
    editPaciente: (state, action) => {
      const index = state.Pacientes.findIndex((Paciente) => Paciente._id === action.payload._id);
      if (index !== -1) {
        state.Pacientes[index] = {
          ...state.Pacientes[index],
          ...action.payload.data,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPacientes.fulfilled, (state, action) => {
      state.Pacientes = action.payload;
    });
    builder.addCase(deletePacienteById.fulfilled, (state, action) => {
      state.Pacientes = state.Pacientes.filter((Paciente) => Paciente._id !== action.payload);
    });
    builder.addCase(updatePacienteById.fulfilled, (state, action) => {
      const updatedPaciente = action.payload;
      const index = state.Pacientes.findIndex(Paciente => Paciente._id === updatedPaciente._id);
      if (index !== -1) {
        state.Pacientes[index] = updatedPaciente;
      }
    });
  },
});

export const { adicionarPaciente, editPaciente, removePaciente } = ListaPacientesSlice.actions;
export default ListaPacientesSlice.reducer;
