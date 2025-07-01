import React from "react";
import { graphql } from "babel-plugin-relay/macro";
import { useLazyLoadQuery } from "react-relay";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import SmsIcon from "@mui/icons-material/Sms";
import { MessageDetailQuery } from "./__generated__/MessageDetailQuery.graphql";
import { MessageDetailError } from "../../components/MessageDetailError";

export const MessageDetail: React.FC = () => {
  const { id = "" } = useParams();
  const navigate = useNavigate();

  const data = useLazyLoadQuery<MessageDetailQuery>(
    graphql`
      query MessageDetailQuery($id: Uuid!) {
        message(id: $id) {
          id
          title
          type
          provider
          receivedAt
          to
        }
      }
    `,
    { id },
    { fetchPolicy: "store-or-network" }
  );

  console.log(data.message);

  if (!data.message) {
    return <MessageDetailError />;
  }

  const { title, type, provider, receivedAt, to } = data.message;

  const icon =
    type === "Email" ? (
      <EmailIcon color="primary" />
    ) : (
      <SmsIcon color="secondary" />
    );

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 2 }} color="error" disableRipple>
        ← Back to overview
      </Button>

      <Card variant="outlined">
        <CardHeader avatar={icon} title={title} subheader={new Date(receivedAt).toLocaleString("en-UK", {
          day: "2-digit",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })} />
        <CardContent>
          <Stack spacing={2} divider={<Divider flexItem />}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Empfänger</Typography>
              <Typography>{to?.[0] ?? "–"}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Typ</Typography>
              <Typography>{type}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Provider</Typography>
              <Typography>{provider}</Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};
