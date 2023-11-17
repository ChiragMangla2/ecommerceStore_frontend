import React, { useContext } from 'react'
import Layout from '../components/Layout/Layout'
import context from '../Context/context';
import { BASE_URL } from '../Url';

const Search = () => {
    // contextApi
    const getdata = useContext(context);
    const { values, setValues } = getdata;
    return (
        <Layout>
            <div className="container">
                <div className="text-center">
                    <h1>Search Results</h1>
                    <h6> {values?.results.length < 1 ? "No Products Found" : `Found ${values?.results.length}`} </h6>

                    <div className="d-flex flex-wrap mt-4">
                        {values?.results.map((c) => {
                            return (
                                <div className="card m-2" style={{ "width": "18rem" }} key={c._id}>
                                    <img className="card-img-top" src={`${BASE_URL}/api/v1/product/product-photo/${c._id}`} alt={c.name} style={{ "height": "15rem" }} />
                                    <div className="card-body">
                                        <h5 className="card-title"> {c.name} </h5>
                                        <p className="card-text">
                                            {c.description.substring(0, 30)}...
                                        </p>
                                        <p className="card-text">
                                            $ {c.price}
                                        </p>
                                        <button className='btn btn-primary ms-1'>More Details</button>
                                        <button className='btn btn-secondary ms-1'>ADD TO CART</button>
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Search
