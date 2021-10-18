import React, { useState } from 'react';
import ShowMoreButton from '../ShowMoreButton';
import './styles/QuestionsAndAnswers.css';
import { useDispatch } from 'react-redux';
import {
  askQuestion,
  deleteQuestion,
  editQuestion,
  voteQuestion
} from '../../actions/questionsAndAnswersActions';
import EditButtons from '../EditButtons';
import AnswerCard from './AnswerCard';
import { getTimeDuration } from '../../constants/utility-functions.js/utility-functions';
import Votes from '../Votes';
import Button from '../Button';

const QuestionsAndAnswersCard = ({
  currentUser,
  createMode,
  setCreateMode,
  productId,
  userId: authorId,
  questionId,
  questionContent,
  answers,
  dateCreated,
  dateEdited,
  fullName,
  thumbsUp,
  thumbsDown,
  userThumbsUpList,
  userThumbsDownList
}) => {
  const [editMode, setEditMode] = useState(false);
  const [showAllAnswers, setShowAllAnswers] = useState(false);
  const [createAnswerMode, setCreateAnswerMode] = useState(false);
  const [contentQuestion, setContentQuestion] = useState(!createMode ? questionContent : '');

  const dispatch = useDispatch();

  const handleEditButton = () => {
    setEditMode(true);
  };

  const handleCloseButton = () => {
    setEditMode(false);
    setCreateMode(false);
    setContentQuestion(questionContent);
  };

  const handleDeleteButton = () => {
    dispatch(deleteQuestion(questionId));
    setEditMode(false);
    setCreateMode(false);
  };

  const handleSaveButton = () => {
    if (createMode) {
      dispatch(askQuestion(productId, { contentQuestion }));
      setCreateMode(false);
    } else if (editMode) {
      dispatch(editQuestion(questionId, { contentQuestion }));
      setEditMode(false);
    }
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
        />
      </div>
      <div className="question_and_answer">
        <div className="question">
          <span>Question:</span>
          {editMode || createMode ? (
            <input
              type="text"
              className="textarea card"
              value={contentQuestion}
              onChange={(e) => setContentQuestion(e.target.value)}
            />
          ) : (
            <div className="textarea">
              {contentQuestion?.length > 300 ? (
                <ShowMoreButton breakpoint={300} text={contentQuestion} />
              ) : (
                contentQuestion
              )}
              <div className="created_info">
                {`By ${currentUser?.userId === authorId ? 'you' : fullName} on ${dateCreated.slice(
                  0,
                  10
                )} ${dateEdited ? `(edited ${getTimeDuration(dateEdited, new Date())}) ` : ''}`}
              </div>
            </div>
          )}

          <EditButtons
            createMode={createMode}
            editMode={editMode}
            isCurrentUserId={currentUser?.userId === authorId}
            handleEditButton={handleEditButton}
            handleCloseButton={handleCloseButton}
            handleDeleteButton={handleDeleteButton}
            handleSaveButton={handleSaveButton}
          />
        </div>
        <div className="answers">
          <span>Answers:</span>
          <ul className="answer_list">
            {answers?.length
              ? (showAllAnswers ? answers : answers.slice(0, 1))?.map((answer) => {
                  return (
                    <AnswerCard
                      key={answer.answerId}
                      {...answer}
                      currentUser={currentUser}
                      createAnswerMode={false}
                      setCreateAnswerMode={setCreateAnswerMode}
                    />
                  );
                })
              : 'There is no answer yet'}
            {answers?.length > 1 &&
              (!showAllAnswers ? (
                <Button types="text" onClick={() => setShowAllAnswers(!showAllAnswers)}>
                  <i class="fa fa-chevron-down"></i> {`See more answers (${answers?.length - 1})`}
                </Button>
              ) : (
                <Button types="text" onClick={() => setShowAllAnswers(!showAllAnswers)}>
                  <i class="fa fa-chevron-up"></i> {`Collapse answers`}
                </Button>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default QuestionsAndAnswersCard;
