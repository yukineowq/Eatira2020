import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  Button,
  Card,
  Container,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
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
              <Menu.Item as="a">About</Menu.Item>
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
                      color="red"
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
          <Menu.Item as="a">About</Menu.Item>
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
                  color="red"
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

const About = () => (
  <ResponsiveContainer>
    <Segment
      inverted
      textAlign="center"
      style={{
        minHeight: "100%",
        padding: "0em 0em",
        backgroundImage: `url(https://i.imgur.com/QhaTVVJ.jpg?1)`,
        backgroundSize: "cover",
        flex: 1,
        backgroundPosition: "centre",
        backgroundRepeat: "no-repeat",
        height: "70vh",
        width: "100vw",
      }}
      vertical
    >
      <Card centered>
        <Card.Content>
          <Card.Header>
            Hello! We are Eatira <br />
            <Icon name="smile outline" />
          </Card.Header>
          <Card.Meta>
            <span className="date">Joined in 2020</span>
          </Card.Meta>
          <Card.Description>
            <h3> We love food & food connects people.</h3>
            Our goal is to help our users find the <strong>best</strong> food
            social media application that can <strong>automate</strong> all
            these painful processes of selecting a restaurant & decide on the{" "}
            <strong>best</strong> menu to fit your requests.
            <h4>Founders, Reuben & Yuki</h4>
          </Card.Description>
        </Card.Content>
      </Card>
      <br />
    </Segment>
    <Segment inverted vertical style={{ padding: "3em 0em" }}>
      <Container textAlign="center">
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={5}>
              <Header textAlign="center" inverted as="h3" content="Company" />
              <List link inverted>
                <List.Item as="a">About Us</List.Item>
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

export default About;
