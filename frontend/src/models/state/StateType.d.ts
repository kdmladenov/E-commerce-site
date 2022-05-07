import CartType from '../CartType';
import HistoryType from '../HistoryType';
import OrderType from '../OrderType';
import ProductImageType from '../ProductImageType';
import ProductType from '../ProductType';
import QuestionType from '../QuestionType';
import SpecificationType from '../SpecificationType';
import UserInfoType from '../UserInfoType';
import UserType from '../UserType';
import WishType from '../WishType';

interface StateType {
  portalRefs;
  cart: CartType;
  productList: {
    loading: boolean;
    error?: string;
    products: ProductType[];
  };
  productDetails: {
    loading: boolean;
    error?: string;
    product: ProductType;
  };
  productDelete: {
    loading: boolean;
    error?: string;
    success: boolean;
  };
  productRestore: {
    loading: boolean;
    error?: string;
    success: boolean;
  };
  productCreate: {
    loading: boolean;
    error?: string;
    success?: boolean;
    product: ProductType;
  };
  productUpdate: {
    loading: boolean;
    error?: string;
    success?: boolean;
    product: ProductType;
  };
  productFeaturesList: {
    loading: boolean;
    error?: string;
    productFeatures: FeatureType[];
  };
  productFeaturesCreate: {
    loading: boolean;
    error?: string;
    success?: boolean;
    productFeature: FeatureType;
  };
  productFeaturesUpdate: {
    loading: boolean;
    error?: string;
    success?: boolean;
    productFeature: FeatureType;
  };
  productFeaturesDelete: {
    loading: boolean;
    error?: string;
    success?: boolean;
    productFeature: FeatureType;
  };
  productSpecificationCreate: {
    loading: boolean;
    error?: string;
    success?: boolean;
    productSpecification: SpecificationType;
  };
  productSpecificationUpdate: {
    loading: boolean;
    error?: string;
    success?: boolean;
    productSpecification: SpecificationType;
  };
  productSpecificationDelete: {
    loading: boolean;
    error?: string;
    success?: boolean;
    productSpecification: SpecificationType;
  };
  productImageUpload: {
    loading: boolean;
    error?: string;
    success?: boolean;
    product: ProductType;
  };
  productImagesList: {
    loading: boolean;
    error?: string;
    productImages: ProductImageType[];
  };
  productImageDelete: {
    loading: boolean;
    error?: string;
    success?: boolean;
  };
  productImageSetMain: {
    loading: boolean;
    error?: string;
    success?: boolean;
  };
  reviewCreate: {
    loading: boolean;
    error?: string;
    success?: boolean;
  };
  reviewDelete: {
    loading: boolean;
    error?: string;
    success?: boolean;
  };
  reviewList: {
    loading: boolean;
    error?: string;
    reviews: ReviewType[];
  };
  reviewEdit: {
    loading: boolean;
    error?: string;
    success?: boolean;
    review: ReviewType;
  };
  reviewVote: {
    loading: boolean;
    error?: string;
    success?: boolean;
  };
  questionVote: {
    loading: boolean;
    error?: string;
    success?: boolean;
  };
  questionAsk: {
    loading: boolean;
    error?: string;
    success?: boolean;
    question: QuestionType;
  };
  questionsAndAnswersList: {
    loading: boolean;
    error?: string;
    questions: (QuestionType & {answers:string})[];
  };
  questionEdit: {
    loading: boolean;
    error?: string;
    success?: boolean;
    question: QuestionType;
  };
  questionDelete: {
    loading: boolean;
    error?: string;
    success: boolean;
  };
  answerCreate: {
    loading: boolean;
    error?: string;
    success?: boolean;
    answer: AnswerType;
  };
  answerEdit: {
    loading: boolean;
    error?: string;
    success?: boolean;
    answer: AnswerType;
  };
  answerDelete: {
    loading: boolean;
    error?: string;
    success?: boolean;
  };
  browsingHistoryAdd: {
    loading: boolean;
    error?: string;
  };
  browsingHistoryList: {
    loading: boolean;
    error?: string;
    browsingHistory: HistoryType[];
  };
  browsingHistoryDelete: {
    loading: boolean;
    error?: string;
    success?: boolean;
  };
  wishListAdd: {
    loading: boolean;
    error?: string;
    success?: boolean;
  };
  wishListItems: {
    loading: boolean;
    error?: string;
    success?: boolean;
    wishList: WishType[];
  };
  wishListDelete: {
    loading: boolean;
    error?: string;
    success?: boolean;
  };
  forgottenPassword: {
    loading: boolean;
    error?: string;
    success?: boolean;
  };
  passwordReset: {
    loading: boolean;
    error?: string;
    success?: boolean;
    message: string;
  };
  userLogin: {
    loading: boolean;
    error?: string;
    userInfo: UserInfoType;
  };
  userRegister: {
    loading: boolean;
    error?: string;
    success?: boolean;
    userInfo: UserInfoType;
  };
  userDetails: {
    loading: boolean;
    error?: string;
    success?: boolean;
    user: UserType;
  };
  userList: {
    loading: boolean;
    error?: string;
    users: UserType[];
  };
  userDelete: {
    loading: boolean;
    error?: string;
    success?: boolean;
  };
  userRestore: {
    loading: boolean;
    error?: string;
    success?: boolean;
  };
  userUpdateProfile: {
    loading: boolean;
    error?: string;
    success?: boolean;
    user: UserType;
  };
  userAvatarUpdate: {
    loading: boolean;
    error?: string;
    success?: boolean;
    user: UserType;
  };
  userAvatarDelete: {
    loading: boolean;
    error?: string;
    success?: boolean;
  };
  orderCreate: {
    loading: boolean;
    error?: string;
    success?: boolean;
    order: OrderType;
  };
  orderDetails: {
    loading: boolean;
    error?: string;
    order: OrderType;
  };
  orderPay: {
    loading: boolean;
    error?: string;
    success?: boolean;
  };
  orderDeliver: {
    loading: boolean;
    error?: string;
    success?: boolean;
  };
  orderList: {
    loading: boolean;
    error?: string;
    orders: OrderType[];
  };
  orderMyList: {
    loading: boolean;
    error?: string;
    orders: OrderType[];
  };
}
export default StateType;
