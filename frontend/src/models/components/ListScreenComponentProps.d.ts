import EndpointType from '../EndpointType';
import HistoryType from '../HistoryType';
import ProductType from '../ProductType';
import WishType from '../WishType';

interface ListScreenComponentProps {
  endpoint: EndpointType & { pageSize: string };
  setEndpoint: Dispatch<SetStateAction<endpoint>>;
  listAction: TODO;
  loading: boolean;
  resource: ProductType[] | HistoryType[] | WishType[];
  error: TODO;
  // localStorageId: string;
  defaultEndpoint: EndpointType;
  resourceName: string;
  pageSizeOptionsMap: { label: number | string; value: string }[];
  sortOptionsMap: { label: string; value: string }[];
  breadcrumbsPaths: { label: string; path: string }[];
  successDelete?: boolean;
}

export default ListScreenComponentProps;
