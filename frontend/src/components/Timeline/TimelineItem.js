import React from 'react';
import './styles/Timeline.css';

const TimelineItem = ({ children }) => {
  return (
    <div className="timeline-item">
      <div className="timeline-item-content">
        {children}
        <span className="circle" />
      </div>
    </div>
  );
};

export default TimelineItem;
