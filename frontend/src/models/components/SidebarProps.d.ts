interface SidebarProps {
  endpoint: {
    page: string;
    pageSize?: string;
    sort: string;
    search: string;
    filter?: string | string[];
    role?: string;
  };
  setEndpoint: Dispatch<SetStateAction<endpoint>>;
  inputMap: TODO;
  defaultEndpoint: {
    page: string;
    pageSize?: string;
    sort: string;
    search: string;
    filter?: string | string[];
    role?: string;
  };
}
export default SidebarProps;
