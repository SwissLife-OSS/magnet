import { graphql } from "babel-plugin-relay/macro";
import React, { useEffect, useState, useTransition, useMemo } from "react";
import { usePaginationFragment } from "react-relay";
import { Box, Typography } from "@mui/material";
import { MessageFilter, MessageType } from "../MessageFilter";
import { MessageListTable } from "../MessageListTable";
import { TransitionIndicator } from "../TransitionIndicator/TransitionIndicator";
import { MessageList_query$key } from "./__generated__/MessageList_query.graphql";

export type MessageListDataProp = MessageList_query$key

interface MessageListProps {
  fragmentRef: MessageListDataProp;
  search?: string;
}

export const MessageList: React.FC<MessageListProps> = ({ fragmentRef, search }) => {
  const [typeFilter, setTypeFilter] = useState<MessageType>(null);
  const [providerFilter, setProviderFilter] = useState<string | null>(null);

  const filter = useMemo(() => ({
    where: {
      ...(search ? { 
        or: [
          { body: { contains: search } },
          { from: { contains: search } },
          { properties: { some: { key: { eq: "Subject" }, value: { contains: search } } } },
          { properties: { some: { key: { eq: "System_Title" }, value: { contains: search } } } },
          { properties: { some: { key: { eq: "WorkItemId" }, value: { contains: search } } } }
        ]
      } : undefined),
      ...(typeFilter ? { type: { eq: typeFilter } } : undefined),
      ...(providerFilter ? { provider: { eq: providerFilter } } : undefined),
    },
  }), [search, typeFilter, providerFilter]);


  const { data, hasNext, loadNext, refetch } = usePaginationFragment(
    graphql`
      fragment MessageList_query on Query
      @argumentDefinitions(
        cursor: { type: "String" }
        count: { type: "Int", defaultValue: 30 }
        where: { type: "MessageRecordFilterInput" }
      )
      @refetchable(queryName: "MessageListRefetchableQuery") {
        messages(after: $cursor, first: $count, where: $where)
          @connection(key: "ScreenerList_messages") {
          edges {
            ...MessageListTable_messagesEdge
          }
        }
      }
    `,
    fragmentRef
  );

  const showInformation = !!data?.messages?.edges?.length;

  const [busy, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      refetch(filter, { fetchPolicy: 'store-or-network' });
    });
  }, [search, typeFilter, providerFilter]);

  return (
    <Box sx={{ mt: 2, mb: 1 }}>
      <MessageFilter
        typeFilter={typeFilter}
        providerFilter={providerFilter}
        onTypeChange={setTypeFilter}
        onProviderChange={setProviderFilter}
      />
      {!showInformation && (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="h4" sx={{ mb: 0 }}>
            New data is displayed here
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 400, mt: 2 }}>
            Click on a row to see more Information
          </Typography>
        </Box>
      )}
      {showInformation && (
        <TransitionIndicator in={!busy}>
          <MessageListTable
            $ref={(data.messages?.edges ?? [])}
            hasNext={hasNext}
            loadNext={loadNext}
          />
        </TransitionIndicator>
      )}
    </Box>
  );
};
