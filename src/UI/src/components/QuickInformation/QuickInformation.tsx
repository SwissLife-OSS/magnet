import React from "react";
import { JSONTree } from "react-json-tree";
import {
  AccessTime,
  Email,
  Send,
  Settings,
  Sms,
  Inbox,
  Work,
  Message,
} from "@mui/icons-material/";
import {
  Box,
  Chip,
  Divider,
  Grid,
  Typography,
  Avatar,
} from "@mui/material";
import { graphql } from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import { QuickInformation_messageRecord$key } from "./__generated__/QuickInformation_messageRecord.graphql";

const jsonTreeTheme = {
  scheme: "monokai",
  author: "wimer hazenberg (http://www.monokai.nl)",
  base00: "#ffffff",
  base01: "#383830",
  base02: "#49483e",
  base03: "#75715e",
  base04: "#a59f85",
  base05: "#f8f8f2",
  base06: "#f5f4f1",
  base07: "#f9f8f5",
  base08: "#f92672",
  base09: "#fd971f",
  base0A: "#f4bf75",
  base0B: "#a6e22e",
  base0C: "#a1efe4",
  base0D: "#66d9ef",
  base0E: "#ae81ff",
  base0F: "#cc6633",
};

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

interface QuickInformationProps {
  $ref: QuickInformation_messageRecord$key;
}

export const QuickInformation: React.FC<QuickInformationProps> = ({ $ref }) => {
  const message = useFragment(
    graphql`
      fragment QuickInformation_messageRecord on MessageRecord {
        id
        title
        type
        receivedAt
        provider
        from
        body
      }
    `,
    $ref
  );

  const getDateTime = (date: any) => 
    new Date(date).toLocaleString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

  return (
    <Box>
      {/* Header Section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 600 }}>
          {message?.title}
        </Typography>
        
        <Chip
          icon={getTypeIcon(message?.type || "")}
          label={message?.type}
          color={getTypeColor(message?.type || "") as any}
          variant="outlined"
          sx={{ mb: 2 }}
        />
      </Box>

      {/* Info Grid */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar sx={{ bgcolor: "primary.light", width: 32, height: 32 }}>
              <AccessTime fontSize="small" />
            </Avatar>
            <Box>
              <Typography variant="caption" color="text.secondary" display="block">
                Received At
              </Typography>
              <Typography variant="body2" fontWeight="medium">
                {getDateTime(message?.receivedAt)}
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar sx={{ bgcolor: "secondary.light", width: 32, height: 32 }}>
              <Settings fontSize="small" />
            </Avatar>
            <Box>
              <Typography variant="caption" color="text.secondary" display="block">
                Provider
              </Typography>
              <Typography variant="body2" fontWeight="medium">
                {message?.provider}
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar sx={{ bgcolor: "info.light", width: 32, height: 32 }}>
              <Send fontSize="small" />
            </Avatar>
            <Box>
              <Typography variant="caption" color="text.secondary" display="block">
                From
              </Typography>
              <Typography variant="body2" fontWeight="medium">
                {message?.from}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      {/* Body Section */}
      <Box>
        <Typography variant="h6" component="h3" sx={{ mb: 2, fontWeight: 600 }}>
          Message Content
        </Typography>
        
        <Box 
          sx={{ 
            p: 2, 
            backgroundColor: "grey.50", 
            borderRadius: 2,
            border: "1px solid",
            borderColor: "grey.200"
          }}
        >
          {message?.type === "Email" ? (
            <Box sx={{ textAlign: "center" }}>
              <iframe
                src={"/view/content/" + message?.id}
                title="Email Body"
                style={{
                  width: "100%",
                  height: "400px",
                  border: "none",
                  borderRadius: "8px"
                }}
              />
            </Box>
          ) : message?.type === "Inbox" ? (
            <JSONTree
              theme={jsonTreeTheme}
              data={JSON.parse(message?.body ?? "")}
            />
          ) : (
            <Typography variant="body1" style={{ whiteSpace: "pre-wrap" }}>
              {message?.body}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};
