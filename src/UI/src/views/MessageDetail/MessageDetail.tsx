import React from "react";
import { graphql } from "babel-plugin-relay/macro";
import { useLazyLoadQuery, useFragment } from "react-relay";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Container, Paper, IconButton, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
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

  return <MessageDetailContent message={data.message} navigate={navigate} />;
};

interface MessageDetailContentProps {
  message: any;
  navigate: (delta: number) => void;
}

const MessageDetailContent: React.FC<MessageDetailContentProps> = ({ message, navigate }) => {
  const headerData = useFragment(
    graphql`
      fragment MessageDetailHeader_messageRecord on MessageRecord {
        id
        title
        type
      }
    `,
    message
  );

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
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
        {getTypeIcon(headerData?.type || "")}
      </Box>

      <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
        <QuickInformation $ref={message} />
        
        <Box sx={{ mt: 4, mb: 3 }}>
          <ReceiverList $ref={message} />
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
            <ReceivedLogTable $ref={message} />
          </AccordionDetails>
        </Accordion>
      </Paper>
    </Container>
  );
};
