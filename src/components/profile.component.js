import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" }
    };
  }

  componentDidMount() {
    AuthService.getCurrentUser().then(
      response => {
        this.setState({
          currentUser: response.data,
          userReady: true
        });
        console.log(response.data);
      },
      () => {
        this.setState({ redirect: "/login" })
      }
    );
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <div className="container">
        {(this.state.userReady) ?
        <div>
        <header className="jumbotron">
          <h3>
            <strong>Profile</strong>
          </h3>
        </header>

        <p>
          <strong>Id:</strong>{" "}
          {currentUser.user?.id}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.user?.email}
        </p>

      </div>: null}
      </div>
    );
  }
}
