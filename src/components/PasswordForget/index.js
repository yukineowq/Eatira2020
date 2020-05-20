import React, { Component } from "react";
import { Link } from "react-router-dom";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import { Button, Form, Grid, Header, Image, Segment } from "semantic-ui-react";

const PasswordForgetPage = () => (
  <div
    style={{
      backgroundImage: `url(https://i.imgur.com/PKQgE81.jpg?1)`,
      backgroundSize: "cover",
    }}
  >
    <PasswordForgetForm />
  </div>
);

const INITIAL_STATE = {
  email: "",
  error: null,
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
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
    const { email, error } = this.state;

    const isInvalid = email === "";

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
          <Form size="large" onSubmit={this.onSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
                placeholder="Email address"
                type="text"
              />

              <Button
                color="orange"
                fluid
                size="large"
                disabled={isInvalid}
                type="submit"
              >
                Reset My Password
              </Button>
              {error && <p>{error.message}</p>}
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
