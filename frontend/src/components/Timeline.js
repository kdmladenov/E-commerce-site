import React, { useState } from 'react';
import { getDate } from '../constants/utility-functions';
import './styles/Timeline.css';
import Tooltip from './Tooltip';

const Timeline = ({ children, ...restProps }) => {
  return (
    <ul className={`timeline_container ${restProps.horizontal ? 'horizontal' : ''}`}>
      {children}
    </ul>
  );
};

export default Timeline;

Timeline.Item = function TimelineItem({ children, ...restProps }) {
  const { historyRecord, deleteHistoryItem } = restProps;
  const [removeMode, setRemoveMode] = useState(false);

  return (
    <li
      className="timeline_item"
      onMouseEnter={() => setRemoveMode(true)}
      onMouseLeave={() => setRemoveMode(false)}
    >
      <div className="timeline_item_content">
        {children}
        {removeMode ? (
          <span className="remove_btn" onClick={() => deleteHistoryItem(historyRecord.historyId)}>
            <Tooltip text="Remove">
              <i className="fa fa-times"></i>
            </Tooltip>
          </span>
        ) : (
          <span className="point" />
        )}
        {removeMode ? (
          <span className="date">Remove</span>
        ) : (
          <span className="date">
            {getDate(historyRecord.dateVisited, 0, false)
              .split(',')
              .map((subString, index) => (
                <span key={index}>{subString}</span>
              ))}
          </span>
        )}
      </div>
    </li>
  );
};
