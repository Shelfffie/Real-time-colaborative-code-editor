import { Routes, Route, BrowserRouter } from "react-router-dom";
import Connection from "./components/editor-pg";
import { CreateSession } from "./pages/create_new_sessions";
import { GetNewVersion } from "./components/getNewVersion";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/session/:id" element={<Connection />} />
        <Route path="/create" element={<CreateSession />} />s
      </Routes>
    </BrowserRouter>
  );
}

export default App;
