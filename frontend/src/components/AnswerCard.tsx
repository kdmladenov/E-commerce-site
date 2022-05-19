import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import './styles/QuestionsAndAnswers.css';
import getTimeDuration from '../helpers/getTimeDuration';
import { deleteAnswer, editAnswer } from '../state/actions/questionsAndAnswersActions';

import EditButtons from './EditButtons';
import ShowMoreButton from './ShowMoreButton';
import AnswerCardProps from '../models/components/AnswerCardProps';

const AnswerCard: React.FC<AnswerCardProps> = ({
  currentUser,
  userId: authorId,
  answerId,
  answerContent,
  dateCreated,
  dateEdited,
  fullName
}) => {
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [contentAnswer, setContentAnswer] = useState(answerContent);

  const handleAnswerEditButton = () => {
    setEditMode(true);
  };

  const handleAnswerCloseButton = () => {
    setEditMode(false);
    setContentAnswer(contentAnswer);
  };

  const handleAnswerDeleteButton = () => {
    dispatch(deleteAnswer(answerId));
    setEditMode(false);
  };

  const handleAnswerSaveButton = () => {
    dispatch(editAnswer(answerId, contentAnswer));
    setEditMode(false);
  };

  return (
    <li className={`answer ${currentUser.userId === authorId ? 'current_user' : ''}`}>
      <div className="textarea">
        {editMode ? (
          <input
            type="textarea"
            value={contentAnswer}
            onChange={(e) => setContentAnswer(e.target.value)}
          />
        ) : contentAnswer?.length > 300 ? (
          <ShowMoreButton breakpoint={300} text={contentAnswer} />
        ) : (
          contentAnswer
        )}
      </div>
      <div className="created_info">
        <span>{fullName}</span>on{' '}
        {!dateEdited
          ? `${dateCreated.slice(0, 10)}`
          : `${getTimeDuration(dateEdited, new Date())}(edited)`}
      </div>
      <EditButtons
        editMode={editMode}
        isUserAuthorized={currentUser?.userId === authorId}
        handleEditButton={handleAnswerEditButton}
        handleCloseButton={handleAnswerCloseButton}
        handleDeleteButton={handleAnswerDeleteButton}
        handleSaveButton={handleAnswerSaveButton}
      />
    </li>
  );
};
export default AnswerCard;
