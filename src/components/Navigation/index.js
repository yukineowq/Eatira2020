import React from "react";
import { Input, Menu, Container, Responsive, Segment } from "semantic-ui-react";
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
  <Responsive>
    <Menu stackable>
      <Menu.Item>
        <img src="https://i.imgur.com/q3ekeqj.jpg" />
      </Menu.Item>
      <Menu.Item>
        <Link to={ROUTES.HOME}>Home</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to={ROUTES.PLAN}>Plan A Meal</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to={ROUTES.SAVED_POSTS}>Saved Posts</Link>
      </Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item>
          <Input icon="search" placeholder="Search..." />
        </Menu.Item>

        <Menu.Item>
          <Link to={ROUTES.PROFILE}>Profile</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to={ROUTES.ACCOUNT}>Account</Link>
        </Menu.Item>
        <Menu.Item>
          <SignOutButton />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  </Responsive>
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
