import React, { useState } from 'react';
import { getDate } from '../constants/utility-functions/utility-functions';
import './styles/Timeline.css';

const Timeline = ({ children, ...restProps }) => {
  return (
    <div className={`timeline_container ${restProps.horizontal ? 'horizontal' : ''}`}>
      {/* <h2>{restProps.title}</h2> */}
      {children}
    </div>
  );
};

export default Timeline;

Timeline.Item = function TimelineItem({ children, ...restProps }) {
  const { historyRecord, deleteHistoryItem } = restProps;
  const [removeMode, setRemoveMode] = useState(false);

  return (
    <div
      className="timeline_item"
      onMouseEnter={() => setRemoveMode(true)}
      onMouseLeave={() => setRemoveMode(false)}
    >
      <div className="timeline_item_content">
        {children}
        {removeMode ? (
          <span className="remove_btn" onClick={() => deleteHistoryItem(historyRecord.historyId)}>
            <i className="fa fa-times"></i>
          </span>
        ) : (
          <span className="point" />
        )}
        <span className="date">
          {removeMode ? 'Remove' : `${getDate(historyRecord.dateVisited)}`}
        </span>
      </div>
    </div>
  );
};