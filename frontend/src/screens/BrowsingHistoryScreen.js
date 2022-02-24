import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { listBrowsingHistory } from '../state/actions/browsingHistoryActions';
import getSidebarInput from '../helpers/getSidebarInput';
import defaultEndpoint from '../inputs/defaultEndpoint';
import { productListPageSizeOptionsMap } from '../inputs/pageSizeOptionsMap';
import { browsingHistorySortOptionsMap } from '../inputs/sortDropdownOptionsMaps';

import ListScreenComponent from '../components/ListScreenComponent';

const BrowsingHistoryScreen = () => {
  const [endpoint, setEndpoint] = useState(defaultEndpoint['browsingHistoryScreen']);

  const allMyHistory = JSON.parse(localStorage.getItem('allMyHistory'));

  const [sidebarInputMap, setSidebarInputMap] = useState(getSidebarInput(allMyHistory));

  const { browsingHistory, loading, error } = useSelector((state) => state.browsingHistoryList);

  const { success: successDelete } = useSelector((state) => state.browsingHistoryDelete);

  useEffect(() => {
    setSidebarInputMap(getSidebarInput(allMyHistory));
  }, [successDelete]);

  return (
    <ListScreenComponent
      endpoint={endpoint}
      setEndpoint={setEndpoint}
      listAction={listBrowsingHistory}
      loading={loading}
      resource={browsingHistory}
      error={error}
      sidebarInputMap={sidebarInputMap}
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
