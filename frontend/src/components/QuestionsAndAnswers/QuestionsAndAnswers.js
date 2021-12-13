import React, { useEffect, useState } from 'react';
import Button from '../Button';
import './styles/QuestionsAndAnswers.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../actions/userActions';
import QuestionsAndAnswersCard from './QuestionsAndAnswersCard';
import Message from '../Message';
import { listQuestionsAndAnswers } from '../../actions/questionsAndAnswersActions';
import Loader from '../Loader';

const questionCountAtStart = 4;

const QuestionsAndAnswers = ({ currentUser, productId, setQuestionsCount }) => {
  const dispatch = useDispatch();
  const [createMode, setCreateMode] = useState(false);
  const [showAllQuestions, setShowAllQuestions] = useState(false);

  const questionsAndAnswersList = useSelector((state) => state.questionsAndAnswersList);
  const { questions, loading, error } = questionsAndAnswersList;
  const handleOpenCreateForm = () => {
    setCreateMode(true);
  };

  useEffect(() => {
    dispatch(listQuestionsAndAnswers(productId));
    dispatch(getUserDetails(currentUser?.userId));
  }, [dispatch, currentUser?.userId, productId]);

  useEffect(() => {
    if (questions?.length) {
      setQuestionsCount(questions[0]?.totalDBItems);
    }
  }, [setQuestionsCount, questions]);

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const hasUserAskedQuestion = questions?.some(
    (question) => question.userId === currentUser?.userId
  );

  return loading ? (
    <Loader />
  ) : error ? (
    <Message type="error">{error}</Message>
  ) : questions?.length > 0 ? (
    <div className="questions-list">
      Search field TO DO Create Question and Answer To Test
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
      {(showAllQuestions ? questions : questions.slice(0, questionCountAtStart))?.map(
        (question) => {
          return (
            <QuestionsAndAnswersCard
              key={question.questionId}
              {...question}
              currentUser={currentUser}
              createMode={false}
              setCreateMode={setCreateMode}
              fullName={question.fullName}
              avatar={question.avatar}
            />
          );
        }
      )}
      {questions?.length > 1 &&
        (!showAllQuestions ? (
          <Button classes="text" onClick={() => setShowAllQuestions(!showAllQuestions)}>
            <i class="fa fa-chevron-down"></i>{' '}
            {`See more answered questions (${questions?.length - questionCountAtStart})`}
          </Button>
        ) : (
          <Button classes="text" onClick={() => setShowAllQuestions(!showAllQuestions)}>
            <i class="fa fa-chevron-up"></i> {`Collapse questions`}
          </Button>
        ))}
    </div>
  ) : (
    <Message type="success">Ask Question Box</Message>
  );
};

export default QuestionsAndAnswers;
