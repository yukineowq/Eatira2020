import React from "react";

import { withAuthorization } from "../Session";

const SavedPostPage = () => (
  <div>
    <h1>Saved Post Page</h1>
    <p>The saved post Page is accessible by every signed in user.</p>
  </div>
);

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(SavedPostPage);
