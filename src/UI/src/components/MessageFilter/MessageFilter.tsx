import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Sms, Email, Inbox, Work } from "@mui/icons-material";

export type MessageType = "SMS" | "Email" | "Inbox" | "Workitem" | null;

interface Props {
  typeFilter: MessageType;
  onTypeChange: (type: MessageType) => void;
  providerFilter: string | null;
  onProviderChange: (provider: string | null) => void;
}

const types: MessageType[] = ["SMS", "Email", "Inbox", "Workitem"];
const providers = ["E2ETests", "SendGrid"];

// const getTypeIcon = (type: MessageType) => {
//   switch (type) {
//     case "SMS":
//       return <Sms sx={{ mr: 1 }} />;
//     case "Email":
//       return <Email sx={{ mr: 1 }} />;
//     case "Inbox":
//       return <Inbox sx={{ mr: 1 }} />;
//     case "Workitem":
//       return <Work sx={{ mr: 1 }} />;
//     default:
//       return null;
//   }
// };

export const MessageFilter = ({
  typeFilter,
  onTypeChange,
  providerFilter,
  onProviderChange,
}: Props) => {
  return (
    <Box
      sx={{
        mt: 2,
        mb: 1,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        {types.map((type) => (
          <Button
            key={type}
            color="error"
            variant={typeFilter === type ? "contained" : "outlined"}
            onClick={() =>
              onTypeChange(typeFilter === type ? null : type)
            }
            // startIcon={getTypeIcon(type)}
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
  );
};
