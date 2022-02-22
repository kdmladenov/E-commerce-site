import React, { useEffect, useState } from 'react';
import Button from './Button';
import './styles/QuestionsAndAnswers.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../actions/userActions';
import QuestionsAndAnswersCard from './QuestionsAndAnswersCard';
import Message from './Message';
import { askQuestion, listQuestionsAndAnswers } from '../actions/questionsAndAnswersActions';
import Loader from './Loader';
import HeaderControls from './HeaderControls';
import {
  defaultEndpoint,
  questionsListPageSizeOptionsMap,
  questionsSortOptionsMap
} from '../constants/inputMaps';
import { useHistory } from 'react-router-dom';
import InputBoxWithAvatar from './InputBoxWithAvatar';
import { QUESTION } from '../constants/constants';
import Pagination from './Pagination';
import { listProductDetails } from '../actions/productActions';

const QuestionsAndAnswers = ({ match, productId: productIdProp, setQuestionsCount, isScreen }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const productId = productIdProp || match.params.productId;

  const [endpoint, setEndpoint] = useState({
    ...defaultEndpoint['questionsAndAnswers'],
    pageSize: `pageSize=${isScreen ? 6 : 3}&`
  });

  const { userInfo } = useSelector((state) => state.userLogin);

  const { user: currentUserDetails } = useSelector((state) => state.userDetails);

  const { product } = useSelector((state) => state.productDetails);

  const { questions, loading, error } = useSelector((state) => state.questionsAndAnswersList);

  const { success: successQuestionAsk } = useSelector((state) => state.questionAsk);

  const { success: successQuestionDelete } = useSelector((state) => state.questionDelete);

  const { success: successAnswerCreate } = useSelector((state) => state.answerCreate);

  const { success: successAnswerDelete } = useSelector((state) => state.answerDelete);

  useEffect(() => {
    dispatch(getUserDetails(userInfo?.userId));
    dispatch(listProductDetails(productId));
  }, [dispatch, userInfo?.userId, productId]);

  useEffect(() => {
    if (questions?.length > 0 && setQuestionsCount) {
      setQuestionsCount(questions[0]?.totalDBItems);
    }
  }, [setQuestionsCount, questions, successQuestionAsk, successQuestionDelete]);

  useEffect(() => {
    const { page, pageSize, sort, search } = endpoint;

    dispatch(listQuestionsAndAnswers(productId, `${page}${pageSize}${sort}${search}`));
  }, [
    dispatch,
    productId,
    endpoint,
    successQuestionAsk,
    successAnswerCreate,
    successQuestionDelete,
    successAnswerDelete
  ]);

  return (
    <div className="questions_and_answers">
      <HeaderControls
        updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
        query={endpoint}
        resource="questions and answers"
        sortOptionsMap={questionsSortOptionsMap}
        pageSizeOptionsMap={isScreen && questionsListPageSizeOptionsMap}
        breadcrumbsPaths={
          isScreen &&
          product && [
            { label: product?.title, path: `/products/${productId}` },
            { label: 'Q&A', path: '' }
          ]
        }
      />
      <InputBoxWithAvatar
        resourceId={productId}
        currentUserDetails={currentUserDetails}
        createAction={askQuestion}
        validationMin={QUESTION.MIN_CONTENT_LENGTH}
        validationMax={QUESTION.MAX_CONTENT_LENGTH}
        placeholder="Ask yor question ..."
        errorMessage={`The question should be ${QUESTION.MIN_CONTENT_LENGTH} - ${QUESTION.MAX_CONTENT_LENGTH} characters long`}
      />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        questions?.length > 0 && (
          <div className="questions_list">
            {questions?.map((question) => {
              return (
                <QuestionsAndAnswersCard
                  key={question.questionId}
                  {...question}
                  currentUser={currentUserDetails}
                  fullName={question.fullName}
                  avatar={question.avatar}
                />
              );
            })}
            <div className="footer">
              {!isScreen &&
                questions?.length > 0 &&
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
                    <i className="fa fa-chevron-down" /> See more questions
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
                    <i className="fa fa-chevron-up" /> Collapse questions
                  </Button>
                ))}
              {!isScreen && (
                <Button classes="text" onClick={() => history.push(`/questions/${productId}`)}>
                  See all questions
                </Button>
              )}
              {isScreen && (
                <Pagination
                  updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
                  currentPage={+endpoint.page.slice('page='.length).replace('&', '')}
                  pageSize={+endpoint.pageSize.slice('pageSize='.length).replace('&', '')}
                  totalItems={questions?.[0]?.totalDBItems}
                />
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default QuestionsAndAnswers;
