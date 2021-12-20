import {Route , BrowserRouter , Redirect} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import DonationsListUser from './pages/DonationsListUser';
import Admin from './pages/Admin';
 
function App() {
  return (
    <div style={{height: '100%'}}>
      <BrowserRouter> 
        <ProtectedRoute path='/' exact component={Home} />
        <Route path='/login' exact component={Login} />
        <Route path='/register' exact component={Register} />
        <ProtectedRoute path='/listdonations' exact component={DonationsListUser} />
        <ProtectedRoute path='/admin' exact component={Admin} />
      </BrowserRouter>
    </div>
  );
}

export default App;

export function ProtectedRoute(props) {
  const dispatch = useDispatch()

  const user = JSON.parse(localStorage.getItem('user'))
  dispatch({ type: 'GET_USER_LOGGED' , payload: user})
  if (user) {  
    return <Route {...props}/>
  } else {
    return <Redirect to='/login'/>
  }
}
