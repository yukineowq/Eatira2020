import React from "react";

import { AuthUserContext, withAuthorization } from "../Session";
import { Responsive, Container } from "semantic-ui-react";

const ProfilePage = () => (
  <Responsive>
    <Container>
      <AuthUserContext.Consumer>
        {(authUser) => (
          <div>
            <h1>Profile Page</h1>

            <p>The Profile Page is accessible by every signed in user.</p>
          </div>
        )}
      </AuthUserContext.Consumer>
    </Container>
  </Responsive>
);

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(ProfilePage);
