import {api} from './../../services/api';
import { message } from 'antd'

export const userLogin = ( reqObj ) => async dispatch => {
  dispatch({ type: 'LOADING' , payload: true})

  try {
    const response = await api.post('/api/users/login', reqObj)

    localStorage.setItem('user' , JSON.stringify(response.data))
    dispatch({ type: 'GET_USER_LOGGED', payload: response.data})
    
    message.success('Bem vindo!')
    
    setTimeout(() => {
      window.location.href='/'
      dispatch({ type: 'LOADING' , payload: false})
    }, 1500);       

  } catch (error) {
    console.log(error)
    message.error('Usuário/Senha incorreta! ')
    dispatch({ type: 'LOADING' , payload: false})
  }
}

export const userRegister = ( reqObj ) => async dispatch => {
  dispatch({ type: 'LOADING' , payload: true})

  try {
    const response = await api.post('/api/users/register', reqObj)
    
    if (response) {
        message.success('Usuário registrado!')
    }

    setTimeout(() => {
        window.location.href='/login'
        dispatch({ type: 'LOADING' , payload: false })
    }, 1000);    

  } catch (error) {
    console.log(error)
    message.error('Email/CPF já existe na base! ')
    dispatch({ type: 'LOADING', payload: false})
  }
}