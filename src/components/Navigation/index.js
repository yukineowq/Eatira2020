import React from "react";
import { Menu } from "semantic-ui-react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";
import { AuthUserContext } from "../Session";
import SignUpPage from "../SignUp";
import LandingPage from "../Landing";
import SignInPage from "../SignIn";
import PasswordForgetPage from "../PasswordForget";

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {(authUser) => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = () => (
  <Menu>
    <Menu.Item>
      <Link to={ROUTES.HOME}>Home</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to={ROUTES.ACCOUNT}>Account</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to={ROUTES.PROFILE}>Profile</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to={ROUTES.PLAN}>Plan</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to={ROUTES.SAVED_POSTS}>Saved Posts</Link>
    </Menu.Item>
    <Menu.Item>
      <SignOutButton />
    </Menu.Item>
  </Menu>
);

const NavigationNonAuth = () => (
  <Router>
    <div>
      <Link to={ROUTES.LANDING} />
      <Link to={ROUTES.SIGN_IN} />
    </div>
  </Router>
);

export default Navigation;
