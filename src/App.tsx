import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import AddUser from "./pages/AddUser";
import NavBar from "./components'/NavBar";

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/users/:id" element={<UserProfile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
