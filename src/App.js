// React stuff
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { KeepLogin } from './Redux/Action';
// Routing
import { Route, Switch } from 'react-router-dom';
// Components
import { Footer , Header } from './Components';
// Pages
import { LoginPage, ProductPage, ManageProducts } from './Pages';

function App() {
  const dispatch = useDispatch();

  const role = useSelector((state) => state.auth.role);
  // console.log("role: ", role);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      dispatch(KeepLogin(token));
    }
  });

  return (
    <div>
      <Header />
          {/* {
            role === "admin"
            ?
            <Switch>
              <Route path="/" component={ManageProducts} exact />
              <Route path="/product" component={ProductPage} />
            </Switch>
            :
            <Switch>
              <Route path="/" component={ProductPage} exact />
              <Route path="/auth" component={LoginPage} />
            </Switch>
          } */}
          <Switch>
            <Route path="/" component={ProductPage} exact />
            <Route path="/auth" component={LoginPage} />
            {
              role === "admin"
              ?
              <Route path="/dashboard" component={ManageProducts} />
              :
              null
            }
          </Switch>
      <Footer />
    </div>
  );
}

export default App;
