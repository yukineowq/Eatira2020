import React from "react";

import { withAuthorization } from "../Session";

const PlanPage = () => (
  <div>
    <h1>Plan Page</h1>
    <p>The plan Page is accessible by every signed in user.</p>
  </div>
);

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(PlanPage);
