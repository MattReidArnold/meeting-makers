import React from 'react';

const MeetingListItem = ({
  day,
  time,
  groupName,
  address,
  city,
  district,
  codes
}) => {
  return (
    <div className="collection-item">
      <div className="row">
        <div className="col s1">{day}</div>
        <div className="col s1">{time}</div>
        <div className="col s3">{groupName}</div>
        <div className="col s3">{address}</div>
        <div className="col s2">{city}</div>
        <div className="col s1">{district}</div>
        <div className="col s1">{codes}</div>
      </div>
    </div>
  );
};

export default MeetingListItem;
