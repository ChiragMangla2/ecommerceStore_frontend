import React, { useContext, useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import context from '../Context/context';
import axios from 'axios';
import { Price } from '../components/Price';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartProvider'
import toast from 'react-hot-toast';
import { BASE_URL } from '../Url';

const Home = () => {
  // contextApi
  const getdata = useContext(context);

  const [cart, setCart] = useCart();

  // states
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // getTotal count 
  const getTotal = async () => {
    try {

      const { data } = await axios.get(`${BASE_URL}/api/v1/product/product-count`);
      setTotal(data?.total)

    } catch (error) {
      console.log(error);
      toast.error("Something wrong!");
    }
  }

  // get all categories data
  const getAllCategory = async () => {
    try {

      const { data } = await axios.get(`${BASE_URL}/api/v1/category/get-category`)

      if (data) {
        setCategories(data.allCategory);
      }

    } catch (error) {
      toast.error("Something get wrong while getting category");
    }
  }

  useEffect(() => {
    getTotal();
    getAllCategory();
  }, []);

  // get All Products
  const getAllProducts = async () => {
    try {

      setLoading(true);
      const { data } = await axios.get(`${BASE_URL}/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data?.products)

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  }

  useEffect(() => {
    if (!checked.length || !radio.length) {
      getAllProducts();
    }

  }, [checked.length, radio.length]);


  useEffect(() => {
    if (page === 1) {
      return
    }
    loadMore()
  }, [page])

  // load more
  const loadMore = async () => {
    try {

      setLoading(true);
      const { data } = await axios.get(`${BASE_URL}/api/v1/product/product-list/${page}`);
      setProducts([...products, ...data?.products])
      setLoading(false);

    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }


  // handle filtered category
  const handleFilter = async (value, id) => {
    let all = [...checked]
    if (value) {
      all.push(id)
    } else {
      all = all.filter(c => c !== id)
    }
    setChecked(all);
  }

  // get filterd product
  const filterProduct = async () => {
    try {

      const { data } = await axios.post(`${BASE_URL}/api/v1/product/product-filters`, { checked, radio });

      setProducts(data?.products)

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct();
    }
  }, [checked, radio])

  return (
    <Layout>
      <div className="row mt-3">
        <div className="col-md-2">
          <h4 className='text-center'>Filter By Category</h4>

          <div className="px-3 d-flex flex-lg-column flex-md-column align-items-center justify-content-evenly flex-wrap">
            {categories?.map((c, i) => {
              return <div className="form-check my-1" key={c._id}>
                <input className="form-check-input border border-black" type="checkbox" value="" id={`flexCheckDefault-${i}`} onChange={(e) => { handleFilter(e.target.checked, c._id) }} />
                <label className="form-check-label" htmlFor={`flexCheckDefault-${i}`}>
                  {c.name}
                </label>
              </div>
            })}
          </div>

          {/* price filter */}
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-md-column align-items-center flex-wrap justify-content-evenly px-3">
            {Price?.map((p, i) => {
              return <div className="form-check" key={p.id}>
                <input className="form-check-input" type="radio" name="flexRadioDefault" id={`flexRadioDefault1-${i}`} onChange={e => { setRadio([e.target.value]) }} value={p.array} />
                <label className="form-check-label col-12" htmlFor={`flexRadioDefault1-${i}`} value={p.array}>
                  {p.name}
                </label>
              </div>
            })}
          </div>

          <div className="d-flex justify-content-center my-2">
            <button className="btn btn-danger" onClick={() => window.location.reload()}>
              RESET fILTERS
            </button>
          </div>

        </div>
        <div className="col-md-10 overflow-x-hidden">
          <h1 className='text-center'>All Products</h1>

          {/* show all products */}
          <div className="d-flex flex-wrap justify-content-center justify-content-md-start justify-content-sm-center">
            {
              products?.length > 0 ? (products?.map((c) => {
                return (
                  <div className="card m-2 m-md-3" style={{ "width": "18rem" }} key={c._id}>
                    <img className="card-img-top" src={`${BASE_URL}/api/v1/product/product-photo/${c._id}`} alt={c.name} style={{ "height": "15rem" }} />
                    <div className="card-body">
                      <h5 className="card-title"> {c.name} </h5>
                      <p className="card-text">
                        {c.description.substring(0, 30)}...
                      </p>
                      <p className="card-text">
                        $ {c.price}
                      </p>
                      <button className='btn btn-primary ms-1' onClick={() => {
                        navigate(`/product/${c.slug}`)
                      }}>More Details</button>
                      <button className='btn btn-secondary ms-1' onClick={() => {
                        setCart([...cart, c]);
                        toast.success("Item Added to the cart");
                        localStorage.setItem("cart", JSON.stringify([...cart, c]));
                      }}>ADD TO CART</button>
                    </div>
                  </div>
                )
              })) : (<h2>Product Not Available</h2>)
            }
          </div>

          {/* load more */}
          {
            checked.length == 0 && radio.length == 0 ? (
              <div className="m-2 p-3">
                {products && products.length < total && (
                  <button className="btn btn-warning" onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}>
                    {loading ? "Loading..." : "Load more"}
                  </button>
                )}
              </div>
            ) : ""
          }
        </div>
      </div>
    </Layout>
  )
}

export default Home
