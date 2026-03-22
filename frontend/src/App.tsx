import { Routes, Route, BrowserRouter } from "react-router-dom";
import { CreateSession } from "./pages/create_new_sessions";
import Connection from "./pages/editor-pg";
import { RoomJoinPage } from "./pages/start_page";
import { SuccesPage } from "./pages/success_page";
import { ErrorPage } from "./pages/error_page";
import "./styles/global.css";
import "./styles/session-page.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RoomJoinPage />} />
        <Route path="/session/:id" element={<Connection />} />
        <Route path="/create" element={<CreateSession />} />
        <Route path="/success" element={<SuccesPage />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
