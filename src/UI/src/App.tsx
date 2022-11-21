import { ThemeProvider } from "@emotion/react";
import { CircularProgress, CssBaseline } from "@mui/material";
import React, { Suspense } from "react";
import Routing from "./Routes";
import theme from "./theme";

const App: React.FC = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme={true} />
        <Suspense fallback={<CircularProgress />}>
          <Routing />
        </Suspense>
      </ThemeProvider>
    </>
  );
};

export default App;
