interface HeaderControlsProps {
  updateQuery: (prop: string, value: string) => void;
  query: {
    page: string;
    pageSize?: string;
    sort: string;
    search: string;
    filter?: string | string[];
    role?: string;
  };
  resource: string;
  pageSizeOptionsMap: { label: number | string; value: string }[];
  sortOptionsMap: { label: string; value: string }[];
  ratingFilterOptionsMap: { label: string; value: string }[];
  isGrayBackground: boolean;
  breadcrumbsPaths: string[];
  horizontalCards: boolean;
  setHorizontalCards: Dispatch<SetStateAction<boolean>>;
}
export default HeaderControlsProps;
