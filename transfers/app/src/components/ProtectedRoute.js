import React from "react";

import { Redirect } from "react-router-dom";

const App = (props) => {
  const user  = sessionStorage.getItem("userData") 
 
  
  return (
    <>
      {!!!user  && <Redirect to="/" />}
      {props.children}
      
    </>
  );
};

export default App;
