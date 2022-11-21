import React from "react";
import { Chip, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  filterPosition: {
    marginTop: "20px",
    marginBottom: "20px",
  },
});

interface Filter {
  filterState: {
    sms: boolean;
    email: boolean;
    inbox: boolean;
    workItem: boolean;
  };
  handleClick(name: string): void;
}

const MessageFilter: React.FC<Filter> = ({ filterState, handleClick }) => {
  const classes = useStyles();
  const { sms, email, inbox, workItem } = filterState;

  return (
    <>
      <Stack direction="row" spacing={1} className={classes.filterPosition}>
        <Chip
          label="Sms"
          color="primary"
          variant={sms ? "filled" : "outlined"}
          onClick={() => handleClick("sms")}
        />
        <Chip
          label="Email"
          color="primary"
          variant={email ? "filled" : "outlined"}
          onClick={() => handleClick("email")}
        />
        <Chip
          label="Inbox"
          color="primary"
          variant={inbox ? "filled" : "outlined"}
          onClick={() => handleClick("inbox")}
        />
        <Chip
          label="WorkItem"
          color="primary"
          variant={workItem ? "filled" : "outlined"}
          onClick={() => handleClick("workItem")}
        />
      </Stack>
    </>
  );
};

export default MessageFilter;
