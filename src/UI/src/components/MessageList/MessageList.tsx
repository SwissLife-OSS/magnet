import React, { useState, useEffect, useRef } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import { graphql } from "babel-plugin-relay/macro";
import { usePaginationFragment } from "react-relay";

const useStyles = makeStyles({
  tableMargin: {
    marginTop: "40px",
  },
  rowCursorType: {
    cursor: "pointer",
  },
  titlesPosition: {
    textAlign: "center",
    marginTop: "35px",
  },
  title: {
    marginBottom: "0",
  },
  subTitle: {
    fontWeight: "400",
    marginTop: "10px",
  },
  buttonPosition: {
    textAlign: "center",
    marginTop: "40px",
  },
  filterTitle: {
    fontSize: "18px",
  },
  filterSubTitle: {
    fontSize: "15px",
    fontWeight: "400",
  },
});

const MessageList: React.FC<{ fragmentRef: any }> = ({ fragmentRef }) => {
  const classes = useStyles();

  //Filter State
  const [messageFilter, setMessageFilter] = useState<null | Object>();

  //Filter Pop-Up
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    createFilter();
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  //Filter Choice
  const [filterState, setFilterState] = useState({
    sms: true,
    email: true,
    inbox: true,
    workitem: true,
  });

  const { sms, email, inbox, workitem } = filterState;

  //Filter Action
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterState({
      ...filterState,
      [event.target.name]: event.target.checked,
    });
  };

  //Create Filter
  const createFilter = () => {
    let selectedFilters = [];

    for (const [type, value] of Object.entries(filterState)) {
      let typeName = "";

      if (type === "workitem") {
        typeName = "WorkItem";
      } else {
        typeName = type.charAt(0).toUpperCase() + type.slice(1);
      }

      if (value === true) {
        selectedFilters.push(typeName);
      }
    }

    const selectedFiltersLength = selectedFilters.length;

    if (selectedFiltersLength === 0) {
      setMessageFilter({
        or: [],
      });
    } else if (selectedFiltersLength === 1) {
      setMessageFilter({ or: [{ type: { eq: selectedFilters[0] } }] });
    } else if (selectedFiltersLength === 2) {
      setMessageFilter({
        or: [
          { type: { eq: selectedFilters[0] } },
          { type: { eq: selectedFilters[1] } },
        ],
      });
    } else if (selectedFiltersLength === 3) {
      setMessageFilter({
        or: [
          { type: { eq: selectedFilters[0] } },
          { type: { eq: selectedFilters[1] } },
          { type: { eq: selectedFilters[2] } },
        ],
      });
    } else if (selectedFiltersLength === 4) {
      setMessageFilter({
        or: [
          { type: { eq: selectedFilters[0] } },
          { type: { eq: selectedFilters[1] } },
          { type: { eq: selectedFilters[2] } },
          { type: { eq: selectedFilters[3] } },   
        ],
      });
    }
  };

  //Render Count
  const firstRender = useRef(false);

  useEffect(() => {
    if (firstRender.current) {
      refetch({ where: messageFilter }, { fetchPolicy: "network-only" });
    } else {
      firstRender.current = true;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageFilter]);

  let { data, hasNext, loadNext, refetch } = usePaginationFragment(
    graphql`
      fragment MessageListFragment_query on Query
      @argumentDefinitions(
        cursor: { type: "String" }
        count: { type: "Int", defaultValue: 30 }
        where: { type: "MessageRecordFilterInput" }
      )
      @refetchable(queryName: "MessageListRefetchableQuery") {
        messages(after: $cursor, first: $count, where: $where)
          @connection(key: "ScreenerList_messages") {
          edges {
            node {
              id
              title
              to
              receivedAt
              type
              provider
              primaryReceipient
            }
          }
        }
      }
    `,
    fragmentRef
  );

  const getDateTime = (date: any) => {
    let newDate = new Date(date);
    return newDate.toLocaleString();
  };

  const getShortTitle = (title: any) => {
    if (title != null && title.length > 50) {
      return title.split(50) + "...";
    } else {
      return title;
    }
  };

  if (data == null) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  const showInformation = () => {
    if (data?.messages?.edges?.length === 0 || data?.messages == null) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <div className={classes.titlesPosition}>
        {showInformation() && (
          <>
            <h2 className={classes.title}>New data is displayed here</h2>
            <h4 className={classes.subTitle}>
              Click on a row to see more Information
            </h4>
          </>
        )}
      </div>
      <TableContainer className={classes.tableMargin}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>To</TableCell>
              <TableCell>When</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Provider</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.messages?.edges?.map((element: any) => (
              <TableRow
                key={element?.node?.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={() => {
                  window.location.href = `/message/${element?.node?.id}`;
                }}
                className={classes.rowCursorType}
              >
                <TableCell component="th" scope="row">
                  {getShortTitle(element?.node?.title)}
                </TableCell>
                <TableCell component="th" scope="row">
                  {element?.node?.primaryReceipient}
                </TableCell>
                <TableCell component="th" scope="row">
                  {getDateTime(element?.node?.receivedAt)}
                </TableCell>
                <TableCell component="th" scope="row">
                  {element?.node?.type}
                </TableCell>
                <TableCell component="th" scope="row">
                  {element?.node?.provider}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={classes.buttonPosition}>
        <Button
          variant="contained"
          disabled={!hasNext}
          onClick={() => {
            loadNext(30);
          }}
        >
          Load More
        </Button>
        <br></br>
        <br></br>
        <Button aria-describedby={id} variant="contained" onClick={handleClick}>
          Filters
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Typography sx={{ p: 2 }} variant="h6">
            <span className={classes.filterTitle}>Filters</span>
            <br></br>
            <span className={classes.filterSubTitle}>Type</span>
            <Box sx={{ display: "flex" }}>
              <FormControl sx={{ m: 1 }} variant="standard">
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={sms}
                        onChange={handleChange}
                        name="sms"
                      />
                    }
                    label="Sms"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={email}
                        onChange={handleChange}
                        name="email"
                      />
                    }
                    label="Email"
                  />
                </FormGroup>
              </FormControl>
              <FormControl
                required
                component="fieldset"
                sx={{ m: 1, marginLeft: "30px" }}
                variant="standard"
              >
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={inbox}
                        onChange={handleChange}
                        name="inbox"
                      />
                    }
                    label="Inbox"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={workitem}
                        onChange={handleChange}
                        name="workitem"
                      />
                    }
                    label="WorkItem"
                  />
                </FormGroup>
              </FormControl>
            </Box>
          </Typography>
        </Popover>
      </div>
    </>
  );
};

export default MessageList;
