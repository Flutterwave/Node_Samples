import React, { Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";

const Dashboard = lazy(() => import("./userDashboard"));
const SingleTransfer = lazy(() => import("./SingleTransfer"));
const BulkTransfer = lazy(() => import("./BulkTransfer"));


const App = ({ username }) => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Switch>
      <Route exact path={`/dashboard`} component={Dashboard} />
      <Route exact path={`/single-transfer`} component={SingleTransfer} />
      <Route exact path={`/bulk-transfer`} component={BulkTransfer} />
        
      </Switch>
    </Suspense>
  );
};

export default App;
