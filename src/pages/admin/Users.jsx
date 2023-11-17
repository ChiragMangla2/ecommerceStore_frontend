import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios'
import moment from 'moment'
import { BASE_URL } from '../../Url'

const Users = () => {

  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    const token = JSON.parse(localStorage.auth).token;
    const { data } = await axios.get(`${BASE_URL}/api/v1/auth/all-users`, {
      headers: {
        authorization: token
      }
    })

    setUsers(data?.data)
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  return (
    <Layout>
      <div className="contianer-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>All users</h1>
            <div className="border shadow px-3 pt-2 pb-4 overflow-scroll">
              <table className="table table-hover">
                <thead className='bg-secondary'>
                  <tr className='table-dark'>
                    <th scope='col'>#</th>
                    <th scope='col'>Name</th>
                    <th scope='col'>Email</th>
                    <th scope='col'>Phone</th>
                    <th scope='col'>Address</th>
                    <th scope='col'>Register at</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    users?.map((u, i) => {
                      return <tr key={i}>
                        <td> {i + 1} </td>
                        <td>{ u?.name }</td>
                        <td>{ u?.email }</td>
                        <td>{ u?.phone }</td>
                        <td> { u?.address } </td>
                        <td> {moment(u?.createdAt).fromNow()} </td>
                      </tr>
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Users
