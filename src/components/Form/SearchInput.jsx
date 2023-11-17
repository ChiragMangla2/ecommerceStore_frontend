import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import context from '../../Context/context';
import axios from 'axios';

const SearchInput = () => {
    // contextApi
    const getdata = useContext(context);
    const {values, setValues} = getdata;
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(`/api/v1/product/search/${values.keyword}`)

            setValues({ ...values, results: data });
            navigate("/search");

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <form className="d-flex p-0" role="search" onSubmit={handleSubmit}>
                <input className="form-control" type="search" placeholder="Search" aria-label="Search" value={values.keyword} onChange={e => setValues({ ...values, keyword: e.target.value })} />
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
        </>
    )
}

export default SearchInput
