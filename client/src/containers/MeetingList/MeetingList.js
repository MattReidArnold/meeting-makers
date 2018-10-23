import React, { Component } from 'react';
import axios from 'axios';

import MeetingListItem from './MeetingListItem/MeetingListItem';

const PAGE_SIZE = 20;

class Meetings extends Component {
  state = {
    meetings: [],
    page: 1
  };

  componentDidMount() {
    this.fetchMeetings(this.state.page).then(res => {
      this.setState({ meetings: res.data });
    });
  }

  fetchMeetings = page =>
    axios.get(`/api/meetings?page_number=${page}&page_size=${PAGE_SIZE}`);

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

  loadNextPage = () => {
    const page = this.state.page + 1;
    this.fetchMeetings(page).then(res => {
      this.setState(prevState => {
        return { meetings: prevState.meetings.concat(res.data), page };
      });
    });
  };

  renderLoadMoreButton() {
    return (
      <div className="collection-item">
        <div className="row">
          <div className="col">
            <button className="btn" onClick={this.loadNextPage}>
              Load more meetings
            </button>
          </div>
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
        {this.renderLoadMoreButton()}
      </div>
    );
  }
}

export default Meetings;
