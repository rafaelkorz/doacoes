import {apiJWT} from './../../services/api';

export const stripePriceAction = () => async dispatch => {
  try {
    const response = await apiJWT.get('/api/stripe/price')
    dispatch({ type: 'STRIPE_PRICE' , payload: response.data}) 
  } catch (error) {
    console.log(error)
  }
}