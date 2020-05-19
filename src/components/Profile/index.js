import React from "react";

import { withAuthorization } from "../Session";

const ProfilePage = () => (
  <div>
    <h1>Profile Page</h1>
    <p>The profile Page is accessible by every signed in user.</p>
  </div>
);

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(ProfilePage);
