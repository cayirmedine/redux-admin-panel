import React, { Component } from "react";
import { connect } from "react-redux";
import { logIn } from "../actions/LoginAction";
import {
  Button,
  Segment,
  Input,
  Grid,
  Header,
  Icon,
  Message,
} from "semantic-ui-react";
import { Redirect } from "react-router-dom";

class LogIn extends Component {
  state = {
    username: "",
    password: "",
  };

  onUserNameChange = (e, { value }) => {
    this.setState({ username: value });
  };

  onPasswordChange = (e, { value }) => {
    this.setState({ password: value });
  };

  onFormSubmit = (event) => {
    this.props.logIn(this.state.username, this.state.password);
  };

  render() {
    const { loginSpinnerValue, loginErrorValue, redirectUrlValue } = this.props;
    if (redirectUrlValue) {
      return <Redirect to={redirectUrlValue} />;
    }

    return (
      <div>
        <Grid centered columns={2}>
          <Grid.Column>
            <Segment
              raised
              style={{
                marginTop: "7em",
                marginRight: "5em",
                marginLeft: "5em",
              }}
            >
              <Header as="h2" icon textAlign="center">
                <Icon name="cart" circular />
                <Header.Content>BirTakım Market</Header.Content>
              </Header>
              <Message negative hidden={!loginErrorValue} style={{
                  marginLeft: "4em",
                  marginRight: "4em",
                  marginTop: "1em",
                }}>
                <Message.Header>
                  {loginErrorValue}
                </Message.Header>
              </Message>
              <Input
                icon="user"
                iconPosition="left"
                placeholder="Username"
                fluid
                style={{
                  marginLeft: "4em",
                  marginRight: "4em",
                  marginTop: "3em",
                }}
                onChange={this.onUserNameChange}
              />
              <Input
                icon="lock"
                type="password"
                iconPosition="left"
                placeholder="Password"
                fluid
                style={{
                  marginLeft: "4em",
                  marginRight: "4em",
                  marginTop: "1.5em",
                  marginBottom: "2.5em",
                }}
                onChange={this.onPasswordChange}
              />
              <Button
                type="submit"
                primary
                fluid
                loading={loginSpinnerValue}
                onClick={this.onFormSubmit}
              >
                Login
              </Button>
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { loginSpinnerValue, loginErrorValue, redirectUrlValue } =
    state.LoginReducer;
  return {
    loginSpinnerValue,
    loginErrorValue,
    redirectUrlValue,
  };
};

export default connect(mapStateToProps, { logIn })(LogIn);
