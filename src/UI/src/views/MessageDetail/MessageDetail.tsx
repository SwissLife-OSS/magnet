import React from "react";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SettingsIcon from "@mui/icons-material/Settings";
import SendIcon from "@mui/icons-material/Send";
import { useParams } from "react-router-dom";
import { Nav } from "../../components";
import { graphql } from "babel-plugin-relay/macro";
import { useLazyLoadQuery } from "react-relay";
import { MessageDetailQuery } from "./__generated__/MessageDetailQuery.graphql";
import { makeStyles } from "@mui/styles";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";

const useStyles = makeStyles({
  dataSection: {
    marginTop: "20px",
  },
  dataTitle: {
    fontSize: "20px",
    marginTop: "35px",
    fontWeight: "400",
  },
  bodyTitle: {
    fontSize: "20px",
    fontWeight: "400",
  },
  cardMargin: {
    marginTop: "30px",
  },
  tableMargin: {
    marginBottom: "50px",
  },
});

const pattern =
  /^[0-9a-fA-F]{8}[0-9a-fA-F]{4}[0-9a-fA-F]{4}[0-9a-fA-F]{4}[0-9a-fA-F]{12}$/gi;

const MessageDetail: React.FC = () => {
  const classes = useStyles();
  let { id } = useParams() ?? "";

  //UUID check
  const result = id?.match(pattern) ? true : false;

  if (id === undefined || !result) {
    id = "";
    window.location.href = "/message";
  }

  const { message } = useLazyLoadQuery<MessageDetailQuery>(
    graphql`
      query MessageDetailQuery($id: Uuid!) {
        message(id: $id) {
          id
          title
          type
          receivedAt
          provider
          from
          to
          body
          receivedLog {
            clientName
            receivedAt
          }
        }
      }
    `,
    { id: id },
    { fetchPolicy: "store-or-network" }
  );

  if (message == null) {
    window.location.href = "/message";
  }

  const getDateTime = (date: any) => {
    if (date == null) {
      return "";
    }
    let newDate = new Date(date);

    return newDate.toLocaleString();
  };

  const getBody = (message: any) => {
    if (message.type === "Email") {
      return <span dangerouslySetInnerHTML={{ __html: message?.body }} />;
    } else {
      return message.body;
    }
  };

  return (
    <>
      <Nav />
      <Grid className={classes.dataSection} container>
        <Grid item xs={0} lg={2}></Grid>
        <Grid item xs={12} lg={8}>
          <Card className={classes.cardMargin} sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {message?.title}
              </Typography>
            </CardContent>
            <Box sx={{ width: "95%", bgcolor: "background.paper" }}>
              <List component={Stack} direction="row">
                <ListItem disablePadding>
                  <Tooltip title="Type" arrow>
                    <ListItemButton
                      sx={{
                        "&:hover": { backgroundColor: "transparent" },
                        cursor: "default",
                      }}
                      disableRipple
                    >
                      <ListItemIcon>
                        <ChatBubbleOutlineIcon />
                      </ListItemIcon>
                      <ListItemText>{message?.type}</ListItemText>
                    </ListItemButton>
                  </Tooltip>
                </ListItem>
                <ListItem disablePadding>
                  <Tooltip title="Received At" arrow>
                    <ListItemButton
                      sx={{
                        "&:hover": { backgroundColor: "transparent" },
                        cursor: "default",
                      }}
                      disableRipple
                    >
                      <ListItemIcon>
                        <AccessTimeIcon />
                      </ListItemIcon>
                      <ListItemText>
                        {getDateTime(message?.receivedAt)}
                      </ListItemText>
                    </ListItemButton>
                  </Tooltip>
                </ListItem>
                <ListItem disablePadding>
                  <Tooltip title="Provider" arrow>
                    <ListItemButton
                      sx={{
                        "&:hover": { backgroundColor: "transparent" },
                        cursor: "default",
                      }}
                      disableRipple
                    >
                      <ListItemIcon>
                        <SettingsIcon />
                      </ListItemIcon>
                      <ListItemText>{message?.provider}</ListItemText>
                    </ListItemButton>
                  </Tooltip>
                </ListItem>
                <ListItem disablePadding>
                  <Tooltip title="From" arrow>
                    <ListItemButton
                      sx={{
                        "&:hover": { backgroundColor: "transparent" },
                        cursor: "default",
                      }}
                      disableRipple
                    >
                      <ListItemIcon>
                        <SendIcon />
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
        </Grid>
        <Grid item xs={0} lg={2}></Grid>
        <Grid item xs={0} lg={2}></Grid>
        <Grid item xs={12} lg={8}>
          <h1 className={classes.dataTitle}>To</h1>
          <TableContainer>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Receivers</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {message?.to?.map((to) => (
                  <TableRow
                    key={to}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{to}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={0} lg={2}></Grid>
        <Grid item xs={0} lg={2}></Grid>
        <Grid item xs={12} lg={8}>
          <h1 className={classes.dataTitle}>Received Log</h1>
          <TableContainer className={classes.tableMargin}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Client name</TableCell>
                  <TableCell>Received at</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {message?.receivedLog?.map((element) => (
                  <TableRow
                    key={element?.clientName}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{element?.clientName}</TableCell>
                    <TableCell>{getDateTime(element?.receivedAt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={0} lg={2}></Grid>
      </Grid>
    </>
  );
};

export default MessageDetail;
