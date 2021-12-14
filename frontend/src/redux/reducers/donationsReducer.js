const initialData = {
  donations : [],
};

export const donationsReducer = (state = initialData, action) => {
   switch(action.type) {
      case 'GET_ALL_DONATIONS_USER' : {
        return {
          ...state,
          usersDonations : action.payload
        }
      }  
      case 'GET_ALL_DONATIONS' : {
      return {
          ...state,
          allDonations : action.payload
        }
      }    
      default: return state
   }
}