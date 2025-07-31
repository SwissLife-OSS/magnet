import React from "react";
import { graphql } from "babel-plugin-relay/macro";
import { useLazyLoadQuery } from "react-relay";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Container, Paper, IconButton, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import {
  MessageDetailError,
  QuickInformation,
  ReceivedLogTable,
  ReceiverList,
} from "../../components";
import { MessageDetailQuery } from "./__generated__/MessageDetailQuery.graphql";

export const MessageDetail: React.FC = () => {
  const { id = "" } = useParams();
  const navigate = useNavigate();

  const data = useLazyLoadQuery<MessageDetailQuery>(
    graphql`
      query MessageDetailQuery($id: Uuid!) {
        message(id: $id) {
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

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      {/* Header mit Back Button */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <IconButton 
          onClick={() => navigate(-1)} 
          sx={{ mr: 2 }}
          color="primary"
        >
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" component="h1">
          Message Details
        </Typography>
      </Box>

      {/* Content in einer Card */}
      <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
        <QuickInformation $ref={data.message} />
        
        <Box sx={{ mt: 4, mb: 3 }}>
          <ReceiverList $ref={data.message} />
        </Box>

        <Box sx={{ mt: 4 }}>
          <ReceivedLogTable $ref={data.message} />
        </Box>
      </Paper>
    </Container>
  );
};
