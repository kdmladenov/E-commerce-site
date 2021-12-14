import React, { useEffect, useState } from 'react';
import Button from '../Button';
import './styles/QuestionsAndAnswers.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../actions/userActions';
import QuestionsAndAnswersCard from './QuestionsAndAnswersCard';
import Message from '../Message';
import { listQuestionsAndAnswers } from '../../actions/questionsAndAnswersActions';
import Loader from '../Loader';
import HeaderControls from '../HeaderControls';
import { questionsSortOptionsMap } from '../../constants/inputMaps';
import { useHistory } from 'react-router-dom';

const QuestionsAndAnswers = ({ currentUser, productId, setQuestionsCount }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [createMode, setCreateMode] = useState(false);

  const [endpoint, setEndpoint] = useState({
    page: 'page=1&',
    pageSize: 'pageSize=3&',
    sort: 'sort=dateCreated desc&',
    rating: 'ratingMin=1&ratingMax=5&',
    search: ''
  });

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const questionsAndAnswersList = useSelector((state) => state.questionsAndAnswersList);

  const { questions, loading, error } = questionsAndAnswersList;
  const hasUserAskedQuestion = questions?.some(
    (question) => question.userId === currentUser?.userId
  );
  // const questionAsk = useSelector((state) => state.questionAsk);
  // const { success: successQuestionAsk, error: errorQuestionAsk } = questionAsk;

  // const questionEdit = useSelector((state) => state.questionEdit);
  // const { success: successQuestionEdit, error: errorQuestionEdit } = questionEdit;

  // const questionDelete = useSelector((state) => state.questionDelete);
  // const { success: successQuestionDelete, error: errorQuestionDelete } = questionDelete;

  // const answerAsk = useSelector((state) => state.answerAsk);
  // const { success: successAnswerCreate, error: errorAnswerCreate} = answerAsk;

  // const answerEdit = useSelector((state) => state.answerEdit);
  // const { success: successAnswerEdit, error: errorAnswerEdit } = answerEdit;

  // const answerDelete = useSelector((state) => state.answerDelete);
  // const { success: successAnswerDelete, error: errorAnswerDelete } = answerDelete;

  const handleOpenCreateForm = () => {
    setCreateMode(true);
  };

  useEffect(() => {
    dispatch(getUserDetails(currentUser?.userId));
  }, [dispatch, currentUser?.userId]);

  useEffect(() => {
    if (questions?.length) {
      setQuestionsCount(questions[0]?.totalDBItems);
    }
  }, [setQuestionsCount, questions]);

  useEffect(() => {
    const { page, pageSize, sort, search, rating } = endpoint;

    dispatch(listQuestionsAndAnswers(productId, `${page}${pageSize}${sort}${rating}${search}`));
  }, [dispatch, productId, endpoint]);

  return (
    <div className="questions_and_answers">
      <HeaderControls
        updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
        query={endpoint}
        resource="questions and answers"
        sortOptionsMap={questionsSortOptionsMap}
        isBreadcrumbsVisible={false}
      />
      {loading ? (
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
          {questions?.map((question) => {
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
          })}
          <div className="footer">
            {questions?.length > 0 &&
              (endpoint.pageSize === 'pageSize=3&' ? (
                <Button
                  classes="text"
                  onClick={() =>
                    setEndpoint({
                      ...endpoint,
                      pageSize: 'pageSize=8&'
                    })
                  }
                >
                  <i class="fa fa-chevron-down"></i> See more questions (5)
                </Button>
              ) : (
                <Button
                  classes="text"
                  onClick={() =>
                    setEndpoint({
                      ...endpoint,
                      pageSize: 'pageSize=3&'
                    })
                  }
                >
                  <i class="fa fa-chevron-up"></i> Collapse questions
                </Button>
              ))}
            <Button classes="text" onClick={() => history.push(`/questions/${productId}`)}>
              See all questions
            </Button>
          </div>
        </div>
      ) : (
        <Message type="success">Ask Question Box</Message>
      )}
    </div>
  );
};

export default QuestionsAndAnswers;
