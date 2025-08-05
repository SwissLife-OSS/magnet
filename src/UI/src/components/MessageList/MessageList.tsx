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

  // Entferne Backend-Filter komplett - wir machen nur Frontend-Filterung
  const filter = useMemo(() => {
    // Mapping: Frontend Button -> Backend Type
    const getBackendType = (frontendType: MessageType) => {
      if (frontendType === "SMS") return "Message";
      return frontendType; // Email, Inbox, WorkItem bleiben gleich
    };

    return {
      where: {
        ...(typeFilter ? { type: { eq: getBackendType(typeFilter) } } : undefined),
        ...(providerFilter ? { provider: { eq: providerFilter } } : undefined),
      },
    };
  }, [typeFilter, providerFilter]);


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
            node {
              id
              title
              from
              to
            }
            ...MessageListTable_messagesEdge
          }
        }
      }
    `,
    fragmentRef
  );

  // Frontend-only Suche durch bereits geladene Daten
  const filteredEdges = useMemo(() => {
    if (!search || !data?.messages?.edges) {
      return data?.messages?.edges || [];
    }

    const searchLower = search.toLowerCase();
    return data.messages.edges.filter(edge => {
      const node = edge?.node;
      if (!node) return false;

      // Suche in title, body, from und properties
      const searchableText = [
        node.title,
        node.from,
        ...(node.to || []),
        // Füge Properties hinzu falls verfügbar
      ].filter(Boolean).join(' ').toLowerCase();

      return searchableText.includes(searchLower);
    });
  }, [data?.messages?.edges, search]);

  const showInformation = !!filteredEdges?.length;

  const [busy, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      refetch(filter, { fetchPolicy: 'store-or-network' });
    });
  }, [search, typeFilter, providerFilter, filter, refetch]);

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
            $ref={filteredEdges}
            hasNext={hasNext}
            loadNext={loadNext}
          />
        </TransitionIndicator>
      )}
    </Box>
  );
};
