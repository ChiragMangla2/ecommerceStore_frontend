import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { BASE_URL } from '../../Url';

const UpdateProduct = () => {

    const navigate = useNavigate();
    const params = useParams();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [photo, setPhoto] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState(false);
    const [id, setId] = useState("");
    const [categoryId, setCategoryId] = useState("");

    // get single product
    const getSingleProduct = async () => {
        try {

            const { data } = await axios.get(`${BASE_URL}/api/v1/product/get-product/${params.slug}`);
            setId(data.products._id);
            setName(data.products.name);
            setDescription(data.products.description);
            setPrice(data.products.price);
            setQuantity(data.products.category.name);
            setQuantity(data.products.quantity);
            setShipping(data.products.shipping);
            setCategoryId(data.products.category._id);

        } catch (error) {
            toast.error("Something wrong")
            console.log(error);
        }
    }

    useEffect(() => {
        getSingleProduct();
        //eslint-disable-next-line
    }, []);

    // get all categories data
    const getAllCategory = async () => {
        try {

            const { data } = await axios.get(`${BASE_URL}/api/v1/category/get-category`)

            if (data?.success) {
                setCategories(data.allCategory);
                setCategory(data.allCategory[0]._id);
            }

        } catch (error) {
            alert("Something get wrong while getting category");
        }
    }

    // handle create product
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {

            const productData = new FormData()
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("category", categoryId);
            productData.append("quantity", quantity);
            photo && productData.append("photo", photo);
            const { data } = await axios.put(`/api/v1/product/update-product/${id}`, productData, {
                headers: {
                    authorization: JSON.parse(localStorage.auth).token
                }
            });
            if (data.success) {
                toast.success("Product updated successfully!");
                navigate("/dashboard/admin/products");
            } else {
                toast.success(data?.message)
            }

        } catch (error) {
            console.log(error);
            toast.error("Something wrong!");
        }
    }

    useEffect(() => {
        getAllCategory();
    }, [])

    // Delete product
    const handleDelete = async () => {
        try {

            const confirmation = confirm(`Are you sure you want to delete ${name} product.`)

            if(confirmation){
                const {data} = await axios.delete(`${BASE_URL}/api/v1/product/delete-product/${id}`);
                navigate("/dashboard/admin/products")
                toast.success("Product deleted successfully!");                
            }
            
        } catch (error) {
            console.log(error);
            toast.success("Something went wrong!");
        }
    }

    return (
        <Layout>
            <div className="contianer-fluid m-3 p-3">

                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Update Product</h1>
                        <div className="m-1 w-75">
                            <Form.Select aria-label="Default select example" className='mb-3 border border-dark' value={categoryId} onChange={(e) => {
                                setCategoryId(e.target.value);
                            }} >
                                {
                                    categories?.map((c, i) => {
                                        return <option key={c._id} value={c._id}> {c.name} </option>
                                    })
                                }
                            </Form.Select>
                            <div className="mb-3">
                                <label htmlFor="upload_image" className='btn btn-outline-secondary col-md-12'>
                                    {photo ? photo.name : "Upload Photo"}
                                    <input type="file" id='upload_image' name='photo' accept='image/*' onChange={(e) => { setPhoto(e.target.files[0]) }} hidden />
                                </label>
                            </div>
                            <div className="mb-3">
                                {
                                    photo ? (
                                        <div className="text-center">
                                            <img src={URL.createObjectURL(photo)} alt="Product img" height="200px" className='img img-responsive w-auto' />
                                        </div>
                                    ) :
                                    (
                                        <div className="text-center">
                                            <img src={`${BASE_URL}/api/v1/product/product-photo/${id}`} alt="Product img" height="200px" className='img img-responsive w-auto' />
                                        </div>
                                    )
                                }
                            </div>
                            <div className="mb-3">
                                <input type="text" value={name} placeholder='Write your product name' onChange={e => setName(e.target.value)} className='form-control my-3 border border-dark' />
                                <textarea rows={5} type="text" value={description} placeholder='Write your product description' onChange={e => setDescription(e.target.value)} className='form-control my-3 border border-dark' />
                                <input type="number" value={price} placeholder='Write your product price' onChange={e => setPrice(e.target.value)} className='form-control my-3 border border-dark' />
                                <input type="number" value={quantity} placeholder='Write your product quantity' onChange={e => setQuantity(e.target.value)} className='form-control my-3 border border-dark' />
                                <Form.Select aria-label="Default select example" className='mb-3 border border-dark' onChange={(e) => { setShipping(e.target.value); }}>
                                    <option value={false}> No </option>
                                    <option value={true}> Yes </option>
                                </Form.Select>
                            </div>
                            <div className="mb-3">
                                <button className='btn btn-primary' onClick={handleUpdate}>
                                    UPDATE PRODUCT
                                </button>
                            </div>
                            <div className="mb-3">
                                <button className='btn btn-danger' onClick={handleDelete}>
                                    DELETE PRODUCT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UpdateProduct
