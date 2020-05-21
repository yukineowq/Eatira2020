import React from "react";

import { withAuthorization } from "../Session";
import { Responsive, Container } from "semantic-ui-react";

const SavedPostPage = () => (
  <Responsive>
    <Container>
      <div>
        <h1>Saved Posts Page</h1>
        <p>The Saved Posts Page is accessible by every signed in user.</p>
      </div>
    </Container>
  </Responsive>
);

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(SavedPostPage);
