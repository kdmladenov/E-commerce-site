import React, { useEffect, useState } from 'react';
import Button from '../Button';
import './styles/QuestionsAndAnswers.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../actions/userActions';
import QuestionsAndAnswersCard from './QuestionsAndAnswersCard';

const QuestionsAndAnswers = ({ questionsAndAnswers, currentUser, productId }) => {
  const dispatch = useDispatch();
  const [createMode, setCreateMode] = useState(false);

  const handleOpenCreateForm = () => {
    setCreateMode(true);
  };

  useEffect(() => {
    dispatch(getUserDetails(currentUser?.userId));
  }, [dispatch, currentUser?.userId]);

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const hasUserAskedQuestion = questionsAndAnswers.some(
    (question) => question.userId === currentUser?.userId
  );

  return (
    <div className="questions-list">
      Search field TO DO
      Create Question and Answer
      To Test
      {!hasUserAskedQuestion && !createMode && (
        <Button onClick={handleOpenCreateForm}>
          <i className="fa fa-plus"></i> Ask Question
        </Button>
      )}
      {createMode && (
        <QuestionsAndAnswersCard
          createMode={createMode}
          setCreateMode={setCreateMode}
          currentUser={currentUser}
          productId={productId}
          fullName={user.fullName}
          userId={user.userId}
          avatar={user.avatar}
        />
      )}
      {questionsAndAnswers?.map((question) => {
        return (
          <QuestionsAndAnswersCard
            key={question.questionId}
            {...question}
            currentUser={currentUser}
            createMode={false}
            setCreateMode={setCreateMode}
          />
        );
      })}
    </div>
  );
};

export default QuestionsAndAnswers;
