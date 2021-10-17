import React, { useState } from 'react';
import './styles/Votes.css';
import Button from './Button';
import { useDispatch } from 'react-redux';

const Votes = ({
  showButtons,
  voteAction,
  itemId,
  reactionNameUp,
  reactionNameDown,
  votesUpCount,
  votesDownCount,
  userVotesUpList,
  userVotesDownList,
  currentUserId
}) => {
  const [countVotesUp, setCountVotesUp] = useState(votesUpCount);
  const [countVotesDown, setCountVotesDown] = useState(votesDownCount);

  const dispatch = useDispatch();

  const [currentVote, setCurrentVote] = useState(
    userVotesUpList?.toString().split(',').map(Number).includes(currentUserId)
      ? 'UP'
      : userVotesDownList?.toString().split(',').map(Number).includes(currentUserId)
      ? 'DOWN'
      : ''
  );

  const handleVoteButton = (method, reactionName) => {
    dispatch(voteAction(itemId, method, reactionName));

    if (method === 'POST') {
      if (reactionName === `${reactionNameUp}`) {
        if (currentVote === 'DOWN') {
          setCountVotesDown(countVotesDown - 1);
        }
        setCurrentVote('UP');
        setCountVotesUp(countVotesUp + 1);
      } else if (reactionName === `${reactionNameDown}`) {
        if (currentVote === 'UP') {
          setCountVotesUp(countVotesUp - 1);
        }
        setCurrentVote('DOWN');
        setCountVotesDown(countVotesDown + 1);
      }
    } else if (method === 'DELETE') {
      if (reactionName === `${reactionNameUp}`) {
        setCurrentVote('');
        setCountVotesUp(countVotesUp - 1);
      } else if (reactionName === `${reactionNameDown}`) {
        setCurrentVote('');
        setCountVotesDown(countVotesDown - 1);
      }
    }
  };

  return (
    showButtons && (
      <div className="votes">
        <Button
          types="icon"
          onClick={
            currentVote === '' || currentVote === 'DOWN'
              ? () => handleVoteButton('POST', `${reactionNameUp}`)
              : () => handleVoteButton('DELETE', `${reactionNameUp}`)
          }
        >
          <i className={`fa fa-thumbs-up ${currentVote === 'UP' ? 'active' : 'inactive'}`}></i>
        </Button>
        <div className="thumb_count">{countVotesUp || 0}</div>
        <Button
          types="icon"
          onClick={
            currentVote === '' || currentVote === 'UP'
              ? () => handleVoteButton('POST', `${reactionNameDown}`)
              : () => handleVoteButton('DELETE', `${reactionNameDown}`)
          }
        >
          <i className={`fa fa-thumbs-down ${currentVote === 'DOWN' ? 'active' : 'inactive'}`}></i>
        </Button>
        <div>{countVotesDown || 0}</div>
      </div>
    )
  );
};

export default Votes;
