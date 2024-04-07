import React, { Component } from "react";
import SharedClipService from "../services/shared-clip.service";

export default class AddSharedClip extends Component {
  constructor(props) {
    super(props);
    this.onChangeclipUrl = this.onChangeclipUrl.bind(this);
    this.saveSharedClip = this.saveSharedClip.bind(this);
    this.newSharedClip = this.newSharedClip.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "",
      clipUrl: "",
      message: "",

      submitted: false
    };
  }

  onChangeclipUrl(e) {
    this.setState({
      clipUrl: e.target.value
    });
  }

  saveSharedClip() {
    var data = {
      clip_url: this.state.clipUrl
    };

    SharedClipService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.error.message) ||
          error.message ||
          error.toString();

        this.setState({
          message: resMessage
        });
      });
  }

  newSharedClip() {
    this.setState({
      id: null,
      title: "",
      description: "",
      clipUrl: "",
      message: "",

      submitted: false
    });
  }

  render() {
    return (
      <div className="container">
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={this.newSharedClip}>
                Add
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="clipUrl">Clip Url</label>
                <input
                  type="text"
                  className="form-control"
                  id="clipUrl"
                  required
                  onChange={this.onChangeclipUrl}
                  value={this.state.clipUrl}
                  name="clipUrl"
                />
              </div>

              <button onClick={this.saveSharedClip} className="btn btn-success">
                Submit
              </button>
              {this.state.message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {this.state.message}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}