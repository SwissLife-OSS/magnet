import { Box, Button, TextField, MenuItem } from "@mui/material";
import { useState } from "react";

export type MessageType = "SMS" | "Email" | "Inbox" | "Workitem" | null;

interface Props {
  typeFilter: MessageType;
  onTypeChange: (type: MessageType) => void;
  providerFilter: string | null;
  onProviderChange: (provider: string | null) => void;
}

const types: MessageType[] = ["SMS", "Email", "Inbox", "Workitem"];
const providers = ["E2ETests", "SendGrid"];

export const MessageFilter = ({
  typeFilter,
  onTypeChange,
  providerFilter,
  onProviderChange,
}: Props) => {
  const [dateRange, setDateRange] = useState<string>("");

  return (
    <Box
      sx={{
        mt: 4,
        mb: 2,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
        px: { xs: 2, sm: 4, md: 8 },
      }}
    >
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        {types.map((type) => (
          <Button
            key={type}
            color="success"
            variant={typeFilter === type ? "contained" : "outlined"}
            onClick={() =>
              onTypeChange(typeFilter === type ? null : type)
            }
          >
            {type}
          </Button>
        ))}
      </Box>

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>

        <TextField
          select
          label="Provider"
          size="small"
          value={providerFilter ?? ""}
          onChange={(e) =>
            onProviderChange(e.target.value ? e.target.value : null)
          }
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">All</MenuItem>
          {providers.map((prov) => (
            <MenuItem key={prov} value={prov}>
              {prov}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </Box>
)
}
