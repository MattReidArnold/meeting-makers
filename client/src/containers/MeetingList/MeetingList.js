import React, { Component } from 'react';
import axios from 'axios';

import MeetingListItem from './MeetingListItem/MeetingListItem';

class Meetings extends Component {
  state = {
    meetings: []
  };

  componentDidMount() {
    axios.get('/api/meetings').then(res => {
      this.setState({ meetings: res.data });
    });
  }

  renderHeader() {
    return (
      <div className="collection-item">
        <div className="row">
          <div className="col s1">DAY</div>
          <div className="col s1">TIME</div>
          <div className="col s3">GROUP NAME</div>
          <div className="col s3">ADDRESS</div>
          <div className="col s2">CITY</div>
          <div className="col s1">DISTRICT</div>
          <div className="col s1">CODES</div>
        </div>
      </div>
    );
  }

  render() {
    const meetings = this.state.meetings.map(m => {
      return <MeetingListItem key={m._id} {...m} />;
    });
    return (
      <div className="collection">
        {this.renderHeader()}
        {meetings}
      </div>
    );
  }
}

export default Meetings;
