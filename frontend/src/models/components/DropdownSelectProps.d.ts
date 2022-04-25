interface DropdownSelectProps {
  name: string;
  updateQuery: (prop: string, value: string) => void;
  query: {
    page: string;
    pageSize?: string;
    sort: string;
    search: string;
    filter?: string | string[];
    role?: string;
  };
  labelStart: string;
  optionsMap: { label: number | string; value: string }[];
}
export default DropdownSelectProps;
