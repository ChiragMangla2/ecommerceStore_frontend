import React from 'react'
import Layout from '../components/Layout/Layout'
import { BiMailSend, BiPhoneCall, BiSupport } from 'react-icons/bi';

const Contact = () => {
  return (
    <Layout>
      <div className="contactus row">
        <div className="col-lg-5 col-12 d-flex justify-content-center align-items-center">
          <img src="/images/contactus.png" style={{"width":"100%", "height": "100%"}} alt="Contact us" />
        </div>
        <div className="col-lg-5 col-12 d-flex justify-content-center align-items-lg-start align-items-center flex-column p-5">
          <h1 className="bg-dark p-2 fs-3 text-white rounded-3">
            Contact us
          </h1>
          <div className="text-justify mt-2 text-center">
            Any query releted to the product feel free to contact us. We'r available 24/7
          </div>
          <div className="mt-3 contact-details d-flex flex-column">
            <div className='text-decoration-none py-1 px-3 h5 flex-wrap text-black link'>
              <BiMailSend /> : www.help@ecommerceapp.com
            </div>
            <div className='text-decoration-none py-1 px-3 h5 text-black link'>
              <BiPhoneCall /> : +91-9876543210
            </div>
            <div className='text-decoration-none py-1 px-3 h5 text-black link'>
              <BiSupport /> :1800-0000-0000 (toll free)
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Contact
