import { Routes, Route, BrowserRouter } from "react-router-dom";
import Connection from "./components/socket_conn";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/session/:id" element={<Connection />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
