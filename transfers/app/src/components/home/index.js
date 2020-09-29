import React, { Fragment, useState } from "react";
import { Link } from 'react-router-dom'
import request from "../../request";



const Home = (props) => {

  const [userData, setUserData] = useState({
    username: "",
    password: "",
  })

  const handleSubmit = async(e) => {
    try {
      e.preventDefault();

    const res = await request({
      url: `/auth/signin`,
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      data: { ...userData },
    });

   


    const {data} = res.data
    sessionStorage.setItem(
      "userData",
      JSON.stringify(data)
    );
    props.history.push('/dashboard')
      
    } catch (error) {
      console.log(error)
      
    }


  }
  

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Fragment>

      <div className="container">
        <div className="row">
          <div className="col-md-4 col-md-offset-MMM4">
            <h2>A simple payroll system using Flutterwave's Rave Node SDK.</h2>
            <small>Visit the <Link to="/docs" > <b>Documentation</b>t </Link> o read more of the different APIs used to achieve this.</small>


            <div className="login-panel panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Please Sign In</h3>
              </div>

              <div className="panel-body">
                <form role="form" id="user" onSubmit={handleSubmit}>
                  <fieldset>
                    <div className="form-group">
                      <input className="form-control" onChange={handleChange} value={userData.username} placeholder="Username" name="username" type="text" autofocus />
                    </div>
                    <div className="form-group">
                      <input className="form-control" onChange={handleChange} value={userData.password} placeholder="Password" name="password" type="password" />
                    </div>
                    <div className="checkbox">
                      <label>
                        <input name="remember" type="checkbox" value="Remember Me" />Remember Me
                                    </label>
                    </div>
                    <input type="submit" name="login" value="Login" className="btn btn-lg btn-success btn-block" />
                  </fieldset>
                </form>

                <b>Login Details:</b><br />
                        Username: user<br />
                        Password: password1


              </div>



            </div>
          </div>


        </div>


      </div>

    </Fragment>
  );
};

export default Home;
