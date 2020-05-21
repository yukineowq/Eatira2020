import React from "react";

import { withAuthorization } from "../Session";
import { Responsive, Container } from "semantic-ui-react";

const PlanPage = () => (
  <Responsive>
    <Container>
      <div>
        <h1>Plan A Meal</h1>
        <p>The Plan A Meal Page is accessible by every signed in user.</p>
      </div>
    </Container>
  </Responsive>
);

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(PlanPage);
