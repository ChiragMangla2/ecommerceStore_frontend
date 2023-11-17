import React from 'react'
import Layout from "../components/Layout/Layout"
import useCategory from '../hooks/useCategory'
import { Link } from 'react-router-dom';

const Categories = () => {
    const categories = useCategory();

    return (
        <Layout>
            <div className="d-flex justify-content-center align-items-center my-5">
                <div className="row p-3">
                    {categories?.map(c => {
                        return <div className="col-md-5 col-12 text-center mx-1" key={c._id}>
                            <Link to={`/category/${c.slug}`} className='btn btn-primary col-12 py-3 fs-4 my-2'>
                                {c.name}
                            </Link>
                        </div>
                    })}
                </div>
            </div>
        </Layout>
    )
}

export default Categories
