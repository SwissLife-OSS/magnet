// MessageListTable.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
} from "@mui/material";
import { graphql } from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import { MessageListTable_messagesEdge$key } from "./__generated__/MessageListTable_messagesEdge.graphql";
import { MessageListTable_messageRecord$key } from "./__generated__/MessageListTable_messageRecord.graphql";
import { messagePath } from "../../paths";

interface MessageListTableProps {
  $ref?: MessageListTable_messagesEdge$key | null;
  hasNext: boolean;
  loadNext(count: number): void;
}

export const MessageListTable: React.FC<MessageListTableProps> = ({
  $ref,
  hasNext,
  loadNext,
}) => {
  const edges = useFragment(
    graphql`
      fragment MessageListTable_messagesEdge on MessagesEdge
      @relay(plural: true) {
        node {
          id
          ...MessageListTable_messageRecord
        }
      }
    `,
    $ref
  );

  const messages = edges
    ?.map((edge) => edge.node)
    .filter((node): node is NonNullable<typeof node> => !!node);

  return (
    <Box sx={{ px: { xs: 2, sm: 4, md: 8 }, py: 4 }}>
      <TableContainer
        component={Paper}
        sx={{
          overflowX: "auto",
          borderRadius: 2,
          mx: "auto",
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Message Title</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Recipient</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Date Sent</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Provider</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {messages?.map((node) => (
              <Row key={node.id} $ref={node} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

interface RowProps {
  $ref: MessageListTable_messageRecord$key;
}

function Row({ $ref }: RowProps) {
  const node = useFragment(
    graphql`
      fragment MessageListTable_messageRecord on MessageRecord {
        id
        title
        receivedAt
        type
        provider
        to
      }
    `,
    $ref
  );

  const navigate = useNavigate();

  const getDateTime = (date: string | number) =>
    new Date(date).toLocaleString("en-UK", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

  const getShortTitle = (title: string) =>
    title.length > 50 ? `${title.substring(0, 50)}...` : title;

  return (
    <TableRow
      hover
      sx={{
        cursor: "pointer",
        "&:hover": { backgroundColor: "#f5f5f5" },
        transition: "background-color 0.2s ease",
      }}
      onClick={() => navigate(messagePath(node.id))}
    >
      <TableCell>{getShortTitle(node.title)}</TableCell>
      <TableCell>{node.to?.[0] ?? "—"}</TableCell>
      <TableCell>{getDateTime(node.receivedAt)}</TableCell>
      <TableCell>{node.type}</TableCell>
      <TableCell>{node.provider}</TableCell>
    </TableRow>
  );
}
