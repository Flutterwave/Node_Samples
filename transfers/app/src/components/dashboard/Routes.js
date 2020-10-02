import React, { Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";

const Dashboard = lazy(() => import("./userDashboard"));
const SingleTransfer = lazy(() => import("./SingleTransfer"));
const BulkTransfer = lazy(() => import("./BulkTransfer"));
const Menbers = lazy(() => import("./Menbers"));


const App = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Switch>
      <Route exact path={`/dashboard`} component={Dashboard} />
      <Route exact path={`/single-transfer`} component={SingleTransfer} />
      <Route exact path={`/bulk-transfer`} component={BulkTransfer} />
      <Route exact  path="/members/:id" component={Menbers} />
        
      </Switch>
    </Suspense>
  );
};

export default App;
