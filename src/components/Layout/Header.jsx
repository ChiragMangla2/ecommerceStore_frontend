import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import context from '../../Context/context';
import SearchInput from '../Form/SearchInput';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../Context/CartProvider';
import toast from 'react-hot-toast';
import "../../index.css"
const Header = () => {

    // contextapi
    const getdata = useContext(context);
    const { auth, setAuth } = getdata;

    const [cart, setCart] = useCart();

    const categories = useCategory();

    const handleLogout = () => {
        toast.success("Logout Successfully!")
        setAuth({
            ...auth, user: null, token: ""
        })

        setCart([])

        localStorage.clear();
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-light px-2 d-flex align-items-center mx-2">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" style={{ "letterSpacing": "2px", "fontSize": "1.1rem" }} to="/">
                        Ecommerce App
                    </NavLink>
                    <button className="navbar-toggler" style={{ "fontSize": ".9rem" }} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto gap-3 d-flex align-items-center">
                            <div className="nav-item">
                                <SearchInput />
                            </div>
                            <li className="nav-item">
                                <NavLink className="navlink" to="/">
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <NavLink className="navlink dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Category
                                </NavLink>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    {
                                        categories?.map((c, i) => {
                                            return <li key={i} className='px-2'>
                                                <NavLink className="dropdown-item" to={`/category/${c.slug}`} >
                                                    {c.name}
                                                </NavLink>
                                            </li>
                                        })
                                    }
                                    <li className='px-2'>
                                        <NavLink className="dropdown-item" to={`/categories`} >
                                            All Categories
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>

                            <li className='nav-item dropdown'>
                                <NavLink className="navlink dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {auth?.user?.name || "Profile"}
                                </NavLink>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">



                                    {
                                        !auth.user ? (<>
                                            <li className="nav-item">
                                                <NavLink className="navlink" to="/about">
                                                    About us
                                                </NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink className="navlink" to="/contact">
                                                    Contact us
                                                </NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink className="navlink" to="/policy">
                                                    Policies
                                                </NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink className="navlink" to="/register">
                                                    Register
                                                </NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink className="navlink" to="/login">
                                                    Login
                                                </NavLink>
                                            </li></>) : (
                                            <>
                                                <li className="nav-item">
                                                    <NavLink className="navlink" to={`/dashboard/${auth?.user?.role == 1 ? "admin" : "user"}`}>
                                                        Dashboard
                                                    </NavLink>
                                                </li>
                                                <li className="nav-item">
                                                    <NavLink className="navlink" to="/about">
                                                        About us
                                                    </NavLink>
                                                </li>
                                                <li className="nav-item">
                                                    <NavLink className="navlink" to="/contact">
                                                        Contact us
                                                    </NavLink>
                                                </li>
                                                <li className="nav-item">
                                                    <NavLink className="navlink" to="/policy">
                                                        Policies
                                                    </NavLink>
                                                </li>
                                                <li className="nav-item">
                                                    <NavLink className="navlink" to="/login" onClick={handleLogout}>
                                                        Logout
                                                    </NavLink>
                                                </li>
                                            </>)
                                    }



                                </ul>
                            </li>



                            <li className="nav-item">
                                <NavLink className="navlink" to="/cart">
                                    <div className='position-relative'>
                                        Cart
                                        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger">
                                            {cart?.length}
                                        </span>
                                    </div>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Header
