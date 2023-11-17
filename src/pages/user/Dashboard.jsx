import React, { useContext } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import context from '../../Context/context';

const Dashboard = () => {

  const getdata = useContext(context);
  const { auth } = getdata;

  return (
    <>
      <Layout>
        <div className="container-fluid m-3 p-3">
          <div className="row">
            <div className="col-md-3">
              <UserMenu />
            </div>
            <div className="col-md-9">
              <div className="card w-75 p-3">
                <h3>{auth?.user?.name}</h3>
                <h3>{auth?.user?.email}</h3>
                <h3>{auth?.user?.address}</h3>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Dashboard
