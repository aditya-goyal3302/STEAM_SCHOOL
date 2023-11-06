import React from "react";
import "./Footer.css";

function Footer(){
    return(
        <>
        <footer>
      <div className="footer-container">
        <div className="footer-column">
          <h3>About Us</h3>
          <p>
            This is a website about education. We provide high-quality educational
            resources to students and teachers around the world.
          </p>
        </div>
        <div className="footer-column">
          <h3>Contact Us</h3>
          <p>
            If you have any questions or feedback, please feel free to contact us at:
            <br />
            <a href="">Stream School</a>
          </p>
        </div>
        <div className="footer-column">
          <h3>Social Media</h3>
          <ul className="social-media-links">
            <li>
              <a href="https://www.facebook.com/example">
                <i className="fab fa-facebook-f"></i>
              </a>
            </li>
            <li>
              <a href="https://www.twitter.com/example">
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/example">
                <i className="fab fa-instagram"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-copyright">
        <p>Copyright &copy; 2023 Example Website. All rights reserved.</p>
      </div>
    </footer>
        </>
    )
}



export default Footer;