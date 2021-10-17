import React from 'react';

const QuestionsAndAnswers = ({ children, ...restProps }) => {
  return (
    <div className="questions_and_answers" {...restProps}>
      {children}
    </div>
  );
};

export default QuestionsAndAnswers;
