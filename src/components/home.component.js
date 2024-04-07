import React, { Component } from "react";
import SharedClipService from "../services/shared-clip.service";
import AuthService from "../services/auth.service";
import { Link } from "react-router-dom";
import { withRouter } from '../common/with-router';


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.retrieveSharedClips = this.retrieveSharedClips.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      sharedClips: [],
      currentIndex: -1,
      searchTitle: "",
      currentPage: 1,
      itemPerPage: 25
    };
  }

  componentDidMount() {
    this.retrieveSharedClips();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
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

  searchTitle() {
    this.setState({
      currentIndex: -1
    });

    SharedClipService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          sharedClips: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, sharedClips, currentIndex } = this.state;

    return (
      <div className="container">
        <div className="list row">
          <div className="col-md-12">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by title"
                value={searchTitle}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={this.searchTitle}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <h4>Shared Clips List</h4>

            <ul className="list-group">
              {sharedClips &&
                sharedClips.map((tutorial, index) => (
                  <li
                    className={
                      "list-group-item "
                    }
                  >
                    {tutorial.title}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>

    );
  }
}
