import React from 'react';
import { Link } from 'react-router-dom'


const App = (props) => {
    const {children} = props
    const logout = () => {
        sessionStorage.clear();
        props.history.push("/");
      };

       const user = JSON.parse(
    sessionStorage.getItem("userData")
    
  );
    return ( 
        <div id="wrapper">
            
              <nav className="navbar navbar-default navbar-static-top mb-0 mt-5" role="navigation">
            <div className="navbar-header mt-5">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <Link className="navbar-brand" to="/single-transfer" > Simple Payroll </Link>
            </div>

            <ul className="nav navbar-top-links navbar-right">
                <li className="dropdown">
                    <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                       Welcome <i className="fa fa-user fa-fw"></i> {user && user.fullname} <i className="fa fa-caret-down"></i>
                    </a>
                    <ul className="dropdown-menu dropdown-user">
                        <li>
                        </li>
                        <li className="divider"></li>
                        <li><a className="cursor" onClick={logout}><i className="fa fa-sign-out fa-fw"></i> Logout</a>
                        </li>
                    </ul>
                </li>
            </ul>

            <div className="navbar-default sidebar" role="navigation">
                <div className="sidebar-nav navbar-collapse">
                    <ul className="nav" id="side-menu">
                        <li className="sidebar-search">
                            <div className="input-group custom-search-form">
                                <input type="text" className="form-control" placeholder="Search..." />
                                <span className="input-group-btn">
                                <button className="btn btn-default" type="button">
                                   search
                                </button>
                            </span>
                            </div>
                        </li>
                        <li>
                        <Link to="/dashboard" > <i className="fa fa-dashboard fa-fw"></i> Dashboard </Link>
                        </li>
                        <li>
                            <a href="#"><i className="fa fa-bar-chart-o fa-fw"></i> Transfer<span className="fa arrow"></span></a>
                            <ul className="nav nav-second-level">
                                <li>
                                <Link to="/single-transfer" > Single Transfer </Link>
                                </li>
                                <li>
                                <Link to="/bulk-transfer" > Bulk Transfer </Link>
                                </li>
                            </ul>
                          
                        </li>
                    
                        <li >
                            
                            <a className="cursor" onClick={logout}><i className="fa fa-power-off fa-fw"></i> Logout</a>
                        </li> 
                    </ul>
                </div>
            </div>
       
        </nav>

        {children}
        
        
        </div>
     );
}
 
export default App ;