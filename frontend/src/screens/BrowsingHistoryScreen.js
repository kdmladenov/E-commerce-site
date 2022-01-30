import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { listBrowsingHistory } from '../actions/browsingHistoryActions';
import {
  browsingHistorySortOptionsMap,
  defaultEndpoint,
  productListPageSizeOptionsMap,
  sidebarInput
} from '../constants/inputMaps';
import ListScreenComponent from '../components/ListScreenComponent';

const BrowsingHistoryScreen = () => {
  const [endpoint, setEndpoint] = useState(defaultEndpoint['browsingHistoryScreen']);

  const allMyHistory = JSON.parse(localStorage.getItem('allMyHistory'));

  const [sidebarInputMap, setSidebarInputMap] = useState(sidebarInput(allMyHistory));

  const browsingHistoryList = useSelector((state) => state.browsingHistoryList);
  const { loading, browsingHistory, error } = browsingHistoryList;

  const browsingHistoryDelete = useSelector((state) => state.browsingHistoryDelete);
  const { success: successDelete } = browsingHistoryDelete;

  useEffect(() => {
    setSidebarInputMap(sidebarInput(allMyHistory));
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
