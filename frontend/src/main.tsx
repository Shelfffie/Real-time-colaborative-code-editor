import { createRoot } from "react-dom/client";
import { ContextProvider } from "./socket/socketContext.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <ContextProvider>
    <App />
  </ContextProvider>
);
