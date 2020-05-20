import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import { compose } from "recompose";
import { Button, Form, Grid, Header, Image, Segment } from "semantic-ui-react";

const SignUpPage = () => (
  <div
    style={{
      backgroundImage: `url(https://i.imgur.com/PKQgE81.jpg?1)`,
      backgroundSize: "cover",
    }}
  >
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null,
};

class SignUpFormBase extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { username, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) => {
        // Create a user in your Firebase realtime database
        return this.props.firebase.user(authUser.user.uid).set({
          username,
          email,
        });
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch((error) => {
        this.setState({ error });
      });
    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "";

    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <div>
            <Link to={ROUTES.LANDING}>
              <Header as="h1" color="teal" textAlign="center">
                <Image src="https://i.imgur.com/48NIKsN.jpg" />
              </Header>
            </Link>
          </div>
          <br />
          <Form size="large" onSubmit={this.onSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                name="username"
                value={username}
                onChange={this.onChange}
                type="text"
                placeholder="Full Name"
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                name="email"
                value={email}
                onChange={this.onChange}
                placeholder="E-mail"
                type="text"
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                name="passwordOne"
                value={passwordOne}
                onChange={this.onChange}
                placeholder="Password"
                type="password"
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                name="passwordTwo"
                value={passwordTwo}
                onChange={this.onChange}
                placeholder="Confirm Password"
                type="password"
              />

              <Button
                color="orange"
                fluid
                size="large"
                disabled={isInvalid}
                type="submit"
              >
                Sign Up
              </Button>
              {error && <p>{error.message}</p>}
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };
