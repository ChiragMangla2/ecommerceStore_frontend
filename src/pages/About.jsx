import React from 'react'
import Layout from '../components/Layout/Layout'

const About = () => {
  return (
    <Layout>
      <div className="contactus row">
        <div className="col-lg-5 col-12 d-flex justify-content-center align-items-center">
          <img src="/images/aboutme.png" style={{"width":"100%", "height": "100%"}} className='' alt="Contact us" />
        </div>
        <div className="col-lg-5 col-12 d-flex justify-content-center align-items-lg-start align-items-center flex-column p-5">
          <h1 className="bg-dark p-2 w-50 text-center text-white rounded-3">
            About us
          </h1>
          <div className="text-justify mt-2 h-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae nisi molestias ab voluptatibus quod aperiam aut dicta magni, rerum, ut sint! Cumque velit id ad ab. Vero voluptatum velit ad fugiat animi ratione a ex delectus sapiente totam, iusto ipsam exercitationem in, omnis cupiditate, soluta possimus porro tempore. Id enim autem vitae earum error cupiditate modi sint tenetur aut minus facere tempora vero sit, soluta numquam expedita asperiores necessitatibus possimus, mollitia blanditiis. Unde debitis veritatis dolore ea quisquam similique, suscipit ipsum pariatur autem sapiente in sed. Odio, minus deserunt tempora inventore fugit non, ratione repudiandae dolorem obcaecati, quibusdam iusto cupiditate.
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default About
