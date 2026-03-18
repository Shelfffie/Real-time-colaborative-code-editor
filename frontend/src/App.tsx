import { Routes, Route, BrowserRouter } from "react-router-dom";
import { CreateSession } from "./pages/create_new_sessions";
import Connection from "./components/editor-pg";
import { StartPage } from "./pages/start_page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/session/:id" element={<Connection />} />
        <Route path="/create" element={<CreateSession />} />s
      </Routes>
    </BrowserRouter>
  );
}

export default App;
