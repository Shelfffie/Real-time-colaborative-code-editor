import { Routes, Route, BrowserRouter } from "react-router-dom";
import { CreateSession } from "./pages/create_new_sessions";
import Connection from "./components/editor-pg";
import { StartPage } from "./pages/start_page";
import { SuccesPage } from "./pages/success_page";
import "./styles/global.css";
import "./styles/session-page.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/session/:id" element={<Connection />} />
        <Route path="/create" element={<CreateSession />} />
        <Route path="/success" element={<SuccesPage />} />s
      </Routes>
    </BrowserRouter>
  );
}

export default App;
