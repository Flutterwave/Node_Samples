import React from 'react'
import Routes from './Routes'
import Layout from './layout'

const Dashboard = (props) => {
    return ( 
        <Layout {...props}>
            <Routes  />
        </Layout>
       
     );
}
 
export default Dashboard;