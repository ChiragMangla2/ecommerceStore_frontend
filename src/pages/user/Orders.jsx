import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import axios from 'axios';
import context from '../../Context/context';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../Url';

const Orders = () => {

  const [orders, setOrders] = useState([]);
  const useAuth = useContext(context)
  const { auth, setAuth } = useAuth;
  const navigate = useNavigate()

  const getOrders = async () => {
    try {
      const token = JSON.parse(localStorage.auth).token;

      const { data } = await axios.get(`${BASE_URL}/api/v1/auth/get-order`, {
        headers: {
          authorization: token
        }
      })
      setOrders(data)

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (auth?.token) {
      getOrders();
    }
  }, [auth?.token])

  return (
    <Layout>
      <div className="container-fluid m-3 px-5 py-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className='text-center'>All Orders</h1>

            {
              orders?.map((o, i) => {
                return <div className="border shadow py-3 overflow-x-scroll" key={i}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Status</th>
                        <th scope='col'>Buyer</th>
                        <th scope='col'>Date</th>
                        <th scope='col'>Payment <small className='text-center'>COD</small></th>
                        <th scope='col'>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr key={i}>
                        <td> {i + 1} </td>
                        <td> {o?.status} </td>
                        <td> {o?.buyer?.name} </td>
                        <td> {moment(o?.createdAt).fromNow() } </td>
                        <td> {o?.payment} </td>
                        <td> {o?.products?.length} </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container d-flex flex-wrap gap-3">

                    {
                      o?.products?.map((p, i) => {
                        console.log(p.slug);
                        return <div className="mb-2 card flex col-lg-4 col-md-6 col-sm-6" key={i}>
                          <div className="col-md-12 p-3 d-flex justify-content-center">
                            <img className="card-img-top" src={`${BASE_URL}/api/v1/product/product-photo/${p._id}`} alt={p.name} style={{ "height": "15rem" }} />
                          </div>
                          <div className="col-md-8 p-3">
                            <p>{p.name}</p>
                            <p>{p.description.substring(0, 30)}...</p>
                            <p>$ {p.price}</p>
                            <button className='btn btn-primary ms-1' onClick={() => {
                              navigate(`/product/${p.slug}`)
                            }}>More Details</button>
                          </div>
                        </div>
                      })
                    }
                  </div>

                </div>
              })
            }
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Orders
