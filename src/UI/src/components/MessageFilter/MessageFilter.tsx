import { Box, Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
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
            variant={typeFilter === type ? "contained" : "outlined"}
            color="error"
            disableRipple
            onClick={() =>
              onTypeChange(typeFilter === type ? null : type)
            }
          >
            {type}
          </Button>
        ))}
      </Box>

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Provider</InputLabel>
          <Select
            value={providerFilter ?? ""}
            onChange={(e) =>
              onProviderChange(e.target.value ? e.target.value : null)
            }
            label="Provider"
            MenuProps={{
              // Disable fade animation and transitions
              disableAutoFocusItem: true,
              transitionDuration: 0,
              PaperProps: {
                style: {
                  transform: 'none !important',
                },
              },
            }}
          >
            <MenuItem value="">All</MenuItem>
            {providers.map((prov) => (
              <MenuItem key={prov} value={prov}>
                {prov}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
)
}
