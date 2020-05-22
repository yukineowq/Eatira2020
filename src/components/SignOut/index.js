import React from "react";

import { withFirebase } from "../Firebase";

import { Button } from "semantic-ui-react";

const SignOutButton = ({ firebase }) => (
  <Button type="button" onClick={firebase.doSignOut} color="google plus">
    Sign Out
  </Button>
);

export default withFirebase(SignOutButton);
