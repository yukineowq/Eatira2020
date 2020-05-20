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

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as="h1"
      content="eat() at where you love"
      inverted
      style={{
        fontSize: mobile ? "2em" : "4em",
        fontWeight: "normal",
        marginBottom: 1,
        marginTop: mobile ? "1.5em" : "3em",
        color: "black",
      }}
    />
    <Header
      as="h1"
      content="Share your food passion."
      inverted
      style={{
        fontSize: mobile ? "1.0em" : "1.3em",
        fontWeight: "normal",
        marginTop: mobile ? "0.5em" : "1.0em",
        color: "black",
      }}
    />
    <div>
      <Link to={ROUTES.SIGN_UP}>
        <Button secondary size="huge">
          Get Started
          <Icon name="right arrow" />
        </Button>
      </Link>
    </div>
  </Container>
);

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
};

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
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
          <Segment
            inverted
            textAlign="center"
            style={{
              minHeight: 700,
              padding: "0.2em 0em",
              backgroundImage: `url(https://i.imgur.com/QhaTVVJ.jpg)`,
              backgroundSize: "cover",
              backgroundPosition: "centre",
              // backgroundRepeat: "no-repeat",
              height: "100%",
              width: "100",
            }}
            vertical
          >
            <Menu
              fixed={fixed ? "top" : null}
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
                <Menu.Item as="a">Features</Menu.Item>
                <Menu.Item as="a">About</Menu.Item>
                <Menu.Item as="a">Eatira Deals</Menu.Item>
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
            <HomepageHeading />
          </Segment>
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
          <Menu.Item as="a">Features</Menu.Item>
          <Menu.Item as="a">About</Menu.Item>
          <Menu.Item as="a">Eatira Deals</Menu.Item>
          <Link to={ROUTES.SIGN_IN}>
            <Menu.Item as="a">Log In</Menu.Item>
          </Link>
          <Link to={ROUTES.SIGN_UP}>
            <Menu.Item as="a">Sign Up</Menu.Item>
          </Link>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign="center"
            style={{
              minHeight: "100%",
              padding: "0em 0em",
              backgroundImage: `url(https://i.imgur.com/sHwcQjg.jpg?2)`,
              backgroundSize: "cover",
              flex: 1,
              backgroundPosition: "centre",
              backgroundRepeat: "no-repeat",
              height: "70vh",
              width: "100vw",
            }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size="large">
                <Menu.Item onClick={this.handleToggle} color="black">
                  <Icon name="sidebar" />
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
            </Container>
            <HomepageHeading mobile />
          </Segment>

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

const HomepageLayout = () => (
  <ResponsiveContainer>
    <Segment style={{ padding: "8em 0em" }} vertical>
      <Header as="h3" textAlign="center" style={{ fontSize: "2em" }}>
        Why Eatira ?
      </Header>
      <br />
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={5}>
            <Image
              src="https://image.flaticon.com/icons/svg/2082/2082045.svg"
              size="small"
              centered
            />
            <Header as="h3" textAlign="center" style={{ fontSize: "2em" }}>
              Plan A Meal
            </Header>
            <Header as="h5" textAlign="center" style={{ fontSize: "1.33em" }}>
              The most delicious and fastest decision to decide your daily meal
            </Header>
          </Grid.Column>
          <Grid.Column width={5}>
            <Image
              src="https://image.flaticon.com/icons/svg/523/523229.svg"
              size="small"
              centered
            />
            <Header as="h3" textAlign="center" style={{ fontSize: "2em" }}>
              Always Free
            </Header>
            <Header as="h5" textAlign="center" style={{ fontSize: "1.33em" }}>
              Of course it's completely free for you, and non-hassle.
            </Header>
          </Grid.Column>
          <Grid.Column floated="right" width={6}>
            <Image
              src="https://image.flaticon.com/icons/png/512/2933/2933317.png"
              size="small"
              centered
            />
            <Header as="h3" textAlign="center" style={{ fontSize: "2em" }}>
              Sharing Online
            </Header>
            <Header as="h5" textAlign="center" style={{ fontSize: "1.33em" }}>
              What will we eat next? See your friends, family & colleagues' meal
              posts!
            </Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment inverted vertical style={{ padding: "5em 0em" }}>
      <Container textAlign="center">
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={5}>
              <Header textAlign="center" inverted as="h3" content="Company" />
              <List link inverted>
                <List.Item as="a">About Us</List.Item>
                <List.Item as="a">Our Stories</List.Item>
                <List.Item as="a">Join Us</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={5}>
              <Header textAlign="center" inverted as="h3" content="Help" />
              <List link inverted>
                <List.Item as="a">FAQ</List.Item>
                <List.Item as="a">Contact Us</List.Item>
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
                content="©2020 by Eatira All Rights Reserved"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>
);

export default HomepageLayout;
