import React, { Suspense, lazy } from "react";
// import { Route, Switch } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


const Home = lazy(() => import("../containers/Home"));
const Docs = lazy(() => import("../containers/Docs"));
const Dashboard = lazy(() => import("../containers/Dashboard"));



const App = () => (
  <Router>
     <Suspense fallback={<div>loading...</div>}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route  path="/docs" component={Docs} />
      <Route  path="/dashboard" component={Dashboard} />
      <Route  path="/single-transfer" component={Dashboard} />
      <Route  path="/bulk-transfer" component={Dashboard} />

    </Switch>
  </Suspense>

  </Router>
 
);

export default App;
