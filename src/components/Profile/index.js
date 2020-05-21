import React from "react";

import { AuthUserContext, withAuthorization } from "../Session";

const ProfilePage = () => (
  <AuthUserContext.Consumer>
    {(authUser) => (
      <div>
        <h1>Profile Page</h1>

        <p>The profile Page is accessible by every signed in user.</p>
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(ProfilePage);
