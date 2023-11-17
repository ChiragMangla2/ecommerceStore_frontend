import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import context from '../../Context/context';
import { BASE_URL } from '../../Url';

const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    const getdata = useContext(context);
    const {auth, setAuth} = getdata;
    const location = useLocation();

    useEffect(()=>{
        if(auth?.token){
            navigate(location.state || "/")
        }
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const res = await fetch(`${BASE_URL}/api/v1/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email,password}),
              });
             
              const data = await res.json();
              if(data.success){
                alert(data.message);

                setAuth({...auth, user: data.user, token: data.token})

                localStorage.setItem('auth',JSON.stringify(data));

                navigate(location.state ||'/')
            }else{
                alert(data.message);
            }

        } catch (error) {
            alert("Something went wrong");
        }
    }


    return (
        <Layout>
            <div className='form-bg d-flex justify-content-center align-items-center flex-column'>
                <h1 className='title mb-3 fw-bold'>Sign in</h1>
                <form className='mform login-form d-flex justify-content-center align-content-center flex-column rounded-2 col-lg-3 col-md-5 col-sm-6' onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete='off' />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete='off' />
                    </div>
                    <div className="forget d-flex justify-content-end mb-3">
                        <Link to={'/forgot-password'}>Forgot Password</Link>
                    </div>

                    <button type="submit" className="btn btn-primary">Login</button>
                    <div className='mt-3 d-flex justify-content-end'>
                        <Link to={"/register"}>Don't have an account? </Link>
                    </div>
                </form>

            </div>
        </Layout>
    )
}

export default Login
