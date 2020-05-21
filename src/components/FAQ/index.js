import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Message,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
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
            size="large"
          >
            <Container>
              <Link to={ROUTES.LANDING}>
                <Image
                  src="https://i.imgur.com/q3ekeqj.jpg"
                  size="tiny"
                  circular
                />
              </Link>
              <br />

              <Link to={ROUTES.FEATURES}>
                <Menu.Item as="a">Features</Menu.Item>
              </Link>
              <Link to={ROUTES.ABOUT}>
                <Menu.Item as="a">About</Menu.Item>
              </Link>
              <Menu.Item position="right">
                <div>
                  <Link to={ROUTES.SIGN_IN}>
                    <Button as="a" inverted={!fixed} color="facebook">
                      Log In
                    </Button>
                  </Link>
                </div>
                <div>
                  <Link to={ROUTES.SIGN_UP}>
                    <Button
                      as="a"
                      inverted={!fixed}
                      //primary={fixed}
                      color="google plus"
                      style={{ marginLeft: "0.5em" }}
                    >
                      Sign Up
                    </Button>
                  </Link>
                </div>
              </Menu.Item>
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
          <Link to={ROUTES.LANDING}>
            <Image src="https://i.imgur.com/q3ekeqj.jpg" size="tiny" circular />
          </Link>
          <br />
          <Link to={ROUTES.FEATURES}>
            <Menu.Item as="a">Features</Menu.Item>
          </Link>
          <Link to={ROUTES.ABOUT}>
            <Menu.Item as="a">About</Menu.Item>
          </Link>
          <Link to={ROUTES.SIGN_IN}>
            <Menu.Item as="a">Log In</Menu.Item>
          </Link>
          <Link to={ROUTES.SIGN_UP}>
            <Menu.Item as="a">Sign Up</Menu.Item>
          </Link>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Menu inverted pointing secondary size="large">
            <Menu.Item onClick={this.handleToggle}>
              <Icon name="sidebar" color="black" />
            </Menu.Item>
            <Menu.Item position="right">
              <Link to={ROUTES.SIGN_IN}>
                <Button as="a" inverted color="facebook">
                  Log In
                </Button>
              </Link>
              <Link to={ROUTES.SIGN_UP}>
                <Button
                  as="a"
                  inverted
                  style={{ marginLeft: "0.5em" }}
                  color="google plus"
                >
                  Sign Up
                </Button>
              </Link>
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

const FAQ = () => (
  <ResponsiveContainer>
    {" "}
    <Header as="h2" textAlign="center" style={{ fontSize: "2em" }}>
      Eatira's FAQ <br /> Frequently Asked Questions
    </Header>
    <br />
    <Container>
      <Message>
        <p textAlign="center">
          1. Am I able to refer to a friend to sign up for an Eatira account?
        </p>
      </Message>
      <Message>
        <p> 2. How do I make reservations with the selected restaurant?</p>
      </Message>
      <Message>
        <p> 3. Am I awarded when I make a reservation through Eatira?</p>
      </Message>
      <Message>
        <p> 4. How do I redeem Eatira-Points?</p>
      </Message>
      <Message>
        <p> 5. Why should I use Chope?</p>
      </Message>
      <Button centered color="instagram">
        Learn More
      </Button>
    </Container>
    <br />
    <Segment inverted vertical style={{ padding: "3em 0em" }}>
      <Container textAlign="center">
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={5}>
              <Header textAlign="center" inverted as="h3" content="Company" />
              <List link inverted>
                <Link to={ROUTES.ABOUT}>
                  <List.Item as="a">About Us</List.Item>
                </Link>
              </List>
            </Grid.Column>
            <Grid.Column width={5}>
              <Header textAlign="center" inverted as="h3" content="Help" />
              <List link inverted>
                <List.Item as="a">FAQ</List.Item>
                <Link to={ROUTES.CONTACTUS}>
                  <List.Item as="a">Contact Us</List.Item>
                </Link>
              </List>
            </Grid.Column>
            <Grid.Column floated="right" width={6}>
              <Image
                src="https://i.imgur.com/q2hXkFV.jpg"
                size="mini"
                centered
                circular
              />
              <Header
                textAlign="center"
                inverted
                as="h4"
                content="© Eatira 2020 All rights reserved."
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>
);

export default FAQ;
