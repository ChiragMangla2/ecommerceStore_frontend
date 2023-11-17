import React, { useContext, useEffect, useState } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import context from '../../Context/context'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import toast from 'react-hot-toast'
import "../../style/AdminOrder.css"
import { BASE_URL } from '../../Url'

const AdminOrders = () => {

    const [status, setStatus] = useState(["Not Process", "Processing", "Shipping", "Deliverd", "Cancel"])


    const [orders, setOrders] = useState([]);
    const useAuth = useContext(context)
    const { auth } = useAuth;
    const navigate = useNavigate()

    const getOrders = async () => {
        try {
            const token = JSON.parse(localStorage.auth).token;

            const { data } = await axios.get(`${BASE_URL}/api/v1/auth/all-order`, {
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

    // handle Status Update function
    const handleStatusUpdate = async (orderId, value, pname) => {
        try {
            const token = JSON.parse(localStorage.auth).token;

            const { data } = await axios.put(`${BASE_URL}/api/v1/auth/order-status/${orderId}`,
                { status: value }
                , {
                    headers: {
                        authorization: token
                    }
                }
            )

            getOrders();
            toast.success(`${pname} Status updated successfully.`)

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout>
            <div className="row m-3 p-3">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <h1 className="text-center">All Orders</h1>
                    {
                        orders?.map((o, i) => {
                            return <div className="border shadow px-3 mt-4 pt-2 pb-4 overflow-x-scroll hide-scroll" key={i}>
                                <table className="table table-hover">
                                    <thead className='bg-secondary'>
                                        <tr className='table-dark'>
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
                                            <td>
                                                <select value={o?.status} onChange={(e) => { handleStatusUpdate(o._id, e.target.value, o?.buyer?.name) }} className='border-0 w-100'>
                                                    {
                                                        status?.map((option, i) => {
                                                            return <option value={option} key={i}>{option}</option>
                                                        })
                                                    }

                                                </select>
                                            </td>
                                            <td> {o?.buyer?.name} </td>
                                            <td> {moment(o?.createdAt).fromNow()} </td>
                                            <td> {o?.payment} </td>
                                            <td> {o?.products?.length} </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="orders container d-flex flex-wrap gap-3">

                                    {
                                        o?.products?.map((p, i) => {
                                            return <div className="mb-2 card flex col-md-3" key={i}>
                                                <div className="col-12 p-2 d-flex justify-content-center">
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
        </Layout>
    )
}

export default AdminOrders
