import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { useCart } from '../Context/CartProvider';
import toast from 'react-hot-toast';
import { BASE_URL } from '../Url';

const ProductDetails = () => {

    const params = useParams();
    const [product, setProduct] = useState();
    const [relatedProducts, setRelatedProducts] = useState([]);
    const navigate = useNavigate();
    const [cart, setCart] = useCart();

    // get-product
    const getProduct = async () => {
        try {

            const { data } = await axios.get(`${BASE_URL}/api/v1/product/get-product/${params.slug}`);

            setProduct(data?.products);
            getSimilarProduct(data?.products._id, data?.products.category._id);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (params?.slug) {
            getProduct()
            window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        }
    }, [params?.slug])

    useEffect(()=>{
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    },[])

    // get similar product
    const getSimilarProduct = async (pid, cid) => {
        try {

            const { data } = await axios.get(`${BASE_URL}/api/v1/product/related-product/${pid}/${cid}`);

            setRelatedProducts(data?.products)

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout>
            <div className="row mt-4 px-lg-5 px-3">
                <div className="col-lg-5 col-md-6 col-sm-10">
                    <img className="card-img-top" src={`${BASE_URL}/api/v1/product/product-photo/${product?._id}`} alt={product?.name} height="300" width={"350px"} />
                </div>
                <div className="col-lg-5 col-md-6 col-sm-12 px-3">
                    <h1 className='text-center'>Product Details</h1>
                    <h6>Name : {product?.name} </h6>
                    <h6>Description : {product?.description} </h6>
                    <h6>Price : {product?.price} </h6>
                    <h6>Category : {product?.category.name} </h6>
                    <h6>Shipping : {product?.shipping ? "Available" : "Not Available"} </h6>

                    <button type='button' className="btn btn-warning ms-1 mt-3" onClick={() => {
                        setCart([...cart, product]);
                        toast.success("Item Added to the cart");
                        localStorage.setItem("cart", JSON.stringify([...cart, product]));
                    }}>ADD TO CART</button>
                </div>
            </div>

            <hr />

            {/* show related products */}
            <div className="row mx-0">
                <h1>Similar products</h1>
                {relatedProducts.length < 1 && <p className='text-center'> No Similar product found</p>}
                <div className="d-flex flex-wrap justify-content-center justify-content-lg-start">
                    {relatedProducts?.map((p) => {
                        return (
                            <div className="card m-2" style={{ "width": "18rem" }} key={p._id}>
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

                                    <button className='btn btn-secondary ms-1' onClick={() => {
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
        </Layout>
    )
}

export default ProductDetails
