import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import toast from 'react-hot-toast';
import context from '../../Context/context';
import axios from 'axios';
import profile from "../../../public/images/profile.png"
import { BASE_URL } from '../../Url';

const Profile = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  // contextapi
  const getdata = useContext(context);
  const { auth, setAuth } = getdata;

  // get user data
  useEffect(() => {

    const { name, email, phone, address } = auth?.user;
    setName(name);
    setEmail(email);
    setPhone(phone);
    setAddress(address);

  }, [auth?.user])



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const token = JSON.parse(localStorage.auth).token;
      const { data } = await axios.put(`${BASE_URL}/api/v1/auth/profile`, {
        name, password, phone, address
      },
        {
          headers: {
            authorization: token
          }
        })

      if (data.success) {
        setAuth({ ...auth, user: data?.updatedUser })
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success(data?.message)
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9 d-flex justify-content-center align-items-center form-container rounded-3 flex-column flex-lg-row p-5 py-lg-0">
            <div className="col-lg-6 col-12 p-lg-5 d-flex justify-content-center">
              <form className='d-flex justify-content-center align-content-center flex-column rounded-2 w-100 p-5 shadow bg-white rounded' onSubmit={handleSubmit}>
                <h3 className='text-center'>USER PROFILE</h3>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required autoComplete='off' />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete='off' disabled />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Phone</label>
                  <input type="number" className="form-control" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required autoComplete='off' />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Address</label>
                  <input type="text" className="form-control" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required autoComplete='off' />
                </div>
                <button type="submit" className="btn fw-bold btn-dark">UPDATE</button>
              </form>
            </div>
            <div className="col-lg-6 col-12 d-flex justify-content-center overflow-hidden">
              <img src={profile} className='h-100 w-100' alt="profile"/>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Profile
