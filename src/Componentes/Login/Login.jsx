import React, { useState, useEffect } from 'react';
import logo from '../Imagens/logo.png'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login, loginUser, fetchUsers } from '../../features/userSlice';


import "./login.css"

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const dispatch = useDispatch();
  


  const ListaUsers = useSelector((state) => state.listaUser.users);
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  
  const logged = ListaUsers.find((user) => user.username === email);

  const data = {
    username: email,
    password: senha
  };
  
  console.log(data)
  


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(data));
    if(logged){ 
      dispatch(login({
        logged
     }));
    }
    else{
      console.log("Erro de Login")
    };
  };


  return (
    <div>
      <div>
        <div className='imagem'>
          <img src={logo} class="img-fluid" alt="Sample image" />
        </div>
        <div className='login'>
          <form className='formLogin' onSubmit={(e) => handleSubmit(e)}>
            <input type='username' value={email} className='inputLogin' onChange={(e) => setEmail(e.target.value)} placeholder='Digite o seu email' />
            <input type='password' value={senha} className='inputLogin' onChange={(e) => setSenha(e.target.value)} placeholder='Digite sua senha' />
            <div>
              <button type='submit' className='buttonLogin'> Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;