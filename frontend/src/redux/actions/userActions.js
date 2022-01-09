import { api } from './../../services/api';
import { message } from 'antd'

export const userLogin = ( reqObj ) => async dispatch => {
  dispatch({ type: 'LOADING' , payload: true})

  try {
    const response = await api.post('/api/users/login', reqObj)

    if (response.data.state === 1) {
      message.warning(response.data.message)      
    } else {
      message.success('Bem vindo!')
      localStorage.setItem('user' , JSON.stringify(response.data))
      dispatch({ type: 'GET_USER_LOGGED', payload: response.data})  
    }

    setTimeout(() => {
      window.location.href='/'
      dispatch({ type: 'LOADING' , payload: false})
    }, 1500);       

  } catch (error) {
    console.log(error)
    message.error('Aconteceu algum problema ao logar! ')
    dispatch({ type: 'LOADING' , payload: false})
  }
}

export const userRegister = ( reqObj ) => async dispatch => {
  dispatch({ type: 'LOADING' , payload: true})
 
  const response = await api.post('/api/users/register', reqObj)
  
  if (response.data.state === 2) {
    message.success(response.data.message)

    setTimeout(() => {
      window.location.href='/login'
      dispatch({ type: 'LOADING' , payload: false })
    }, 1000);    

  } else {
    message.error(response.data.message)
    dispatch({ type: 'LOADING' , payload: false })
  }
}