import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { SignUpLink } from "../SignUp";
import { PasswordForgetLink } from "../PasswordForget";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";

const SignInPage = () => (
  <div>
    <h1 style={{ color: "red" }}>Sign In</h1>
    <SignInForm />
    <PasswordForgetLink />
    <SignUpLink />
  </div>
);

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
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
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";

    return (
      //   <form onSubmit={this.onSubmit}>
      //     <input
      //       name="email"
      //       value={email}
      //       onChange={this.onChange}
      //       type="text"
      //       placeholder="Email Address"
      //     />
      //     <input
      //       name="password"
      //       value={password}
      //       onChange={this.onChange}
      //       type="password"
      //       placeholder="Password"
      //     />
      //     <button disabled={isInvalid} type="submit">
      //       Sign In
      //     </button>

      //     {error && <p>{error.message}</p>}
      //   </form>

      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            <Image src="https://i.imgur.com/q3ekeqj.jpg" /> Log-in to your
            account
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                name="email"
                value={email}
                onChange={this.onChange}
                placeholder="E-mail address"
              />

              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                name="password"
                value={password}
                onChange={this.onChange}
                placeholder="Password"
                type="password"
              />

              <Button
                color="teal"
                fluid
                size="large"
                disabled={isInvalid}
                type="submit"
              >
                Login
              </Button>
              {error && <p>{error.message}</p>}
            </Segment>
          </Form>
          <Message>
            New to us? <a href="/signup">Sign Up</a>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);

export default SignInPage;

export { SignInForm };
