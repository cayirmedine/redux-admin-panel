import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";

import { connect } from "react-redux";
import { logIn, googleLogIn, facebookLogIn } from "../actions/LoginAction";
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
    phone: "",
    password: "",
  };

  onPhoneChange = (e, { value }) => {
    this.setState({ phone: value });
  };

  onPasswordChange = (e, { value }) => {
    this.setState({ password: value });
  };

  responseGoogle = (response) => {
    console.log(response);
    console.log(response.tokenObj.id_token);
    this.props.googleLogIn({ token: response.tokenObj.id_token });
  };

  responseFacebook = (response) => {
    console.log(response);
    console.log(response.signedRequest);
    this.props.facebookLogIn({ fullName: response.name, email: response.email, token: response.accessToken })
  };

  onFormSubmit = (event) => {
    this.props.logIn(this.state);
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
              <Message
                negative
                hidden={!loginErrorValue}
                style={{
                  marginLeft: "4em",
                  marginRight: "4em",
                  marginTop: "1em",
                }}
              >
                <Message.Header>{loginErrorValue}</Message.Header>
              </Message>
              <Input
                icon="user"
                iconPosition="left"
                placeholder="Phone"
                fluid
                style={{
                  marginLeft: "4em",
                  marginRight: "4em",
                  marginTop: "3em",
                }}
                onChange={this.onPhoneChange}
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
              <div>
                <GoogleLogin
                  clientId="433932131364-qbntk6s77q5k6n9vu1ljd8hm99q79mcf.apps.googleusercontent.com"
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogle}
                  cookiePolicy={"single_host_origin"}
                />
              </div>
              <div>
                <FacebookLogin
                  appId="384353386508756"
                  fields="name,email"
                  callback={this.responseFacebook}
                />
              </div>
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

export default connect(mapStateToProps, { logIn, googleLogIn, facebookLogIn })(LogIn);
