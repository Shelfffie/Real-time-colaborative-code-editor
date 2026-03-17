import { Routes, Route, BrowserRouter } from "react-router-dom";
import { CreateSession } from "./pages/create_new_sessions";
import { SessionPage } from "./pages/session_page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/session/:id" element={<SessionPage />} />
        <Route path="/create" element={<CreateSession />} />s
      </Routes>
    </BrowserRouter>
  );
}

export default App;
