import './styles/App.scss';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import InitialSetUp from './pages/InitialSetUp';
import AddBankAcc from './pages/AddBankAcc';

function App() {
  return (
    <>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/ISU" component={InitialSetUp} />
        <Route path="/account-list" component={InitialSetUp} />
        <Route path='/add-account' component={AddBankAcc} />
        <Route path='/dashboard' component={Dashboard} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
    </>
    
  );
}

export default App;
