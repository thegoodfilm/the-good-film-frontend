import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <div>
      <footer className="page-footer font-small blue">
        <div className="footer-copyright text-center py-3">
          © 2020 Copyright:
          <p> Stackhouse.com</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
