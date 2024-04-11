import React from "react";
import { JSONTree } from "react-json-tree";
import {
  AccessTime,
  ChatBubbleOutline,
  Send,
  Settings,
} from "@mui/icons-material/";
import {
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { graphql } from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import { QuickInformation_messageRecord$key } from "./__generated__/QuickInformation_messageRecord.graphql";

const useStyles = makeStyles({
  cardMargin: {
    marginTop: "30px",
    minWidth: 275,
  },
  bodyTitle: {
    fontSize: "20px",
    fontWeight: "400",
  },
  listBox: {
    width: "95%",
  },
  emailBody: {
    width: "800px",
    height: "80vh",
    border: "none",
  },
  iframePosition: {
    textAlign: "center",
  },
});

const listItemStyle = {
  "&:hover": { backgroundColor: "transparent" },
  cursor: "default",
};

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
  const classes = useStyles();

  const getDateTime = (date: any) => new Date(date).toLocaleString() ?? "";

  return (
    <Card className={classes.cardMargin}>
      <CardContent>
        <Typography variant="h5" component="div">
          {message?.title}
        </Typography>
      </CardContent>
      <Box className={classes.listBox}>
        <List component={Stack} direction="row">
          <ListItem disablePadding>
            <Tooltip title="Type" arrow>
              <ListItemButton sx={listItemStyle} disableRipple>
                <ListItemIcon>
                  <ChatBubbleOutline />
                </ListItemIcon>
                <ListItemText>{message?.type}</ListItemText>
              </ListItemButton>
            </Tooltip>
          </ListItem>
          <ListItem disablePadding>
            <Tooltip title="Received At" arrow>
              <ListItemButton sx={listItemStyle} disableRipple>
                <ListItemIcon>
                  <AccessTime />
                </ListItemIcon>
                <ListItemText>{getDateTime(message?.receivedAt)}</ListItemText>
              </ListItemButton>
            </Tooltip>
          </ListItem>
          <ListItem disablePadding>
            <Tooltip title="Provider" arrow>
              <ListItemButton sx={listItemStyle} disableRipple>
                <ListItemIcon>
                  <Settings />
                </ListItemIcon>
                <ListItemText>{message?.provider}</ListItemText>
              </ListItemButton>
            </Tooltip>
          </ListItem>
          <ListItem disablePadding>
            <Tooltip title="From" arrow>
              <ListItemButton sx={listItemStyle} disableRipple>
                <ListItemIcon>
                  <Send />
                </ListItemIcon>
                <ListItemText>{message?.from}</ListItemText>
              </ListItemButton>
            </Tooltip>
          </ListItem>
        </List>
      </Box>
      <CardContent>
        <h1 className={classes.bodyTitle}>Body</h1>
        {message?.type === "Email" ? (
          <div className={classes.iframePosition}>
            <iframe
              src={"/view/content/" + message?.id}
              title="Email Body"
              className={classes.emailBody}
            />
          </div>
        ) : message?.type === "Inbox" ? (
          <JSONTree
            theme={jsonTreeTheme}
            data={JSON.parse(message?.body ?? "")}
          />
        ) : (
          message?.body
        )}
      </CardContent>
    </Card>
  );
};
