import React from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "../../styles/Login.module.css";
import LogPoster from "../../images/Login.png";

const Login = () => {
  return (
    <div className={classes.loginOut}>
      <div className={classes.login}>
        <img className={classes.poster} src={LogPoster} />
        <Form className={classes.loginForm}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Travel Buddy</Form.Label>
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
