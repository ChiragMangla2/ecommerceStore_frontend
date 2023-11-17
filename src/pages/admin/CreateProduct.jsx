import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../Url';

const CreateProduct = () => {

  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState(false);


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
  const handleCreate = async (e) => {
    e.preventDefault();
    try {

      const productData = new FormData()
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);
      const { data } = await axios.post("/api/v1/product/create-product", productData, {
        headers: {
          authorization: JSON.parse(localStorage.auth).token
        }
      });
      if (data?.success) {
        alert("Product created successfully!");
        navigate("/dashboard/admin/products");
      } else {
        alert(data?.message)
      }

    } catch (error) {
      console.log(error);
      alert("Something went wront!");
    }
  }

  useEffect(() => {
    getAllCategory();
  }, [])
  return (
    <Layout>
      <div className="contianer-fluid m-3 p-3">

        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-lg-8 col-md-8 col-12">
            <h1>Create Product</h1>
            <div className="m-1">
              <Form.Select aria-label="Default select example" className='mb-3 border border-dark' onChange={(e) => {
                setCategory(e.target.value);
              }}>
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
                  photo && (
                    <div className="text-center">
                      <img src={URL.createObjectURL(photo)} alt="Product img" height="200px" className='img img-responsive w-auto' />
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
                <button className='btn btn-primary' onClick={handleCreate}>
                  CREATE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreateProduct
