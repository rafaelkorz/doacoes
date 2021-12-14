const initialData = {
  userLogged : {},
};

export const userReducer = (state = initialData, action) => {
  switch(action.type) {
    case 'GET_USER_LOGGED' : {
      return {
        ...state,
        userLogged : action.payload
      }
    }
    default : return state
  }
}