import "./Footer.css";
import { FaTwitter, FaFacebookF, FaInstagram, FaGithub } from "react-icons/fa";
import visa from "../../assets/images/payment-method-logo/Visa.png";
import masterCard from "../../assets/images/payment-method-logo/Mastercard.png";
import googlePay from "../../assets/images/payment-method-logo/G Pay.png";
import applePay from "../../assets/images/payment-method-logo/applePay.png";
import paypal from "../../assets/images/payment-method-logo/Paypal.png";

const Footer = () => {
  return (
    <div className="footer-main container-fluid">
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-sm-12">
            <div className="column-1">
              <h2>SHOP.CO</h2>
              <p>
                We have clothes that suits your style and which you’re proud to
                wear. From women to men.
              </p>
              <div className="social-icons d-flex gap-2">
                <div className="item">
                  <FaTwitter />
                </div>
                <div className="item">
                  <FaFacebookF />
                </div>
                <div className="item">
                  <FaInstagram />
                </div>
                <div className="item">
                  <FaGithub />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-2 col-sm-6">
            <div className="column-2">
              <h3>Company</h3>
              <ul>
                <li>About</li>
                <li>Features</li>
                <li>Works</li>
                <li>Career</li>
              </ul>
            </div>
          </div>
          <div className="col-md-2 col-sm-6">
            <div className="column-3">
              <h3>Help</h3>
              <ul>
                <li>Customer Support</li>
                <li>Delivery Details</li>
                <li>Terms & Condition</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          <div className="col-md-2 col-sm-6">
            <div className="column-4">
              <h3>FAQ</h3>
              <ul>
                <li>Account</li>
                <li>Manage Delivery</li>
                <li>Orders</li>
                <li>Payments</li>
              </ul>
            </div>
          </div>
          <div className="col-md-2 col-sm-6">
            <div className="column-4">
              <h3>Resources</h3>
              <ul>
                <li>Free eBooks</li>
                <li>Development Tutorials</li>
                <li>How to - Blog</li>
                <li>YouTube Playlist</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-wrapper">

            <div className="copyright">
              <p>Shop.co © 2000-2023, All Rights Reserved</p>
            </div>

            <div className="payment-methods">
              <div className="item">
                <img src={visa} alt="visa-card" />
              </div>
              <div className="item">
                <img src={masterCard} alt="mastercard" />
              </div>
              <div className="item">
                <img src={paypal} alt="paypal" />
              </div>
              <div className="item">
                <img src={applePay} alt="applePay" />
              </div>
              <div className="item">
                <img src={googlePay} alt="googlePay" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
