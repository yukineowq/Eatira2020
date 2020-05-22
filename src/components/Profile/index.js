import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  Icon,
  Responsive,
  Container,
  Segment,
  Grid,
  Header,
  Image,
  Input,
  Menu,
  Sidebar,
  Visibility,
} from "semantic-ui-react";

import SignOutButton from "../SignOut";
import { withAuthorization } from "../Session";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class DesktopContainer extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children } = this.props;
    const { fixed } = this.state;

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Menu
            inverted={fixed}
            pointing={fixed}
            secondary={!fixed}
            size="small"
          >
            <Container>
              <Image
                src="https://i.imgur.com/q3ekeqj.jpg"
                size="tiny"
                circular
              />
              <br />
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
            </Container>
          </Menu>
        </Visibility>

        {children}
      </Responsive>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
};

class MobileContainer extends Component {
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { children } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation="push"
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <br />

          <Image src="https://i.imgur.com/q3ekeqj.jpg" size="tiny" circular />

          <br />
          <Link to={ROUTES.HOME}>
            <Menu.Item as="a">Home</Menu.Item>
          </Link>
          <Link to={ROUTES.PLAN}>
            <Menu.Item as="a">Plan A Meal</Menu.Item>
          </Link>
          <Link to={ROUTES.SAVED_POSTS}>
            <Menu.Item as="a">Saved Posts</Menu.Item>
          </Link>
          <Link to={ROUTES.PROFILE}>
            <Menu.Item as="a">Profile</Menu.Item>
          </Link>
          <Link to={ROUTES.ACCOUNT}>
            <Menu.Item as="a">Account</Menu.Item>
          </Link>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Menu inverted pointing secondary size="large">
            <Menu.Item onClick={this.handleToggle}>
              <Icon name="sidebar" color="black" />
            </Menu.Item>
            <Menu.Item position="right">
              <Menu.Item>
                <SignOutButton />
              </Menu.Item>
            </Menu.Item>
          </Menu>
          {children}
        </Sidebar.Pusher>
      </Responsive>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
};

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
};

const ProfilePage = () => (
  <ResponsiveContainer>
    <br />

    <Segment inverted vertical style={{ padding: "3em 0em" }}>
      <Container textAlign="center">
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={16}>
              <Image
                src="https://i.imgur.com/q2hXkFV.jpg"
                size="mini"
                centered
                circular
              />
              <Header
                textAlign="center"
                inverted
                as="h5"
                content="© Eatira 2020"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>
);

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(ProfilePage);
