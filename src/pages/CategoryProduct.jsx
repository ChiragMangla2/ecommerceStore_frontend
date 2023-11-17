import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../Context/CartProvider';
import toast from 'react-hot-toast';
import { BASE_URL } from '../Url';

const CategoryProduct = () => {

    const [products, setProducts] = useState();
    const [category, setCategory] = useState();
    const params = useParams();
    const [cart, setCart] = useCart();
    const navigate = useNavigate();

    const getProductsByCategory = async () => {
        try {

            const { data } = await axios.get(`${BASE_URL}/api/v1/product/product-category/${params.slug}`);

            setProducts(data?.products);
            setCategory(data?.category);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (params?.slug) {
            getProductsByCategory();
        }
    })


    return (
        <Layout>
            <div className="container mt-3">
                <h4 className="text-center">{category ? (`Category - ${category?.name}`) : ""} </h4>
                <h6 className="text-center">{products ? (`${products?.length} result found `) : ""}</h6>
                <div className="row">
                    {/* show all products */}
                    <div className="d-flex flex-wrap justify-content-center">
                        {products?.map((p) => {
                            return (
                                <div className="card mx-2 my-4" style={{ "width": "18rem" }} key={p._id}>
                                    <img className="card-img-top" src={`${BASE_URL}/api/v1/product/product-photo/${p._id}`} alt={p.name} style={{ "height": "15rem" }} />
                                    <div className="card-body">
                                        <h5 className="card-title"> {p.name} </h5>
                                        <p className="card-text">
                                            {p.description.substring(0, 30)}...
                                        </p>
                                        <p className="card-text">
                                            $ {p.price}
                                        </p>
                                        <button className='btn btn-primary ms-1' onClick={() => {
                                            navigate(`/product/${p.slug}`)
                                        }}>More Details</button>
                                        <button className='btn btn-secondary ms-1' onClick={()=>{
                                            setCart([...cart, p]);
                                            toast.success("Item Added to the cart");
                                            localStorage.setItem("cart", JSON.stringify([...cart, p]));
                                        }}>
                                            ADD TO CART
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CategoryProduct
