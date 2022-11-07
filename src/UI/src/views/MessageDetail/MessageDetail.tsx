import { graphql } from "babel-plugin-relay/macro";
import React from "react";
import { useLazyLoadQuery } from "react-relay";
import { useParams } from "react-router-dom";
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
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Nav } from "../../components";
import { MessageDetailQuery } from "./__generated__/MessageDetailQuery.graphql";

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

const MessageDetail: React.FC = () => {
  const classes = useStyles();
  const { id } = useParams();

  const data = useLazyLoadQuery<MessageDetailQuery>(
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
    { id: id ?? "" },
    { fetchPolicy: "store-or-network" }
  );

  // fetchQuery(
  //   environment,
  //   graphql`
  //     query MessageDetailQuery($id: Uuid!) {
  //       message(id: $id) {
  //         id
  //         title
  //         type
  //         receivedAt
  //         provider
  //         from
  //         to
  //         body
  //         receivedLog {
  //           clientName
  //           receivedAt
  //         }
  //       }
  //     }
  //   `,
  //   { id: id ?? "" },
  //   { fetchPolicy: "store-or-network" }
  // ).subscribe({
  //   next: (response) => {
  //     console.log("response");
  //     console.log(response);
  //   },
  //   error: (error: any) => {
  //     console.log("error");
  //     console.log(error);
  //   },
  // });

  const getDateTime = (date: any) => new Date(date).toLocaleString() ?? "";

  const getBody = (message: any) =>
    message.type === "Email" ? (
      <span dangerouslySetInnerHTML={{ __html: message?.body }} />
    ) : (
      message.body
    );

  return (
    <>
      <Nav />
      <Grid className={classes.dataSection} container>
        <Grid item xs={0} lg={2}></Grid>
        <Grid item xs={12} lg={8}>
          <Card className={classes.cardMargin} sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {data?.message?.title}
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
                        <ChatBubbleOutline />
                      </ListItemIcon>
                      <ListItemText>{data?.message?.type}</ListItemText>
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
                        <AccessTime />
                      </ListItemIcon>
                      <ListItemText>
                        {getDateTime(data?.message?.receivedAt)}
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
                        <Settings />
                      </ListItemIcon>
                      <ListItemText>{data?.message?.provider}</ListItemText>
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
                        <Send />
                      </ListItemIcon>
                      <ListItemText>{data?.message?.from}</ListItemText>
                    </ListItemButton>
                  </Tooltip>
                </ListItem>
              </List>
            </Box>
            <CardContent>
              <h1 className={classes.bodyTitle}>Body</h1>
              {getBody(data?.message)}
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
                {data?.message?.to?.map((to) => (
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
                {data?.message?.receivedLog?.map((element) => (
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
