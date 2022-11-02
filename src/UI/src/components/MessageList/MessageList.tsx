import React, { useState, useEffect, useRef } from "react";
import MessageListTable from "../MessageListTable";
import { makeStyles } from "@mui/styles";
import { graphql } from "babel-plugin-relay/macro";
import { usePaginationFragment } from "react-relay";
import {
  Button,
  Box,
  Popover,
  Typography,
  FormGroup,
  FormControlLabel,
  FormControl,
  Checkbox,
} from "@mui/material";

const useStyles = makeStyles({
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

  //Create Filter
  const createFilter = () => {
    const selectedFilters = Object.entries(filterState)
      .filter(([type, value]) => value)
      .map(([type]) =>
        type === "workitem"
          ? "WorkItem"
          : type.charAt(0).toUpperCase() + type.slice(1)
      );

    const selectedFiltersLength = selectedFilters.length;

    const filter = selectedFiltersLength
      ? Array(selectedFiltersLength)
          .fill(undefined)
          .map((item, index) => ({ type: { eq: selectedFilters[index] } }))
      : [];

    setMessageFilter({
      or: filter,
    });
  };

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

  //Render Count
  const firstRenderSkiped = useRef(false);

  useEffect(() => {
    if (firstRenderSkiped.current) {
      refetch({ where: messageFilter }, { fetchPolicy: "network-only" });
    } else {
      firstRenderSkiped.current = true;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageFilter]);

  const { data, hasNext, loadNext, refetch } = usePaginationFragment(
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

  if (data == null) {
    return (
      <Box sx={{ display: "flex" }}>
        <Typography sx={{ fontWeight: "400", marginTop: "50px" }} variant="h5">
          Data is loading...
        </Typography>
      </Box>
    );
  }

  const showInformation = data?.messages?.edges?.length;

  return (
    <>
      <div className={classes.titlesPosition}>
        {!showInformation && (
          <>
            <h2 className={classes.title}>New data is displayed here</h2>
            <h4 className={classes.subTitle}>
              Click on a row to see more Information
            </h4>
          </>
        )}
      </div>
      <MessageListTable data={data} />
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
        <br />
        <br />
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
            <br />
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
