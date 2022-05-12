import {  useState } from 'react';

import { listBrowsingHistory } from '../state/actions/browsingHistoryActions';
// import getSidebarInput from '../helpers/getSidebarInput';
import defaultEndpoint from '../inputs/defaultEndpoint';
import { productListPageSizeOptionsMap } from '../inputs/pageSizeOptionsMap';
import { browsingHistorySortOptionsMap } from '../inputs/sortDropdownOptionsMaps';

import ListScreenComponent from '../components/ListScreenComponent';
import useTypedSelector from '../hooks/useTypedSelector';

const BrowsingHistoryScreen = () => {
  const [endpoint, setEndpoint] = useState(defaultEndpoint['browsingHistoryScreen']);

  // const allMyHistory = JSON.parse(localStorage.getItem('allMyHistory')!);

  // const [sidebarInputMap, setSidebarInputMap] = useState(getSidebarInput(allMyHistory));

  const { browsingHistory, loading, error } = useTypedSelector((state) => state.browsingHistoryList);

  const { success: successDelete } = useTypedSelector((state) => state.browsingHistoryDelete);

  // useEffect(() => {
  //   setSidebarInputMap(getSidebarInput(allMyHistory));
  // }, [successDelete]);

  return (
    <ListScreenComponent
      endpoint={endpoint}
      setEndpoint={setEndpoint}
      listAction={listBrowsingHistory}
      loading={loading}
      resource={browsingHistory}
      // localStorageId="allMyHistory"
      error={error}
      // sidebarInputMap={sidebarInputMap}
      defaultEndpoint={defaultEndpoint['browsingHistoryScreen']}
      resourceName={'browsing history'}
      pageSizeOptionsMap={productListPageSizeOptionsMap}
      sortOptionsMap={browsingHistorySortOptionsMap}
      breadcrumbsPaths={[
        { label: 'Profile', path: `/account/profile` },
        { label: 'Browsing History', path: '' }
      ]}
      successDelete={successDelete}
    />
  );
};

export default BrowsingHistoryScreen;
