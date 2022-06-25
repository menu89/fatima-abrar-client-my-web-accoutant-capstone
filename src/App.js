import './styles/App.scss';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import InitialSetUp from './pages/InitialSetUp';
import AddBankAcc from './pages/AddBankAcc';
import Actions from './pages/Actions';
import Entryform from './pages/Entryform';
import TranByPeriod from './pages/TranByPeriod';
import Credits from './pages/Credits';

function App() {
  return (
    <>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/credits" component={Credits} />
        <Route path="/ISU" component={InitialSetUp} />
        <Route path="/account-list" component={InitialSetUp} />
        <Route path='/add-account' component={AddBankAcc} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/add-transaction' component={Entryform} />
        <Route path='/tran-by-period' component={TranByPeriod} />
        <Route path='/actions' component={Actions} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
    </>
    
  );
}

export default App;
