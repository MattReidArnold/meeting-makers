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
    <tr>
      <td>{day}</td>
      <td>{time}</td>
      <td>{groupName}</td>
      <td>{address}</td>
      <td>{city}</td>
      <td>{district}</td>
      <td>{codes}</td>
    </tr>
  );
};

export default MeetingListItem;
