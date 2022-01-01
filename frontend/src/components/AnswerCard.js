import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createAnswer, deleteAnswer, editAnswer } from '../actions/questionsAndAnswersActions';
import { getTimeDuration } from '../constants/utility-functions';
import Avatar from './Avatar';
import EditButtons from './EditButtons';
import ShowMoreButton from './ShowMoreButton';
import './styles/QuestionsAndAnswers.css';

const AnswerCard = ({
  currentUser,
  createAnswerMode,
  setCreateAnswerMode,
  productId,
  userId: authorId,
  questionId,
  answerId,
  answerContent,
  dateCreated,
  dateEdited,
  fullName,
  avatar
}) => {
  const [editMode, setEditMode] = useState(false);
  const [contentAnswer, setContentAnswer] = useState(!createAnswerMode ? answerContent : '');

  const dispatch = useDispatch();

  const handleEditButton = () => {
    setEditMode(true);
  };

  const handleCloseButton = () => {
    setEditMode(false);
    setCreateAnswerMode(false);
    setContentAnswer(contentAnswer);
  };

  const handleDeleteButton = () => {
    dispatch(deleteAnswer(answerId));
    setEditMode(false);
    setCreateAnswerMode(false);
  };

  const handleSaveButton = () => {
    if (createAnswerMode) {
      dispatch(createAnswer(questionId, { contentAnswer }));
      setCreateAnswerMode(false);
    } else if (editMode) {
      dispatch(editAnswer(answerId, { contentAnswer }));
      setEditMode(false);
    }
  };

  return (
    <li className="answer">
      {editMode || createAnswerMode ? (
        <input
          type="textarea"
          className="textarea card"
          value={contentAnswer}
          onChange={(e) => setContentAnswer(e.target.value)}
        />
      ) : (
        <div className="textarea">
          {contentAnswer?.length > 300 ? (
            <ShowMoreButton breakpoint={300} text={contentAnswer} />
          ) : (
            contentAnswer
          )}
        </div>
      )}
      <div className="created_info">
        {/* {<Avatar type="small name_only" imageUrl={avatar} fullName={fullName} />} */}
        <span>{fullName}</span>on{' '}
        {!dateEdited
          ? `${dateCreated.slice(0, 10)}`
          : `${getTimeDuration(dateEdited, new Date())}(edited)`}
      </div>
      <EditButtons
        createMode={createAnswerMode}
        editMode={editMode}
        isCurrentUserId={currentUser?.userId === authorId}
        handleEditButton={handleEditButton}
        handleCloseButton={handleCloseButton}
        handleDeleteButton={handleDeleteButton}
        handleSaveButton={handleSaveButton}
      />
    </li>
  );
};
export default AnswerCard;