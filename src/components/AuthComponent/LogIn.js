import React from "react";
import "../../styles/Forms.css";
import { Form, Button } from "react-bootstrap";

const LogIn = (props) => {
  return (
    <div className="form-container">
      <Form onSubmit={props.submitLogIn}>
        <Form.Group controlId="username">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="janedoe@example.com"
            size="Small text"
            value={props.loggingUser.email}
            onChange={(event) => props.changeHandlerLogIn(event.target)}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="*******"
            size="Small text"
            value={props.loggingUser.password}
            onChange={(event) => props.changeHandlerLogIn(event.target)}
          />
        </Form.Group>
        <div className="form-align">
          <p>{props.message}</p>
        </div>
        <div className="form-align">
          <Button variant="secondary" type="submit">
            Log in
          </Button>{" "}
        </div>
      </Form>
    </div>
  );
};

export default LogIn;
