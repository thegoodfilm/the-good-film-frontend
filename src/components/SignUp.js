import React from "react";
import "../styles/Signup.css";

import { Form, Button } from "react-bootstrap";

const SignUp = (props) => {
  return (
    <div className="signup-container">
      <span>{props.message}</span>
      <Form onSubmit={props.submitSignUp}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Jane"
            size="Small text"
            name="name"
            value={props.newUser.name}
            onChange={(event) => props.changeHandlerSignUp(event.target)}
          />
        </Form.Group>
        <Form.Group controlId="lastName">
          <Form.Label>Lastname</Form.Label>
          <Form.Control
            type="text"
            placeholder="Doe"
            size="Small text"
            name="lastName"
            value={props.newUser.lastName}
            onChange={(event) => props.changeHandlerSignUp(event.target)}
          />
        </Form.Group>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="marvellouseJane"
            size="Small text"
            name="username"
            value={props.newUser.username}
            onChange={(event) => props.changeHandlerSignUp(event.target)}
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="janedoe@example.com"
            size="Small text"
            name="email"
            value={props.newUser.email}
            onChange={(event) => props.changeHandlerSignUp(event.target)}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="*******"
            size="Small text"
            name="password"
            value={props.newUser.password}
            onChange={(event) => props.changeHandlerSignUp(event.target)}
          />
        </Form.Group>
    
        <Button variant="secondary" type="submit">
          Sign up
        </Button>{" "}
      </Form>
    </div>
  );
};

export default SignUp;
