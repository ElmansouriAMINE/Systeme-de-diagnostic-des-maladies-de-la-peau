import React, { useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../../contexts/AuthContext";
import logo from './Green.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import ModalLogout from "../update/ModalLogout";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function NavBar() {
  const [click, setClick] = useState(false);
  const {isLoggedIn} = useAuth()
  const {logout} = useAuth()
  const handleClick = () => setClick(!click);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fLogout = ()=>{
    logout();
    setShow(false);
    return <Navigate to='/login'/>
}
  return (
    <>

      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact="true" to="/" className="nav-logo">
            <img src={logo} alt="logo" width={150} height={90}  className="logo-nav"/>
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
               exact="true"
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact="true"
                to="/about"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact="true"
                to="/contact"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Contact Us
              </NavLink>
            </li>
            {!isLoggedIn ? <li className="nav-item">
              <NavLink
                exact="true"
                to="/login"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Login
              </NavLink>
            </li>
            :
            <li className="nav-item">
            <button className="btn-logout" onClick={handleShow}>
              Logout 
              <FontAwesomeIcon icon={faSignOutAlt} className="icon" />
            </button>
          </li>
          }
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Logout Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={fLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
}

export default NavBar;