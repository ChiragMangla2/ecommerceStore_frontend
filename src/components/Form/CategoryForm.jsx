import React from 'react'

const CategoryForm = ({ handleSubmit, value, setValue }) => {


    return (
        <>
            <form onSubmit={handleSubmit} className='d-flex gap-2'>
                <div className="mb-3">
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter new category" value={value} onChange={(e) => setValue(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary h-50">Submit</button>
            </form>

        </>
    )
}

export default CategoryForm
