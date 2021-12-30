import React, { useEffect, useState } from 'react';
import './styles/QuestionsAndAnswersScreen.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../actions/userActions';
import { listQuestionsAndAnswers } from '../actions/questionsAndAnswersActions';
import HeaderControls from '../components/HeaderControls';
import { questionsListPageSizeOptionsMap, questionsSortOptionsMap } from '../constants/inputMaps';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Button from '../components/Button';
import QuestionsAndAnswersCard from '../components/QuestionsAndAnswersCard';
import Pagination from '../components/Pagination';

const QuestionsAndAnswersScreen = ({ match }) => {
  const dispatch = useDispatch();

  const productId = match.params.productId;
  const [createMode, setCreateMode] = useState(false);

  const [endpoint, setEndpoint] = useState({
    page: 'page=1&',
    pageSize: 'pageSize=6&',
    sort: 'sort=dateCreated desc&',
    search: ''
  });

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo: currentUser } = userLogin;

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
    const { page, pageSize, sort, search } = endpoint;

    dispatch(listQuestionsAndAnswers(productId, `${page}${pageSize}${sort}${search}`));
  }, [dispatch, productId, endpoint]);

  return (
    <div className="questions_and_answers_screen">
      <div className="questions_and_answers_container">
        <HeaderControls
          updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
          query={endpoint}
          resource="questions and answers"
          pageSizeOptionsMap={questionsListPageSizeOptionsMap}
          sortOptionsMap={questionsSortOptionsMap}
          isBreadcrumbsVisible={false}
        />
        {loading ? (
          <Loader />
        ) : error ? (
          <Message type="error">{error}</Message>
        ) : questions?.length > 0 ? (
          <div className="questions_list">
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
            {questions.map((question) => (
              <QuestionsAndAnswersCard
                key={question.questionId}
                {...question}
                currentUser={currentUser}
                createMode={false}
                setCreateMode={setCreateMode}
                fullName={question.fullName}
                avatar={question.avatar}
              />
            ))}
          </div>
        ) : (
          <Message type="success">Ask Question Box</Message>
        )}
        <div className="footer">
          {questions?.length > 0 && (
            <Pagination
              updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
              currentPage={+endpoint.page.slice('page='.length).replace('&', '')}
              pageSize={+endpoint.pageSize.slice('pageSize='.length).replace('&', '')}
              totalItems={questions[0].totalDBItems}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionsAndAnswersScreen;
