import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../Url';

const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [secretQuestion, setSecretQuestion] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const res = await fetch(`${BASE_URL}/api/v1/auth/forgot-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, newPassword, secretQuestion }),
            })

            const data = await res.json();
            console.log("data");
            console.log(data);
            if (data.success) {
                alert(data.message);
                navigate('/login')
            } else {
                alert(data.message);
            }

        } catch (error) {
            alert("Something went wrong");
        }
    }

    return (
        <>
            <Layout>
                <div className='form-bg d-flex justify-content-center align-items-center flex-column'>
                    <h1 className='title mb-3 fw-bold'>Forgot Password</h1>
                    <form className='mform login-form d-flex justify-content-center align-content-center flex-column rounded-2' onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete='off' />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label"> New Password</label>
                            <input type="password" className="form-control" id="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required autoComplete='off' />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="secretQuestion" className="form-label"> Secret Question</label>
                            <input type="password" className="form-control" id="secretQuestion" value={secretQuestion} onChange={(e) => setSecretQuestion(e.target.value)} required autoComplete='off' placeholder='What your Best Friend Name' />
                        </div>

                        <button type="submit" className="btn btn-primary">Change Password</button>
                    </form>

                </div>
            </Layout>
        </>
    )
}

export default ForgotPassword
