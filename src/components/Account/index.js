import React from "react";

import { AuthUserContext, withAuthorization } from "../Session";
import PasswordChangeForm from "../PasswordChange";
import { Container, Responsive } from "semantic-ui-react";

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {(authUser) => (
      <Responsive>
        <Container>
          <h1>Account: {authUser.email}</h1>
          <p>
            <strong>Change Password</strong>
          </p>
          <PasswordChangeForm />
        </Container>
      </Responsive>
    )}
  </AuthUserContext.Consumer>
);

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(AccountPage);
