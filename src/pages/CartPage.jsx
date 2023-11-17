import React, { useContext, useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import context from '../Context/context';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartProvider';
import toast from 'react-hot-toast';
import axios from 'axios';
import { BASE_URL } from '../Url';

const CartPage = () => {

    // contextapi
    const getdata = useContext(context);
    const { auth } = getdata;
    const [amount, setAmount] = useState("");

    const [cart, setCart] = useCart();

    const navigate = useNavigate();

    // remove items from cart
    const removeCartItem = (pid) => {
        try {

            let myCart = [...cart];
            let index = myCart.findIndex(item => item._id === pid);
            myCart.splice(index, 1)
            setCart(myCart)
            localStorage.setItem("cart", JSON.stringify(myCart))
            toast.success("Item removed successfully.")

        } catch (error) {
            alert("Something wrong while removing item from cart");
        }
    }


    // show total price on cart
    const totalPrice = () => {
        try {

            let total = 0;
            cart?.map(item => {
                total = total + item.price;
            });

            return total.toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
            });

        } catch (error) {
            toast.error("Something wrong");
            console.log(error);
        }
    }

    // getting total cart product amount
    useEffect(() => {
        if (cart.length > 1) {
            let sum = 0;
            cart?.map((i) => {
                sum = sum + i.price;
            })

            setAmount(sum)
        } else {
            let data = cart[0]?.price;
            setAmount(data)
        }
    }, [cart])

    // conform and place order
    const placeOrder = async () => {
        try {
            const token = JSON.parse(localStorage.auth).token;

            const res = await axios.post(`${BASE_URL}/api/v1/product/place-order`,
                {
                    cart: cart,
                    amount: amount
                },
                {
                    headers: {
                        authorization: token
                    }
                }
            )

            if (res.data.ok) {
                toast.success("Order placed successfully");
                localStorage.removeItem("cart")
                setCart([])
                navigate("/dashboard/user/orders")
            } else {
                throw "Order not placed"
            }

        } catch (error) {
            toast.error(error)
        }
    }

    return (
        <Layout>
            <div className="container py-3">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="text-center bg-light p-2 mb-1">
                            {`Welcome ${auth?.token && auth ? auth.user?.name : "User"}`}
                        </h1>
                        <h4 className="text-center">
                            {cart?.length > 0 ?
                                `You Have ${cart.length} items in your cart
                                ${auth?.token ? "" : "Please login to checkout"}`
                                : `Your Cart is Empty
                                ${auth?.token ? "" : "Please login to checkout"}`}
                        </h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        {cart?.map((p, i) => {
                            return <div className="row mb-2 card flex-row" key={i}>
                                <div className="col-md-4 p-3">
                                    <img className="card-img-top" src={`${BASE_URL}/api/v1/product/product-photo/${p._id}`} alt={p.name} style={{ "height": "10rem" }} />
                                </div>
                                <div className="col-md-8 p-3">
                                    <p>{p.name}</p>
                                    <p>{p.description.substring(0, 30)}...</p>
                                    <p>$ {p.price}</p>
                                    <button className='btn btn-danger' onClick={() => removeCartItem(p._id)}>Remove</button>
                                </div>
                                <hr />
                            </div>
                        })}
                    </div>
                    <div className="col-md-4">
                        <h2>Cart Summary</h2>
                        <p>Total | Checkout | Payment</p>
                        <hr />
                        <h2>Total : {totalPrice()}</h2>
                        {
                            auth?.user?.address ? (
                                <>
                                    <div className="mb-3">
                                        <h4>Current Address</h4>
                                        <h5> {auth?.user?.address} </h5>
                                        <div className='text-center'>
                                            <button className="btn btn-outline-warning fw-bold" onClick={() => navigate("/dashboard/user/profile")}>
                                                UPDATE ADDRESS
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )
                                :
                                (
                                    <div className='my-3 text-center'>
                                        {
                                            auth?.token ? (
                                                <div className="text-center">
                                                    <button className="btn btn-outline-warning fw-bold" onClick={() => navigate("/dashboard/user/profile")}>
                                                        UPDATE ADDRESS
                                                    </button>
                                                </div>
                                            )
                                                :
                                                (
                                                    <button className="btn btn-outline-warning fw-bold" onClick={() => navigate("/login", {
                                                        state: "/cart"
                                                    })}>
                                                        PLEASE LOGIN TO CHECKOUT
                                                    </button>
                                                )
                                        }
                                    </div>
                                )
                        }
                        <div className="mt-4 text-center">
                            <button type="button" className="btn btn-primary text-capitalize" data-bs-toggle="modal" data-bs-target="#staticBackdrop" disabled={
                                cart?.length < 1 || auth?.token=="" ? true : false
                            }>
                                place order
                            </button>

                            {/* Modal  */}
                            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Conform Order</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body col-4">
                                            <ul>
                                                {
                                                    cart?.map((p, i) => {
                                                        return <li key={i}>{p.name}</li>
                                                    })
                                                }
                                            </ul>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={() => {
                                                placeOrder();
                                            }}
                                            >
                                                PLACE ORDER</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    )
}

export default CartPage
