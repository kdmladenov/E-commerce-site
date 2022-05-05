import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import './styles/ListScreenComponent.css';
import { deleteBrowsingHistory } from '../state/actions/browsingHistoryActions';
import getSidebarInput from '../helpers/getSidebarInput';
import getRibbonText from '../helpers/getRibbonText';

import Loader from './Loader';
import Message from './Message';
import Pagination from './Pagination';
import ProductCard from './ProductCard';
import Sidebar from './Sidebar';
import HeaderControls from './HeaderControls';
import Button from './Button';
import Tooltip from './Tooltip';
import ListScreenComponentProps from '../models/components/ListScreenComponentProps';

const ListScreenComponent: React.FC<ListScreenComponentProps> = ({
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

  const deleteHistoryBtn = (historyId: number) => (
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
        inputMap={
          sidebarInputMap || getSidebarInput(JSON.parse(localStorage.getItem(localStorageId)!))
        }
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
