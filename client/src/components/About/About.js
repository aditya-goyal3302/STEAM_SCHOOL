import React from "react";
import "./About.css";
import Navbar from "../Navbar";
import Footer from "../Footer";
function About(){
    return(
        <>
        <Navbar></Navbar>
        <div className="about-page">
      <h1>About Us</h1>
      <p>Welcome to our educational platform!</p>
      <p>
        At Steam School, our mission is to provide high-quality education to learners
        around the world. We believe in the power of education to transform lives and create
        opportunities for personal and professional growth.
      </p>
      <p>
        Our team of dedicated educators and experts are passionate about sharing knowledge and
        fostering a love for learning. Whether you're a student looking to expand your horizons,
        a professional seeking to enhance your skills, or someone curious about a new subject,
        we have something for you.
      </p>
      <p>
        Steam School offers a wide range of courses in various subjects,
        delivered through engaging and interactive content. Our platform is designed to be user-friendly,
        making learning accessible to everyone.
      </p>
      <p>
        Thank you for choosing Steam School as your learning partner.
        Join us on this educational journey, and let's unlock the doors to knowledge together!
      </p>
      <p>
        If you have any questions or feedback, feel free to <a href="/contact">contact us</a>.
      </p>
    </div>

    <Footer></Footer>
        </>
    )
}



export default About;