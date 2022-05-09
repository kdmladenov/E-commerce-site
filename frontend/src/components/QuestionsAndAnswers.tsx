import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './styles/QuestionsAndAnswers.css';
import { getUserDetails } from '../state/actions/userActions';
import { askQuestion, listQuestionsAndAnswers } from '../state/actions/questionsAndAnswersActions';
import { listProductDetails } from '../state/actions/productActions';
import { QUESTION } from '../constants/constants';
import defaultEndpoint from '../inputs/defaultEndpoint';
import { questionsSortOptionsMap } from '../inputs/sortDropdownOptionsMaps';
import { questionsListPageSizeOptionsMap } from '../inputs/pageSizeOptionsMap';

import Button from './Button';
import Message from './Message';
import Loader from './Loader';
import HeaderControls from './HeaderControls';
import InputBoxWithAvatar from './InputBoxWithAvatar';
import Pagination from './Pagination';
import QuestionsAndAnswersCard from './QuestionsAndAnswersCard';
import QuestionsAndAnswersProps from '../models/components/QuestionsAndAnswersProps';
import useTypedSelector from '../hooks/useTypedSelector';

const QuestionsAndAnswers: React.FC<QuestionsAndAnswersProps> = ({
  match,
  productId: productIdProp,
  setQuestionsCount,
  isScreen
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const productId = productIdProp || match.params.productId;

  const [endpoint, setEndpoint] = useState({
    ...defaultEndpoint['questionsAndAnswers'],
    pageSize: `pageSize=${isScreen ? 6 : 3}&`
  });

  const { userInfo } = useTypedSelector((state) => state.userLogin);

  const { user: currentUserDetails } = useTypedSelector((state) => state.userDetails);

  const { product } = useTypedSelector((state) => state.productDetails);

  const { questions, loading, error } = useTypedSelector((state) => state.questionsAndAnswersList);

  const { success: successQuestionAsk } = useTypedSelector((state) => state.questionAsk);

  const { success: successQuestionDelete } = useTypedSelector((state) => state.questionDelete);

  const { success: successAnswerCreate } = useTypedSelector((state) => state.answerCreate);

  const { success: successAnswerDelete } = useTypedSelector((state) => state.answerDelete);

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
        pageSizeOptionsMap={isScreen ? questionsListPageSizeOptionsMap : []}
        breadcrumbsPaths={
          isScreen && product
            ? [
                { label: product?.title, path: `/products/${productId}` },
                { label: 'Q&A', path: '' }
              ]
            : []
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
                  avatar={question.avatar}
                  answers={question.answers}
                />
              );
            })}
            <div className="footer">
              {!isScreen && questions?.length > 0 && (
                <Button
                  classes="text"
                  onClick={() =>
                    setEndpoint({
                      ...endpoint,
                      pageSize: `${
                        endpoint.pageSize === 'pageSize=3&' ? 'pageSize=8&' : 'pageSize=3&'
                      }`
                    })
                  }
                >
                  {endpoint.pageSize === 'pageSize=3&' ? (
                    <>
                      <i className="fa fa-chevron-down" /> See more questions
                    </>
                  ) : (
                    <>
                      <i className="fa fa-chevron-up" /> Collapse questions
                    </>
                  )}
                </Button>
              )}
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
