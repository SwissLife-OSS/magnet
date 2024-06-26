import ReactDOM from "react-dom/client";
import { App } from "./App";
import { createEnvironment } from "./Environment";
import { RelayEnvironmentProvider } from "react-relay";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <RelayEnvironmentProvider environment={createEnvironment()}>
    <App />
  </RelayEnvironmentProvider>
);
