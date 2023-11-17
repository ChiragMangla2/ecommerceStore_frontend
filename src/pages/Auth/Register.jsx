import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import {Link, useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast';
import '../../style/AuthStyle.css'
import { BASE_URL } from '../../Url';

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [secretQuestion, setSecretQuestion] = useState("");
    const navigate = useNavigate();

    // handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const res = await fetch(`${BASE_URL}/api/v1/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name,email,phone,address,password,secretQuestion}),
              });
             
              const data = await res.json();
              if(data.success){
                alert(data.message);
                navigate('/login')
            }else{
                toast.error(data.message);
            }

        } catch (error) {
            toast.error("Something went wrong");
        }
    }

    return (
        <Layout>
            <div className='form-bg d-flex justify-content-center align-items-center flex-column pt-5 pb-5'>
                <h1 className='title mb-3 fw-bold'>Register Page</h1>
                <form className='mform d-flex justify-content-center align-content-center flex-column rounded-2 col-lg-3 col-md-6 col-sm-8 col-10' onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required autoComplete='off' />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete='off' />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Phone</label>
                        <input type="text" className="form-control" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required autoComplete='off' />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input type="text" className="form-control" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required autoComplete='off' />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="secretQuestion" className="form-label">Secret Question</label>
                        <input type="text" className="form-control" id="secretQuestion" value={secretQuestion} onChange={(e) => setSecretQuestion(e.target.value)} required autoComplete='off' placeholder='What is your Best Frined name' />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete='off' />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <div className='mt-3 d-flex justify-content-end'>
                        <Link to={"/login"}>Already have a account? </Link>
                    </div>
                </form>

            </div>
        </Layout>
    )
}

export default Register
