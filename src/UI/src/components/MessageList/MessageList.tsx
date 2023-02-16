import { graphql } from "babel-plugin-relay/macro";
import React, { useState } from "react";
import { usePaginationFragment } from "react-relay";
import { makeStyles } from "@mui/styles";
import { MessageFilter } from "../MessageFilter";
import { MessageListTable } from "../MessageListTable";
import { NotAuthorizedError } from "../NotAuthorizedError";
import { MessageList_data$key } from "./__generated__/MessageList_data.graphql";

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

export interface MessageListFilterState {
  sms: boolean;
  email: boolean;
  inbox: boolean;
  workItem: boolean;
}

export type MessageListDataProp = MessageList_data$key;

interface MessageListProps {
  queryRef: MessageListDataProp;
}

export const MessageList: React.FC<MessageListProps> = ({ queryRef }) => {
  const classes = useStyles();
  const [filterState, setFilterState] = useState<MessageListFilterState>({
    sms: true,
    email: true,
    inbox: true,
    workItem: true,
  });

  const handleFilterChange = (filters: MessageListFilterState) => {
    setFilterState(filters);

    const selectedFilters = Object.entries(filters)
      .filter(([type, value]) => value)
      .map(([type]) => type.charAt(0).toUpperCase() + type.slice(1))
      .map((item) => ({ type: { eq: item } }));

    const selectedFiltersLength = selectedFilters.length;

    refetch(
      { where: selectedFiltersLength === 4 ? null : { or: selectedFilters } },
      { fetchPolicy: "network-only" }
    );
  };

  const { data, hasNext, loadNext, refetch } = usePaginationFragment(
    graphql`
      fragment MessageList_data on Query
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
    queryRef
  );

  console.log(data);

  const showInformation = data?.messages?.edges?.length ?? -1;

  return (
    <>
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
      {!isNaN(showInformation) && showInformation > 0 ? (
        <>
          <h2 className={classes.filterTitle}> Filters</h2>
          <MessageFilter
            filters={filterState}
            onFilterChange={handleFilterChange}
          />
          <MessageListTable
            messages={data?.messages}
            hasNext={hasNext}
            loadNext={loadNext}
          />
        </>
      ) : (
        !isNaN(showInformation) &&
        showInformation !== 0 && <NotAuthorizedError />
      )}
    </>
  );
};
