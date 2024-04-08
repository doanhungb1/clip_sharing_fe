import React, { Component } from "react";
import SharedClipService from "../services/shared-clip.service";
import SharedClipComponent from './shared-clip.component';
import NotificationComponent from './notification.component';
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.retrieveSharedClips = this.retrieveSharedClips.bind(this);
    this.refreshList = this.refreshList.bind(this);

    this.state = {
      sharedClips: [],
      currentIndex: -1,
      currentPage: 1,
      itemPerPage: 25,
      redirect: null
    };
  }

  componentDidMount() {
    AuthService.getCurrentUser().then(
      () => {
        this.retrieveSharedClips();
      },
      () => {
        this.setState({ redirect: "/login" })
      }
    );


  }

  retrieveSharedClips() {
    SharedClipService.getAll(this.state.currentPage, this.state.itemPerPage)
      .then(response => {
        this.setState({
          sharedClips: response.data.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveSharedClips();
    this.setState({
      currentIndex: -1
    });
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }

    const { sharedClips } = this.state;

    return (
      <div className="container">
        <div>
          <NotificationComponent />
        </div>
        <div className="list row">
          <div className="col-md-12">
            <h4 className="text-sm">Shared Clips List</h4>

            <ul className="list-group">
              {sharedClips &&
                sharedClips.map((shared_clips, index) => (
                  <><li
                    className={"list-group-item "}
                  >
                    {shared_clips.title}
                  </li>
                  <SharedClipComponent data={shared_clips} /></>
                ))}
            </ul>
          </div>
        </div>
      </div>

    );
  }
}
