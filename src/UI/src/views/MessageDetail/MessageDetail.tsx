import React from "react";
import { graphql } from "babel-plugin-relay/macro";
import { useLazyLoadQuery, useFragment } from "react-relay";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Container, Paper, IconButton, Typography, Chip, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { ArrowBack, Email, Sms, Inbox, Work, Message, ExpandMore } from "@mui/icons-material";
import {
  MessageDetailError,
  QuickInformation,
  ReceivedLogTable,
  ReceiverList,
} from "../../components";
import { MessageDetailQuery } from "./__generated__/MessageDetailQuery.graphql";

const getTypeIcon = (type: string) => {
  switch (type) {
    case "Sms":
      return <Sms />;
    case "Email":
      return <Email />;
    case "Inbox":
      return <Inbox />;
    case "WorkItem":
      return <Work />;
    default:
      return <Message />;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "Sms":
      return "primary";
    case "Email":
      return "secondary";
    case "Inbox":
      return "info";
    case "WorkItem":
      return "warning";
    default:
      return "default";
  }
};

export const MessageDetail: React.FC = () => {
  const { id = "" } = useParams();
  const navigate = useNavigate();

  const data = useLazyLoadQuery<MessageDetailQuery>(
    graphql`
      query MessageDetailQuery($id: Uuid!) {
        message(id: $id) {
          ...MessageDetailHeader_messageRecord
          ...QuickInformation_messageRecord
          ...ReceiverList_messageRecord
          ...ReceivedLogTable_messageRecord
        }
      }
    `,
    { id },
    { fetchPolicy: "store-or-network" }
  );

  if (!data.message) {
    return <MessageDetailError />;
  }

  const headerData = useFragment(
    graphql`
      fragment MessageDetailHeader_messageRecord on MessageRecord {
        id
        title
        type
      }
    `,
    data.message
  );

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      {/* Header mit Back Button, Titel und Type Chip */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <IconButton 
          onClick={() => navigate(-1)} 
          sx={{ mr: 2 }}
          color="primary"
        >
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" component="h1" sx={{ mr: 3 }}>
          {headerData?.title}
        </Typography>
        <Chip
          icon={getTypeIcon(headerData?.type || "")}
          label={headerData?.type}
          color={getTypeColor(headerData?.type || "") as any}
          variant="outlined"
        />
      </Box>

      {/* Content in einer Card */}
      <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
        <QuickInformation $ref={data.message} />
        
        <Box sx={{ mt: 4, mb: 3 }}>
          <ReceiverList $ref={data.message} />
        </Box>

        <Accordion sx={{ mt: 4 }}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="received-log-content"
            id="received-log-header"
          >
            <Typography variant="h6" component="h3">
              Received Log
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ReceivedLogTable $ref={data.message} />
          </AccordionDetails>
        </Accordion>
      </Paper>
    </Container>
  );
};
