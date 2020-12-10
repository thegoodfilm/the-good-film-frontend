import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Navbar.css";

import {
  Button,
  Navbar,
  Nav,
  NavDropdown,
  FormControl,
  Form,
} from "react-bootstrap";


const MyNavBar = (props) => {



  const welcome = `Welcome, ${props.isLogged.name}`;
  return (
    <div>
      <Navbar className="bg-navbar" variant="dark" expand="lg">
        <Navbar.Brand href="#home">theGoodFilm</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#link">Movies</Nav.Link>
            <NavDropdown title="Movies" id="basic-nav-dropdown">
              <NavDropdown.Item href="/nowoncinemas">
                Now on cinemas
              </NavDropdown.Item>
              <NavDropdown.Item href="/upcomings">Upcomings</NavDropdown.Item>
              <NavDropdown.Item href="/toprated">Top rated</NavDropdown.Item>

              <NavDropdown.Item href="/trendings">
                Trending this week{" "}
              </NavDropdown.Item>
            
            </NavDropdown>
            {props.isLogged.username && (
              <NavDropdown title="My account" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
          <Nav className="mr-auto">
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search movie"
                className="mr-sm-2"
                onChange={(event)=>props.changeSearchedWord(event.target.value)}
               
      
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Nav>
          <Nav>
            {props.isLogged.username && (
              <NavDropdown title={welcome} id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => props.logOut()}>
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>

          <div>
            {!props.isLogged.username && (
              <Button href="/signup" variant="light">
                Sign up
              </Button>
            )}
            {""}
            {!props.isLogged.username && (
              <Button href="/login" variant="light">
                Log in
              </Button>
            )}
            {""}
          </div>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};



export default MyNavBar;
