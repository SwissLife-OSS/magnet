import React from "react";
import { Chip, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { MessageListFilterState } from "../MessageList";

const useStyles = makeStyles({
  filterPosition: {
    marginTop: "20px",
    marginBottom: "20px",
  },
});

interface MessageFilterProps {
  filters: MessageListFilterState;
  onFilterChange(filters: MessageListFilterState): void;
}

export const MessageFilter: React.FC<MessageFilterProps> = ({
  filters: { sms, email, inbox, workItem },
  onFilterChange,
}) => {
  const classes = useStyles();

  return (
    <Stack direction="row" spacing={1} className={classes.filterPosition}>
      <Chip
        label="Sms"
        color="primary"
        variant={sms ? "filled" : "outlined"}
        onClick={() =>
          onFilterChange({
            sms: !sms,
            email: email,
            inbox: inbox,
            workItem: workItem,
          })
        }
      />
      <Chip
        label="Email"
        color="primary"
        variant={email ? "filled" : "outlined"}
        onClick={() =>
          onFilterChange({
            sms: sms,
            email: !email,
            inbox: inbox,
            workItem: workItem,
          })
        }
      />
      <Chip
        label="Inbox"
        color="primary"
        variant={inbox ? "filled" : "outlined"}
        onClick={() =>
          onFilterChange({
            sms: sms,
            email: email,
            inbox: !inbox,
            workItem: workItem,
          })
        }
      />
      <Chip
        label="WorkItem"
        color="primary"
        variant={workItem ? "filled" : "outlined"}
        onClick={() =>
          onFilterChange({
            sms: sms,
            email: email,
            inbox: inbox,
            workItem: !workItem,
          })
        }
      />
    </Stack>
  );
};
