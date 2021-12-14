import axios from "axios";
import { message } from 'antd'

export const donationReg = ( reqObj ) => async dispatch => {
  dispatch({ type: 'LOADING' , payload: true})

  try {
    await axios.post('/api/donation/adddonation' , reqObj)        
    message.success('Doação realizada!')

    dispatch({ type: 'LOADING' , payload: false})
    setTimeout(() => {
        window.location.href='/'
    }, 1000);
  } catch (error) {
    console.log(error)
    message.error('Não foi possível realizar a doação!')
    dispatch({ type: 'LOADING' , payload: false})
  }
}

export const getUserDonation = ( reqObj ) => async dispatch => {    
  dispatch({ type: 'LOADING' , payload: true})

  try {
    const response = await axios.get(`/api/donation/getalluserdonation/${reqObj}`)          

    dispatch({type: 'GET_ALL_DONATIONS_USER', payload: response.data})                
    setTimeout(() => {            
        dispatch({ type: 'LOADING' , payload: false})
    }, 1000);
  } catch (error) {
    console.log(error)
    message.error('Não foi possível carregar suas doações!')
    dispatch({ type: 'LOADING' , payload: false})
  }
}

export const reverseDonation = async ( reqObj, id ) =>  {
  try {
    await axios.post(`/api/donation/editdonation/${id}`, reqObj)                  
    message.success('Doação estornada!')
  } catch (error) {
    console.log(error)
    message.error('Não foi possível estronar a doação!')
  }
}

export const getAllDonation = () => async dispatch => {
  dispatch({ type: 'LOADING' , payload: true})
  try {
    const response = await axios.get('/api/donation/getalldonation')          

    dispatch({type: 'GET_ALL_DONATIONS', payload: response.data})                
    setTimeout(() => {            
        dispatch({ type: 'LOADING' , payload: false})
    }, 1000);
  } catch (error) {
    console.log(error)
    message.error('Não foi possível carregar as doações!')
    dispatch({ type: 'LOADING' , payload: false})
  }
}

export const getAllDonationDates = (reqObj) => async dispatch => {
  dispatch({ type: 'LOADING' , payload: true})
  try {
    const response = await axios.get('/api/donation/getalldonationdates', { params: reqObj});

    dispatch({type: 'GET_ALL_DONATIONS', payload: response.data})                
    setTimeout(() => {            
        dispatch({ type: 'LOADING' , payload: false})
    }, 1000);
  } catch (error) {
    console.log(error)
    message.error('Não foi possível carregar as doações!')
    dispatch({ type: 'LOADING' , payload: false})
  }
}