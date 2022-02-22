import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Pagination from '../components/Pagination';
import ProductCard from '../components/ProductCard';
import Sidebar from '../components/Sidebar';
import { sidebarInput } from '../constants/inputMaps';
import './styles/ListScreenComponent.css';
import HeaderControls from '../components/HeaderControls';
import { getRibbonText } from '../constants/utility-functions';
import Button from '../components/Button';
import { deleteBrowsingHistory } from '../state/actions/browsingHistoryActions';
import Tooltip from './Tooltip';

const ListScreenComponent = ({
  endpoint,
  setEndpoint,
  listAction,
  loading,
  resource,
  error,
  localStorageId,
  sidebarInputMap,
  defaultEndpoint,
  resourceName,
  pageSizeOptionsMap,
  sortOptionsMap,
  breadcrumbsPaths,
  successDelete
}) => {
  const dispatch = useDispatch();

  const [horizontalCards, setHorizontalCards] = useState(false);
  const [hiddenSidebar, setHiddenSidebar] = useState(false);

  const deleteHistoryBtn = (historyId) => (
    <Button classes="icon" onClick={() => dispatch(deleteBrowsingHistory(historyId))}>
      <Tooltip text="Remove">
        <i className="fa fa-times" />
      </Tooltip>
    </Button>
  );

  useEffect(() => {
    const { page, pageSize, sort, search, filter } = endpoint;

    dispatch(listAction(`${page}${pageSize}${sort}${search}${filter.join('&')}`));
  }, [dispatch, endpoint, successDelete]);

  return (
    <main className={`list_container ${!hiddenSidebar ? 'hidden_sidebar' : ''}`}>
      <Sidebar
        endpoint={endpoint}
        setEndpoint={setEndpoint}
        inputMap={sidebarInputMap || sidebarInput(JSON.parse(localStorage.getItem(localStorageId)))}
        defaultEndpoint={defaultEndpoint}
      />
      <HeaderControls
        updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
        query={endpoint}
        resource={resourceName}
        pageSizeOptionsMap={pageSizeOptionsMap}
        sortOptionsMap={sortOptionsMap}
        isGrayBackground={true}
        breadcrumbsPaths={breadcrumbsPaths}
        horizontalCards={horizontalCards}
        setHorizontalCards={setHorizontalCards}
      />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <div className={`items_list ${horizontalCards ? 'horizontal' : ''}`}>
          {resource?.length === 0 ? (
            <h2>No items to display</h2>
          ) : (
            <>
              <ul className={resourceName === 'browsing history' ? 'history_list' : ''}>
                {resource?.map((listItem) => (
                  <ProductCard
                    key={listItem.productId}
                    product={listItem}
                    horizontal={horizontalCards}
                    ribbonText={getRibbonText(listItem.productId)}
                    deleteBtn={
                      resourceName === 'browsing history' && deleteHistoryBtn(listItem.historyId)
                    }
                  />
                ))}
              </ul>
              <div className="footer">
                <Pagination
                  updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
                  currentPage={+endpoint.page.slice('page='.length).replace('&', '')}
                  pageSize={+endpoint.pageSize.slice('pageSize='.length).replace('&', '')}
                  totalItems={resource?.[0]?.totalDBItems}
                />
              </div>
            </>
          )}
        </div>
      )}
      <Button classes="icon sidebar_toggle_btn" onClick={() => setHiddenSidebar(!hiddenSidebar)}>
        <i className={`fas fa-chevron-circle-${hiddenSidebar ? 'left' : 'right'}`} />
      </Button>
    </main>
  );
};

export default ListScreenComponent;
