import React from "react";
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
});

const listItemStyle = {
  "&:hover": { backgroundColor: "transparent" },
  cursor: "default",
};

interface QuickInformationProps {
  readonly message: {
    readonly title: string;
    readonly type: string;
    readonly receivedAt: string;
    readonly provider: string;
    readonly from: string;
    readonly body: string | null;
  };
}

export const QuickInformation: React.FC<QuickInformationProps> = ({
  message,
}) => {
  const classes = useStyles();

  const getDateTime = (date: any) => new Date(date).toLocaleString() ?? "";

  const getBody = (message: any) =>
    message.type === "Email" ? (
      <span dangerouslySetInnerHTML={{ __html: message?.body }} />
    ) : (
      message.body
    );

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
        {getBody(message)}
      </CardContent>
    </Card>
  );
};
