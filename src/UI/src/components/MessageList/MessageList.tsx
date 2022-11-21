import { graphql } from "babel-plugin-relay/macro";
import React, { useState } from "react";
import { usePaginationFragment } from "react-relay";
import { makeStyles } from "@mui/styles";

import { MessageFilter, MessageListTable } from "../";

const useStyles = makeStyles({
  informationPosition: {
    textAlign: "center",
    marginTop: "35px",
  },
  informationTitle: {
    marginBottom: "0",
  },
  informationSubTitle: {
    fontWeight: "400",
    marginTop: "10px",
  },
  filterTitle: {
    fontSize: "20px",
    fontWeight: "500",
    marginBottom: 0,
  },
});

const MessageList: React.FC<{ fragmentRef: any }> = ({ fragmentRef }) => {
  const classes = useStyles();
  const [filterState] = useState({
    sms: true,
    email: true,
    inbox: true,
    workItem: true,
  });

  type ObjectKey = keyof typeof filterState;

  const createFilter = () => {
    const selectedFilters = Object.entries(filterState)
      .filter(([type, value]) => value)
      .map(([type]) => type.charAt(0).toUpperCase() + type.slice(1));

    const selectedFiltersLength = selectedFilters.length;

    const filter = selectedFiltersLength
      ? Array(selectedFiltersLength)
          .fill(undefined)
          .map((item, index) => ({ type: { eq: selectedFilters[index] } }))
      : [];

    refetch({ where: { or: filter } }, { fetchPolicy: "network-only" });
  };

  const handleClick = (name: string) => {
    const filterName = name as ObjectKey;
    filterState[filterName] = !filterState[filterName];
    createFilter();
  };

  const { data, hasNext, loadNext, refetch } = usePaginationFragment(
    graphql`
      fragment MessageListFragment_query on Query
      @argumentDefinitions(
        cursor: { type: "String" }
        count: { type: "Int", defaultValue: 30 }
        where: { type: "MessageRecordFilterInput" }
      )
      @refetchable(queryName: "MessageListRefetchableQuery") {
        messages(after: $cursor, first: $count, where: $where)
          @connection(key: "ScreenerList_messages") {
          edges {
            node {
              id
              title
              receivedAt
              type
              provider
              to
            }
          }
        }
      }
    `,
    fragmentRef
  );

  const showInformation = data?.messages?.edges?.length;

  return (
    <>
      <h2 className={classes.filterTitle}> Filters</h2>
      <MessageFilter filterState={filterState} handleClick={handleClick} />
      {!showInformation && (
        <div className={classes.informationPosition}>
          <h2 className={classes.informationTitle}>
            New data is displayed here
          </h2>
          <h4 className={classes.informationSubTitle}>
            Click on a row to see more Information
          </h4>
        </div>
      )}
      {showInformation > 0 && (
        <MessageListTable
          messages={data?.messages}
          hasNext={hasNext}
          loadNext={loadNext}
        />
      )}
    </>
  );
};

export default MessageList;
