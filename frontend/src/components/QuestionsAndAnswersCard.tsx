import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import './styles/QuestionsAndAnswers.css';
import {
  createAnswer,
  deleteQuestion,
  editQuestion,
  voteQuestion
} from '../state/actions/questionsAndAnswersActions';
import { ANSWER, ANSWERS_COUNT_AT_START } from '../constants/constants';

import EditButtons from './EditButtons';
import ShowMoreButton from './ShowMoreButton';
import AnswerCard from './AnswerCard';
import Votes from './Votes';
import Button from './Button';
import Divider from './Divider';
import InputBoxWithAvatar from './InputBoxWithAvatar';
import QuestionsAndAnswersCardProps from '../models/components/QuestionsAndAnswersCardProps';
import AnswerType from '../models/AnswerType';

const QuestionsAndAnswersCard: React.FC<QuestionsAndAnswersCardProps> = ({
  currentUser,
  userId: authorId,
  questionId,
  questionContent,
  answers,
  thumbsUp,
  thumbsDown,
  userThumbsUpList,
  userThumbsDownList
}) => {
  const [editMode, setEditMode] = useState(false);
  const [contentQuestion, setContentQuestion] = useState(questionContent);
  const answerList: AnswerType[] = JSON.parse(answers);
  const [showAllAnswers, setShowAllAnswers] = useState(false);

  const dispatch = useDispatch();

  const handleQuestionEditButton = () => {
    setEditMode(true);
  };

  const handleQuestionCloseButton = () => {
    setEditMode(false);
    setContentQuestion(questionContent);
  };

  const handleQuestionDeleteButton = () => {
    dispatch(deleteQuestion(questionId));
    setEditMode(false);
  };

  const handleQuestionSaveButton = () => {
    dispatch(editQuestion(questionId, contentQuestion));
    setEditMode(false);
  };

  return (
    <div className="question_and_answer_card card">
      <div className="votes_container">
        <Votes
          showButtons={true}
          voteAction={voteQuestion}
          itemId={questionId}
          reactionNameUp="THUMBS_UP"
          reactionNameDown="THUMBS_DOWN"
          votesUpCount={thumbsUp}
          votesDownCount={thumbsDown}
          userVotesUpList={userThumbsUpList}
          userVotesDownList={userThumbsDownList}
          currentUserId={currentUser?.userId}
          type="vertical"
          iconUp="fa fa-chevron-up"
          iconDown="fa fa-chevron-down"
        />
      </div>
      <div className="question_and_answer">
        <div
          className={`question ${
            currentUser?.userId === authorId ? 'current_user' : ''
          }`}
        >
          <div className="textarea ">
            {editMode ? (
              <input
                type="text"
                value={contentQuestion}
                onChange={(e) => setContentQuestion(e.target.value)}
              />
            ) : contentQuestion?.length > 300 ? (
              <ShowMoreButton breakpoint={300} text={contentQuestion} />
            ) : (
              contentQuestion
            )}
          </div>
          <EditButtons
            editMode={editMode}
            isUserAuthorized={currentUser?.userId === authorId}
            handleEditButton={handleQuestionEditButton}
            handleCloseButton={handleQuestionCloseButton}
            handleDeleteButton={handleQuestionDeleteButton}
            handleSaveButton={handleQuestionSaveButton}
          />
        </div>
        <Divider>
          <h5>Answers</h5>
        </Divider>
        <div className="answers">
          {answerList?.length && (
            <ul className="answer_list">
              {(showAllAnswers ? answerList : answerList?.slice(0, ANSWERS_COUNT_AT_START))?.map(
                (answer) => (
                  <AnswerCard
                    key={answer.answerId}
                    {...answer}
                    currentUser={currentUser}
                    createAnswerMode={false}
                    fullName={answer.fullName}
                    avatar={answer.avatar}
                  />
                )
              )}
            </ul>
          )}
          <div className="answers_footer">
            {answerList?.length > ANSWERS_COUNT_AT_START && (
              <Button classes="text" onClick={() => setShowAllAnswers(!showAllAnswers)}>
                <i className={`fa fa-chevron-${!showAllAnswers ? 'down' : 'up'}`} />
                {!showAllAnswers
                  ? `See more answers (${answerList?.length - ANSWERS_COUNT_AT_START})`
                  : 'Collapse answers'}
              </Button>
            )}
          </div>
          <InputBoxWithAvatar
            resourceId={questionId}
            currentUserDetails={currentUser}
            createAction={createAnswer}
            validationMin={ANSWER.MIN_CONTENT_LENGTH}
            validationMax={ANSWER.MAX_CONTENT_LENGTH}
            placeholder="Your answer ..."
            errorMessage={`The answer should be ${ANSWER.MIN_CONTENT_LENGTH} - ${ANSWER.MAX_CONTENT_LENGTH} characters long`}
            closedButtonText={
              answerList?.length ? `Write another answer` : `Write the first answer`
            }
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionsAndAnswersCard;
