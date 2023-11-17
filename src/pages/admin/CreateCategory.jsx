import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios';
import CategoryForm from '../../components/Form/categoryForm';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BASE_URL } from '../../Url';

const CreateCategory = () => {

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  // react bootstrap model
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  // get all categories data
  const getAllCategory = async () => {
    try {

      const { data } = await axios.get(`${BASE_URL}/api/v1/category/get-category`)

      if (data) {
        setCategories(data.allCategory);
        setName("")
      }

    } catch (error) {
      alert("Something get wrong while getting category");
    }
  }

  // handle Submit new category
  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = JSON.parse(localStorage.auth).token;

    try {

      const { data } = await axios.post(`${BASE_URL}/api/v1/category/create-category`, { name },
        {
          headers: {
            authorization: token
          }
        })
      console.log("handleSubmit", data);
      if (data?.success) {
        alert(`${name} is created.`);
        getAllCategory();
      } else {
        alert(data.message);
      }

    } catch (error) {
      console.log(error);
      alert("Something went wrong!")
    }
  }

  // handle Submit update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {

      const { data } = await axios.put(`${BASE_URL}/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }, {
          headers: {
            authorization: JSON.parse(localStorage.auth).token
          }
      })

      if (data.success) {
        alert(data.message);
        setSelected(null);
        setUpdatedName("");
        handleClose();
        getAllCategory();
      } else {
        alert(data.message);
      }

    } catch (error) {
      alert("Something went wrong!");
    }
  }

  // handle Submit delete category
  const handleDelete = async (id) => {
    try {

    const { data } = await axios.delete(`${BASE_URL}/api/v1/category/delete-category/${id}`, {
          headers: {
            authorization: JSON.parse(localStorage.auth).token
          }
      })
      console.log(data);

      if (data.success) {
        alert(data.message);
        getAllCategory();
      } else {
        alert(data.message);
      }

    } catch (error) {
      alert("Something went wrong!");
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
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3">
              <CategoryForm value={name} handleSubmit={handleSubmit} setValue={setName} />
            </div>
            <div className='w-75'>
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => {
                    return <tr key={c._id}>
                      <td key={c._id}> {c.name} </td>
                      <td>
                        <Button variant="primary" onClick={() => {
                          handleShow(); setUpdatedName(c.name); setSelected(c)
                        }}>
                          Edit
                        </Button>
                        <button className="btn btn-danger ms-2" onClick={()=>{handleDelete(c._id)}}>Delete</button>
                        
                        {/* React Bootstrap model */}
                        <Modal
                          show={show}
                          onHide={handleClose}
                          backdrop="static"
                          keyboard={false}
                        >
                          <Modal.Header closeButton>
                            <Modal.Title>Update Category</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />
                          </Modal.Body>
                        </Modal>
                      </td>
                    </tr>
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    </Layout>

  )
}

export default CreateCategory
