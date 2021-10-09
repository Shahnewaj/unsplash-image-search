import Login from './pages/Login';
import Search from './pages/Search';
import NotFound from './pages/NotFound';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LoginProcess from './pages/LoginProcess';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist'
import store from './store/store';
import ProtectedRoute from './ProtectedRoute';

const App = () => {
  let persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
          <div className="App">
            <Switch>
              <ProtectedRoute exact path="/" component={Search} />
              <ProtectedRoute exact path="/search" component={Search} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/loginprocess" component={LoginProcess} />
              <Route exact path="*" component={NotFound} />
            </Switch>
          </div>
        </Router>
      </PersistGate>
    </Provider>

  );
}

export default App;
