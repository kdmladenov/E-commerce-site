interface ListScreenComponentProps {
  endpoint: {
    page: string;
    pageSize?: string;
    sort: string;
    search: string;
    filter?: string | string[];
    role?: string;
  };
  setEndpoint: Dispatch<SetStateAction<endpoint>>;
  listAction: TODO;
  loading: boolean;
  resource: TODO;
  error: TODO;
  localStorageId: string;
  sidebarInputMap: TODO;
  defaultEndpoint: {
    page: string;
    pageSize?: string;
    sort: string;
    search: string;
    filter?: string | string[];
    role?: string;
  };
  resourceName: string;
  pageSizeOptionsMap: { label: number | string; value: string }[];
  sortOptionsMap: { label: string; value: string }[];
  breadcrumbsPaths: { label: string; path: string }[];
  successDelete: boolean;
}

export default ListScreenComponentProps;
