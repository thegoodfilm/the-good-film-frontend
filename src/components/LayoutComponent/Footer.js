import React from "react";
import "../../styles/Footer.css";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer className="page-footer font-small blue">
        <div className="footer-copyright text-center py-3">
          © 2020 Created by{" "}
          <a
            className="color-footer"
            style={{ textDecoration: "none" }}
            href="https://www.linkedin.com/in/sara-palaciosdepedro/"
          >
            Sara Palacios{" "}
          </a>
          || Powered by{" "}
          <a
            className="color-footer"
            style={{ textDecoration: "none" }}
            href="https://www.themoviedb.org/"
          >
            themoviedb.com{" "}
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
