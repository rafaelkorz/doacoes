const initialData = {
  donations : [],
};

export const userReducer = (state = initialData, action) => {
   switch(action.type)
   {
      case 'GET_USER_NAME' : {
        return {
            ...state,
            userName : action.payload
        }
      }    
       default: return state
   }
}