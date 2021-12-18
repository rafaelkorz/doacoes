import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { alertsReducer } from './reducers/alertsReducer';
import { donationsReducer } from './reducers/donationsReducer';
import { userReducer } from './reducers/userReducer';
import { stripeReducer } from './reducers/stripeReducer';

const composeEnhancers = composeWithDevTools({});

const rootReducer = combineReducers({
   donationsReducer,
   alertsReducer,
   userReducer,
   stripeReducer
})

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
);

export default store