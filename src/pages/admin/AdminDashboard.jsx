import React, { useContext } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import context from '../../Context/context';

const AdminDashboard = () => {

  const getdata = useContext(context);
  const { auth } = getdata;


  return (
    <Layout>
      <div className="contianer-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-12 col-md-9">
            <div className="card p-3">
              <span className='d-flex align-items-center flex-wrap fs-4'>
                <h6>Admin Name : &nbsp;</h6>
                <h3>{auth?.user?.name}</h3>
              </span>
              <span className='d-flex align-items-center flex-wrap fs-4'>
                <h6>Admin Email : &nbsp;</h6>
                <h3 className='text-break'>{auth?.user?.email}</h3>
              </span>
              <span className='d-flex align-items-center flex-wrap fs-4'>
                <h6>Admin Phone : &nbsp;</h6>
                <h3>{auth?.user?.phone}</h3>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AdminDashboard
