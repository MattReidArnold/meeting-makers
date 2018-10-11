import React, { Component } from 'react';
import axios from 'axios';

class Meetings extends Component {
  state = {
    meetings: []
  };

  componentDidMount() {
    axios.get('/api/meetings').then(res => {
      this.setState({ meetings: res.data });
    });
  }

  renderContent() {
    return this.state.meetings.map(m => {
      return (
        <div key={m._id} className="collection-item">
          <div className="row">
            <div className="col s1">{m.day}</div>
            <div className="col s1">{m.time}</div>
            <div className="col s3">{m.groupName}</div>
            <div className="col s3">{m.address}</div>
            <div className="col s2">{m.city}</div>
            <div className="col s1">{m.district}</div>
            <div className="col s1">{m.codes}</div>
          </div>
        </div>
      );
    });
  }

  render() {
    return <div className="collection">{this.renderContent()}</div>;
  }
}

export default Meetings;
