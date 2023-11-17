import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../../Url'

const Products = () => {

    const [allProducts, setAllProducts] = useState([]);

    // get all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}/api/v1/product/get-product`);
            if (data?.success) {
                setAllProducts(data.products);
            }
        } catch (error) {
            alert("Something went wrong!");
        }
    }

    // delete product
    const handleDelete = async (id, pname) => {
        try {
            console.log(id, " ", pname);
            const conformation = confirm(`Are you sure you want to delete ${pname} product`);
            console.log(conformation);
            if (conformation) {
                const { data } = await axios.delete(`${BASE_URL}/api/v1/product/product/${id}`)
            }
        } catch (error) {
            alert("Something went wrong while deleting");
            console.log(error);
        }
    }

    useEffect(() => {
        getAllProducts();
    }, [handleDelete]);

    return (
        <Layout>
            <div className="contianer-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>

                    {/* display all products */}
                    <div className="col-md-9">
                        <h1>All Products List</h1>
                        <div className='d-flex flex-wrap justify-content-center gap-2'>
                            {allProducts?.map((c) => {
                                return (
                                    <Link key={c._id} to={`/dashboard/admin/product/${c.slug}`} className='text-decoration-none'>
                                        <div className="card m-2" style={{ "width": "18rem" }}>
                                            <img className="card-img-top" src={`${BASE_URL}/api/v1/product/product-photo/${c._id}`} alt={c.name} />
                                            <div className="card-body">
                                                <h5 className="card-title"> {c.name} </h5>
                                                <p className="card-text">
                                                    {c.description}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Products
