import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Spinner = ({path = "login"}) => {

    const [count, setCount] = useState(2);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevalue) => --prevalue)
        }, 1000);
        if (count === 0) 
        {
            navigate(`/${path}`, {
                state: location.pathname
            });
            return () => clearInterval(interval)
        }
    }, [count, navigate, location,path]);



return (
    <div className='d-flex flex-column justify-content-center align-items-center' style={{ height: "100vh" }}>
        <h1 className='text-center'>Redirecting to you in {count} second.</h1>
        <div className="spinner-border text-primary" role="status">
            <span className="sr-only"></span>
        </div>
    </div>
)
}

export default Spinner
