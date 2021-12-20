const initialData = {
  stripePrice: [],
};

export const stripeReducer = (state = initialData, action) => {
  switch(action.type) {
    case 'STRIPE_PRICE' : {
      return {
        ...state,
        stripePrice : action.payload
      }
    }
    default : return state
  }
}