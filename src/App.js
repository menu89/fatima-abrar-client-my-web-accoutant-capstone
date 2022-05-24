import './styles/App.scss';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import InitialSetUp from './pages/InitialSetUp';

function App() {
  return (
    <>
    <div className="App">
      <h1>hello</h1>
    </div>

    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/ISU" component={InitialSetUp} />
        <Route path='/dashboard' component={Dashboard} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
    </>
    
  );
}

export default App;
