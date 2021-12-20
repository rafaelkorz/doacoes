const initialData = {
  user : {},
};

export const userReducer = (state = initialData, action) => {
  switch(action.type) {
    case 'GET_USER_LOGGED' : {
      return {
        ...state,
        user : action.payload
      }
    }
    default : return state
  }
}